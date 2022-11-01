function myNew(fn, ...args) {
  //创建一个空对象并将对象的原型设置为函数的prototype对象
  const obj = {};
  obj.__proto__ = fn.prototype;
  //以上两步可合成一步
  //const obj = Object.create(fn.prototype)

  //调用构造函数，并且this绑定到obj上
  const value = fn.apply(obj, args);
  // 如果构造函数有返回值，并且返回的是对象，就返回value ;否则返回obj
  return value instanceof Object ? value : obj;
}

//判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
    prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }
}

/**
 * @description typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，
 * 但是对于其他的都会认为是 object，比如 Null、Date 等，
 * 所以通过 typeof 来判断数据类型会不准确。但是可以使用 Object.prototype.toString 实现。
 */
function typeOf(obj) {
  let type = Object.prototype.toString.call(obj);
  return type.slice(8, -1).toLowerCase();
}
console.log(typeOf(new Date()), typeOf(null), typeOf([]));

// call函数实现
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};

// apply 函数实现
Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  result = arguments[1] ? context.fn(...arguments[1]) : context.fn();

  // 将属性删除
  delete context.fn;
  return result;
};

// bind 函数实现
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
