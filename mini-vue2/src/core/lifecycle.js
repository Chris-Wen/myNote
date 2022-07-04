import { popTarget, pushTarget } from "./observer/dep";
import { createEmptyVNode } from "./vdom/vnode";
import Watcher from "./observer/watcher";
/*
 * @Author: Chris-Wen
 * @Date: 2022-06-27 13:43:03
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 17:01:43
 */
export function initLifecycle(vm) {
  const options = vm.$options;

  let parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent?.$root || vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._isMounted = false;
  vm._isDestroryed = false;
  vm._isBeingDestroyed = false;
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    const vm = this;
    const prevEl = vm.$el;
    const prevVnode = vm._vnode;

    if (!prevVnode) {
      //初始化render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating);
    } else {
      //updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
  };

  Vue.prototype.$forceUpdate = function () {};

  Vue.prototype.$destroy = function () {
    const vm = this;
    if (vm._isBeingDestroyed) return;

    callHook(vm, "beforeDestroy");

    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }

    // invoke destroy hooks on current rendered tree
    // vm.__patch__(vm._vnode, null)

    callHook(vm, "destroyed");
  };
}

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }

  callHook(vm, "beforeMount");

  //更新组件方法
  let updateComponent = () => {
    // 1. 调用render产生虚拟节点 vNode
    const vNodes = vm._render();
    // 2. 根据虚拟dom产生真是dom
    vm._update(vNodes, hydrating);
  };

  new Watcher(
    vm,
    updateComponent,
    () => {},
    {
      before() {
        if (vm._isMounted && !vm._isDestroryed) {
          callHook(vm, "beforeUpdate");
        }
      },
    },
    true /* isRenderWatcher */
  );

  hydrating = false;

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }

  return vm;
}

export function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  const handlers = vm.$options[hook];
  const info = `${hook} hook`;
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    //   vm.$emit('hook:' + hook)
  }
  popTarget();
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  let res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
  } catch (error) {}
  return res;
}
