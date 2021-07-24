/**
 * @file Big O notation
 * @version 1.0
 *
 * In this file I am measuring the time taken by some functions
 * to perform a simple count from 0 to n-1 to count up to n input
 * but each function follows a different big O case.
 */
console.time("O_of_n");
/**
 *
 * @param {integer} n
 * @returns {integer} the count up to n
 */
function O_of_n(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count += 1;
  }
  return count;
}
O_of_n(1000);
console.timeEnd("O_of_n");

console.time("O_of_5n");
/**
 * Testing that the constant coefficients/constants don't matter
 * @param {integer} n
 * @returns {integer} the count up to 5n
 */
function O_of_5n(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count += 1;
  }
  for (let i = 0; i < 4 * n; i++) {
    count += 1;
  }
  return count;
}
O_of_5n(1000);
console.timeEnd("O_of_5n");

console.time("O_of_n_squared");
function O_of_n_squared(n) {
  let count = 0;
  for (let i = 0; i < n * n; i++) {
    count += 1;
  }
  return count;
}
O_of_n_squared(1000);
console.timeEnd("O_of_n_squared");

console.time("O_of_n_log_n");
function O_of_n_log_n(n) {
  let count = 0;
  for (let i = 2; i <= n; i++) {
    for (let j = i; j <= n; j *= 2) {
      count += 1;
    }
  }

  return count;
}
O_of_n_log_n(1000);
console.timeEnd("O_of_n_log_n");

console.time("O_of_log_n");
function O_of_log_n(n) {
  let count = 0;
  for (let i = 2; i <= n; i *= 2) {
    count += 1;
  }

  return count;
}
O_of_log_n(1000);
console.timeEnd("O_of_log_n");

console.time("O_of_n_cube");
function O_of_n_cube(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        count += 1;
      }
    }
  }
  return count;
}
O_of_n_cube(1000);
console.timeEnd("O_of_n_cube");
