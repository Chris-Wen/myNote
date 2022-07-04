/*
 * @Author: Chris-Wen
 * @Date: 2022-06-27 13:42:47
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 10:55:09
 */
import { observe } from "./observer";

export function initState(vm) {
  const opts = vm.$options;

  if (opts.props) {
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.methods) {
  }
  if (opts.watch) {
  }
  if (opts.computed) {
  }
}

//props数据代理  props中定义的数据，其他地方可直接通过this[key] 调用
export function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get: function () {
      return target[sourceKey][key];
    },
    set: function (val) {
      this[sourceKey][key] = val;
    },
  });
}

function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

  const keys = Object.keys(data);
  const props = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys.length;

  while (i--) {
    const key = keys[i];
    // if (process.env.NODE_ENV !== "production") {
    //   //非生产环境 方法名与data中的key重名的冲突提示
    // }
    if (props && props.hasOwnProperty(key)) {
      console.warn("props与data key同名冲突警告");
    } else {
      proxy(vm, "_data", key); //代理data， this[key]直接获取data中的数据 this[key] ===> this.data[key]
    }
  }

  //数据劫持
  observe(data, true /* asRootData */);
}

function observe(value, asRootData = false) {
  if (typeof value !== "object" || value === null) {
    return;
  }

  let ob;
  if (Object.isExtensible(value)) {
    //判断对象是否可扩展； 不可扩展不加入数据劫持
    ob = new Observer(value);
  }

  return ob;
}
