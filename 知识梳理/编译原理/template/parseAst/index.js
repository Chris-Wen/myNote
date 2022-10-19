/**
 * 根据AST，对源代码进行修改，好多代码报错和功能修复的插件，都是基于此来实现的，
 * 以下就是将一段简单的源代码  let ast = "ast tree";
 * 修改输出成 var newAstDeclarator = 'ast tree'
 *
 * 抽象语法树结构线上演示：https://astexplorer.net/
 */
// index.js中代码
let esprima = require("esprima"); // 把JS源代码转成AST语法树的包
let estraverse = require("estraverse"); // 遍历语法树的包,可以修改树上的节点
let escodegen = require("escodegen"); // 把AST语法树重新转换，还原成源代码的包

const sourceCode = 'let ast = "ast tree"'; // 写一段简单的源代码
//1、 将源代码转移成ast
const ast = esprima.parse(sourceCode);
console.log("ast json结构", ast);
let indent = 0; // 设置缩进，以便观察打印结果的时候，比较直观
const padding = () => " ".repeat(indent);
//2、遍历ast
estraverse.traverse(ast, {
  enter(node) {
    console.log(padding() + node.type + "进入");
    //3、修改源代码
    if (node.type === "VariableDeclaration" && node.kind === "let") {
      node.kind = "var";
    }
    if (node.type === "VariableDeclarator") {
      //   console.log(111, node);
      // 根据node.type判断，进行源代码修改
      node.id.name = "newAstDeclarator";
    }
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log(padding() + node.type + "离开");
  },
});
//4、将改变后的ast，重新转化还原成源代码 --- 将变量名 ast 修改成了 newAstDeclarator 输出
console.log(escodegen.generate(ast)); //let newAstDeclarator = 'ast tree';

//ast 转成的json
/**
 {
  "type": "Program",
  "start": 0,
  "end": 21,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 20,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 20,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 7,
            "name": "ast"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 20,
            "value": "ast tree",
            "raw": "\"ast tree\""
          }
        }
      ],
      "kind": "let"
    }
  ],
  "sourceType": "module"
}
*/
