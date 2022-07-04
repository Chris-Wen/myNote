import { popTarget, pushTarget } from "./dep";

let uid = 0;

export default class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watcher.push(this);

    // options 标识用户自定义watch
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }

    this.cb = cb;
    this.id = ++uid;
    this.active = true;

    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    //是否懒执行
    this.lazy = optinons?.lazy;
    //dirty 计算属性使用
    this.dirty = this.lazy;
    this.value = this.lazy ? void 0 : this.get();

    //_update render函数
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    }
  }

  /**
   * @description: 处理getter，重新收集依赖deps
   * @return {*}
   */
  get() {
    /**
     * 1.当我们创建渲染watcher的时候 会把当前的渲染watcher放到Dep.target上
     * 2.调用_render()取值 走到值的get上
     */
    pushTarget(this); //添加watcher对象到targetStack中

    let value;
    const vm = this.vm;
    try {
      value = this.getter.call(vm);
    } catch (e) {
    } finally {
      // 渲染完毕后清空
      if (this.deep) {
        //watch属性 deep
      }
      popTarget();
      this.cleanupDeps();
    }

    return value;
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDepIds.push(dep);

      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this); //dep remove
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }

  //watcher 更新
  update() {
    if (this.lazy) {
      //watch 属性中的缓存
      this.dirty = true;
    } else if (this.sync) {
      this.run(); //watch属性的cb
    } else {
      //开启更新队列
      queueWatcher(this);
    }
  }

  //实际刷新视图的操作 执行render用到的都是实例最新的属性值
  run() {
    const newVal = this.get();
    const oldVal = this.value;

    if (oldVal !== newVal) {
      this.value = newVal;
      // watch的回调函数 传入最新的值 和上次还未更新的值
      this.user && this.cb.call(this.vm, newVal, oldVal);
    }
  }

  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }

  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend(); //deps 对象添加
    }
  }

  //组件卸载时移除订阅
  teardown() {}
}

//watcher queue 本次需要更新的视图队列
let queue = [];
//wacher 去重 { 0:true, 1: true }
let has = {};
//批量处理， 防抖
let pending = false;

/**
 * @description: 不管执行多少次update操作，最终只执行一轮刷新操作
 * @param {*} watcher
 * @return {*}
 */
function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;
    console.log(queue);
    if (pending) {
      // 刷新队列 多个属性刷新 其实执行的只是第一次 合并刷新了
      // setTimeout(flushSchedulerQueue, 0);
      // 将刷新队列的执行和用户回调的执行都放到一个微任务中
      nextTick(flushSchedulerQueue);
      pending = true;
    }
  }
}

/**
 * 刷新调度队列 且清理当前的标识 has pending 等都重置
 * 先执行第一批的watcher，如果刷新过程中有新的watcher产生，再次加入队列即可
 */
function flushSchedulerQueue() {
  const flushQueue = [...queue];
  queue = [];
  has = {};
  pending = false;
  // 刷新视图 如果在刷新过程中 还有新的watcher 会重新放到queueWatcher中
  flushQueue.forEach((watcher) => watcher.run());
}

//nextTick实现
let callbacks = [];
export function nextTick(cb) {
  callbacks.push(cb);
  Promise.resolve().then(() => {
    const cbs = [...callbacks];
    callbacks = [];

    cbs.forEach((_cb) => _cb());
  });
}
