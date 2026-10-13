# 🌈 ARRAYS + STRINGS + HASHING — DEEP FOUNDATION NOTES 🌈

---

## <span style="color:#FF6347">📚 PART 1 — ARRAYS</span>

### <span style="color:#1E90FF">🌳 WHAT IS AN ARRAY?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

Array ek **contiguous memory** me store kiya gaya **fixed-size** collection hai, jisme **same type** ke elements hote hain.

**Key properties:**

- 🔹 **Indexed** — 0-based indexing (JS me)
- 🔹 **Contiguous memory** — elements ek dusre ke bagal me
- 🔹 **Random access** — `arr[i]` se O(1) me access
- 🔹 **Fixed size** (C/C++ me) — JS me dynamic hai (internally resize hota hai)

</div>

### <span style="color:#32CD32">⚡ ARRAY ME KYA KAR SAKTE HAIN (Operations)</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Operation                   | Syntax                  | Time Complexity  |
| :-------------------------- | :---------------------- | :--------------: |
| **Access**                  | `arr[i]`                |      `O(1)`      |
| **Update**                  | `arr[i] = x`            |      `O(1)`      |
| **Push (end me add)**       | `arr.push(x)`           | `O(1)` amortized |
| **Pop (end se remove)**     | `arr.pop()`             |      `O(1)`      |
| **Unshift (start me add)**  | `arr.unshift(x)`        |    ❌ `O(n)`     |
| **Shift (start se remove)** | `arr.shift()`           |    ❌ `O(n)`     |
| **Insert at index**         | `arr.splice(i, 0, x)`   |    ❌ `O(n)`     |
| **Delete at index**         | `arr.splice(i, 1)`      |    ❌ `O(n)`     |
| **Search (value)**          | `arr.indexOf(x)`        |    ❌ `O(n)`     |
| **Slice (subarray)**        | `arr.slice(start, end)` |      `O(k)`      |
| **Concat**                  | `arr.concat(other)`     |    `O(n + m)`    |
| **Sort**                    | `arr.sort()`            |   `O(n log n)`   |
| **Reverse**                 | `arr.reverse()`         |      `O(n)`      |

### 🔑 Yaad Rakhne Ka Rule

> **End me kaam fast (`O(1)`), Start/Middle me kaam slow (`O(n)`).**  
> Kyunki start/middle me elements shift karne padte hain.

</div>

---

### <span style="color:#FFD700">📐 ARRAY KA MEMORY LAYOUT</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

```text
Array: [10, 20, 30, 40, 50]
Index:  0   1   2   3   4

Memory:
┌────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │ 50 │
└────┴────┴────┴────┴────┘
  ↑
  1000  (base address)

Formula: address(arr[i]) = base + i * size_of_element
```

\*/

**Random access `O(1)` kyun?**  
Kyunki formula se direct address calculate ho jata hai — koi traversal nahi.

</div>

---

### <span style="color:#9370DB">🎯 ARRAY KE COMMON PATTERNS (Interview Ke Liye)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

Ye 6 patterns **80% array problems** cover karte hain:

|  #  | Pattern                 | Kab Use                 | Example Problems                 |
| :-: | :---------------------- | :---------------------- | :------------------------------- |
|  1  | **Two Pointers**        | Sorted array, pair sum  | Two Sum II, Container with Water |
|  2  | **Sliding Window**      | Subarray with condition | Max subarray, Longest substring  |
|  3  | **Prefix Sum**          | Range sum queries       | Subarray sum = k                 |
|  4  | **Kadane's Algorithm**  | Max subarray sum        | Maximum Subarray                 |
|  5  | **Dutch National Flag** | 3-way partition         | Sort Colors                      |
|  6  | **Binary Search**       | Sorted array search     | Rotated array, Peak element      |

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 1 — TWO POINTERS</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Sorted array me pair dhundhna, palindrome check, container problems.

**Idea:** Do pointers — ek start se, ek end se. Condition ke hisaab se move karo.

```javascript
function twoSum(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}
```

**Time:** `O(n)` · **Space:** `O(1)`

**Visual:**

```text
nums = [1, 3, 5, 7, 9],  target = 12

left=0, right=4: 1+9=10 < 12 → left++
left=1, right=4: 3+9=12 ✅ Found!
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 2 — SLIDING WINDOW</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Subarray / substring me max/min/longest/shortest dhundhna.

**Idea:** Window ko grow/shrink karte jao condition ke hisaab se.

```javascript
function maxSumSubarray(nums, k) {
  let windowSum = 0,
    maxSum = 0;
  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];
    if (i >= k) windowSum -= nums[i - k];
    if (i >= k - 1) maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
```

**Time:** `O(n)` · **Space:** `O(1)`

**Visual:**

```text
nums = [2, 1, 5, 1, 3, 2],  k = 3

Window slides:
[2, 1, 5] → sum = 8
   [1, 5, 1] → sum = 7
      [5, 1, 3] → sum = 9 ✅
         [1, 3, 2] → sum = 6
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 3 — PREFIX SUM</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Range sum queries, subarray sum = k.

**Idea:** `prefix[i] = sum of arr[0..i-1]`  
Isse range sum `O(1)` me nikal sakte ho.

```javascript
// prefix[i] = sum of first i elements
let prefix = [0];
for (let x of nums) prefix.push(prefix[prefix.length - 1] + x);

// Range sum [l, r] = prefix[r+1] - prefix[l]
function rangeSum(l, r) {
  return prefix[r + 1] - prefix[l];
}
```

**Visual:**

```text
nums   = [3, 1, 4, 1, 5]
prefix = [0, 3, 4, 8, 9, 14]

Sum of nums[1..3] = prefix[4] - prefix[1] = 9 - 3 = 6 ✅
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 4 — KADANE'S ALGORITHM</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Maximum subarray sum (contiguous).

**Idea:** Har index pe decide karo — "current element se naya start karu, ya previous me jodu?"

```javascript
function maxSubarray(nums) {
  let curr = nums[0],
    max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    max = Math.max(max, curr);
  }
  return max;
}
```

**Time:** `O(n)` · **Space:** `O(1)`

**Visual:**

```text
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

curr: -2  1  -2  4   3  5  6   1  5
max:  -2  1   1  4   4  5  6   6  6

Answer: 6  (subarray: [4, -1, 2, 1])
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 5 — DUTCH NATIONAL FLAG (3-Way Partition)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Array me 3 groups me partition karna (jaise 0s, 1s, 2s).

**Idea:** 3 pointers — `low`, `mid`, `high`. Ek pass me sort.

```javascript
function sortColors(nums) {
  let low = 0,
    mid = 0,
    high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}
```

**Visual:**

```text
[2, 0, 1, 2, 0, 1]
 ↑           ↑
low,mid     high

After sort: [0, 0, 1, 1, 2, 2]
```

</div>

---

### <span style="color:#00FA9A">💻 ARRAY — MUST-KNOW LEETCODE PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

|    #    | Problem                      | Pattern              |
| :-----: | :--------------------------- | :------------------- |
|  **1**  | Two Sum                      | HashMap              |
| **121** | Best Time to Buy/Sell Stock  | Kadane               |
| **53**  | Maximum Subarray             | Kadane               |
| **15**  | 3Sum                         | Two Pointers         |
| **11**  | Container with Most Water    | Two Pointers         |
| **283** | Move Zeroes                  | Two Pointers         |
| **75**  | Sort Colors                  | Dutch Flag           |
| **560** | Subarray Sum = K             | Prefix Sum + HashMap |
| **238** | Product of Array Except Self | Prefix + Suffix      |
| **41**  | First Missing Positive       | Cyclic Sort          |
| **42**  | Trapping Rain Water          | Two Pointers         |
| **128** | Longest Consecutive Sequence | HashSet              |

</div>

---

---

## <span style="color:#FF6347">📚 PART 2 — STRINGS</span>

### <span style="color:#1E90FF">🌳 STRING KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

String **characters ka sequence** hai. JS me string **immutable** hai — matlab change nahi kar sakte. Naya string ban jata hai.

**Important properties:**

- 🔹 **Immutable** — `str[i] = 'x'` kaam nahi karega
- 🔹 **Indexed** — `str[i]` se access
- 🔹 **Iterable** — `for...of` chalta hai
- 🔹 **Comparable** — `<`, `>`, `===` sab kaam karte hain

</div>

### <span style="color:#32CD32">⚡ STRING OPERATIONS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Operation       | Syntax                             |    Time    |
| :-------------- | :--------------------------------- | :--------: |
| **Access char** | `str[i]`                           |   `O(1)`   |
| **Length**      | `str.length`                       |   `O(1)`   |
| **Concatenate** | `str1 + str2`                      | `O(n + m)` |
| **Substring**   | `str.slice(i, j)`                  |   `O(k)`   |
| **Search**      | `str.indexOf(x)`                   |   `O(n)`   |
| **Split**       | `str.split("")`                    |   `O(n)`   |
| **Join**        | `arr.join("")`                     |   `O(n)`   |
| **Reverse**     | `str.split("").reverse().join("")` |   `O(n)`   |
| **Char code**   | `str.charCodeAt(i)`                |   `O(1)`   |
| **From code**   | `String.fromCharCode(c)`           |   `O(1)`   |

### 🔑 Yaad Rakh

> **String immutable hai. Har "change" actually naya string banata hai — `O(n)`.**

Isliye loop me string me character add karna **O(n²)** ban jaata hai. **Array of chars** use karo, phir join karo.

</div>

---

### <span style="color:#FFD700">🎯 STRING KE COMMON PATTERNS</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

|  #  | Pattern            | Kab Use                             |
| :-: | :----------------- | :---------------------------------- |
|  1  | **Two Pointers**   | Palindrome check, reverse           |
|  2  | **Sliding Window** | Longest substring without repeating |
|  3  | **HashMap**        | Anagrams, character count           |
|  4  | **Sorting**        | Group anagrams                      |
|  5  | **KMP**            | Pattern matching                    |
|  6  | **Trie**           | Prefix matching                     |

</div>

---

### <span style="color:#FF4500">🔍 PATTERN — PALINDROME CHECK</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

```javascript
function isPalindrome(s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

**Time:** `O(n)` · **Space:** `O(1)`

**Visual:**

```text
s = "racecar"
     ↑     ↑
    left  right

r==r ✅, a==a ✅, c==c ✅, e center
→ Palindrome ✅
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN — LONGEST SUBSTRING WITHOUT REPEATING</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Sliding window + HashMap (last index of char).

```javascript
function lengthOfLongestSubstring(s) {
  let map = new Map();
  let max = 0,
    left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
```

**Time:** `O(n)` · **Space:** `O(min(n, alphabet))`

**Visual:**

```text
s = "abcabcbb"

right=0: a → window "a", max=1
right=1: b → window "ab", max=2
right=2: c → window "abc", max=3
right=3: a → duplicate! left=1, window "bca"
...
Answer: 3
```

</div>

---

### <span style="color:#00FA9A">💻 STRING — MUST-KNOW PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

|    #    | Problem                         | Pattern              |
| :-----: | :------------------------------ | :------------------- |
| **125** | Valid Palindrome                | Two Pointers         |
|  **5**  | Longest Palindromic Substring   | Expand Around Center |
|  **3**  | Longest Substring w/o Repeating | Sliding Window       |
| **242** | Valid Anagram                   | HashMap              |
| **49**  | Group Anagrams                  | HashMap + Sort       |
| **14**  | Longest Common Prefix           | Vertical Scan        |
| **28**  | Find Index of First Occurrence  | KMP                  |
| **76**  | Minimum Window Substring        | Sliding Window       |
| **20**  | Valid Parentheses               | Stack                |
| **344** | Reverse String                  | Two Pointers         |
| **151** | Reverse Words in String         | Split + Reverse      |

</div>

---

---

## <span style="color:#FF6347">📚 PART 3 — HASHING (HashMap / HashSet)</span>

### <span style="color:#1E90FF">🌳 HASHING KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Hashing** ek technique hai jisme **key** ko **hash function** se **index** me convert karte hain, aur us index pe value store karte hain.

**Purpose:** `O(1)` me **lookup, insert, delete**.

**JS me:**

- `Map` — key-value pairs (kisi bhi type ki key)
- `Set` — unique values
- `Object` — basic key-value (string keys only)

</div>

---

### <span style="color:#32CD32">⚡ MAP vs SET vs OBJECT</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Feature       | Map                       | Set             | Object                 |
| :------------ | :------------------------ | :-------------- | :--------------------- |
| **Stores**    | Key-Value pairs           | Unique values   | Key-Value              |
| **Key type**  | Any (number, string, obj) | —               | String/Symbol only     |
| **Order**     | Insertion order           | Insertion order | Not guaranteed         |
| **Size**      | `map.size`                | `set.size`      | `Object.keys().length` |
| **Iteration** | `for...of`                | `for...of`      | `for...in`             |
| **Lookup**    | `map.get(k)`              | `set.has(v)`    | `obj[k]`               |
| **Insert**    | `map.set(k, v)`           | `set.add(v)`    | `obj[k] = v`           |
| **Delete**    | `map.delete(k)`           | `set.delete(v)` | `delete obj[k]`        |
| **Has**       | `map.has(k)`              | `set.has(v)`    | `k in obj`             |

### 🔑 Yaad Rakh

> **Map better hai Object se** — kyunki:
>
> - Koi bhi type key ban sakti hai
> - Insertion order maintained
> - Frequent add/delete me fast
> - `size` property direct

</div>

---

### <span style="color:#FFD700">📐 HASHING KA INTERNAL KAAM</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

```text
Key: "apple"
     ↓
Hash function: hash("apple") → 42
     ↓
Bucket index: 42 % 10 = 2
     ↓
Store at bucket[2]
```

**Collision:** Jab do keys ka same hash index aaye.  
**Solution:** Chaining (linked list) ya Open Addressing.

**JS me Map/Set internally sophisticated hash table use karte hain.**

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 1 — FREQUENCY COUNT</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Character counts, anagram check, majority element.

```javascript
function charCount(s) {
  let map = new Map();
  for (let ch of s) {
    map.set(ch, (map.get(ch) || 0) + 1);
  }
  return map;
}
```

**Visual:**

```text
s = "hello"
map = { h:1, e:1, l:2, o:1 }
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 2 — TWO SUM (HASHMAP)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Har element pe check karo — "kya target - current map me hai?"

```javascript
function twoSum(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}
```

**Time:** `O(n)` · **Space:** `O(n)`

**Visual:**

```text
nums = [2, 7, 11, 15], target = 9

i=0: need=7, map={2:0}
i=1: need=2, map has 2? ✅ → return [0, 1]
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 3 — GROUP ANAGRAMS</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Har string ko sort karke **key** banao. Same key wale ek group me.

```javascript
function groupAnagrams(strs) {
  let map = new Map();
  for (let s of strs) {
    let key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}
```

**Visual:**

```text
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

Sorted keys:
eat → "aet"
tea → "aet"  ← same
tan → "ant"
ate → "aet"  ← same
nat → "ant"  ← same
bat → "abt"

Groups: [eat, tea, ate], [tan, nat], [bat]
```

</div>

---

### <span style="color:#FF4500">🔍 PATTERN 4 — SUBARRAY SUM = K (Prefix Sum + HashMap)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** `prefix[j] - prefix[i] = k` matlab `prefix[i] = prefix[j] - k`.  
Har step pe check karo — "kya `prefix[j] - k` map me hai?"

```javascript
function subarraySum(nums, k) {
  let map = new Map();
  map.set(0, 1); // empty prefix
  let sum = 0,
    count = 0;
  for (let x of nums) {
    sum += x;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}
```

**Time:** `O(n)` · **Space:** `O(n)`

</div>

---

### <span style="color:#00FA9A">💻 HASHING — MUST-KNOW PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

|    #    | Problem                      | Pattern                  |
| :-----: | :--------------------------- | :----------------------- |
|  **1**  | Two Sum                      | HashMap                  |
| **217** | Contains Duplicate           | HashSet                  |
| **242** | Valid Anagram                | HashMap                  |
| **49**  | Group Anagrams               | HashMap + Sort           |
| **347** | Top K Frequent               | HashMap + Heap           |
| **128** | Longest Consecutive Sequence | HashSet                  |
| **560** | Subarray Sum = K             | Prefix + HashMap         |
|  **3**  | Longest Substring            | HashMap + Sliding Window |
| **387** | First Unique Character       | HashMap                  |
| **205** | Isomorphic Strings           | Two HashMaps             |

</div>

---

---

## <span style="color:#FF6347">📊 DEEP FOUNDATION — TIME & SPACE COMPLEXITY (Incremental)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

Ye **har problem** me apply hoga — yaad rakh:

### 🔹 Complexity Cheat Sheet

| Complexity   | Naam         | Example                      |
| :----------- | :----------- | :--------------------------- |
| `O(1)`       | Constant     | Array access, HashMap lookup |
| `O(log n)`   | Logarithmic  | Binary search, Heap          |
| `O(n)`       | Linear       | Single loop                  |
| `O(n log n)` | Linearithmic | Sorting                      |
| `O(n²)`      | Quadratic    | Nested loops                 |
| `O(2^n)`     | Exponential  | Subsets, backtracking        |
| `O(n!)`      | Factorial    | Permutations                 |

### 🔹 Constraints Se Pata Chalta Hai

| Constraint | Kaunsa Complexity Chalega |
| :--------: | :------------------------ |
|  `n ≤ 10`  | `O(2^n)`, `O(n!)`         |
|  `n ≤ 20`  | `O(2^n)`                  |
| `n ≤ 100`  | `O(n³)`                   |
| `n ≤ 1000` | `O(n²)`                   |
| `n ≤ 10^5` | `O(n log n)`, `O(n)`      |
| `n ≤ 10^9` | `O(log n)`, `O(1)`        |

### 🔹 Space Complexity

- **Auxiliary space** — extra space liya
- **Input space** — input ne liya (usually count nahi hota)
- Recursion **stack space** count karo
- String operations **naya string** banate hain — `O(n)`

</div>

---

## <span style="color:#32CD32">🎯 FINAL SUMMARY — ARRAYS + STRINGS + HASHING</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

1. 🔹 **Array** — Contiguous, `O(1)` access, `O(n)` insert/delete
2. 🔹 **String** — Immutable, similar to array but slower modifications
3. 🔹 **HashMap/Set** — `O(1)` lookup, insert, delete
4. 🔹 **6 Array Patterns** — Two pointers, Sliding window, Prefix sum, Kadane, Dutch flag, Binary search
5. 🔹 **String Patterns** — Two pointers, Sliding window, HashMap, Sorting
6. 🔹 **Hashing Patterns** — Frequency, Two Sum, Group, Prefix sum
7. 🔹 **Constraints** padh ke **complexity** samajh aati hai
8. 🔹 **Ye teen** — Arrays, Strings, Hashing — **80% problems** me directly ya indirectly use hote hain

> 💡 **REMEMBER:** Arrays aur Strings me **index-based** sochna, Hashing me **key-based** sochna. Dono milkar bahut kuch solve karte hain.

</div>
```

---
