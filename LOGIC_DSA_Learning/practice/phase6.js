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
// without recursion
function printFib(n) {
  let a = -1, b = 1;
  for (let i = 0; i < n; i++) {
    let ans = a + b;
    console.log(ans);
    a = b;
    b = ans;
  }
}
// printFib(10);

// with recursion
var fib = function (n) {
  if (n < 1) return 0;
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
// console.log(fib(4)); // 3
// console.log(fib(6)); // 8

//* Power and Exponent
function powerAndExponent(power, expo) {
  if (expo === 0) return 1;
  return power * powerAndExponent(power, expo - 1);
}
// console.log(powerAndExponent(2, 5)); //32
// console.log(powerAndExponent(2, 3)); //8
// console.log(powerAndExponent(3, 4)); //81
// console.log(powerAndExponent(7, 0)); //1

//* Count Digit
// Given a non-negative integer num, return the number of digits in num.
// example : num = 12345 => 5, num = 123 => 3
function countDigit(n) {
  if (n < 10) return 1;
  return 1 + countDigit(Math.floor(n / 10));
}
// console.log(countDigit(12345));
// console.log(countDigit(42));
// console.log(countDigit(5));

//* Sum of Digits
function sumOfDigit(n) {
  if (n < 10) return n;
  return sumOfDigit(Math.floor(n / 10)) + (n % 10);
}
// console.log(sumOfDigit(12345));
// console.log(sumOfDigit(42));
// console.log(sumOfDigit(5));

//* Reverse a number
// n = 1234, o/p-> 4321
let result = 0;
function reverseNumber(n, result) {
  if (n < 10) return result * 10 + n;
  result = result * 10 + (n % 10);
  return reverseNumber(Math.floor(n / 10), result);
}
// console.log(reverseNumber(1234, result)); //4321
// console.log(reverseNumber(5, result)); //5
// console.log(reverseNumber(1276, result)); //6721
// console.log(reverseNumber(0987, result)); // 789

//* Palindrome Number
function isPalindrome(n) {
  let original = n;
  function reverseNumber(n, result) {
    if (n < 10) return result * 10 + n;
    result = result * 10 + (n % 10);
    return reverseNumber(Math.floor(n / 10), result);
  }
  return original === reverseNumber(n, 0);
}
// console.log(isPalindrome(121));// true;
// console.log(isPalindrome(1221));// true
// console.log(isPalindrome(123));  // false
// console.log(isPalindrome(7)); // true;


// ---------------------------------

// ==============================================
// (Advanced Recrusion/Controlled Recursion/Optimized Recursion)
//! =========== Backtracking  ==============
// ==============================================

//? Defination -Backtracking is a Recursive Algorithmic Technique, for solving problem, incrementally by trying partial solutions and then, abandoning them (Backtracking) if they fail to statisfy constraints of the problem.
// in simple words - backtracking , wo technique hai jisme hum problem ko solve karte hai step by step aur agar humari solution sahi nahi hai to hum piche jaake dusra solution try karte hai.
//! "Exploring all the possibilities, but being smart by abondoning wrong paths early."
// Example - Like trying all the paths in maze and going back if you hit a wall. (Backtracking is used in solving maze problems, sudoku, n-queen problem, etc.)

//! When to use Backtracking?
//? You want to explore all the combinations/permutations/subsets.
//? When there is a clear way to validate a partial solution and you can abandon it if it is invalid.
//? Number of combinations is too large to brute force, so you abandon the invalid ones early.
// [Try a choice -> works ? -> continue, if not , undo (backtrack) and try another choice]

//! Use Cases (Use DFS -> Depth First Search) - Backtracking is a DFS based algorithm.
//? There is algorithm which is very similar to backtracking, called Branch and Bound, but it is not completely the same. It Uses BFS (Breadth First Search). Branch and Bound is used for optimization problems, where we want to find the best solution, while Backtracking is used for finding all possible solutions.

// 1. Subset , means all the possible combinations of a given set. (2^n)
// 2. Permutation, means all the possible arrangements of a given set. (n!)
// 3. Combination, means all the possible combinations of a given set with a given length. (nCr)
// 4. N-Queen Problem, means placing n queens on an n*n chessboard such that no two queens attack each other.
// 5. A lot of choices and decisions + pruning early using abondoning function.

//!General Backtracking Template 📝
// Har backtracking problem mein ek similar structure hota hai. 🏗️

// function solve(currentState, otherParameters) {
//   // 1. Base Case: Check if current state is a solution or a dead-end
//   if (isSolution(currentState)) {
//     // Solution mil gaya, isko record kar lo
//     addSolution(currentState);
//     // Agar sirf ek solution chahiye toh yahan return kar sakte ho
//     // Agar saare solutions chahiye toh aage explore karte raho (agar possible ho)
//     return;
//   }

//   if (isInvalidState(currentState)) {
//     // Pruning: Agar yeh path galat hai
//     return; // Is path ko aage explore mat karo
//   }

//   // 2. Recursive Step: Iterate through all possible choices
//   for (const choice of allPossibleChoices(currentState)) {
//     // 3. Choose: Current state mein choice ko apply karo
//     makeChoice(currentState, choice);

//     // 4. Explore: Recursive call karke aage explore karo
//     solve(currentState, otherParameters);

//     // 5. Unchoose (Backtrack): Choice ko undo karo
//     undoChoice(currentState, choice);
//   }
// }
// Initial call
// solve(initialState, initialParameters);

//! Template with Path Tracking
// function backtrack(path, choices) {
//   // Base Case: Check if current 'path' is a complete solution
//   if (pathIsACompleteSolution(path)) {
//     // Solution mil gaya, isko record kar lo
//     savePath(path);
//     return;
//   }

//   // Optional: Pruning step to discard invalid paths early
//   if (isInvalidState(path)) {
//     return; // Is path ko aage explore mat karo
//   }

//   // Recursive Step: Iterate through all possible choices
//   for (const choice of choices) {
//     // 1. Choose: Current 'path' mein 'choice' ko apply karo
//     makeChoice(path, choice);

//     // 2. Explore: Recursive call karke aage explore karo
//     // (updated path ya new state ke saath)
//     backtrack(updatedPath, newChoices);

//     // 3. Unchoose (Backtrack): 'choice' ko undo karo
//     undoChoice(path, choice);
//   }
// }

//! Leetcode 78. Subsets
var subsets = function (arr) {
  let result = [];

  let backtracking = (path, start) => {
    result.push([...path]);
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtracking(path, i + 1);
      path.pop();
    }
  }
  backtracking([], 0); // path and starting index
  return result;
}
// console.log(subsets([1, 2, 3])); // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
// console.log(subsets([0])); // [[],[0]]

//! Leetcode 77. Combinations
var combine = function (n, k) {
  let result = [];

  let backtracking = (path, start) => {
    if (path.length === k) { result.push([...path]); return; }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtracking(path, i + 1);
      path.pop();
    }
  }
  backtracking([], 1);
  return result;
}
console.log(combine(4, 2)); // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(combine(1, 1)); // [[1]]
