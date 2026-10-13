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

const pqueue = new MaxPriorityQueueusingArrayWithSorting();
pqueue.enqueue('Fever', 1);
pqueue.enqueue('Accident', 5);
pqueue.enqueue('Headache', 3);

console.log(pqueue.dequeue()); // { val: 'Accident', priority: 5 }
console.log(pqueue.dequeue()); // { val: 'Headache', priority: 3 }

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
var topKFrequent = function (nums, k) { }

//! Leetcode 703 — Kth Largest Element in a Stream
var KthLargest = function (k, nums) { }

//! Leetcode 1046 — Last Stone Weight
var lastStoneWeight = function (stones) { }

//! Leetcode 973 — K Closest Points to Origin
var kClosest = function (points, k) { }

//! Leetcode 378 — Kth Smallest Element in a Sorted Matrix
var kthSmallest = function (matrix, k) { }

//! Leetcode 23 — Merge k Sorted Lists
var mergeKLists = function (lists) { }

//! Leetcode 295 — Find Median from Data Stream
var MedianFinder = function () { }

//! Leetcode 621 — Task Scheduler
var leastInterval = function (tasks, n) { }

//! Leetcode 767 — Reorganize String
var reorganizeString = function (s) { }

//! Leetcode 692 — Top K Frequent Words
var topKFrequentWords = function (words, k) { }

//! Leetcode 502 — IPO
var findMaximizedCapital = function (k, w, profits, capital) { }

