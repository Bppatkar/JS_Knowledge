//! LinkedList
/*
1. 4 dabbe banao jinki values hon: 5, 15, 25, 35.
2. Un chaaron ko aapas mein next se jodo.  
3. Ek function likho printList(head) jo while loop chala kar saari values ko onsole par print kare.  
 */


//* Linking [nodeA.next = nodeB] + Traversal [curr = curr.next]

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
let node1 = new ListNode(5);
let node2 = new ListNode(15);
let node3 = new ListNode(25);
let node4 = new ListNode(35);

node1.next = node2;
node2.next = node3;
node3.next = node4;

function printList(head) {
  let curr = head;
  while (curr != null) {
    console.log(curr.val);
    curr = curr.next;
  }
}

//* 3 Main Operations [Insertion, Deletion, Search/count]
// Insertion - [front, rear, middle]
// Deletion - [taking out any node from list]
// Search/Count - [searching any val or finding length of list]

/*
1. Dabba (Node) StructureHar dabba do cheezein hold karta hai:
val -> Dabbe ke andar ka data
next -> Agle dabbe ka dhaaga (Reference)


+-------------------+
|  val  |   next    |  ---> Agle dabbe ka pata (ya null)
+-------------------+

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

2. Insertion OperationsA. Insert at Front (Beginning)Goal: newNode ko sabse aage lagana aur head board shift karna.


Step 0: Initial 

HEAD
  ↓
[ 10 | • ] ---> [ 20 | • ] ---> null

[ newNode: 5 | null ] (Zameen par alag pada hai)


Step 1: newNode.next = head
HEAD
  ↓
[ 10 | • ] ---> [ 20 | • ] ---> null
  ↑
[  5 | • ]


Step 2: head = newNode
HEAD
  ↓
[  5 | • ] ---> [ 10 | • ] ---> [ 20 | • ] ---> null

newNode.next = head;
head = newNode;


B. Insert at Rear (End)Goal: Aakhri dabbe tak chalna aur uska next naye dabbe se jodna.

Step 0: Traverse to the last node

HEAD
  ↓
[ 10 | • ] ---> [ 20 | • ] ---> [ 30 | null ]
                  curr          curr.next === null (STOP HERE)


Step 1: curr.next = newNode
HEAD
  ↓
[ 10 | • ] ---> [ 20 | • ] ---> [ 30 | • ] ---> [ 40 | null ]

let curr = head;
while (curr.next !== null) {
  curr = curr.next;
}

curr.next = newNode;


C. Insert in Middle (Between [20] and [30])Golden Rule: Agle dabba ka address pehle secure karo, warna chain toot jayegi.

Step 0: curr is at [20]
[ 20 | • ] ------------------------> [ 30 | null ]
  curr
            [ newNode: 25 | null ]


Step 1: newNode.next = curr.next (Pehle aage ka dhaaga baandho)
[ 20 | • ] ------------------------> [ 30 | null ]
  curr                                  ↑
            [ newNode: 25 | • ] --------+


Step 2: curr.next = newNode (Ab pichhe ka dhaaga jodo)
[ 20 | • ] ---> [ 25 | • ] ---> [ 30 | null ]
  curr            newNode

newNode.next = curr.next;
curr.next = newNode;

3. Deletion OperationsA. Delete Front (Head hatana)Goal: head tag ko ek kadam aage badhana.
Before:
HEAD
  ↓
[ 10 | • ] ---> [ 20 | • ] ---> [ 30 | null ]

After: head = head.next
                HEAD
                  ↓
[ 10 | • ]     [ 20 | • ] ---> [ 30 | null ]
 (Garbage)

head = head.next;


B. Delete After a Node ([20] ke baad wala [30] delete karna)
Goal: [20] ka dhaaga seedha [40] se jod dena ([30] bypass ho jayega).


Before:
[ 10 | • ] ---> [ 20 | • ] ---> [ 30 | • ] ---> [ 40 | null ]
                  curr

Operation: curr.next = curr.next.next

After:
                +------------------------------+
                |                              ↓
[ 10 | • ] ---> [ 20 | • ]     [ 30 | • ]     [ 40 | null ]
                  curr          (Bypassed)

curr.next = curr.next.next;


4. Traversal / Read LoopGolden Rule: Jab saare dabbe dekhne hon, toh loop tab tak chalao jab tak curr !== null.
curr = head
  ↓
[ 10 | • ] ---> [ 20 | • ] ---> [ 30 | null ] ---> null

1. Print 10 -> curr moves to [20]
2. Print 20 -> curr moves to [30]
3. Print 30 -> curr moves to null
4. curr === null -> Loop exits


let curr = head;
while (curr !== null) {
  console.log(curr.val);
  curr = curr.next;
}
Yeh notes repository ya topic notes mein save kar sakte ho.
 */
//-----------------------------------------------


//! Leetcode 1290. Convert Binary Number in a Linked List to Integer
/* 
Decimal mein: ans = ans * 10 + digit
Binary mein: ans = ans * 2 + node.val
*/
var getDecimalValue = function (head) {
  let ans = 0, curr = head;
  while (curr !== null) {
    ans = ans * 2 + curr.val;
    curr = curr.next;
  }
  return ans;
}
// console.log(getDecimalValue(head = [1, 0, 1])); // Output: 5
// console.log(getDecimalValue(head = [1, 1, 1, 1])); // Output: 15
// console.log(getDecimalValue(head = [0])); // Output: 0


//! Leetcode 83. Remove Duplicates from Sorted List
var deleteDuplicates = function (head) {
  let curr = head;
  while (curr !== null && curr.next !== null) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else curr = curr.next;
  }
  return head;
}

//! Leetcode 203. Remove Linked List Elements
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var removeElements = function (head, val) {
  let dummy = new ListNode(-1, head);
  let curr = dummy;
  while (curr !== null && curr.next !== null) {
    if (curr.next.val === val) curr.next = curr.next.next;
    else curr = curr.next;
  }
  return dummy.next;
}

//! Leetcode 876. Middle of the Linked List
var middleNode = function (head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

//! Leetcode 160. Intersection of Two Linked Lists
var getIntersectionNode = function (headA, headB) {
  let lenA = 0, lenB = 0;
  let currA = headA, currB = headB;

  // 1. Calculate lengths
  while (currA !== null) { lenA++; currA = currA.next; } // O(n)
  while (currB !== null) { lenB++; currB = currB.next; } // O(m)

  // 2. Reset pointers
  currA = headA;
  currB = headB;

  // 3. Align start points
  let diff = Math.abs(lenA - lenB);
  if (lenA > lenB) {
    while (diff > 0) { currA = currA.next; diff--; } // O(n)
  } else {
    while (diff > 0) { currB = currB.next; diff--; } // O(m)
  }

  // 4. Move together until collision or null
  while (currA !== currB) {
    currA = currA.next;  // O(n)
    currB = currB.next;  // O(m)
  }

  return currA;
}; // O(n) + O(m) = O(n + m) time complexity, O(1) space complexity


//* Optimise one [wihtout calculating lengths]
var getIntersectionNodeOptimized = function (headA, headB) {
  let pointerA = headA;
  let pointerB = headB;

  while (pointerA !== pointerB) {
    // if (pointerA === null) pointerA = headB;
    // else pointerA = pointerA.next;
    // if (pointerB === null) pointerB = headA;
    // else pointerB = pointerB.next;
    pointerA = (pointerA === null) ? headB : pointerA.next;
    pointerB = (pointerB === null) ? headA : pointerB.next;
  }
  return pointerA;
}
