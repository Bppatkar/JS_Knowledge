# 🌈 DYNAMIC PROGRAMMING (DP) — COMPLETE NOTES 🌈

# <span style="color:#FF6347">📚 PART 1 — DP FUNDAMENTALS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

## <span style="color:#1E90FF">🌳 1. DYNAMIC PROGRAMMING KYA HAI?</span>

Dynamic Programming (DP) koi standalone algorithm nahi, balki ek **optimization technique / problem-solving approach** hai. Iska purpose brute-force ya recursion me hone wale repeated work ko remove karke solution ko efficient banana hai.

> **DP = problem ko smaller sub-problems me todna, unke results store karna, aur zaroorat par reuse karna.**

Isi liye DP ko **“intelligently lazy”** kaha ja sakta hai: jo sub-problem ek baar solve ho chuka hai, us par dobara hard work nahi karte.

DP tab useful hota hai jab same sub-problems repeat hon, answer minimum/maximum/shortest/longest/cost/profit/ways ho, aur badi problem ka answer chhoti problems ke answers se ban sakta ho.

DP ke liye generally dono conditions chahiye:

1. **Overlapping Sub-problems** — same chhoti problem repeatedly solve hoti hai.
2. **Optimal Substructure** — badi problem ka optimal answer chhoti sub-problems ke optimal answers se construct hota hai.

> **One-line definition:** DP is an optimization technique for problems with overlapping sub-problems and optimal substructure, where computed results are stored and reused.

</div>

---

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

## <span style="color:#FFD700">📜 2. NAAM AUR REAL-WORLD CONTEXT</span>

Richard Bellman ne 1950s me U.S. Air Force ke saath changing situations me resources aur time optimize karne ke liye is approach par kaam kiya. “Research” word ko lekar resistance hone ki wajah se unhone apne work ko **Programming** kaha, aur changing/step-by-step decisions ke context me **Dynamic** word use kiya.

Early applications me military strategy aur ballistic-missile planning jaise optimization problems shamil the. Aaj isi thinking ka use maps ke optimal routes, DNA sequence alignment, stock buy/sell analysis, scheduling, finance, routing aur resource allocation me hota hai.

</div>

---

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

## <span style="color:#9370DB">📐 3. RECURSION SE DP TAK</span>

DP ko **optimized recursion** samajhna easiest hai. Pehle choices ko recursion se model karo, phir repeated states ko store karke optimize karo.

### LeetCode 509 — Fibonacci Number

#### Step 1: Brute-force recursion

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

Fibonacci me `fib(4)`, `fib(3)`, `fib(2)` baar-baar calculate hote hain. Isliye time complexity approximately `O(2^n)` ho jati hai. `n = 50` ya `n = 100` jaise inputs par recursion tree bahut bada ho jata hai.

### Step 2: Memoization — Top-Down DP

```javascript
let store = {};
var fib = function (n) {
  if (n <= 1) return n;
  if (!store[n]) store[n] = fib(n - 1) + fib(n - 2);
  return store[n];
};
```

Cache ki wajah se Fibonacci ka time `O(2^n)` se `O(n)` ho jata hai. Trade-off: cache aur recursion stack ki wajah se extra space lagti hai. Recursion me `fib(4)`, `fib(3)`, `fib(2)`, `fib(1)` aur `fib(0)` jaise results ko repeat hone se bachaya jata hai.

### Step 3: Tabulation — Bottom-Up DP

```javascript
var fib = function (n) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
};
```

Base cases se table ko chhote states se bade states ki taraf fill karte hain; recursion stack nahi hota.

> **Fibonacci ka main lesson:** Time complexity reduce karne ke liye sub-problem ke answers ko array, object ya `Map` me store karke reuse karo. Isse extra space lag sakti hai, lekin repeated calculation remove hoti hai.

> **Learning path:** **Recursion → Memoization → Tabulation**

### Memoization vs Tabulation

| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|:---|:---|:---|
| Approach | Recursion + cache | Iteration + table |
| Direction | Bade state se chhote states | Chhote states se bade states |
| States | Sirf needed states | Usually saare states |
| Stack | Recursion stack lagta hai | Recursion stack nahi |
| Use when | Sparse/reachable states useful hon | Order clear ho aur all states required hon |

### 🔑 Dono approaches ke advantages aur disadvantages

| Top-Down (Memoization) | Bottom-Up (Tabulation) |
|:---|:---|
| Recursion use karta hai | Iteration use karta hai |
| Bade state se chhote states ki taraf jaata hai | Chhote states se bade states ki taraf jaata hai |
| Recursion tree ki wajah se samajhna easier hota hai | Iterative solution sochna comparatively difficult ho sakta hai |
| Recursion call stack extra time aur space leta hai | Recursion stack nahi hota; generally less overhead |
| Sirf required states calculate kar sakta hai | Usually saare states calculate karta hai |

> **Approach selection:** Agar recursion/decision tree naturally samajh aa raha hai, Top-Down se start karo. Agar recursion expensive ho ya dependency order clear ho, Bottom-Up choose karo. Problem aur constraints ke hisaab se approach select karo.

> **Golden Rule:** Kisi bhi DP question ko solve karte waqt pehle **recursion/decision tree** ke baare me socho. Uske baad solution ko recursive memoization ya iterative tabulation—jis form me suitable ho—convert karo.

</div>

---

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

## <span style="color:#32CD32">⚡ 4. DP VS GREEDY</span>

Optimization problems ko DP ya Greedy dono se approach kiya ja sakta hai, lekin decision process alag hai.

| Approach | Core idea | Correctness / behavior |
|:---|:---|:---|
| **Recursion / brute force** | Saari possible choices explore karo | Correct ho sakta hai, par repeated work ki wajah se slow |
| **Greedy** | Har step par current/local best choice lo | Fast ho sakta hai; global optimum ke liye proof chahiye |
| **DP** | Relevant choices explore karo, states store/reuse karo | Valid recurrence ke saath optimal answer de sakta hai |

- **DP:** Saari relevant possibilities explore karo, result store karo aur reuse karo.
- **Greedy:** Current best choice lo; baaki possibilities explore nahi karta.

### Ek Line Me 🗝

> **Recursion** — "saari possibilities explore karo"  
> **Greedy** — "abhi jo best, wahi karo"  
> **DP** — "saari possibilities explore karo, par yaad rakho"

### 🗝 Golden Key — DP kab aur Greedy kab?

| Situation | Approach | Kyun? |
|:---|:---|:---|
| Same sub-problems baar-baar repeat ho rahe hain | **DP** | Ek baar solve karke result store aur reuse kar sakte ho |
| Har step par local best choice lene se global best guaranteed hai | **Greedy** | Saari possibilities explore karne ki zaroorat nahi |
| Local best choice ka global answer par proof nahi hai | **DP** | Greedy galat answer de sakta hai; DP alternatives compare karta hai |
| Minimum/maximum answer chahiye aur choices overlap karti hain | **DP** | State aur recurrence ke through optimal answer milta hai |
| Current decision future decisions ko affect nahi karti, ya greedy-choice property proven hai | **Greedy** | Simple aur generally faster solution milta hai |

> **Quick test:** Agar tum prove kar sakte ho ki **“abhi ka best choice hamesha final best answer ka part hogi”**, to Greedy try karo. Agar same state repeat ho raha hai aur multiple choices compare karni hain, to DP consider karo.

> Sirf “optimization problem” dekhkar DP choose mat karo. State, transition aur correctness verify karo. DP automatically har problem ka optimal answer nahi deta.

</div>

---

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

## <span style="color:#FF4500">🔑 5. DP SOLVE KARNE KA UNIVERSAL FRAMEWORK</span>

Code se pehle ye 5 cheezein define karo:

1. **State:** `dp[i]` ya `dp[i][j]` ka exact meaning kya hai?
2. **Transition / recurrence:** Current state chhote states se kaise banega?
3. **Base case:** Sabse chhoti valid problem ka answer kya hai?
4. **Computation order:** States kis order me calculate honge?
5. **Final answer:** Answer `dp[n]`, `dp[n][m]`, `max(dp)` ya kisi aur state me hai?

> **Phase 10 ki important line:** **How** result store karna hai, **When** reuse karna hai, aur **Where** store karna hai—DP ka actual game in teen decisions par depend karta hai.

</div>

---

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

## <span style="color:#FF69B4">📊 6. DP PATTERNS AUR FAMOUS PROBLEM FAMILIES</span>

| Pattern | Typical state | Examples |
|:---|:---|:---|
| **1D Linear** | `dp[i]` | Fibonacci, Climbing Stairs, House Robber |
| **2D / Grid** | `dp[i][j]` | Unique Paths, Minimum Path Sum |
| **Two Strings** | `dp[i][j]` | LCS, Edit Distance |
| **Subsequence** | `dp[i]` / `dp[i][j]` | LIS, Subset Sum |
| **Knapsack** | `dp[i][w]` | 0/1 Knapsack, Coin Change |
| **String / Partition** | `dp[i]` / `dp[i][j]` | Word Break, Palindrome Partitioning |
| **Interval** | `dp[i][j]` | Matrix Chain, Burst Balloons |
| **Tree / Graph** | `dfs(node)` + states | Tree DP, Counting Paths |
| **Bitmask** | `dp[mask]` / `dp[mask][i]` | Travelling Salesman Problem |

Famous families me Matrix Chain Multiplication, Egg Dropping, Rod Cutting, Coin Change, Minimum Cost Path, Longest Palindromic Subsequence, LCS, LIS, Subset Sum, 0/1 Knapsack, Fractional Knapsack, TSP, Word Break, Palindrome Partitioning aur Edit Distance shamil hain. Naye questions aksar inhi patterns ke variations hote hain.

> **Pattern ratna nahi hai:** pehle state, recurrence, base case, order aur final answer identify karo.

</div>

---
# <span style="color:#FF6347">📚 PART 2 — 1D DP (Linear)</span>

## <span style="color:#1E90FF">🎯 PATTERN 1 — CLIMBING STAIRS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** `n` steps, har baar 1 ya 2 steps. Kitne tareeke?

**State:** `dp[i]` = ways to reach step `i`

**Recurrence:** `dp[i] = dp[i-1] + dp[i-2]`

**Base:** `dp[0] = 1`, `dp[1] = 1`

```javascript
function climbStairs(n) {
  if (n <= 1) return 1;
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```

**Visual (n=5):**
```text
dp[0] = 1 (base)
dp[1] = 1 (base)
dp[2] = 2  ? 1+1, 2
dp[3] = 3  ? 1+1+1, 1+2, 2+1
dp[4] = 5
dp[5] = 8 ?
```

**Time:** `O(n)` · **Space:** `O(1)`

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 2 — HOUSE ROBBER</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Ghar me chori — adjacent ghar me nahi. Max money?

**State:** `dp[i]` = max money till house `i`

**Recurrence:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

**Base:** `dp[0] = nums[0]`, `dp[1] = max(nums[0], nums[1])`

```javascript
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    let curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
```

**Visual:**
```text
nums = [2, 7, 9, 3, 1]

dp[0] = 2
dp[1] = max(2, 7) = 7
dp[2] = max(7, 2+9=11) = 11
dp[3] = max(11, 7+3=10) = 11
dp[4] = max(11, 11+1=12) = 12 ?
```

**Time:** `O(n)` · **Space:** `O(1)`

### 🔹 House Robber II (Circular)

Array circular hai. Do cases:

- Ghar 0 choro, ghar 1..n-1 me rob karo
- Ghar n-1 choro, ghar 0..n-2 me rob karo

Dono me se max lo.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 3 — LONGEST INCREASING SUBSEQUENCE (LIS)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Longest increasing subsequence ki length.

**State:** `dp[i]` = LIS length ending at index `i`

**Recurrence:** `dp[i] = max(dp[j] + 1) for j < i and nums[j] < nums[i]`

**Base:** `dp[i] = 1` for all i

```javascript
function lengthOfLIS(nums) {
  let n = nums.length;
  let dp = new Array(n).fill(1);
  let max = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}
```

**Visual:**
```text
nums = [10, 9, 2, 5, 3, 7, 101, 18]

dp[0] = 1  (10)
dp[1] = 1  (9)
dp[2] = 1  (2)
dp[3] = 2  (2, 5)
dp[4] = 2  (2, 3)
dp[5] = 3  (2, 3, 7)
dp[6] = 4  (2, 3, 7, 101)
dp[7] = 4  (2, 3, 7, 18)

Answer: 4
```

**Time:** `O(n²)` · **Space:** `O(n)`

**Optimized (Binary Search):** `O(n log n)`

```javascript
function lengthOfLIS(nums) {
  let tails = [];
  for (let x of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }
    tails[left] = x;
  }
  return tails.length;
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 4 — WORD BREAK</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** String ko dictionary words me tod sakte ho?

**State:** `dp[i]` = can break string[0..i-1]

**Recurrence:** `dp[i] = true` if `dp[j] = true` AND `s[j..i-1]` is in dict

**Base:** `dp[0] = true`

```javascript
function wordBreak(s, wordDict) {
  let set = new Set(wordDict);
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
```

**Visual:**
```text
s = "leetcode"
dict = ["leet", "code"]

dp[0] = true
dp[4] = dp[0] && "leet" in dict = true
dp[8] = dp[4] && "code" in dict = true ?
```

**Time:** `O(n² × m)` (m = avg word length) · **Space:** `O(n)`

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 5 — COIN CHANGE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Minimum coins for amount.

**State:** `dp[i]` = min coins to make amount `i`

**Recurrence:** `dp[i] = min(dp[i - coin] + 1) for each coin`

**Base:** `dp[0] = 0`, baaki `Infinity`

```javascript
function coinChange(coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

**Visual:**
```text
coins = [1, 2, 5], amount = 11

dp[0] = 0
dp[1] = 1
dp[2] = 1
dp[3] = 2 (1+2)
...
dp[11] = 3 (5+5+1) ?
```

**Time:** `O(amount × coins.length)` · **Space:** `O(amount)`

### 🔹 Coin Change II — Number of Ways

```javascript
function change(amount, coins) {
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {              // Outer: coins
    for (let i = coin; i <= amount; i++) {  // Inner: amount
      dp[i] += dp[i - coin];
    }
  }
  return dp[amount];
}
```

**🔹 Loop Order Matter Karta Hai:**

- **Outer coins, Inner amount** ? Combinations
- **Outer amount, Inner coins** ? Permutations

</div>

---

---

# <span style="color:#FF6347">📚 PART 3 → 2D DP (Grids)</span>

## <span style="color:#1E90FF">🎯 PATTERN 6 — UNIQUE PATHS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** `m × n` grid, top-left se bottom-right. Sirf right/down ja sakte ho. Kitne paths?

**State:** `dp[i][j]` = paths to reach `(i, j)`

**Recurrence:** `dp[i][j] = dp[i-1][j] + dp[i][j-1]`

**Base:** `dp[0][j] = 1`, `dp[i][0] = 1`

```javascript
function uniquePaths(m, n) {
  let dp = Array.from({ length: m }, () => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}
```

**Visual (3×3):**
```text
1 1 1
1 2 3
1 3 6

Answer: 6
```

**Time:** `O(m × n)` · **Space:** `O(m × n)` ? `O(n)` optimized

### 🔹 With Obstacles (LC 63)

```javascript
if (grid[i][j] === 1) dp[i][j] = 0;
else dp[i][j] = dp[i-1][j] + dp[i][j-1];
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 7 — MIN PATH SUM</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Grid me min cost path (right/down).

**State:** `dp[i][j]` = min cost to reach `(i, j)`

**Recurrence:** `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`

```javascript
function minPathSum(grid) {
  let m = grid.length, n = grid[0].length;
  let dp = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = grid[0][0];

  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m - 1][n - 1];
}
```

</div>

---

---

# <span style="color:#FF6347">📚 PART 4 — TWO STRINGS DP</span>

## <span style="color:#1E90FF">🎯 PATTERN 8 — LONGEST COMMON SUBSEQUENCE (LCS)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Do strings ka longest common subsequence.

**State:** `dp[i][j]` = LCS of `s1[0..i-1]` and `s2[0..j-1]`

**Recurrence:**

```
if s1[i-1] === s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

**Base:** `dp[0][*] = 0`, `dp[*][0] = 0`

```javascript
function longestCommonSubsequence(text1, text2) {
  let m = text1.length, n = text2.length;
  let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}
```

**Visual:**
```text
text1 = "abcde", text2 = "ace"

     ""  a  c  e
""  [ 0  0  0  0 ]
a   [ 0  1  1  1 ]
b   [ 0  1  1  1 ]
c   [ 0  1  2  2 ]
d   [ 0  1  2  2 ]
e   [ 0  1  2  3 ]

Answer: 3 ("ace")
```

**Time:** `O(m × n)` · **Space:** `O(m × n)`

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 9 — EDIT DISTANCE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Minimum operations (insert/delete/replace) to convert `word1` to `word2`.

**State:** `dp[i][j]` = min ops to convert `word1[0..i-1]` to `word2[0..j-1]`

**Recurrence:**

```
if word1[i-1] === word2[j-1]: dp[i][j] = dp[i-1][j-1]
else: dp[i][j] = 1 + min(
        dp[i-1][j],      // delete
        dp[i][j-1],      // insert
        dp[i-1][j-1]     // replace
      )
```

**Base:** `dp[i][0] = i`, `dp[0][j] = j`

```javascript
function minDistance(word1, word2) {
  let m = word1.length, n = word2.length;
  let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        );
      }
    }
  }
  return dp[m][n];
}
```

**Visual:**
```text
word1 = "horse", word2 = "ros"

Answer: 3 (horse ? rorse ? rose ? ros)
```

**Time:** `O(m × n)` · **Space:** `O(m × n)`

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 10 — LONGEST PALINDROMIC SUBSEQUENCE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** String ka longest palindromic subsequence.

**Trick:** `LPS(s) = LCS(s, reverse(s))`

```javascript
function longestPalindromeSubseq(s) {
  let rev = s.split("").reverse().join("");
  return longestCommonSubsequence(s, rev);
}
```

**Alternative — Direct DP:**

```javascript
function longestPalindromeSubseq(s) {
  let n = s.length;
  let dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = 2 + dp[i + 1][j - 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 11 — REGEX MATCHING</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Pattern matching with `.` (any char) and `*` (0+ of prev).

**State:** `dp[i][j]` = pattern[0..j-1] matches string[0..i-1]

**Recurrence:**

```javascript
if p[j-1] === s[i-1] or p[j-1] === '.': dp[i][j] = dp[i-1][j-1]
if p[j-1] === '*':
  zero occurrence: dp[i][j] = dp[i][j-2]
  one+ occurrence: dp[i][j] = dp[i-1][j] (if s[i-1] matches p[j-2])
```

```javascript
function isMatch(s, p) {
  let m = s.length, n = p.length;
  let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  // Handle patterns like a*, a*b*, etc.
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2];
        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }
  return dp[m][n];
}
```

**Time:** `O(m × n)` · **Space:** `O(m × n)`

</div>

---

---

# <span style="color:#FF6347">📚 PART 5 — KNAPSACK PATTERNS</span>

## <span style="color:#1E90FF">🎯 PATTERN 12 — 0/1 KNAPSACK</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** `n` items, har item ka weight aur value. Capacity `W`. Max value?

**Har item ya lo ya chhodo** (0 ya 1 baar).

**State:** `dp[i][w]` = max value using first `i` items, capacity `w`

**Recurrence:**

```
if weight[i] <= w: dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w - weight[i]])
else: dp[i][w] = dp[i-1][w]
```

**Base:** `dp[0][*] = 0`, `dp[*][0] = 0`

```javascript
function knapsack(weights, values, W) {
  let n = weights.length;
  let dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][W];
}
```

**Space Optimized (1D):**

```javascript
function knapsack(weights, values, W) {
  let dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let w = W; w >= weights[i]; w--) {  // Reverse!
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  return dp[W];
}
```

**🔹 Reverse Loop Kyun?**
Har item **ek baar** lena hai. Reverse se same item dobara use nahi hoga.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 13 — SUBSET SUM</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Subset ka sum = target?

**State:** `dp[i][s]` = can we make sum `s` using first `i` items?

**Recurrence:**

```
dp[i][s] = dp[i-1][s] || dp[i-1][s - nums[i]]
```

```javascript
function canPartition(nums) {
  let total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  let target = total / 2;

  let dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (let num of nums) {
    for (let s = target; s >= num; s--) {  // Reverse
      dp[s] = dp[s] || dp[s - num];
    }
  }
  return dp[target];
}
```

**Use:** Partition Equal Subset Sum, Target Sum, Subset Sum.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 14 — UNBOUNDED KNAPSACK</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Har item **multiple baar** le sakte ho.

**Farak:** Loop **forward** chalega (reverse nahi).

```javascript
function unboundedKnapsack(weights, values, W) {
  let dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let w = weights[i]; w <= W; w++) {  // Forward!
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  return dp[W];
}
```

**Coin Change** bhi unbounded knapsack hai.

### 🔹 0/1 vs Unbounded

| | 0/1 | Unbounded |
|:---|:---|:---|
| **Item use** | Ek baar | Multiple |
| **Loop** | Reverse | Forward |
| **Example** | Subset Sum | Coin Change |

</div>

---

---

# <span style="color:#FF6347">📚 PART 6 — INTERVAL DP</span>

## <span style="color:#1E90FF">🎯 PATTERN 15 — MATRIX CHAIN MULTIPLICATION</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Matrices ki chain, minimum cost to multiply.

**State:** `dp[i][j]` = min cost to multiply matrices from `i` to `j`

**Recurrence:** `dp[i][j] = min(dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j])`

```javascript
function matrixChainOrder(dims) {
  let n = dims.length;
  let dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len < n; len++) {
    for (let i = 1; i < n - len + 1; i++) {
      let j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        let cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[1][n - 1];
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 16 — BURST BALLOONS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Balloons burst karo, coins collect karo. Max coins?

**Trick:** Last balloon burst karo (ulta socho).

```javascript
function maxCoins(nums) {
  let arr = [1, ...nums, 1];
  let n = arr.length;
  let dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len < n; len++) {
    for (let left = 0; left < n - len; left++) {
      let right = left + len;
      for (let k = left + 1; k < right; k++) {
        let coins = arr[left] * arr[k] * arr[right]
                  + dp[left][k] + dp[k][right];
        dp[left][right] = Math.max(dp[left][right], coins);
      }
    }
  }
  return dp[0][n - 1];
}
```

**Time:** `O(n²)` · **Space:** `O(n²)`

</div>

---

---

# <span style="color:#FF6347">📚 PART 7 — TREE DP</span>

## <span style="color:#1E90FF">🎯 PATTERN 17 — HOUSE ROBBER III</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Tree me houses, adjacent nahi rob kar sakte. Max money?

**State:** Har node ke liye `[rob, notRob]` return karo.

```javascript
function rob(root) {
  function dfs(node) {
    if (!node) return [0, 0];

    let [leftRob, leftNot] = dfs(node.left);
    let [rightRob, rightNot] = dfs(node.right);

    let robThis = node.val + leftNot + rightNot;         // Rob current
    let notRob = Math.max(leftRob, leftNot) + Math.max(rightRob, rightNot);  // Don't rob

    return [robThis, notRob];
  }
  let [robRoot, notRobRoot] = dfs(root);
  return Math.max(robRoot, notRobRoot);
}
```

**Key:** Har node **do values** return karta hai.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 18 — BINARY TREE MAX PATH SUM</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;
  function dfs(node) {
    if (!node) return 0;

    let left = Math.max(0, dfs(node.left));
    let right = Math.max(0, dfs(node.right));

    maxSum = Math.max(maxSum, node.val + left + right);  // Peak
    return node.val + Math.max(left, right);              // One side
  }
  dfs(root);
  return maxSum;
}
```

**Ye Tree DP ka classic hai.**

</div>

---

---

# <span style="color:#FF6347">📚 PART 8 — BITMASK DP</span>

## <span style="color:#1E90FF">🎯 PATTERN 19 — TRAVELLING SALESMAN (TSP)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Saare cities visit karo, minimum cost.

**State:** `dp[mask][i]` = min cost to visit set `mask`, ending at `i`

**Bitmask:** Kaunsa city visit ho chuka.

```javascript
function tsp(graph) {
  let n = graph.length;
  let dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;  // Start from city 0

  for (let mask = 1; mask < (1 << n); mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u))) continue;
      for (let v = 0; v < n; v++) {
        if (mask & (1 << v)) continue;
        let newMask = mask | (1 << v);
        dp[newMask][v] = Math.min(dp[newMask][v], dp[mask][u] + graph[u][v]);
      }
    }
  }

  let ans = Infinity;
  for (let i = 1; i < n; i++) {
    ans = Math.min(ans, dp[(1 << n) - 1][i] + graph[i][0]);
  }
  return ans;
}
```

**Time:** `O(2^n — n²)` · **Space:** `O(2^n — n)`

**Constraints:** `n = 20` — kyunki `2^n` exponential.

</div>

---

---

# <span style="color:#FF6347">📚 PART 9 — DP PATTERNS — QUICK REFERENCE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

| Pattern | State | Recurrence | Example |
|:---|:---|:---|:---|
| **Linear** | `dp[i]` | `dp[i] = f(dp[i-1], dp[i-2])` | Climbing Stairs |
| **LIS** | `dp[i]` | `dp[i] = max(dp[j]+1)` | Longest Inc. Subseq |
| **Coin Change** | `dp[i]` | `dp[i] = min(dp[i-c]+1)` | Min coins |
| **Grid** | `dp[i][j]` | `dp[i][j] = grid[i][j] + min(...)` | Min Path Sum |
| **2 Strings** | `dp[i][j]` | `if same: 1 + dp[i-1][j-1]` | LCS, Edit Distance |
| **0/1 Knapsack** | `dp[i][w]` | `max(skip, take)` | Subset Sum |
| **Unbounded** | `dp[w]` | `max(dp[w], dp[w-wi]+vi)` | Coin Change II |
| **Interval** | `dp[i][j]` | `min/max over k` | Matrix Chain |
| **Tree** | `dfs(node)` | Return multiple values | House Robber III |
| **Bitmask** | `dp[mask][i]` | Try all next | TSP |

</div>

---

---

# <span style="color:#FF6347">📚 PART 10 — MUST-KNOW LEETCODE PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

### 🔹 1D DP (Easy)

| # | Problem | Pattern |
|:---:|:---|:---|
| **70** | Climbing Stairs | Fib |
| **198** | House Robber | Linear |
| **213** | House Robber II | Circular |
| **746** | Min Cost Climbing Stairs | Linear |
| **121** | Best Time to Buy Stock | Kadane |
| **53** | Maximum Subarray | Kadane |
| **338** | Counting Bits | Bit DP |

### 🔹 1D DP (Medium)

| # | Problem | Pattern |
|:---:|:---|:---|
| **300** | Longest Increasing Subsequence | LIS |
| **139** | Word Break | String DP |
| **322** | Coin Change | Unbounded |
| **518** | Coin Change II | Combinations |
| **152** | Maximum Product Subarray | Kadane variant |
| **91** | Decode Ways | String DP |
| **279** | Perfect Squares | Unbounded |
| **5** | Longest Palindromic Substring | Interval |

### 🔹 2D DP (Medium)

| # | Problem | Pattern |
|:---:|:---|:---|
| **62** | Unique Paths | Grid |
| **63** | Unique Paths II | Grid with obstacles |
| **64** | Min Path Sum | Grid |
| **1143** | Longest Common Subsequence | Two strings |
| **72** | Edit Distance | Two strings |
| **221** | Maximal Square | Grid |
| **494** | Target Sum | Subset |
| **416** | Partition Equal Subset | Subset |

### 🔹 2D DP (Hard)

| # | Problem | Pattern |
|:---:|:---|:---|
| **10** | Regular Expression Matching | Regex |
| **44** | Wildcard Matching | Regex |
| **312** | Burst Balloons | Interval |
| **115** | Distinct Subsequences | Two strings |
| **97** | Interleaving String | Two strings |

### 🔹 DP on Trees

| # | Problem | Pattern |
|:---:|:---|:---|
| **337** | House Robber III | Tree DP |
| **124** | Binary Tree Max Path Sum | Tree DP |
| **543** | Diameter | Tree DP |

### 🔹 Bitmask DP

| # | Problem | Pattern |
|:---:|:---|:---|
| **847** | Shortest Path Visiting All Nodes | BFS + Bitmask |
| **1125** | Smallest Sufficient Team | Subset bitmask |

### 🔹 Classic DP

| # | Problem | Pattern |
|:---:|:---|:---|
| **118** | Pascal's Triangle | 2D |
| **119** | Pascal's Triangle II | 1D space-opt |
| **647** | Palindromic Substrings | Interval |
| **516** | Longest Palindromic Subsequence | Interval |
| **132** | Palindrome Partitioning II | Interval |

</div>

---

---

# <span style="color:#FF6347">📚 PART 11 — COMMON MISTAKES IN DP</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

| ? Galti | ? Sahi |
|:---|:---|
| Base case bhool jana | Base pehle define karo |
| State galat define karna | `dp[i]` ka meaning clearly likho |
| Recurrence me options miss | Saare transitions socho |
| Loop order galat (knapsack) | 0/1 me reverse, unbounded me forward |
| Space optimization galat | Reverse loop zaroori |
| `Infinity` use karna initialization | Kabhi `Infinity`, kabhi `0`, kabhi `-1` |
| Answer ki jagah bhool jana | `dp[n]`? `dp[m][n]`? `max(dp)`? |
| Memoization key galat | String key + separator |
| Arrays me reference leak | `[...arr]` ya `slice()` |

### 🔹 Rule

> **"Har DP problem me: state, recurrence, base, order, answer — 5 cheezein likho. Fir code."**

</div>

---

---

# <span style="color:#FF6347">📚 PART 12 — DP KAISE SOCHO (Framework)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

### 🔹 Recursion se changing parameters identify karo

Sabse pehle brute-force recursion likho aur dekho ki recursion ke andar kaunse parameters change ho rahe hain. **Wahi parameters DP state ke candidates hote hain.**

**Example:**

- `index` change ho raha ? 1D DP
- `index, weight` change ho rahe ? 2D DP
- `index1, index2` change ho rahe ? 2D DP

### 🔹 State ka size pattern batata hai

- `index` change ho raha ? usually 1D DP
- `index, weight` change ho rahe ? usually 2D knapsack-style DP
- `index1, index2` change ho rahe ? usually 2D two-string DP

Iske baad recurrence ko `dp[state] = f(subproblems)` ke form me likho, base cases set karo, aur tabulation ke liye dependency order fix karo.

</div>

---

---

# <span style="color:#FF6347">📚 PART 13 — DP TIPS & TRICKS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Tip 1: Constraints Padho

- `n = 20` ? Bitmask DP possible
- `n = 100` ? `O(n²)` DP
- `n = 1000` ? `O(n²)` DP
- `n = 10^5` ? `O(n log n)` ya greedy

### 🔹 Tip 2: Recursion Se Start Karo

Kabhi bhi directly tabulation nahi socho. Recursion likho pehle.

### 🔹 Tip 3: State Minimize Karo

Sirf **changing parameters** state me daalo. Constant parameters state me nahi.

### 🔹 Tip 4: Space Optimize

Agar `dp[i]` sirf `dp[i-1]` pe depend kare, 2 variables se kaam chalao.

### 🔹 Tip 5: Dry Run Karo

Chhote example pe manually table bharo. Pattern dikh jayega.

### 🔹 Tip 6: Kadane's Alag Hai

Kadane DP hai but simple hai — sirf current max track karo.

### 🔹 Tip 7: Sliding Window DP

Kuch problems me window slide hoti hai — DP + window.

</div>

---

---
