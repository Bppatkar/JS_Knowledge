# 🌈 PRIORITY QUEUE - COMPLETE NOTES (Hinglish Detailed) 🌈

---

## <span style="color:#FF6347">1️⃣ Queue Revision (Foundation)</span>

Sabse pehle normal **Queue** ko samajhna zaroori hai.

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**📌 Queue ka rule:**
**FIFO — First In First Out**
Matlab jo element sabse pehle enter karega woh sabse pehle bahar niklega.

**Example:**
Queue: `[A, B, C]`
Execution: `A → B → C`

</div>

### <span style="color:#FFD700">⚙️ Queue Operations</span>

| Operation    | Meaning                     |
| :----------- | :-------------------------- |
| ➕ `enqueue` | Element ko end me add karna |
| ➖ `dequeue` | Front element remove karna  |
| 👀 `peek`    | Front element dekhna        |
| 📥 `push`    | End me insert               |
| 📤 `shift`   | Front remove                |
| 📥 `unshift` | Front me add                |
| 📤 `pop`     | End se remove               |

**Typical queue flow:**

- Insert ➡️ **Back**
- Remove ⬅️ **Front**

---

---

## <span style="color:#32CD32">2️⃣ Priority Queue Kya Hai?</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**📝 Definition:**
**Priority Queue ek aisi queue hai jo elements ko unki priority ke basis par serve karti hai, na ki insertion order ke basis par.**

- 🔹 **Normal queue execution:** Depends on insertion order.
- 🔹 **Priority queue execution:** Depends on priority.

</div>

---

## <span style="color:#FF8C00">3️⃣ Real Life Example (Hospital)</span>

<div style="background-color:#2d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF8C00;">

**🏥 Patients Queue:**

| Patient | Problem  | Priority |
| :-----: | :------- | :------: |
|  **A**  | Fever    |    1     |
|  **B**  | Accident |    5     |
|  **C**  | Headache |    2     |

_Assuming higher number = higher priority._

- 🚶 **Normal Queue (FIFO):** Order: `[A, B, C]` ➡️ Treatment: `A → B → C`
- 🚑 **Priority Queue:** Order based on priority: `[B, C, A]` ➡️ Highest priority treated first!

</div>

---

## <span style="color:#9370DB">4️⃣ Use Cases of Priority Queue</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

Priority Queue bahut important data structure hai:

1. 💻 **CPU Scheduling:** High priority process pehle execute hota hai.
2. 🗄️ **Cache System:** Important data pehle store hota hai.
3. ⏱️ **Real Time Systems:** Emergency tasks immediately run hote hain.
4. 🗺️ **Dijkstra's Algorithm:** Shortest path nikalne ke liye.
5. 🌐 **Network Routing:** Fastest packet selection.

</div>

---

## <span style="color:#00CED1">5️⃣ Priority Queue Implementation Methods</span>

Priority Queue ko multiple ways me implement kar sakte hain.

### <span style="color:#FF69B4">Method 1 — Array + Sorting</span>

**Array representation:**

- Normal order: `[5, 1, 10, 9, 8]`
- Priority queue order (Descending): `[10, 9, 8, 5, 1]`

**💻 Enqueue Implementation:**

```javascript
function add(val) {
  pq.push(val);
  pq.sort((a, b) => b - a); // Sort in descending order
}
```

⚠️ **Problem:** Sorting complexity is `O(n log n)`. Har insertion par sorting expensive hai. Isliye yeh efficient method nahi hai.

---

### <span style="color:#FF69B4">Method 2 — Heap (Most Efficient) 🌟</span>

Heap ek **Complete Binary Tree** hota hai.

⬆️ **MaxHeap rule:** Parent ≥ Children

**Example:**

```text
        10
      /  \
     9    8
    /
   7
```

Root always highest priority hoti hai. Isliye priority queue easily implement hoti hai with `O(log n)` complexity.

---

## <span style="color:#FF8C00">6️⃣ Priority Queue vs Heap</span>

Bahut log confuse ho jaate hain dono ke beech.

| Feature        | Priority Queue               | Heap                         |
| :------------- | :--------------------------- | :--------------------------- |
| Type           | Abstract Data Type (Concept) | Data Structure               |
| Implementation | Conceptual                   | Binary Tree                  |
| Purpose        | Priority handling            | Structure maintain karta hai |

> 💡 **Important:** PQ = Concept / Abstract, Heap = Implementation / Mechanism.

---

## <span style="color:#9370DB">7️⃣ 'Abstract' Ka Matlab Kya Hai?</span>

Abstract ka matlab: Internal complexity hide karna.

**Example:**
Car drive karte waqt aap steering use karte ho. Lekin engine ka internal mechanism aapko pata hona zaroori nahi.
Same concept PQ me apply hota hai. Heap internal mechanism hai, par bahar se hum PQ ke functions (enqueue, dequeue) access karte hain.

---

---
**Iska seedha sa matalb hai :** 
 we can use heap data structure as an pq 
 
  simple matlab hme poora sb kuch scratch s nahi likhna padega ki heap ka code scratch s banana pade, hme bane banaye method mil jayege bs use kro simple 
  
  -  bharosha na h to is website par jao  https://support.leetcode.com/hc/en-us/articles/360011833974-What-are-the-environments-for-the-programming-languages 
  - isme javascript mein - simple likha h ki leetcode particular datastrcture k liye ye cheez use kr rha h wo b bana banaya to bs use krlo simple  https://datastructures-js.info/docs/priority-queue
---



## <span style="color:#00CED1">8️⃣ Types of Priority Queue</span>

### ⬆️ Max Priority Queue

Highest priority first.

- Example: `[10, 8, 5, 2]` ➡️ 10 will pop first.

### ⬇️ Min Priority Queue

Lowest priority first.

- Example: `[1, 3, 5, 7]` ➡️ 1 will pop first.

---

## <span style="color:#FF69B4">9️⃣ Language Support</span>

- 💛 **JavaScript:** Built-in priority queue nahi hai. Custom implement karna padta hai.
- ☕ **Java:** `PriorityQueue` class available hai.
- ⚙️ **C++:** `priority_queue` available hai.
- 🐍 **Python:** `heapq` module available hai.

---

## <span style="color:#FFD700">🔟 Interview Tip 💡</span>

Interview me interviewer puch sakta hai:

1. Implement priority queue from scratch (Use Heap approach)
2. Assume heap exists (Directly use logic)

🎯 **Best practice:** Interviewer se clearly clarify karo ki scratch se build karna hai ya pre-built assume karke chalna hai.

---

## <span style="color:#FF6347">1️⃣1️⃣ Code Example: Priority Queue using Array + Sorting</span>

```javascript
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(val, priority) {
    this.queue.push({ val, priority });
    this.queue.sort((a, b) => b.priority - a.priority); // sorted in descending order which gives highest priority in first place
    // This is the line which increases the time complexity to O(n log n) for enqueue.
  }

  dequeue() {
    return this.queue.shift(); // Remove the first item (highest priority) - O(1)
  }

  peek() {
    return this.queue; // O(1)
  }

  isEmpty() {
    return this.queue.length === 0; // O(1)
  }
}

// Example Usage:
// const pqueue = new PriorityQueue();
// pqueue.enqueue('Fever', 1);
// pqueue.enqueue('Accident', 5);
// pqueue.enqueue('Headache', 3);

// console.log(pqueue.dequeue()); // { val: 'Accident', priority: 5 }
// console.log(pqueue.dequeue()); // { val: 'Headache', priority: 3 }
```

---

## <span style="color:#32CD32">1️⃣2️⃣ Code Example: Priority Queue using Heap (Most Efficient)</span>

```javascript
class MaxPriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Helper to swap elements in the heap
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // ✅ Enqueue an item - O(log n)
  enqueue(val, priority) {
    this.heap.push({ val, priority });
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      // For MaxHeap, parent priority should be greater than or equal to child
      if (this.heap[index].priority <= this.heap[parentIndex].priority) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // ✅ Dequeue highest-priority item - O(log n)
  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop(); // Handle single element case

    let max = this.heap; // Store the highest priority item (root)
    this.heap = this.heap.pop(); // Move the last element to the root
    this.heapifyDown(); // Restore heap property
    return max;
  }

  heapifyDown() {
    let index = 0;
    let length = this.heap.length;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let largest = index; // Assume current node is the largest

      // Compare with left child
      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].priority > this.heap[largest].priority
      ) {
        largest = leftChildIndex;
      }
      // Compare with right child
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].priority > this.heap[largest].priority
      ) {
        largest = rightChildIndex;
      }

      // If largest is not the current node, swap and continue heapifying down
      if (largest !== index) {
        this.swap(index, largest);
        index = largest;
      } else {
        break; // Heap property restored
      }
    }
  }

  // ✅ View front item (highest priority) - O(1)
  front() {
    return this.heap.length > 0 ? this.heap : null; // Return the root element
  }

  // Get current size of the priority queue - O(1)
  size() {
    return this.heap.length;
  }

  // Check if the priority queue is empty - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }
}
```

---

## <span style="color:#00CED1">1️⃣3️⃣ Important Interview Tip: Kth Smallest/Largest</span>

MIMP Line - when question uses "kth smallest", "kth largest", or anything about 'k', use heap/priority queue.

**Make sure:** We have to **restrict our heap size to K elements**.

---

## <span style="color:#FF69B4">1️⃣4️⃣ LeetCode Problem Examples</span>

### <span style="color:#FFD700">215. Kth Largest Element in an Array</span>

**Using Sorting (not efficient for large N or repeated calls):**

```javascript
var findKthLargest = function (nums, k) {
  nums = nums.sort((a, b) => b - a); // Time Complexity: O(n log n) because of sorting
  return nums[k - 1]; // Time Complexity: O(1)
}; // Overall Time Complexity: O(n log n)
```

**Question:** In question explicitly mentioned that - can you solve it without sorting?
**Answer:** 'Yes', using heap!

**Using Min-Heap (efficient):**

```javascript
// Assuming a MinPriorityQueue class exists (similar to MaxPriorityQueue but with comparison logic reversed for min-heap)
class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  enqueue(val) {
    // For Kth Largest, we only care about the value
    this.heap.push(val);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      // For MinHeap, child should be greater than or equal to parent
      if (this.heap[index] >= this.heap[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    let min = this.heap;
    this.heap = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    let length = this.heap.length;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let smallest = index;

      // Compare with left child
      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallest]
      ) {
        smallest = leftChildIndex;
      }
      // Compare with right child
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallest]
      ) {
        smallest = rightChildIndex;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  front() {
    return this.heap.length > 0 ? this.heap : null;
  }

  size() {
    return this.heap.length;
  }
}

var findKthLargest = function (nums, k) {
  let pq = new MinPriorityQueue(); // This would be a custom MinPriorityQueue implementation

  for (let i = 0; i < nums.length; i++) {
    // running loop n times
    pq.enqueue(nums[i]); // Time Complexity: O(log k) for enqueue
    if (pq.size() > k) {
      pq.dequeue(); // Remove root element (smallest in min-heap) - O(log k)
    }
  }
  return pq.front(); // The smallest element in a min-heap of size k is the Kth largest overall.
};
// Whole Time Complexity: O(n log k) and Space Complexity: O(k)
// Constraints mein likha hai - k <= nums.length (to k always less than n, so our algorithm is very good).
```

### <span style="color:#FFD700">703. Kth Largest Element in a Stream</span>

This problem is a classic application of a min-heap of size `k`. You maintain a min-heap, and for every new element, you add it to the heap. If the heap size exceeds `k`, you remove the smallest element (root of the min-heap). The root of the heap will always be the Kth largest element seen so far.

```javascript
// Example structure (requires a MinPriorityQueue implementation, as defined above)
var KthLargest = function (k, nums) {
  this.k = k;
  this.minHeap = new MinPriorityQueue(); // Custom MinPriorityQueue
  for (const num of nums) {
    this.add(num);
  }
};

KthLargest.prototype.add = function (val) {
  this.minHeap.enqueue(val);
  if (this.minHeap.size() > this.k) {
    this.minHeap.dequeue();
  }
  return this.minHeap.front();
};
```

---

## <span style="color:#FF4500">🎯 DEEP DIVE — PQ vs HEAP (Common Confusion)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

Ye section un saare sawaalon ka jawab deta hai jo PQ aur Heap ke beech me confuse karte hain.

</div>

---

### <span style="color:#FFD700">❓ Q1: Priority Queue Aakhir Hai Kya?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Priority Queue (PQ)** ek **Abstract Data Type (ADT)** hai — matlab ek **concept** hai, koi specific code nahi.

**Iska kaam:** Elements ko **priority ke hisaab se** serve karna — na ki insertion order ke hisaab se.

**PQ bas ye batata hai ki kya kya operations honge:**

- `enqueue(val, priority)` — element add karo priority ke saath
- `dequeue()` — sabse high priority wala nikaalo
- `peek()` — sabse high priority wala dekho
- `isEmpty()` — khaali hai kya?
- `size()` — kitne elements hain?

**PQ ye NAHI batata ki andar kaise implement hoga.** Wo tujh pe hai — array se, heap se, linked list se, kisi bhi tarah se.

</div>

---

### <span style="color:#FFD700">❓ Q2: Heap Hai To PQ Ki Zaroorat Kya Hai?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Ye **classic confusion** hai. Chalo clear karte hain.

**Heap** ek **Data Structure** hai — ek **specific implementation**. Isme rules fixed hain:

- Complete Binary Tree hona chahiye
- Parent ≥ Children (max) ya Parent ≤ Children (min)
- Array me store hota hai

**PQ** ek **concept** hai. Ye bas batata hai ki "priority ke hisaab se serve karo".

### 🔑 Analogy Se Samjho

| Real World | DSA |
|:---|:---|
| "Transport" (concept) | PQ (concept) |
| "Car", "Bike", "Bus" (implementations) | Heap, Array+Sort, LinkedList |

Tu jab "transport" bolta hai, to ye ek **idea** hai. Us idea ko implement karne ke liye car/bike/bus use karta hai. Waise hi:

> **PQ = idea** ("priority handle karo")  
> **Heap = ek implementation** ("ye rules follow karke priority handle karo")

### 📌 Ek Line Me

> **"Priority Queue" ek interface hai. "Heap" us interface ko implement karne ka ek tarika hai.**

Aur bhi implementations ho sakte hain:
- Array + Sorting
- Linked List (sorted)
- Binary Heap (best)
- Fibonacci Heap (advanced)
- Balanced BST

**Heap sabse efficient hai** isliye practically PQ = Heap bol dete hain. Par conceptually dono alag hain.

</div>

---

### <span style="color:#FFD700">❓ Q3: Array + Sorting Se PQ Kyun Nahi Bana Sakte?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Bana sakte ho!** Ye bhi ek valid PQ implementation hai. Par **efficient nahi** hai.

Chalo compare karte hain:

**Array + Sorting Wala PQ:**

```javascript
class PQ {
  constructor() { this.queue = []; }

  enqueue(val) {
    this.queue.push(val);
    this.queue.sort((a, b) => b - a); // ❌ O(n log n) har insert pe
  }

  dequeue() {
    return this.queue.shift(); // O(1)
  }
}
```

**Heap Wala PQ:**

```javascript
class PQ {
  enqueue(val) {
    this.heap.push(val);
    this.heapifyUp(); // ✅ O(log n)
  }
  dequeue() {
    // O(log n)
  }
}
```

### 🔥 Complexity Comparison

| Operation | Array + Sort | Heap |
|:---|:---:|:---:|
| `enqueue` | ❌ `O(n log n)` | ✅ `O(log n)` |
| `dequeue` | `O(1)` | `O(log n)` |
| `peek` | `O(1)` | `O(1)` |

### 🧠 Problem Kya Hai Array + Sort Me?

**Har insert pe poora array sort karna padta hai.** Agar 1 lakh elements insert karne hain:

```
Array + Sort: 1,00,000 × O(n log n)  ← Bahut slow ❌
Heap:         1,00,000 × O(log n)     ← Fast ✅
```

### 📌 Rule Yaad Rakh

> **Array + Sort se PQ bana sakte ho, par ye `O(n log n)` per insert leta hai. Heap `O(log n)` deta hai. Isliye heap preferred hai.**

**Priority Queue "nahi ban sakti" — galat baat hai.**  
**Priority Queue "efficiently nahi ban sakti" — ye sahi baat hai.**

</div>

---

### <span style="color:#FFD700">❓ Q4: PQ Aur Heap Me Exact Farak Kya Hai?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Feature | Priority Queue (PQ) | Heap |
|:---|:---|:---|
| **Type** | Abstract Data Type (Concept) | Concrete Data Structure |
| **Implementation** | Nahi — bas operations ka contract | Haan — specific rules hain |
| **Rules** | Priority ke hisaab se serve karo | Complete Binary Tree + Parent-Child rule |
| **Kya Define Karta Hai** | **Kya** karna hai (operations) | **Kaise** karna hai (mechanism) |
| **Language Support** | Java: `PriorityQueue`, C++: `priority_queue`, JS: nahi hai | Har language me manually banana padta hai |
| **Underlying** | Heap, Array, LinkedList, BST | Array (usually) |
| **Focus** | **Behavior** — priority-based serving | **Structure** — heap property maintain karna |

### 🔑 Yaad Rakhne Ka Ek Line Rule

> **PQ batata hai: "kaam kya karna hai"**  
> **Heap batata hai: "kaam kaise karna hai"**

### 🚗 Best Analogy

- **"Drive karna"** = PQ (concept — kya karna hai)
- **"Manual car chalana"** = Heap (specific implementation — kaise karna hai)
- **"Automatic car chalana"** = Array + Sort (doosra implementation)

Sab "drive" kar rahe hain, bas tarika alag hai.

</div>

---

### <span style="color:#FFD700">❓ Q5: To Phir Interview Me Kya Bolna Chahiye?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Interview me jab bhi PQ ka question aaye:

1. **Pehle clarify karo:** "Sir, PQ banana hai scratch se, ya use kar sakta hun?" (Java/C++ me built-in hota hai, JS me nahi)

2. **Agar scratch se banana hai:** Heap approach use karo — `O(log n)` insert/delete.

3. **Agar Java/C++ me hai:** Direct `PriorityQueue` / `priority_queue` use karo.

4. **JS me:** Khud ka heap-based PQ banao, ya LeetCode ke `@datastructures-js/priority-queue` package ka use karo (jo LeetCode environment me available hai).

### 🎯 Interviewer Kya Dekhta Hai

- Kya tujhe **PQ aur Heap ka farak** pata hai?
- Kya tujhe **time complexity** ka awareness hai?
- Kya tu **scratch se implement** kar sakta hai?
- Kya tu **trade-offs** samajhta hai?

</div>

---

### <span style="color:#FFD700">❓ Q6: Kya Heap Ke Bina Bhi PQ Ban Sakti Hai?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Haan, bilkul!** Ye sab valid implementations hain:

| Implementation | Enqueue | Dequeue | Peek | Efficiency |
|:---|:---:|:---:|:---:|:---|
| **Unsorted Array** | `O(1)` | `O(n)` | `O(n)` | 🐌 Slow |
| **Sorted Array** | `O(n log n)` ya `O(n)` | `O(1)` | `O(1)` | ⚠️ Insert slow |
| **Sorted Linked List** | `O(n)` | `O(1)` | `O(1)` | ⚠️ Insert slow |
| **Unsorted Linked List** | `O(1)` | `O(n)` | `O(n)` | 🐌 Slow |
| **Binary Heap** ⭐ | `O(log n)` | `O(log n)` | `O(1)` | ✅ Best balance |
| **Balanced BST** | `O(log n)` | `O(log n)` | `O(log n)` | ✅ Good |
| **Fibonacci Heap** | `O(1)` | `O(log n)` | `O(1)` | 🚀 Advanced |

### 📌 Kya Seekha

> **PQ ek concept hai, uska implementation kisi bhi data structure se ho sakta hai. Heap sabse balanced hai — isliye standard ban gaya.**

</div>

---

### <span style="color:#FFD700">❓ Q7: Real World Me PQ Kahan Use Hoti Hai?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Application | Kaise Use Hoti Hai |
|:---|:---|
| 🏥 **Hospital Emergency** | Critical patients pehle |
| 💻 **CPU Scheduling** | High priority processes pehle |
| 🗺️ **Dijkstra's Algorithm** | Shortest path — nearest node pehle |
| 🌐 **Network Routing** | Important packets pehle |
| 📊 **Top K Problems** | K largest/smallest elements |
| 🔄 **Task Scheduler** | High priority tasks pehle |
| 📈 **Median Finder** | Do heaps ka use — min + max |
| 🎮 **Game AI** | A* Pathfinding |
| 📡 **Event Simulation** | Time-based events |
| 🔍 **Huffman Coding** | Data compression — smallest frequency pehle |

### 🔑 Common Pattern

Jab bhi problem me **"priority"**, **"top K"**, **"minimum/maximum pehle"** wale keywords aayein → **PQ use karo**.

</div>

---

### <span style="color:#FFD700">❓ Q8: PQ Ka Size vs Heap Ka Size — Kya Farak Padta Hai?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**PQ ka koi fixed size nahi hota** — jab tak elements aate rahenge, PQ grow karti rahegi.

**Heap ka bhi koi fixed size nahi hota** — wo bhi dynamic hai.

**Lekin!** Kuch problems me hum **heap ka size limit** karte hain (`K` elements tak). Jaise **Kth Largest** problem me:

```javascript
if (pq.size() > k) {
  pq.dequeue(); // size k me maintain karo
}
```

Isse **heap size `O(k)`** me rehta hai, aur **time complexity `O(n log k)`** ho jaati hai (jahan `n` total elements hain).

### 📌 Rule

> **Kth smallest/largest problems me heap ka size `K` pe restrict karo. Isse time complexity `O(n log k)` ho jaati hai, `O(n log n)` nahi.**

Ye trick interview me bahut impressive lagti hai.

</div>

---

### <span style="color:#32CD32">✅ PQ vs HEAP — FINAL SUMMARY</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

1. 🔹 **PQ** ek **concept/interface** hai — priority-based serving ke liye
2. 🔹 **Heap** ek **implementation** hai — PQ ko efficient tarike se implement karta hai
3. 🔹 Array + Sorting se bhi PQ ban sakti hai, par `O(n log n)` per insert — slow
4. 🔹 Heap `O(log n)` per operation deta hai — best balance
5. 🔹 Practically, **PQ = Heap** bol dete hain, par conceptually alag hain
6. 🔹 Interview me: **PQ implement karna hai to Heap use karo**
7. 🔹 Kth problems me **heap size K pe limit karo** — `O(n log k)` milta hai
8. 🔹 Real world me PQ har jagah hai — hospital, OS, networking, AI

> 💡 **FINAL LINE:** PQ batata hai **"kya karna hai"**, Heap batata hai **"kaise karna hai"**. Dono milkar efficient system banate hain.

</div>

---

# <span style="color:#FF4500">📌 PQ NOTES — MISSING TOPICS </span>

## <span style="color:#FFD700">1️⃣ Operations Ka Complete Time Complexity Table</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Tere notes me `O(log n)` likha hai, par **kaunse operation ka kya** — ye clear nahi hai. Chalo poora table:

| Operation | Array+Sort | Sorted LL | **Binary Heap** ⭐ | Balanced BST |
|:---|:---:|:---:|:---:|:---:|
| **Insert (enqueue)** | `O(n log n)` | `O(n)` | **`O(log n)`** | `O(log n)` |
| **Delete Max/Min (dequeue)** | `O(1)` | `O(1)` | **`O(log n)`** | `O(log n)` |
| **Peek (front)** | `O(1)` | `O(1)` | **`O(1)`** | `O(log n)` |
| **Search (random)** | `O(n)` | `O(n)` | `O(n)` ❌ | `O(log n)` |
| **Build from array** | `O(n log n)` | `O(n log n)` | **`O(n)`** ✅ | `O(n log n)` |
| **Space** | `O(n)` | `O(n)` | **`O(n)`** | `O(n)` |

### 🔑 Key Points

- **Heap ka best part:** Insert/Delete `O(log n)`, Peek `O(1)`
- **Heap ka worst part:** Random search `O(n)` — kyunki heap sorted nahi hai
- **Build heap `O(n)`** — agar `n/2 - 1` se heapify down karo

</div>

---

## <span style="color:#00CED1">2️⃣ Custom Comparator — Objects Ke Saath PQ</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

Tere notes me sirf **single field** (priority) ka example hai. Real interviews me **multiple fields** ke saath comparator banana padta hai.

### 🔹 Example — Student Objects

```javascript
class StudentPQ {
  constructor() {
    this.heap = [];
  }

  compare(a, b) {
    // Pehle marks se compare (higher marks = higher priority)
    if (a.marks !== b.marks) return a.marks > b.marks;
    // Tie ho to age se compare (lower age = higher priority)
    return a.age < b.age;
  }

  enqueue(val, marks, age) {
    this.heap.push({ val, marks, age });
    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (!this.compare(this.heap[idx], this.heap[parentIdx])) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }
}
```

### 🔹 Use Cases

- **Dijkstra:** `(distance, node)` — distance kam wala pehle
- **Task Scheduler:** `(priority, taskId)` — priority zyada wala pehle
- **Top K Frequent:** `(frequency, element)` — frequency zyada wala pehle

</div>

---

## <span style="color:#9370DB">3️⃣ Build Heap From Array — O(n) Ka Trick</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

Tere notes me `enqueue` ek-ek karke dikhaya hai. Par **array se seedha heap banane ka O(n) wala trick** missing hai.

### 🔹 Do Tarike

**Tarika 1: Insert ek-ek karke — `O(n log n)`** ❌
```javascript
for (let x of arr) pq.enqueue(x); // n × O(log n)
```

**Tarika 2: Heapify Down — `O(n)`** ✅
```javascript
// Last non-leaf se root tak heapify down
for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
  heapifyDown(arr, i, n);
}
```

### 🔑 Kyun O(n)?

Kyunki **bottom ke nodes ko kam kaam** karna padta hai:
- Leaf nodes (n/2) → 0 swaps
- Level 1 (n/4) → 1 swap
- Level 2 (n/8) → 2 swaps
- Total = `n/4·1 + n/8·2 + n/16·3 + ...` = **`O(n)`**

</div>

---

## <span style="color:#FF8C00">4️⃣ Median Finder — Do Heaps Ka Classic Pattern ⭐</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF8C00;">

**LC 295 — Find Median from Data Stream** — ye PQ ka **sabse famous** interview question hai.

### 🔹 Problem

Stream of numbers me se **median** nikalna hai, har insert ke baad.

### 🔹 Trick — Do Heaps

- **Max Heap (left half):** Chhote numbers
- **Min Heap (right half):** Bade numbers

**Rule:** Dono ka size difference ≤ 1

```text
Max Heap (left)     Min Heap (right)
[1, 2, 3]           [4, 5, 6]
   ↓                    ↓
  max=3              min=4

Median = (3 + 4) / 2 = 3.5
```

### 🔹 Algorithm

1. **Insert karo:**
   - Agar max heap khaali hai ya `val ≤ maxHeap.top()` → max heap me daalo
   - Warna min heap me daalo

2. **Balance karo:**
   - Agar `maxHeap.size > minHeap.size + 1` → max se min me shift karo
   - Agar `minHeap.size > maxHeap.size` → min se max me shift karo

3. **Median nikalo:**
   - Agar dono same size → `(maxTop + minTop) / 2`
   - Warna jiska size bada hai, uska top

### 🔹 Complexity

- Insert: `O(log n)`
- Median: `O(1)`

**Ye pattern bahut kaam aayega — "two heaps" wala.**

</div>

---

## <span style="color:#32CD32">5️⃣ Merge K Sorted Lists/Arrays — Classic Heap Problem</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**LC 23 — Merge K Sorted Lists** aur **LC 632 — Smallest Range** — heap ka classic use case.

### 🔹 Approach

**Min Heap** banao, har list ka **pehla element** daalo.

```
Lists:
[1, 4, 5]
[1, 3, 4]
[2, 6]

Min Heap me daalo (1, 1, 2)

Loop:
1. Heap se min nikalo → result me daalo
2. Us list ka next element heap me daalo
3. Repeat
```

### 🔹 Complexity

- **Total elements:** `n`
- **K lists:** `k`
- **Time:** `O(n log k)` — har element heap me `O(log k)`
- **Space:** `O(k)` — heap me `k` elements

### 🔑 Key Insight

> **`O(n log k)` `O(n log n)` se better hai jab `k << n` ho.**

Ye trick interview me bahut impressive lagti hai.

</div>

---

## <span style="color:#00BFFF">6️⃣ More LeetCode Problems — Heap/PQ Ke Liye</span>

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

Tere notes me sirf 2 problems hain. Ye list complete kar:

| # | Problem | Pattern | Difficulty |
|:---:|:---|:---|:---:|
| **215** | Kth Largest Element | Min Heap size K | 🟡 Medium |
| **703** | Kth Largest in Stream | Min Heap size K | 🟢 Easy |
| **347** | Top K Frequent Elements | Min Heap + HashMap | 🟡 Medium |
| **295** | Find Median from Stream | Two Heaps | 🔴 Hard |
| **23** | Merge K Sorted Lists | Min Heap of K | 🔴 Hard |
| **973** | K Closest Points to Origin | Max Heap size K | 🟡 Medium |
| **621** | Task Scheduler | Max Heap + Queue | 🟡 Medium |
| **767** | Reorganize String | Max Heap | 🟡 Medium |
| **1046** | Last Stone Weight | Max Heap | 🟢 Easy |
| **692** | Top K Frequent Words | Min Heap + Custom Comparator | 🟡 Medium |

### 🔑 Kaunsa Heap Kab?

- **Kth LARGEST** → Min Heap (size K)
- **Kth SMALLEST** → Max Heap (size K)
- **Top K Frequent** → Min Heap + HashMap
- **Median** → Do Heaps (min + max)
- **Merge K** → Min Heap

</div>

---

## <span style="color:#FF69B4">7️⃣ Heap vs PQ vs Priority Queue Class — Naming Confusion</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

Log ye teeno naam interchangeably use karte hain, par technically:

| Term | Kya Hai | Example |
|:---|:---|:---|
| **Heap** | Data structure (specific) | Binary Heap, Fibonacci Heap |
| **Priority Queue** | Abstract Data Type (concept) | Interface/Contract |
| **PQ Class** | Code implementation | `MaxPriorityQueue`, `MinPriorityQueue` |

### 🔹 Coding Me

```javascript
// Ye sab valid hain:
class MinHeap { }                    // Heap ke naam se
class MinPriorityQueue { }           // PQ ke naam se
class PriorityQueue { }              // Generic PQ

// Teeno ka internal mechanism same — heap
```

**Interview me:** jo naam natural lage, wahi use kar. Concept clear hona chahiye.

</div>

---

## <span style="color:#DA70D6">8️⃣ Common Mistakes in PQ Implementation</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

Ye galtiyan har beginner karta hai — pehle hi dhyan rakh:

| ❌ Galti | ✅ Sahi |
|:---|:---|
| `heapifyUp` me `parentIdx` loop ke **bahar** | Loop ke **andar** — har iteration me recalculate |
| `heapifyDown` me `smallest` ki jagah `largest` | Min me `smallest`, Max me `largest` |
| Swap ke baad `heapifyDown(smallest)` ki jagah `heapifyDown(idx)` | `smallest` / `largest` bhejo, `idx` nahi |
| Min/Max compare me `>` aur `<` ulta | Min: `<` (child chhota), Max: `>` (child bada) |
| `deleteMin` me min save nahi kiya | `let min = heap[0]` pehle save karo |
| Heap size check nahi kiya (out of bounds) | `left < heapLength` check zaroor |

</div>

---

## <span style="color:#FFD700">9️⃣ PQ Se Related Advanced Concepts (Bonus)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Agar interview me deeper jaana ho:

### 🔹 Decrease Key / Increase Key

Kisi existing element ki priority change karna:
- **Decrease key** (priority badhana) → `heapifyUp`
- **Increase key** (priority ghatana) → `heapifyDown`
- **Problem:** Element ka index dhundhna `O(n)` — isliye HashMap rakhna padta (index track karne ke liye)

### 🔹 Heap With Index Map

Advanced PQ me `Map<value, index>` rakhte hain — `O(1)` me element dhundhne ke liye. **Dijkstra** aur **Prim's** me use hota hai.

### 🔹 D-Ary Heap

Binary heap me 2 children. D-ary me `d` children. Insert faster, delete slower.

### 🔹 Pairing Heap / Fibonacci Heap

Advanced heaps — `O(1)` amortized insert. Practically kam use hote hain, but theory me important.

</div>

---
