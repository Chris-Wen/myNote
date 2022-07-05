import VNode from "./vnode";

export const emptyNode = new VNode("", {}, []);

function sameVnode(a, b) {}

function sameInputType(a, b) {}

function createKeyToOldIdx(children, beginIdex, endIdx) {}

export function createPatchFunction() {
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    let isInitialPatch = false;
    const insertedVondeQueue = [];
    //旧节点不存在
    if (!oldVnode) {
      isInitialPatch = true;
      // 创建真实dom
      // createElm(vnode, insertedVondeQueue)
    } else {
      //新旧节点patch更新
    }
  };
}
