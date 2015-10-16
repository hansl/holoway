

export function once(proto, name, descriptor) {
  if (!descriptor.value) {
    throw new ArgumentError();
  }

  let done = false;
  let value = null;
  const fn = descriptor.value;
  descriptor.value = function(...args) {
    if (done) {
      return value;
    }
    done = true;
    return value = fn.call(this, ...args);
  };
}
