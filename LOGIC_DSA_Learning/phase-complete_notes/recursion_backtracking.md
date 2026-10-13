# 🌈 RECURSION & BACKTRACKING — COMPLETE DEEP DIVE 🌈


# <span style="color:#FF6347">📚 PART 1 — RECURSION</span>

## <span style="color:#1E90FF">🌳 RECURSION KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Recursion** ek technique hai jisme **function khud ko call karta hai** — chhoti problem solve karke badi problem solve karta hai.

**Real life analogy:**

- 🪆 Russian dolls — ek doll ke andar chhoti doll, aur uske andar aur chhoti
- 🪞 Do mirrors aamne-samne — infinite reflection
- 📚 Dictionary me word dhundhna — ek word dusre word pe redirect

**Philosophy:**

> **"Badi problem ko chhoti problem me todo. Chhoti problem ko solve karo (recursion se), aur uske answer se badi problem solve karo."**

</div>

---

## <span style="color:#32CD32">⚡ RECURSION KE 3 PARTS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

Har recursive function me **3 parts** hote hain:

### 🔹 1. Base Case (Rukne ki condition)

Bina iske recursion **infinite** chalega → **Stack Overflow**.

```javascript
if (n === 0) return 1;  // Base case
```

### 🔹 2. Recursive Case (Chhoti problem)

Function khud ko **chhote input** ke saath call kare.

```javascript
return n * factorial(n - 1);
```

### 🔹 3. Combine (Result build karna)

Chhoti problem ke answer se badi problem ka answer banao.

```javascript
return n * factorial(n - 1);
//     ↑   ↑
//  combine  recursion
```

</div>

---

## <span style="color:#FFD700">📐 CLASSIC EXAMPLE — FACTORIAL</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;  // Base case
  return n * factorial(n - 1);        // Recursive case
}

factorial(5); // 120
```

**Visual — Call Stack:**

```text
factorial(5)
  → 5 * factorial(4)
      → 4 * factorial(3)
          → 3 * factorial(2)
              → 2 * factorial(1)
                  → 1 (base case)
              ← 2 * 1 = 2
          ← 3 * 2 = 6
      ← 4 * 6 = 24
  ← 5 * 24 = 120
```

**Dhyaan de:** Recursion **do phases** me chalti hai:

- 🔽 **Winding phase** — neeche jaate waqt
- 🔼 **Unwinding phase** — upar aate waqt (answer build hota hai)

</div>

---

## <span style="color:#9370DB">🎯 RECURSION KE 4 PATTERNS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

### 🔹 Pattern 1 — Linear Recursion (1 call)

```javascript
function sum(n) {
  if (n === 0) return 0;
  return n + sum(n - 1);
}
```

**Time:** `O(n)` · **Space:** `O(n)` stack

### 🔹 Pattern 2 — Binary Recursion (2 calls)

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

**Time:** `O(2^n)` ❌ (without memoization)  
**Space:** `O(n)` stack

### 🔹 Pattern 3 — Tail Recursion (call last me)

```javascript
function sum(n, acc = 0) {
  if (n === 0) return acc;
  return sum(n - 1, acc + n);  // Last operation = recursion
}
```

**Note:** JS me tail call optimization nahi hoti (abhi tak).

### 🔹 Pattern 4 — Divide & Conquer (problem ko todna)

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
```

**Time:** `O(n log n)` — Master Theorem se

</div>

---

## <span style="color:#FF4500">💻 RECURSION — HOW TO THINK</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

### 🔹 Step-by-Step Approach

**Step 1:** "Sabse chhoti problem kya hai?" → **Base case**

**Step 2:** "Agar main chhoti problem ka answer jaanu, to badi kaise solve karunga?" → **Recursive case**

**Step 3:** "Chhoti problem kya hai?" → **Input kaise reduce karega**

### 🔹 Rule

> **"Khud ko trust karo — maan lo chhoti problem recursion solve kar dega. Ab us answer ko use karke badi problem solve karo."**

**Na socho ki recursion andar kaise kaam kar raha. Bas ye socho:**

- Base case kya?
- Chhoti problem ka answer agar mil jaye, to mera answer kya hoga?

</div>

---

## <span style="color:#00CED1">🔍 RECURSION EXAMPLES — STARTER TO INTERMEDIATE</span>

### <span style="color:#FF69B4">Example 1 — Print 1 to N</span>

```javascript
function print(n) {
  if (n === 0) return;
  print(n - 1);
  console.log(n);
}
print(5); // 1 2 3 4 5
```

### <span style="color:#FF69B4">Example 2 — Fibonacci</span>

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

**Visual tree:**
```text
                fib(5)
              /        \
         fib(4)        fib(3)
         /    \        /    \
     fib(3)  fib(2)  fib(2) fib(1)
     ...
```

### <span style="color:#FF69B4">Example 3 — Sum of Array</span>

```javascript
function sumArray(arr, i = 0) {
  if (i === arr.length) return 0;
  return arr[i] + sumArray(arr, i + 1);
}
```

### <span style="color:#FF69B4">Example 4 — Reverse String</span>

```javascript
function reverse(s) {
  if (s.length <= 1) return s;
  return reverse(s.slice(1)) + s[0];
}
```

### <span style="color:#FF69B4">Example 5 — Power (x^n)</span>

```javascript
// Naive — O(n)
function power(x, n) {
  if (n === 0) return 1;
  return x * power(x, n - 1);
}

// Fast Power — O(log n)
function fastPower(x, n) {
  if (n === 0) return 1;
  let half = fastPower(x, Math.floor(n / 2));
  if (n % 2 === 0) return half * half;
  return half * half * x;
}
```

**Fast Power ka trick:** `x^8 = (x^4)^2 = ((x^2)^2)^2` — half karke square karo.

</div>

---

## <span style="color:#32CD32">📊 RECURSION — TIME COMPLEXITY ANALYSIS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Kaise Nikale

**Method 1:** Recursion tree banao. Har node ek call. Total nodes = complexity.

**Method 2:** Recurrence relation likh, Master Theorem laga.

### 🔹 Common Recurrences

| Recurrence | Complexity | Example |
|:---|:---|:---|
| `T(n) = T(n-1) + O(1)` | `O(n)` | Sum, factorial |
| `T(n) = T(n-1) + O(n)` | `O(n²)` | Selection sort |
| `T(n) = 2T(n-1) + O(1)` | `O(2^n)` | Tower of Hanoi, fib |
| `T(n) = T(n-1) + T(n-2)` | `O(2^n)` | Fibonacci |
| `T(n) = 2T(n/2) + O(n)` | `O(n log n)` | Merge sort |
| `T(n) = 2T(n/2) + O(1)` | `O(n)` | Binary tree traversal |
| `T(n) = T(n/2) + O(1)` | `O(log n)` | Binary search |

### 🔹 Visual — Fib(5) Recursion Tree

```text
                    fib(5)                    ← 1 call
                  /        \
              fib(4)        fib(3)            ← 2 calls
             /    \        /    \
         fib(3)  fib(2)  fib(2) fib(1)        ← 4 calls
         /   \    /   \   /   \
      fib(2)fib(1)fib(1)fib(0)fib(1)fib(0)    ← 8 calls
```

Total calls ≈ `2^n` → `O(2^n)` ❌

</div>

---

## <span style="color:#FF69B4">⚠️ RECURSION KE ISSUES</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

### 🔹 Issue 1 — Stack Overflow

Bahut deep recursion → stack full → crash.

```javascript
function infinite(n) {
  return infinite(n + 1); // Kabhi nahi rukega ❌
}
```

**Fix:** Base case properly define karo.

### 🔹 Issue 2 — Redundant Computation

```javascript
fib(5) calls fib(3) multiple times
```

**Fix:** Memoization (DP) use karo.

```javascript
let memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}
```

### 🔹 Issue 3 — Space Complexity

Recursion **stack space** leta hai — `O(depth)`.

**Fix:** Iterative likh sakte ho to likho.

</div>

---

---

# <span style="color:#FF6347">📚 PART 2 — BACKTRACKING</span>

## <span style="color:#1E90FF">🌳 BACKTRACKING KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Backtracking** ek **algorithmic technique** hai jisme hum **choices try karte hain**, aur agar choice galat nikli, to **wapas aake** doosri choice try karte hain.

**Idea:** Recursion + **undo** (choice revert karna).

**Real life analogy:**

- 🗺️ Maze solve karna — galat raste se wapas aake doosra try karo
- 🧩 Puzzle solve karna — piece na fit ho to hatao, doosra lagao
- ♟️ Chess me moves sochna — "agar ye chalunga to kya hoga"

**Philosophy:**

> **"Try karo. Fail ho to undo karo. Next try karo."**

</div>

---

## <span style="color:#32CD32">⚡ BACKTRACKING KA TEMPLATE (Universal)</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

```javascript
function backtrack(state, choices) {
  // 1. Base case — valid solution mila
  if (isSolution(state)) {
    record(state);
    return;
  }

  // 2. Har choice try karo
  for (let choice of choices) {
    if (isValid(choice, state)) {
      // 3. Choice lo
      state.push(choice);

      // 4. Recurse
      backtrack(state, nextChoices);

      // 5. Undo (backtrack!)
      state.pop(choice);
    }
  }
}
```

### 🔑 3 Steps Yaad Rakh

1. **Choose** — choice lo (`push`)
2. **Explore** — recurse karo
3. **Un-choose** — choice hatao (`pop`)

</div>

---

## <span style="color:#FFD700">📐 BACKTRACKING KA TREE VISUAL</span>

**Problem:** Subsets of `[1, 2, 3]`

```text
                        []
                /        |        \
             [1]        [2]       [3]
            /   \        |
         [1,2] [1,3]   [2,3]
           |
        [1,2,3]

Har node = ek state (path)
Har edge = ek choice (element uthana)
Har leaf = complete subset
```

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Har node pe 3 kaam:**

1. Result me add karo (ya base case check)
2. Valid choices try karo (push)
3. Recurse, phir pop (backtrack)

</div>

---

## <span style="color:#9370DB">🎯 BACKTRACKING — CLASSIC PROBLEMS</span>

### <span style="color:#FF69B4">Problem 1 — Subsets (LC 78)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

```javascript
function subsets(nums) {
  let result = [];
  function backtrack(path, start) {
    result.push([...path]);   // Har node ek subset hai
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);      // Choose
      backtrack(path, i + 1);  // Explore
      path.pop();              // Un-choose
    }
  }
  backtrack([], 0);
  return result;
}
```

**Time:** `O(2^n × n)` · **Space:** `O(n)` stack

**Visual:**
```text
nums = [1, 2, 3]

[] → push
  [1] → push
    [1,2] → push
      [1,2,3] → push
    [1,3] → push
  [2] → push
    [2,3] → push
  [3] → push

Result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

</div>

### <span style="color:#FF69B4">Problem 2 — Permutations (LC 46)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

```javascript
function permute(nums) {
  let result = [], used = new Array(nums.length).fill(false);
  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;          // Choose
      path.push(nums[i]);
      backtrack(path);          // Explore
      path.pop();              // Un-choose
      used[i] = false;
    }
  }
  backtrack([]);
  return result;
}
```

**Farak Subsets Se:** Yahan **order matter** karta hai, isliye `used[]` array rakhte hain.

**Time:** `O(n! × n)` · **Space:** `O(n)`

</div>

### <span style="color:#FF69B4">Problem 3 — Combination Sum (LC 39)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

```javascript
function combinationSum(candidates, target) {
  let result = [];
  function backtrack(path, start, sum) {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(path, i, sum + candidates[i]);  // i, not i+1 → reuse allowed
      path.pop();
    }
  }
  backtrack([], 0, 0);
  return result;
}
```

**Key point:** `i` pass karo (not `i+1`) — same element **reuse** ho sakta hai.

</div>

### <span style="color:#FF69B4">Problem 4 — N-Queens (LC 51)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

```javascript
function solveNQueens(n) {
  let result = [];
  let board = Array.from({ length: n }, () => ".".repeat(n));

  function isValid(row, col, board) {
    // Check column
    for (let i = 0; i < row; i++) if (board[i][col] === "Q") return false;
    // Check left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] === "Q") return false;
    // Check right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
      if (board[i][j] === "Q") return false;
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      result.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, board)) {
        board[row] = board[row].substring(0, col) + "Q" + board[row].substring(col + 1);
        backtrack(row + 1);
        board[row] = board[row].substring(0, col) + "." + board[row].substring(col + 1);
      }
    }
  }
  backtrack(0);
  return result;
}
```

**Visual n=4:**
```text
. Q . .      Q = queen
. . . Q
Q . . .
. . Q .
```

</div>

### <span style="color:#FF69B4">Problem 5 — Sudoku Solver (LC 37)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Idea:** Har empty cell pe 1-9 try karo. Valid ho to rakho, recurse karo. Fail ho to undo.

```javascript
function solveSudoku(board) {
  function isValid(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
      if (board[i][col] === num) return false;
      let r = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      let c = 3 * Math.floor(col / 3) + (i % 3);
      if (board[r][c] === num) return false;
    }
    return true;
  }

  function backtrack() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === ".") {
          for (let num = 1; num <= 9; num++) {
            let ch = num.toString();
            if (isValid(r, c, ch)) {
              board[r][c] = ch;
              if (backtrack()) return true;
              board[r][c] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  backtrack();
}
```

</div>

### <span style="color:#FF69B4">Problem 6 — Word Search (LC 79)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Idea:** Har cell se start karo, 4 directions me word dhundho.

```javascript
function exist(board, word) {
  let rows = board.length, cols = board[0].length;

  function backtrack(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    let temp = board[r][c];
    board[r][c] = "#";  // Visited mark
    let found =
      backtrack(r + 1, c, idx + 1) ||
      backtrack(r - 1, c, idx + 1) ||
      backtrack(r, c + 1, idx + 1) ||
      backtrack(r, c - 1, idx + 1);
    board[r][c] = temp;  // Backtrack
    return found;
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (backtrack(r, c, 0)) return true;
  return false;
}
```

</div>

### <span style="color:#FF69B4">Problem 7 — Palindrome Partitioning (LC 131)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Idea:** String ko aise todo ki har piece palindrome ho.

```javascript
function partition(s) {
  let result = [];
  function isPalin(str) {
    let l = 0, r = str.length - 1;
    while (l < r) if (str[l++] !== str[r--]) return false;
    return true;
  }

  function backtrack(path, start) {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < s.length; i++) {
      let sub = s.slice(start, i + 1);
      if (isPalin(sub)) {
        path.push(sub);
        backtrack(path, i + 1);
        path.pop();
      }
    }
  }
  backtrack([], 0);
  return result;
}
```

</div>

### <span style="color:#FF69B4">Problem 8 — Letter Combinations (LC 17)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Idea:** Phone keypad me digit se letters nikaalo, combinations banao.

```javascript
function letterCombinations(digits) {
  if (!digits.length) return [];
  let map = {
    2: "abc", 3: "def", 4: "ghi", 5: "jkl",
    6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz"
  };
  let result = [];
  function backtrack(path, idx) {
    if (idx === digits.length) {
      result.push(path.join(""));
      return;
    }
    for (let ch of map[digits[idx]]) {
      path.push(ch);
      backtrack(path, idx + 1);
      path.pop();
    }
  }
  backtrack([], 0);
  return result;
}
```

</div>

---

## <span style="color:#FF4500">🔑 BACKTRACKING KE 4 PATTERNS (Universal Templates)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

### 🔹 Pattern 1 — Subsets Type

**Har node valid answer hai.**

```javascript
function backtrack(path, start) {
  result.push([...path]);         // Har state push
  for (let i = start; i < n; i++) {
    path.push(nums[i]);
    backtrack(path, i + 1);
    path.pop();
  }
}
```

**Use:** Subsets, Combination Sum, Letter Combinations

### 🔹 Pattern 2 — Permutations Type

**Order matter karta hai. `used[]` array chahiye.**

```javascript
function backtrack(path) {
  if (path.length === n) { result.push([...path]); return; }
  for (let i = 0; i < n; i++) {
    if (used[i]) continue;
    used[i] = true;
    path.push(nums[i]);
    backtrack(path);
    path.pop();
    used[i] = false;
  }
}
```

**Use:** Permutations, N-Queens, Palindrome Partitioning

### 🔹 Pattern 3 — Combination Sum Type

**Reuse allowed — `i` pass karo (`i+1` nahi).**

```javascript
function backtrack(path, start, sum) {
  if (sum === target) { result.push([...path]); return; }
  if (sum > target) return;
  for (let i = start; i < n; i++) {
    path.push(candidates[i]);
    backtrack(path, i, sum + candidates[i]);  // i
    path.pop();
  }
}
```

**Use:** Combination Sum I, Coin Change

### 🔹 Pattern 4 — Grid Backtracking

**4 directions explore karo.**

```javascript
function backtrack(r, c) {
  if (base) return;
  let temp = board[r][c];
  board[r][c] = "#";  // Mark visited
  // 4 directions
  backtrack(r + 1, c);
  backtrack(r - 1, c);
  backtrack(r, c + 1);
  backtrack(r, c - 1);
  board[r][c] = temp;  // Unmark
}
```

**Use:** Word Search, Rat in Maze, Sudoku

</div>

---

## <span style="color:#FF69B4">🎯 PRUNING — BACKTRACKING KO FAST KARNA</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

**Pruning** = wo branches **kaat dena** jahan solution **possible hi nahi**.

**Kyun zaroori:** Backtracking ka tree **bahut bada** hota hai. Pruning se **tez** chalta hai.

### 🔹 Examples

**1. Combination Sum — Sum bada ho gaya:**
```javascript
if (sum > target) return;  // Prune — aage try mat karo
```

**2. Sudoku — Number invalid:**
```javascript
if (!isValid(num)) continue;  // Skip
```

**3. Permutations II — Duplicate skip:**
```javascript
if (i > start && nums[i] === nums[i-1]) continue;
```

**4. N-Queens — Valid position check:**
```javascript
if (isValid(row, col)) { ... }  // Sirf valid hi try karo
```

### 🔑 Rule

> **Jitna pehle prune karo, utna fast.**

</div>

---

## <span style="color:#32CD32">📊 BACKTRACKING — TIME COMPLEXITY</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Problem Type | Complexity | Kyun |
|:---|:---|:---|
| **Subsets** | `O(2^n × n)` | 2^n subsets, har ek ka copy `O(n)` |
| **Permutations** | `O(n! × n)` | n! permutations |
| **Combinations** | `O(C(n,k) × k)` | C(n,k) combinations |
| **N-Queens** | `O(n!)` approx | Row by row |
| **Sudoku** | `O(9^(n×n))` worst | Har cell 9 options |
| **Word Search** | `O(n × m × 4^L)` | Grid × 4 dirs × word length |

### 🔑 Rule

> Backtracking ki complexity **exponential** hoti hai. Isliye constraints **chhoti** hoti hain (`n ≤ 20` type).

</div>

---

## <span style="color:#00FA9A">💻 BACKTRACKING — MUST-KNOW PROBLEMS</span>

| # | Problem | Pattern |
|:---:|:---|:---|
| **78** | Subsets | Subsets |
| **90** | Subsets II | Subsets + skip dup |
| **77** | Combinations | Subsets |
| **39** | Combination Sum | Reuse allowed |
| **40** | Combination Sum II | Skip dup |
| **216** | Combination Sum III | Sum + count |
| **46** | Permutations | Permutations |
| **47** | Permutations II | Permutations + skip dup |
| **17** | Letter Combinations | Subsets |
| **22** | Generate Parentheses | Valid strings |
| **79** | Word Search | Grid |
| **131** | Palindrome Partitioning | Partition |
| **51** | N-Queens | Grid + constraints |
| **37** | Sudoku Solver | Grid + constraints |
| **93** | Restore IP Addresses | Partition |
| **473** | Matchsticks to Square | Subsets + pruning |
| **698** | Partition to K Equal Sum Subsets | Subsets |

---

## <span style="color:#DA70D6">⚠️ BACKTRACKING KE COMMON MISTAKES</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

| ❌ Galti | ✅ Sahi |
|:---|:---|
| `result.push(path)` (reference) | `result.push([...path])` (copy) |
| `pop()` bhool jana | **Choose → Explore → Un-choose** consistent |
| `used[]` update bhool jana | Har choice ke saath state update |
| Pruning na karna | Sum > target check karo |
| Duplicate skip bhool jana | Sort + `if (i > start && ...)` |
| Grid visited mark bhool jana | `board[r][c] = "#"` before recurse |

</div>

---

## <span style="color:#FFD700">🎯 RECURSION vs BACKTRACKING — DIFFERENCE</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Aspect | Recursion | Backtracking |
|:---|:---|:---|
| **Definition** | Function khud ko call kare | Recursion + Undo |
| **Explore** | Ek solution ki taraf | Saare possible solutions |
| **Undo** | Nahi | Haan (`pop`) |
| **Use** | Factorial, fib, merge sort | Subsets, permutations, N-Queens |
| **Result** | Ek answer | Saare answers |
| **Time** | Usually `O(n)`, `O(n log n)` | Exponential (`O(2^n)`, `O(n!)`) |

### 🔑 Ek Line Me

> **Recursion = "ek raste pe chalo"**  
> **Backtracking = "saare raste try karo, galat pe wapas aao"**

**Backtracking recursion ka **upgraded version** hai — jisme tu galat choice **undo** kar sakta hai.**

</div>

---

## <span style="color:#32CD32">🎯 FINAL SUMMARY — RECURSION & BACKTRACKING</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Recursion

1. **3 parts** — base case, recursive case, combine
2. **Trust the recursion** — chhoti problem solve karega
3. **4 patterns** — linear, binary, tail, divide-conquer
4. **Stack space** — `O(depth)`
5. **Memoization** — redundant calls bachao

### 🔹 Backtracking

1. **3 steps** — Choose → Explore → Un-choose
2. **4 patterns** — subsets, permutations, combination sum, grid
3. **Pruning** — invalid branches jaldi kaat do
4. **Copy** karo result me (`[...path]`)
5. **State update** karo — `used[]`, `board[][]`

### 🔥 Golden Rule

> **"Khud ko trust karo — chhoti problem ka answer recursion de dega. Tu bas uska use karke badi problem solve kar."**

> **"Galat choice undo karo, next try karo."**

</div>

