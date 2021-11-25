//数据结构之链表

//链表当前节点
function Node(el) {
    this.element = el
    this.next = null
}
//链表结构 -- 默认 head 头节点
function LList() {
    this.head = new Node('head')
    this.find = find
    this.insert = insert
    this.remove = remove
    this.display = display
    this.findPrevious = findPrevious
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement)
    var current = this.find(item)
    newNode.next = current.next
    current.next = newNode
}

function display() {
    var curNode = this.head
    // console.log(curNode, curNode.element);
    while (!(curNode.next == null)) {
        console.log(curNode.next.element);
        curNode = curNode.next
    }
}

function findPrevious(item) {
    var curNode = this.head
    while (curNode.next && (item !== curNode.next.element)) {
        curNode = curNode.next
    }
    return curNode
}

function remove(item) {
    var preNode = this.findPrevious(item)
    if (!(preNode.next == null)) {
        preNode.next = preNode.next.next;
    }
}



let cities = new LList()
cities.insert("0", "head");
// cities.insert("1", "0");
cities.insert("2", "0");
cities.display()

cities.remove('2')
cities.display()