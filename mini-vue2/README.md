<!--
 * @Author: Chris-Wen
 * @Date: 2022-06-27 11:31:34
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 13:05:48
-->
# mini-vue2

## 核心流程

  **vue的核心流程：**

  1. 创造响应式数据
  2. 模板编译 生成 ast
  3. ast 转为render函数 后续每次数据更新 只执行render函数(不需要再次进行ast的转换)
  4. render函数执行 生成 vNode节点（会使用到响应式数据）
  5. 根据vNode 生成 真实dom 渲染页面
  6. 数据更新 重新执行render


### 目录结构

src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── shared          # 共享代码

###### core
core 目录包含mini-vue2的核心代码，包括全局API封装，Vue实例化、观察者、虚拟DOM、工具函数等等

###### compiler 
包含编译相关代码，包括把模块解析成ast语法树，ast语法树优化、代码生成


