import {MemoryQuery} from '../../db/query/memory';
import {DataStore} from '../datastore/datastore';
import {Model} from '../model/model';
import {assert} from '../../lib/assert';
import Rx from 'rx';


export class MemoryDataStore extends DataStore {
  constructor() {
    super();
    this._map = new Map();
  }

  /**
   * Returns an Observable which lists all of ModelKlass in the
   * database.
   */
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

  /**
   * Returns a single value Observable which is the count of objects.
   */
  count(ModelKlass) {
    if (!this._map.has(ModelKlass)) {
      return Rx.Observable.just(0);
    }

    const m = this._map.get(ModelKlass);
    return Rx.Observable.just(Array.from(m.values()).length);
  }

  /**
   * Create and save a new instance of the model class.
   */
  create(ModelKlass) {
    const instance = new ModelKlass();
    this.save({instance});
    return Rx.Observable.just(instance);
  }

  /**
   * Create a query object.
   */
  createQuery(options) {
    return new MemoryQuery(options);
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
