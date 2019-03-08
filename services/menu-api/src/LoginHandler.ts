import { Context, Callback } from 'aws-lambda';
import LWA from './lib/LoginWithAmazon';
import JWT from 'jwt-simple';
import uuid from 'uuid';
import { Profile } from './model/Profile';

const APIGWUtils = require('@silvermine/apigateway-utils'),
      rbHandler = APIGWUtils.get('responseBuilderHandler'),
      Request = APIGWUtils.get('Request'),
      ResponseBuilder = APIGWUtils.get('SilvermineResponseBuilder'),
      JWT_SIGNING_SECRET = process.env.JWT_SIGNING_SECRET || '',
      SLS_STAGE = process.env.SLS_STAGE || 'dev',
      lwa = new LWA(process.env.LWA_CLIENT_ID || '', process.env.LWA_CLIENT_SECRET || '');

// eslint-disable-next-line @typescript-eslint/no-type-alias
type SilvermineResponseBuilder = InstanceType<typeof ResponseBuilder>;

export function handler(evt: any, context: Context, cb: Callback): void {
   const req = new Request(evt, context),
         resp = new ResponseBuilder();

   const fn = function(): SilvermineResponseBuilder {
      const parsedBody = req.parsedBody();

      if (!parsedBody || !parsedBody.code) {
         return resp.badRequest().rb();
      }

      // TODO: Add "unauthorized" error support
      return lwa.getAccessToken(parsedBody.code)
         .then((accessTokenResp) => {
            // TODO: save refreshToken to DynDB?
            return lwa.getProfile(accessTokenResp.accessToken);
         })
         .then((profileResp) => {
            const profile = new Profile();

            return profile.upsert(profileResp)
               .then(() => profileResp);
         })
         .then((profileResp) => {
            const now = Math.floor(Date.now() / 1000);

            const content = {
               jti: uuid(),
               iss: `27eat:${SLS_STAGE}`,
               sub: profileResp.userID,
               iat: now,
               nbf: now,
               exp: now + 3600, // TODO: determine the proper value for this
            };

            return resp.body({
               token: JWT.encode(content, JWT_SIGNING_SECRET, 'HS256'),
            });
         })
         .catch((err) => {
            console.log('ERROR:', err, err.stack);
            return resp.serverError().rb();
         });
   };

   rbHandler(fn, req, cb, ResponseBuilder);
}
