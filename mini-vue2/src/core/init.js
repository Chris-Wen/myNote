/*
 * @Author: Chris-Wen
 * @Date: 2022-06-27 13:42:29
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-06-28 14:28:18
 */
import { initState } from "./initState";

export function initMixin(Vue) {
  /**
   * @description: Vue初始化操作
   * @param {*} options
   */
  Vue.prototype._init = function (options) {
    const vm = this;

    // vm.$options = mergeOptions(this.constructor.options, options); // 合并 Vue.options 和 传入的配置项
    vm.$options = options; // 合并 Vue.options 和 传入的配置项

    //initLifecycle(vm);
    //initEvents(vm);
    // initRender(vm)

    // callHook(vm, "beforeCreate"); // 执行初始化之前，执行 beforeCreate 的钩子

    // initInjections(vm) //resolve injections before data/props

    // 初始化状态
    // TODO computed methods watcher ....
    initState(vm);

    // initProvide(vm); //resolve provide after data/props

    // callHook(vm, "created");

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const ops = vm.$options;
  };
}
