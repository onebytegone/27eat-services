import moment from 'moment';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { STRINGS } from '../strings';
import MenuFormatter from '../lib/MenuFormatter';
import MenuRetriever from '../lib/MenuRetriever';

let menuRetriever = new MenuRetriever(),
    menuFormatter = new MenuFormatter();

export const getMenuIntentHandler: RequestHandler = {

   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
         || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
         && handlerInput.requestEnvelope.request.intent.name === 'GetMenuIntent');
   },

   handle(handlerInput: HandlerInput): Promise<Response> {
      const request = handlerInput.requestEnvelope.request as IntentRequest,
            intentSlots = request.intent.slots || {},
            requestedDate = moment(intentSlots.Date.value).utc().format('YYYY-MM-DD'); // TODO: get for device timezone

      if (!requestedDate) {
         throw new Error('Received request with empty date: ' + JSON.stringify(request.intent.slots));
      }

      return menuRetriever.fetchMenuForDate(requestedDate)
         .then((menu) => {
            return handlerInput.responseBuilder
               .speak(menuFormatter.formatMenuForSpeech(menu))
               .withSimpleCard(STRINGS.SKILL_NAME, menuFormatter.formatMenuForSimpleCard(menu))
               .getResponse();
         });
   },

};
