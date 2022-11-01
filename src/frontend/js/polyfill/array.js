/**
 * @description 数组去重
 * es5 fillter实现
 * es6 扩展运算符+Set实现
 */

// ES5 实现
function unique(arr) {
  return arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
}

// es6 实现
let uniqueES6 = (arr) => [...new Set(arr)];

let arr = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
let arr1 = unique(arr);
let arr2 = uniqueES6(arr);
console.log(arr1, arr2);

//随机打乱
Array.prototype.shuffle = function () {
  for (
    var j, x, i = this.length;
    i;
    j = parseInt(Math.random() * i),
      x = this[--i],
      this[i] = this[j],
      this[j] = x
  );
  return this;
};

// 数组扁平化
//递归
let flatArr = [1, [2, [3, 4, 5]]];
function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
flatten(flatArr); //  [1, 2, 3, 4，5]

//flat -reduce
function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}

//es6  flat函数
flatArr.flat(Infinity); //如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
