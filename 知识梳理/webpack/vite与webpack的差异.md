## Vite 快在哪

- ES module （ES 模块化的支持）

  - 浏览器已经全面支持 ES module

    ```js
    // index.js
    import { add } from "./add.js";
    import { sub } from "./sub.js";
    console.log(add(1, 2));
    console.log(sub(1, 2));

    // add.js
    export const add = (a, b) => a + b;

    // sub.js
    export const sub = (a, b) => a - b;
    ```

    以上代码可以直接在浏览器中运行

  - `Webpack`、`Rollup`等是基于老版本浏览器不支持以上代码直接运行，这些打包工具先将`index.js`、`add.js`、`sub.js`这三个文件打包在一个`bundle.js`文件里，然后在项目`index.html`中直接引入`bundle.js`，从而达到代码效果

- 对于非 `js`、`html`、 `css` 文件，`Vite`需要自己处理依赖，也是一个完整的编译流程

- 生产环境，底层还是利用 `Rollup` 进行模块化打包
  - Vite 集成了 tree-shaking、懒加载、chunk 分割、css 处理等
