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


//! - Blind Revision
/* Given an integer array nums, return the first number that appears twice.  If every number appears only once, return -1.

 Constraints: -
1 <= nums.length <= 100,000
-10^9 <= nums[i] <= 10^9

Example:
Input:  [4, 1, 7, 3, 1, 9]
Output: 1
*/

function firstDuplicate(nums) {
  let set = new Set();
  for (let num of nums) {
    if (set.has(num)) return num;
    set.add(num);
  }
  return -1;
}
// console.log(firstDuplicate([4, 1, 7, 3, 1, 9])); // Output: 1
// console.log(firstDuplicate([1, 2, 3, 4])); // Output: -1

//! Prefix Hash Pattern
//! Given an integer array nums, find whether there exists a contiguous subarray whose sum is exactly 0. Return true if such a subarray exists, otherwise return false.
/* 
Examples:

Input:  [4, 2, -2, 7]
Output: true

Input:  [1, 2, 3, 4]
Output: false

Input:  [5, -3, -2, 8]
Output: true
*/

// Psuedo Code:
/* 
currentPrefix = 0 , map = new Map()
 map.set(0, -1) // to handle the case when the prefix sum itself is 0

for each element:
    currentPrefix = currentPrefix + element

    if currentPrefix is already in map:
        return true
    
    otherwise:
        add currentPrefix to map
*/
// ---------------------------------
/* 
Pehle ek simple example nums = [2, -2]
Hum index se sochte hain: 

index:   0    1
nums:   [2,  -2]

Ab prefix sum:

prefix[0] = 2
prefix[1] = 0

Ab prefix[1] = 0 ka matlab kya hai? nums[0...1] ka sum = 0
Yaani poora array zero-sum hai. Ab hamara formula yaad karo Jab:

prefix[i] === prefix[j] toh zero-sum range: [i + 1 ... j]
Lekin yahan humein chahiye: [0 ... 1]
Ab formula mein i kya hoga? i + 1 = 0
Toh: i = -1
💡 Yahi reason hai 0 → -1 store karne ka.
---------------------------------------
///* Ek line mein yaad rakhna: - 
0 → -1 means: "array start hone se pehle prefix sum 0 tha."
Aur phir:

prefix[i] === prefix[j]
        ↓
range = [i+1 ... j]

Agar i = -1 hai:  [-1 + 1 ... j] = [0 ... j]
Bas isi wajah se -1. 🧠
 */

function hasZeroSumSubarray(nums) {
  let currentPrefix = 0, map = new Map();
  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    currentPrefix += nums[i];
    if (map.has(currentPrefix)) return true;
    else map.set(currentPrefix, i);
  }
  return false;
}
// console.log(hasZeroSumSubarray([4, 2, -2, 7])); // Output: true
// console.log(hasZeroSumSubarray([1, 2, 3, 4])); // Output: false
// console.log(hasZeroSumSubarray([5, -3, -2, 8])); // Output: true

//! Given an integer array nums and an integer k,return true if there exists a contiguous subarray whose sum is exactly k. Otherwise, return false.
/* 
Input:
nums = [1, 2, 3, 4] , k = 5
Output: true

Input:
nums = [4, 2, -1, 3] , k = 6
Output: true
 */

function hasKSumSubarray(nums, k) {
  let currentPrefix = 0, map = new Map();
  map.set(0, -1); // because array start hone se phle prefix sum 0 tha
  for (let i = 0; i < nums.length; i++) {
    currentPrefix += nums[i];
    if (map.has(currentPrefix - k)) return true;
    else map.set(currentPrefix, i);
  }
  return false
}
// console.log(hasKSumSubarray([1, 2, 3, 4], 5)); // Output: true
// console.log(hasKSumSubarray([4, 2, -1, 3], 6)); // Output: true

//! Leetcode 560. Subarray Sum Equals K
function subarraySum(nums, k) {
  let map = new Map(), currentPrefix = 0, countForSubarrays = 0;
  map.set(0, 1); // because array start hone se phle prefix sum 0 tha
  for (let i = 0; i < nums.length; i++) {
    currentPrefix += nums[i];
    if (map.has(currentPrefix - k)) {
      countForSubarrays += map.get(currentPrefix - k);
    }
    map.set(currentPrefix, (map.get(currentPrefix) || 0) + 1);
  }
  return countForSubarrays;
}
// console.log(subarraySum([1, 1, 1], 2)); // Output: 2
// console.log(subarraySum([1, 2, 3], 3)); // Output: 2