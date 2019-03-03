import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { STRINGS } from '../strings';
import MenuFormatter from '../lib/MenuFormatter';
import MenuRetriever from '../lib/MenuRetriever';

let menuRetriever = new MenuRetriever(),
    menuFormatter = new MenuFormatter();

export const getMealIntentHandler: RequestHandler = {

   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'GetMealIntent';
   },

   handle(handlerInput: HandlerInput): Promise<Response> {
      const requestedDate = '', // TODO: get from the input
            requestedMeal = 'lunch'; // TODO: get from the input

      return menuRetriever.fetchMenuForDate(requestedDate)
         .then((menu) => {
            return handlerInput.responseBuilder
               .speak(menuFormatter.formatMealForSpeech(menu[requestedMeal]))
               .withSimpleCard(STRINGS.SKILL_NAME, menuFormatter.formatMealForSimpleCard(menu[requestedMeal]))
               .getResponse();
         });
   },

};
