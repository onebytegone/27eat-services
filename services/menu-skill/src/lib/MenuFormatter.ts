export default class MenuFormatter {

   public formatMenuForSpeech(): string {
      return this._sanitizeStringForSpeech(''
         + 'Breakfast<break time="200ms"/>'
         + 'Cereal,Milk'
         + '<break time="500ms"/>'
         + 'Lunch<break time="200ms"/>'
         + 'Peanut butter & jelly,Pineapple juice'
         + '<break time="500ms"/>'
         + 'Supper<break time="200ms"/>'
         + 'Ramen,Soju');
   }

   public formatMenuForSimpleCard(): string {
      return 'Breakfast:\n'
         + 'Cereal\n'
         + 'Lunch:\n'
         + 'Peanut butter & jelly\n'
         + 'Supper:\n'
         + 'Ramen';
   }

   public formatMealForSpeech(): string {
      return this._sanitizeStringForSpeech('Peanut butter & jelly,Pineapple juice');
   }

   public formatMealForSimpleCard(): string {
      return 'Peanut butter & jelly\nPineapple juice';
   }

   private _sanitizeStringForSpeech(text: string): string {
      return text.replace(/&/g, 'and');
   }

}
