//! Advanced Sliding window pattern
//* Algorithm Derivation

/*
let left =0, right = 0, map= {}, maxLength = 0;
intitialize pointer and map
↓
expand right pointer and map and increase the frequency of the character in the map
↓
while window invalid
    decrease frequency
    remove if frequency is 0
    move left pointer
↓
update maxLength
↓
move right pointer and return answer
*/

//* Pseudocode
/*
left = 0, maxLength = 0, map = {}
for every right
      currentChar = s[right]
      increase frequency of currentChar in map
      while window invalid
            decrease frequency of s[left] in map
            if frequency of s[left] is 0
                  remove s[left] from map
            move left pointer
      update maxLength
return maxLength
*/

//! Longest Substring with at most K distinct [diff diff] characters
function longestSubstringKDistinct(s, k) {
  let left = 0, right = 0, maxLength = 0, map = {};
  while (right < s.length) {
    map[s[right]] = (map[s[right]] || 0) + 1;
    // when we use Object.keys(map).length , Time complexity is O(26 * n) for lowercase english letters
    while (Object.keys(map).length > k) {
      map[s[left]]--;
      if (map[s[left]] === 0) delete map[s[left]];
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
}
//* TC - O(n) - right move onces till end and left move at most n times, and O(1) for map operations since we have only 26 lowercase english letters so total time complexity is O(n)+O(1) = O(n)
//* SC - O(1) - map will have at most 26 lowercase english letters so space complexity is O(1) */

// console.log("longestSubstringKDistinct", longestSubstringKDistinct("eceba", 2)); // 3
// console.log("longestSubstringKDistinct", longestSubstringKDistinct("aa", 1)); // 2

//---------------------------------------------

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

function minWindow(s, t) {
  if (s.length < t.length) return "";
  let needMap = {}, windowMap = {};
  for (let ch of t) {
    needMap[ch] = (needMap[ch] || 0) + 1;
  }
  let left = 0, minLength = Infinity, matched = 0, startIndex = 0;
  let required = Object.keys(needMap).length;

  for (let right = 0; right < s.length; right++) {
    let ch = s[right];
    windowMap[ch] = (windowMap[ch] || 0) + 1;
    if (needMap[ch] !== undefined && needMap[ch] === windowMap[ch]) {
      matched++;
    }
    while (matched === required) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        startIndex = left;
      }
      let leftChar = s[left];
      windowMap[leftChar]--;
      if (needMap[leftChar] !== undefined && windowMap[leftChar] < needMap[leftChar]) {
        matched--;
      }
      left++;
    }
  }
  return minLength === Infinity ? "" : s.substring(startIndex, startIndex + minLength)
}

// console.log("minWindow", minWindow("ADOBECODEBANC", "ABC")); // BANC
// console.log("minWindow", minWindow("a", "a")); // a
// console.log("minWindow", minWindow("a", "aa")); // ""

// ---------------------------------------------

//! Leetcode 713 Subarray Product Less Than K
// nums = [10,5,2,6] , k = 100 , output - 8
// [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]

//* Psuedo Code
/* 
initialize value and we want count not frequency so we use obj
For every Right
1. Add current character into windowMap
     current window all character product < k
    if yes return count
*/

function numSubarrayProductLessThanK(nums, k) {
  let left = 0, right = 0, count = 0, product = 1;
  while (right < nums.length) {
    product *= nums[right]
    while (product >= k) {
      if (k <= 1) return 0
      product /= nums[left]
      left++;
    }
    count += right - left + 1;
    right++;

  }
  return count;
}
// console.log("numSubarrayProductLessThanK", numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // 8
// console.log("numSubarrayProductLessThanK", numSubarrayProductLessThanK([1, 2, 3], 0)); // 0
// console.log("numSubarrayProductLessThanK", numSubarrayProductLessThanK([1, 2, 3], 1)); // 0
//------------------------------------------------------

//! MIMP -  Custom Problem [Exactly K Pattern]
// number of continuous subarrys that contain exactly k odd number
let numsC = [1, 1, 2, 1, 1], k = 3;
function subarrOddNum(nums, k) {
  let count = 0, left = 0, right = 0;
  for (let i = 0; i < nums.length; i++) {
    nums[i] %= 2;
    count += nums[right];
    right++;
    if (count === k) count++;
  }
  while (count < k) {
    count -= nums[left];
    left++;
  }
  return count;
}
// console.log(subarrOddNum(numsC, k))

//------------------------------------------------



//! Kadane's Algorithm - 
// nums = [-2,1,-3,4,-1,2,1,-5,4] , output - 6 , You need to find the contiguous subarray which has the largest sum and return its sum.
//? Kadane's Algorithm simply says - if the sum of the subarray becomes negative, then we can discard that subarray and start a new subarray from the next element. This is because a negative sum will only decrease the sum of any future subarray means [our previous sum is hurting us so we restart]. 
//! Rule -> Kadane always asks: - Which choice gives me the larger sum?
/*
If currentSum < 0
↓
Restart
Else
↓
Continue adding 
 */
//! heart of Kadane Algorithm is:
/* 
currentSum = max(currentSum + nums[i],nums[i]); ⭐⭐⭐⭐⭐
*/
//! Interview explanation("Why does Kadane work?"). -
//?   "Kadane Algorithm maintains two states: currentSum and bestSum. At every element, we decide whether extending the current subarray gives a better sum or starting a new subarray from the current element gives a better sum. We choose the larger of these two options. Then we update bestSum if the current subarray is the best seen so far. This greedy decision is optimal because a negative running sum can never improve a future subarray."

//! Leetcode 53. Maximum Subarray
function maxSubArray(nums) {
  let maxSum = nums[0], currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(currSum + nums[i], nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(maxSubArray([-1, -2, -3, -4]));
// console.log(maxSubArray([5]));

//------------------------------------------------
//! Cyclic Sort
/*
Look at this array:
Index
0 1 2 3 4
Array
3 1 5 4 2

Now write the correct index for every value.
Example:  Value = 3 [starting value in given array]

Where should it go?  Don't tell me "index 3". Think carefully.
If numbers are from 1 to n, then:
1 → ?
2 → ?
3 → ?
4 → ?
5 → ?

| Number | Correct Index |
| ------ | ------------- |
| 1      | 0            |
| 2      | 1             |
| 3      | 2             |
| 4      | 3             |
| 5      | 4             |
means //* value - 1 = correct index

Here is //? Golden Formula of Cyclic Sort.  Correct Index = Value - 1
or in JavaScript, correctIndex = nums[i] - 1;

Golden Rule - //! Keep fixing the current index until the current element reaches its correct position. [Only then do we move to the next index. This is the heart of the algorithm.]

Let's verify it. Array = [3,1,5,4,2]
Current element nums[0] = 3
Where should 3 go? Correct Index = 3 - 1 = 2
So instead of comparing it with every other element, we already know its destination.  It should go to index 2.  //! This is why Cyclic Sort is O(n).

Why not //! Shifting Instead of Swaping...?
Because //? Shifting multiple elements takes O(n) time for a single placement, which would make the overall algorithm O(n²). Swapping places an element directly into its correct index in O(1) time, allowing the entire algorithm to run in O(n).

//? we need this condition.
if (nums[i] !== nums[correctIndex]) {
    swap(nums[i], nums[correctIndex]);
} else {
    i++;
}

Read it in English: If the current number is NOT at its correct position, swap it. Otherwise, this index is finished, so move to the next one.
*/
//! Final Thinking Flow
/* 
Current Number
↓
Find Correct Index
↓
Is it already there?
        YES --------------> Move to next index (i++)
         |
         |
         NO
         |
         ↓
Swap
↓
Stay on same index
↓
Check again

We don't stop because the array looks sorted. We stop because: i >= nums.length
Algorithms should follow conditions, not human intuition.
*/
//? Psuedocode
/* while (i < nums.length)
  correctIndex = nums[i] - 1
if (nums[i] != nums[correctIndex])
  swap(nums[i], nums[correctIndex])
else
  i++; */

function cyclicSort(nums) {
  if (nums.length === 1) return nums;
  let i = 0;
  while (i < nums.length) {
    let correctIndex = nums[i] - 1;
    // if (nums[i] !== nums[correctIndex]) swap(nums, i, correctIndex);
    if (nums[i] !== nums[correctIndex]) [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    else i++;
  }
  return nums;
}
function swap(nums, i, j) {
  let swap = nums[i];
  nums[i] = nums[j];
  nums[j] = swap;
  return nums;
}
// console.log(cyclicSort([3, 1, 5, 4, 2])); // [1,2,3,4,5]
// console.log(cyclicSort([2])); // [2]

// if array has -ve, 0 and +ve values then whatever code we have written ,  it become selection sort because we can't find correct index for -ve number so //! GOLDEN RULE - Cyclic Sort works ONLY when:  Every value has a valid destination index. Meaning Numbers 1 to n.
// console.log(cyclicSort([0, 1, 2, 3, 4]));

/* 
Values            |	Formula
1...n	            | nums[i] - 1
0...n-1	          | nums[i] (or nums[i] - 0)
10...14           | nums[i] - 10
100...199	        | nums[i] - 100
means //* we can write nums[i] - minimumval
🧠 Engineering Insight This is called Index Mapping.
The //! generic formula is:  correctIndex = value - minimumValue
This is a much more powerful idea than memorizing value - 1, because now you can derive the formula for any contiguous range.
*/

/* 
I have one correction to something I said earlier. I told you: "Cyclic Sort only works for values from 1...n." That statement was too narrow. The correct statement is:
:- //? Cyclic Sort works when every value has a unique, valid destination index that can be computed directly.
That's why it works for:
1...n
0...n-1
And with suitable mapping, even for other contiguous ranges.
However, most interview problems use 1...n or 0...n, so that's what you'll encounter on LeetCode.
*/
/* 
nums = [2, 0] n = 2
Value 2 valid hai? ✅ ya ❌
Kya uska correct index (2) array ke andar exist karta hai? ✅ ya ❌
. //? Array nums = [2, 0] ki length 2 hai, isliye n = 2. Question ke according valid values ki range 0 se n tak hoti hai, yani 0, 1, 2. Isliye value 2 bilkul valid hai. Lekin array ki length 2 hone ki wajah se valid indices sirf 0 aur 1 hote hain. Index 2 exist hi nahi karta. Isliye value 2 ko uske correct index 2 par place nahi kiya ja sakta. Yahi reason hai ki LC268 mein normal Cyclic Sort ko directly apply nahi kar sakte.
. //* means ham value ko swap tabhi karege jab uska correctIndex array ke andar exist krta ho means current value < nums.length (n). Agar current value >= nums.length hai to usko swap nahi karenge aur i++ karenge.
*/
//! Full engineering
/* 
///* Observation 1
Array length: n
Possible values: 0 → n
Total values: n + 1 because upar smjhaya na ek value baki reh ja rhi hai array mein space nahi hai itna
Lekin array me sirf: n elements
Isliye exactly ek value missing hogi. 

///*Observation 2
Sirf values: 0 → n-1 ,ko unke correct index par place kiya ja sakta hai.
Value: n ko nahi.

//* Observation 3
Placement complete hone ke baad hum array ko scan karenge.  Agar kahin mila:
nums[i] != i
To missing number: i hoga.

///* Observation 4 (Edge Case)
Agar poora array check kar liya aur har jagah:  nums[i] == i To iska matlab: 0,1,2,...,n-1
sab present hain. To missing kaun bacha? 'n' or n kaise pata chalega?  Array length n hai, aur poora array check karne ke baad bhi missing number nahi mila. To missing number: n hoga. isiliye return nums.length karenge.
*/
//! GOlDEN RULE - 
///* Swap tabhi karenge jab:
//* Current value apni correct position par na ho.
///* Current value < length

//! Leetcode 268. Missing Number

function missingNumber(nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] >= nums.length) i++;
    else {
      // let correct = nums[i] - 0;
      let correct = nums[i];
      if (nums[i] !== nums[correct]) [nums[i], nums[correct]] = [nums[correct], nums[i]];
      else i++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i) return i;
  }
  return nums.length;
}

//? More Generic Approach -
function missingNumberGeneric(nums) {
  let i = 0;
  while (i < nums.length) {
    let correct = nums[i] - 0; // correctIndex = value - minimumValue
    if (nums[i] < nums.length && nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i) return i;
  }
  return nums.length;
}
// console.log(missingNumber([3, 0, 1])); // 2
// console.log(missingNumber([0, 1]));
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
// console.log(missingNumberGeneric([3, 0, 1])); // 2
// console.log(missingNumberGeneric([0, 1]));
// console.log(missingNumberGeneric([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

//! Leetcode 448. Find All Numbers Disappeared in an Array
function findDisappearedNumbers(nums) {
  let i = 0, ans = [];
  while (i < nums.length) {
    let correctIdx = nums[i] - 1; // correctIndex = value - 1
    if (nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else i++;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i + 1) ans.push(i + 1);
  }
  return ans;
}
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5,6]
console.log(findDisappearedNumbers([1, 1])); // [2]


//! Leetcode 287. Find the Duplicate Number [Floyd's Algorithm]
/* 
The problem is named: Find the Duplicate Number
But the optimal solution never compares numbers. It only detects a cycle. Once it finds the cycle,the entry point of the cycle is the duplicate number.
*/

var findDuplicate = function (nums) {
  let map = {};
  for (let elem in nums) {
    map[nums[elem]] = (map[nums[elem]] || 0) + 1;
    if (map[nums[elem]] > 1) return nums[elem]
  }

  return true;
};

/* 
HashMap Solution → Easy, O(n) space.
Follow-up asks O(1) space.
Normal Cyclic Sort cannot be used because we are not allowed to modify the array.
Optimal solution = Floyd's Cycle Detection (Linked List algorithm).
*/

// this is not O(1) sorry , this is O(n) because map having all values of traversal
// solution is - //! Floyd's Algorithm.

var findDuplicate = function (nums) {
  // Floyd's Algorithm. for O(1)
  let slow = 0, fast = 0;

  // phase 1
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow != fast);

  // phase 2
  slow = 0;

  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};

//! Leetcode 41. First Missing Positive 
// Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.
var firstMissingPositive = function (nums) { }
console.log(firstMissingPositive([1, 2, 0])); // 3
console.log(firstMissingPositive([3, 4, -1, 1])); // 2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); // 1