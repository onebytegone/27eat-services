export default class Authorizer {

   public authorize(event: APIGatewayAuthorizerEvent): Promise<object> {
      if (event.type !== 'TOKEN') {
         console.log(`AUTH_FAILURE Unsupported authorizer event ${event.type}`);
         return Promise.reject('Unauthorized');
      }

      return Promise.resolve(this._generatePolicy('TODO_USER_ID', 'allow', event.methodArn));
   }

   protected _generatePolicy(principalId: string, effect: string, resource: string): object {
      return {
         principalId: principalId,
         policyDocument: {
            Version: '2012-10-17',
            Statement: [
               {
                  Action: 'execute-api:Invoke',
                  Effect: effect,
                  Resource: resource,
               },
            ],
         },
      };
   }

}
