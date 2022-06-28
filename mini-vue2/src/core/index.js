/*
 * @Author: Chris-Wen
 * @Date: 2022-06-27 11:31:19
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-06-27 16:09:52
 * @description: Vue初始化做了以下几件事
 */
import { initMixin } from "./init";

/**
 * @description: Vue构造函数
 * @param {*} options 用户选项
 */
function Vue(options) {
  //初始化
  this?._init(options);
}

initMixin(Vue);
// stateMixin(Vue);
// eventsMixin(Vue);
// lifecycleMixin(Vue);
// renderMixin(Vue);

/**
 * 1、合并配置
 * 2、初始化生命周期
 * 3、初始化事件中心
 * 4、初始化渲染
 * 5、初始化data、props、computed、watcher等
 */
export default Vue;
