import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { STRINGS } from '../strings';

export const helpIntentHandler: RequestHandler = {

   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
   },

   handle(handlerInput: HandlerInput): Response {
      return handlerInput.responseBuilder
         .speak(STRINGS.HELP_MESSAGE)
         .reprompt(STRINGS.HELP_REPROMPT)
         .getResponse();
   },

};
