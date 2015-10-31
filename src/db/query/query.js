import {and} from '../../db/query/filters';
import {assert} from '../../lib/assert';
import {NotImplementedError} from '../../lib/exception';


export class Query {
  _manager: ModelManager

  constructor({manager}) {
    this._manager = manager;
    this._filters = new Map();
    this._fields = new Set();
  }

  count() {
    return this.execute().count();
  }

  filterBy(by) {
    assert(typeof by == 'object');

    for (const key of Object.keys(by)) {
      let filter = by[key];
      if (typeof filter != 'function') {
        const value = filter;
        filter = (x, field) => {
          return (x === field.convert(value));
        };
      }

      if (this._filters.has(key)) {
        filter = and(this._filters.get(key), filter);
      }
      this._filters.set(key, filter);
    }

    return this;
  }

  onlyFields(fields, ...args) {
    if (typeof fields != 'object') {
      fields = [fields, ...args];
    }
    else if (!(fields instanceof Array)) {
      fields = Object.keys(fields);
    }
    for (const name of fields) {
      this._fields.add('' + name);
    }

    return this;
  }

  execute(store) {
    throw NotImplementedError();
  }
}
