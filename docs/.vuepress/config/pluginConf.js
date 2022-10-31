import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
// import { inject } from "@vercel/analytics";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { pwaPlugin } from "@vuepress/plugin-pwa";
import { getDirname, path } from "@vuepress/utils";
const __dirname = getDirname(import.meta.url);

console.log(__dirname);

const pluginConf = [
  //vercel分析
  // inject(),
  //google分析
  googleAnalyticsPlugin({
    // 配置项
    id: "",
  }),
  //组件自动注册
  registerComponentsPlugin({
    // 配置项
    // FooBar: path.resolve(__dirname, './components/FooBar.vue'),
  }),
  docsearchPlugin({
    // 配置项
  }),
  pwaPlugin({
    // 配置项
  }),
];

export default pluginConf;
