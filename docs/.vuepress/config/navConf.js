const navConf = [
  { text: "首页", link: "/" },
  { text: "计算机", link: "/computer/" },
  {
    text: "前端",
    children: [
      { text: "Web", link: "/frontend/web/" },
      { text: "JavaScript", link: "/frontend/js/" },
      { text: "TypeScript", link: "/frontend/ts/" },
      { text: "Vue", link: "/frontend/vue/" },
      { text: "Webpack", link: "/frontend/webpack/" },
      { text: "Flutter", link: "/frontend/flutter/" },
    ],
  },
  {
    text: "后端",
    children: [
      { text: "Nodejs", link: "/backend/nodejs/" },
      { text: "Nginx", link: "/backend/nginx/" },
      // { text: "MySQL", link: "/backend/mysql/" },
      // { text: "Redis", link: "/backend/redis/" },
      // { text: "Docker", link: "/backend/docker/" },
    ],
  },
  { text: "算法", link: "/algorithms/" },
  // {
  //   text: "时间线",
  //   link: "/timeline/",
  // },
];

export default navConf;
