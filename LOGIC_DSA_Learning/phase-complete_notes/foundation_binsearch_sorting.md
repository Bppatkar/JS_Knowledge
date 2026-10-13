# 🌈 DEEP FOUNDATION + BINARY SEARCH + SORTING & SEARCHING — COMPLETE DEEP DIVE 🌈

---

# <span style="color:#FF6347">📚 PART 1 — DEEP FOUNDATION (Big-O, Constraints, Analysis)</span>

## <span style="color:#1E90FF">🌳 WHY THIS MATTERS?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

Har problem me tujhe **do cheezein** sochni hain:

1. **Time Complexity** — Kitna time lagega?
2. **Space Complexity** — Kitni memory lagegi?

Ye sirf numbers nahi hain — **decide karte hain ki solution accept hoga ya TLE (Time Limit Exceeded)**.

**Constraint padh ke hi pata chal jata hai kaunsa approach chalega.**

</div>

---

## <span style="color:#32CD32">⚡ BIG-O NOTATION — WHAT AND WHY</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**Big-O** batata hai — **"input badhne pe time kaise badhta hai?"**

**Example:** `O(n)` matlab — input double ho gaya, time double ho jayega.

### 🔹 Notation Types

| Notation | Matlab | Example |
|:---|:---|:---|
| **Big-O** `O(f(n))` | Upper bound — worst case | Worst case time |
| **Big-Omega** `Ω(f(n))` | Lower bound — best case | Best case time |
| **Big-Theta** `Θ(f(n))` | Tight bound — average | Exact growth |

Practically hum sirf **Big-O** use karte hain.

</div>

---

## <span style="color:#FFD700">📊 COMMON TIME COMPLEXITIES (Rising Order)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Complexity | Naam | Example | `n=10^5` pe |
|:---|:---|:---|:---:|
| `O(1)` | Constant | Array access, HashMap | ⚡ Instant |
| `O(log n)` | Logarithmic | Binary search | ~17 ops |
| `O(√n)` | Square root | Prime check | ~316 ops |
| `O(n)` | Linear | Single loop | 10^5 ops |
| `O(n log n)` | Linearithmic | Sorting | ~1.7M ops |
| `O(n²)` | Quadratic | Nested loops | 10^10 ops ❌ |
| `O(n³)` | Cubic | Triple nested | 10^15 ops ❌ |
| `O(2^n)` | Exponential | Subsets | ❌ |
| `O(n!)` | Factorial | Permutations | ❌ |

### 🔑 Thumb Rule

> **`n = 10^5`** → `O(n log n)` max chalega. `O(n²)` TLE dega.

</div>

---

## <span style="color:#9370DB">🎯 CONSTRAINT → COMPLEXITY MAP</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Ye table rat le — har problem me kaam aayega:**

| Constraint | Kaunsa Approach Chalega | Complexity |
|:---:|:---|:---|
| `n ≤ 10` | Backtracking, Brute force | `O(2^n)`, `O(n!)` |
| `n ≤ 20` | Backtracking, Bitmask | `O(2^n)` |
| `n ≤ 100` | Triple loop | `O(n³)` |
| `n ≤ 500` | Double loop | `O(n²)` |
| `n ≤ 5000` | Double loop | `O(n²)` |
| `n ≤ 10^5` | Sorting, HashMap, Two pointer | `O(n log n)`, `O(n)` |
| `n ≤ 10^6` | Linear scan | `O(n)` |
| `n ≤ 10^9` | Binary search, Math | `O(log n)` |
| `n ≤ 10^18` | Pure math | `O(log n)` |

### 🔑 Kaise Dekhe

1. Constraint padh
2. Kitne operations chal sakte hain calculate kar — **1 second = ~10^8 ops**
3. Us hisaab se approach choose kar

**Example:**
- `n = 10^5` → `10^5 × log(10^5) ≈ 1.7 × 10^6` ops ✅
- `n = 10^5` → `10^5 × 10^5 = 10^10` ops ❌ TLE

</div>

---

## <span style="color:#FF4500">💾 SPACE COMPLEXITY ANALYSIS</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Space Complexity** = **Extra space** jo algorithm use karta hai (input nahi count hota).

### 🔹 Types

| Complexity | Matlab | Example |
|:---|:---|:---|
| `O(1)` | Constant — fixed extra space | Swap variables |
| `O(log n)` | Recursion depth (balanced) | Binary search |
| `O(n)` | Linear extra space | New array |
| `O(n²)` | 2D array | DP table |

### 🔹 Kyun Count Kare?

- **Recursion stack** count karo
- **New arrays/objects** count karo
- **Input** count nahi hota (by convention)
- **Output** count nahi hota (usually)

### 🔹 Example

```javascript
function sum(arr) {
  let total = 0;         // O(1) space
  for (let x of arr) total += x;
  return total;
}
// Space: O(1)

function copy(arr) {
  let newArr = [...arr]; // O(n) space
  return newArr;
}
// Space: O(n)
```

</div>

---

## <span style="color:#00CED1">📐 HOW TO ANALYZE — STEP BY STEP</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

### 🔹 Step 1: Loops Dekho

```javascript
for (let i = 0; i < n; i++) {        // O(n)
  for (let j = 0; j < n; j++) {      // O(n)
    // O(1) kaam
  }
}
// Total: O(n²)
```

### 🔹 Step 2: Halving Dekho → Log

```javascript
for (let i = n; i > 0; i /= 2) {     // O(log n)
  // O(1) kaam
}
```

### 🔹 Step 3: Recursion Dekho

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}
// T(n) = T(n-1) + T(n-2) + O(1) → O(2^n)
```

### 🔹 Step 4: Nested Mix

```javascript
for (let i = 0; i < n; i++) {        // O(n)
  for (let j = i; j < n; j++) {      // O(n) — total n(n+1)/2
    // O(1)
  }
}
// Total: O(n²)
```

</div>

---

## <span style="color:#FF69B4">📐 MASTER THEOREM (For Divide & Conquer)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

Jab bhi recursion me **problem ko tod ke solve** kare, Master Theorem use hoti hai:

```
T(n) = a·T(n/b) + O(n^d)

Jahan:
- a = kitne subproblems
- b = har subproblem ka size
- d = combine karne ka cost
```

### 🔹 Cases

| Condition | Complexity |
|:---|:---|
| `d < log_b(a)` | `O(n^(log_b(a)))` |
| `d = log_b(a)` | `O(n^d · log n)` |
| `d > log_b(a)` | `O(n^d)` |

### 🔹 Merge Sort Example

```
T(n) = 2·T(n/2) + O(n)
       ↑      ↑        ↑
       2 halves       merging
       
a=2, b=2, d=1
log_b(a) = log_2(2) = 1 = d
→ Case 2: O(n · log n)
```

</div>

---

## <span style="color:#32CD32">🎯 AMORTIZED ANALYSIS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**Amortized** = **"Average per operation, worst case ke across"**.

### 🔹 Classic Example — Dynamic Array (JS `push`)

- **Kabhi** `push` **O(1)** hota hai
- **Kabhi** `push` **O(n)** hota hai (jab resize hota hai)

Lekin **n pushes ka total** = `O(n)`.  
Isliye **amortized** = `O(n) / n = O(1)` per push.

### 🔹 Rule

> **Amortized complexity** = Total cost across **n operations** ÷ n.

Ye worst-case per operation se alag hota hai. Dynamic arrays, hashmap insertion, union-find — sab amortized analysis use karte hain.

</div>

---

## <span style="color:#FF8C00">🔍 PRACTICE — COMPLEXITY NIKALO</span>

<div style="background-color:#2d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF8C00;">

| Code | Complexity |
|:---|:---:|
| `for i=0..n: arr[i]` | `O(n)` |
| `for i=0..n: for j=0..n: swap` | `O(n²)` |
| `for i=n; i>0; i/=2: print` | `O(log n)` |
| `merge sort` | `O(n log n)` |
| `binary search` | `O(log n)` |
| `for i=0..n: for j=i..n: print` | `O(n²)` |
| `for i=0..n: for j=0..n/2: print` | `O(n²)` |
| `for i=1; i<n; i*=2: for j=0..n: print` | `O(n log n)` |
| `for i=0..n: for j=0..n: for k=0..n: print` | `O(n³)` |
| Recursive Fibonacci | `O(2^n)` |
| Recursive factorial | `O(n)` |
| Recursive merge sort | `O(n log n)` |

</div>

---

---

# <span style="color:#FF6347">📚 PART 2 — BINARY SEARCH</span>

## <span style="color:#1E90FF">🌳 BINARY SEARCH KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Binary Search** ek **search algorithm** hai jo **sorted array** me `O(log n)` me element dhundhta hai.

**Idea:** Har step pe **search space ko aadha** kar do.

**Prerequisite:** Array **sorted** honi chahiye (ya monotonic function ho).

**Real life example:**

- 📖 Dictionary me word dhundhna — beech me kholo, aage ya peeche jao
- 📚 Library me book — same tarika
- 🎮 Guess the number game — har baar "upar ya neeche"

</div>

---

## <span style="color:#32CD32">⚡ BASIC BINARY SEARCH — CODE</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

```javascript
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

**Time:** `O(log n)` · **Space:** `O(1)`

</div>

---

## <span style="color:#FFD700">📐 VISUAL TRACE</span>

```text
nums = [1, 3, 5, 7, 9, 11, 13, 15],  target = 7

left=0, right=7, mid=3 → nums[3]=7 ✅ Found!

nums = [1, 3, 5, 7, 9, 11, 13, 15],  target = 9

left=0, right=7, mid=3 → nums[3]=7 < 9 → left=4
left=4, right=7, mid=5 → nums[5]=11 > 9 → right=4
left=4, right=4, mid=4 → nums[4]=9 ✅ Found!

Har step pe search space aadha ho raha
```

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Search space ka size:**

```text
n → n/2 → n/4 → n/8 → ... → 1

Kitne steps? log₂(n)
Isliye: O(log n)
```

</div>

---

## <span style="color:#9370DB">🔑 BINARY SEARCH KE 3 TEMPLATES</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

### Template 1 — Classic (`left <= right`)

**Kab use:** Exact element dhundhna.

```javascript
let left = 0, right = n - 1;
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}
return -1;
```

### Template 2 — Lower Bound (`left < right`)

**Kab use:** Pehla element jo condition satisfy kare.

```javascript
let left = 0, right = n;
while (left < right) {
  let mid = Math.floor((left + right) / 2);
  if (condition(mid)) right = mid;
  else left = mid + 1;
}
return left;
```

### Template 3 — Upper Bound

**Kab use:** Last element jo condition satisfy kare.

```javascript
let left = 0, right = n;
while (left < right) {
  let mid = Math.floor((left + right + 1) / 2);
  if (condition(mid)) left = mid;
  else right = mid - 1;
}
return left;
```

</div>

---

## <span style="color:#FF4500">🎯 BINARY SEARCH PATTERNS</span>

### <span style="color:#FFD700">Pattern 1 — Lower Bound / First Occurrence</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use:** Sorted array me target ka **pehla** occurrence dhundhna.

```javascript
function firstOccurrence(nums, target) {
  let left = 0, right = nums.length - 1, ans = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      ans = mid;
      right = mid - 1; // left me aur dhundho
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
}
```

**Visual:**
```text
nums = [1, 2, 2, 2, 3, 4],  target = 2

mid=2, nums[2]=2 ✅ ans=2, right=1
mid=0, nums[0]=1 < 2 → left=1
mid=1, nums[1]=2 ✅ ans=1, right=0
left=1 > right=0 → stop

Answer: 1 (first occurrence)
```

</div>

### <span style="color:#FFD700">Pattern 2 — Rotated Sorted Array</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**LC 33:** `[4, 5, 6, 7, 0, 1, 2]` — kahan rotate hua?

**Idea:** Ek side **hamesha sorted** hogi. Pehle identify karo kaunsi.

```javascript
function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // Left half sorted
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      // Right half sorted
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
```

**Visual:**
```text
nums = [4, 5, 6, 7, 0, 1, 2],  target = 0

mid=3, nums[3]=7
Left [4,5,6,7] sorted ✅
0 not in [4,7) → left = 4

mid=5, nums[5]=1
Left [0,1] sorted ✅
0 in [0,1) → right = 4

mid=4, nums[4]=0 ✅ Found!
```

</div>

### <span style="color:#FFD700">Pattern 3 — Find Peak / Find Min in Rotated</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**LC 153:** Rotated sorted array me minimum dhundho.

```javascript
function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}
```

**Idea:** Minimum **rotate point** pe hai. Compare `mid` vs `right`.

**LC 162:** Peak element dhundho.

```javascript
function findPeak(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}
```

</div>

### <span style="color:#FFD700">Pattern 4 — Binary Search on Answer ⭐</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Ye pattern sabse important hai** — bahut problems isi se solve hote hain.

**Idea:** Jab **answer ek range** me ho, aur tu check kar sake "ye answer possible hai ya nahi" — to binary search lagao answer pe.

### 🔹 Template

```javascript
function binarySearchOnAnswer() {
  let left = MIN_POSSIBLE, right = MAX_POSSIBLE;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (isValid(mid)) right = mid;   // ya left = mid+1
    else left = mid + 1;             // ya right = mid-1
  }
  return left;
}
```

### 🔹 Example: Koko Eating Bananas (LC 875)

```javascript
function minEatingSpeed(piles, h) {
  let left = 1, right = Math.max(...piles);

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (canFinish(piles, mid, h)) right = mid;
    else left = mid + 1;
  }
  return left;
}

function canFinish(piles, speed, h) {
  let hours = 0;
  for (let p of piles) hours += Math.ceil(p / speed);
  return hours <= h;
}
```

**Kaise soch:** "Minimum speed kya hogi jisse Koko finish kar sake?" — answer ek **range** me hai (1 se max(piles)). Har speed check kar sakte hain `O(n)` me. To **binary search on speed**.

### 🔹 Kab Use Kar

- "**Minimum/Maximum** X dhundho jisse condition satisfy ho"
- "**Kth smallest/largest** in a range"
- "**Capacity, speed, size** — kuch number dhundhna hai"
- "**Monotonic** — agar X possible hai, to X+1 bhi possible hai" (ya ulta)

</div>

---

## <span style="color:#00FA9A">💻 BINARY SEARCH — MUST-KNOW PROBLEMS</span>

| # | Problem | Pattern |
|:---:|:---|:---|
| **704** | Binary Search | Classic |
| **34** | First & Last Position | Lower/Upper bound |
| **33** | Search in Rotated Sorted Array | Rotated |
| **153** | Find Minimum in Rotated | Rotated |
| **162** | Find Peak Element | Peak |
| **875** | Koko Eating Bananas | BS on answer |
| **1011** | Capacity to Ship Packages | BS on answer |
| **410** | Split Array Largest Sum | BS on answer |
| **4** | Median of Two Sorted Arrays | BS on partition |
| **69** | Sqrt(x) | BS on answer |
| **74** | Search a 2D Matrix | BS on 2D |
| **240** | Search a 2D Matrix II | Staircase search |
| **278** | First Bad Version | BS on answer |
| **852** | Peak Index in Mountain | Peak |
| **658** | Find K Closest Elements | BS + window |

---

## <span style="color:#FF69B4">⚠️ COMMON BINARY SEARCH MISTAKES</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

| ❌ Galti | ✅ Sahi |
|:---|:---|
| `mid = (left+right)/2` overflow | `mid = left + (right-left)/2` (bade numbers) |
| `while (left < right)` with `left <= right` template | Consistent rakho |
| `left = mid` (kabhi infinite loop) | `left = mid + 1` ya `right = mid - 1` |
| Update dono taraf same | Ek taraf `mid+1`/`mid-1`, doosra `mid` |
| `left = mid + 1` aur `right = mid` galat mix | Template ke hisaab se |

### 🔑 Rule

> **`while (left <= right)`** → `mid+1`, `mid-1` dono taraf
> **`while (left < right)`** → ek taraf `mid`, doosra `mid±1`

</div>

---

---

# <span style="color:#FF6347">📚 PART 3 — SORTING</span>

## <span style="color:#1E90FF">🌳 SORTING KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Sorting** = Elements ko **ek specific order** me arrange karna (usually ascending/descending).

**Kyun important:**

- 🔍 Binary search ke liye prerequisite
- 📊 Data analysis me
- 🎯 Two pointers, greedy, etc. ke liye
- 💼 Intervals, meetings scheduling

**Kuch problems directly sorting pe based hote hain.**

</div>

---

## <span style="color:#32CD32">📊 SORTING ALGORITHMS — OVERVIEW</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Algorithm | Best | Average | Worst | Space | Stable? |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Bubble Sort** | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | ✅ |
| **Selection Sort** | `O(n²)` | `O(n²)` | `O(n²)` | `O(1)` | ❌ |
| **Insertion Sort** | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | ✅ |
| **Merge Sort** | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | ✅ |
| **Quick Sort** | `O(n log n)` | `O(n log n)` | ❌ `O(n²)` | `O(log n)` | ❌ |
| **Heap Sort** | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` | ❌ |
| **Counting Sort** | `O(n + k)` | `O(n + k)` | `O(n + k)` | `O(k)` | ✅ |
| **Radix Sort** | `O(d(n+b))` | `O(d(n+b))` | `O(d(n+b))` | `O(n + b)` | ✅ |

</div>

---

## <span style="color:#FFD700">🔍 BUBBLE SORT</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Bagal wale elements compare karo, bade ko right push karo. Har pass me **max end me** chala jata hai.

```javascript
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // optimization
  }
  return arr;
}
```

**Visual:**
```text
[5, 3, 8, 4, 2]

Pass 1: 5>3 swap, 5>8 no, 8>4 swap, 8>2 swap
        [3, 5, 4, 2, 8] ← 8 sorted

Pass 2: [3, 4, 2, 5, 8] ← 5 sorted
Pass 3: [3, 2, 4, 5, 8] ← 4 sorted
Pass 4: [2, 3, 4, 5, 8] ← Done
```

**Kab use:** Practically **kabhi nahi** — sirf seekhne ke liye.

</div>

---

## <span style="color:#FFD700">🔍 SELECTION SORT</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Har pass me **minimum** dhundho aur start me swap karo.

```javascript
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
```

**Visual:**
```text
[5, 3, 8, 4, 2]

Pass 1: min=2 (idx 4) → swap with 5 → [2, 3, 8, 4, 5]
Pass 2: min=3 (idx 1) → already at idx 1
Pass 3: min=4 (idx 3) → swap with 8 → [2, 3, 4, 8, 5]
Pass 4: min=5 (idx 4) → swap with 8 → [2, 3, 4, 5, 8]
```

**Property:** Har pass me **exactly ek** swap hota hai (agar chahiye).

</div>

---

## <span style="color:#FFD700">🔍 INSERTION SORT</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Cards ko haath me sort karne jaisa. Har naya element apni sahi jagah me **insert** karo.

```javascript
function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```

**Visual:**
```text
[5, 3, 8, 4, 2]

i=1: key=3 → 5>3 shift → [3, 5, 8, 4, 2]
i=2: key=8 → 5<8 stop → [3, 5, 8, 4, 2]
i=3: key=4 → 8>4, 5>4 shift → [3, 4, 5, 8, 2]
i=4: key=2 → 8>2, 5>2, 4>2, 3>2 shift → [2, 3, 4, 5, 8]
```

**Best use:** **Chhote arrays** ke liye (n < 10). Practically fast (constant factors low).

</div>

---

## <span style="color:#FFD700">🔍 MERGE SORT ⭐</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Divide & Conquer — array ko aadha karo, dono halves sort karo, phir **merge** karo.

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}
```

**Visual:**
```text
[5, 3, 8, 4, 2]

Divide:
[5, 3] [8, 4, 2]
[5] [3] [8] [4, 2]
            [4] [2]

Merge:
[3, 5] [8] [2, 4]
[3, 5] [2, 4, 8]
[2, 3, 4, 5, 8]
```

**Fayde:**
- Guaranteed `O(n log n)` — worst case bhi
- Stable
- Linked List sort karne me best

**Nuksan:** Extra `O(n)` space.

</div>

---

## <span style="color:#FFD700">🔍 QUICK SORT ⭐</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Pivot choose karo, chhote left me, bade right me. Phir recursion.

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

**Visual:**
```text
[5, 3, 8, 4, 2], pivot = 2 (last)

i=-1
j=0: 5>2 → skip
j=1: 3>2 → skip
j=2: 8>2 → skip
j=3: 4>2 → skip

Swap pivot with arr[i+1] = arr[0]:
[2, 3, 8, 4, 5], pivotIdx=0

Left: [] (empty), Right: [3, 8, 4, 5]
Recurse...
```

**Fayde:**
- In-place — `O(log n)` stack
- Practically fastest (constant factors low)
- Cache friendly

**Nuksan:**
- Worst case `O(n²)` (already sorted + bad pivot)
- Unstable

**Pivot Randomize Karo:** Random pivot choose karo worst case avoid karne ke liye.

</div>

---

## <span style="color:#FFD700">🔍 COUNTING SORT</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Non-comparison sort — **frequency count** karo, phir order me output.

**Kab use:** Small range of integers.

```javascript
function countingSort(arr) {
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  let range = max - min + 1;
  let count = new Array(range).fill(0);

  for (let x of arr) count[x - min]++;

  let result = [];
  for (let i = 0; i < range; i++) {
    while (count[i]--) result.push(i + min);
  }
  return result;
}
```

**Time:** `O(n + k)` jahan `k` = range  
**Space:** `O(k)`

**Example:** `[4, 2, 2, 8, 3, 3, 1]` → sorted → `[1, 2, 2, 3, 3, 4, 8]`

**Nuksan:** Range bada ho to space bahut lagega.

</div>

---

## <span style="color:#FFD700">🔍 RADIX SORT</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Idea:** Digit by digit sort karo — LSD (least significant digit) se.

**Example:** `[170, 45, 75, 90, 802, 24, 2, 66]`

```text
Sort by 1s digit: [170, 90, 802, 2, 24, 45, 75, 66]
Sort by 10s:      [802, 2, 24, 45, 66, 170, 75, 90]
Sort by 100s:     [2, 24, 45, 66, 75, 90, 170, 802]
```

**Time:** `O(d × (n + b))`  
**Space:** `O(n + b)`  
**Stable:** ✅ (sub-sort counting sort use karte hain)

**Kab use:** Bade range ke numbers, but fixed number of digits.

</div>

---

## <span style="color:#FF69B4">🎯 SORTING ALGORITHM CHOOSE KARNE KA RULE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

| Scenario | Best Choice |
|:---|:---|
| **Chhota array** (n < 10) | Insertion Sort |
| **General purpose** | Quick Sort ya Merge Sort |
| **Guaranteed O(n log n)** | Merge Sort ya Heap Sort |
| **In-place chahiye** | Quick Sort ya Heap Sort |
| **Stable chahiye** | Merge Sort, Counting Sort |
| **Small range integers** | Counting Sort |
| **Bade range, fixed digits** | Radix Sort |
| **Linked List** | Merge Sort |
| **Memory limited** | Heap Sort (`O(1)` space) |

</div>

---

## <span style="color:#32CD32">🔍 SEARCHING — LINEAR vs BINARY</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Linear Search

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

**Time:** `O(n)` · **Space:** `O(1)`  
**Kab:** Unsorted array, small array

### 🔹 Binary Search

```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

**Time:** `O(log n)` · **Space:** `O(1)`  
**Kab:** Sorted array

### 🔹 Jump Search

**Idea:** `√n` steps me jump karo, phir linear.

**Time:** `O(√n)`  
**Kab:** Sorted array, binary search se slow.

### 🔹 Interpolation Search

**Idea:** Value ke hisaab se position estimate karo.

**Time:** `O(log log n)` (uniform distribution)  
**Kab:** Uniformly distributed data.

</div>

---

## <span style="color:#00FA9A">💻 SORTING — MUST-KNOW LEETCODE PROBLEMS</span>

| # | Problem | Concept |
|:---:|:---|:---|
| **912** | Sort an Array | Any sort |
| **75** | Sort Colors | Dutch flag |
| **56** | Merge Intervals | Sort + merge |
| **57** | Insert Interval | Sort + merge |
| **179** | Largest Number | Custom sort |
| **215** | Kth Largest Element | Quick select / Heap |
| **973** | K Closest Points | Sort / Heap |
| **148** | Sort List | Merge sort on LL |
| **88** | Merge Sorted Array | Two pointer |
| **349** | Intersection of Two Arrays | Set / Sort |
| **350** | Intersection II | Hash / Sort |
| **274** | H-Index | Sort |
| **164** | Maximum Gap | Bucket / Radix |
| **493** | Reverse Pairs | Merge sort variant |

---

## <span style="color:#FF4500">🔑 QUICK SELECT (Kth Element in O(n))</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Quick Sort ka partition use karo — sirf ek side me jao.

```javascript
function findKthLargest(nums, k) {
  k = nums.length - k; // kth largest = (n-k)th smallest
  return quickSelect(nums, 0, nums.length - 1, k);
}

function quickSelect(nums, left, right, k) {
  let pivot = nums[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[right]] = [nums[right], nums[i]];

  if (i === k) return nums[i];
  if (i < k) return quickSelect(nums, i + 1, right, k);
  return quickSelect(nums, left, i - 1, k);
}
```

**Average:** `O(n)` · **Worst:** `O(n²)`

**Kyun O(n) average?** Kyunki hum sirf **ek side** me jaate hain (quick sort me dono).

`T(n) = T(n/2) + O(n) = O(n)`

</div>

---

## <span style="color:#32CD32">🎯 FINAL SUMMARY — DEEP FOUNDATION + BINARY SEARCH + SORTING</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

1. 🔹 **Constraints padh** → complexity pata chal jayegi
2. 🔹 **1 second = 10^8 operations** — thumb rule
3. 🔹 **Binary search** = `O(log n)`, sorted array me
4. 🔹 **3 templates** — classic, lower bound, upper bound
5. 🔹 **Binary search on answer** — sabse powerful pattern
6. 🔹 **Sorting** — Merge (stable, guaranteed), Quick (fastest avg), Heap (in-place)
7. 🔹 **Counting/Radix** — non-comparison, specific cases
8. 🔹 **Quick Select** — Kth element in `O(n)` average
9. 🔹 **Master Theorem** — divide & conquer ke liye

> 💡 **REMEMBER:** 
> - **Binary search** = "sorted" + "O(log n)"  
> - **Sorting** = "pehle sort karo, phir solve karo" — ye trick 30% problems me chalti hai  
> - **Constraints** padhna = 50% problem solved

</div>
```
