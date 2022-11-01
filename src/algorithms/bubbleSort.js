/**
 * @description 冒泡排序
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// 改进冒泡排序
function bubbleSort1(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 提前退出冒泡循环的标识位
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = true;
        // 表示发生了数据交换
      }
    }
    // 没有数据交换
    if (!flag) break;
  }
}

// 测试
let arr = [1, 3, 2, 5, 4];
bubbleSort(arr);
console.log(arr); // [1, 2, 3, 4, 5]

let arr1 = [1, 3, 2, 5, 4];
bubbleSort1(arr1);
console.log(arr1); // [1, 2, 3, 4, 5]
