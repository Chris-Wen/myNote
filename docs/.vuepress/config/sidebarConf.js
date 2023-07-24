const sidebarConf = {
  "/computer": [
    {
      text: "计算机基础知识",
      collapsible: false,
      children: ["README.md"],
    },
  ],
  "/frontend/js": [
    {
      text: "JAVASCRIPT",
      collapsible: true,
      children: ["README.md", "question.md"],
    },
  ],
  "/frontend/vue": [
    {
      text: "VUE",
      collapsible: true,
      children: ["README.md"],
    },
  ],
  "/algorithms": [
    {
      text: "Algorithm",
      collapsible: false,
      children: ["README.md"],
    },
  ],
};

export default sidebarConf;
