/**
 * In this file, commonly used sorting algorithms are compared having the same
 * input array and tested using the console.time
 *
 * note : sorting is done in an ascending order
 */

// generates random numbers for testing the worst case in every sorting algorithm
let testArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);

//########################################################
// [1] Bubble Sort => O(n_squared)
const swap = (firstNum, secondNum) =>
  ([firstNum, secondNum] = [secondNum, firstNum]); // ES6 syntax array destruction
/**
 * Bubble sort is the simplest form of sorting. It depends on iterating over the whole array
   and swaps the elements of one is greater/smaller than the other.
 */
function bubbleSort(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (array[i] < array[j]) {
        [array[i], array[j]] = swap(array[i], array[j]); // ES6 syntax
      }
    }
  }
  return array;
}
//########################################################

//########################################################
// [2] Selection Sort => O(n_squared)
/**
 *  Selection sorting works by iterating the elements and finding the smallest element and inserting
    it into the current position of the array. This algorithm is more efficient than bubble sort.
 */

function selectionSort(array) {
  let min;
  for (let i = 0; i < array.length; i++) {
    min = i; // assume that every new iteration starts with the minimum number
    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j; // correct the assumption
      }
    }
    // if there is a new minimum found (index of the assumed minimum is changed)
    // swap it with the assumed previous minimum
    if (i !== min) {
      [array[min], array[i]] = swap(array[min], array[i]); // ES6 syntax
    }
  }

  return array;
}
//########################################################

//########################################################
// [3] Insertion Sort => O(n_squared)
/**
 *  Insertion sort works in a similar wat to selection sort by searching the array in a sequential way,
    moving the unsorted items to a sorted sub-list on the left side of the array.
 */
function insertionSort(array) {
  let len = array.length, // number of items in the array
    currentValue, // the value currently being compared
    i, // index into unsorted section on the right side
    j; // index into sorted section on the left side

  for (i = 0; i < len; i++) {
    currentValue = array[i]; // store the current value because it may shift later

    for (j = i - 1; j > -1 && array[j] > currentValue; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = currentValue;
  }
  return array;
}
/**
 * consider [6, 1, 5, 4, 2, 3]
   at i = 0, j = -1, => condition not satisfied => break

   at i = 1, j = 0, currentValue = 1, array[j] = 6, array[j] > currentValue (condition satisfied)
   then array[1] = array[0] => [6,6,5,4,2,3]
   then j-- => j = -1
   then array[0] = currentValue = 1 => [1,6,5,4,2,3] (swapped);

   at i = 2, j = 1, currentValue = 5, array[j] > currentValue (condition satisfied)
   array[2] = 6 => [1,6,6,4,2,3]
   then j --, j = 0 => condition not satisfied => break
   array[1] = currentValue = 5 => [1,5,6,4,2,3]

   at i = 3, j = 2, currentValue = 4, array[j] > currentValue (condition satisfied)
   then array[3] = 6 => [1,5,6,6,2,3]
   j -- , j = 1, array[j] > currentValue (condition satisfied)
   then array[2] = array[1] => [1,5,5,6,2,3] (swapped);
   j -- , j = 0, => condition not satisfied => break
   arr[1] = currentValue => [1,4,5,6,2,3] (swapped)

 */
//########################################################

//########################################################
// [4] Quick Sort => best case: O(n*log(n)) worst case: O(n_squared)
/**
 * Depends on picking a pivot that divide the array around it such that larger bigger elements are at one side
   and smaller ones are at the other side till everything is sorted.
   The ideal pivot is the median of the array which can reach a O(n*log(n)) time complexity.
   Selecting a bad pivot can cause the time complexity to reach O(n_squared)
 */
const quickSort = (array) => quickSortHelper(array, 0, array.length - 1);
function quickSortHelper(array, left, right) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);
    if (left < index - 1) {
      quickSortHelper(array, left, index - 1);
    }

    if (index < right) {
      quickSortHelper(array, index, right);
    }
  }
  return array;
}

function partition(array, left, right) {
  let pivot = array[Math.floor((right + left) / 2)];
  while (left <= right) {
    while (pivot > array[left]) {
      left++;
    }
    while (pivot < array[right]) {
      right--;
    }
    if (left <= right) {
      [array[left], array[right]] = swap(array[left], array[right]);
      left++;
      right--;
    }
  }
  return left;
}
//########################################################

//########################################################
// [5] Merge Sort => O(n*log(n))

function merge(leftArray, rightArray) {
  let result = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      result.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      result.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }
  let leftRemains = leftArray.slice(leftIndex),
    rightRemains = rightArray.slice(rightIndex);

  return result.concat(leftRemains).concat(rightRemains);
}
/**
 * It divides the input array into two halves, calls itself for the two halves,
 * and then merges the two sorted halves.
 */
function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  let midPoint = Math.floor(array.length / 2),
    leftArray = array.slice(0, midPoint),
    rightArray = array.slice(midPoint);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}
//########################################################

//########################################################
// [6] Count Sort => O(n+k)
/**
 *Count sort does not compare values. It works only for numbers.
  Instead of sorting by swapping elements, this algorithm works by counting occurrences of each element in the array.
  Once occurrences of each element are counted, the new array can be created using those occurrences.
 */
function countSort(array) {
  let hash = {},
    countArr = [];
  for (let i = 0; i < array.length; i++) {
    if (!hash[array[i]]) {
      hash[array[i]] = 1;
    } else {
      hash[array[i]]++;
    }
  }
  for (let key in hash) {
    for (let i = 0; i < hash[key]; i++) {
      countArr.push(parseInt(key));
    }
  }
  return countArr;
}
//########################################################

//########################################################
// [7] JavaScript Built-in Sort
const comparatorNum = (a, b) => a - b;
const sortBuiltInJS = (array) => array.sort(comparatorNum);

//################### Testing Section ####################
// testArray is an array of size 1000 containing random numbers between 0 and 1000.

console.time("[1] Bubble sort");
bubbleSort(testArray);
console.timeEnd("[1] Bubble sort");

console.time("[2] Selection sort");
selectionSort(testArray);
console.timeEnd("[2] Selection sort");

console.time("[3] Insertion sort");
insertionSort(testArray);
console.timeEnd("[3] Insertion sort");

console.time("[4] Quick sort");
quickSort(testArray);
console.timeEnd("[4] Quick sort");

console.time("[5] Merge sort");
mergeSort(testArray);
console.timeEnd("[5] Merge sort");

console.time("[6] Count sort");
countSort(testArray);
console.timeEnd("[6] Count sort");

console.time("[7] JS built-in sort");
sortBuiltInJS(testArray);
console.timeEnd("[7] JS built-in sort");
