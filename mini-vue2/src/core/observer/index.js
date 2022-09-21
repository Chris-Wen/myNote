/*
 * @Author: Chris-Wen
 * @Date: 2022-07-04 10:35:53
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 11:06:46
 */
import Dep from "./dep";
/**
 * @description: 观察者 ，它的作用是给对象的属性添加getter和setter，用于依赖的收集和派发更新
 * @return {*}
 */
export class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;

    if (Array.isArray(value)) {
      //重写数组的7个方法
      prototNewArrProto(value);

      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys();

    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  observeArray(array) {
    for (let i = 0; i < array.length; i++) {
      observe(array[i]);
    }
  }
}

function protoNewArrProto(value) {
  const arrayProto = Array.prototype;
  const arrayMethods = Object.create(arrayProto);

  const methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    const original = arrayProto[method];
    arrayMethods[method];
  });

  value.__proto__ = arrayMethods;
}

export function observe(value) {
  if (typeof value !== "object" || value === null) {
    return;
  }

  let ob;
  if (Object.isExtensible(value)) {
    //判断对象是否可扩展； 不可扩展不加入数据劫持
    ob = new Observer(value);
    ob.vmCount++;
  }
  return ob;
}

export function defineReactive(obj, key, val) {
  const dep = new Dep();
  if (arguments.length === 2) {
    val = obj[key];
  }
  let childOb = observe(val);

  Object.defineProperty(obj, key, {
    get: function () {
      //依赖收集
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            //getter 的是个数组
            dependArray();
          }
        }
      }

      return val;
    },
    set: function (newVal) {
      if (newVal !== val) {
        val = newVal;
      }
      childOb = observe(newVal); //设置的如果是Object，继续添加响应式
      // dep.notify()
    },
  });
}
