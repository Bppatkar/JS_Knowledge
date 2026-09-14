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
// range of k will start from 1 and goes up to highimum pile
var minEatingSpeed = function (piles, h) {
  // FIX 1: high must be the biggest pile, NOT the array length.
  // Because speed cannot be less than 1 and more than the largest pile.
  let low = 1;
  let high = Math.max(...piles);

  // Binary Search loop
  while (low < high) {
    // Find the middle speed to test
    let mid = Math.floor((low + high) / 2);

    // Step 1: Checker - Calculate total hours needed at this 'mid' speed
    let totalTime = 0;
    piles.forEach(pile => {
      // FIX 2: Use Math.ceil. If pile=11 and mid=4, she takes 3 hours, not 2.75.
      let time = Math.ceil(pile / mid);
      totalTime += time;
    });

    // Step 2: Decision making
    // If she finishes within 'h' hours, this speed is valid.
    // We want the MINIMUM speed, so we search for a smaller speed on the left.
    if (totalTime <= h) {
      high = mid; // mid works, try to go slower (left side)
    } else {
      // If totalTime > h, 'mid' is too slow.
      // We must increase speed, so search on the right.
      low = mid + 1;
    }
  }
  // When loop ends, low == high, which is our minimum valid speed.
  return low;
};

// console.log(minEatingSpeed([3, 6, 7, 11], 8)); // Output: 4
// console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // Output: 30
// console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // Output: 23

//! Leetcode 1011. Capacity To Ship Packages Within D Days
///* Capacity ↑ ⇒ Days required ↓ / same
///* Capacity ↓ ⇒ Days required ↑ / same
/* 
Capacity too small → required days > D → ❌
Ek certain capacity se start → required days ≤ D → ✅
Uske baad capacity aur badhaoge → valid hi rahegi

For [1,2,3,4,5]:
Minimum capacity = 5 → because largest single package is 5
Maximum capacity = 1 + 2 + 3 + 4 + 5 = 15 → because with 15, everything ships in one day

So answer 5 se 15 ke beech hai.
-----------------------------------
Ab humare paas complete decision rule ban raha hai:

Valid → smaller capacity try karo
Invalid → bigger capacity try karo

Valid (daysUsed <= D) → smaller capacity try karo → high = mid
Invalid (daysUsed > D) → capacity badhani padegi → low = mid + 1
*/
//-------------------------------------------------
/* 
Capacity mid
     ↓
packages one-by-one
     ↓
fit? ── yes → same day
  │
  no
  ↓
new day
     ↓
daysUsed
     ↓
daysUsed <= days ?
   │
 ┌─┴─┐
yes  no
 ↓    ↓
high  low
=mid  =mid+1
*/

var shipWithinDays = function (weights, days) {
  // Minimum capacity ka lower bound [if capicity 9 hue to 10 weight ka package ship hi nhi ho skta]
  let low = Math.max(...weights);
  // Maximum capacity
  let high = weights.reduce((sum, w) => sum + w, 0);


  while (low < high) {
    let mid = Math.floor((low + high) / 2);

    // checker
    let currentLoad = 0;
    let dayUsed = 1;

    // har weight ko ek ek krke check krna
    for (let w of weights) {
      if (currentLoad + w > mid) {
        dayUsed++;
        currentLoad = w;
      }
      else {
        currentLoad += w;
      }
    }

    // valid/invalid
    if (dayUsed <= days) {
      // valid
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low
}
// console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // Output: 15
// console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3)); // Output: 6
// console.log(shipWithinDays([1, 2, 3, 1, 1], 4)); // Output: 3

//! Leetcode 69. Sqrt(x)
var mySqrt = function (x) {
  let left = 1, right = x;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if ((mid * mid) > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right;
}
// console.log(mySqrt(4)); // Output: 2
// console.log(mySqrt(8)); // Output: 2


//! Leetcode 540. Single Element in a Sorted Array
/* 
Single element se pehle: even → odd [even index → next odd index]
Single element ke baad: odd → even [odd index → next even index]
--------------------------------------------------
Valid input:

[1,1, 2,2, 3, 4,4, 5,5]
             ↑
           single

Single se pehle:

0,1   2,3

Single ke baad:

5,6   7,8

So single ki wajah se pair alignment toot jaata hai.

Hum Binary Search mein bas ye dekh rahe hain:

Kya mid aur mid + 1 ek normal pair hain?

Agar hain:

mid, mid+1
  ↓
proper pair

toh single right mein hai.

Agar nahi:

mid, mid+1
  ↓
pair broken

toh single left side / mid mein hai.

Aur hum mid ko even bana dete hain taaki comparison hamesha: mid ↔ mid + 1 ho.
loop tb tk chalega jab tk left < right because single element ka position left = right pe hi hoga to jab loop terminate ho jaayega to ham last mein left = right pe hi honge and wahi single element hoga. to ham return nums[left] kar skte hai ya fir nums[right] kar skte hai because left = right pe hi honge.
*/
var singleNonDuplicate = function (nums) {

  let left = 0, right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // if mid is odd
    if (mid % 2 !== 0) mid = mid - 1;
    if (nums[mid] === nums[mid + 1]) {
      // proper pair 
      // single is on right
      left = mid + 2;
    }
    else {
      // single is on left/mid
      // pair broken
      right = mid;
    }
  }
  return nums[left]; // nums[right] we return as well
}
// console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); // Output: 2
// console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); // Output: 10
// console.log(singleNonDuplicate([1, 1, 2])); // Output: 

//! Leetcode 981. Time Based Key-Value map
/* 
mid <= target  →  remember candidate → right side
mid > target   →  left side
---------------------------------
Map
 ↓
key → [[timestamp, value], [timestamp, value], ...]

get()
 ↓
history nikalo
 ↓
binary search timestamps par
 ↓
timestamp <= target
 ↓
candidate remember
 ↓
right side search
 ↓
candidate ki value return
 */
var TimeMap = function () {
  this.map = new Map();
}

TimeMap.prototype.set = function (key, value, timestamp) {
  if (!this.map.has(key)) {
    this.map.set(key, []);
  }
  this.map.get(key).push([timestamp, value]);
}

TimeMap.prototype.get = function (key, timestamp) {
  const history = this.map.get(key);

  if (!history) return "";

  let left = 0;
  let right = history.length - 1;
  let candidate = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (history[mid][0] > timestamp) right = mid - 1;
    else {
      candidate = mid;
      left = mid + 1;
    }
  }

  if (candidate === -1) return "";

  return history[candidate][1];
}

//! Leetcode 410. Split Array Largest Sum
var splitArray = function (nums, m) {
  let left = Math.max(...nums);
  let right = nums.reduce((sum, e) => sum + e, 0);

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let currentSum = 0, subArray = 1; // why 1 because initially subarray start ho chuka h

    for (let num of nums) {
      if (currentSum + num <= mid) {
        currentSum += num;
      }
      else {
        subArray++;
        currentSum = num;
      }
    }
    if (subArray <= m) {
      right = mid;
    } else { left = mid + 1; }
  }
  return left;
}
// console.log(splitArray([7, 2, 5, 10, 8], 2)); // Output: 18

//! Leetcode 4. Median of Two Sorted Arrays
/* 
Median = sorted array ka middle element.

Agar total elements odd hain (jaise 3, 5, 7) → exactly middle wala element. [1, 2, 3] → median = 2
Agar total elements even hain (jaise 2, 4, 6) → do middle elements ka average. [1, 2, 3, 4] → middle do = 2 aur 3 → median = (2+3)/2 = 2.5
---------------------------------------------------
//* Hm real mein array ko sorted order m merge krke medium nahi nikalenge
- ///? Ham bas Dono original arrays ko merge kiye bina unhe "mentally" ek LEFT group aur RIGHT group mein divide karna.
like - array ki length  7 hai to usme medium center mein hoga aur 3 elem left mein honge and 3 hi right mein

- hame, sorted order mein hi imagin krna hai, merging krte time
*/
var findMedianSortedArrays = function (nums1, nums2) {
  // 1. nums1 should be smaller one
  /* 
  Binary search hum smaller array par karna chahte hain.
  Why?
  Because binary search ka work: O(log(min(m,n)))
  Agar chhote array par search karenge, maximum possible partition positions kam hongi.
--------------------------------------------
  Hum chhote array (nums1) par binary search laga rahe hain — ye dhoondhne ke liye ki usme cut kahan lagana hai. Cut mil gaya toh nums2 ka cut apne aap nikal aata hai (kyunki totalLEFT size fixed hai). Phir check karte hain ki LEFT ke saare elements RIGHT ke saare elements se chhote hain ya nahi. Agar haan → median nikal lo. Agar nahi → binary search se cut adjust karo.
  */
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  let m = nums1.length;
  let n = nums2.length;

  // 2. Left side mein total kitne elem chahiye
  let totalLeft = Math.floor((m + n + 1) / 2);
  // 1 extra rakha left mein because left side ka last wala hi to medium hoga, and 0 index based hai to 1 extra lene se wo sahi result dega

  // 3. nums1 ke partition par binary search
  let left = 0, right = m;

  while (left <= right) {
    let partition1 = Math.floor((left + right) / 2);

    // nums2 ka partition automatic hoga
    let partition2 = totalLeft - partition1;

    // 4. partition ke liye 4 boundary values
    /* 
    nums1 = [1 | 2]
    nums2 = [3 | 4]

    left1 = 1
    right1 = 2
    left2 = 3
    right2 = 4
    --------------------------------------------
    nums1 = [1, 3 | 8]
    nums2 = [2, 7 | 10, 12]

   Ab:

    nums1 LEFT  = [1, 3]
    nums1 RIGHT = [8]

    nums2 LEFT  = [2, 7]
    nums2 RIGHT = [10, 12]

Collectively:

    LEFT  = [1, 3] + [2, 7]
           = [1, 2, 3, 7]

    RIGHT = [8] + [10, 12]
           = [8, 10, 12]
    */
    let left1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    let right1 = partition1 === m ? Infinity : nums1[partition1];
    let left2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    let right2 = partition2 === n ? Infinity : nums2[partition2];

    // 5. correct partition ?
    /* 
    left1 ko right2 se compare kyun? Aur: left2 ko right1 se compare kyun?
    ///? LEFT aur RIGHT ko proper sorted division banana hai. Matlab: - LEFT ka har element <= RIGHT ke har element hona chahiye.
    */
    if (left1 <= right2 && left2 <= right1) {

      // odd total
      if ((m + n) % 2 !== 0) { return Math.max(left1, left2) }
      else {
        // even total
        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
      }
    }

    // 6. nums1 ka partition bahut right chala gya
    else if (left1 > right2) right = partition1 - 1;

    // 7. nums1 ka partition bahut left hai
    else left = partition1 + 1;
  }

}
// console.log(findMedianSortedArrays([1, 2], [3, 4])); // Output: 2.5
// console.log(findMedianSortedArrays([1, 3], [2])); // Output: 2.0

//! Leetcode 278. First Bad Version
/* 
///* isBadVersion(mid) === true
        ↓
mid could be the FIRST bad
        ↓
answer left side mein bhi ho sakta hai
        ↓
right = mid
-------------------------------
///* isBadVersion(mid) === false

toh mid definitely first bad nahi ho sakta.

Aur kyunki uske left ke versions bhi good honge, answer right side mein hi hoga:

left = mid + 1;
-----------------------------------------
isBadVersion(mid) == false
        ↓
mid definitely first bad nahi hai
        ↓
left = mid + 1


isBadVersion(mid) == true
        ↓
mid first bad HO SAKTA hai
        ↓
right = mid
*/
var solution = function (n) {
  // Versions ka valid domain: 1 → n that why start with 1 not 0
  let left = 1, right = n;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (isBadVersion(mid)) right = mid;
    else left = mid + 1;
  }
  return right;
}

//! Leetcode 367. Valid Perfect Square
var isPerfectSquare = function (num) {
  // square 1 se start hoga and maximum square num tak hoga
  let left = 1, right = num;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid * mid === num) return true;
    else if (mid * mid < num) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}

//! Leetcode 744. Find Smallest Letter Greater Than Target
var nextGreatestLetter = function (letters, target) {
  let left = 0, right = letters.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (letters[mid] <= target) left = mid + 1;
    else right = mid;
  }
  if (letters[left] <= target) return letters[0];
  return letters[left];
}