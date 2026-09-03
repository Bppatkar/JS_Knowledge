//! Binary Search
/* 
"Binary Search = sorted array mein mid find karo."
That's incomplete.


Binary Search repeatedly eliminates a portion of the search space because we can prove that portion cannot contain the answer.

So Binary Search is essentially:

Large Search Space
        ↓
      reduce
        ↓
Smaller Search Space
        ↓
      reduce
        ↓
Even Smaller
        ↓
      reduce
        ↓
Answer
-----------------------
//* Why is it O(log n)?

This is our first constraint/TC connection.

Suppose: n = 16

Each step approximately halves the search space:

16
↓
8
↓
4
↓
2
↓
1

That's about 4 reductions.

Because: 2⁴ = 16

For: n = 1,000,000

we don't need one million checks.

We repeatedly divide:

1,000,000
500,000
250,000
125,000
...
1

Only around 20 reductions.

That's why: Binary Search → O(log n)

The key isn't memorizing log n. The key is:

///? The search space is repeatedly reduced by a constant factor.
---------------------------------
///! why we use left <= right in the while loop?

///? Answer is in the array, we want to check all elements. So we use left <= right. because if we use left < right, we will miss the last element/final search position. 

Example:

Array: [2, 4, 7, 9, 15]
Target: 15

left = 4
right = 4

15 ← only candidate remaining

With: while (left < right)

condition: 4 < 4 ❌

Loop terminate.

But: while (left <= right)
gives: 4 <= 4 ✅

and we check arr[4].
-----------------------------
///! 🔑 Binary Search mantra
///* <= means my search space is inclusive on both sides.
*/

///! Binary Search Template

function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // target not found
}

//! Leetcode 704. Binary Search
var search = function (nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}; //TC: O(log n), SC: O(1)

//! Leetcode 35. Search Insert Position
var searchInsert = function (nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;   // return left because it will be the position where target can be inserted
};
// console.log(searchInsert([1, 3, 5, 6], 5)); // Output: 2
// console.log(searchInsert([1, 3, 5, 6], 2)); // Output: 1
// console.log(searchInsert([1, 3, 5, 6], 7)); // Output: 4

//! Leetcode 34. Find First and Last Position of Element in Sorted Array
/* 
///* LC34 is actually TWO binary searches
Binary Search #1
→ Find FIRST occurrence

Binary Search #2
→ Find LAST occurrence

Then: [first, last]
*/
var searchRange = function (nums, target) {
  let firstPosition = -1, lastPosition = -1;

  // finding first occurrence then we check left
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      firstPosition = mid;
      right = mid - 1;
    }
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  // finding last occurrence then we check right
  left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      lastPosition = mid;
      left = mid + 1;
    }
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return [firstPosition, lastPosition]
}

//! Leetcode 153. Find Minimum in Rotated Sorted Array
var findMin = function (nums) {
  let left = 0, right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}
var findMin = function (nums) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    // if array already sorted
    if (nums[left] <= nums[right]) return nums[left];

    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid - 1]) return nums[m];

    // if left half part is not sorted [means inflaction point in left]
    if (nums[left] > nums[mid]) right = mid - 1;
    else left = mid + 1;
  }
  return nums[left];
}
// console.log(findMin([3, 4, 5, 1, 2])); // Output: 1
// console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // Output: 0

//! Leetcode 33. Search in Rotated Sorted Array
var search = function (nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Left half sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    }
    else {
      // Right half sorted
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
// console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
// console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1

//! Leetcode 162. Find Peak Element
var findPeakElement = function (nums) {
  let left = 0, right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}
// console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // Output: 5
// console.log(findPeakElement([1, 2, 3, 1])); // Output: 2

//! Leetcode 74. Search a 2D Matrix
// Hum matrix ko virtually 1D sorted array maan rahe hain, Virtual indices maan lenge and us basis par mid nikalege and after that mid ko matrix position mein convert krege in 2 formulla se
/* 
let r = Math.floor(mid / col);
let c = mid % col;


🧠 Why these formulas?

Virtual indices ko row-wise distribute kiya hai:

0 1 2 3     → row 0
4 5 6 7     → row 1
8 9 10 11   → row 2

///* mid / col batata hai kaunsi row.
///* mid % col batata hai us row mein kaunsa column.
*/

var searchMatrix = function (matrix, target) {
  let row = matrix.length;
  let col = matrix[0].length
  let total = row * col;


  let left = 0, right = total - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    // virtually mid index find kiya hai ab ise actual matrix position mein convert krege
    // to 2 formulla use honge

    let r = Math.floor(mid / col); // finding which row
    let c = mid % col;  // finding which col

    // bas ab matrix[r][c] ko targer s compare krke binary search lagana hai
    if (matrix[r][c] === target) return true;
    else if (matrix[r][c] < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)); // Output: true
// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13)); // Output: false

//! Leetcode 875. Koko Eating Bananas
var minEatingSpeed = function (piles, h) { }
console.log(minEatingSpeed([3, 6, 7, 11], 8)); // Output: 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // Output: 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // Output: 23