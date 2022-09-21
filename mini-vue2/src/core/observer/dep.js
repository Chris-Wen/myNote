/*
 * @Author: Chris-Wen
 * @Date: 2022-07-04 10:55:45
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 11:22:52
 * @description: Dep 依赖收集器，收集都是watcher
 */

let uid = 0;

export default class Dep {
  static target; //静态对象，原型上只有一个target对象

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    if (sub.length) {
      const index = sub.indexOf(item);
      if (index > -1) {
        return sub.splice(index, 1);
      }
    }
  }

  //添加到当前target下sub中
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  //派发更新
  notify() {
    const subs = this.subs.slice();

    for (let i = 0; i < subs.length; i++) {
      subs[i].update(); // watcher对象 更新
    }
  }
}

Dep.target = null;
const targetStack = [];

//添加watcher对象
export function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
