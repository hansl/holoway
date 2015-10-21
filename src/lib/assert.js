import {Exception} from '../lib/exceptions';


export class AssertionError extends Exception {}


export function assert(cond, Exception = AssertionError, ...args) {
  if (!cond) {
    throw new Exception(...args);
  }
}
