/*
 * @Author: Chris-Wen
 * @Date: 2022-06-27 13:42:29
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-05 09:35:27
 */
import { initState } from "./initState";
import { callHook, mountComponent } from "./lifecycle";

const idToTemplate = cached((id) => {
  const el = document.querySelector(id);
  return el && el.innerHTML;
});

export function initMixin(Vue) {
  /**
   * @description: Vue初始化操作
   * @param {*} options
   */
  Vue.prototype._init = function (options) {
    const vm = this;

    // vm.$options = mergeOptions(this.constructor.options, options); // 合并 Vue.options 和 传入的配置项
    vm.$options = options; // 合并 Vue.options 和 传入的配置项

    initLifecycle(vm);
    //initEvents(vm);
    // initRender(vm)

    callHook(vm, "beforeCreate"); // 执行初始化之前，执行 beforeCreate 的钩子

    // initInjections(vm) //resolve injections before data/props

    // 初始化状态
    // TODO computed methods watcher ....
    initState(vm);

    // initProvide(vm); //resolve provide after data/props

    callHook(vm, "created");

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  //引入patch
  const patch = createPatchFunction();
  Vue.prototype.__patch__ = patch;

  Vue.prototype.$mount = function (el, hydrating) {
    const vm = this;
    const ops = vm.$options;
    el = el && document.querySelector(el);

    let template;
    // 没有render
    if (!ops.render) {
      if (!ops.template && el) {
        template = el.outerHTML;
      } else {
        template = ops.template;
      }
    }

    if (template) {
      console.log("------------------", /^[\.#a-zA-Z_]/i.test(template));
      if (/^[\.#a-zA-Z_]/i.test(template)) {
        template = document.querySelector(template).innerHTML;
      }

      // TODO 去除开头和结尾的空白符 m是忽略换行 进行多行匹配
      // template = template.trim();
      template = template.replace(/^\s+|\s+$/gm, "");

      // 编译模板 生成 render函数
      // const render = compileToFunction(template);
      // ops.render = render;
    }

    //组件挂载
    mountComponent(vm, el);
  };
}
