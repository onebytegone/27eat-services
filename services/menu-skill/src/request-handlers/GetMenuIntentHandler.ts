import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { STRINGS } from '../strings';
import MenuFormatter from '../lib/MenuFormatter';

let menuFormatter = new MenuFormatter();

export const getMenuIntentHandler: RequestHandler = {

   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
         || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
         && handlerInput.requestEnvelope.request.intent.name === 'GetMenuIntent');
   },

   handle(handlerInput: HandlerInput): Response {
      return handlerInput.responseBuilder
         .speak(menuFormatter.formatMenuForSpeech())
         .withSimpleCard(STRINGS.SKILL_NAME, menuFormatter.formatMenuForSimpleCard())
         .getResponse();
   },

};
