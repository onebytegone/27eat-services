import _ from 'underscore';
import { STRINGS } from '../strings';

export default class MenuFormatter {

   public formatMenuForSpeech(menu: Menu): string {
      const formattedMeals = _.map([ 'breakfast', 'lunch', 'supper' ], (meal: MealKey) => {
         const header = STRINGS.MEAL_NAMES[meal] + '<break time="200ms"/>';

         return header + _.map(menu[meal], this._sanitizeStringForSpeech.bind(this)).join(',');
      });

      return formattedMeals.join('<break time="500ms"/>');
   }

   public formatMenuForSimpleCard(menu: Menu): string {
      const formattedMeals = _.map([ 'breakfast', 'lunch', 'supper' ], (meal: MealKey) => {
         const header = STRINGS.MEAL_NAMES[meal] + ':\n';

         return header + menu[meal].join('\n');
      });

      return formattedMeals.join('\n');
   }

   public formatMealForSpeech(mealItems: MealItems): string {
      return _.map(mealItems, this._sanitizeStringForSpeech.bind(this)).join(',');
   }

   public formatMealForSimpleCard(mealItems: MealItems): string {
      return mealItems.join('\n');
   }

   private _sanitizeStringForSpeech(text: string): string {
      return text.replace(/&/g, 'and');
   }

}
