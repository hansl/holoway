
export class AssertionError extends Error {
  toString() {
    return 'Assertion Failure';
  }
}


export function assert(cond, ex = AssertionError, ...args) {
  if (!cond) {
    throw new ex(...args);
  }
}
