import { defaultTheme } from "vuepress";
import navConf from "./config/navConf";
import sidebarConf from "./config/sidebarConf";
import pluginConf from "./config/pluginConf";

export default {
  lang: "zh-CN",
  title: "Hello World",
  description: "Just playing around",
  plugins: pluginConf,
  theme: defaultTheme({
    navbar: navConf,
    sidebar: sidebarConf,
    docsDir: "docs",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",
    editLinks: true,
    editLinkText: "编辑文档！",
  }),
};
