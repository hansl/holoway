import {Field} from '../../db/models/fields';
import {FieldDescriptor} from '../../db/models/fields';
import {assert} from '../../lib/assert';


function _createSuperKlass({_options, _store, ...fields}) {
  const descriptorMap = Object.create(null);
  for (let name of Object.keys(fields)) {
    const definition = fields[name];

    if (definition instanceof FieldDescriptor) {
      descriptorMap[name] = definition;
    }
    else if (FieldDescriptor.isPrototypeOf(definition)) {
      descriptorMap[name] = new definition({name});
    }
    else if (Field.isPrototypeOf(definition)) {
      descriptorMap[name] = new definition.descriptor({name});
    }
    else if (definition instanceof Field) {
      descriptorMap[name] = new definition.descriptor({name});
    }
    else if (FieldDescriptor.isPrototypeOf(definition.type)) {
      descriptorMap[name] = new definition.type({name, ...definition});
    }
    else if (Field.isPrototypeOf(definition.type)) {
      const descriptor = definition.type.descriptor;
      descriptorMap[name] = new descriptor({name, ...definition});
    }
    else {
      throw ArgumentError('Definition ' + JSON.stringify(definition)
                          + ' invalid.');
    }
  }
  Object.freeze(descriptorMap);

  class SuperKlass extends ModelBase {
    constructor({...values}) {
      super(descriptorMap, values);
    }

    static all() {
      assert(_store != null);
      return _store.all({model: this});
    }
    static save(instance) {
      assert(instance instanceof SuperKlass);
      return _store.save(instance);
    }
  }

  for (const name of Object.keys(fields)) {
    Object.defineProperty(SuperKlass.prototype, name, {
      get() { return this._fields[name].value; },
      set(v) { this._fields[name].value = v; },
    });
  }
  return SuperKlass;
}


const kToken = Symbol();


class ModelBase extends Model {
  constructor(definitionMap, values) {
    super(kToken);
    this._fields = Object.create(null);

    for (const name of Object.keys(definitionMap)) {
      const value = values[name];
      const descriptor = definitionMap[name];

      this._fields[name] = new descriptor.klass({
        descriptor,
        value: values[name],
        model: this,
      });
    }

    Object.freeze(this._fields);
  }
  get $fields() { return this._fields; }
  get $fieldArray() { return Object.values(this._fields); }

  $asJson() {
    const json = Object.create(null);
    for (const name of Object.keys(this._fields)) {
      json[name] = this._fields[name].asJson();
    }
    return json;
  }

  $save() {
    return this.constructor.save(this);
  }
}


export function Model(options) {
  if (options === kToken) {
    return;
  }
  return _createSuperKlass(options);
}
