import _ from 'underscore';
import moment from 'moment';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
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
      const request = handlerInput.requestEnvelope.request as IntentRequest,
            intentSlots = request.intent.slots || {},
            requestedDate = moment(intentSlots.Date.value).utc().format('YYYY-MM-DD'), // TODO: get for device timezone
            requestedMeal = intentSlots.Meal.value,
            isValidMeal = requestedMeal && _.contains([ 'breakfast', 'lunch', 'dinner' ], requestedMeal);

      if (!requestedDate || !isValidMeal) {
         throw new Error('Received request with empty date or meal: ' + JSON.stringify(request.intent.slots));
      }

      return menuRetriever.fetchMenuForDate(requestedDate)
         .then((menu) => {
            return handlerInput.responseBuilder
               .speak(menuFormatter.formatMealForSpeech(menu[requestedMeal as MealKey]))
               .withSimpleCard(STRINGS.SKILL_NAME, menuFormatter.formatMealForSimpleCard(menu[requestedMeal as MealKey]))
               .getResponse();
         });
   },

};
