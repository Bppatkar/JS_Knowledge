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