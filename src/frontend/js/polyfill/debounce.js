// //防抖
function debounce(fn, date) {
  let timer; //声明接收定时器的变量
  return function (...arg) {
    // 获取参数
    timer && clearTimeout(timer); // 清空定时器
    timer = setTimeout(() => {
      //  生成新的定时器
      //因为箭头函数里的this指向上层作用域的this,所以这里可以直接用this，不需要声明其他的变量来接收
      fn.apply(this, arg); // fn()
      timer = null;
    }, date);
  };
}

// 节流
function throttle(fn, data) {
  let timer = +new Date(); // 声明初始时间
  return function (...arg) {
    // 获取参数
    let newTimer = +new Date(); // 获取触发事件的时间
    if (newTimer - timer >= data) {
      // 时间判断,是否满足条件
      fn.apply(this, arg); // 调用需要执行的函数,修改this值,并且传入参数
      timer = +new Date(); // 重置初始时间
    }
  };
}
