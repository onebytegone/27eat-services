import { SkillBuilders } from 'ask-sdk-core';
import { getMealIntentHandler } from './request-handlers/GetMealIntentHandler';
import { getMenuIntentHandler } from './request-handlers/GetMenuIntentHandler';
import { helpIntentHandler } from './request-handlers/HelpIntentHandler';
import { cancelAndStopIntentHandler } from './request-handlers/CancelAndStopIntentHandler';
import { sessionEndedRequestHandler } from './request-handlers/SessionEndedRequestHandler';
import { errorHandler } from './request-handlers/ErrorHandler';

const skillBuilder = SkillBuilders.custom();

skillBuilder.addRequestHandlers(
   getMealIntentHandler,
   getMenuIntentHandler,
   helpIntentHandler,
   cancelAndStopIntentHandler,
   sessionEndedRequestHandler,
);

skillBuilder.addErrorHandlers(errorHandler);

export const handler = skillBuilder.lambda();
