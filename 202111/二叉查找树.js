/** 二叉搜索树
 * 1、左子树仅包含元素小于根的节点。
 * 2、右侧子树仅包含元素大于根的节点。
 * 3、左和右子树也必须是二叉搜索树。他们必须遵循上述规则并以其树的“根”作为根。
 * 4、不能有重复的节点，即两个节点不能具有相同的值。
*/
class Node {
    constructor(data, left, right) {
        this.left = left
        this.right = right
        this.data = data
    }

    show() {
        return this.data
    }
}

class BST {
    root = null
    insert(data) {
        var n = new Node(data, null, null)
        if (!this.root) {
            this.root = n
        } else {
            var current = this.root
            var parent
            while (true) {
                parent = current
                if (current.data > data) {
                    current = current.left
                    if (current === null) {
                        parent.left = n
                        break;
                    }
                } else {
                    current = current.right
                    if (current === null) {
                        parent.right = n
                        break;
                    }
                }
            }
        }

        return this
    }

    inOrder(node, str = 'center') {
        // console.log(str)
        if (node) {
            // console.log(node.data, str)
            this.inOrder(node.left, 'left')
            this.inOrder(node.right, 'right')
        }
    }

    getMax() {
        var current = this.root
        while (current.right) {
            current = current.right
        }
        return current
    }

    getMin() {
        var current = this.root
        while (current.left) {
            current = current.left
        }
        return current
    }

    find(val) {
        var current = this.root
        while (current && current.data !== val) {
            current = current.data > val ? current.left : current.right
        }
        return current || -1;
    }

    delete(val) {
        var current = this.root,
            isLeftNode = false,
            parent;
        while (current) {
            if (current.data === val) {
                break;
            } else if (current.data > val) {
                parent = current
                isLeftNode = true;
                current = current.left
            } else {
                parent = current
                isLeftNode = false;
                current = current.right
            }
        }

        // console.log(parent, current, isLeftNode)
        if (!current) return false;
        if (!current.left && !current.right) {  //无子节点
            if (!parent) {
                this.root = null
            } else if (isLeftNode) {
                parent.left = null
            } else {
                parent.right = null
            }
        } else if (current.left && current.right) { //双子节点 
            /** --- 最接近当前节点值的节点
             * 前驱法（左子树中找最大值）
             * 后继法 （右子树中找最小值）
             */
            //前驱法 -- 建立子树，找到子树对应节点，并删除对应节点得到新子树
            var _bst = new BST()
            _bst.root = current.left
            var node = _bst.getMax()
            _bst.delete(node.data)

            if (!parent) {
                this.root.data = node.data;
                this.root.right = current.right
                this.root.left = _bst.root
            } else if (isLeftNode) {
                parent.left.data = node.data
                parent.left.right = current.right
                parent.left.left = _bst.root
            } else {
                parent.right.data = node.data
                parent.right.right = current.right
                parent.right.left = _bst.root
            }
            _bst = null;
        } else {  //单子节点
            var node = current.left ? current.left : current.right
            if (!parent) {
                this.root = node
            } else if (isLeftNode) {
                parent.left = node
            } else {
                parent.right = node
            }
        }
    }
}

let bst = new BST()
// let arr = [-2, 1, 5, 9, 4, 6, 7]
// let arr = [10, 1, 15, 11, 2, 9, 12, 20, 3]
let arr = [20, 11, 21, 20, 30, 9, 13, 1, 7, 8, 10, 0]
// let arr = [20, 20, 20]

for (let i = 0; i < arr.length; i++) {
    bst.insert(arr[i])
}
// console.log(bst)
bst.inOrder(bst.root)

var min = bst.getMax(),
    max = bst.getMin();


// console.log(bst.find(11))
bst.delete(21)
console.log(bst.find(20), bst.find(9))


