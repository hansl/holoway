import {assert} from '../../lib/assert';


export class Query {
  constructor(manager) {
    this._manager = manager;
  }

  filter(by) {
    assert(typeof by == 'object');

    for (const key of Object.keys(by)) {
      this._filters[key] = by[key];
    }

    return this;
  }
}
