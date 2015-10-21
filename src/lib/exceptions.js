
export class Exception extends Error {
  constructor(message = '') {
    super('Hello');

    this.name = '_' + this.constructor.name;
    this.message = message || this.constructor.name;
    this.stack = new Error().stack;
  }
}

export class NotImplementedError extends Error {}
