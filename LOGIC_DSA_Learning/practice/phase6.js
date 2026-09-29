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
// console.log(combine(4, 2)); // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
// console.log(combine(1, 1)); // [[1]]


//! Leetcode 46. Permutations
var permute = function (arr) {
  let result = [];
  let used = new Array(arr.length).fill(false);
  let backtracking = (path, used) => {
    if (path.length === arr.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (used[i] === true) continue;
      used[i] = true;
      path.push(arr[i]);
      backtracking(path, used);
      path.pop();
      used[i] = false;
    }
  }
  backtracking([], used);
  return result;
}
//? Other way
var permute = function (arr) {
  let result = [];
  let backtracking = (path) => {
    if (path.length === arr.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (!path.includes(arr[i])) {
        path.push(arr[i]);
        backtracking(path);
        path.pop();
      }
    }
  }
  backtracking([]);
  return result;
}
// console.log(permute([1, 2, 3])); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// console.log(permute([0, 1])); // [[0,1],[1,0]]
// console.log(permute([1])); // [[1]]

//! Leetcode 90. Subsets II
var subsetsWithDup = function (arr) {
  arr = arr.sort((a, b) => a - b);
  let result = [];
  let backtracking = (path, start) => {
    result.push([...path]);
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      path.push(arr[i]);
      backtracking(path, i + 1);
      path.pop();
    }
  }
  backtracking([], 0);
  return result;
}
// console.log(subsetsWithDup([1, 2, 2])); // [[],[1],[1,2],[1,2,2],[2],[2,2]]
// console.log(subsetsWithDup([0])); // [[],[0]]


//! Leetcode 39. Combination Sum
var combinationSum = function (arr, target) {
  let result = [];

  function backtracking(path, start) {
    let sum = path.reduce((acc, curr) => acc + curr, 0);
    if (sum === target) {
      result.push([...path]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtracking(path, i);
      path.pop();
    }
  }
  backtracking([], 0);
  return result;
}
//? Other way 
var combinationSum = function (arr, target) {
  let result = [];
  function backtrack(path, start, target) {
    if (target === 0) result.push([...path]);
    if (target < 0) return;
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtrack(path, i, target - arr[i]);
      path.pop();
    }
  }
  backtrack([], 0, target);
  return result;
}
// console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
// console.log(combinationSum([2, 3, 5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]
// console.log(combinationSum([2], 1)); // []

//! Leetcode 40. Combination Sum II
var combinationSum2 = function (arr, target) {
  arr = arr.sort((a, b) => a - b);
  let result = [];

  let backtracking = (path, start) => {
    let sum = path.reduce((acc, curr) => acc + curr, 0);
    if (sum === target) { result.push([...path]); return; }
    if (sum > target) return;
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      path.push(arr[i]);
      backtracking(path, i + 1);
      path.pop();
    }
  }
  backtracking([], 0); // path and starting index
  return result;
}
//? Other way
var combinationSum2 = function (arr, target) {
  arr = arr.sort((a, b) => a - b);
  let result = [];

  let backtracking = (path, start, target) => {
    if (target === 0) { result.push([...path]); return; }
    if (target < 0) return;
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      path.push(arr[i]);
      backtracking(path, i + 1, target - arr[i]);
      path.pop();
    }
  }
  backtracking([], 0, target); // path and starting index
  return result;
}
// console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)); // [[1,1,6],[1,2,5],[1,7],[2,6]]
// console.log(combinationSum2([2, 5, 2, 1, 2], 5)); // [[1,2,2],[5]]

//! Leetcode 216. Combination Sum III
var combinationSum3 = function (k, n) {
  let result = [];
  function backtracking(path, start) {
    let sum = path.reduce((acc, curr) => acc + curr, 0);
    if (path.length === k) {
      if (sum === n) { result.push([...path]); }
      return;
    }
    if (sum > n) return;
    for (let i = start; i <= 9; i++) {
      path.push(i);
      backtracking(path, i + 1);
      path.pop();
    }
  }
  backtracking([], 1);
  return result;
}
// console.log(combinationSum3(3, 7)); // [[1,2,4]]
// console.log(combinationSum3(3, 9)); // [[1,2,6],[1,3,5],[2,3,4]]
// console.log(combinationSum3(4, 1)); // []

//! Leetcode 17. Letter Combinations of a Phone Number
var letterCombinations = function (digits) {
  if (digits === "") return [];
  let letters = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }
  let result = [];
  function backtracking(path, start) {
    if (start === digits.length) {
      result.push([...path].join());
      return;
    }
    let lettersOfDigit = letters[digits[start]];
    for (let char of lettersOfDigit) {
      path.push(char);
      backtracking(path, start + 1);
      path.pop();
    }
  }
  backtracking([], 0);
  return result;
}
// console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// console.log(letterCombinations("")); // []
// console.log(letterCombinations("2")); // ["a","b","c"]

//! Leetcode 47. Permutations II
var permuteUnique = function (arr) {
  arr = arr.sort((a, b) => a - b);
  let result = [];
  let usedArr = new Array(arr.length).fill(false);
  let backtracking = (path) => {
    if (path.length === arr.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (usedArr[i] === true) continue;
      if (i > 0 && arr[i] === arr[i - 1] && usedArr[i - 1] === false) continue;
      path.push(arr[i]);
      usedArr[i] = true;
      backtracking(path);
      path.pop();
      usedArr[i] = false;
    }
  }
  backtracking([]);
  return result;
}

//? Other way
var permuteUnique = function (arr) {
  arr.sort((a, b) => a - b);
  let result = [];
  let backtracking = (path, choice) => {
    if (path.length === arr.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < choice.length; i++) {
      if (i > 0 && choice[i] === choice[i - 1]) continue;

      path.push(choice[i]);
      backtracking(path, [...choice.slice(0, i), ...choice.slice(i + 1)]);
      path.pop();
    }
  }
  backtracking([], arr);
  return result;
}
// console.log(permuteUnique([1, 1, 2])); // [[1,1,2],[1,2,1],[2,1,1]]
// console.log(permuteUnique([1, 2, 3])); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// console.log(permuteUnique([1, 1, 1])); // [[1,1,1]]

//! Leetcode 131. Palindrome Partitioning
var partition = function (s) {
  let result = [];
  let backtracking = (path, start) => {
    if (start === s.length) { result.push([...path]); return; }
    for (let i = start; i < s.length; i++) {
      let subStr = s.slice(start, i + 1);
      let reversed = subStr.split('').reverse().join('');
      if (reversed === subStr) {
        path.push(subStr);
        backtracking(path, i + 1);
        path.pop();
      }
    }
  }
  backtracking([], 0);
  return result;
}

//? Other way
var partition = function (s) {
  let result = [];

  function backtrack(path, remainingStr) {

    if (!remainingStr.length) {
      result.push([...path]);
      return;
    }

    for (let i = 1; i <= remainingStr.length; i++) {
      let subStr = remainingStr.substring(0, i);
      if (!isRealPalindrome(subStr)) continue;
      path.push(subStr);
      backtrack(path, remainingStr.substring(i));
      path.pop();
    }
  }
  backtrack([], s);
  return result;
}
const isRealPalindrome = (s) => {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left++] != s[right--]) return false;
  }
  return true;
}
// console.log(partition("aab")); // [["a","a","b"],["aa","b"]]
// console.log(partition("a")); // [["a"]]
// console.log(partition("aabb")); // [["a","a","b","b"],["a","a","bb"],["aa","b","b"],["aa","bb"]]

//! Leetcode 79. Word Search
var exist = function (board, word) {
  let result = false;
  let row = board.length;
  let col = board[0].length;

  let backtrack = (x, y, nextIdx) => {
    if (nextIdx === word.length) {
      result = true;
      return;
    }

    let original = board[x][y];
    board[x][y] = "$"

    // left (col peeche)
    if (y > 0 && board[x][y - 1] === word[nextIdx]) {
      backtrack(x, y - 1, nextIdx + 1);
    }

    // right (col aage)
    if (y < col - 1 && board[x][y + 1] === word[nextIdx]) {
      backtrack(x, y + 1, nextIdx + 1);
    }

    // up (row peeche)
    if (x > 0 && board[x - 1][y] === word[nextIdx]) {
      backtrack(x - 1, y, nextIdx + 1);
    }

    // down (row aage)
    if (x < row - 1 && board[x + 1][y] === word[nextIdx]) {
      backtrack(x + 1, y, nextIdx + 1);
    }

    // when we backtrack we want original value back
    board[x][y] = original;
  }

  // calling backtrack function for every letter of word
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === word[0]) {
        backtrack(i, j, 1);
      }
    }
  }
  return result;
}
// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED")); // true
// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE")); // true
// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCB")); // false

//! Leetcode 51. N-Queens
var solveNQueens = function (n) {
  let result = [];

  let board = Array.from({ length: n }, () => Array(n).fill("."));

  function backtrack(board, row, colSet, digonalSet, antiDigonalSet) {

    if (row === n) result.push(transform(board));

    for (let col = 0; col < n; col++) {

      if (colSet.has(col) || digonalSet.has(row - col) || antiDigonalSet.has(row + col)) { continue; }

      board[row][col] = "Q"
      colSet.add(col);
      digonalSet.add(row - col);
      antiDigonalSet.add(row + col);

      backtrack(board, row + 1, colSet, digonalSet, antiDigonalSet);
      board[row][col] = ".";
      colSet.delete(col);
      digonalSet.delete(row - col);
      antiDigonalSet.delete(row + col);
    }

  }
  backtrack(board, 0, new Set(), new Set(), new Set());
  return result;
}
function transform(board) {
  let newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard.push(board[i].join(''));
  }
  return newBoard;
}
// console.log(solveNQueens(4)); // [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// console.log(solveNQueens(1)); // [["Q"]]
// console.log(solveNQueens(2)); // []

//! Leetcode 37. Sudoku Solver
var solveSudoku = function (board) {
  let rows = new Array(9).fill(null).map(() => new Set());
  let cols = new Array(9).fill(null).map(() => new Set());
  let boxes = new Array(9).fill(null).map(() => new Set());

  // Pre-fill sets with existing numbers
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== ".") {
        let num = board[r][c];
        let boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        rows[r].add(num);
        cols[c].add(num);
        boxes[boxIdx].add(num);
      }
    }
  }

  function backtrack(row, col) {

    if (row === 9) { return true; }
    if (col === 9) return backtrack(row + 1, 0);

    // checking if cell is already filled or not, if filled, call for next col
    if (board[row][col] !== '.') { return backtrack(row, col + 1); }

    // Empty cell - 1-9 try
    let boxIdx = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    for (let num = 1; num <= 9; num++) {
      let ch = num.toString();

      // check if valid
      if (rows[row].has(ch) || cols[col].has(ch) || boxes[boxIdx].has(ch)) continue;

      // place
      board[row][col] = ch;
      rows[row].add(ch);
      cols[col].add(ch);
      boxes[boxIdx].add(ch);

      if (backtrack(row, col + 1)) return true;

      board[row][col] = '.';
      rows[row].delete(ch);
      cols[col].delete(ch);
      boxes[boxIdx].delete(ch);

    }

    return false;  // any number is not working  --> backtrack
  }

  backtrack(0, 0);
  return board;
}
console.log(solveSudoku([["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", "6", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]));

//! Leetcode 22. Generate Parentheses
var generateParenthesis = function (n) {
  let result = [];
  let openCount = 0, closeCount = 0;
  function backtrack(path, openBrac, closeBrac) {
    if (openCount === n && closeCount === n) { result.push([...path].join("")); return; }

    if (openCount < n) {
      path.push(openBrac);
      openCount++;
      backtrack(path, openBrac, closeBrac);
      path.pop();
      openCount--;
    }
    if (closeCount < openCount) {
      path.push(closeBrac);
      closeCount++;
      backtrack(path, openBrac, closeBrac);
      path.pop();
      closeCount--;
    }

  }
  backtrack([], '(', ')');
  return result;
}
// console.log(generateParenthesis(3)); // ["((()))","(()())","(())()","()(())","()()()"]
// console.log(generateParenthesis(1)); // ["()"]
