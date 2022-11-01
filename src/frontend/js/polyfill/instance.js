/**
 * @description 继承的五种方式
 * 1、原型链继承
 * 2、借用构造函数实现继承
 * 3、组合继承
 * 4、寄生式组合继承
 * 5、class实现继承
 */

function Animal() {
  this.type = "animal";
}
function Dog() {
  this.name = "dog";
}

//1、原型链 - 实例化一个新的函数，子类的原型指向了父类的实例
Dog.prototype = new Animal();

//2、借用构造函数实现继承
//基本思想就是利用 call 或者 apply 把父类中通过 this 指定的属性和方法复制（借用）到子类创建的实例中。
function Dog() {
  Dog.call(this);
}

//3、组合继承 - 1、2的组合
function Cat(name) {
  Animal.call(this);
  this.name = name || "cat";
}
Cat.prototype = new Animal();

//Cat.prototype.constructor = Cat;

//4、寄生式组合继承
function inheritPrototype(SubType, SuperType) {
  var prototype = Object.create(SuperType.prototype);
  prototype.constructor = SubType;
  SubType.prototype = prototype;
}
//兼容写法
function object(o) {
  function W() {}
  W.prototype = o;
  return new W();
}
function inheritPrototype(SubType, SuperType) {
  var prototype;
  if (typeof Object.create === "function") {
    prototype = Object.create(SuperType.prototype);
  } else {
    prototype = object(SuperType.prototype);
  }
  prototype.constructor = SubType;
  SubType.prototype = prototype;
}

//5、es6继承
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {}
}

class Dog extends Animal {
  constructor(name) {
    //继承父类属性
    super(name);
  }
  eat() {
    //继承父类方法
    super.eat();
  }
}
