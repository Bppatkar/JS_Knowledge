/*

///! 0-based vs 1-based Indexing
Internet par aksar Heaps mein indexing 1 se start hoti hai, lekin JavaScript (aur most programming languages) mein hum 0-based indexing use karte hain. Formulas mein bas thoda sa change hota hai:

///? 🔢 For 1-based indexing:

⬅️ Left Child = 2 * i
➡️ Right Child = 2 * i + 1
⬆️ Parent Node = Math.floor(i / 2)


///? 🔢 For 0-based indexing (Hum ye use karenge): ⭐

⬅️ Left Child = 2 * i + 1
➡️ Right Child = 2 * i + 2
⬆️ Parent Node = Math.floor((i - 1) / 2)

///----------------------------------------------------------

///! HEAP OPERATIONS - INSERT, REMOVE, PEEK

Jaise Stack mein push aur pop hota hai, aur Queue mein enqueue aur dequeue, waise hi Heap ke apne specific operations hain:-

///* insert, remove, aur peek. Heap mein hum randomly kahin se bhi element remove nahi kar sakte, kyunki isse Heap ka structure (Complete Binary Tree) aur property (Min/Max Heap) dono break ho jayenge.

///----------------------------------------------------------

///! ✅ INSERT Operation (Heapify Up)
Jab bhi hum naya element insert karte hain, hum usko hamesha tree ke sabse last position par daalte hain (taaki Complete Binary Tree ki property bani rahe). Iske baad, hum Heapify Up (ya sift-up) karte hain.

Is process mein, hum naye node ko uske parent node se compare karte hain. Agar new node parent se bada hai (Max Heap mein), to hum unhe swap kar dete hain. Yeh process tab tak chalta hai jab tak new node apni sahi jagah par na aa jaye ya root na ban jaye.

///! ❌ REMOVE Operation (Heapify Down)
Jab hum root node ko remove karte hain, toh tree ka structure maintain karne ke liye hum sabse last element ko utha kar root par rakh dete hain. Ab Heap property (Min/Max) bigad sakti hai, isliye hum Heapify Down (ya sift-down) karte hain.

Is process mein, hum root ko uske children se compare karte hain. Agar root apne children se chota hai (Max Heap mein), to hum usko sabse bade child ke sath swap kar dete hain. Yeh process tab tak chalta rehta hai jab tak node apni sahi jagah par na aa jaye ya leaf node na ban jaye.

///! 👀 PEEK Operation
peek() operation se hum sirf root element ko dekh sakte hain. Max Heap mein yeh sabse bada element hota hai aur Min Heap mein sabse chota. Iski time complexity O(1) hoti hai. Hum kisi random element ko access nahi kar sakte.

///----------------------------------------------------------


///!📏 IMPORTANT PROPERTIES
///* 📐 PROPERTY 1: Height vs Nodes

///? Height h ke liye:

📊 Minimum nodes = 2^h
📊 Maximum nodes = 2^(h+1) - 1


Example: Height 2 ke liye

Min nodes = 4 (2^2)
Max nodes = 7 (2^3 - 1)


///* 📐 PROPERTY 2: Leaf Nodes

Complete binary tree mein:

🍃 Leaf nodes = floor(n/2) + 1 se start hote hain
🔧 Internal nodes = ceil(n/2)


///* 📐 PROPERTY 3: Array Implementation

Parent index i ke liye:

⬅️ Left child = 2i
➡️ Right child = 2i + 1
⬆️ Parent = floor(i/2)




///----------------------------------------------------------

Agar hum heap use kar rahe hain, to hum 100% sure hain ki beech mein koi empty nodes nahi honge, kyunki Heap ek Complete Binary Tree hai. Isliye hum directly nodes ko array mein put kar sakte hain bina gaps (#) ki chinta kiye.
*/

//! Insert inside a Heap [Heapify - UP]
// We are having Min heap and we want to insert 1 in the heap

//     5
//   /   \
//  10     20
//  /
// 30

///? Output :- After inserting 1, and swapping it with 10 and then with 5, the heap will be like this:

//     1
//   /   \
//  5     20
// /  \
// 30  10

///* This process is called "heapify up" or "bubble up", where we compare the inserted element with its parent and swap if it is less than the parent, and we continue this process until we find the correct position for the inserted element.


//! In code we do like this [we are creating Min Heap]

// ham ek class banayege MinHeap ke naam se, jiske andar ek constructor hoga, constructor matlab jab bhi hum MinHeap ka object banayege, to wo cosntructor call hoga, 
// Javascript classes mein constructor ek special method hota hai, jo automatically call hota hai jab bhi hum class ka object banate hain, with the help of new keyword, to jab bhi hum new MinHeap() likhenge, to wo constructor call hoga, 


class MinHeap {
  constructor() {
    // this.heap = [];  //? jab hamre pass heap khali ho 
    //? but upar jo example tha wo bhara hua to hm usi example s smjhte h
    this.heap = [5, 10, 20, 30]; //? jab hamre pass heap bhara hua ho
  }

  //? ab kuch helper functions banayege , like we have to find left child, right child etc, so we will create some helper functions for that, and ye sare functions class ke andar honge

  // we are using 0 based indexing ok
  getLeftChildIndex(i) {
    return (2 * i) + 1;
  }
  getRightChildIndex(i) {
    return (2 * i) + 2;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  //? now we create insert helper function, 
  insert(val) {
    //? first we will insert the value at the end of the heap,
    //? then we will heapify up the value to maintain the heap property
    this.heap.push(val);
    // calling helper function heapify up with the index of the last element which is the newly inserted element
    let lastIndex = this.heap.length - 1;
    this.heapifyUp(lastIndex);
  }
  heapifyUp(index) {
    // ham index par value ko uske parent ke sath compare karenge, agar wo chhota hai to swap karenge, aur phir uske parent ke index par jaake fir se compare karenge, jab tak hum root tak nahi pahuch jate ya fir jab tak hum correct position nahi mil jata
    //  we will start heapify process form the last index which is the index of the newly inserted element

    while (index > 0) {
      // finding parent index
      let parentIndex = this.getParentIndex(index);
      // comparing the value at index with the value at parent index , if the value at index is less than the value at parent index, then we will swap them, and update the index to parent index, so that we can continue the process until we find the correct position for the inserted element
      if (this.heap[index] < this.heap[parentIndex]) {
        // swap
        /* let temp = this.heap[index];
        this.heap[index] = this.heap[parentIndex];
        this.heap[parentIndex] = temp; */
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        // update index to parent index
        index = parentIndex;

        //? if the parent value is less than or equal to the current value, then we have found the correct position for the inserted element, so we can break the loop by else condition
      } else {
        break;
      }
    }
  }
}


//! Writtin the whole code in one place without comments
class MinHeap1 {
  constructor(i) {
    this.heap = [];
  }

  getLeftChildIndex(i) {
    return (2 + i) + 1;
  }
  getRightChildIndex(i) {
    return (2 * i) + 2;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2)
  }

  insert(val) {
    this.heap.push(val);
    let lastIndex = this.heap.length - 1
    this.heapifyUp(lastIndex);
  }

  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[i]];
        i = parentIndex
      } else { break; }
    }
  }
}

// for checking the code
let minHeap = new MinHeap1();
minHeap.insert(5);
minHeap.insert(10);
minHeap.insert(20);
minHeap.insert(30);
minHeap.insert(1);
// console.log(minHeap.heap);

let heap1 = new MinHeap1();
heap1.insert(12);
heap1.insert(7);
heap1.insert(23);
heap1.insert(34);
heap1.insert(3);
// console.log(heap1.getLeftChildIndex(0));
// console.log(heap1.getRightChildIndex(2));
// console.log(heap1.heap);

//!----------------------------------------------------------

//! Deleting/Extracting Elements from a heap

// we are having a min heap theek hai, aur hme minimum element ko delete karna hai, to minimum element hamesha root par hota hai, to ham root par jo element hai usko delete karenge, but agar ham root par jo element hai usko delete karenge to heap ka structure kharab ho jayega, to hm heap ke sabse last element ko delete karenge,

// kaise, dekho ham replace karege heap ki last value ko root se, and delete that last element , par ab hamara heap structure kharab ho jayega, to ham heapify down karenge, heapify down matlab ham root se start karenge, aur usko uske left child aur right child ke sath compare karenge, aur jo bhi chhota hoga uske sath swap karenge, aur phir uske index par jaake fir se compare karenge, jab tak hum leaf node tak nahi pahuch jate ya fir jab tak hum correct position nahi mil jata

// ? for example, hamare pass min heap hai, 1,4,5, 10 ,20 aur hme minimum element ko delete karna hai, to minimum element hai 1, to ham 1 ko delete karenge, aur ham heap ke last element ko root par le aayenge, to ham 20 ko root par le aayenge, aur phir ham heapify down karenge, to ham 20 ko uske left child 4 aur right child 5 ke sath compare karenge, jo bhi jyada chota hoga uske sath process karege, to 4 chhota hai to ham 20 aur 4 ko swap karenge, to ab hamara heap kuch is tarah dikhega:

//     4
//   /   \
//  20     5
// /
// 10

//? ab ham 20 ko uske left child 10 ke sath compare karenge, aur since 10 is less than 20, to ham 20 aur 10 ko swap karenge, to ab hamara heap kuch is tarah dikhega:

//     4
//   /   \
//  10     5
// /
// 20

//* Code for deleting minimum element from the heap [we use same above code for creating the heap and inserting elements in the heap, we will add a new helper function for deleting minimum element from the heap]

class MinHeap2 {
  constructor(i) {
    this.heap = [];
  }

  getLeftChildIndex(i) {
    return (2 * i) + 1;
  }

  getRightChildIndex(i) {
    return (2 * i) + 2;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  insert(val) {
    this.heap.push(val);
    let lastIndex = this.heap.length - 1;
    this.heapifyUp(lastIndex);
  }

  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[i]];
        i = parentIndex;
      }
      else { break; }
    }
  }

  deleteMin() {
    if (this.heap.length === 0) {
      return null; //? if heap is empty, then we cannot delete minimum element
    } else if (this.heap.length === 1) {
      return this.heap.pop(); //? if heap has only one element, then we can simply pop that element and return it
    } else {
      let min = this.heap[0]; //? minimum element is at root [because we are having min heap theek hai], so we will store that minimum element in a variable, so that we can return it at the end of the function
      //* now we replace the last element of the heap with the root element, and then we will use heapify down to maintain the heap property
      let lastIndex = this.heap.length - 1; //? finding the index of the last element in the heap
      [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]]; //? swapping the last element with the root element
      this.heap.pop(); //? remove the last element (which is now the minimum element)

      this.heapifyDown(0); //? heapify down from root to maintain heap property
      // we are sending 0 not i because we want to start heapify down from root not from any other index
      return min; //? return the minimum element that we deleted
    }
  }

  heapifyDown(i) {
    //? now we have to compare the value at index i ,and ham usko uske left child aur right child ke sath compare karenge, aur jo bhi chhota hoga uske sath swap karenge, aur phir uske index par jaake fir se compare karenge, jab tak hum leaf node tak nahi pahuch jate ya fir jab tak hum correct position nahi mil jata
    let leftChildIndex = this.getLeftChildIndex(i);
    let rightChildIndex = this.getRightChildIndex(i);

    //? lets assume that the smallest element is at index i, ab hum compare karenge value at index i with the value at left child index and right child index, 
    let smallest = i;

    //! hme ye comparision and swapping heap ki length tak hi rakhni h wrna undefined store hone lagega heap me,
    let heapLength = this.heap.length;

    if (leftChildIndex < heapLength && this.heap[leftChildIndex] < this.heap[smallest]) {
      //? agar left child value i se chhota hai to ham smallest ko left child index se update karenge
      smallest = leftChildIndex;
    }
    if (rightChildIndex < this.heapLength && this.heap[rightChildIndex] < this.heap[smallest]) {
      //? agar right child value i se chhota hai to ham smallest ko right child index se update karenge
      smallest = rightChildIndex;
    }
    //? ab ham compare karenge smallest index with the current index i, agar smallest index i se different hai to ham swap karenge, aur phir ham heapify down ko recursively call karenge smallest index par, taki hum correct position tak pahuch jaye
    if (smallest !== i) { // use strict comparision not losely
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }
}

// for checking the code
let minHeap2 = new MinHeap2();
minHeap2.insert(5);
minHeap2.insert(22);
minHeap2.insert(10);
minHeap2.insert(20);
minHeap2.insert(30);
// console.log(minHeap2.heap);
// console.log(minHeap2.deleteMin());
// console.log(minHeap2.heap);


//! One more Operation in heap is 'Peek' operation, jisme hum minimum element ko dekh sakte hain bina usko delete kiye, to peek operation me hum simply root element ko return karenge, kyuki minimum element hamesha root par hota hai, to ham ek helper function banayege peek ke naam se, jisme hum simply root element ko return karenge

class MinHeap3 {
  constructor(i) {
    this.heap = [];
  }

  getLeftChildIndex(i) {
    return (2 * i) + 1;
  }
  getRightChildIndex(i) {
    return (2 * i) + 2;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  insert(val) {
    this.heap.push(val);
    let lastIndex = this.heap.length - 1;
    this.heapifyUp(lastIndex);
  }

  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[i]];
        i = parentIndex;
      } else { break; }
    }
  }

  deleteMin() {
    if (this.heap.length === 0) {
      return null;
    } else if (this.heap.length === 1) {
      return this.heap.pop();
    } else {
      let min = this.heap[0];
      let lastIndex = this.heap.length - 1;
      [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];
      this.heap.pop();
      this.heapifyDown(0);
      return min;
    }
  }

  heapifyDown(i) {
    let leftChildIndex = this.getLeftChildIndex(i);
    let rightChildIndex = this.getRightChildIndex(i);
    let smallest = i;
    let heapLength = this.heap.length;
    if (leftChildIndex < heapLength && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }
    if (rightChildIndex < heapLength && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }

  peek() {
    if (this.heap.length === 0) {
      return null; //? if heap is empty, then we cannot peek minimum element
    }
    return this.heap[0];
  }
}

// for checking the code
let minHeap3 = new MinHeap3();
console.log("Peeking")
minHeap3.insert(5);
minHeap3.insert(22);
minHeap3.insert(10);
minHeap3.insert(20);
minHeap3.insert(30);
// console.log(minHeap3.heap);
// console.log(minHeap3.peek());
// console.log(minHeap3.heap);

//!  ======================================
//* MaxHeap
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//* Min Heap vs Max Heap — Sirf 3 Comparisons Ka Farak
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//*
//* ┌────────────────────┬──────────────────────────┬──────────────────────────┐
//* │ Comparison         │ Min Heap                 │ Max Heap                 │
//* ├────────────────────┼──────────────────────────┼──────────────────────────┤
//* │ heapifyUp          │ heap[idx] < heap[parent] │ heap[idx] > heap[parent] │
//* │ heapifyDown (left) │ heap[left] < heap[small] │ heap[left] > heap[large] │
//* │ heapifyDown (right)│ heap[right] < heap[small]│ heap[right] > heap[large]│
//* │ Root               │ Sabse chhota             │ Sabse bada               │
//* │ Variable name      │ smallestElem             │ largestElem              │
//* └────────────────────┴──────────────────────────┴──────────────────────────┘
//*
//* 🔑 Rule: Poora structure same — sirf `<` ki jagah `>` (comparisons ulti)
//*
//* 📌 Example (same values, different heaps):
//*    Min Heap root  → sabse chhota element
//*    Max Heap root  → sabse bada element
//*
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//!  ======================================

//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//* 🎯 TRICK — Ek hi Heap class, do heap types (Min + Max)
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//*
//* Do alag classes (MinHeap, MaxHeap) banane ki zaroorat nahi.
//* Ek class banao, aur ek "comparator" function pass karo.
//* Code duplicate nahi hoga, aur flexible rahega.
//*
//* 🔑 Comparator kya karta hai?
//*    compare(a, b) batata hai — "kya a, b se BETTER hai?"
//*    - true  → a better hai, upar jayega
//*    - false → b better hai, wahi rahega
//*
//* Examples:
//*    (a, b) => a < b   →  Min Heap (chhota upar)
//*    (a, b) => a > b   →  Max Heap (bada upar)
//*
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


class Heap {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator;   // (a, b) => boolean
  }

  getLeftChildIdx(i) {
    return (2 * i) + 1;
  }
  getRightChildIdx(i) {
    return (2 * i) + 2;
  }
  getParentIdx(i) {
    return Math.floor((i - 1) / 2);
  }

  insert(val) {
    this.heap.push(val);
    let lastIdx = this.heap.length - 1;
    this.heapifyUp(lastIdx);
  }

  heapifyUp(idx) {
    while (idx > 0) {
      let parentIdx = this.getParentIdx(idx);

      // Agar child parent se "better" hai (compare true), to swap
      if (this.compare(this.heap[idx], this.heap[parentIdx])) {
        [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  deleteRoot() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    let root = this.heap[0];
    let lastIdx = this.heap.length - 1;
    [this.heap[0], this.heap[lastIdx]] = [this.heap[lastIdx], this.heap[0]];

    this.heap.pop();
    this.heapifyDown(0);

    return root;
  }

  heapifyDown(idx) {
    let leftChildIdx = this.getLeftChildIdx(idx);
    let rightChildIdx = this.getRightChildIdx(idx);

    let best = idx;
    let heapLength = this.heap.length;

    // Left child agar "better" hai to best update karo
    if (leftChildIdx < heapLength && this.compare(this.heap[leftChildIdx], this.heap[best])) {
      best = leftChildIdx;
    }

    // Right child agar "better" hai to best update karo
    if (rightChildIdx < heapLength && this.compare(this.heap[rightChildIdx], this.heap[best])) {
      best = rightChildIdx;
    }

    if (best !== idx) {
      [this.heap[idx], this.heap[best]] = [this.heap[best], this.heap[idx]];
      this.heapifyDown(best);
    }
  }

  peek() {
    return this.heap[0] ?? null;
  }

  size() {
    return this.heap.length;
  }
}


//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//* 📌 USAGE — Min Heap vs Max Heap
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//! Min Heap — chhota upar
// let minHeap = new Heap((a, b) => a < b);
// minHeap.insert(8);
// minHeap.insert(3);
// minHeap.insert(5);
// minHeap.insert(1);
// console.log(minHeap.heap);         // [1, 3, 5, 8]
// console.log(minHeap.deleteRoot()); // 1
// console.log(minHeap.heap);         // [3, 8, 5]

//! Max Heap — bada upar
// let maxHeap = new Heap((a, b) => a > b);
// maxHeap.insert(8);
// maxHeap.insert(3);
// maxHeap.insert(5);
// maxHeap.insert(1);
// console.log(maxHeap.heap);         // [8, 3, 5, 1]
// console.log(maxHeap.deleteRoot()); // 8
// console.log(maxHeap.heap);         // [5, 3, 1]


//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//* 🎨 CUSTOM COMPARATOR KE EXAMPLES
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Numbers — min heap
new Heap((a, b) => a < b)

// Numbers — max heap
new Heap((a, b) => a > b)

// Objects — chhota priority pehle
new Heap((a, b) => a.priority < b.priority)

// Objects — bada priority pehle
new Heap((a, b) => a.priority > b.priority)

// Pairs — pehle first compare, phir second
new Heap((a, b) => a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1])


//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//* 📊 COMPARISON — Do Alag Classes vs Ek Generic Class
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//*
//* ┌──────────────────┬────────────────────┬────────────────────┐
//* │ Point            │ Two Classes        │ One Generic Class  │
//* ├──────────────────┼────────────────────┼────────────────────┤
//* │ Code             │ Duplicate hota hai │ Ek hi baar         │
//* │ Flexibility      │ Fixed min/max      │ Koi bhi comparator │
//* │ Readability      │ Explicit naam      │ Thoda abstract     │
//* │ Reusability      │ Kam                │ Zyada              │
//* │ Objects ke liye  │ Nahi kaam karta    │ Bilkul kaam karega │
//* └──────────────────┴────────────────────┴────────────────────┘
//*
//* 🔑 Note: Do alag classes bhi theek hai — concept clear ho to.
//*          Generic class interview me impressive lagti hai.


//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//* ⚡ QUICK REFERENCE — Yaad Rakhne Ka Rule
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//*
//* compare(a, b) — "kya a, b se pehle aana chahiye?"
//*
//*    Min Heap  →  compare = (a, b) => a < b    "chhota pehle"
//*    Max Heap  →  compare = (a, b) => a > b    "bada pehle"
//*
//* Heapify me sirf yahi compare use hota hai — baaki sab same:
//*    heapifyUp   → child parent se better? → swap
//*    heapifyDown → child best se better?   → best update
//*    root        → sabse better element
//*
//* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//!  ======================================


//?-------------------------------------------------------------
//*-----------------
//! Heap Sort
//*-----------------