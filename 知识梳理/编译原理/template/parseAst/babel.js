const core = require("@babel/core"); // babel核心包
const types = require("@babel/types"); // 遍历ast过程中，封装的对节点进行快捷操作各种方法
// 我们把官方插件先给注释掉，自己来实现
//const arrowFunctionPlugin = require('@babel/plugin-transform-arrow-functions')
// 自己实现的插件
const arrowFunctionPlugin = {
  visitor: {
    // 如果是箭头函数，就会进到这里边来，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      path.node.type = "FunctionDeclaration";
      // 新增逻辑：处理箭头函数中的this
      dealThis(path);
      // 获取节点的body
      let body = path.node.body;
      // 使用types包中的方法，当前的body有没有块级作用域声明
      if (!types.isBlockStatement(body)) {
        // 使用types包中的方法，快速的构建生成节点内容
        path.node.body = types.blockStatement([types.returnStatement(body)]);
      }
    },
  },
};

function dealThis(path) {
  // 首先我们要确定，使用哪个地方的this，因为箭头函数没有this，所以需要层层向父级寻找
  const thisEnv = path.findParent((parent) => {
    // 如果父级是一个普通函数，或者父级已经是根节点了，那么就返回true
    return types.isFunctionDeclaration(parent) || parent.isProgram();
  });
  // 设置一个变量，来存储this
  let thisBindings = "_this";
  // 创建一个路径数组
  let thisPaths = [];
  // 遍历此路径的所有子路径，如果箭头函数中使用了this（即可以访问到ast中的ThisExpression），就把当前路径push进路径数组中
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath);
    },
  });
  if (thisPaths.length > 0) {
    // 如果路径数组中有数据，那么说明箭头函数内部使用了this
    // 在thisEnv这个节点的作用域中，添加之前我们存储this的变量_this，即添加代码为 var _this = this
    if (!thisEnv.scope.hasBinding(thisBindings)) {
      thisEnv.scope.push({
        id: types.identifier(thisBindings),
        init: types.thisExpression(),
      });
    }
    // 将箭头函数内部用到this的地方，统一转化为_this
    thisPaths.forEach((thisPath) => {
      thisPath.replaceWith(types.identifier(thisBindings));
    });
  }
}

// 箭头函数源代码
// const sourceCode = `const sum = (a, b) =>  a + b`;
// const sourceCode = `const sum = a =>  a + 1`;
const sourceCode = `
  const sum = (a, b) => {
    console.log(this);
    const minus = (c,d)=>{
      console.log(this);
      return 2;
    }
    return a + b;
  }
`;

// 转化源代码
const result = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin],
});
console.log(result.code);
