function callAll(...fns: any) {
  return function (...args: any) {
    return fns.forEach((fn: any) => fn && fn(...args));
  };
}

export { callAll };
