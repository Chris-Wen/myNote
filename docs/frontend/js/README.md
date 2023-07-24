---
title: Polyfill 实现
---

# Polyfill 实现

[[toc]]

### new

- 实现步骤
  - 首先创建了一个新的空对象
  - 设置原型，将对象的原型设置为函数的 prototype 对象。
  - 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
  - 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

@[code{1-12}](@src/frontend/js/polyfill/prototype.js)

### instanceof

- 实现步骤
  - 获取类型的原型
  - 获得对象的原型
  - 一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

@[code{14-26}](@src/frontend/js/polyfill/prototype.js)

### typeOf

@[code{28-37}](@src/frontend/js/polyfill/prototype.js)

### call、apply、bind

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

### 继承实现方式

- **原型链继承**: 让子类构造函数的 prototype 属性指向其父类构造函数的实例
  > Dog.prototype = new Animal()
  - 原理：让子类构造函数的 prototype 属性指向其父类构造函数的实例
  - 缺点：
    - 引用类型的属性被所有实例共享
    - 在创建子类实例时，无法向父类构造函数传参
- **构造函数继承**
  > Animal.call(this)
  - 原理：在子类构造函数中调用父类构造函数
  - 优点：解决了原型链继承中子类实例共享父类引用类型属性的问题
  - 缺点：无法实现父类原型上的属性和方法的复用
- 组合式继承
  - 原理：结合了原型链继承和构造函数继承的优点
  - 缺点：调用了两次父类构造函数，生成了两份实例
- 寄生组合式继承
  - 原理：在组合式继承的基础上，通过 Object.create() 创建一个中间对象，避免了调用两次父类构造函数
- class、extends 继承
- class、super 继承

<CodeGroup>
  <CodeGroupItem title="原型链/构造函数" active>

@[code{1-22}](@src/frontend/js/polyfill/instance.js)

  </CodeGroupItem>

  <CodeGroupItem title="组合式继承">

@[code{26-33}](@src/frontend/js/polyfill/instance.js)

  </CodeGroupItem>
  <CodeGroupItem title="寄生组合式继承">

@[code{35-56}](@src/frontend/js/polyfill/instance.js)

  </CodeGroupItem>
  <CodeGroupItem title="class继承">

@[code{58-80}](@src/frontend/js/polyfill/instance.js)

  </CodeGroupItem>
</CodeGroup>


### 节流、防抖

> 频繁去触发一个事件, 不同的处理方式

| 操作 | 描述                           | 场景                                          |
| ---- | ------------------------------ | --------------------------------------------- |
| 防抖 | 只触发最后一次。以最后一次为准 | 1、input 框变化 <br/> 2、频繁点击按钮提交表单 |
| 节流 | 只能每隔一段时间触发一次       | 滚动频繁请求列表                              |

<CodeGroup>
  <CodeGroupItem title="防抖" active>

@[code{1-21}](@src/frontend/js/polyfill/debounce.js)

  </CodeGroupItem>
  <CodeGroupItem title="节流">

@[code{24-}](@src/frontend/js/polyfill/debounce.js)

  </CodeGroupItem>

</CodeGroup>

### 高阶函数(curry、compose)

> 一个函数接收另一个函数作为参数，这种函数就称之为高阶函数。

像数组的 `map`、`reduce`、`filter` 这些都是高阶函数

###### 函数柯里化

> 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

好处：

- 参数复用
- 延迟执行

```js
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
```

###### 组合函数`compose`

> 将函数串联起来执行，前一个函数的输出值是后一个函数的输入值

简单的 compose 函数

```js
const compose = (a, b) => (c) => a(b(c));
```

其他：递归实现、reduce 实现
<CodeGroup>
<CodeGroupItem title="递归">

```javascript
function compose(...fns) {
  let len = fns.length;
  let res = null;
  return function fn(...arg) {
    res = fns[len - 1].apply(null, arg); // 每次函数运行的结果
    if (len > 1) {
      len--;
      return fn.call(null, res); // 将结果递归传给下一个函数
    } else {
      return res; //返回结果
    }
  };
}
```

  </CodeGroupItem>
  <CodeGroupItem title="reduce">

```javascript
function compose(...fns) {
  return function (...arg) {
    return fns.reduce((acc, cur) => {
      // 第一次acc是函数，之后是结果，所以要加个判断
      return typeof acc === "function" ? cur(acc(...arg)) : cur(acc);
    });
  };
}
```

  </CodeGroupItem>
</CodeGroup>

### 数组去重

@[code{1-20}](@src/frontend/js/polyfill/array.js)

### 数组随机打乱

@[code{22-31}](@src/frontend/js/polyfill/array.js)

### 数组扁平化

@[code{35-67}](@src/frontend/js/polyfill/array.js)
