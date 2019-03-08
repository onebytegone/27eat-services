import _ from 'underscore';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface ProfileData {
   userID: string;
   email: string;
   name: string;
}

export class Profile {

   private _docs: DocumentClient;

   public constructor(
      private _tableName: string = process.env.PROFILE_TABLE_NAME as string
   ) {
      this._docs = new DocumentClient();
   }

   public upsert(data: ProfileData): Promise<void> {
      const params: DocumentClient.UpdateItemInput = {
         TableName: this._tableName,
         Key: {
            userID: data.userID,
         },
         UpdateExpression: 'SET '
            + 'email = :email, '
            + '#name = :name',
         ExpressionAttributeNames: {
            '#name': 'name',
         },
         ExpressionAttributeValues: {
            ':email': data.email,
            ':name': data.name,
         },
      };

      return this._docs.update(params).promise()
         .then(_.noop);
   }

}
