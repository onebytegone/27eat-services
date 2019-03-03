import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const getMealCanFulfillHandler: RequestHandler = {

   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'CanFulfillIntentRequest'
         && handlerInput.requestEnvelope.request.intent.name === 'GetMealIntent';
   },

   handle(handlerInput: HandlerInput): Response {
      return handlerInput.responseBuilder
         .withCanFulfillIntent({
            canFulfill: 'YES',
            slots: {
               Date: {
                  canUnderstand: 'YES',
                  canFulfill: 'YES',
               },
               Meal: {
                  canUnderstand: 'YES',
                  canFulfill: 'YES',
               },
            },
         })
         .getResponse();
   },

};
