import {DataStore} from '../datastore/datastore';
import {Model} from '../models/models';
import {assert} from '../../lib/assert';
import Rx from 'rx';


export class MemoryDataStore extends DataStore {
  constructor() {
    super();
    this._map = new Map();
  }

  all(ModelKlass) {
    if (!this._map.has(ModelKlass)) {
      return Rx.Observable.empty();
    }
    return Rx.Observable
      .from(this._map.get(ModelKlass))
      .map(([key, value]) => {
        return ModelKlass.createFromJson(value)
      });
  }
  count() {
    return new Promise((resolve, reject) => {
      resolve(Array.from(this._map.values()).length);
    });
  }
  create(ModelKlass) {
    return new ModelKlass();
  }
  load({instance}) {
    const klass = instance.constructor;
    if (!this._map.has(klass)) {
      instance.$clear();
    }
    else {
      const m = this._map.get(klass);
      if (!m.has(instance)) {
        instance.$clear();
      }
      else {
        const json = m.get(instance);
        instance.$loadFromJson(json);
      }
    }
  }
  save({instance}) {
    assert(instance instanceof Model);
    const klass = instance.constructor;

    if (!this._map.has(klass)) {
      this._map.set(klass, new Map());
    }
    this._map.get(klass).set(instance, instance.$asJson());
    return Promise.resolve();
  }
}
