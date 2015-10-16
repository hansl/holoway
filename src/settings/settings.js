
export class Settings {
  constructor(names: Array<String> | String | Object) {
    if (typeof names == 'object' && !(names instanceof Array)) {
      this._set(names);
    }
    else {
      if (typeof names == 'string') {
        names = [names];
      }

      names = [].concat(...names.map((v) => [v, `./${v}`]))

      for (const name of names) {
        const json = this._load(name);
        if (json) {
          this._set(json);
          break;
        }
      }
    }
  }

  _set(o) {
    let _ = Object.create(null);
    if (typeof o == 'object') {
      _ = JSON.parse(JSON.stringify(o));
    }

    let target = this;
    while (target && target !== Settings.prototype) {
      let properties = Object.getOwnPropertyNames(target);
      properties.filter((_) => _ != 'constructor');

      for (const property of properties) {
        if (property.match(/^_/)) {
          const name = property.substr(1);
          Object.defineProperty(this, name, {
            get() {
              if (name in _) {
                return _[name];
              }
              else {
                return this[property];
              }
            }
          });
        }
      }

      target = Object.getPrototypeOf(target);
    }
  }

  _load(name) {
    // We go two parents to ignore this own module.
    let parent = module.parent.parent;

    while (parent) {
      let json = null;

      try {
        json = parent.require(name);
      }
      catch(e) {}

      if (json) {
        return json;
      }
      parent = parent.parent;
    }
    return null;
  }
}
