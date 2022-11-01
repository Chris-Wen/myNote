/**
 * @description 选择排序
 */
function selectionSort(arr) {
  let length = arr.length,
    indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      let temp = arr[i];
      arr[i] = arr[indexMin];
      arr[indexMin] = temp;
    }
  }
}

// 测试
let arr = [1, 3, 2, 5, 4];
selectionSort(arr);
console.log(arr); // [1, 2, 3, 4, 5]
