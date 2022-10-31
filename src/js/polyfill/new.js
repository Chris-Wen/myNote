/**
 * @description new 实现
 * @param {*} fn
 * @param  {...any} args
 * @returns
 */
function myNew(fn, ...args) {
  const obj = {};

  obj.__proto__ = fn.prototype;

  fn.apply(obj, args);

  return obj;
}
