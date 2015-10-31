import {assert} from '../../lib/assert';
import {Exception} from '../../lib/exception';


export class RequiredOptionalMismatchError extends Exception {}
export class UndefinedFieldAccessError extends Exception {}


export class FieldDescriptor {
  _name: string
  _default: any
  _required: bool

  constructor({name, required, optional, ...options}) {
    const defaultValue = ('default' in options) ? options['default']
                                                : options.defaultValue;

    // Let the user specify either optional or required,
    // but only use the defined one. Assert.
    if (optional !== undefined) {
      assert(!optional === !!required, RequiredOptionalMismatchError);
      required = !optional;
    }
    else {
      required = !!required;
    }

    this._name = name === undefined ? null : '' + name;
    this._required = required;

    if (defaultValue === undefined && required) {
      this._default = this.constructor.default;
    }
    else {
      this._default = defaultValue;
    }

    assert(this._default !== undefined || !required);
  }

  get default() { return this._default; }
  get klass() { return this.constructor.klass; }
  get name() { return this._name; }
  get required() { return this._required; }

  convert(v) {
    if (v === undefined) {
      return this.default;
    }
    return this.constructor.convert(v);
  }
}


export class NumberFieldDescriptor extends FieldDescriptor {
  static get default() { return 0; }
  static get klass() { return NumberField; }
  static convert(v) { return parseFloat(v) | 0; }
}


export class Field {
  _descriptor: FieldDescriptor
  _dirty: bool
  _undefined: bool
  _value: any

  constructor(options = {}) {
    let {value, descriptor, model, _undefined} = options;
    assert(this.constructor.descriptor);

    this._descriptor = descriptor || new this.constructor.descriptor(options);
    this._dirty = false;
    this._model = model;
    this._undefined = _undefined;

    this._value = this.descriptor.convert(value);
  }

  get descriptor() { return this._descriptor; }
  get dirty() { return this._dirty; }
  set dirty(v) { this._dirty = this._dirty || v; }
  get name() { return this.descriptor.name; }

  get hasValue() { return this._value !== undefined; }
  get value() {
    assert(!this._undefined, UndefinedFieldAccessError);
    return this.hasValue ? this._value : this.descriptor.default;
  }
  set value(v) {
    this._undefined = false;
    this._dirty = true;
    this._value = this.descriptor.convert(v);
  }

  /* By default, the behaviour here is to convert values. */
  asJson() { return this.value; }
  fromJson(x) { this.value = x; }

  convert(v) { return this.descriptor.convert(v); }

  clear() {
    if (this.descriptor.required) {
      this.value = this.descriptor.default;
    }
    else {
      this.value = undefined;
    }
  }

  save() {
    if (!this._dirty) {
      return;
    }
    this._dirty = false;
  }

  static get default() { return null; }
}


export class NumberField extends Field {
  static get descriptor() { return NumberFieldDescriptor; }
}
