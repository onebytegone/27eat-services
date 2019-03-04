import moment from 'moment-timezone';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest, services } from 'ask-sdk-model';
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
            deviceId = handlerInput.requestEnvelope.context.System.device.deviceId,
            serviceClientFactory = handlerInput.serviceClientFactory as services.ServiceClientFactory,
            upsServiceClient = serviceClientFactory.getUpsServiceClient(),
            intentSlots = request.intent.slots || {};

      let determineDate: Promise<moment.Moment> = Promise.resolve(moment(intentSlots.Date.value));

      if (!intentSlots.Date.value) {
         determineDate = upsServiceClient.getSystemTimeZone(deviceId)
            .then((deviceTimezone) => {
               return moment().utc().tz(deviceTimezone);
            });
      }

      return determineDate
         .then((requestedDate: moment.Moment) => {
            return menuRetriever.fetchMenuForDate(requestedDate.format('YYYY-MM-DD'));
         })
         .then((menu) => {
            return handlerInput.responseBuilder
               .speak(menuFormatter.formatMenuForSpeech(menu))
               .withSimpleCard(STRINGS.SKILL_NAME, menuFormatter.formatMenuForSimpleCard(menu))
               .getResponse();
         });
   },

};
