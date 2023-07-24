/**
 * debounce函数实现防抖
 * @param {Function} fn - 需要执行的函数
 * @param {Number} wait - 等待时间
 * @param {Boolean} immediate - 是否立即执行
 * @returns {Function} - 返回一个函数
 */
function debounce(fn, wait, immediate) {
  let timer = null; // 定义一个计时器

  return function (...args) { // 返回一个函数
    let context = this; // 保存this指向
    if (immediate && !timer) { // 如果是立即执行且计时器不存在
      fn.apply(context, args); // 立即执行函数
    }
    if (timer) clearTimeout(timer); // 如果计时器存在，清除计时器
    timer = setTimeout(() => { // 设置计时器
      fn.apply(context, args); // 执行函数
    }, wait);
  };
}


/**
 * throttle函数实现节流
 * @param {Function} fn - 需要执行的函数
 * @param {Number} wait - 等待时间
 * @returns {Function} - 返回一个函数
 */
function throttle(fn, wait) {
  let timer = null; // 定义一个计时器
  let previous = 0; // 上一次执行的时间

  return function (...args) { // 返回一个函数
    let context = this; // 保存this指向
    let now = +new Date(); // 获取当前时间
    let remaining = wait - (now - previous); // 计算剩余时间

    if (remaining <= 0) { // 如果剩余时间小于等于0
      if (timer) { // 如果计时器存在
        clearTimeout(timer); // 清除计时器
        timer = null; // 重置计时器
      }
      previous = now; // 更新上一次执行的时间
      fn.apply(context, args); // 执行函数
    } else if (!timer) { // 如果剩余时间大于0且计时器不存在
      timer = setTimeout(() => { // 设置计时器
        previous = +new Date(); // 更新上一次执行的时间
        timer = null; // 重置计时器
        fn.apply(context, args); // 执行函数
      }, remaining);
    }
  };
}
 
 
/**
 * 简写节流函数
 * @param {Function} fn - 需要执行的函数
 * @param {Number} wait - 等待时间
 * @returns {Function} - 返回一个函数
 */
function throttle(fn, wait) {
  let timer = null; // 定义一个计时器

  return function (...args) { // 返回一个函数
    let context = this; // 保存this指向
    if (!timer) { // 如果计时器不存在
      timer = setTimeout(() => { // 设置计时器
        timer = null; // 重置计时器
        fn.apply(context, args); // 执行函数
      }, wait);
    }
  };
}
