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
    if (idx === 0) return cost[0];
    if (idx === 1) return cost[1];
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

"Maine ek bat notice ki hai ki agar ham top-down approach use krte hai to ham ek data structure (array ya map) use krte hai for storing some data ok, and in bottom-up approach hame ek table means [] array joki hame ---> aise right side dekhne wale ki thinking sochni h mind me."