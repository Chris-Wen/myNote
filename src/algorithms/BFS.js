
//定义迷宫地图
const maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0]
];

//定义节点类
class Node {
  constructor(x, y, step, parent) {
    this.x = x; //节点的x坐标
    this.y = y; //节点的y坐标
    this.step = step; //节点的步数
    this.parent = parent; //节点的父节点
  }
}

//定义广度优先搜索函数
function bfs(maze, start, end) {
  const queue = []; //定义队列
  const visited = []; //定义已访问数组
  const dx = [-1, 0, 1, 0]; //定义x方向的偏移量
  const dy = [0, 1, 0, -1]; //定义y方向的偏移量
  const n = maze.length; //迷宫的行数
  const m = maze[0].length; //迷宫的列数

  queue.push(new Node(start[0], start[1], 0, null)); //将起点加入队列
  visited.push([start[0], start[1]]); //将起点标记为已访问

  while (queue.length > 0) { //当队列不为空时循环
    const node = queue.shift(); //取出队首节点
    if (node.x === end[0] && node.y === end[1]) { //如果当前节点是终点
      const path = []; //定义路径数组
      let p = node; //从终点开始回溯
      while (p !== null) { //当回溯到起点时结束
        path.push([p.x, p.y]); //将节点加入路径数组
        p = p.parent; //回溯到父节点
      }
      return path.reverse(); //返回路径数组
    }
    for (let i = 0; i < 4; i++) { //遍历当前节点的四个方向
      const nx = node.x + dx[i]; //计算下一个节点的x坐标
      const ny = node.y + dy[i]; //计算下一个节点的y坐标
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) { //如果下一个节点越界
        continue; //跳过
      }
      if (maze[nx][ny] === 0) { //如果下一个节点是障碍物
        continue; //跳过
      }
      if (visited.find(v => v[0] === nx && v[1] === ny)) { //如果下一个节点已经访问过
        continue; //跳过
      }
      queue.push(new Node(nx, ny, node.step + 1, node)); //将下一个节点加入队列
      visited.push([nx, ny]); //将下一个节点标记为已访问
    }
  }

  return null; //如果没有找到路径，返回null
}



//定义深度优先搜索函数
function dfs(maze, start, end) {
  const stack = []; //定义栈
  const visited = []; //定义已访问数组
  const dx = [-1, 0, 1, 0]; //定义x方向的偏移量
  const dy = [0, 1, 0, -1]; //定义y方向的偏移量
  const n = maze.length; //迷宫的行数
  const m = maze[0].length; //迷宫的列数

  stack.push(new Node(start[0], start[1], 0, null)); //将起点加入栈
  visited.push([start[0], start[1]]); //将起点标记为已访问

  while (stack.length > 0) { //当栈不为空时循环
    const node = stack.pop(); //取出栈顶节点
    if (node.x === end[0] && node.y === end[1]) { //如果当前节点是终点
      const path = []; //定义路径数组
      let p = node; //从终点开始回溯
      while (p !== null) { //当回溯到起点时结束
        path.push([p.x, p.y]); //将节点加入路径数组
        p = p.parent; //回溯到父节点
      }
      return path.reverse(); //返回路径数组
    }
    for (let i = 0; i < 4; i++) { //遍历当前节点的四个方向
      const nx = node.x + dx[i]; //计算下一个节点的x坐标
      const ny = node.y + dy[i]; //计算下一个节点的y坐标
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) { //如果下一个节点越界
        continue; //跳过
      }
      if (maze[nx][ny] === 0) { //如果下一个节点是障碍物
        continue; //跳过
      }
      if (visited.find(v => v[0] === nx && v[1] === ny)) { //如果下一个节点已经访问过
        continue; //跳过
      }
      stack.push(new Node(nx, ny, node.step + 1, node)); //将下一个节点加入栈
      visited.push([nx, ny]); //将下一个节点标记为已访问
    }
  }

  return null; //如果没有找到路径，返回null
}

//测试
const pathDFS = dfs(maze, start, end); //求解路径
console.log(pathDFS); //输出路径


