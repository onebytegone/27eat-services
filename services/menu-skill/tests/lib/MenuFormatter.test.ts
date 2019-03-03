import MenuFormatter from '../../src/lib/MenuFormatter';
import { expect } from 'chai';

describe('MenuFormatter', function() {
   const menu = {
      'date': '2019-03-03',
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

   let formatter: MenuFormatter;

   beforeEach(() => {
      formatter = new MenuFormatter();
   });

   describe('formatMenuForSpeech', () => {

      it('formats a menu as expected', () => {
         expect(formatter.formatMenuForSpeech(menu)).to.strictlyEqual(
            'Breakfast<break time="200ms"/>'
            + 'Cereal,Milk'
            + '<break time="500ms"/>'
            + 'Lunch<break time="200ms"/>'
            + 'Peanut butter and jelly,Pineapple juice'
            + '<break time="500ms"/>'
            + 'Supper<break time="200ms"/>'
            + 'Ramen,Soju'
         );
      });

   });

   describe('formatMenuForSimpleCard', () => {

      it('formats a menu as expected', () => {
         expect(formatter.formatMenuForSimpleCard(menu)).to.strictlyEqual(
            'Breakfast:\n'
            + 'Cereal\nMilk\n'
            + 'Lunch:\n'
            + 'Peanut butter & jelly\nPineapple juice\n'
            + 'Supper:\n'
            + 'Ramen\nSoju'
         );
      });

   });

   describe('formatMealForSpeech', () => {

      it('formats a meal as expected', () => {
         expect(formatter.formatMealForSpeech(menu.lunch)).to.strictlyEqual(
            'Peanut butter and jelly,Pineapple juice'
         );
      });

   });

   describe('formatMealForSimpleCard', () => {

      it('formats a meal as expected', () => {
         expect(formatter.formatMealForSimpleCard(menu.lunch)).to.strictlyEqual(
            'Peanut butter & jelly\nPineapple juice'
         );
      });

   });

});
