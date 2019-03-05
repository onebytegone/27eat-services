import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';
import { getMealIntentHandler } from './request-handlers/GetMealIntentHandler';
import { getMealCanFulfillHandler } from './request-handlers/GetMealCanFulfillHandler';
import { getMenuIntentHandler } from './request-handlers/GetMenuIntentHandler';
import { getMenuCanFulfillHandler } from './request-handlers/GetMenuCanFulfillHandler';
import { helpIntentHandler } from './request-handlers/HelpIntentHandler';
import { cancelAndStopIntentHandler } from './request-handlers/CancelAndStopIntentHandler';
import { sessionEndedRequestHandler } from './request-handlers/SessionEndedRequestHandler';
import { errorHandler } from './request-handlers/ErrorHandler';

const skillBuilder = SkillBuilders.custom();

skillBuilder.addRequestHandlers(
   getMealIntentHandler,
   getMealCanFulfillHandler,
   getMenuIntentHandler,
   getMenuCanFulfillHandler,
   helpIntentHandler,
   cancelAndStopIntentHandler,
   sessionEndedRequestHandler,
);

skillBuilder.addErrorHandlers(errorHandler);
skillBuilder.withApiClient(new DefaultApiClient());

export const handler = skillBuilder.lambda();
