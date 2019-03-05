import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { STRINGS } from '../strings';

export const cancelAndStopIntentHandler: RequestHandler = {

   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
         && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
         || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
   },

   handle(handlerInput: HandlerInput): Response {
      return handlerInput.responseBuilder
         .speak(STRINGS.STOP_MESSAGE)
         .getResponse();
   },

};
