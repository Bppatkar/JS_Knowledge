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
// console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5,6]
// console.log(findDisappearedNumbers([1, 1])); // [2]


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

/* 
Example nums = [1,2,3,4] Length: n = 4
Now check:
Index	Expected	Actual
0	1	1 ✅
1	2	2 ✅
2	3	3 ✅
3	4	4 ✅

Everything matches. So are we missing:

1 ❌
2 ❌
3 ❌
4 ❌

No. The first missing positive is: 5
Because: 
1 ✔
2 ✔
3 ✔
4 ✔
5 ❌
Therefore  If no mismatch is found, we return: return nums.length + 1;
or equivalently return n + 1;
*/

// Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.
var firstMissingPositive = function (nums) {
  let i = 0;
  /// phase 1 cyclic sort
  while (i < nums.length) {
    //We already have two conditions:
    // ✅ 1 <= nums[i] <= n means in range
    // ✅ correctIndex = nums[i] - 1
    // ✅ nums[i] !== nums[correctIndex]
    // if all three condition matched then we swap
    let correctIndex = nums[i] - 1;
    if (nums[i] >= 1 &&
      nums[i] <= nums.length &&
      nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]
    } else i++;
  }

  // Phase 2: Find First Missing Positive
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i + 1) return i + 1;
  }
  return nums.length + 1;
};
// console.log(firstMissingPositive([1, 2, 0])); // 3
// console.log(firstMissingPositive([3, 4, -1, 1])); // 2
// console.log(firstMissingPositive([7, 8, 9, 11, 12])); // 1

// -------------------------------------------------------------------

//! Matrix Traversal
/*
///! Imp Rule
let rows = matrix.length;
let cols = matrix[0].length;

let top = 0;
let bottom = rows - 1;

let left = 0;
let right = cols - 1; */

//! Complete Algorithm
/*
///* Step 1: Top Row
for (let col = left; col <= right; col++) {
    console.log(matrix[top][col]);
}
↓
///* Step 2: Right Column
for (let row = top + 1; row <= bottom; row++) {
    console.log(matrix[row][right]);
}
↓
///* Step 3: Bottom Row
for (let col = right - 1; col >= left; col--) {
    console.log(matrix[bottom][col]);
}
↓
///* Step 4: Left Column
for (let row = bottom - 1; row >= top + 1; row--) {
    console.log(matrix[row][left]);
}
🧠 The Pattern (Don't Memorize the Code)
Instead, memorize this table:

| Boundary | Fixed           | Moving | Direction            | Skip                       |
|----------|------------------|--------|----------------------|-------------------------- |
| Top      | Row (`top`)      | Column | Left → Right ➡️      | None                     |
| Right    | Column (`right`) | Row    | Top+1 → Bottom ⬇️    | Top-right                |
| Bottom   | Row (`bottom`)   | Column | Right-1 → Left ⬅️    | Bottom-right             |
| Left     | Column (`left`)  | Row    | Bottom-1 → Top+1 ⬆️  | Bottom-left & Top-left   |
*/

//! Diagonal Traversal
/*
Main Diagonal
row == column
*/

//!💡 Rule
/*
For a 3×3
Main Diagonal --> row == column
Secondary Diagonal --> row + column
row + column = n - 1
*/
//! Pattern Recognition
/*
Whenever an interviewer says:
- Print principal diagonal
- Print main diagonal
- Sum of diagonal
- Trace of matrix
- Diagonal elements

👉 Think immediately: row == column [if row = i and column = i](we dont have to use nested loop)
for (let i = 0; i < n; i++) {
    console.log(matrix[i][i]);
} // O(n) Time Complexity,Space: O(1)

Whenever they say:
Secondary diagonal
Anti diagonal
Opposite diagonal
👉 Think: row + column == n - 1 [if row = i and column = n - 1 - i](we dont have to use nested loop)
for (let i = 0; i < n; i++) {
    console.log(matrix[i][n - 1 - i]);
} // O(n) Time Complexity, Space: O(1)
 */

/*
1   2   3   4
5   6   7   8
9  10  11  12
13 14  15  16
What are the main diagonal elements? --> 1 6 11 16
for (let i = 0; i < n; i++) {
    console.log(matrix[i][i]);
}
What are the secondary diagonal elements? --> 4 7 10 13
for (let i = 0; i < n; i++) {
    console.log(matrix[i][n - 1 - i]);
}

///* Interview Observation ⭐  Many beginners write nested loops like this:
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i === j) {
            console.log(matrix[i][j]);
        }
    }
}
Time Complexity: O(n²)
*/

/*
///? This is NOT the Diagonal Traversal asked in most interview problems.
When LeetCode or an interviewer says Diagonal Traversal, they usually mean:
///* Print EVERY diagonal of the matrix, not just the main and secondary diagonals.

For example,

1  2  3
4  5  6
7  8  9

The diagonals are:

          1

      2   4

   3   5   7

      6   8

          9

If we print each diagonal separately:

1
2 4
3 5 7
6 8
9

Notice that there are 5 diagonals.

For a 3 × 3 matrix:  Number of diagonals = 2 × n - 1 = 2 × 3 - 1 = 5
For a 4 × 4 matrix:  2 × 4 - 1 = 7 diagonals
*/


//! Final Algorithm
/* Suppose we have

1   2   3   4
5   6   7   8
9  10  11  12
13 14  15  16

We already discovered: Phase 1
Start from every cell of the first row

(0,0)

(0,1)

(0,2)

(0,3)

Each time: row++, column--
This prints

1
2 5
3 6 9
4 7 10 13

Phase 2:- Then start from every cell of the last column (except the first row)

(1,3)
(2,3)
(3,3)

Again, row++ and column--

This prints
8 11 14
12 15
16


Final Output
1

2 5

3 6 9

4 7 10 13

8 11 14

12 15

16
 */

//! Problem 1
/* 
Print all diagonals in this order:

1   2   3   4
5   6   7   8
9  10  11  12
13 14  15  16

Output

1
2 5
3 6 9
4 7 10 13
8 11 14
12 15
16
*/

function printDiagonals(matrix) {
  let rows = matrix.length, cols = matrix[0].length, result = [];
  //* phase 1 - diagonals from first row
  // row is 0 fixed only col changed
  for (let startCol = 0; startCol < cols; startCol++) {
    // start walking on one diagonal
    // we already discovered: row++, column--, so before intering the loop we need to initialize row and col
    let row = 0, col = startCol;
    // walk outside the matrix
    while (row < rows && col >= 0) {
      const val = matrix[row][col];
      console.log(row, col, val);
      result.push(val); row++; col--;
    }
  }

  //* phase 2 - diagonals from last column 

  // now col is fixed and row is changing, we start row from 1 because we already covered row 0 in phase 1 and col is fixed to last column so we write col = cols - 1 means the last column

  for (let startRow = 1; startRow < rows; startRow++) {
    let row = startRow, col = cols - 1;
    while (row < rows && col >= 0) {
      const val = matrix[row][col];
      console.log(row, col, val);
      result.push(val); row++; col--;
    }
  }
  return result;
}
//* without comment
/* function printDiagonals(matrix) {
  let rows = matrix.length, cols = matrix[0].length, result = [];
  // phase 1 - where row is fixed and cols change
  for (let startCol = 0; startCol < cols; startCol++) {
    let row = 0, col = startCol;
    while (row < rows && col >= 0) {
      result.push(matrix[row][col]);
      row++; col--;
    }
  }
  // phase 2 for leftover elem
  // here col is fixed and row is changing
  for (let startRow = 1; startRow < rows; startRow++) {
    let row = startRow, col = cols - 1;
    while (row < rows && col >= 0) {
      result.push(matrix[row][col]);
      row++; col--;
    }
  }
  return result
} */
// console.log(printDiagonals([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]));

///? Learning to know about why
/*
///! Phase 1
Matrix

1   2   3   4
5   6   7   8
9  10  11  12
13 14  15  16

Hum pehla diagonal kaha se start karte hain?
1
Second?
2
5
Third?
3
6
9
Fourth?
4
7
10
13

Notice ki har diagonal ka first element kaha hai?  1 2 3 4 Sab First Row mein hain.
Isliye outer loop mein hum bolte hain Row ko fix kar do. row = 0;
Aur kaun change karega? col  Isliye
for (let startCol = 0; startCol < cols; startCol++) Simple.

///! Phase 2
Ab first row ke saare diagonals print ho gaye.
Lekin
8
11
14
abhi tak print hi nahi hua. Ye diagonal kaha se start hota hai? (1,3) Fir
12
15
start hota hai (2,3) Fir
16
start hota hai (3,3) Ab notice karo.
Is baar
col = last column
fix hai. Aur row change ho raha hai. To outer loop ban gaya
for (let startRow = 1; startRow < rows; startRow++)
Ye hi logic hai. Bas. Koi magic nahi.
*/
//! Why Row++ and Col--?

/* 
Maan lo interviewer bolta hai "Print this diagonal."
3
6
9
Coordinates kya hain?
3  -> (0,2)
6  -> (1,1)
9  -> (2,0)

Ab sirf coordinates dekho. 
Row
0
1
2
kya ho raha hai?  Increase. To  row++

Column
2
1
0

kya ho raha hai? Decrease. To col-- 
Bas. Formula yaad nahi karna. Coordinates dekhna. Movement khud mil jayega. Ye hi engineering thinking hai.
*/

//! Leetcode 867. Transpose Matrix
function transpose(matrix) {
  let rows = matrix.length, cols = matrix[0].length;
  // now we need to create a new matrix of size cols x rows  because transpose hokar matrix rowXcol se colXrow ho jayega
  //? two ways to do it
  // let transposeMatrix = new Array(3).fill(0).map(() => []);
  let transposeMatrix = Array.from({ length: cols }, () => []);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      transposeMatrix[col][row] = matrix[row][col];
    }
  }
  return transposeMatrix;
}

//! Transpose Matrix without creating a new matrix
function transposeInPlace(matrix) {
  let rows = matrix.length, cols = matrix[0].length;
  for (let row = 0; row < rows; row++) {
    for (let col = row + 1; col < cols; col++) {
      let temp = matrix[row][col];
      matrix[row][col] = matrix[col][row];
      matrix[col][row] = temp;
    }
  }
  return matrix;
}
/* 
///! But this code not work when
///? Square Matrix - ✅ Kaam karega
transpose([[1,2,3], [4,5,6], [7,8,9]]);

///? Rectangular Matrix - ❌ Error aayega
transpose([[1,2,3], [4,5,6]]); 
/// rows = 2, cols = 3
/// jab row=1, col=2: matrix[2][1] -> undefined
*/

// console.log(transposeInPlace([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [[1,4,7],[2,5,8],[3,6,9]]
// console.log(transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [[1,4,7],[2,5,8],[3,6,9]]
//* ------------------------------

//! Leetcode 48. Rotate Image
//? It is just two patterns combined - 1. Transpose 2. Reverse each row
//? Rotate mein transpose to ho gya bs bacha hai reverse karna to clockwise mein ham row ko reverse karenge aur anticlockwise mein column ko reverse karenge

/* 
/ //! Engineering Rule (Remember Forever)
90° Clockwise
================

Transpose
      ↓
Reverse Every Row
90° Anti-Clockwise
==================

Transpose
      ↓
Reverse Every Column
*/
///! ek single row reverse hogi = [1,2,3] without extra space O(1) se to two pointer and swap to sb reverse ho jayega
/* 
Suppose ek row hai: 1 4 7 9 11 
Usko reverse karke banana hai: 11 9 7 4 1
❓Without creating a new array (O(1) extra space), tum kaise reverse karoge? - [two pointer opposite direction swapping]
------------------------------------------------------------
Opposite Direction Two Pointers
A  B  C  D  E

↑           ↑
L           R

Rule: swap(left, right)

left++
right--

Repeat until (left >= right)
Yehi algorithm hum string reverse me use karte hain.
----------------------------------------------------------------
///! Ek row me n elements hain. Reverse karega O(n) Aur total n rows hain. Total O(n²)
///! Transpose bhi O(n²) Total O(n²) Extra Space O(1)
*/

function rotate(matrix) {
  // we have to rotate inplace so we can't create a new matrix and return it, we have to modify the original matrix
  let rows = matrix.length, cols = matrix[0].length;

  //* transpose wihtout creating a new matrix
  for (let row = 0; row < rows; row++) {
    // sirf upper triangle ko swap karenge, lower triangle ko nahi kyunki lower triangle already upper triangle ke saath swap ho jayega ,Kyun? Kyuki agar (0,1) swap kar diya, to (1,0) already automatically sahi ho gaya. Agar dobara swap kar diya to matrix wapas original ban jayegi.
    /*
          0   1   2

    0     x   ✔   ✔

    1         x   ✔

    2             x 
     */
    for (let col = row + 1; col < cols; col++) {
      let temp = matrix[row][col];
      matrix[row][col] = matrix[col][row];
      matrix[col][row] = temp;
    }
  }

  // console.log("transposeMatrix", matrix); // [[1,4,7],[2,5,8],[3,6,9]]

  // reverse each row


  for (let row = 0; row < rows; row++) {
    matrix[row].reverse();
  }

  /* 
  "reverse() internally bhi O(n) hi kaam karta hai. Maine Opposite Direction Two Pointers pattern use karke same logic manually implement kiya hai. Isse mujhe in-place reversal ka actual algorithm bhi demonstrate karne ka mauka milta hai."
  */

  ///* / reverse [using two pointer swap approch same as string rotation]
  // for (let row = 0; row < rows; row++) {
  //   let left = 0, right = cols - 1;

  //   while (left < right) { // Jab tak pointers mil nahi jaate.
  //     let temp = matrix[row][left];
  //     matrix[row][left] = matrix[row][right];
  //     matrix[row][right] = temp;
  //     left++;
  //     right--;
  //   }
  // }
  return matrix;
}
// console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [[7,4,1],[8,5,2],[9,6,3]]

//! ----------------------------------------

//! Leetcode 54. Spiral Matrix
//* This is Simulation Pattern, qki yahan ham Traversal? ❌ Nahi. ,Two Pointer? ❌ Nahi. ,Sliding Window? ❌ Nahi.,
//* Matrix Traversal ? ❌ Partially. Ye actually hai... Simulation Pattern Kyuki hum ek insaan ki movement ko simulate kar rahe hain.
/* //!*❌ Second Bug (Very Important)
Ye interview ka favourite bug hai.
Suppose matrix

1 2 3 4
5 6 7 8

2 × 4 matrix
Let's dry run. Top Row 1 2 3 4 Top++
Right Column 8 Right--
Bottom Row 7 6 5 Bottom-- 
Ab top = 1, bottom = 0

///? Notice [top > bottom]
Matlab koi bottom row bachi hi nahi.
Lekin tumhara code fir bhi ye chalata hai: 
///! for (let i = right; i >= left; i--)
Ye galat values print kar sakta hai.
Isi liye industry code me ye checks lagte hain.
///* Bottom row print karne se pehle

///! if (top <= bottom) {
    // print bottom row
///! }

///* Aur Left column print karne se pehle

///! if (left <= right) {
    // print left column
///! }
Ye bahut important hai.
*/

var spiralOrder = function (matrix) {
  let ans = [];
  let rows = matrix.length, cols = matrix[0].length;
  let left = 0,
    right = cols - 1,
    top = 0,
    bottom = rows - 1;

  while (top <= bottom && left <= right) {
    // Print Top Row from left to right means [1,2,3]
    for (let i = left; i <= right; i++) {
      ans.push(matrix[top][i]);
    }
    //* Har boundary print hone ke baad us boundary ko shrink karna /hota hai.
    top++; // because last element of top row is already printed so we move to next row

    // Print Right Column from top to bottom [6,9]
    for (let i = top; i <= bottom; i++) {
      ans.push(matrix[i][right]);
    }
    //* Har boundary print hone ke baad us boundary ko shrink karna hota hai.
    right--; // because last element of right column is already printed so we move to previous column

    // Print Bottom Row from right to left means [8,7]
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        ans.push(matrix[bottom][i]);
      }
    }
    //* Har boundary print hone ke baad us boundary ko shrink karna hota hai.
    bottom--; // because last element of bottom row is already printed so we move to previous row

    // Print Left Column from bottom to top means [4]
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        ans.push(matrix[i][left]);
      }
    }
    //* Har boundary print hone ke baad us boundary ko shrink karna hota hai.
    left++; // because last element of left column is already printed so we move to next column
  }
  return ans;
};
// console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [1,2,3,6,9,8,7,4,5]
// console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])); // [1,2,3,4,8,12,11,10,9,5,6,7]


//! Without comment
var spiralOrder = function (matrix) {
  let rows = matrix.length, cols = matrix[0].length, ans = [];
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1;

  while (left <= bottom && left <= right) {
    // print top row from left to right
    for (let i = left; i <= right; i++) {
      ans.push(matrix[top][i])
    }
    top++;
    // print right col form top to bottom
    for (let i = top; i <= bottom; i++) {
      ans.push(matrix[i][right])
    }
    right--;
    // print bottom row from right to left
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        ans.push(matrix[bottom][i])
      }
    }
    bottom--;
    // print left col from bottom to top
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        ans.push(matrix[i][left])
      }
    }
    left++;
  }
  return ans;
};