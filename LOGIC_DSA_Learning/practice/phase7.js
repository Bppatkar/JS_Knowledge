//! Tree - [ Binary Tree ]
//? Tree is a non-linear, hierarchical data structure consisting of nodes connected by edges, organized in a top-down parent-child relationship. Starting from a single root node, it branches downward to represent data hierarchically (e.g., file systems), with no cycles

//* Binary Search Tree (BST) is a specialized type of binary tree that maintains a specific ordering property: for any given node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater. This structure allows for efficient searching, insertion, and deletion operations, making it a fundamental data structure in computer science for tasks like sorting and searching.

//! Types of Tree Traversal
//* - Pre-order Traversal: Visit the root node first, then recursively traverse the left subtree, followed by the right subtree.
//? (Root -> Left -> Right)

//* - In-order Traversal: Recursively traverse the left subtree first, then visit the root node, followed by the right subtree.
//? (Left -> Root -> Right)

//* - Post-order Traversal: Recursively traverse the left subtree first, then the right subtree, and finally visit the root node.
//? (Left -> Right -> Root)

//! Simply means - Pre(root first), In(root middle), Post(root end)

//* Level-order Traversal: Visit nodes level by level, starting from the root and moving down to the leaves, typically implemented using a queue. (Level by Level)


/*
              1               Level 0
           /     \
          2       3           Level 1
         / \       \
        4   5       8         Level 2
           / \     /
          6   7   9           Level 3

*/
//! Pre -  [1,2,4,5,6,7,3,8,9]
//! In -   [4,2,6,5,7,1,3,9,8]
//! Post - [4,6,7,5,2,9,8,3,1]
//! Level -[[1],[2,3], [4,5,8], [6,7,9]]

/* 
                          ┌─────────────────────────────┐
                          │            ROOT             │
                          │         (level 0)           │
                          └──────────────┬──────────────┘
                                         │
                                    ┌────▼────┐
                                    │    1    │  ← root (depth 0)
                                    └────┬────┘
                          ┌──────────────┴──────────────┐
                          │                             │
                     ┌────▼────┐                   ┌────▼────┐
                     │    2    │                   │    3    │  ← level 1
                     └────┬────┘                   └────┬────┘
                     ┌────┴────┐                   ┌────┴────┐
                     │         │                   │         │
                ┌────▼──┐ ┌────▼──┐           ┌────▼──┐ ┌────▼──┐
                │   4   │ │   5   │           │ null  │ │   8   │  ← level 2
                └───────┘ └───┬───┘           └───────┘ └───┬───┘
                          ┌───┴───┐                    ┌────┴────┐
                          │       │                    │         │
                     ┌────▼──┐ ┌──▼────┐          ┌────▼──┐ ┌────▼──┐
                     │   6   │ │   7   │          │   9   │ │ null  │  ← level 3
                     └───────┘ └───────┘          └───────┘ └───────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  TERM              KAUN KAUN                     MATLAB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Root              1                             Sabse upar wala node

  Parent            1, 2, 3, 5, 8                Jiske neeche children hain
                    (1 → 2,3 ka parent)
                    (2 → 4,5 ka parent)
                    (3 → 8 ka parent)
                    (5 → 6,7 ka parent)
                    (8 → 9 ka parent)

  Children          2, 3      → 1 ke children
                    4, 5      → 2 ke children
                    8         → 3 ka child
                    6, 7      → 5 ke children
                    9         → 8 ka child

  Siblings          2 aur 3        (same parent: 1)
                    4 aur 5        (same parent: 2)
                    6 aur 7        (same parent: 5)

  Leaf              4, 6, 7, 9                 Jinke koi children nahi
  (no children)

  Internal Node     1, 2, 3, 5, 8              Jinke children hain
  (non-leaf)

  Subtree           2 → 4, 5, 6, 7             Kisi bhi node ke neeche
                    (2 ka subtree)              ka poora structure
                    5 → 6, 7
                    (5 ka subtree)

  Level             0  →  1
                    1  →  2, 3
                    2  →  4, 5, 8
                    3  →  6, 7, 9

  Depth             1 ka depth  = 0    (root se doori)
  (root se)         2 ka depth  = 1
                    4 ka depth  = 2
                    6 ka depth  = 3

  Height            4  ka height = 0   (leaf se doori)
  (leaf se)         6  ka height = 0
                    5  ka height = 1
                    2  ka height = 2
                    1  ka height = 3   (tree ki height)

  Degree            1 → 2 children
  (kitne children)  2 → 2 children
                    3 → 1 child
                    5 → 2 children
                    8 → 1 child
                    4,6,7,9 → 0 children

  Ancestor          6 ke ancestors: 5, 2, 1
  (upar wale)       9 ke ancestors: 8, 3, 1

  Descendant        1 ke descendants: 2,3,4,5,6,7,8,9
  (neeche wale)     3 ke descendants: 8, 9

  Left Child        2 → 1 ka left child
                    4 → 2 ka left child
                    6 → 5 ka left child
                    9 → 8 ka left child

  Right Child       3 → 1 ka right child
                    5 → 2 ka right child
                    8 → 3 ka right child
                    7 → 5 ka right child

  Balanced?         Haan — har node ke dono subtrees ki
                    height ka farak ≤ 1 hai

  Binary Tree?      Haan — har node ke max 2 children
  -----------------------------------------------------------
  -----------------------------------------------------------
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TODO:-  NULL vs UNDEFINED — NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. BASIC DIFFERENCE
   • undefined = "value assign hi nahi hui"
   • null      = "value deliberately khaali rakhi hai"

2. KAISE AATE HAIN
   • undefined → jab variable declare karo, value na do
                → jab function parameter pass na karo
                → jab object me property na ho
   • null      → jab khud assign karo: `let x = null;`

3. COMPARISON
   • undefined === null   → false
   • undefined == null    → true   (loose equality)
   • null === null        → true
   • undefined === undefined → true

4. CHECK KARNE KE TARIKE
   • Sirf null check karna ho    → `if (x === null)`
   • Sirf undefined check karna ho → `if (x === undefined)`
   • Dono check karne ho         → `if (x == null)`  ← loose equality
   • Aur bhi safe               → `if (!x)` (lekin 0, "", false bhi catch karega)

5. TREE / LINKED LIST ME KAUNSA USE KAREIN
   • Standard practice: `null` use karo
   • Constructor me: `undefined → null` convert kar do
     `this.left = (left === undefined ? null : left);`
   • Isse poore code me sirf `null` handle karna padega
   • Traversal me sirf `curr === null` check kaafi hai

6. AGAR CONSTRUCTOR SE DEFAULT HATA DO
   • `new TreeNode(1)` → left/right `undefined` honge
   • Traversal me `curr === null` fail hoga , kyonki `curr` undefined hai
   • `curr == null` (loose) use karna padega — null aur undefined dono catch
   • Isliye constructor me convert karna better hai

7. YAAD RAKHNE KA RULE
   • Consistency zaroori hai
   • Ek jagah `null` use karo, poore code me `null` hi rakhо
   • Mix mat karo — warna `==` vs `===` ka confusion banega
   • Best practice: constructor me `undefined → null` convert karo

8. EK LINE ME
   • `null` = developer ne khaali kiya
   • `undefined` = JavaScript ne khaali chhoda
   • Code me sirf `null` handle karo, `undefined` ko constructor me convert kar do

*/

//! Leetcode 144. Binary Tree Preorder Traversal
//? Recursive solution
// always practice to make tree node
class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}
let root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);

var preorderTraversal = function (root) {
  let ans = [];
  function traversal(curr) {
    if (curr === null) return;
    ans.push(curr.val);
    traversal(curr.left);
    traversal(curr.right);
  }
  traversal(root);
  return ans;
}
// console.log(preorderTraversal(root)); // Output: [1,2,3]

//? Iterative approch [we use stack in Iterative approch]
var preorderTraversalIterative = function (root) {
  if (root === null) return [];
  let stack = [root], ans = [];
  while (stack.length > 0) {
    let node = stack.pop();
    ans.push(node.val);

    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)

  }
  // console.log(ans);
  return ans;
}
// console.log(preorderTraversalIterative(root)); // Output: [1,2,3]


// i want commit message for this file that whatever i learned about tree and binary tree and traversal methods and also about null vs undefined in javascript i have added in this file in bullet point.
// git commit - m "Added comprehensive notes on Tree and Binary Tree concepts, traversal methods (Pre-order, In-order, Post-order, Level-order), and detailed explanation of null vs undefined in JavaScript with examples and best practices."