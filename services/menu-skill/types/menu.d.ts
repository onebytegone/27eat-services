interface Menu {
   date: string;
   breakfast: MealItems;
   lunch: MealItems;
   supper: MealItems;

   [index: string]: string | MealItems;
}

type MealKey = 'breakfast' | 'lunch' | 'supper';
type MealItems = string[];
