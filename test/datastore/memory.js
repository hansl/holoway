import {MemoryDataStore} from '../../src/db/datastore/memory';


describe('Memory', () => {
  it('can be created empty', () => {
    new MemoryDataStore();
  });
});
