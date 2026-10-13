# 🌈 STACK + QUEUE + DEQUE + LINKED LIST — COMPLETE DEEP DIVE 🌈

---

# <span style="color:#FF6347">📚 PART 1 — STACK</span>

## <span style="color:#1E90FF">🌳 STACK KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Stack** ek **linear data structure** hai jo **LIFO** (Last In First Out) principle pe kaam karta hai.

**Matlab:** Jo element **sabse aakhir** me aaya, wo **sabse pehle** bahar jayega.

**Real life examples:**

- 🍽️ Plate ka stack — jo upar rakhi plate, wahi pehle uthegi
- 📚 Books ka stack — jo upar wali book, wahi pehle nikalegi
- ↩️ Browser back button — sabse recent page pehle
- 🔙 Undo (Ctrl+Z) — sabse recent action pehle undo

</div>

---

## <span style="color:#32CD32">⚡ STACK OPERATIONS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Operation | Kya Karta | Time |
|:---|:---|:---:|
| `push(x)` | Top pe element add | `O(1)` |
| `pop()` | Top se element remove | `O(1)` |
| `peek()` / `top()` | Top ka element dekho (remove nahi) | `O(1)` |
| `isEmpty()` | Khaali hai? | `O(1)` |
| `size()` | Kitne elements | `O(1)` |

### 🔑 Stack Me Kya NAHI Kar Sakte

- ❌ Beech me insert/delete nahi
- ❌ Random access nahi (`stack[3]` allowed nahi conceptually)
- ❌ Sabse pehla element access nahi (bottom)

</div>

---

## <span style="color:#FFD700">📐 STACK KA VISUAL</span>

```text
        ┌─────┐
        │  30 │ ← top (push/pop yahan)
        ├─────┤
        │  20 │
        ├─────┤
        │  10 │ ← bottom
        └─────┘

push(40):  40 top pe aayega
pop():     40 bahar jayega (sabse pehle)
pop():     30 bahar jayega
```

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Sequence:**

```text
push(10) → stack = [10]
push(20) → stack = [10, 20]
push(30) → stack = [10, 20, 30]
pop()    → returns 30, stack = [10, 20]
pop()    → returns 20, stack = [10]
peek()   → returns 10
```

</div>

---

## <span style="color:#9370DB">💻 STACK IMPLEMENTATION IN JS</span>

### <span style="color:#FF69B4">Method 1 — Array (Simplest)</span>

```javascript
// JS Array already stack ki tarah kaam karta hai
let stack = [];

stack.push(10);   // O(1)
stack.push(20);
stack.push(30);

stack.pop();      // 30
stack[stack.length - 1]; // peek → 20
stack.length === 0;      // isEmpty
stack.length;            // size
```

**Kaafi hai?** Haan — 90% cases me array hi use karo.

### <span style="color:#FF69B4">Method 2 — Linked List Based</span>

```javascript
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(val) {
    let node = new Node(val);
    node.next = this.top;
    this.top = node;
    this.size++;
  }

  pop() {
    if (!this.top) return null;
    let val = this.top.val;
    this.top = this.top.next;
    this.size--;
    return val;
  }

  peek() {
    return this.top ? this.top.val : null;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

**Kab use kare:** Jab `O(1)` guaranteed chahiye aur size unknown ho.

---

## <span style="color:#FF4500">🎯 STACK KE COMMON PATTERNS</span>

### <span style="color:#FFD700">Pattern 1 — Balanced Parentheses</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Opening bracket push karo. Closing aaye to top se match karo.

```javascript
function isValid(s) {
  let stack = [];
  let map = { ')': '(', '}': '{', ']': '[' };

  for (let ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}
```

**Visual:**
```text
s = "({[]})"

( → push → [(]
{ → push → [(, {]
[ → push → [(, {, []
] → pop [ matches ✅
} → pop { matches ✅
) → pop ( matches ✅

Stack empty → valid ✅
```

</div>

### <span style="color:#FFD700">Pattern 2 — Next Greater Element</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Monotonic stack — decreasing order maintain karo.

```javascript
function nextGreater(nums) {
  let stack = [], result = new Array(nums.length).fill(-1);
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      let idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
```

**Visual:**
```text
nums = [2, 1, 3, 5, 4]
result = [3, 3, 5, -1, -1]

i=0: push 0   stack=[0]
i=1: 1<2 → push 1   stack=[0,1]
i=2: 3>1 pop 1 → result[1]=3
     3>2 pop 0 → result[0]=3
     push 2   stack=[2]
i=3: 5>3 pop 2 → result[2]=5
     push 3   stack=[3]
i=4: 4<5 push 4   stack=[3,4]
```

</div>

### <span style="color:#FFD700">Pattern 3 — Min Stack (O(1) minimum)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Do stacks — ek normal, ek minimums ka.

```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    let min = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}
```

</div>

### <span style="color:#FFD700">Pattern 4 — Monotonic Stack (Histogram Problems)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Largest rectangle in histogram, trapping rain water, stock span.

**Idea:** Stack me indices rakho aise ki values **monotonic** (increasing ya decreasing) rahe.

**Largest Rectangle in Histogram (LC 84):**
```javascript
function largestRectangle(heights) {
  let stack = [], maxArea = 0;
  heights.push(0); // sentinel
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      let h = heights[stack.pop()];
      let w = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  return maxArea;
}
```

</div>

---

## <span style="color:#00FA9A">💻 STACK — MUST-KNOW LEETCODE PROBLEMS</span>

| # | Problem | Pattern |
|:---:|:---|:---|
| **20** | Valid Parentheses | Balanced brackets |
| **155** | Min Stack | Two stacks |
| **150** | Evaluate RPN | Stack eval |
| **739** | Daily Temperatures | Monotonic stack |
| **496** | Next Greater Element I | Monotonic stack |
| **503** | Next Greater Element II | Circular monotonic |
| **84** | Largest Rectangle in Histogram | Monotonic stack |
| **42** | Trapping Rain Water | Monotonic stack / Two pointer |
| **394** | Decode String | Stack of strings + counts |
| **71** | Simplify Path | Stack of path components |
| **224** | Basic Calculator | Stack for parentheses |
| **232** | Implement Queue using Stacks | Two stacks |

---

---

# <span style="color:#FF6347">📚 PART 2 — QUEUE</span>

## <span style="color:#1E90FF">🌳 QUEUE KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Queue** ek **linear data structure** hai jo **FIFO** (First In First Out) principle pe kaam karta hai.

**Matlab:** Jo element **sabse pehle** aaya, wo **sabse pehle** bahar jayega.

**Real life examples:**

- 🎟️ Ticket line — pehle aaya pehle gaya
- 🖨️ Printer queue — pehla document pehle print
- 🏥 Hospital queue — pehla patient pehle
- 🔄 BFS traversal — level by level

</div>

---

## <span style="color:#32CD32">⚡ QUEUE OPERATIONS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Operation | Kya Karta | Time (Ideal) | Time (JS Array) |
|:---|:---|:---:|:---:|
| `enqueue(x)` | Rear (back) me add | `O(1)` | `O(1)` push |
| `dequeue()` | Front se remove | `O(1)` | ❌ `O(n)` shift |
| `front()` | Front element dekho | `O(1)` | `O(1)` |
| `rear()` | Rear element dekho | `O(1)` | `O(1)` |
| `isEmpty()` | Khaali? | `O(1)` | `O(1)` |
| `size()` | Kitne elements | `O(1)` | `O(1)` |

### ⚠️ JS Array Ka Problem

`arr.shift()` **O(n)** leta hai — kyunki saare elements ek jagah shift karne padte hain. Isliye **bade queues** ke liye **LinkedList ya Deque** use karo.

</div>

---

## <span style="color:#FFD700">📐 QUEUE KA VISUAL</span>

```text
   front                    rear
     ↓                        ↓
   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘

enqueue(50):  50 rear me aayega
dequeue():    10 front se jayega
```

**Sequence:**

```text
enqueue(10) → queue = [10]
enqueue(20) → queue = [10, 20]
enqueue(30) → queue = [10, 20, 30]
dequeue()  → returns 10, queue = [20, 30]
dequeue()  → returns 20, queue = [30]
```

---

## <span style="color:#9370DB">💻 QUEUE IMPLEMENTATION IN JS</span>

### <span style="color:#FF69B4">Method 1 — Array (Simple but slow dequeue)</span>

```javascript
let queue = [];

queue.push(10);   // enqueue - O(1)
queue.push(20);
queue.push(30);

queue.shift();    // dequeue - O(n) ❌
queue[0];         // front - O(1)
```

### <span style="color:#FF69B4">Method 2 — Linked List (Optimal)</span>

```javascript
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(val) {
    let node = new Node(val);
    if (!this.rear) {
      this.front = this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
    this.size++;
  }

  dequeue() {
    if (!this.front) return null;
    let val = this.front.val;
    this.front = this.front.next;
    if (!this.front) this.rear = null;
    this.size--;
    return val;
  }

  peek() {
    return this.front ? this.front.val : null;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

**Dono pointers** `front` aur `rear` rakhne se `O(1)` enqueue aur dequeue milta hai.

---

## <span style="color:#FF4500">🎯 QUEUE KE COMMON PATTERNS</span>

### <span style="color:#FFD700">Pattern 1 — BFS (Level Order Traversal)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Queue me nodes daalo, level by level process karo.

```javascript
function levelOrder(root) {
  if (!root) return [];
  let queue = [root], result = [];
  while (queue.length) {
    let levelSize = queue.length;
    let level = [];
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

**Visual:**
```text
        1
       / \
      2   3
     / \
    4   5

Queue: [1] → level [1]
Queue: [2,3] → level [2,3]
Queue: [4,5] → level [4,5]

Result: [[1], [2,3], [4,5]]
```

</div>

### <span style="color:#FFD700">Pattern 2 — Sliding Window Maximum</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Deque use karo — maximum ko front me rakho.

```javascript
function maxSlidingWindow(nums, k) {
  let deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    // Remove out of window
    if (deque.length && deque[0] <= i - k) deque.shift();
    // Remove smaller elements
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}
```

**Time:** `O(n)` — har element ek baar push/pop

</div>

### <span style="color:#FFD700">Pattern 3 — Rotting Oranges (Multi-source BFS)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Saare sources (rotten oranges) queue me daalo. Ek saath sab spread karo.

```javascript
function orangesRotting(grid) {
  let queue = [], fresh = 0, minutes = 0;
  let rows = grid.length, cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  let dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  while (queue.length && fresh) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [r, c] = queue.shift();
      for (let [dr, dc] of dirs) {
        let nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
```

</div>

---

## <span style="color:#00FA9A">💻 QUEUE — MUST-KNOW LEETCODE PROBLEMS</span>

| # | Problem | Pattern |
|:---:|:---|:---|
| **232** | Implement Queue using Stacks | Two stacks |
| **225** | Implement Stack using Queues | One/two queues |
| **102** | Binary Tree Level Order | BFS |
| **199** | Right Side View | BFS |
| **994** | Rotting Oranges | Multi-source BFS |
| **542** | 01 Matrix | Multi-source BFS |
| **239** | Sliding Window Maximum | Monotonic Deque |
| **622** | Design Circular Queue | Circular array |
| **933** | Number of Recent Calls | Queue |
| **346** | Moving Average from Data Stream | Queue |

---

---

# <span style="color:#FF6347">📚 PART 3 — DEQUE (Double-Ended Queue)</span>

## <span style="color:#1E90FF">🌳 DEQUE KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Deque** (Double-Ended Queue) ek aisi queue hai jisme **dono ends** (front aur rear) se **insert aur delete** dono kar sakte ho.

**Stack + Queue ka combination.**

**Kab use kare:**

- Sliding window maximum/minimum
- Palindrome check
- Undo-redo system
- Priority deque

</div>

---

## <span style="color:#32CD32">⚡ DEQUE OPERATIONS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Operation | Kya Karta | Time |
|:---|:---|:---:|
| `pushFront(x)` | Front me add | `O(1)` |
| `pushBack(x)` | Rear me add | `O(1)` |
| `popFront()` | Front se remove | `O(1)` |
| `popBack()` | Rear se remove | `O(1)` |
| `front()` | Front dekho | `O(1)` |
| `back()` | Rear dekho | `O(1)` |
| `isEmpty()` | Khaali? | `O(1)` |
| `size()` | Count | `O(1)` |

</div>

---

## <span style="color:#FFD700">📐 DEQUE KA VISUAL</span>

```text
   pushFront        pushBack
       ↓                ↓
   ┌─────────────────────────┐
   │  10  20  30  40  50  60 │
   └─────────────────────────┘
       ↑                ↑
   popFront         popBack
```

Dono taraf se operations — flexible.

---

## <span style="color:#9370DB">💻 DEQUE IMPLEMENTATION IN JS</span>

```javascript
// JS me Deque ke liye array use karo (with limitations)
let deque = [];

// Push
deque.push(10);        // pushBack
deque.unshift(5);      // pushFront - O(n) ❌

// Pop
deque.pop();           // popBack - O(1)
deque.shift();         // popFront - O(n) ❌

// Peek
deque[0];              // front
deque[deque.length-1]; // back
```

**Better:** Custom Deque with circular array ya doubly linked list. LeetCode ke liye `@datastructures-js/deque` bhi hai.

---

## <span style="color:#FF4500">🎯 DEQUE KE PATTERNS</span>

### <span style="color:#FFD700">Pattern — Sliding Window Maximum (Optimal)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Deque me **decreasing order** me indices rakho.

```text
nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3

i=0: deque=[0]     (1)
i=1: deque=[1]     (3) - 1 hata diya
i=2: deque=[1,2]   (3,-1) → max=3
i=3: deque=[1,2,3] (3,-1,-3) → max=3
i=4: deque=[4]     (5) - saare chhote hata diye → max=5
i=5: deque=[4,5]   (5,3) → max=5
i=6: deque=[6]     (6) → max=6
i=7: deque=[7]     (7) → max=7

Result: [3, 3, 5, 5, 6, 7]
```

</div>

---

## <span style="color:#00FA9A">💻 DEQUE — MUST-KNOW LEETCODE PROBLEMS</span>

| # | Problem | Pattern |
|:---:|:---|:---|
| **239** | Sliding Window Maximum | Monotonic Deque |
| **1438** | Longest Subarray abs diff ≤ limit | Monotonic Deque |
| **862** | Shortest Subarray Sum ≥ K | Deque + Prefix |
| **641** | Design Circular Deque | Circular array |
| **1670** | Design Front Middle Back Queue | Deque |

---

---

# <span style="color:#FF6347">📚 PART 4 — LINKED LIST</span>

## <span style="color:#1E90FF">🌳 LINKED LIST KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Linked List** ek **linear data structure** hai jisme elements **nodes** ke roop me hote hain, aur har node **agla node ka address** rakhta hai.

**Array vs Linked List:**

| Feature | Array | Linked List |
|:---|:---|:---|
| Memory | Contiguous | Scattered |
| Access | `O(1)` random | `O(n)` traverse |
| Insert (start) | ❌ `O(n)` | ✅ `O(1)` |
| Insert (end) | `O(1)` | `O(n)` (tail pointer ke bina) |
| Delete (start) | ❌ `O(n)` | ✅ `O(1)` |
| Size | Fixed (usually) | Dynamic |

</div>

---

## <span style="color:#32CD32">🔗 NODE STRUCTURE</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

**Visual:**
```text
     head
      ↓
   ┌───┬───┐    ┌───┬───┐    ┌───┬───┐
   │ 1 │ ●─┼───►│ 2 │ ●─┼───►│ 3 │ ∅ │
   └───┴───┘    └───┴───┘    └───┴───┘
     val next    val next    val next(null)
```

</div>

---

## <span style="color:#FFD700">🎯 LINKED LIST TYPES</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

### 1. Singly Linked List
Har node sirf **agla** node point karta hai.

```text
1 → 2 → 3 → 4 → null
```

### 2. Doubly Linked List
Har node **agla aur pichla** dono point karta hai.

```text
null ← 1 ⇄ 2 ⇄ 3 ⇄ 4 → null
```

### 3. Circular Linked List
Last node **pehle** node ko point karta hai.

```text
1 → 2 → 3 → 4 → (wapas 1)
```

</div>

---

## <span style="color:#9370DB">⚡ LINKED LIST OPERATIONS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

| Operation | Singly | Doubly |
|:---|:---:|:---:|
| Insert at head | `O(1)` | `O(1)` |
| Insert at tail | `O(n)` / `O(1)`* | `O(1)` |
| Insert at position | `O(n)` | `O(n)` |
| Delete at head | `O(1)` | `O(1)` |
| Delete at tail | `O(n)` / `O(1)`* | `O(1)` |
| Search | `O(n)` | `O(n)` |
| Access i-th | `O(n)` | `O(n)` |

`*` = agar tail pointer maintained ho

</div>

---

## <span style="color:#FF4500">🔥 THE 3 POINTER RULE (Most Important)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Linked List ke 90% problems sirf 3 pointers se solve hote hain:**

- **`prev`** — pichla node
- **`curr`** — current node
- **`next`** — agla node

**Idea:** Pointers ko **idhar-udhar** karo — bas.

**Pattern:**
```javascript
let prev = null;
let curr = head;
while (curr) {
  let next = curr.next;  // save next
  curr.next = prev;      // change link
  prev = curr;           // move prev
  curr = next;           // move curr
}
```

</div>

---

## <span style="color:#FFD700">💻 LINKED LIST — KEY OPERATIONS</span>

### <span style="color:#FF69B4">1. Traverse</span>

```javascript
let curr = head;
while (curr) {
  console.log(curr.val);
  curr = curr.next;
}
```

### <span style="color:#FF69B4">2. Insert at head</span>

```javascript
let newNode = new ListNode(val);
newNode.next = head;
head = newNode;
```

### <span style="color:#FF69B4">3. Insert at tail</span>

```javascript
let newNode = new ListNode(val);
if (!head) {
  head = newNode;
} else {
  let curr = head;
  while (curr.next) curr = curr.next;
  curr.next = newNode;
}
```

### <span style="color:#FF69B4">4. Delete by value</span>

```javascript
// Use dummy node to handle head deletion
let dummy = new ListNode(0);
dummy.next = head;
let prev = dummy, curr = head;

while (curr) {
  if (curr.val === val) {
    prev.next = curr.next;
  } else {
    prev = curr;
  }
  curr = curr.next;
}
return dummy.next;
```

---

## <span style="color:#FF4500">🎯 LINKED LIST PATTERNS</span>

### <span style="color:#FFD700">Pattern 1 — Reverse Linked List (Most Important)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Iterative:**
```javascript
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

**Visual:**
```text
1 → 2 → 3 → null

Step 1: prev=null, curr=1
  next=2, 1.next=null, prev=1, curr=2
  null ← 1    2 → 3 → null

Step 2: prev=1, curr=2
  next=3, 2.next=1, prev=2, curr=3
  null ← 1 ← 2    3 → null

Step 3: prev=2, curr=3
  next=null, 3.next=2, prev=3, curr=null
  null ← 1 ← 2 ← 3

Return prev = 3
```

**Recursive:**
```javascript
function reverseList(head) {
  if (!head || !head.next) return head;
  let newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
```

</div>

### <span style="color:#FFD700">Pattern 2 — Fast & Slow Pointers (Floyd's)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Ek pointer 1 step, doosra 2 step.

**Use cases:**
- **Middle of list** — jab fast end pe pahunche, slow middle pe hoga
- **Cycle detect** — agar cycle hai to dono milenge
- **Cycle start dhundhna** — math ke through

```javascript
// Middle dhundhna
function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// Cycle detect
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

**Visual (Cycle):**
```text
1 → 2 → 3 → 4
        ↑   ↓
        7 ← 6 ← 5

slow: 1, 2, 3, 4, 5, 6, 7, 3... (1 step)
fast: 1, 3, 5, 7, 4, 6, 3...    (2 steps)
       ↑
       Mil jayenge ✅
```

</div>

### <span style="color:#FFD700">Pattern 3 — Merge Two Sorted Lists</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Dummy node trick:**

```javascript
function mergeTwoLists(l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}
```

**Dummy Node Kyun?**  
Head ko handle karne ke liye. Naya list ka **pehla node** kaun hoga, ye track karne ki zaroorat nahi — `dummy.next` hi answer hai.

</div>

### <span style="color:#FFD700">Pattern 4 — Dummy Node (Universal Trick)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Kab use kare:** Jab **head change** ho sakta hai (delete, merge, partition).

```javascript
let dummy = new ListNode(0);
dummy.next = head;
let prev = dummy;
// ... operations ...
return dummy.next;
```

**Isse benefit:** Head case ko **special** nahi banana padta.

</div>

### <span style="color:#FFD700">Pattern 5 — Reorder / Partition</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

**Idea:** Do dummy nodes banao — ek left, ek right. Elements ko distribute karo.

```javascript
// Partition: < x left me, >= x right me
function partition(head, x) {
  let leftDummy = new ListNode(0), rightDummy = new ListNode(0);
  let left = leftDummy, right = rightDummy;

  while (head) {
    if (head.val < x) {
      left.next = head;
      left = left.next;
    } else {
      right.next = head;
      right = right.next;
    }
    head = head.next;
  }
  right.next = null;
  left.next = rightDummy.next;
  return leftDummy.next;
}
```

</div>

---

## <span style="color:#00FA9A">💻 LINKED LIST — MUST-KNOW LEETCODE PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

| # | Problem | Pattern |
|:---:|:---|:---|
| **206** | Reverse Linked List | 3 pointers |
| **92** | Reverse Linked List II | Range reverse |
| **141** | Linked List Cycle | Floyd's |
| **142** | Linked List Cycle II | Floyd's + math |
| **876** | Middle of Linked List | Fast & slow |
| **21** | Merge Two Sorted Lists | Dummy node |
| **23** | Merge K Sorted Lists | Heap / divide-conquer |
| **143** | Reorder List | Middle + reverse + merge |
| **19** | Remove Nth from End | Two pointers gap |
| **234** | Palindrome Linked List | Middle + reverse |
| **160** | Intersection of Two Lists | Two pointers |
| **86** | Partition List | Two dummies |
| **138** | Copy List with Random Pointer | HashMap |
| **2** | Add Two Numbers | Dummy + carry |
| **25** | Reverse Nodes in K-Group | Group reverse |
| **148** | Sort List | Merge sort on LL |

</div>

---


# <span style="color:#FF6347">📊 COMPARISON TABLE — STACK vs QUEUE vs DEQUE vs LINKED LIST</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

| Feature | Stack | Queue | Deque | Linked List |
|:---|:---:|:---:|:---:|:---:|
| **Order** | LIFO | FIFO | Both ends | Sequential |
| **Insert** | Top only | Rear only | Both ends | Anywhere |
| **Delete** | Top only | Front only | Both ends | Anywhere |
| **Access** | Top only | Front only | Both ends | Traverse |
| **Implementation** | Array/LL | Array/LL | Circular/DLL | Nodes |
| **Main use** | Undo, DFS, brackets | BFS, scheduling | Sliding window | Dynamic lists |

</div>

---

## <span style="color:#32CD32">🎯 FINAL SUMMARY</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

1. 🔹 **Stack** — LIFO, brackets, DFS, monotonic problems
2. 🔹 **Queue** — FIFO, BFS, level order, scheduling
3. 🔹 **Deque** — both ends, sliding window max/min
4. 🔹 **Linked List** — dynamic, 3 pointer rule, dummy node trick
5. 🔹 **Floyd's algorithm** — middle, cycle detect
6. 🔹 **Dummy node** — head change wale problems me
7. 🔹 **Monotonic stack/deque** — next greater, sliding max
8. 🔹 **JS me**: Array for stack, LinkedList ya custom for queue (shift `O(n)` hai)

> 💡 **REMEMBER:**
> - Stack = **"Reverse the order"** ka superpower
> - Queue = **"Level by level"** ka superpower
> - LinkedList = **"Dynamic + O(1) insert/delete at ends"**
> - **3 pointers + dummy node** = 90% LL problems

</div>


---
