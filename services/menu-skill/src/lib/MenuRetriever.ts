import moment from 'moment';

export default class MenuRetriever {

   public fetchMenuForDate(date: string): Promise<Menu> {
      const sanitizedDate = moment(date).format('YYYY-MM-DD');

      // TODO: fetch actual data source
      return new Promise((resolve) => setTimeout(resolve, 4))
         .then(() => {
            return {
               'date': sanitizedDate,
               'breakfast': [
                  'Cereal',
                  'Milk',
               ],
               'lunch': [
                  'Peanut butter & jelly',
                  'Pineapple juice',
               ],
               'supper': [
                  'Ramen',
                  'Soju',
               ],
            };
         });
   }

   public fetchMealForDate(date: string, meal: MealKey): Promise<MealItems> {
      return this.fetchMenuForDate(date)
         .then((menu) => menu[meal]);
   }

}
