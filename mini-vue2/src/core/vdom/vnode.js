/*
 * @Author: Chris-Wen
 * @Date: 2022-07-04 13:56:34
 * @LastEditors: Chris-Wen
 * @LastEditTime: 2022-07-04 14:01:27
 */
export default class VNode {
  constructor(
    tag,
    data,
    children,
    text,
    elem,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elem = elem;
    this.context = context;
    this.componentOptions = componentOptions;

    this.key = data && data.key;

    this.parent = undefined;
    this.asyncFactory = asyncFactory;
  }
}

export const createEmptyVNode = function (text = "") {
  const node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};
