
/**
 * 栈的实现
 * 特点：先进后出
 */


class stack {
    constructor() {
        this.items = new Array();
    }

    push(val) {
        this.items.push(val)
    }

    pop() {
        this.items.pop()
    }

    size() {
        return this.items.length
    }
}