/**  Step 1
 *  vue.js初始化，自调用
 *  参数： global, factory
 *  global: 调用环境,
 *  factory: 方法
 *  在浏览器环境下，exports, module, define 都不存在，
 *  最后代码直接执行了(global = global || self, global.Vue = factory())
 *
 *  浏览器环境下： self 的值就是Window, gloabl未传/未定义情况下，直接指向Window
 */
(function (global, factory) {
  // console.warn(define)
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.Vue = factory()));

  // console.log(global)
})(this, vueFactory);

/** Step 2
 *  Vue方法内到底初始化执行了哪些方法
 *  执行内部方法：
 *      initMixin(Vue);
        stateMixin(Vue);
        eventsMixin(Vue);
        lifecycleMixin(Vue);
        renderMixin(Vue);
        initGlobalAPI()
 *  返回了 Vue的构造方法
 */
function vueFactory() {
  var emptyObject = Object.freeze({});

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;

  ////// -------------------------------- 标签、属性检测等等方法函数
  /**  闭包留存map
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(",");
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) {
          return map[val.toLowerCase()];
        }
      : function (val) {
          return map[val];
        };
  }
  // -- (定义一个方法检测是否为Vue内置标签)
  var isBuiltInTag = makeMap("slot,component", true);
  // -- （检查属性是否为保留属性）
  var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");

  /**
   * Create a cached version of a pure function.
   */
  function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }

  ////// -----------------------------------

  /// **** 常量定义/ 名称
  var SSR_ATTR = "data-server-rendered";

  var ASSET_TYPES = ["component", "directive", "filter"];
  //生命周期名称
  var LIFECYCLE_HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestroy",
    "destroyed",
    "activated",
    "deactivated",
    "errorCaptured",
    "serverPrefetch",
  ];

  var config = {
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "development" !== "production",

    /**
     * Whether to enable devtools
     */
    devtools: "development" !== "production",

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: false,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: false,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: false,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: function (a, b, c) {},

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: function (_) {
      return _;
    },

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: false,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS,
  };

  // ... 等等函数
  /// ***

  // >>>  订阅 构造器
  var uid = 0;
  var Dep = function Dep() {
    this.id = uid++;
    this.subs = [];
  };

  // <<<

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function initGlobalAPI(Vue) {
    // config
    var configDef = {};
    configDef.get = function () {
      return config;
    };
    {
      configDef.set = function () {
        warn(
          "Do not replace the Vue.config object, set individual fields instead."
        );
      };
    }
    Object.defineProperty(Vue, "config", configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1,
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj;
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + "s"] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    // extend(Vue.options.components, builtInComponents);

    // initUse(Vue);
    // initMixin$1(Vue);
    // initExtend(Vue);
    // initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  function Vue(options) {
    if (!(this instanceof Vue)) {
      warn("Vue is a constructor and should be called with the `new` keyword");
    }
    // this._init(options);
  }

  Vue.version = "2.6.14";

  //虚拟节点 构造器
  var VNode = function VNode(
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  // 观察者
  var Observer = function Observer(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
  };

  // 监视
  var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {};

  function compileToFunctions() {}

  function initMixin(Vue) {}

  function stateMinxin(Vue) {}

  function eventsMinxin(Vue) {}

  function lifecycleMixin(Vue) {}

  function renderMixin(Vue) {}

  // 定义Vue原型上的init方法(内部方法)
  initMixin(Vue);
  // 定义原型上跟数据相关的属性方法
  stateMixin(Vue);
  //定义原型上跟事件相关的属性方法
  eventsMixin(Vue);
  // 定义原型上跟生命周期相关的方法
  lifecycleMixin(Vue);
  // 定义渲染相关的函数
  renderMixin(Vue);

  Vue.compile = compileToFunctions;

  return Vue;
}
