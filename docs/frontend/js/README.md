---
title: JS Polyfill 实现
---

# JS Polyfill 实现

[[toc]]

### typeOf 类型判断

@[code{1-10}](@src/js/polyfill/typeOf.js)

### 数组去重

@[code](@src/js/polyfill/unique.js)

### 继承实现方式

<CodeGroup>
<CodeGroupItem title="filter实现" active>

@[code{1-12}](@src/js/polyfill/unique.js)

  </CodeGroupItem>

  <CodeGroupItem title="扩展运算符+Set实现">

@[code{12-20}](@src/js/polyfill/unique.js)

  </CodeGroupItem>
</CodeGroup>
