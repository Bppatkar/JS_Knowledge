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

//! Leetcode 141. Linked List Cycle [Floyd's Cycle-Finding Algorithm]
//* Bruteforce using set
var hasCycle = function (head) {
  let visited = new Set();
  let curr = head;
  while (curr != null) {
    if (visited.has(curr)) return true;
    else {
      visited.add(curr);
    }
    curr = curr.next;
  }
  return false;
} // TC - O(n) and SC - O(n)

//* Optimise one
var hasCycle = function (head) {
  let slow = head, fast = head;
  while (fast != null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

//! Leetcode 206. Reverse Linked List
var reverseList = function (head) {
  let prev = null, curr = head;

  while (curr != null) {
    let next = curr.next;
    curr.next = prev; // fliping the arrow from R to L
    prev = curr;
    curr = next;
  }

  // Yeh loop tab tak chalega jab tak curr !== null ho.
  // Jab curr null par chala jayega, toh sabse aakhri dabba kiske paas hoga? prev ke paas.
  return prev;
}

//!===========================
//*===========================
/* 
Abhi Tak Ka Level Check: -
///? Tumne Singly Linked List ke 4 core foundational patterns successfully code kar liye hain:

1- Basic Traversal & Logic: Binary to Integer (LC 1290) & Remove Duplicates (LC 83)
2- Sentinel / Dummy Node Technique: Remove Elements (LC 203)
3- Two-Pointer Fast & Slow: Middle of List (LC 876) & Cycle Detection (LC 141)
4- Pointer Inversion (In-place Reversal): Reverse List (LC 206)

*/
//*===========================
//!===========================

//! Leetcode 234. Palindrome Linked List
//* bruteforce [two pointer with extra space array]
var isPalindrome = function (head) {
  let arr = [], left = 0;
  let curr = head;
  while (curr != null) {
    arr.push(curr.val);
    curr = curr.next;
  }
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++; right--;
  }
  return true;
}

//* wihtout extra space [Optimise One]
// 1- finding middle with fast slow pointer
// 2- reverse half part [second one]
// 3- compare [one pointer fast half starting, second pointer second half starting move 1-1 step]
var isPalindrome = function (head) {
  // 1. Find Middle
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. Reverse Second Half [after reverse slow become null and head is now on  prev]
  let prev = null;
  while (slow != null) {
    let next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // 3. Compare First Half and Reversed Second Half
  let left = head, right = prev;
  while (prev !== null) {
    if (left.val != right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}


//! Leetcode 21. Merge Two Sorted Lists
var mergeTwoLists = function (list1, list2) {
  let dummyNode = new ListNode(-1);
  let curr = dummyNode;

  while (list1 != null && list2 != null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    }
    else {
      curr.next = list2;
      list2 = list2.next;
    }

    curr = curr.next;
  }

  // rest of value putting in ListNode
  // in linkedlist no need to run loop, just write this and rest of item automatically added to the listnode
  curr.next = list1 || list2;

  return dummyNode.next;
}

//! Leetcode 19. Remove Nth Node From End of List
/* 
1. Length Count Approach (Two-Pass)
Goal: Pehle pata karo total dabbe kitne hain, fir aage se target position calculate karo.

Steps:
1- Safety: dummyNode ko head se jodo (taaki agar pehla dabba delete ho, toh list safe rahe).
2- Pass 1 (Length): head se chalkar asli list ki total length (L) count karo.
3- Target Calculation: Peeche se n-th dabba matlab aage se (L - n) steps.
4- Pass 2 (Reach Target-1): dummyNode se exactly (L - n) kadam aage chalo. Tu theek us dabbe par rukega jiske aage wale ko delete karna hai.
5- Bypass & Return: curr.next = curr.next.next karke target ko delete karo aur dummyNode.next return karo.Complexity: Time: O(N) (2-pass), Space: O(1)
*/
var removeNthFromEnd = function (head, n) {

  let dummyNode = new ListNode(-1, head);

  let length = 0, curr = head;

  while (curr != null) {
    curr = curr.next; length++;
  }

  curr = dummyNode;
  let counter = length - n;

  while (counter > 0) {
    curr = curr.next;
    counter--;
  }
  curr.next = curr.next.next;
  return dummyNode.next;
};

//* Next approch
/* 
2. Fast & Slow Pointer Approach (One-Pass / Fixed Gap)

Goal: Bina length jaane, do pointers ke beech n steps ki doori bana do taaki end par pahunchte hi target mil jaye.

Steps:
1- Safety: Dono pointers (pA aur pB) ko dummyNode par khada karo.
2- Create Gap: pB ko pehle hi n kadam aage bhej do (dono ke beech n ka fixed gap ban gaya).
3- Move Together: Dono ko 1-1 kadam aage badhao jab tak pB.next !== null na ho jaye.

pB.next !== null tak kyun chalana hai? Agar while (pB !== null) chalaya to:
- pB aakhri node ke bhi paar chalkar null par rukega (1 extra step).
- Isse pA bhi 1 step aage nikal kar theek usi node par khada ho jayega jise delete karna hai — jahan se delete karna impossible ho jata hai.
- Isliye while (pB.next !== null) chalate hain: Taaki pB list ke last valid node par hi ruk jaye, null par na jaye. Aur pA theek deletion wale node ke 1 kadam peeche (previous node par) ruk sake, jahan se pA.next = pA.next.next safely ho sake.


4- Target Lock: Jaise hi pB aakhri node par rukega, pA theek deletion wale node ke pichhle dabbe par khada hoga.
5- Bypass & Return: pA.next = pA.next.next karo aur dummyNode.next return karo.Complexity: Time: O(N) (1-pass), Space: O(1)
*/

var removeNthFromEnd = function (head, n) {
  let dummyNode = new ListNode(-1, head);
  let pA = dummyNode, pB = dummyNode;

  while (n > 0) {
    pB = pB.next;
    n--;
  }

  while (pB.next != null) {
    pA = pA.next;
    pB = pB.next;
  }
  pA.next = pA.next.next;

  return dummyNode.next;
}

//! Leetcode 142. Linked List Cycle II
//* Same as lc 141 we solved using set [we need to return the node, to curr hi return kr denge because wo node ka address hoga jahan cycle start ho rahi hai,  otherwise false return kr denge]
var detectCycle = function (head) {
  let visited = new Set();
  let curr = head;
  while (curr != null) {
    if (visited.has(curr)) return curr;
    else {
      visited.add(curr);
    }
    curr = curr.next;
  }
  return null;
}; // TC - O(n) and SC - O(n)

//* Optimise one [Floyd's Cycle-Finding Algorithm] - (O(1))
/* 
///! Floyd's Cycle Finding Algorithm (Cycle II — Entry Point)

Pattern Name: Two-Pointer (Slow & Fast / Tortoise & Hare)

Problem Type: Find the starting node of a cycle in O(N) time and O(1) space.

Tune socha: Fast ek cycle complete karke last par pahunchega aur entry point kaise nikaalein.
Aao isko mathematical geometry se dekhte hain:

Plaintext:

  L1 (Seedha rasta)          L2 (Milne tak)
[head] -------------------> [Entry] -------------> [Meeting Point]
                              ↑                          |
                              +--------------------------+
                                      L3 (Bacha hua)

Maan lo:

- head se lekar Cycle ke Entry point tak ka seedha distance = L_1
- Entry point se lekar jahan slow aur fast takraye (Meeting Point) tak ka distance = L_2
- Meeting Point se wapas Entry point tak ka cycle ka bacha hua hissa = L_3

Ab dhyan se dekho: slow ne total kitni doori chali?

distSlow = L_1 + L_2

Fast ne double doori chali:  distFast = 2 * (L_1 + L_2) = 2L_1 + 2L_2

Lekin fast ne asal mein cycle ke chakkar kaat kar doori chali:

distFast = L_1 + L_2 + {Cycle} = L_1 + L_2 + (L_2 + L_3)

Dono equations ko equate karo: 2L_1 + 2L_2 = L_1 + 2L_2 + L_3 = L_1 = L_3 Iska Asal Matlab Kya Hai? 

L_1 = L_3 ka matlab:

head se Entry tak ki doori (L_1) theek barabar hai Meeting Point se Entry tak ki doori (L_3) ke!

Core Intuition:
Head se entry tak ki doori = meeting point se entry tak ki doori (L_1 = L_3).

Algorithm (2-Phase Rule):

Phase 1 (Detect Loop):
  1. Slow ko 1 step aur fast ko 2 step chalao.
  2. Agar fast ya fast.next null ho gaya --> no cycle, return null.
  3. Jaise hi slow === fast ho gaya --> loop mil gaya, Phase 2 par chalo.

Phase 2 (Find Entry Gate):
  1. Ek pointer p1 = head par set karo.
  2. Doosra pointer p2 = slow (meeting point) par rehne do.
  3. Dono ko 1-1 step aage badhao jab tak p1 !== p2.
  4. Jahan dono milenge (p1 === p2), wahi cycle ka starting node hoga --> return p1.
*/

var detectCycle = function (head) {
  let slow = head, fast = head;

  // 1. finding meeting point
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 2. finding entry point
      let p1 = head, p2 = slow;

      while (p1 != p2) {
        p1 = p1.next;
        p2 = p2.next;
      }
      return p1; // returning the entry point of the cycle
    }
  }

  return null;
}