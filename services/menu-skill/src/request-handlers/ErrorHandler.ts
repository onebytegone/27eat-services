import { HandlerInput, ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { STRINGS } from '../strings';

export const errorHandler: ErrorHandler = {

   canHandle(): boolean {
      return true;
   },

   handle(handlerInput: HandlerInput, error: Error): Response {
      console.log(`Error handled: ${error.message}`);

      return handlerInput.responseBuilder
         .speak(STRINGS.ERROR_MESSAGE)
         .reprompt(STRINGS.ERROR_MESSAGE)
         .getResponse();
   },

};
