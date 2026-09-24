//! Recursion and Backtraking

//* Print n to 1.... using recusion
function printRecursion(n) {
  if (n == 0) return;
  console.log(n);
  printRecursion(n - 1);
}
// printRecursion(5);

//* Print 1 to n.... using recursion
function printRecursion1(val, n) {
  if (val > n) return;
  console.log(val);
  printRecursion1(val + 1, n);
}
// printRecursion1(1, 6);

//* Sum of first n numbers using recursion
// example : n = 5 => 5 + 4 + 3 + 2 + 1 = 15
function sumUsingRecurison(n) {
  if (n === 0) return 0;
  return n + sumUsingRecurison(n - 1);
}
// console.log(sumUsingRecurison(5));

//* Sum of all elements in array
let arrayForSum = [4, 6, 1, 9, 3];
function summingUpRecursion(n) {
  if (n === 0) return arrayForSum[0];
  return arrayForSum[n] + summingUpRecursion(n - 1);
}
// console.log(summingUpRecursion(arrayForSum.length - 1));

//* Factorial of n
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
// console.log(factorial(6));

//* Sum of all odd numbers in an array
let arrayForOddSum = [4, 6, 1, 9, 3, 7];
function sumOfOddNumbers(n) {
  // let isOdd = arrayForOddSum[n] % 2 != 0;
  // if (n === 0) {
  //   if (isOdd) return arrayForOddSum[n];
  //   else return 0;
  // }
  // if (isOdd) {
  //   return arrayForOddSum[n] + sumOfOddNumbers(n - 1);
  // } else {
  //   return 0 + sumOfOddNumbers(n - 1);
  // }

  let isOdd = arrayForOddSum[n] % 2 != 0;
  if (n === 0) {
    return isOdd ? arrayForOddSum[n] : 0;
  }
  return (isOdd ? arrayForOddSum[n] : 0) + sumOfOddNumbers(n - 1);
}
// console.log(sumOfOddNumbers(arrayForOddSum.length - 1));

//* Leetcode 231. Power of Two
var isPowerOfTwo = function (n) {
  if (n === 1) return true;
  if (n < 1 || (n % 2 != 0)) return false;
  return isPowerOfTwo(n / 2);
}
// console.log(isPowerOfTwo(16)); // true
// console.log(isPowerOfTwo(3)); // false

//* Leetcode 509. Fibonacci Number
var fib = function (n) {
  if (n < 1) return 0;
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(4)); // 3
console.log(fib(6)); // 3