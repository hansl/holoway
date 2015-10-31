import {Exception} from '../lib/exception';


export class AssertionError extends Exception {}


export function assert(cond, Exception = AssertionError, ...args) {
  if (!cond) {
    throw new Exception(...args);
  }
}
