function Vue(options) {
  if (!(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  //   this._init(options);
}

initMixin(Vue);
// stateMixin(Vue);
// eventsMixin(Vue);
// lifecycleMixin(Vue);
// renderMixin(Vue);

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;

    vm.$options = vm.options;
    // initLifecycle(vm);
    // initEvents(vm);
    // initRender(vm);
    callHook(vm, "beforeCreate");
    initState(vm);
    callHook(vm, "created");

    // if (vm.$options.el) {
    //   vm.$mount(vm.$options.el);
    // }
  };
}

function callHook(vm, name) {
  console.log(`call ${name} hook`);
}

// 初始化状态参数 -- props、methods、data、computed、watch
function initState(vm) {
  let opts = vm.$options;

  if (opts.props) {
    // initProps(vm, opts.props)
  }

  if (opts.methods) {
    // initMethods(vm, opts.methods)
  }

  if (opts.data) {
    initData(vm);
  }

  //   if (opts.computed) {
  //     initComputed(vm, opts.computed);
  //   }

  //   if (opts.watch && opts.watch !== nativeWatch) {
  //     initWatch(vm, opts.watch);
  //   }
}

function initData(vm) {
  let data = vm.$options.data;

  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  // 遍历确认无冲突
  while (i--) {
    let key = keys[i];
    if (methods && methods[key]) {
      console.warn(`methods 已定义${key}`);
    }

    if (props && props[key]) {
      console.warn(`props 已定义${key}`);
    }
  }

  // observe data
  observe(data, true);
}

function observe(data, asRootData) {
  if (!isType(data, "object")) return;

  let ob = new Observer(data);

  return ob;
}

class Observer {
  constructor(val) {
    this.value = val;
    this.dep = new Dep();
    if (Array.isArray(val)) {
      this.observeArray(val);
    } else {
      this.walk(val);
    }
  }

  observeArray() {}

  walk(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i]);
    }
  }

  defineReactive(obj, key) {
    let dep = new Dep();
    let val = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        // if (Dep.target) {

        // }
        return val;
      },
      set(newVal) {
        if (val === newVal || (newVal !== newVal && val !== val)) {
          return;
        }
        obj[key] = newVal;
        dep.notify();
      },
    });
  }
}

class Dep {
  constructor() {}

  notify() {
    console.log("通知更新");
  }
}

const isType = (data, type) =>
  Object.prototype.toString.call(data).slice(8, -1) === type;
