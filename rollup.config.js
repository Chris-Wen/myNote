import babel from "rollup-plugin-babel";

// rollup默认可以导出一个打包的配置文件对象
export default {
  input: "./src/index.js",
  output: {
    // 生成的文件
    file: "./dist/vue.js", // chunk
    // 全局对象 Vue 在global(浏览器端就是window)上挂载一个属性 Vue
    name: "Vue",
    // 打包方式 esm commonjs模块 iife自执行函数 umd 统一模块规范 -> 兼容commonjs和amd
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    babel({
      // 排除第三方模块
      exclude: "node_modules/**",
    }),
  ],
};
