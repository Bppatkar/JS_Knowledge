//! Leetcode 387. First Unique Character in a String

var firstUniqChar = function (s) {
  if (s.length === 0) return -1;
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], 1);
    else map.set(s[i], map.get(s[i]) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) return i;
  }
  return -1;
};

//? i want to do it in one traversal

function firstUniqChar(s) {
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], 1);
    else map.set(s[i], map.get(s[i]) + 1);
  }
  return s.split("").findIndex(ch => map.get(ch) === 1);
}
// console.log(firstUniqChar("leetcode")); // Output: 0
// console.log(firstUniqChar("loveleetcode")); // Output: 2`

//! Leetcode 283. Moves Zeros
var moveZeroes = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === 0) {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
  }
};
var moveZeroes = function (nums) {
  let i = 0, j = 0;
  while (j < nums.length) {
    if (nums[j] !== 0) {
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      i++;
    }
    j++;
  }
}

//! You are given an integer array nums. Return the number of distinct values that appear at least twice in the array.
/* 
Input: nums = [1, 2, 2, 3, 3, 3]
Output: 2
Because: 2 → appears 2 times , 3 → appears 3 times

So there are 2 distinct values appearing at least twice.

Example 2 
Input: nums = [1, 2, 3, 4]
Output: 0

Example 3
Input: nums = [5, 5, 5, 5]
Output: 1
*/

function countDistinctValues(nums) {
  let map = new Map(), arr = [];
  for (let num of nums) {
    if (!map.has(num)) map.set(num, 1);
    else map.set(num, map.get(num) + 1);
  }
  for (let [key, val] of map) {
    if (val >= 2) arr.push(key);
  }
  return arr.length;
} // TC = O(n) and SC = O(n) for map and arr

//?  optimal solution [without using extra space]
function countDistinctValues(nums) {
  let map = new Map(), count = 0;
  for (let num of nums) {
    if (!map.has(num)) map.set(num, 1);
    else {
      if (map.get(num) === 1) count++;
      map.set(num, map.get(num) + 1);
    }
  }
  return count;
} // TC = O(n) and SC = O(n) for map

// console.log(countDistinctValues([1, 2, 2, 3, 3, 3])); // Output: 2
// console.log(countDistinctValues([1, 2, 3, 4])); // Output: 0
// console.log(countDistinctValues([5, 5, 5, 5])); // Output: 1

//! Leetcode 53. Maximum Subarray
var maxSubArray = function (nums) {
  let currSum = 0, maxSum = nums[0];
  for (let i = 0; i < nums.length; i++) {
    currSum = Math.max(currSum + nums[i], nums[i]);
    maxSum = Math.max(currSum, maxSum);
  }
  return maxSum;
}
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6 [The subarray [4,-1,2,1] has the largest sum 6]
// console.log(maxSubArray([1])); // Output: 1
// console.log(maxSubArray([5, 4, -1, 7, 8])); // Output: 23
