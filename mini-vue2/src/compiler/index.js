/*
 * @Author: Chris-Wen
 * @Date: 2022-07-04 14:53:32
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 15:05:35
 */
/**
 * @description: 生成 render函数
 * @param {*} template 模板
 * @return {Function}
 */
export function compileToFunction(template) {
  // 1. template 转 ast
  // 2. 生成rende方法 -> 返回虚拟dom
  // 2.1 生成render函数的返回代码块字符串形式
  // 2.2 生成render函数 new Function
}
