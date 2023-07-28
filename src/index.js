// class 类写法会将所有方法耦合在一起，
// 使用构造函数的写法，利于将不同功能拆分到不通文件夹中
function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function () {};

export default Vue;
