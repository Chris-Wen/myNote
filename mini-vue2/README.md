<!--
 * @Author: Chris-Wen
 * @Date: 2022-06-27 11:31:34
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-06-27 11:34:44
-->
# mini-vue2


### 目录结构

src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── shared          # 共享代码

###### core
core 目录包含mini-vue2的核心代码，包括全局API封装，Vue实例化、观察者、虚拟DOM、工具函数等等

###### compiler 
包含编译相关代码，包括把模块解析成ast语法树，ast语法树优化、代码生成