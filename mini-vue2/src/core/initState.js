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
      //props与data key同名冲突警告
    } else {
      proxy(vm, "_data", key);
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

//观察者 ，它的作用是给对象的属性添加getter和setter，用于依赖的收集和派发更新
function Observer(value) {
  this.value = value;
  this.dep = null;
  this.vmCount = 0;

  if (Array.isArray(value)) {
    //修改__proto__, 重写数组的7个操作方法
    protoNewArrProto(value);

    this.observeArray(value);
  } else {
    this.walk(value);
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
}

Observer.prototype.walk = function (value) {
  for (const key in value) {
    defineReactive(value, key, value[key]);
  }
};

Observer.prototype.observeArray = function (value) {
  //数组子项响应式
  for (const key in value) {
    observe(value[key]);
  }
};

function defineReactive(target, key, value) {
  observe(value);
  Object.defineProperty(target, key, {
    get: function () {
      return value;
    },
    set: function (newVal) {
      if (newVal !== value) {
        //如果newVal是对象，继续加入响应式
        observe(newVal);
        value = newVal;
        console.log(`派发更新{${key}: ${value}}`);
        // dep.notify()
      }
    },
  });
}
