/**
 * Helper function used to check if the array is in descending order or not.
 * @param {number array} arr
 * @returns Boolean
 */
const isDescending = (arr) =>
  arr.every(function (nextValue, i) {
    return i === 0 || nextValue <= arr[i - 1];
  });

/**
 *
 * @param {numbers array} arr The array being checked if it is in ascending or descending order.
 * @returns {Boolean} returns true if the array was sorted and false if otherwise
 */
const isSorted = (arr) => {
  arr = directionChecker(arr);
  const n = arr.length;
  if (n == 0 || n == 1) return true;

  for (let i = 1; i < n; i++) if (arr[i - 1] > arr[i]) return false;
  return true;
};

/**
 *
 * @param {numbers array} arr The array being checked if it is in ascending or descending order.
 * @returns {numbers array} returns a reversed array if the original one is in descending order.
 */
const directionChecker = (arr) => (isDescending(arr) ? arr.reverse() : arr);

// generates random numbers for testing the worst case in both linear and binary search functions
let testArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);

// returns the index of the searchNum if found
// exit code -1 : if searchNum not found
function linearSearch(array, searchNum) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == searchNum) {
      return i;
    }
  }
  return -1;
}
// testing section that logs the time taken by linear search function
console.time("linearSearch");
linearSearch(testArray, -50);
console.timeEnd("linearSearch");

// returns the index of the searchNum if found
// exit code -1 : if searchNum not found
function binarySearch(array, searchNum) {
  let lowBound = 0,
    highBound = array.length - 1;

  while (lowBound <= highBound) {
    let midIndex = Math.floor((highBound + lowBound) / 2);
    if (array[midIndex] == searchNum) {
      return midIndex;
    } else if (searchNum > array[midIndex]) {
      lowBound = midIndex + 1;
    } else {
      highBound = midIndex - 1;
    }
  }
  return -1;
}

/**
 * Driver function for the binary search algorithm.
 * It sorts the input array before passing it to the binary search function
 */
function binarySearchDriver(array, searchNum) {
  if (!isSorted(array)) {
    array = array.sort(function (a, b) {
      return a - b;
    });
  }

  // testing section that logs the time taken by binary search function
  console.time("binarySearch");
  binarySearch(array, searchNum);
  console.timeEnd("binarySearch");
}
binarySearchDriver(testArray, -50);
