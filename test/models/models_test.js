import {Model} from '../../src/db/models/models';
import {Field} from '../../src/db/models/fields';
import {FieldDescriptor} from '../../src/db/models/fields';
import {NumberField} from '../../src/db/models/fields';
import {NumberFieldDescriptor} from '../../src/db/models/fields';
import {expect} from 'chai';


describe('Model', () => {
  it('defines fields', () => {
    class TestModel extends Model({
      myField: NumberField
    }) {}
    const instance = new TestModel();

    expect(instance).to.be.an.instanceof(TestModel);
    expect(instance).to.be.an.instanceof(Model);
    expect(instance.$fieldArray.length).to.equal(1);
    expect(instance.$fieldArray[0]).to.be.an.instanceof(NumberField);
    expect(instance.$fieldArray[0]).to.be.an.instanceof(Field);
    expect(instance.$fields.myField).to.be.an.instanceof(NumberField);
    expect(instance.$fields.myField).to.be.an.instanceof(Field);

    expect(instance.$fieldArray.map((f) => f.name))
        .to.deep.equal(['myField']);
    expect(instance.$fieldArray.map((f) => f.value))
        .to.deep.equal([undefined]);
  });

  it('can create instances', () => {
    class TestModel extends Model({
      myField: { type: NumberField, default: 0 }
    }) {}
    const instance = new TestModel({
      myField: 2
    });

    expect(instance.myField).to.equal(2);
    expect(instance.$fieldArray.map((f) => f.value))
        .to.deep.equal([2]);
  });
});
