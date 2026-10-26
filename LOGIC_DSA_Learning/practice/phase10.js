//! Dynamic Programming
//? It is a Optimization technique, it is not an any algorithm or something related to any Dynamic word or any programming/coding. Richard Bellman just want to use fancy word for his research work, so they named it as Dynamic Programming.
//* Intially Dynamic Programming was used in WAR, yes in 1950s, when Richard Bellman was working for the US Air Force, he was trying to find a way to optimize the resources and time for the war, and Defence of Secretary of the USA, hated the word Research, so Richard used a word- "Programming" to make it sound like a fancy word, and he used the word "Dynamic" because he was working on a problem that was changing over time, so he named it as Dynamic Programming.

//? It is used in WAR, i said because, in early days of dp it was use to calculate the optimal strategies for ballistic missiles that was used in cold war, it is also use to control the population of rabbits 😁.

//* It is very big concept and very vast, but we are using small amount of it, and we are using it in our daily life, like in our phones, in our laptops, in our cars, in our homes, in our offices, in our schools, in our colleges, in our universities, in our hospitals, in our banks, in our stock markets, in our social media platforms, in our e-commerce platforms, in our gaming platforms, in our entertainment platforms, in our travel platforms, in our food delivery platforms, in our health and fitness platforms, in our education platforms, in our communication platforms, and many more.

//? Now come to the Main point - it is a Optimization technique, like when we are solving any problem and its time complexity is very high, and it takes a lot of time to solve, then we can use Dynamic Programming to optimize the solution and reduce the time complexity, and make it more efficient.
// and dont forgot - any problem can be solved using Dynamic Programming , can solved without using DP ok but if it takes lot of time to solve and it is a very hectic process, then we can use Dynamic Programming to optimize the solution and reduce the time complexity, and make it more efficient.

//* DP - can be called "Intelligently Lazy" means like we are solving a problem using brute force approach, but we are doing it in a very intelligent way, we are not solving the same sub-problem again and again, we are storing the result of the sub-problem in a table or array or object, and when we need the result of that sub-problem again, we are just returning the result from the table or array or object, instead of solving it again and again.
//? Simply means - why do the hardwork again, when we can solve onces and reuse it again and again... so dont repeat  yourself.
// that's it. this is the main concept of Dynamic Programming.

//! Practical use cases of Dynamic Programming
//? 1. Google Maps - when we are searching for the shortest path from one place to another, it uses Dynamic Programming to find the optimal path and reduce the time complexity.
//? 2. DNA-Matching - there are some alignment algorithms that are used to find the similarity between two DNA sequences, and they use Dynamic Programming to find the optimal alignment and reduce the time complexity.
//? 3. Stock Market - there are some algorithms that are used to find the optimal buying and selling points of stocks, and they use Dynamic Programming to find the optimal solution and reduce the time complexity.


//! Now Actual Defination of Dynamic Programming
//* DP is an optimization technique used to solve problems that can be broken down into "OVERLAPPING SUB-PROBLEMS" that have an "OPTIMAL SUBSTRUCTURE".

//? "OVERLAPPING SUB-PROBLEMS" - while solving a Big Problem, we reapeatedly solve the same sub-problems again and again.

//? "OPTIMAL SUBSTRUCTURE" - The solution to the big problem can be constructed from the solution of smaller sub-problems.

//* "DP is about storing & Reusing the results of smaller sub-problems, instead of recalculating "

//! DP - we can say - "Optimized Recursion"
// all the problems that can be solved using DP, can also be solved using Recursion, but the time complexity will be reduced and the solution will be more efficient for that recursive problem.

//* If u r good in Recursion, then you can easily learn DP, because DP is just an optimized version of Recursion.

//! What kind of problems can be solved using Dynamic Programming
//* Answer is - Optimization problems,
// like - we have to find the optimal solution for a problem, like - we have to find the minimum or maximum value of a problem, like - we have to find the shortest path, longest path, minimum cost, maximum profit, etc.
//* this above paragraph is "BIG HINT"

// optimisation problem can be solved using DP and Greedy approach.

//! Difference between DP and Greedy approach
//* DP - agar kahin sub problems repeat ho rahe hai, aur unka solution ek hi baar calculate karke store karna hai, aur fir usko reuse karna hai, to DP use karenge, means [explore all possibilities , store the result of sub-problems, and reuse them to find the optimal solution], to DP use karenge. [If there is overlapping sub-problems, its is 100% DP ⭐]

//* Greedy - ham bas local optimal solution nikalenge, aur fir usko use karenge, aur hope karege ki ye global optimal solution ho, to Greedy approach use karenge. pr local optimal solution hamesh global optimal solution ho, ye zaruri nahi hai, isliye Greedy approach hamesh optimal solution nahi deta hai, but DP hamesh optimal solution deta hai. [here we dont explore all possibilities]

//! Sub-Types or Categories of Dynamic Programming

//? 1. 1D DP - like Fibonacci, Climbing Stairs, etc.
//? 2. 2D DP - like Grid, 0/1Knapsack etc.
//? 3. Subsequence DP - like "Longest Common Subsequence"-[⭐Famous], Longest Increasing Subsequence,subset sum etc.
//? 4. DP with String - like Palindrome, Partition, Edit Distance, etc.
//? 5. DP with Trees/Graphs - like Counting Paths, DP with DFS.
//? 6. DP with Bitmasking - like "Travelling Salesman Problem"-[⭐Famous], subset,  etc.
//* 7. Famous Problem - "Matrix Chain Multiplication", "Egg Dropping Problem", "Rod Cutting Problem", "Coin Change Problem", "Minimum Cost Path", "Longest Palindromic Subsequence", "Longest Common Subsequence", "Longest Increasing Subsequence", "Subset Sum Problem", "0/1 Knapsack Problem", "Fractional Knapsack Problem", "Travelling Salesman Problem", "Word Break Problem", "Palindrome Partitioning Problem", "Edit Distance Problem", etc.
//! [If any new question will come, that will a variation of these above problems, so if we know these above problems, then we can easily solve any new problem that will come in the future.]

//!  IMP LINE - "How" we store a result, "When" we have to use it, "Where" we store it. [only these 3 things change the whole game of DP, if we do it in a wrong way, then we will not get the optimal solution, and we will not get the correct answer, so these 3 things are very important in DP.] 

//*==========================================
//? Questions
//*==========================================

//! Fibonacci Number - [⭐Famous]
//? using Recursion
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// for this recursion if we check T&S Complexity it is O(2^n), means exponential time complexity, and it will take a lot of time to calculate for big numbers like 50, 100, etc.

// If we check fibonacci for big number like 50,or 100 or etc, its recursion tree become huge and it will take a lot of time to calculate, so we can use Dynamic Programming to optimize the solution and reduce the time complexity. 

// For example - if we check fibonacci for 6, we found that we are calculating fib(4), fib(3), fib(2), fib(1), fib(0) multiple times, so we can store the result of these sub-problems in any data structure like an array or a map or else, and then reuse them instead of calculating them again and again, this is the main concept of Dynamic Programming, and this is how we can optimize the solution and reduce the time complexity from O(2^n) to O(n).
//? But flaw is - it reduces the Time complexity but it increases the Space Complexity, because we are storing the result of sub-problems in a data structure, so it takes extra space.

//* fib(100) would take longer than universe's age to calculate using recursion, but using DP it will take less than a second to calculate.

//! Two ways to implement DP - 
//* 1. Bottom-Up Approach (Tabulation)
//* 2. Top-Down Approach (Memoization) 

//? 1. Bottom-Up Approach - It is also called Tabulation, when we solve the problem it uses "Iteration"

//? 2. Top-Down Approach - It is also called Memoization, when we solve the problem it uses "Recursion". Memoization means we are storing these result or values somewhere, [we can use array or map or object to store these values, because fetching data from a data structure is faster than recalculating it because it O(1)].

//! Advantage and Disadvantage of both approaches
//* 1. Bottom-Up Approach - It is more efficient than Top-Down Approach, because it uses Iteration, and it does not use extra space for recursion stack, but it takes more time to write the code, and it is not easy to understand for beginners.

//* 2. Top-Down Approach - It is less efficient than Bottom-Up Approach, because it uses Recursion, and it uses extra space for recursion stack, but it takes less time to write the code, and it is easy to understand for beginners.

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