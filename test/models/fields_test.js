import {Field} from '../../src/db/models/fields';
import {FieldDescriptor} from '../../src/db/models/fields';
import {NumberField} from '../../src/db/models/fields';
import {NumberFieldDescriptor} from '../../src/db/models/fields';
import {expect} from 'chai';


describe('NumberField', () => {
  it('is a Field', () => {
    expect(Field.isPrototypeOf(NumberField)).to.equal(true);
  });

  it('can hold a value', () => {
    const v = new NumberField();
    v.value = 1;
    expect(v.value).to.equal(1);
  });
  it('will convert a value', () => {
    const v = new NumberField();
    v.value = '1';
    expect(v.value).to.equal(1);
  });
  it('has a default undefined value', () => {
    const v = new NumberField();
    expect(v.value).to.equal(undefined);
  });
  it('has a default value', () => {
    const v = new NumberField({default: 1});
    expect(v.value).to.equal(1);
  });
  it('has a required default value', () => {
    const v = new NumberField({required: true});
    expect(v.value).to.equal(0);
  });
  it('can set a default value', () => {
    const v = new NumberField({default: 1});
    expect(v.value).to.equal(1);
  });
});
