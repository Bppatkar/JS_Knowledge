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