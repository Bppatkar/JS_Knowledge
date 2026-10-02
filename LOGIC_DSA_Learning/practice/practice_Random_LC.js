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

//! Given an integer array nums, return true if there exists a contiguous subarray whose sum is equal to 7. Otherwise, return false.
/* 
nums = [3, 2, -2, 4]
Output: true

nums = [1, 2, 1, 5]
Output: true

nums = [4, -1, 2]
Output: false

1 <= nums.length <= 100,000
-10^9 <= nums[i] <= 10^9
*/

function hasSevenSumSubarray(nums) {
  let map = new Map(), currentPrefix = 0;
  map.set(0, -1);
  for (let i = 0; i < nums.length; i++) {
    currentPrefix += nums[i];
    if (map.has(currentPrefix - 7)) return true;
    map.set(currentPrefix, i);
  }
  console.log(map);
  return false;
}
// console.log(hasSevenSumSubarray([3, 2, -2, 4])); // Output: true
// console.log(hasSevenSumSubarray([1, 2, 1, 5])); // Output: false
// console.log(hasSevenSumSubarray([4, -1, 2])); // Output: false

//! Leetcode 523. Continuous Subarray Sum
/* 
/// Question requirements - we need to find a subarray of size at least 2 whose sum is a multiple of k. [matlab hame aise subarray chahiye jiska sum k se divide ho jaaye]
/// Algorithm
step 1-
*/
function checkSubarraySum(nums, k) {
  /* 
  nums = [23,2,4,6,6], k = 7

    i=0: currentPrefix=23, 23%7=2
     map.has(2)? Nahi → map.set(2, 0)
     
    i=1: currentPrefix=25, 25%7=4
     map.has(4)? Nahi → map.set(4, 1)
     
    i=2: currentPrefix=29, 29%7=1
     map.has(1)? Nahi → map.set(1, 2)
     
    i=3: currentPrefix=35, 35%7=0
     map.has(0)? Haan (0:-1)
     i - map.get(0) = 3 - (-1) = 4 >= 2 → return true
  */
  let map = new Map(), currentPrefix = 0;
  map.set(0, -1);
  for (let i = 0; i < nums.length; i++) {
    currentPrefix += nums[i];
    if (map.has(currentPrefix % k)) {
      // checking length of subarray is at least 2
      if (i - map.get(currentPrefix % k) >= 2) return true;
    }
    else map.set(currentPrefix % k, i);
  }
  return false;
}
// console.log(checkSubarraySum([23, 2, 4, 6, 7], 6));
// console.log(checkSubarraySum([23, 2, 6, 4, 7], 6));
// console.log(checkSubarraySum([23,2,4,6,6], 7));

//! Leetcode 3. Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
  let map = new Map(), maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    if (!map.has(s[right])) map.set(s[right], 1);
    else map.set(s[right], map.get(s[right]) + 1);

    while (map.get(s[right]) > 1) {
      map.set(s[left], map.get(s[left]) - 1);
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
// console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
// console.log(lengthOfLongestSubstring("bbbbb")); // Output: 1
// console.log(lengthOfLongestSubstring("pwwkew")); // Output: 3

//! Leetcode 76. Minimum Window Substring
/*
//* The Complete Algorithm - 
Create needMap ,Create windowMap, matched = 0 ,left = 0, bestWindow = Infinity

For every Right
1. Add current character into windowMap
2. If current character exists in needMap
   AND
   window frequency == need frequency
   matched++
3. While window is valid
      Update minimum answer
      Remove left character
      If removing breaks a requirement
            matched--
      left++
4. Move right
Finished.
Return answer.
*/
//! MIMP  - 
/* 
remember one sentence. We never compare two HashMaps.
We maintain a small variable (matched) that tells us whether all requirements are currently satisfied.
 */

var minWindow = function (s, t) {
  if (s.length < t.length) return "";
  let windowMap = {}, needMap = {};

  for (let ch of t) {
    needMap[ch] = (needMap[ch] || 0) + 1;
  }

  let required = Object.keys(needMap).length;
  let left = 0, matched = 0, minLength = Infinity, startIndex = 0;

  for (let right = 0; right < s.length; right++) {
    windowMap[s[right]] = (windowMap[s[right]] || 0) + 1;

    if (needMap[s[right]] != undefined && needMap[s[right]] === windowMap[s[right]]) matched++;

    while (matched === required) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        startIndex = left;
      }
      windowMap[s[left]]--;
      if (needMap[s[left]] !== undefined && needMap[s[left]] > windowMap[s[left]]) matched--;
      left++;
    }
  }

  return minLength === Infinity ? "" : s.substring(startIndex, startIndex + minLength);
};
// console.log(minWindow("ADOBECODEBANC", "ABC")); // Output: "BANC"
// console.log(minWindow("a", "a")); // Output: "a"
// console.log(minWindow("a", "aa")); // Output: ""
// console.log(minWindow("ab", "a")); // Output: "a"

//! Leetcode 438. Find All Anagrams in a String
//? String + Sliding Window + Frequency
/* 
So:
fixed window
+
frequency map

We don't rebuild the frequency from scratch every time. We maintain it incrementally:

entering character → add
leaving character → remove
*/

function findAnagrams(s, p) { }
// console.log(findAnagrams("cbaebabacd", "abc")); // Output: [0, 6]
// console.log(findAnagrams("abab", "ab")); // Output: [0, 1, 2]
// console.log(findAnagrams("af", "be")); // Output: []

//! Leetcode 76. Minimum Window Substring [upar solved hai, but again solved]
//? Minimum Window — Advanced String Window
/* 
String
+
HashMap
+
Variable Sliding Window
+
Frequency Requirement
--------------------------------
Expand R
↓
Do we satisfy requirement?
        ↓
       YES
        ↓
Shrink L
↓
Keep smallest valid window
*/
var minWindow = function (s, t) {
  if (s.length < t.length) return "";

  let windowMap = {}, needMap = {};

  for (let ch of t) {
    needMap[ch] = (needMap[ch] || 0) + 1;
  }

  let required = Object.keys(needMap).length;
  let matched = 0, minLength = Infinity, startIndex = 0, left = 0;

  for (let right = 0; right < s.length; right++) {
    windowMap[s[right]] = (windowMap[s[right]] || 0) + 1;

    if (needMap[s[right]] !== undefined && needMap[s[right]] === windowMap[s[right]]) matched++;

    while (matched === required) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        startIndex = left;
      }
      windowMap[s[left]]--;
      if (needMap[s[left]] !== undefined && needMap[s[left]] > windowMap[s[left]]) matched--;
      left++;
    }
  }
  return minLength === Infinity ? "" : s.substring(startIndex, startIndex + minLength);
}
// console.log(minWindow("ADOBECODEBANC", "ABC")); // Output: "BANC"
// console.log(minWindow("a", "a")); // Output: "a"
// console.log(minWindow("a", "aa")); // Output: ""


//! Leetcode 344. Reverse String
var reverseString = function (s) {
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
  }
  return s;
};

//! Leetcode 14. Longest Common Prefix
var longestCommonPrefix = function (strs) {
  //   let ans = "";
  //   for (let i = 0; i < strs[0].length; i++) {
  //     let char = strs[0][i];
  //     for (let j = 1; j < strs.length; j++) {
  //       if (strs[j][i] !== char) return ans;
  //     }
  //     ans += char;
  //   }
  //   return ans;

  let length = 0;

  while (length < strs[0].length) {
    let char = strs[0][length];
    for (let i = 1; i < strs.length; i++) {
      if (length === strs[i].length || char !== strs[i][length])
        return strs[0].substring(0, length);
    }
    length++;
  }
  return strs[0];
}

//====================================================================
//====================================================================
class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TREE 1 — Skewed Right (LeetCode example)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//     1
//      \
//       2
//      /
//     3
let tree1 = new TreeNode(1);
tree1.right = new TreeNode(2);
tree1.right.left = new TreeNode(3);

// PreOrder:  [1, 2, 3]
// InOrder:   [1, 3, 2]
// PostOrder: [3, 2, 1]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TREE 2 — Single Node
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//     1
let tree2 = new TreeNode(1);

// PreOrder:  [1]
// InOrder:   [1]
// PostOrder: [1]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TREE 3 — Perfect Balanced Tree
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//         1
//       /   \
//      2     3
//     / \   / \
//    4   5 6   7
let tree3 = new TreeNode(1);
tree3.left = new TreeNode(2);
tree3.right = new TreeNode(3);
tree3.left.left = new TreeNode(4);
tree3.left.right = new TreeNode(5);
tree3.right.left = new TreeNode(6);
tree3.right.right = new TreeNode(7);

// PreOrder:  [1, 2, 4, 5, 3, 6, 7]
// InOrder:   [4, 2, 5, 1, 6, 3, 7]
// PostOrder: [4, 5, 2, 6, 7, 3, 1]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TREE 4 — Big Mixed Tree (tere drawing wala)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//               1
//            /     \
//           2       3
//          / \       \
//         4   5       8
//            / \     /
//           6   7   9
let tree4 = new TreeNode(1);
tree4.left = new TreeNode(2);
tree4.right = new TreeNode(3);
tree4.left.left = new TreeNode(4);
tree4.left.right = new TreeNode(5);
tree4.right.right = new TreeNode(8);
tree4.left.right.left = new TreeNode(6);
tree4.left.right.right = new TreeNode(7);
tree4.right.right.left = new TreeNode(9);

// PreOrder:  [1, 2, 4, 5, 6, 7, 3, 8, 9]
// InOrder:   [4, 2, 6, 5, 7, 1, 3, 9, 8]
// PostOrder: [4, 6, 7, 5, 2, 9, 8, 3, 1]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TREE 5 — Left Skewed
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//         1
//        /
//       2
//      /
//     3
let tree5 = new TreeNode(1);
tree5.left = new TreeNode(2);
tree5.left.left = new TreeNode(3);

// PreOrder:  [1, 2, 3]
// InOrder:   [3, 2, 1]
// PostOrder: [3, 2, 1]


//! PreOrder Traversal of Binary Tree
// recursive
function preOrderTraversal(root) {
  if (!root) return [];
  let ans = [];
  function traversal(curr) {
    if (curr === null) return;
    ans.push(curr.val);
    traversal(curr.left);
    traversal(curr.right);
  }
  traversal(root);
  return ans;
}
// Iterative
function preOrderTraversalIterative(root) {
  let stack = [root], ans = [];
  while (stack.length) {
    let curr = stack.pop();
    ans.push(curr.val);
    curr.right && stack.push(curr.right);
    curr.left && stack.push(curr.left);
  }
  return ans;
}

//! InOrder Traversal of Binary Tree
// recursive
function inOrderTraversal(root) {
  if (!root) return [];
  let ans = [];
  function traversal(curr) {
    if (!curr) return;
    traversal(curr.left);
    ans.push(curr.val);
    traversal(curr.right);
  }
  traversal(root);
  return ans;
}
// Iterative
function inOrderTraversalIterative(root) {
  let ans = [], stack = [], curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    ans.push(curr.val);
    curr = curr.right;
  }
  return ans;
}

//! PostOrder Traversal of Binary Tree
// recursive
function postOrderTraversal(root) {
  if (!root) return [];
  let ans = [];
  function traversal(curr) {
    if (curr === null) return;
    traversal(curr.left);
    traversal(curr.right);
    ans.push(curr.val);
  }
  traversal(root);
  return ans;
}
// Iterative [using 2 stack]
function postOrderTraversalIterative2Stack(root) {
  let s1 = [root], s2 = [], ans = [];
  while (s1.length) {
    let curr = s1.pop();
    s2.push(curr.val);
    curr.left && s1.push(curr.left);
    curr.right && s1.push(curr.right);
  }
  for (let i = s2.length - 1; i >= 0; i--) {
    ans.push(s2[i]);
  }
  return ans;
}
// Iterative [using 1 stack]
function postOrderTraversalIterative1Stack(root) {
  if (!root) return [];
  let stack = [root], ans = [];
  while (stack.length) {
    let curr = stack.pop();
    ans.push(curr.val)
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
  }
  return ans.reverse();
}


//! Level Order Traversal of Binary Tree
// Recursive
var levelOrder = function (root) {
  let ans = [];
  function traversal(curr, level) {
    if (!curr) return;
    if (!ans[level]) ans[level] = [];
    ans[level].push(curr.val);
    curr.left && traversal(curr.left, level + 1);
    curr.right && traversal(curr.right, level + 1);
  }
  traversal(root, 0);
  return ans;
}

// Iterative [we use queue {FIFO} for this]
var levelOrderIterative = function (root) {
  let ans = [], queue = [root];
  while (queue.length) {
    let totalLevel = queue.length;
    let currLevel = [];
    while (totalLevel) {
      let curr = queue.shift();
      currLevel.push(curr.val);
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
      totalLevel--;
    }
    ans.push(currLevel);
  }
  return ans;
}


let trees = [tree1, tree2, tree3, tree4, tree5];

trees.forEach((tree, i) => {
  console.log(`\n━━━ Tree ${i + 1} ━━━`);
  // console.log("PreOrder recursive: ", preOrderTraversal(tree));
  // console.log("PreOrder iterative: ", preOrderTraversalIterative(tree));
  // console.log("InOrder recursive:  ", inOrderTraversal(tree));
  // console.log("InOrder iterative:  ", inOrderTraversalIterative(tree));
  // console.log("PostOrder recursive:", postOrderTraversal(tree));
  // console.log("PostOrder iterative 2 Stack:", postOrderTraversalIterative2Stack(tree));
  // console.log("PostOrder iterative 1 Stack:", postOrderTraversalIterative1Stack(tree));
  // console.log("Level Order recursive:", levelOrder(tree));
  // console.log("Level Order iterative:", levelOrderIterative(tree));
});
