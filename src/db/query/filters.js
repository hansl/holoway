

export function and(a, b) {
  return function(x) {
    return a(x) && b(x);
  }
}

export function odd(f) {
  return f % 2 === 0;
}

export function or(a, b) {
  return function(x) {
    return a(x) || b(x);
  }
}
