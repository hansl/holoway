import {MemoryDataStore} from '../../../src/db/datastore/memory';
import {Model} from '../../../src/db/model/model';
import {NumberField} from '../../../src/db/model/field';
import {NumberFieldDescriptor} from '../../../src/db/model/field';
import {MemoryQuery} from '../../../src/db/query/memory';

import {odd} from '../../../src/db/query/filters';

import {expect} from 'chai';


describe('MemoryQuery', () => {
  let model = null;
  let TestModel = null;

  beforeEach(() => {
    TestModel = class extends Model({
      $store: new MemoryDataStore(),
      field1: NumberFieldDescriptor,
      field2: NumberFieldDescriptor,
    }) {}
    model = new TestModel();
  })
  afterEach(() => {
    model = null;
    TestModel = null;
  });

  it('can be created', () => {
    const query = new MemoryQuery(model.$manager);
    expect(query).to.be.an.instanceof(MemoryQuery);
  });

  it('can execute with none', (done) => {
    const query = model.$manager.all.filterBy({field1: 1});
    const row1 = new TestModel();
    row1.$save();

    query.count().toPromise()
      .then((x) => expect(x).to.equal(0))
      .then(() => done());
  });
  it('can execute with all', (done) => {
    const query = model.$manager.all;
    const row1 = new TestModel();
    row1.$save();

    query.count().toPromise()
      .then((x) => expect(x).to.equal(1))
      .then(() => done());
  });
  it('can filter with all', (done) => {
    let query = model.$manager.all;
    new TestModel({field1: 1}).$save();
    new TestModel({field1: 2}).$save();
    new TestModel({field1: 3}).$save();

    query = query.filterBy({field1: odd});

    query.count().toPromise()
      .then((x) => expect(x).to.equal(1))
      .then(() => new TestModel({field1: 4}).$save())
      .then(() => query.count().toPromise())
      .then((x) => expect(x).to.equal(2))
      .then(() => done());
  });
});
