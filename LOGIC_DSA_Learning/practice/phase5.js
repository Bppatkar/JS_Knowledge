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