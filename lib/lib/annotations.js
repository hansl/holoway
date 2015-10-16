"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = once;

function once(proto, name, descriptor) {
  if (!descriptor.value) {
    throw new ArgumentError();
  }

  var done = false;
  var value = null;
  var fn = descriptor.value;
  descriptor.value = function () {
    if (done) {
      return value;
    }
    done = true;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return value = fn.call.apply(fn, [this].concat(args));
  };
}