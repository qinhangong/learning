var arr = [2, 5, 8, 3, 4, 1, 9];
/**
 * 冒泡排序
 */
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            let temp = arr[j];
            if (arr[j + 1] < arr[j]) {
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort(arr));

/**
 * 插入排序
 */
function insertSort(arr) {
    const newArr = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0;) {
            if (newArr[j] > arr[i]) {
                j--;
                if (j === -1) newArr.unshift(arr[i]);
            } else {
                newArr.splice(j + 1, 0, arr[i]);
                break;
            }
        }
    }
    return newArr;
}
console.log(insertSort(arr))

/**
 * 快速排序
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    const middleIndex = Math.floor(arr.length / 2);
    const middleValue = arr.splice(middleIndex, 1);
    const [left, right] = [[], []];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < middleValue) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return quickSort(left).concat(middleValue).concat(right);
}
console.log(quickSort(arr));
