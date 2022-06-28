/*
 * @Author: Chris-Wen
 * @Date: 2022-06-27 18:51:07
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-06-27 23:34:46
 */

/**
 * @description Vue初始化start
 * @param {*} options
 */
function Vue(options) {
  console.log("new Vue");
  this._init(options);
}

// initMixin(Vue)
// lifecycleMixin(Vue)
stateMixin(Vue);
// eventsMixin(Vue);
// renderMixin(Vue)

/**
 * Vue 初始化end
 */

function stateMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    vm.$options = options;

    // initLifecycle(vm);
    // initEvents(vm);
    // initRender(vm);
    // callHook(vm, 'beforeCreate');
    // initInjections(vm); // resolve injections before data/props
    initState(vm);
    // initProvide(vm); // resolve provide after data/props
    // callHook(vm, 'created');

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initState(vm) {
  console.log("initState");
  const opts = vm.$options;

  let data = opts.data;
  data = typeof data === "function" ? data() : data || {};
  console.log(data);

  //数据响应式
  observe(data);
}

function observe(value) {
  if (typeof value !== "object" || value === null) {
    return;
  }

  new Observer(value);
}

function Observer(obj) {
  console.log("observer");
  this.value = obj;
  // this.dep = new Dep()

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue;
        console.log(`更新视图{name:${key}, value:${newValue}}`);
        //通知更新
        // dep.notify();
      }
    },
  });
}
