/**
 * @description 数组去重
 * @param {Array} arr
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
