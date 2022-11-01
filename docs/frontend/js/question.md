---
title: "奇技淫巧"
---

# N 问

[[toc]]

### 1. parseInt

> ['1', '2', '3'].map(parseInt) what & why ?

```javascript
//parseInt('1',0) 第二个参数表示要转换的进制，范围2-36，默认为10
//0，相当于不传，即10进制
[1, NaN, NaN];
```

### 2、隐式转换

> (a == 1 && a == 2 && a == 3) === true； a = ？

解决方式：

- a.toString
- Object.defineProperty / Proxy
- 数组 join

<CodeGroup>
<CodeGroupItem title="1、toString">

```javascript
const a = {
  i: 0,
  toString() {
    return ++this.i;
  },
};
console.log(a == 1 && a == 2 && a == 3); // true
```

</CodeGroupItem>
<CodeGroupItem title="2、代理">

```javascript
let i = 0;
Object.defineProperty(global, "a", {
  get() {
    return ++i;
  },
});
```

</CodeGroupItem>
<CodeGroupItem title="3、数组">

```javascript
const a = [1, 2, 3];
a.join = a.shift;
```

</CodeGroupItem>
</CodeGroup>

### 3、小数取整
