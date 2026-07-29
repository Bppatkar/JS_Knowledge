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
// findMaxConsecutiveOnes(nums = [1, 1, 0, 1, 1, 1])

// --------------------------------------------
//! Best value Tracking Pattern [minimum + maximum pattern]

/* 
low, high, min, max, largest, smallest
ye sb best value tracking ke application hai bs < ya > bandlega baki sb same
*/

function findMaximum(arr) {

  // initialize 
  let max = arr[0];

  // traverse
  for (let i = 1; i < arr.length; i++) {

    // compare
    if (max < arr[i]) {

      // update
      max = arr[i]
    }
  }

  // return
  return max;
}


function findMinimum(arr) {
  let best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < best) best = arr[i]
  }
  return best;
}

//? --------------------------------------------------

//!  Best Value Tracking

/*
if(arr[i] > best)    best = arr[i];
*/

//!  Best Index Tracking 

/*  sirf ek extra array access bas
if(arr[i] > arr[bestIndex])     bestIndex = i;
*/

//? --------------------------------------------------

//? find index of maximum elem
let arr = [4, 8, 3, 9]
/*  let bestIndex = 0, max = arr[0];
| i | Current Value | arr[bestIndex] | Update? | bestIndex |
| - | ------------: | -------------: | :-----: | --------: |
| 0 |             4 |              4 |    4    |         0 |
| 1 |             8 |              8 |    8    |         1 |
| 2 |             3 |              8 |    8    |         1 |
| 3 |             9 |              8 |    9    |         3 |
final bestIndex = 3 and arr[bestIndex] = 9
*/

function maxBestIndex(arr) {
  let bestIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[bestIndex]) bestIndex = i;
  }
  return bestIndex
}
maxBestIndex(arr);

// TODO:
/* 
Best Value Tracking

↓

Can return value only.

--------------------------------

Best Index Tracking

↓

Can return index.

↓

Can also return value using

arr[bestIndex]

*/

// TODO:
/* 
                Best Tracking Family
                        │
        ┌───────────────┴────────────────┐
        │                                │
   Best Value Tracking             Best Index Tracking
        │                                │
        │                                │
   Maximum Value                  Maximum Index
   Minimum Value                  Minimum Index
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                      First Occurrence     Last Occurrence

first = if(arr[i] > arr[bestIndex]) 
last = if(arr[i] >= arr[bestIndex])
                      
*/

//! Custom Question 1 Easy 
let newArr1 = [12, 5, 18, 18, 7, 18, 18]
/* 
Maximum Value = ?
Maximum Index = ?
First Occurrence of Maximum = ?
Last Occurrence of Maximum = ?
Kaunsa operator use hoga first occurrence ke liye?
Kaunsa operator use hoga last occurrence ke liye?
*/

function maxValCustomQ(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max;
}
function maxIdxCustomQ(arr) {
  let bestIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[bestIdx]) bestIdx = i
  }
  return bestIdx;
}
function firstOccMax(arr) {
  let firstOccIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[firstOccIdx]) firstOccIdx = i
  }
  return firstOccIdx;
}
function lastOccMax(arr) {
  let lastOccIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[lastOccIdx]) lastOccIdx = i
  }
  return lastOccIdx;
}
// console.log(maxValCustomQ(newArr1))
// console.log(maxIdxCustomQ(newArr1))
// console.log(firstOccMax(newArr1))
// console.log(lastOccMax(newArr1))

//! Custom Question 2 Medium

/* 
Maximum Value = ?
Minimum Value = ?
Maximum Index = ?
Minimum Index = ?
First Occurrence of Maximum = ?
Last Occurrence of Maximum = ?
First Occurrence of Minimum = ?
Last Occurrence of Minimum = ?
*/

let newArr2 = [-5, -12, -3, -3, -20, -1, -1];

function maxValCustomQ2(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max;
}
function minValCustomQ2(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i]
  }
  return min;
}
function maxIdxCustomQ2(arr) {
  let bestMaxIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[bestMaxIdx]) bestMaxIdx = i;
  }
  return bestMaxIdx
}
function minIdxCustomQ2(arr) {
  let bestMinIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[bestMinIdx]) bestMinIdx = i;
  }
  return bestMinIdx
}
function firstOccMaxQ2(arr) {
  let firstOccMax = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[firstOccMax]) firstOccMax = i
  }
  return firstOccMax;
}
function lastOccMaxQ2(arr) {
  let lastOccMax = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[lastOccMax]) lastOccMax = i
  }
  return lastOccMax;
}
function firstOccMinQ2(arr) {
  let firstOccMin = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[firstOccMin]) firstOccMin = i
  }
  return firstOccMin;
}
function lastOccMinQ2(arr) {
  let lastOccMin = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[lastOccMin]) lastOccMin = i
  }
  return lastOccMin;
}

//! Custom Q 3 [Interview twist]
/* 
Fastest Response Time = ?
Fastest Index = ?
First Fastest Index = ?
Last Fastest Index = ?
Ye Maximum Pattern lagega ya Minimum Pattern?
First Fastest ke liye comparison operator?
Last Fastest ke liye comparison operator?
*/

// Server response times (milliseconds)
let newArr3 = [180, 220, 180, 140, 140, 210];

function fastResTime(arr) {
  // i think fastest response time means - jitni jaldi response mila 
  // means sabse kam time mein fast response
  let fast = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < fast) fast = arr[i]
  }
  return fast;
}
function fastestIdx(arr) {
  // i think fastest Index is the same as Fast response time but we have to return the index not value
  let fIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[fIdx]) fIdx = i;
  }
  return fIdx;
}
function firstFastestIdx(arr) {
  // same code as above
  let fIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[fIdx]) fIdx = i;
  }
  return fIdx;
}
function lastFastestIdx(arr) {
  // same code as above
  let fIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[fIdx]) fIdx = i;
  }
  return fIdx;
}
//-----------------------------------------------

//! Leetcode 1672 -Richest Customer Wealth
function maximumWealth(accounts) {
  // richest wealth
  let richestWealth = 0;

  // outer traversal
  for (let i = 0; i < accounts.length; i++) {
    // current wealth
    let currentWealth = 0;
    // inner traversal
    for (let j = 0; j < accounts[i].length; j++) {
      currentWealth += accounts[i][j]
      // compare current wealth with richest wealth
    }
    if (currentWealth > richestWealth) richestWealth = currentWealth;
  }

  // return richest wealth
  return richestWealth;
}
// let ans = maximumWealth(accounts = [[1,5],[7,3],[3,5]])
// console.log(ans)
// ----------------------------------

//* Prefix Sum 
//! This is a Build Phase ok 
//? ye hai Out of Place algorithm [when we create new array]
// O(n)
let original_array = [3, 5, 7, 12, 22]
// prefix array = [3,8,15,27,49]
function prefixSum(original_array) {
  let ansArr = [];
  ansArr[0] = original_array[0]
  for (let i = 1; i < original_array.length; i++) {
    ansArr[i] = ansArr[i - 1] + original_array[i]
  }
  return ansArr;
}

//? In place algorithm [when we modify orignal array without taking extra memory] O(1)
function inPlaceAlgo(original_array) {
  for (let i = 1; i < original_array.length; i++) {
    original_array[i] = original_array[i - 1] + original_array[i]
  }
  return original_array
}
// console.log(inPlaceAlgo(original_array))

//! Prefix sum is Build Phase and Range sum [Query Phase ok] 
// range sum prefix sum ke bad aata hai means phle poora prefix sum banega fir uske bad range nikalege sum(0,2) sum(2,4) aise range ka sum index wise

/* 
//* Notes Revision range sum and prefix sum 

//? 🎯 Revision (2 Minutes)

Original Array

Index : 0  1  2  3  4
Value : 2  5  1  8  3
//* Step 1: Prefix Sum WITHOUT Dummy 0
Prefix

Index : 0  1  2   3   4
Value : 2  7  8  16  19

Meaning:
Prefix[0] = 2
Prefix[1] = 2+5 = 7
Prefix[2] = 2+5+1 = 8
Prefix[3] = 2+5+1+8 = 16
Prefix[4] = 19

//* Range Sum
Suppose interviewer asks: Sum from index 2 to 4

Original  1 + 8 + 3 = 12

Formula :- Prefix[4] - Prefix[1]
19 - 7 = 12 Works.

Problem :- Now suppose  Sum from index 0 to 3 
Formula becomes- Prefix[3] - Prefix[-1] 😑 Prefix[-1] exist hi nahi karta.

Isliye edge case likhna padta hai.

if(L==0) return Prefix[R]
else return Prefix[R]-Prefix[L-1]

Interviewer ko extra condition pasand nahi aati agar avoid ho sakti ho.

//* Step 2: Prefix WITH Dummy 0 (Engineering Version)

Hum beginning mein ek extra 0 rakh dete hain.

Prefix

Index : 0  1  2  3   4   5
Value : 0  2  7  8  16  19

Dhyan do.

Ye extra 0 kisi sum ka part nahi hai.  Ye sirf index shifting ke liye hai.
Ab wahi query Index  2 → 4
Formula: -  Prefix[5] - Prefix[2]
19 - 7 =  12 ab difficult case

Index  0 → 3
Formula :- Prefix[4] - Prefix[0]
16 - 0 = 16

🎉 Koi edge case nahi. Koi if nahi. Har baar same formula.

🧠 Visualization (Sabse Important)

Socho Prefix Array mein har element apne left side ka total store karta hai.

Original

2   5   1   8   3

        ↑
      Start

Tumhe index 2 se chahiye. To usse pehle ka total hata do.  Total till 4

19 - [Total till before 2] 7 = 12

Yehi Prefix Sum ka magic hai.

//? Ek Rule Yaad Rakhna
//* Without Dummy Answer = Prefix[R] - Prefix[L-1] Problem: ❌ L==0
//* With Dummy (Preferred) Answer = Prefix[R+1] - Prefix[L] Problem: ✅ None

💡 Engineer Dummy 0 Kyun Pasand Karte Hain? Ek line mein:  Because one formula works for every query without any special case.

*/


/*
📌 Difference
Prefix Sum	             |             Range Sum
Prefix Array banata hai  |	Prefix Array use karta hai
Precomputation           | 	Query
O(n)                     |	O(1)
Build Phase              | 	Query Phase

🔥 Ye table yaad rakhna.

*/


//! Leetcode 303 range sum query
class NumArray {
  constructor(nums) {
    this.prefix = [];
    this.prefix[0] = 0;
    for (let i = 1; i < nums.length + 1; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i - 1];
    }
  }
  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}


//! Leetcode 724. Pivot Index
var pivotIndex = function (nums) {
  let prefix = [];
  prefix[0] = 0;
  for (let i = 1; i < nums.length + 1; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1];
  }
  // console.log(prefix);
  // range sum lagayege har index ka left + har index ka right check
  for (let i = 0; i < nums.length; i++) {
    // count left sum  - left range - 0 se i-1
    //* let leftSum = prefix[(i - 1) + 1] - prefix[0];
    let leftSum = prefix[i];
    // count right sum - right range i+1 se n-1
    //* let rightSum = prefix[(nums.length - 1) + 1] - prefix[i + 1]
    let rightSum = prefix[nums.length] - prefix[i + 1]
    // if both equal return i
    if (leftSum === rightSum) return i
  }
  return -1;
};
//--------------------------------------------------------

//* 🎯 Difference Array important sentence
//? Difference Array values store nahi karta.
//? Difference Array changes (events) store karta hai.

/* 
Interview Answer

Prefix Sum original array se cumulative information banata hai, jisse queries fast ho jaati hain.

Difference Array uska reverse idea use karta hai. Ye final values store nahi karta, balki sirf changes (start aur stop events) store karta hai. Baad mein Prefix Sum laga kar original updated array reconstruct kiya jaata hai.

Isliye Difference Array ko Prefix Sum ka inverse concept kaha jaata hai.

🧠 Ultimate Understanding

Ye diagram yaad rakhna.

//* Prefix Sum
Original Array
        │
        ▼
 Prefix Array
        │
        ▼
 Fast Queries


//* Difference Array
Range Updates
        │
        ▼
Difference Array
        │
        ▼
 Prefix Sum
        │
        ▼
Updated Original Array

Notice?

Prefix Sum banata hai cumulative data.

Difference Array cumulative data ko reconstruct karta hai.

Isliye inverse.

*/

//! Leetcode 1109. Corporate Flight Bookings

var corpFlightBookings = function (bookings, n) {
  // creating diff array because it is not given, only flight length given
  let diff = new Array(n).fill(0);

  // processing booking
  for (let i = 0; i < bookings.length; i++) {
    // extracting values - start, end , seats and these are flight numbers and seats ok
    let start = bookings[i][0] - 1; // -1 because of 0 indexing mapping with flight array index 1
    let stop = bookings[i][1] - 1;
    let seat = bookings[i][2];

    // marking
    diff[start] += seat
    if (stop + 1 < diff.length) { // diff array ki length 
      diff[stop + 1] -= seat;
    }
  }
  // now converting diff array into final answer  using prefix sum traversal
  // prefix sum = curr + prev so loop start from 1
  console.log("diff array", diff)
  for (let j = 1; j < diff.length; j++) {
    diff[j] += diff[j - 1];
  }
  return diff;
}

/* 
//* simple code without comment
var corpFlightBookings = function (bookings, n) {
    let diff = new Array(n).fill(0);

    for (let i = 0; i < bookings.length; i++) {
        let start = bookings[i][0] - 1;
        let stop = bookings[i][1] - 1;
        let seat = bookings[i][2];

        diff[start] += seat;
        if (stop + 1 < diff.length) diff[stop + 1] -= seat;
        // console.log("diff array is", diff)
    }
    for (let i = 1; i < diff.length; i++) {
        diff[i] += diff[i - 1]
    }
    return diff;
};
*/
let bookings = [[1, 2, 10], [2, 3, 20], [2, 5, 25]], n = 5;
// let bookings = [[1, 2, 10], [2, 2, 15]], n = 2;
// console.log(corpFlightBookings(bookings, n)) // [10, 55, 45, 25, 25]

//---------------------------------------------------------------

//! Two Pointer [Opposite Direction]

const nums = [1, 2, 4, 6, 8, 10];
const target = 10; // return index 

function twoSum(nums, target) {
  let left = 0
  let right = nums.length - 1;

  while (left < right) {

    let sum = nums[left] + nums[right];

    if (sum < target) {
      left++;
    }
    else if (sum > target) {
      right--;
    }
    else {
      return [left, right]
    }

  }

  return -1;
}
//* Notes [comparision btw same direction or opposite direction]
/* 
1. Opposite Direction  Example deta hoon
Suppose 1 4 7 10 13 16
Target = 17

Current
1 4 7 10 13 16
L            R
Sum = 17

Ab sum par depend karta to movement hi nahi hota. To asli reason sum nahi hai. Sum sirf signal hai.  Decision kis baat se ho raha hai?  👉 Sorted property.
Hum jaante hain:  Array sorted hai. Isliye hume pata hai:
Bigger sum chahiye → Left ko badhao.
Smaller sum chahiye → Right ko ghatao.

Agar array sorted hi na hota...  aisa hota  arr = [5 1 8 2 6 3]
Aur sum chhota hota. Kya confidently left++ kar sakte? ❌ Nahi.
Kyuki next value chhoti bhi ho sakti hai. Isliye interview answer hoga 🎯:

//* "Opposite Direction pointer movement depends on the sorted property of the data, which allows us to eliminate impossible search space." Ye sentence SDE interview level ka hai.

2. Same Direction 

//* "Same Direction pointer movement depends on maintaining a valid window according to the problem's condition."

Notice difference 🎯.
"Add old remove" kaam hai.
"Maintain valid window" objective hai.

*/

/* 
🎯 Sabse Important Visualization
//? Opposite Direction:- 
 Imagine tum ek library mein ho.  Tumhe dictionary mein ek word dhoondhna hai. Tum jaante ho dictionary alphabetical hai. Agar tum "Mango" dhoondh rahe ho aur page "Apple" par ho... Tum peeche jaoge? ❌ Nahi. Seedha aage jaoge. Kyun?

Sorted order tumhe direction de raha hai.Isliye search space eliminate hota hai.

//? Same Direction: -
Imagine tum bus mein travel kar rahe ho aur conductor ko hamesha current passengers ka count rakhna hai. Har stop par:
Kuch log utarte hain.
Kuch log chadhte hain.
Conductor poori bus dobara count karta hai? ❌ Nahi. 
Bas:
Current Count
- Utarne wale
+ Chadhne wale

Yehi Window Maintenance hai.

Window = "Current passengers."

*/

/* 
Ek Table Bana Lo (Ye Lifetime Yaad Rahega)
Opposite Direction                                      |	Same Direction
Sorted array is important                               |	Sorted hona zaroori nahi
Search space eliminate karta hai                        |	Window maintain karta hai
Sum/condition batata hai kis pointer ko move karna hai  |	Window valid/invalid batata hai kis pointer ko move karna hai
Pair problems	Subarray/Substring problems
Example: Two Sum II	Example: Longest Subarray

*/

//! Input Array Is Sorted (LeetCode 167)
var twoSum = function (nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let sum = nums[left] + nums[right];
    if (sum < target) left++;
    else if (sum > target) right--;
    else return [left + 1, right + 1];
  }
};

//! Leetcode 125. Valid Palindrom
var isPalindrome = function (s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
};

//! Sliding window Foundation [Two Pointer Same Direction] [fixed size]

//? Algorithm
/*
Step 1: - Build the first window of size k.
Step 2: - Calculate the sum of the first window.
Step 3: - Initialize maxSum = currentWindowSum
Step 4:- Slide the window one position at a time.
For every move:
• Add incoming element
• Remove outgoing element
• Update current window sum
• Compare with maxSum
Step 5: - Return maxSum
*/

function maxSumFixedWindow(arr, k) {
  let current_sum = 0, max_sum;
  // if array values is negative to max_sum compare 0 is always greater thats why we dont write - max_sum = 0;
  for (let i = 0; i < k; i++) {
    current_sum += arr[i];
  }
  max_sum = current_sum;
  let left = 0, right = k;
  // while (right < arr.length) {
  //   current_sum += arr[right];
  //   current_sum -= arr[left]
  //   if (current_sum > max_sum) max_sum = current_sum;
  //   left++; right++;
  // }
  for (let i = k; i < arr.length; i++) {
    current_sum += arr[i] - arr[i - k];
    max_sum = Math.max(current_sum, max_sum)
  }
  return max_sum;
}

//! Maximum Average Subarray I
function findMaxAverage(arr, k) {
  let sum = 0, max_sum;
  for (let i = 0; i < k; i++) {
    sum += arr[i]
  }
  max_sum = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    max_sum = Math.max(sum, max_sum);
  }
  return max_sum / k
}


// let arr1 = [1, 9, 3, 6, 8, 7, 5], k = 3;
// console.log("max average", findMaxAverage(arr1, k))


//---------------------------------------------------------------
//! Sliding window [Variable size]
//* In Fixed Size Sliding Window, the window moved because of size.
//* In Variable Size Sliding Window, the window moves because of rules.

//? Complextiy
/* 
In Fixed Sliding Window:
Left moves at most n times. Right moves at most n times. Therefore O(n).

In Variable size sliding window:
Right pointer  0 → 1 → 2 → 3 → 4 ... Kabhi peeche gaya? ❌ Nahi.
Maximum movement? n

Left pointer 0 → 1 → 2 → 3 → 4 ... Kabhi peeche gaya? ❌ Nahi.
Maximum movement? n

Total movements :- right [n] + left [n] = 2n

Constant ignore.
O(2n)
↓
O(n)
Left moves at most n times. Same Right moves at most n times. Therefore O(n)
 */

/* 
//* Algorithm Derivation
Step 1 : Pehle Goal ko Mathematical Language me likho
Step 2 : Window kis taraf move karegi?
Step 3 : Character add karne ke baad kya hoga?
Step 4 : Shrink kitna karna hai?
Step 5 : Valid hone ke baad kya karenge?
Step 6 : Maximum kab update hoga?

//* Algorithm
- Initialize two pointers (left, right) at 0.
- Maintain a data structure to keep track of characters inside the current window.[Set Data structure helps us to detect duplicate value because it is a collection of unique values]
- Expand the window by moving right.
- If the current window becomes invalid (duplicate character exists), keep moving left and remove characters until the window becomes valid again. [but condition is how much time we shrink if we have to shrink multiple time in any condition so we write while loop for removing character from left rather than if condition because it shrinks only onces]
- Whenever the window is valid, calculate its length.
- Update the maximum length found so far.
- Continue until right reaches the end of the string.
--------------------------------------------
for every right character

    agar duplicate nahi hai
        add karo

    agar duplicate hai
        jab tak duplicate rahe
            left hatao
            left aage badhao

    current character add karo

    answer update karo
--------------------------------------------
//* Pseudocode Derivation
Create an empty Set

left = 0
answer = 0

For every right character

    While current character already exists in Set

        Remove left character from Set

        Move left forward

    Add current character into Set

    Calculate current window length

    Update maximum answer

Return answer
*/
//! Leetcode 3. Longest Substring Without Repeating Characters
var lengthOfLongestSubstring = function (s) {
  let set = new Set(), left = 0, answer = 0, windowLength = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right])
    windowLength = right - left + 1;
    answer = Math.max(answer, windowLength);
  }
  return answer
}
// console.log(lengthOfLongestSubstring("pwwkew")) // 3
// console.log(lengthOfLongestSubstring("abcabcbb")) // 3
// console.log(lengthOfLongestSubstring("bbbbb")) // 1
//---------------------------------------------------------------

//! Category of Sliding window
/*
 //* Presene based so we use = Set
 Examples: - Longest Substring Without Repeating Characters, Contains Duplicate in Window

 //* Frequency based so we use = Map/Obect
 Examples: - At Most K Distinct Characters, Minimum Window Substring, Permutation in String ,Find All Anagrams
---------------------------------------------------------------
Ab Samjho: - Question: At Most K Distinct Characters
Example :- K = 2
Window
a a b b

Distinct? - a b
Answer - 2, Window valid hai.

Window
a a b c
Distinct? a b c
Answer - 3,  Window Invalid hai because value of k is 2 and 3 > 2 which is ❌

Ab Socho... Suppose
Window
a a b

Ab left se remove kiya. a b
Question: Abhi bhi 'a' window me hai? ✔️ Haan.

Agar hum Set use karein... Set {a,b} Aur humne set.delete('a') kar diya. Set ban gaya {b} ❌ Galat. Kyun?
Kyuki window me abhi bhi ek aur 'a' bacha hua hai. Set ko pata hi nahi ki 'a' kitni baar tha. Isi liye Set Fail Set sirf ye jaanta hai: Hai Ya Nahi hai Usse ye nahi pata:
Kitni baar hai To Hume Kya Chahiye? Hume aisa Data Structure chahiye jo bole:
a -> 2
b -> 3
c -> 1

Yaani... Frequency Aur uske liye hum use karte hain: Map Ya Object
*/
/* 
//* Fixed Sliding Window 
Question bolega: Exactly k
Examples:
-Size k
-Window of length k
-Every subarray of size k
-Every substring of length k

To dimaag bole:  k = Window Size

//* Variable Sliding Window
Question bolega:
-At most k replacements
-At most k distinct
-At most k zeros
-At most k operations
-At most k changes

To dimaag bole: k = Constraint, NOT window size.
Window jitni chahe badi ho sakti hai, bas constraint satisfy hona chahiye.
----------------------------------------------------
Window hai: A A B B C
Aur k = 2

window - AABBC and 
k = 2 
Window Length = 5 
Max Frequency = 2 [of A or B]
Required Replacement = length - maxFreq so 5-2 = 3 [either we can change A to B or vice versa] 
Window Valid ya Invalid? invalid because we check 3 character need replacement and exact value of k is 2 so , required replacement is 3 so it is > 2 so invalid window
 */
//! MIMP Line
/* 
//* Fixed Sliding Window: "Window ko k ke hisaab se control karte hain."
//* Variable Sliding Window: "Window ko validity/validation ke hisaab se control karte hain."
*/

//! Sample Code for Variable Sliding Window
function vSw(s, k) {
  let left = 0, right = 0, map = {}, maxFreq = 0, answer = 0;
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = (map[s[i]] || 0) + 1;
  }
  maxFreq = map[0];
  while (right < s.length) {

  }
  return answer;
}
vSw('ABAABCAAABDEDCCDB', 2);


//! Longest Repeating Character Replacement (LeetCode 424)
//* MIMP Line -  We intentionally allow maxFreq to become stale [purana value] because an exact value is not required to find the correct longest answer. because Hum kya chahte hain? Perfect maxFreq? ❌ Nahi. Balki, Longest possible window.
//? We intentionally allow maxFreq to become stale because our goal is to find the longest valid window, not to keep the exact frequency updated after every shrink. Recomputing the exact maximum after every left move would require scanning the whole map repeatedly, which adds unnecessary work.
// "Window invalid → right stop → left++"
// matlab hme - maxFreq is variable ko bar bar update nahi krna hai [in Deep - maxFreq ko sirf window expand (right++) hone par update karte hain. Window shrink (left++) hone par usse intentionally decrease nahi karte.], bs stringLength - maxFreq pata kr lena hai means kitne replaceble character chahiye and check krna hai ki jo result aaya minus krne par wo <= k hai ya nahi thats it
//? [Hum maxFreq ko left move par isliye decrease nahi karte kyunki exact maximum maintain karne ke liye hume baar-baar poora map scan karna padega. Hamara goal exact frequency maintain karna nahi, balki longest valid window efficiently find karna hai. maxFreq stale reh sakta hai aur right pointer expand hone par naturally update ho jata hai.]
/* 
requiredReplacements = windowLength - maxFreq

if (requiredReplacements <= k)
    window is valid
else
    shrink the window
*/
//! IMP RULE
/* 
Example: String
A A B A
    ^
  right
currentChar = s[right]
Yahan currentChar = 'B' Ab us character ki frequency map me hogi.
currentCharFrequency = map.get(currentChar)
Ya Object use kar rahe ho to currentCharFrequency = freq[currentChar]
Phir maxFreq = Math.max(maxFreq, currentCharFrequency)
Ye exact flow hai.
*/
/* 
1. Right move → Frequency increase.
2. maxFreq = max(maxFreq, currentCharFrequency) and currentCharFreq -> where right pointer is means string[right]
3. Check:
  windowLength - maxFreq <= k ?
4. If invalid → Left move (decrease frequency only).
   Do NOT decrease maxFreq.
   --------------------
Matlab order hona chahiye:
Right arrives
↓
Map update
↓
maxFreq update
↓
Replacement calculate
↓
Validity check

//* if window is invalid
Invalid
↓
Shrink
↓
Window valid ho jaye
↓
Tab hi answer update.
```
//! Algorithm
1. Add current character to map.
2. Update maxFreq.
3. Calculate required replacements.
4. If invalid:
      Shrink window until valid.
5. Update best answer.
6. Move right.

//! Psuedo Code
left = 0, right = 0, map = {}, maxFreq = 0, bestAnswer = 0;
while (right < s.length) {
  map[s[right]] = (map[s[right]] || 0) + 1;
  maxFreq = map[right];
  let requiredReplacements = s.length - maxFreq;
  while (requiredReplacements > k) {
    map.delete(map[left])
    left++;
  }
  bestAnswer = right - left + 1 // best answer is current window length
  right++;
  return bestAnswer;
}
*/

//! Leetcode 424. Longest Repeating Character Replacement 
var characterReplacement = function (s, k) {
  let left = 0,
    right = 0,
    map = {},
    maxFreq = 0,
    bestAnswer = 0;

  while (right < s.length) {
    map[s[right]] = (map[s[right]] || 0) + 1;

    maxFreq = Math.max(map[s[right]], maxFreq);

    while ((right - left + 1) - maxFreq > k) {
      map[s[left]]--;

      if (map[s[left]] === 0) delete map[s[left]];

      left++;
    }
    bestAnswer = Math.max(bestAnswer, right - left + 1); // best answer is current window length, and whatever is big we need that max val
    right++;
  }
  return bestAnswer;
}
console.log("sliding window", characterReplacement("ABAB", 2)) // 4
console.log("sliding window", characterReplacement("AABABBA", 1)) // 4
// toughest one
console.log("sliding window", characterReplacement("ABBB", 2)) // 4
