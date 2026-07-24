function greet(val) {
  if (typeof val !== "string") {
    return false;
  }
  return `Hello ${val}`;
}

function canLogin(isVerified) {
  if (isVerified === true) return true;
  return false;
}

function isPositive(number) {
  if (number > 0) return true;
  return false;
}
function isPositive(number) {
  return number > 0;
}

const getDiscount = (isPremium) => {
  if (isPremium) {
    return 0.2;
  }
  return 0;
}

const getGrade = (score) => {
  if (score > 90)
    return 'A'
  else if (score >= 75)
    return 'B'
  else if (score >= 60)
    return 'C'
  else
    return 'F'
}



const canVote = (age, citizen) => age >= 18 && citizen === true;
// console.log(canVote(20, true)); // true

function printArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log("values are", arr[i]);
  }
}

// printArray([5, 8, 3])

function findLargest(arr) {
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}
// console.log(findLargest([-5, -2, -8, 8, 5, 6, 10, 4]));

//! Leetcode 1920 Build Array from Permutation
var buildArray = function (nums) {
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    ans[i] = nums[nums[i]];
  }
  return ans;
};

//! Leetcode 1480 Running Sum of 1d Array
function runningSum(nums) {
  let sum = 0, ans = [];
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    ans[i] = sum;
  }
  return ans;
}

//* Homework
function findLargest(arr) {
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) largest = arr[i]
  }
  return largest;
}

/* 
Index : 0   1   2   3   4   5

Value : 8   2  11   4  19   7

target - 19
*/

/* 
| Step | Index | Value | Compare with 19 | Decision |
| ---- | ----: | ----: | --------------: | -------- |
| 1    |     0 |     8 |              ❌ | compare but not equal        |
| 2    |     1 |     2 |               ❌ | compare but not equal       |
| 3    |     2 |     11 |               ❌ | compare but not equal        |
| 4    |     3 |     4 |               ❌ | compare but not equal        |
| 5    |     4 |     19 |               ✅ | compare and equal        |

[8, 2, 11, 4, 19, 7]

| Step | Current Index | Current Element | Comparison | Decision           |
| ---- | ------------: | --------------: | :--------: | ------------------ |
| 1    |             0 |               8 |  8 == 19 ❌ | Move to Next Index |
 2                    1           2         2==19 ❌ | move to next index
  3         2                 11              11==19❌ | move to next index
  4         3                 4              4==19❌ | move to next index
  5         4                 19              19==19✅ | stop

  */


function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {

    if (arr[i] === target) {

      return "Found";
    }

  }

  return "Not Found"
}
function linearSearch(arr, target) {

  for (let i = 1; i < arr.length; i++) {

    if (arr[i] === target) {

      return i;

    }

  }

  return -1;

}


/* 
Array  [1,1,0,1,1,1]

| Element | Count | Max |
| ------- | ----: | --: |
| Start   |     0 |   0 |
| 1       |     1 |   1 |
| 1       |     2 |   2 |
| 0       |     0 |   2 |
| 1       |     1 |   2 |
| 1       |     2 |   2 |
| 1       |     3 |   3 |

*/

//! Leetcode 485. Max Consecutive Ones
var findMaxConsecutiveOnes = function (nums) {
  let max = 0, count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      count++;
      if (max < count) max = count;
    }
    else count = 0;
  }
  return max;
};
findMaxConsecutiveOnes(nums = [1, 1, 0, 1, 1, 1])

// --------------------------------------------
//! Best value Tracking Pattern [minimum + maximum pattern]

/* 
low, high, min, max, largest, smallest
ye sb best value tracking ke application hai bs < ya > bandlega baki sb same
*/

function findMaximum(arr) {

  // initialize 
  let max = arr[0];

  // traverse
  for (let i = 1; i < arr.length; i++) {

    // compare
    if (max < arr[i]) {

      // update
      max = arr[i]
    }
  }

  // return
  return max;
}


function findMinimum(arr) {
  let best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < best) best = arr[i]
  }
  return best;
}

//? --------------------------------------------------

//!  Best Value Tracking

/*
if(arr[i] > best)    best = arr[i];
*/

//!  Best Index Tracking 

/*  sirf ek extra array access bas
if(arr[i] > arr[bestIndex])     bestIndex = i;
*/

//? --------------------------------------------------

//? find index of maximum elem
let arr = [4, 8, 3, 9]
/*  let bestIndex = 0, max = arr[0];
| i | Current Value | arr[bestIndex] | Update? | bestIndex |
| - | ------------: | -------------: | :-----: | --------: |
| 0 |             4 |              4 |    4    |         0 |
| 1 |             8 |              8 |    8    |         1 |
| 2 |             3 |              8 |    8    |         1 |
| 3 |             9 |              8 |    9    |         3 |
final bestIndex = 3 and arr[bestIndex] = 9
*/

function maxBestIndex(arr) {
  let bestIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[bestIndex]) bestIndex = i;
  }
  return bestIndex
}
maxBestIndex(arr);

// TODO:
/* 
Best Value Tracking

↓

Can return value only.

--------------------------------

Best Index Tracking

↓

Can return index.

↓

Can also return value using

arr[bestIndex]

*/

// TODO:
/* 
                Best Tracking Family
                        │
        ┌───────────────┴────────────────┐
        │                                │
   Best Value Tracking             Best Index Tracking
        │                                │
        │                                │
   Maximum Value                  Maximum Index
   Minimum Value                  Minimum Index
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                      First Occurrence     Last Occurrence

first = if(arr[i] > arr[bestIndex]) 
last = if(arr[i] >= arr[bestIndex])
                      
*/

//! Custom Question 1 Easy 
let newArr1 = [12, 5, 18, 18, 7, 18, 18]
/* 
Maximum Value = ?
Maximum Index = ?
First Occurrence of Maximum = ?
Last Occurrence of Maximum = ?
Kaunsa operator use hoga first occurrence ke liye?
Kaunsa operator use hoga last occurrence ke liye?
*/

function maxValCustomQ(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max;
}
function maxIdxCustomQ(arr) {
  let bestIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[bestIdx]) bestIdx = i
  }
  return bestIdx;
}
function firstOccMax(arr) {
  let firstOccIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[firstOccIdx]) firstOccIdx = i
  }
  return firstOccIdx;
}
function lastOccMax(arr) {
  let lastOccIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[lastOccIdx]) lastOccIdx = i
  }
  return lastOccIdx;
}
// console.log(maxValCustomQ(newArr1))
// console.log(maxIdxCustomQ(newArr1))
// console.log(firstOccMax(newArr1))
// console.log(lastOccMax(newArr1))

//! Custom Question 2 Medium

/* 
Maximum Value = ?
Minimum Value = ?
Maximum Index = ?
Minimum Index = ?
First Occurrence of Maximum = ?
Last Occurrence of Maximum = ?
First Occurrence of Minimum = ?
Last Occurrence of Minimum = ?
*/

let newArr2 = [-5, -12, -3, -3, -20, -1, -1];

function maxValCustomQ2(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max;
}
function minValCustomQ2(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i]
  }
  return min;
}
function maxIdxCustomQ2(arr) {
  let bestMaxIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[bestMaxIdx]) bestMaxIdx = i;
  }
  return bestMaxIdx
}
function minIdxCustomQ2(arr) {
  let bestMinIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[bestMinIdx]) bestMinIdx = i;
  }
  return bestMinIdx
}
function firstOccMaxQ2(arr) {
  let firstOccMax = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[firstOccMax]) firstOccMax = i
  }
  return firstOccMax;
}
function lastOccMaxQ2(arr) {
  let lastOccMax = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[lastOccMax]) lastOccMax = i
  }
  return lastOccMax;
}
function firstOccMinQ2(arr) {
  let firstOccMin = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[firstOccMin]) firstOccMin = i
  }
  return firstOccMin;
}
function lastOccMinQ2(arr) {
  let lastOccMin = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[lastOccMin]) lastOccMin = i
  }
  return lastOccMin;
}

//! Custom Q 3 [Interview twist]
/* 
Fastest Response Time = ?
Fastest Index = ?
First Fastest Index = ?
Last Fastest Index = ?
Ye Maximum Pattern lagega ya Minimum Pattern?
First Fastest ke liye comparison operator?
Last Fastest ke liye comparison operator?
*/

// Server response times (milliseconds)
let newArr3 = [180, 220, 180, 140, 140, 210];

function fastResTime(arr) {
  // i think fastest response time means - jitni jaldi response mila 
  // means sabse kam time mein fast response
  let fast = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < fast) fast = arr[i]
  }
  return fast;
}
function fastestIdx(arr) {
  // i think fastest Index is the same as Fast response time but we have to return the index not value
  let fIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[fIdx]) fIdx = i;
  }
  return fIdx;
}
function firstFastestIdx(arr) {
  // same code as above
  let fIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[fIdx]) fIdx = i;
  }
  return fIdx;
}
function lastFastestIdx(arr) {
  // same code as above
  let fIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[fIdx]) fIdx = i;
  }
  return fIdx;
}
//-----------------------------------------------

//! Leetcode 1672 -Richest Customer Wealth
function maximumWealth(accounts) {
  // richest wealth
  let richestWealth = 0;

  // outer traversal
  for (let i = 0; i < accounts.length; i++) {
    // current wealth
    let currentWealth = 0;
    // inner traversal
    for (let j = 0; j < accounts[i].length; j++) {
      currentWealth += accounts[i][j]
      // compare current wealth with richest wealth
    }
    if (currentWealth > richestWealth) richestWealth = currentWealth;
  }

  // return richest wealth
  return richestWealth;
}
// let ans = maximumWealth(accounts = [[1,5],[7,3],[3,5]])
// console.log(ans)