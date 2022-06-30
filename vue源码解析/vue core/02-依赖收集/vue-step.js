function Vue(options) {
  this._init(options);
}

initMixin(Vue);

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    // initLifecycle(vm)
    // initEvents(vm); //事件发布订阅
    // initRender(vm);
    // callHook(vm, "beforeCreate");
    // initInjections(vm); // resolve injections before data/props
    initState(vm);
    // initProvide(vm); // resolve provide after data/props
    // callHook(vm, "created");

    // if (vm.$options.el) {
    // vm.$mount(vm.$options.el)
    // }
  };
}

function initState(vm) {
  let opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === "function" ? data() : data || {};

  //observe data 数据观测 / 数据劫持
  observe(data);
}

const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "splice",
  "sort",
  "reverse",
];
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
methods.forEach((method) => {
  arrayMethods[method] = function () {
    console.log(`数组更新视图${method}`);
    // dep.notify()
    arrayProto[method].call(this, ...arguments);
  };
});

function observe(value) {
  if (typeof value !== "object" || value === null) {
    return;
  }
  if (Array.isArray(value)) {
    value.__proto__ = arrayMethods;
  }
  for (const key in value) {
    defineReactive(value, key, value[key]);
  }
}

function defineReactive(obj, key, value) {
  //实例化dep
  const dep = new Dep();

  observe(value);
  Object.defineProperty(obj, key, {
    get: function () {
      if (Dep.target) {
        //依赖收集
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function (newVal) {
      observe(newVal);
      if (newVal !== value) {
        value = newVal;
        console.log(`更新视图：{${key}: ${value}}`);
        //更新视图
        // dep.notify()
      }
    },
  });
}

let uid = 0;
function Dep() {
  this.id = uid++;
  this.subs = [];
}
Dep.addSub = function (sub) {
  this.subs.push(sub);
};
Dep.removeSub = function (sub) {
  remove;
};
