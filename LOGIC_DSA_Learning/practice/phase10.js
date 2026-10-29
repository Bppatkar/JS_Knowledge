//! Dynamic Programming
//? It is a Optimization technique, it is not an any algorithm or something related to any Dynamic word or any programming/coding. Richard Bellman just want to use fancy word for his research work, so they named it as Dynamic Programming.

//! Two ways to implement DP - 
//* 1. Bottom-Up Approach (Tabulation)
//* 2. Top-Down Approach (Memoization) 

//? 1. Bottom-Up Approach - It is also called Tabulation, when we solve the problem it uses "Iteration"

//? 2. Top-Down Approach - It is also called Memoization, when we solve the problem it uses "Recursion". Memoization means we are storing these result or values somewhere, [we can use array or map or object to store these values, because fetching data from a data structure is faster than recalculating it because it O(1)].

//! Advantage and Disadvantage of both approaches
/* 
         Top-Down Approach (Memoization)          |          Bottom-Up Approach (Tabulation)
      1. use Recursion                            |      1. use Iteration
      2. go from n to 0 (top to bottom)           |      2. go from 0 to n (bottom to top)
      3. also called Memoization                  |      3. also called Tabulation
    4. Easier to think [Recursion Tree Buidling]  |     4. Difficilt to think 
                                                            [Iteration  Solution takes more time to think]

    5. Recursion is expensive                     |    5. Iteration is less expensive
    [in callstack, it takes more space and time]

-------------------------------------------------------------------------------------
  🔑 -   If u consider Easuer to think, Top-Down wins, But,
  🔑 -   If u consider Recursion is Expensive, Bottom-Up wins.

(Both have its pros and cons, but both are used in different scenarios, so we have to choose the right approach according to the problem statement and constraints.)
{in some questions it is very intutive to use Recursion, or in some questions it is very intutive to use Iteration, we solved more and more questions, so we will automatically realize that which approach is better for which type of question, and we will choose the right approach according to the problem statement and constraints.}
///! "GOLDEN RULE" - If u r trying to solve any question, "THINK ABOUT USING RECURSION FIRST/ Decision Tree", then u code it in whatever way u want, in Recursive code or in Iterative code.
*/


//! Leetcode - 509. Fibonacci Number
// using Recursion
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

//* Top Down Approach - [Memoization] {this approach uses Recursion}

let store = {};
var fib = function (n) {
  if (n <= 1) return n;
  if (!store[n]) store[n] = fib(n - 1) + fib(n - 2);
  return store[n];
};

//* Bottom-Up Approach - [Tabulation] {this approach uses Iteration}

var fib = function (n) {
  // let a = -1, b = 1, ans;
  // for (let i = -1; i < n; i++) {
  //   ans = a + b;
  //   a = b;
  //   b = ans;
  // }
  // if (!store[n]) store[n] = ans;

  // return store[n];

  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

//! Leetcode - 70. Climbing Stairs
// top-bottom approach

let storeStep = {};
var climbStairs = function (n) {
  if (n === 1) return n;
  if (n === 2) return n;
  if (!storeStep[n]) storeStep[n] = climbStairs(n - 1) + climbStairs(n - 2)
  return storeStep[n];
}

// bottom-up approach
// let storeStepp = [1, 1];
// var climbStairs = function (n) {
//   for (let i = 2; i <= n; i++) {
//     storeStep[i] = storeStep[i - 1] + storeStep[i - 2];
//   }
//   return storeStep[n];
// }

var climbStairs = function (n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let ans = a + b;
    a = b;
    b = ans;
  }
  return b;
}

//! Leetcode - 746. Min Cost Climbing Stairs
// top down approach [Memoization] (Recursion)
var minCostClimbingStairs = function (cost) {
  let n = cost.length;
  let dpStore = [];

  //* reason "pass index not whole array" nahi hai. Index to outer function me bhi pass kar sakte the (minCostClimbingStairs(cost, idx)) — but then dpStore ko function ke bahar global rakhna padta, jo multiple test cases me corrupt ho jata. 

  // Asli reason: inner function cost aur dpStore ko closure me le leta hai, alag se pass nahi karna padta. to aise likhenge:

  "Inner recursive function banaya taaki cost aur dpStore closure me accessible hon — alag se pass karne ki zaroorat nahi, aur dpStore global pollution se bacha."

  function minCost(idx) {
    if (idx <= 1) return cost[idx];

    // 0 is falsy and when idx is 0, and we do !dpStore[idx], means !0 which is true, so we will recalculate the value for idx 0, which is wrong. So we should check if dpStore[idx] is undefined or not.
    if (dpStore[idx] === undefined) {
      dpStore[idx] = cost[idx] + Math.min(minCost(idx - 1), minCost(idx - 2));
    }
    return dpStore[idx];
  }
  return Math.min(minCost(n - 1), minCost(n - 2))
};


// bottom up - [Tabulation]{Iterative}
function minCostClimbingStairs(cost) {
  let n = cost.length;

  // edgeCase
  if (n === 1) return cost[0];

  // finding starting values
  let prev1Val = cost[0];
  let prev2Val = cost[1];


  for (let i = 2; i < n; i++) {
    let curr = cost[i] + Math.min(prev1Val, prev2Val);
    prev1Val = prev2Val;
    prev2Val = curr;
  }
  // top floor = min of last two
  return Math.min(prev2Val, prev1Val);
}
function minCostClimbingStairs(cost) {
  let n = cost.length;

  // min cost to reach ith place
  let dp = [0, 0];

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
}

"Maine ek bat notice ki hai ki agar ham top-down approach {Recursion} use krte hai to ham ek data structure (array ya map) use krte hai jo ham globally bana dete hai aur aisa krna -Mandatory- hai, for storing some data ok, and,"

"in bottom-up approach {Itrative} mein hame array use krna optional hai agar recurrence last 1-2 states pe depend kare toh variables se space bacha lo, warna table chahiye, aur table ki thinking hame ek table means [] array joki hame ---> aise right side dekhne wale ki thinking sochni h mind me."

//! Leetcode - 198. House Robber
// bottom-up approach [Tabulation]{Iterative}
var rob = function (nums) {
  // edge cases
  if (nums.length === 1) return nums[0];

  let prev1Val = 0, prev2Val = 0

  for (let i = 0; i < nums.length; i++) {
    let ans = Math.max(nums[i] + prev1Val, prev2Val);
    prev1Val = prev2Val;
    prev2Val = ans;
  }
  return prev2Val;
} // TC - O(n), SC - O(1) for 2 variables

var rob = function (nums) {
  let n = nums.length;
  if (n === 1) return nums[0];

  let dp = [nums[0], Math.max(nums[0], nums[1])];

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }
  return dp[n - 1]; //indices 0 se start h to hame last value chahiye isiliye n-1, agar ham maxVal(n) karege to nums[n] = undefined → NaN.
}// TC - O(n), SC - O(n) for dp array

// top-bottom approach [Memoization] (Recursion)
var rob = function (nums) {
  let n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  let dpStore = [];

  function maxVal(i) {
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);

    if (dpStore[i] === undefined) {
      dpStore[i] = Math.max(nums[i] + maxVal(i - 2), maxVal(i - 1));
    }
    return dpStore[i];
  }
  return maxVal(n - 1); //indices 0 se start h to hame last value chahiye isiliye n-1, agar ham maxVal(n) karege to nums[n] = undefined → NaN.
} // TC - O(n), SC - O(n) for dpStore array

// console.log(rob([2, 7, 9, 3, 1])); // 12
// console.log(rob([1, 2, 3, 1])); // 4

//! Leetcode - 213. House Robber II
// Approach [bottom-up] - [Tabulation]{Iterative}
var rob = function (nums) {
  let n = nums.length;

  if (n === 1) return nums[0];

  let case1 = maxVal(0, n - 2); // exclude last val 
  let case2 = maxVal(1, n - 1); // exclude first val 

  function maxVal(start, end) {
    // handling single elem
    if (start === end) return nums[start];


    //prev2 (do peeche) aur prev1 (ek peeche) 
    let prev2 = nums[start]; //dp[i-2];
    let prev1 = Math.max(nums[start], nums[start + 1]); //dp[i-1];

    for (let i = start + 2; i <= end; i++) {
      let curr = Math.max(nums[i] + prev2, prev1);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }

  return Math.max(case1, case2);
}

// Approach [top-down] - [Memoization] (Recursion)
var rob = function (nums) {
  let n = nums.length;

  if (n === 0) return 0;
  if (n === 1) return nums[0];

  function maxVal(start, end, dpStore = []) {
    if (start > end) return 0;
    if (start === end) return nums[start];

    if (dpStore[end] === undefined) {
      dpStore[end] = Math.max(
        nums[end] + maxVal(start, end - 2, dpStore),
        maxVal(start, end - 1, dpStore)
      );
    }
    return dpStore[end];
  }

  return Math.max(
    maxVal(0, n - 2), // exclude last val
    maxVal(1, n - 1)  // exclude first val
  );
};

//! Leetcode - 322. Coin Change [Interview Famous ⭐]
/* 
coins = [1, 3, 4], amount = 6 → ?
Greedy soch: sabse bada coin pehle → 4 + 1 + 1 = 6 → 3 coins

Optimal: 3 + 3 = 6 → 2 coins ✓

//* Greedy fail ho gaya! Sabse bada coin pehle lena hamesha optimal nahi hota. Ye important observation hai.
*/
// bottom-up approach [Tabulation]{Iterative}

var coinChange = function (coins, amount) {
  let minCoinCountArr = new Array(amount + 1).fill(Infinity);

  // handling edge case
  minCoinCountArr[0] = 0;


  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      // agar coint amount s chota ya equal h to
      if (coins[j] <= i) {
        //? +1 = "ek coin use kiya" ka count.
        minCoinCountArr[i] = Math.min(minCoinCountArr[i], 1 + minCoinCountArr[i - coins[j]]);
      }
    }
  }
  return minCoinCountArr[amount] === Infinity ? -1 : minCoinCountArr[amount];
}

// top-down approach [Memoization] (Recursion)
var coinChange = function (coins, amount) {
  let dpStore = []

  function helper(amount) {
    if (amount === 0) return 0;
    if (amount < 0) return Infinity;
    if (dpStore[amount] !== undefined) return dpStore[amount];

    let ans = Infinity;

    for (let i = 0; i < coins.length; i++) {
      ans = Math.min(ans, 1 + helper(amount - coins[i]));
    }
    dpStore[amount] = ans;
    return ans;
  }
  let result = helper(amount);
  return result === Infinity ? -1 : result;
}
var coinChange = function (coins, amount) {
  let dpStore = [];
  let n = coins.length;

  let fn = (remainAmt) => {
    if (remainAmt === 0) return 0;
    if (remainAmt < 0) return -1;
    if (dpStore[remainAmt] !== undefined) return dpStore[remainAmt];

    let minCoin = Infinity;

    for (let i = 0; i < n; i++) {

      let res = fn(remainAmt - coins[i]);

      if (res != -1) {
        minCoin = Math.min(minCoin, 1 + res);
      }

    }
    return dpStore[remainAmt] = minCoin === Infinity ? -1 : minCoin;
  }
  return fn(amount);
};
