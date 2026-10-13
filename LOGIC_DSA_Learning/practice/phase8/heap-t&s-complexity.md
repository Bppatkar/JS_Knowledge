# ⚡ HEAP - TIME & SPACE COMPLEXITY COMPLETE NOTES
### Author: Bhanu Pratap 

---

> **Ye notes directly maine `heap.js` aur `heap.md` se banaye hain.**
> Har function ka code + complexity + reason sab yahan hai.

---

## 📌 TABLE OF CONTENTS

1. [Heap Ki Height O(log n) Kyun Hoti Hai?](#heap-height)
2. [Helper Functions](#helper-functions)
3. [MinHeap - Insert + HeapifyUp](#insert)
4. [MinHeap - DeleteMin + HeapifyDown](#delete)
5. [MinHeap - Peek](#peek)
6. [MaxHeap vs MinHeap - Construction Complexity](#construction)
7. [Build Heap - O(n) Kyun?](#build-heap)
8. [Heap Sort - Pura Analysis](#heap-sort)
9. [Search in Heap - O(n) Kyun?](#search)
10. [Final Master Table](#final-table)
11. [Interview Trap Questions](#interview-traps)

---

<a name="heap-height"></a>
## 1️⃣ Heap Ki Height O(log n) Kyun Hoti Hai?

**Ye sabse pehle samjho — baaki sab isi par based hai.**

Heap ek **Complete Binary Tree** hota hai. Iska matlab:
- Har level **left se right** fill hota hai
- Beech mein koi gap nahi hota

Toh levels mein nodes ka pattern dekhte hain:

```
Level 0  →   1 node    (2^0)
Level 1  →   2 nodes   (2^1)
Level 2  →   4 nodes   (2^2)
Level 3  →   8 nodes   (2^3)
```

Agar height `h` hai, toh total nodes:

```
n = 1 + 2 + 4 + ... + 2^h
n = 2^(h+1) - 1          ← Perfect tree formula
n ≈ 2^(h+1)              ← Approximation

Dono side log₂ lao:
log₂(n) ≈ h + 1
h ≈ log₂(n)
```

**Isliye koi bhi operation jo root ↔ leaf travel kare, woh O(log n) hoga.**

```
Example:
n = 16 nodes → height = log₂(16) = 4
n = 1000 nodes → height ≈ 10
n = 1,000,000 nodes → height ≈ 20
```

---

<a name="helper-functions"></a>
## 2️⃣ Helper Functions (MinHeap class se)

Teri `heap.js` mein ye helper functions hain:

```javascript
getLeftChildIndex(i)  { return (2 * i) + 1; }
getRightChildIndex(i) { return (2 * i) + 2; }
getParentIndex(i)     { return Math.floor((i - 1) / 2); }
```

### Complexity:

| Function | Time | Space | Reason |
|---|---|---|---|
| `getLeftChildIndex(i)` | **O(1)** | **O(1)** | Ek arithmetic operation - seedha return |
| `getRightChildIndex(i)` | **O(1)** | **O(1)** | Ek arithmetic operation - seedha return |
| `getParentIndex(i)` | **O(1)** | **O(1)** | Ek arithmetic + floor - seedha return |

**Kyun O(1)?**
In functions mein koi loop nahi, koi recursion nahi.
Ek formula lagao, value return karo. Input size se koi fark nahi padta.

---

<a name="insert"></a>
## 3️⃣ INSERT + HEAPIFY UP

### Code (teri `heap.js` se):

```javascript
insert(val) {
  this.heap.push(val);          // Step 1: end mein daalo
  let lastIndex = this.heap.length - 1;
  this.heapifyUp(lastIndex);    // Step 2: bubble up karo
}

heapifyUp(index) {
  while (index > 0) {
    let parentIndex = this.getParentIndex(index);
    if (this.heap[index] < this.heap[parentIndex]) {
      // swap
      [this.heap[index], this.heap[parentIndex]] = 
      [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;      // upar jao
    } else {
      break;                    // sahi jagah mil gayi
    }
  }
}
```

### Step-by-Step Visualization (Min Heap):

```
Heap hai: [5, 10, 20, 30]

        5
      /   \
    10     20
   /
  30

insert(1) karo → pehle end mein daalo:

        5
      /   \
    10     20
   /  \
  30    1

HeapifyUp start:
  index = 4, parent = (4-1)/2 = 1, heap[1] = 10
  1 < 10 → SWAP

        5
      /   \
     1     20
   /  \
  30   10

  index = 1, parent = (1-1)/2 = 0, heap[0] = 5
  1 < 5 → SWAP

        1
      /   \
     5     20
   /  \
  30   10

  index = 0, loop khatam (index > 0 false)

Final heap: [1, 5, 20, 30, 10]
```

### Complexity Analysis:

**Time Complexity: O(log n)**

- `push()` → O(1)
- `heapifyUp()` worst case: naya element root tak bubble up kare
- Root se leaf tak ki distance = **height of tree = log n**
- Toh maximum **log n swaps** honge
- **Worst Case:** Naya element sabse chota hai → pura leaf to root travel
- **Best Case:** O(1) → element apni jagah pehle level par hi fit ho jaye

**Space Complexity: O(1)**

- Koi extra array nahi bana
- Sirf kuch variables: `index`, `parentIndex` → constant space
- Heap array already given hai, usme hi kaam ho raha hai

---

<a name="delete"></a>
## 4️⃣ DELETE MIN + HEAPIFY DOWN

### Code (teri `heap.js` se):

```javascript
deleteMin() {
  if (this.heap.length === 0) return null;
  if (this.heap.length === 1) return this.heap.pop();

  let min = this.heap[0];                 // Step 1: root store karo
  let lastIndex = this.heap.length - 1;
  
  // Step 2: last element ko root par laao
  [this.heap[0], this.heap[lastIndex]] = 
  [this.heap[lastIndex], this.heap[0]];
  
  this.heap.pop();                        // Step 3: last hatao
  this.heapifyDown(0);                    // Step 4: root ko fix karo
  return min;
}

heapifyDown(i) {
  let leftChildIndex  = this.getLeftChildIndex(i);
  let rightChildIndex = this.getRightChildIndex(i);
  let smallest = i;
  let heapLength = this.heap.length;

  if (leftChildIndex < heapLength && 
      this.heap[leftChildIndex] < this.heap[smallest]) {
    smallest = leftChildIndex;
  }
  if (rightChildIndex < heapLength && 
      this.heap[rightChildIndex] < this.heap[smallest]) {
    smallest = rightChildIndex;
  }
  if (smallest !== i) {
    [this.heap[i], this.heap[smallest]] = 
    [this.heap[smallest], this.heap[i]];
    this.heapifyDown(smallest);    // recursive call
  }
}
```

### Step-by-Step Visualization:

```
Min Heap: [1, 4, 5, 10, 20]

        1
      /   \
     4     5
    / \
  10   20

deleteMin():
  Step 1: min = 1 (store karo)
  Step 2: last element (20) ko root par laao

        20
      /   \
     4     5
    /
  10

  Step 3: pop() (last removed)
  Step 4: heapifyDown(0)

  index=0: left=4(idx1), right=5(idx2)
  smallest child = 4 → SWAP 20 and 4

        4
      /   \
    20     5
    /
  10

  index=1: left=10(idx3), right=undefined
  10 < 20 → SWAP 20 and 10

        4
      /   \
    10     5
    /
  20

  index=3: no children → STOP

Final heap: [4, 10, 5, 20]
```

### Complexity Analysis:

**Time Complexity: O(log n)**

- `heap[0]` store karna → O(1)
- swap first and last → O(1)
- `pop()` → O(1)
- `heapifyDown()` worst case: root se leaf tak jaana = **height = log n**
- Har level par ek comparison + possible swap = O(1) per level
- Max levels = log n
- **Total: O(log n)**

**Space Complexity: O(log n) [Recursive version]**

- `heapifyDown` recursively call ho raha hai
- Recursion depth = height of tree = **log n**
- Call stack mein log n frames bante hain
- **Agar iterative heapifyDown likhte toh: O(1)**

> **Note:** Teri `heap.js` mein recursive `heapifyDown` hai, isliye technically **O(log n) space**. Lekin interviews mein standard answer **O(1)** acceptable hai.

---

<a name="peek"></a>
## 5️⃣ PEEK OPERATION

### Code (teri `heap.js` se):

```javascript
peek() {
  if (this.heap.length === 0) return null;
  return this.heap[0];    // seedha root return karo
}
```

### Complexity Analysis:

**Time Complexity: O(1)**

- Array ka index 0 access karna = direct memory access
- Koi loop nahi, koi comparison nahi, koi traversal nahi
- n chahe 10 ho ya 10 million — same 1 operation

**Space Complexity: O(1)**

- Koi extra variable bhi nahi practically
- Sirf value return ho rahi hai

**Kyun yeh possible hai?**

```
Min Heap property → Root HAMESHA minimum hoga
Max Heap property → Root HAMESHA maximum hoga

Toh seedha heap[0] return karo → O(1) guaranteed
```

---

<a name="construction"></a>
## 6️⃣ MAX HEAP vs MIN HEAP — BANANE KI COMPLEXITY

### MinHeap Class Constructor:

```javascript
class MinHeap {
  constructor() {
    this.heap = [];    // ya pre-filled array
  }
}
```

**Sirf constructor call karna:**

| Operation | Time | Space |
|---|---|---|
| `new MinHeap()` (empty) | O(1) | O(1) |
| `new MinHeap()` (pre-filled array ke saath) | O(1) | O(n) |

**Why O(n) space?**

Array mein `n` elements hain toh `n` memory slots chahiye. Yeh extra space nahi hai — yahi toh heap hai. Lekin construction operation ka space O(n) count hota hai kyunki data store ho raha hai.

---

### Heap Insert karke banao (Ek ek element dalo):

```javascript
// n elements ek ek insert karo
for (let val of arr) {
  heap.insert(val);     // har baar O(log n)
}
```

| Operation | Time | Space |
|---|---|---|
| n elements insert karna | **O(n log n)** | **O(n)** |

**Kyun O(n log n)?**
- n elements hain
- Har insert = O(log n)
- Total = n × log n = **O(n log n)**

---

### Heap Build karo (Optimized — Teri `heap.js` ka heapSort wala method):

```javascript
// leaf nodes skip karo, sirf parents ko heapify karo
for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
  heapifyDown(arr, i, n);
}
```

| Operation | Time | Space |
|---|---|---|
| Build Heap (optimized) | **O(n)** | **O(1)** |

**Kyun O(n)? → Next section mein detail se**

---

<a name="build-heap"></a>
## 7️⃣ BUILD HEAP — O(n) KYUN? (Interview Favourite!)

Yeh sabse important aur tricky part hai.

**Common galti:** Sab sochte hain O(n log n), **answer hai O(n)**

### Intuition:

Tree mein neeche ke nodes zyada hote hain, upar ke kam. Neeche wale nodes ko kam kaam karna padta hai (kam levels travel).

```
n = 16 node tree:

Level 3 (leaf):   8 nodes → 0 swaps needed
Level 2:          4 nodes → max 1 swap
Level 1:          2 nodes → max 2 swaps
Level 0 (root):   1 node  → max 3 swaps (= log n)
```

### Mathematical Proof:

```
Total work = (n/2)×0 + (n/4)×1 + (n/8)×2 + (n/16)×3 + ...

Simplify:
= 0 + n/4 + 2n/8 + 3n/16 + ...
= n × (1/4 + 2/8 + 3/16 + ...)
= n × Σ k/2^(k+1)  [k=1 to ∞]

Yeh series converge hoti hai:
Σ k/2^k = 2   (standard result)

Toh: Total work ≈ n × 1 = O(n)
```

### Visualization (n=7):

```
Teri heap.js mein:
for (let i = Math.floor(7/2) - 1; i >= 0; i--)
→ i = 2, 1, 0

        [4, 10, 3, 5, 1, 2, 8]
         0   1  2  3  4  5  6

i=2: node(3), children=2,8 → 8>3, swap → [4,10,8,5,1,2,3]
i=1: node(10), children=5,1 → already max
i=0: node(4), children=10,8 → 10>4, swap → [10,4,8,5,1,2,3]
     then 4 vs children 2,3 → already fine

Result: Max Heap in O(n) time!
```

**Ye optimization teri `heap.js` mein explicitly mention hai:**
```javascript
//? Reason why we start from end - when we are starting from end,
//? we are making sure that the right side elements are already max heap
```

---

<a name="heap-sort"></a>
## 8️⃣ HEAP SORT — COMPLETE ANALYSIS

### Code (teri `heap.js` se):

```javascript
let arr = [1, 4, 10, 5, 3, 7, 9, 2];

function heapSort(arr) {
  let n = arr.length;
  
  // Step 1: Max Heap banao
  for (let i = n - 1; i >= 0; i--) {
    heapifyDown(arr, i, n);
  }
  
  // Step 2: Sort karo
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];   // max ko end mein
    heapifyDown(arr, 0, i);                 // remaining heap fix karo
  }
  return arr;
}

function heapifyDown(arr, i, n) {
  let largest = i;
  let left  = (2 * i) + 1;
  let right = (2 * i) + 2;

  if (left < n && arr[left] > arr[largest])   largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifyDown(arr, largest, n);  // recursive
  }
}
```

### Step-by-Step Visualization:

```
arr = [4, 10, 3, 5, 1]

─── STEP 1: MAX HEAP BANAO ───

Start:
         4
       /   \
     10     3
    /  \
   5    1

After Build Heap:
         10
       /   \
      5     3
    /  \
   4    1

Array: [10, 5, 3, 4, 1]

─── STEP 2: SORT KARO ───

Iteration 1:
  swap arr[0] and arr[4]: [1, 5, 3, 4, | 10]  ← 10 sorted
  heapifyDown(0, size=4): [5, 4, 3, 1, | 10]

Iteration 2:
  swap arr[0] and arr[3]: [1, 4, 3, | 5, 10]  ← 5 sorted
  heapifyDown(0, size=3): [4, 1, 3, | 5, 10]

Iteration 3:
  swap arr[0] and arr[2]: [3, 1, | 4, 5, 10]  ← 4 sorted
  heapifyDown(0, size=2): [3, 1, | 4, 5, 10]

Iteration 4:
  swap arr[0] and arr[1]: [1, | 3, 4, 5, 10]  ← 3 sorted

Final: [1, 3, 4, 5, 10] ✅
```

### Time Complexity Analysis:

```
Step 1: Build Max Heap
  ├── Method used: loop from n-1 to 0, heapifyDown each
  ├── Optimized method: O(n)
  └── Teri code mein: n se 0 tak loop (not fully optimized but same asymptotic)
      = O(n)

Step 2: n-1 Extract Operations
  ├── Har iteration mein: 1 swap (O(1)) + 1 heapifyDown (O(log n))
  ├── Total iterations: n-1
  └── Total cost: (n-1) × O(log n) = O(n log n)

TOTAL = O(n) + O(n log n) = O(n log n)
```

| Case | Time | Reason |
|---|---|---|
| **Best Case** | O(n log n) | Already sorted ho toh bhi heap banani padegi |
| **Worst Case** | O(n log n) | Reverse sorted ho toh bhi same steps |
| **Average Case** | O(n log n) | Har haal mein same |

**Heap Sort ki khaas baat:** Teen teeno cases mein O(n log n) — guaranteed!

### Space Complexity Analysis:

```
Extra Array liya?       → NO  (in-place sorting)
Swapping variables?     → O(1) constant
Recursion Stack?        → O(log n) depth (recursive heapifyDown)
```

| Version | Space | Note |
|---|---|---|
| Recursive heapifyDown (teri code) | **O(log n)** | Call stack = tree height |
| Iterative heapifyDown | **O(1)** | No stack frames |

> **Standard interview answer: O(1)** — kyunki in-place sort hai

**Heap Sort vs Others:**

```
Quick Sort:
  Average: O(n log n)  ✅
  Worst:   O(n²)       ❌ (sorted array mein problem)
  Space:   O(log n)

Merge Sort:
  Always:  O(n log n)  ✅
  Space:   O(n)        ❌ (extra array chahiye)

Heap Sort:
  Always:  O(n log n)  ✅✅ (guaranteed)
  Space:   O(1)        ✅✅ (in-place)
  Problem: Cache unfriendly (array mein jump karna padta hai)
```

---

<a name="search"></a>
## 9️⃣ SEARCH IN HEAP — O(n) KYUN?

Heap mein kisi specific element ko dhundhna ho (jo root nahi hai):

**Time: O(n), Space: O(1)**

**Kyun O(n)?**

```
Heap sorted nahi hota. Sirf yeh guarantee hai:
  Min Heap: Parent ≤ Children (root = minimum)
  Max Heap: Parent ≥ Children (root = maximum)

BST mein left < root < right hota hai → O(log n) search
Heap mein ऐसा koi order nahi → poora array scan karo → O(n)

Example: [1, 4, 5, 10, 20] mein 10 dhundho
Tujhe poora array check karna padega.
Binary search nahi kar sakte kyunki order guaranteed nahi.
```

---

<a name="final-table"></a>
## 📊 FINAL MASTER COMPLEXITY TABLE

### MinHeap Class Operations:

| Operation | Function | Time (Best) | Time (Worst) | Space | Reason |
|---|---|---|---|---|---|
| Constructor | `new MinHeap()` | O(1) | O(1) | O(n) | Array initialize |
| Left Child | `getLeftChildIndex()` | O(1) | O(1) | O(1) | Arithmetic |
| Right Child | `getRightChildIndex()` | O(1) | O(1) | O(1) | Arithmetic |
| Parent | `getParentIndex()` | O(1) | O(1) | O(1) | Arithmetic |
| Insert | `insert()` | O(1) | **O(log n)** | O(1) | HeapifyUp |
| HeapifyUp | `heapifyUp()` | O(1) | **O(log n)** | O(1) | Leaf→Root |
| Delete Min | `deleteMin()` | O(1) | **O(log n)** | O(log n) | HeapifyDown |
| HeapifyDown | `heapifyDown()` | O(1) | **O(log n)** | O(log n) | Root→Leaf |
| Peek | `peek()` | O(1) | **O(1)** | O(1) | Direct access |
| Search | — | O(1) | **O(n)** | O(1) | Full scan |

### Build Heap:

| Method | Time | Space |
|---|---|---|
| Insert method (ek ek dalo) | O(n log n) | O(n) |
| HeapifyDown method (optimized) | **O(n)** | O(1) |

### Heap Sort:

| Case | Time | Space |
|---|---|---|
| Best Case | O(n log n) | O(1) |
| Worst Case | O(n log n) | O(1) |
| Average Case | O(n log n) | O(1) |

---

<a name="interview-traps"></a>
## 🔥 INTERVIEW TRAP QUESTIONS

---

**Trap 1: "Build Heap ki complexity kya hai?"**

> ❌ Wrong: O(n log n)
> ✅ **Correct: O(n)**
>
> *Reason: Lower levels mein zyada nodes hain but kam kaam hai. Mathematical series solve karo toh ≈ 2n = O(n) aata hai.*

---

**Trap 2: "Heap mein search ki complexity kya hai?"**

> ❌ Wrong: O(log n)
> ✅ **Correct: O(n)**
>
> *Reason: Heap sorted nahi hota. Sirf root guaranteed min/max hai. Baaki elements ke liye poora array scan karna padta hai.*

---

**Trap 3: "Heap Sort stable hai?"**

> ❌ Wrong: Haan
> ✅ **Correct: Nahi, Unstable hai**
>
> *Reason: Heapify process mein equal elements ka relative order change ho sakta hai kyunki long-distance swaps hote hain.*

---

**Trap 4: "Heap ki height kya hoti hai?"**

> ✅ **Correct: O(log n)**
>
> *Reason: Complete Binary Tree ki property se. n nodes hain toh height = floor(log₂ n)*

---

**Trap 5: "HeapSort ka space O(1) hai ya O(log n)?"**

> ✅ **Dono acceptable hain:**
> - Iterative heapifyDown → **O(1)**
> - Recursive heapifyDown (teri code mein) → **O(log n)** stack space
> - Standard interview answer: **O(1)** (in-place sorting)

---

**Trap 6: "Insert ka best case kya hai?"**

> ✅ **Best Case: O(1)**
>
> *Reason: Agar inserted element apni jagah end mein hi fit ho jaye (parent se bada/chota nahi) toh koi swap nahi — sirf push O(1).*

---

## 🎯 KEY FORMULAS — QUICK REFERENCE

```
0-based indexing:
  Left Child   = 2*i + 1
  Right Child  = 2*i + 2
  Parent       = Math.floor((i-1) / 2)

Heap height    = floor(log₂ n)

Operations:
  Insert     → O(log n) time, O(1) space
  Delete     → O(log n) time, O(log n) space [recursive]
  Peek       → O(1) time,     O(1) space
  Search     → O(n) time,     O(1) space
  BuildHeap  → O(n) time,     O(1) space
  HeapSort   → O(n log n) time, O(1) space
```

---

## 📚 IMPORTANT LEETCODE PROBLEMS (From Your Notes)

| # | Problem | Pattern |
|---|---|---|
| 215 | Kth Largest Element in Array | MaxHeap/MinHeap |
| 703 | Kth Largest in Stream | MinHeap of size k |
| 347 | Top K Frequent Elements | MaxHeap |
| 295 | Find Median from Data Stream | Two Heaps |
| 23 | Merge K Sorted Lists | MinHeap |
| 378 | Kth Smallest Element in Matrix | MinHeap |
| 1046 | Last Stone Weight | MaxHeap |
| 973 | K Closest Points to Origin | MaxHeap of size k |
| 692 | Top K Frequent Words | MinHeap |
| 1642 | Furthest Building You Can Reach | MinHeap |

---

*Notes by Bhanu Pratap — based on personal heap.js and heap.md files*