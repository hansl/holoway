import {MemoryDataStore} from '../../db/datastore/memory';
import {Query} from '../../db/query/query';
import {assert} from '../../lib/assert';

import Rx from 'rx';


export class MemoryQuery extends Query {
  execute() {
    const store = this._manager.store;
    assert(store instanceof MemoryDataStore);

    // Build the filters.
    let observable = store.all(this._manager.Model);
    for (const [key, fn] of this._filters.entries()) {
      observable = observable.filter((row) => {
        return fn(row.$fields[key].value, row.$fields[key]);
      });
    }

    return observable;
  }
}
