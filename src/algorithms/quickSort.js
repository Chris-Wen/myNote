//快排
function quickSort(arr) {
  quick(arr, 0, arr.length - 1);
}

function quick(arr, left, right) {
  if (left < right) {
    //划分数组
    let index = partition(arr, left, right); //划分的元素下标
    if (left < index - 1) {
      quick(arr, left, index - 1);
    }
    if (index < right) {
      quick(arr, index, right);
    }
  }
}

function partition(arr, left, right) {
  //随机取一个数, 或默认取第一个
  //   var value = arr[left],
  var value = arr[Math.floor(Math.random() * (right - left + 1)) + left],
    i = left,
    j = right;
  while (i <= j) {
    while (arr[i] < value) {
      i++;
    }
    while (arr[j] > value) {
      j--;
    }
    // console.log(i, j, arr);
    if (i <= j) {
      changeVal(arr, i, j);
      i++;
      j--;
    }
  }
  //   console.log(arr, i);
  return i;
}

//交换
function changeVal(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// var arr = [1, 3, 19, 6, 8, 2, 8, 21, 11, 6, 4, 9, 1];
var arr = [1, 5, 2, 6, 7, 3];

// partition(arr, 0, arr.length - 1);
quickSort(arr);
console.log(arr);
