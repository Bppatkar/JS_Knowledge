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
findMaxConsecutiveOnes(nums = [1, 1, 0, 1, 1, 1])

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

//! Two Pointer

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
