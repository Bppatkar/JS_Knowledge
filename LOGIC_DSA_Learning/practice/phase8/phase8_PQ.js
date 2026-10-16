//! Priority Queue
// Priority Queue (PQ) ek Abstract Data Type (ADT) hai — matlab ek concept hai, koi specific code nahi.
//? Iska kaam: Elements ko priority ke hisaab se serve karna — na ki insertion order ke hisaab se.

/* 
///! Heap Hai To PQ Ki Zaroorat Kya Hai?
Ye classic confusion hai. Chalo clear karte hain.

///? Heap ek Data Structure hai — ek specific implementation. Isme rules fixed hain:

Complete Binary Tree hona chahiye
Parent ≥ Children (max) ya Parent ≤ Children (min)
Array me store hota hai
PQ ek concept hai. Ye bas batata hai ki "priority ke hisaab se serve karo".

🔑 Analogy Se Samjho
Real World	          |          DSA
"Transport" (concept)	|      PQ (concept)
"Car", "Bike", "Bus" (implementations) |	Heap, Array+Sort, LinkedList

Tu jab "transport" bolta hai, to ye ek idea hai. Us idea ko implement karne ke liye car/bike/bus use karta hai. Waise hi:

///* PQ = idea ("priority handle karo")
///* Heap = ek implementation ("ye rules follow karke priority handle karo")

///! 📌 Ek Line Me
"Priority Queue" ek interface hai. "Heap" us interface ko implement karne ka ek tarika hai.

Aur bhi implementations ho sakte hain:

///? 👉🏻 Array + Sorting
///? 👉🏻 Linked List (sorted)
///? 👉🏻 Binary Heap (best)
///? 👉🏻 Fibonacci Heap (advanced)
///? 👉🏻 Balanced BST
///? 👉🏻 Heap sabse efficient hai isliye practically PQ = Heap bol dete hain. Par conceptually dono alag hain.

*/

//* Priority Queue Implementation Methods
//? 1. using Array + sorting
//? 2. using Heap [most efficient 🌟]

//! Code Example: Priority Queue using Array + Sorting

// we use queue because it is same as a queue data structure but with priority. So we can use the same methods of queue like enqueue, dequeue, peek, isEmpty etc. and this is maxPriorityQueue because we want to serve the highest priority first. So we will sort the queue in descending order of priority.
// 

class MaxPriorityQueueusingArrayWithSorting {
  constructor() {
    this.queue = [];
  }

  enqueue(val, priority) {
    this.queue.push({ val, priority });
    this.queue.sort((a, b) => b.priority - a.priority); // n times O(log n) = O(n log n)

    // sorted in descending order which gives highest priority in first place
    // This is the line which increases the time complexity to O(n log n) for enqueue.
  }

  dequeue() {
    return this.queue.shift(); // removing first item - heighest priority O(1);
  }

  peek() {
    return this.queue[0]; // O(1)
  }

  isEmpty() {
    return this.queue.length === 0; //O(1)
  }
}

// const pqueue = new MaxPriorityQueueusingArrayWithSorting();
// pqueue.enqueue('Fever', 1);
// pqueue.enqueue('Accident', 5);
// pqueue.enqueue('Headache', 3);

// console.log(pqueue.dequeue()); // { val: 'Accident', priority: 5 }
// console.log(pqueue.dequeue()); // { val: 'Headache', priority: 3 }

//* problem -
//* this.queue.sort((a, b) => b - a);
//* ❌ O(n log n) har insertion par so no efficient

//! Code Example: Priority Queue using Heap (Most Efficient)

class MaxPriorityQueueusingHeap {
  constructor() {
    this.heap = [];
  }
  // helper function to swap elem in heap - for reducing code repetition
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // enqueue -  n times O(log n) = O(n log n), log n for heapify up
  enqueue(val, priority) {
    this.heap.push({ val, priority });
    let lastIdx = this.heap.length - 1;
    this.heapifyUp(lastIdx);
  }

  heapifyUp(idx) {
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      // Max Heap: agar child parent se bada hai to swap, warna ruk jao
      if (this.heap[idx].priority <= this.heap[parentIdx].priority) break;
      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }

  // dequeue = O(log n)
  dequeue() {
    if (this.heap.length === 0) return null;
    else if (this.heap.length === 1) return this.heap.pop();

    let max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }

  heapifyDown(idx) {
    let heapLength = this.heap.length;

    while (true) {
      let left = (2 * idx) + 1;
      let right = (2 * idx) + 2;

      let largest = idx;

      if (left < heapLength && this.heap[left].priority > this.heap[largest].priority) {
        largest = left;
      }
      if (right < heapLength && this.heap[right].priority > this.heap[largest].priority) {
        largest = right;
      }

      if (largest !== idx) {
        this.swap(idx, largest);
        idx = largest;
      } else { break; }
    }
  }

  // peek - O(1);
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  size() {
    this.heap.length;
  }

}

// const pqueueWithHeap = new MaxPriorityQueueusingHeap();
// pqueueWithHeap.enqueue('Fever', 1);
// pqueueWithHeap.enqueue('Accident', 5);
// pqueueWithHeap.enqueue('Headache', 3);

// console.log(pqueueWithHeap.dequeue()); // { val: 'Accident', priority: 5 }  
// console.log(pqueueWithHeap.dequeue()); // { val: 'Headache', priority: 3 }
// console.log(pqueueWithHeap.dequeue()); // { val: 'Fever', priority: 1 }

//! MIMP - Choosing Min or Max ....?
/* 
| Chahiye       | Heap  | Logic                                                               |
|---------------|-------|---------------------------------------------------------------------|
| Kth largest   | MinPQ | K largest maintain; root = smallest among them = Kth largest       |
| Kth smallest  | MaxPQ | K smallest maintain; root = largest among them = Kth smallest      |
*/

//! =============================================================
//* Leetcode Questions
//! =============================================================

//! Leetcode 215 — Kth Largest Element in an Array
//? Array + sorting: O(n log n) time, O(1) space
var findKthLargest = function (nums, k) {
  let ans = nums.sort((a, b) => b - a); // descending order sort
  return ans[k - 1];
};

//? Min Heap: O(n log k) time, O(k) space
//* Logic - 
/* 
What we're doing: - We push every number into a Min‑Priority‑Queue.

The Min‑Priority‑Queue automatically sorts itself — the smallest element always stays at the front (root).

So whenever the queue's length becomes greater than k, we dequeue — which removes the front element, i.e., the smallest element (because in a PQ, the front/top one is the one removed).

We keep doing this while traversing the whole array. By the end, the queue has only k elements left — and those are the k largest elements of the array.

Now, the front of the queue is the smallest among those k elements. And that smallest-of-the-k-largest is exactly our Kth largest element. So we just return the front (peek).
*/
var findKthLargest = function (nums, k) {
  // i am using in- built min heap in js using priority queue [https://datastructures-js.info/docs/priority-queue]

  let pq = new MinPriorityQueue(); // min heap
  for (let i = 0; i < nums.length; i++) {
    pq.enqueue(nums[i]);
    if (pq.size() > k) pq.dequeue(); // remove smallest if size exceeds k
  }
  return pq.dequeue();
}

//! Leetcode 347 — Top K Frequent Elements
var topKFrequent = function (nums, k) {
  // top k frequent means we have to sort using frequency and return top k
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], 1);
    else map.set(nums[i], map.get(nums[i]) + 1)
  }
  // for (let val of nums) {
  // map.set(val, (map.get(val) || 0) + 1);
  // }

  // let map = {};
  // for (let val of nums) {
  // map[val] = (map[val] || 0) + 1;
  // }


  let pq = new MinPriorityQueue(el => el.freq); // creating empty pq and making sure that it will sort using frequency

  for (let [key, freq] of map) {
    pq.enqueue({ key, freq });
    if (pq.size() > k) {
      pq.dequeue();
    }
  }

  // Heap now has exactly K elements with highest frequencies
  // Extract only the 'key' (element itself) from above for-in loop, converting back to Number
  return pq.toArray().map(el => Number(el.key));
}

//! Leetcode 703 — Kth Largest Element in a Stream
var KthLargest = function (k, nums) {
  this.pq = new MinPriorityQueue(); // min heap
  this.k = k;
  for (let i = 0; i < this.nums.length; i++) {
    this.add(nums[i]);
  }
  return null;

}
KthLargest.prototype.add = function (val) {
  this.pq.enqueue(val);

  if (this.pq.size() > this.k) this.pq.dequeue(); // remove smallest if size exceeds k

  return this.pq.front();
}

//! Leetcode 1046 — Last Stone Weight
var lastStoneWeight = function (stones) {
  let pq = new MaxPriorityQueue();

  for (let i = 0; i < stones.length; i++) {
    pq.enqueue(stones[i]);
  }

  while (pq.size() > 1) {
    let largest = pq.dequeue();
    let secondLargest = pq.dequeue();

    if (secondLargest !== largest) { pq.enqueue(largest - secondLargest); }
  }
  return pq.size() === 0 ? 0 : pq.front();
}

// Array + sorting method
var lastStoneWeightIterative = function (stones) {
  let stoneCopy = [...stones];

  while (stoneCopy.length > 1) {
    stoneCopy.sort((a, b) => b - a);

    let firstHeavy = stoneCopy[0];
    let secondHeavy = stoneCopy[1];

    stoneCopy.splice(0, 2); // splice returns removed elems, and array remains same

    if (firstHeavy !== secondHeavy) stoneCopy.push(firstHeavy - secondHeavy);
  }
  return stoneCopy.length === 0 ? 0 : stoneCopy[0];
}

// console(lastStoneWeight([2, 7, 4, 1, 8, 1])); //output - 1;

//! Leetcode 378 — Kth Smallest Element in a Sorted Matrix
var kthSmallest = function (matrix, k) {
  let pq = new MaxPriorityQueue();

  for (let row of matrix) {
    for (let num of row) {
      pq.enqueue(num);
      if (pq.size() > k) pq.dequeue();
    }
  }

  return pq.front();
}

// falting array
var kthSmallest = function (matrix, k) {
  let pq = new MaxPriorityQueue();

  for (let num of matrix.flat()) {
    pq.enqueue(num);
    if (pq.size() > k) pq.dequeue();
  }

  return pq.front();
}

//! Leetcode 23 — Merge k Sorted Lists
//* Logic - Har list ka current head heap me daalo. Min nikalo, result me jodo, uska next heap me daalo. Repeat.
//? It works because:- Har list sorted hai, to har list ka current smallest wahi list ka head hai. Sab lists ke heads me se min hi global smallest hai.

var mergeKLists = function (lists) {
  // creating minPriorityQueue with compartor to compare with val
  let pq = new MinPriorityQueue(node => node.val);

  //1. head of every list put in pq (skiping null)
  // we are storing node- {val, node} and comparing from value
  for (let head of lists) {
    if (head) pq.enqueue(head);
  }
  // console.log(pq);

  //2. dummyNode because first one do not have and prev
  let dummyNode = new ListNode(0);
  let curr = dummyNode;

  //3. we extract min till pq is not empty means not null
  while (pq.size() > 0) {
    let smallest = pq.dequeue();
    curr.next = smallest;
    curr = curr.next;

    // putting next of the smallest that we extract in pq [if exist]
    if (smallest.next) {
      pq.enqueue(smallest.next);
    }
  }

  return dummyNode.next;
}

//! Leetcode 295 — Find Median from Data Stream [⭐ Interview Favourite]
// if we use array so -
/* 
addNum → arr.push(num) ,
findMedian → sort karo, middle nikalo
Problem: findMedian har call pe sort karna padega → O(n log n) per call.
Agar m calls hain, total O(m × n log n) = TLE.
*/

//* Logic
/* 
Median means beech wala element.

agar ham numbers ko do groups me baant de: - 
- Left group = chhote numbers
- Right group = bade numbers

Example: [1, 2, 3, 4, 5, 6]

Left group:  [1, 2, 3]    ← 3 sabse bada is group me
Right group: [4, 5, 6]    ← 4 sabse chhota is group me

Median = (3 + 4) / 2 = 3.5
Dekh — median nikalti hai left ka max aur right ka min se!

-Kaunsa Heap Kis Group Ke Liye?

///? Left group ka max chahiye → Max-Heap
///? Right group ka min chahiye → Min-Heap
*/


var MedianFinder = function () {
  this.leftMaxPQ = new MaxPriorityQueue();
  this.rightMinPQ = new MinPriorityQueue();
};

MedianFinder.prototype.addNum = function (num) {
  // Step 1: Naya num daalo
  // Agar left khaali hai, ya num left ke max se chhota hai → left me daalo
  // Warna right me daalo
  if (this.leftMaxPQ.size() === 0 || num <= this.leftMaxPQ.front()) {
    this.leftMaxPQ.enqueue(num);
  } else {
    this.rightMinPQ.enqueue(num);
  }

  //2. size balancing
  // Left ka size, right ke size + 1 se zyada nahi hona chahiye
  if (this.leftMaxPQ.size() > this.rightMinPQ.size() + 1) {
    let elem = this.leftMaxPQ.dequeue();
    this.rightMinPQ.enqueue(elem);
  }
  // Right ka size, left ke size se bada nahi hona chahiye
  else if (this.rightMinPQ.size() > this.leftMaxPQ.size()) {
    let elem = this.rightMinPQ.dequeue();
    this.leftMaxPQ.enqueue(elem);
  }
};


MedianFinder.prototype.findMedian = function () {
  //1. check size equal [total even]
  if (this.rightMinPQ.size() === this.leftMaxPQ.size()) {
    return (this.leftMaxPQ.front() + this.rightMinPQ.front()) / 2;
  }
  //2. maybe left bada [total odd] (left ka root hi median hai)
  else {
    return this.leftMaxPQ.front();
  }

};

//! Solved Later [Advanced Questions]

// //! Leetcode 632. Smallest Range Covering Elements from K Lists
// var smallestRange = function (nums) { }

// //! Leetcode 621 — Task Scheduler
// var leastInterval = function (tasks, n) { }

// //! Leetcode 767 — Reorganize String
// var reorganizeString = function (s) { }

// //! Leetcode 692 — Top K Frequent Words
// var topKFrequentWords = function (words, k) { }

// //! Leetcode 502 — IPO
// var findMaximizedCapital = function (k, w, profits, capital) { }

