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
  let ob = new Observer(value);

  return ob;
}

function Observer(value) {
  this.value = value;
  this.dep = new Dep();

  if (Array.isArray(value)) {
    value.__proto__ = arrayMethods;
  } else {
    for (const key in value) {
      defineReactive(value, key, value[key]);
    }
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

//---- Dep

let uid = 0;
function Dep() {
  this.id = uid++;
  this.subs = [];
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};
Dep.prototype.removeSub = function (sub) {
  // remove;
};
Dep.prototype.depend = function () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};
Dep.prototype.notify = function () {
  const subs = this.subs.slice();
  for (let i = 0; i < subs.length; i++) {
    subs[i].update();
  }
};

/* Dep 是一个 Class，它定义了一些属性和方法，
这里需要特别注意的是它有一个静态属性 target，
这是一个全局唯一 Watcher，这是一个非常巧妙的设计，
因为在同一时间只能有一个全局的 Watcher 被计算，
另外它的自身属性 subs 也是 Watcher 的数组 */
Dep.target = null;

const targetStack = [];

function pushTarget(watcher) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = watcher;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

// Dep 实际上就是对 Watcher 的一种管理，Dep 脱离 Watcher 单独存在是没有意义的
//--- Watcher
function Watcher(vm) {
  this.vm = vm;
  this.deps = []; //watcher实例持有的Dep实例的数组
  this.newDeps = [];
  this.depIds = new Set();
  this.newDepIds = new Set();
}

Watcher.prototype.get = function () {};
Watcher.prototype.addDep = function () {};
Watcher.prototype.cleanupDeps = function () {};
