---
title: VUE2
---

# Vue2 核心原理

[[toc]]

### 响应式系统

- 实现步骤
  - 首先创建了一个新的空对象
  - 设置原型，将对象的原型设置为函数的 prototype 对象。
  - 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
  - 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

@[code{1-12}](@src/frontend/js/polyfill/prototype.js)

### 模板编译

- 实现步骤
  - 获取类型的原型
  - 获得对象的原型
  - 一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

@[code{14-26}](@src/frontend/js/polyfill/prototype.js)

### 虚拟 DOM

@[code{28-37}](@src/frontend/js/polyfill/prototype.js)

### 组件化

> this 指向第一个参数

- call
  - 传参方式：多个参数
  - 立即执行
- apply
  - 传参方式：第二个参数为数组或类数组，用数组接收多个参数
  - 立即执行
- bind
  - 等待执行

<CodeGroup>
  <CodeGroupItem title="bind实现" active>

@[code{78-94}](@src/frontend/js/polyfill/prototype.js)

  </CodeGroupItem>
  <CodeGroupItem title="call实现">

@[code{39-57}](@src/frontend/js/polyfill/prototype.js)

  </CodeGroupItem>
  <CodeGroupItem title="apply实现">

@[code{59-76}](@src/frontend/js/polyfill/prototype.js)

  </CodeGroupItem>
</CodeGroup>
