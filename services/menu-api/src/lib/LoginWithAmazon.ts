import got, { GotFormOptions } from 'got';

interface AccessTokenResponse {
   accessToken: string;
   refreshToken: string;
}

interface UserProfileResponse {
   userID: string;
   email: string;
   name: string;
}

export default class LoginWithAmazon {

   private _clientID: string;
   private _clientSecret: string;

   public constructor(clientID: string, clientSecret: string) {
      this._clientID = clientID;
      this._clientSecret = clientSecret;
   }

   getAccessToken(authorizationCode: string): Promise<AccessTokenResponse> {
      const opts: GotFormOptions<string> = {
         form: true,
         body: {
            'grant_type': 'authorization_code',
            code: authorizationCode,
            'client_id': this._clientID,
            'client_secret': this._clientSecret,
         },
      };

      return got.post('https://api.amazon.com/auth/o2/token', opts)
         .then((resp) => {
            const body = JSON.parse(resp.body);

            return {
               accessToken: body.access_token,
               refreshToken: body.refresh_token,
            };
         });
   }

   getProfile(accessToken: string): Promise<UserProfileResponse> {
      const opts = {
         headers: {
            'Authorization': 'Bearer ' + accessToken,
         },
      };

      return got.get('https://api.amazon.com/user/profile', opts)
         .then((resp) => {
            const body = JSON.parse(resp.body);

            return {
               userID: body.user_id,
               email: body.email,
               name: body.name,
            };
         });
   }

}
