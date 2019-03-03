import { handler } from '../src/MenuSkillHandler';
import { expect } from 'chai';


describe('MenuSkillHandler', function() {

   it('returns a handler function', function() {
      expect(handler).to.be.a('function');
   });

});
