
export class Exception extends Error {
  constructor(message = '') {
    super('');

    this.name = '_' + this.constructor.name;
    this.message = message || this.constructor.name;
    this.stack = new Error().stack;
  }
}

export class ArgumentError extends Exception {
  constructor(...args) {
    console.log(args);
    const message = [];
    let name;
    let value;

    while (name = args.shift(), value = args.shift()) {
      message.push(`${name} = ${JSON.stringify(value)}`);
    }
    super('Argument Invalid: ' + message.join(', '));
  }
}

export class NotImplementedError extends Exception {}
