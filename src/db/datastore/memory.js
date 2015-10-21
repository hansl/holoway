import {DataStore} from '../datastore/datastore';
import {Model} from '../models/models';
import {assert} from '../../lib/assert';


export class MemoryDataStore extends DataStore {
  constructor() {
    super();
    this._map = new Map();
  }

  all() {
    return Array.from(this._map.values());
  }
  create(ModelKlass) {
    return new ModelKlass();
  }
  save(instance) {
    assert(instance instanceof Model);
    const klass = instance.constructor;

    if (!this._map.has(klass)) {
      this._map.set(klass, new Map());
    }
    this._map.get(klass).set(instance, instance.$asJson());
    return Promise.resolve();
  }
}
