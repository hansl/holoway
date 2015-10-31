import {snakeCase} from '../../src/lib/string';
import {expect} from 'chai';


describe('snakeCase', () => {
  const cases = {
    'HelloWorld': 'hello_world',
    '123': '_123',
    'helloWorld': 'hello_world',
    'aBCDEF': 'a_bcdef',
  };

  Object.entries(cases).forEach(([input, r]) => it('works for ' + input, () => {
    expect(snakeCase(input)).to.equal(r);
  }));
});
