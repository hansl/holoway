

export class ModelManager {
  constructor({store, model}) {
    this._store = store;
    this._model = model;
  }

  get Model() { return this._model; }
  get store() { return this._store; }

  get all() { return this._store.createQuery({manager: this, all: true}); }
  get none() { return this._store.createQuery({manager: this}); }
}
