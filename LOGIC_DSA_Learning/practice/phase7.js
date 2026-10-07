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


// class TreeNode {
//   constructor(val, left, right) {
//     this.val = (val === undefined ? 0 : val);
//     this.left = (left === undefined ? null : left);
//     this.right = (right === undefined ? null : right);
//   }
// }
// let root = new TreeNode(1);
// root.right = new TreeNode(2);
// root.right.left = new TreeNode(3);

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

    if (node.right) stack.push(node.right);
    // we put right first because stack is LIFO, so left will be processed first because right is pushed first and left is pushed later, so left will be on top of the stack
    if (node.left) stack.push(node.left);

  }
  // console.log(ans);
  return ans;
}
// console.log(preorderTraversalIterative(root)); // Output: [1,2,3]

//! Leetcode 94. Binary Tree Inorder Traversal
//? Recursive approach
var inorderTraversal = function (root) {
  let ans = [];
  function traversal(curr) {
    if (curr === null) return;
    traversal(curr.left);
    ans.push(curr.val);
    traversal(curr.right);
  }
  traversal(root);
  return ans;
}
// console.log(inorderTraversal(root)); // Output: [1,3,2]

//? Iterative approch
var inorderTraversalIterative = function (root) {

  let stack = [], ans = [], curr = root;
  while (curr != null || stack.length > 0) {

    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    ans.push(curr.val);
    curr = curr.right;
  }
  return ans;
}
// console.log(inorderTraversalIterative(root)); // Output: [1,3,2]

//! Leetcode 145. Binary Tree Postorder Traversal
//? Recursive approach
var postorderTraversal = function (root) {
  if (root === null) return [];
  let ans = [];
  function traversal(curr) {
    if (curr === null) return;
    traversal(curr.left);
    traversal(curr.right);
    ans.push(curr.val);
  }
  traversal(root);
  return ans;
}
// console.log(postorderTraversal(root)); // Output: [3,2,1]

//? Iterative approch [using 2 stack]
// we r using 2 stack here for saving the order of nodes, first we push the root to stack1, then we pop from stack1 and push it to stack2, then we push its left and right children to stack1, and repeat this process until stack1 is empty, and in stack2 we will have the nodes in postorder, but in reverse order, so we need to reverse the stack2 to get the correct postorder traversal
var postorderTraversalIterative = function (root) {
  let s1 = [root], s2 = [], ans = [];
  while (s1.length > 0) {
    let curr = s1.pop();
    s2.push(curr);
    s1.push(curr.left);
    s1.push(curr.right);
  }
  for (let i = s2.length - 1; i >= 0; i--) {
    ans.push(s2[i].val);
  }
  return ans;
}

//? Iterative approch [using 1 stack]
// we r using 1 stack here for saving the order of nodes, first we push the root to stack, then we pop from stack and push its left and right children to stack, and repeat this process until stack is empty, and in ans we will have the nodes in postorder, but in reverse order, so we need to reverse the ans to get the correct postorder traversal
var postorderTraversalIterative = function (root) {
  let stack = [], ans = [], curr = root;
  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      ans.push(curr.val);
      curr = curr.right;
    }
    curr = stack.pop();
    curr = curr.left;
  }
  return ans.reverse();
}
// my way
function postOrderTraversalIterative1Stack(root) {
  if (!root) return [];
  let stack = [root], ans = [];
  while (stack.length) {
    let curr = stack.pop();
    ans.push(curr.val)
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
  }
  return ans.reverse();
}

// console.log(postorderTraversalIterative(root)); // Output: [3,2,1]

//! Leetcode 102. Binary Tree Level Order Traversal
//? Recursive approach
var levelOrder = function (root) {
  let ans = [];
  function traversal(curr, level) {
    if (!curr) return;
    if (!ans[level]) ans[level] = [];

    ans[level].push(curr.val);
    curr.left && traversal(curr.left, level + 1);
    curr.right && traversal(curr.right, level + 1);
  }
  traversal(root, 0);
  return ans;
}
// console.log(levelOrder(root)); // Output: [[1],[2],[3]]

//? Iterative approch [we use queue {FIFO} here]
var levelOrderIterative = function (root) {
  if (!root) return [];
  let queue = [root], result = [];
  while (queue.length) {
    let totalLevelSize = queue.length;
    let currLevel = [];
    while (totalLevelSize) {
      let curr = queue.shift();
      currLevel.push(curr.val);
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
      totalLevelSize--;
    }
    result.push(currLevel);
  }
  return result;
}
// console.log(levelOrderIterative(root)); // Output: [[1],[2],[3]]


//! DFS vs BFS (for Binary Tree Traversal)

//! DFS (Depth First Search)
//? DFS explores as far down a branch as possible before backtracking.
//* It can be implemented in three main orders: "Pre-order", "In-order", and "Post-order".
//? DFS is memory efficient for deep trees but "may not" find the shortest path in unweighted graphs.
//* DFS uses a stack (in both solution - recursive and iterative) to keep track of nodes, Iska reason ye hai ki, DFS me hum ek branch ke neeche jaate hain, aur jab waha se wapas aate hain, toh hume stack me pehle se stored nodes milte hain jisse hum backtrack kar sakte hain, agar ham yahan array ya list ya queue use karte, toh hume wapas aane ke liye poore tree ko traverse karna padta, jo ki inefficient hota. Isliye stack ka use kiya jata hai DFS me, kyunki stack LIFO (Last In First Out) hota hai, aur ye backtracking ke liye perfect hai.

//! BFS (Breadth First Search)
//? BFS explores all neighbors simply means "Level by Level" before moving to the next level.
//* It can be implemented using "Level-order" and "Zigzag Level-order" traversals.
//? It is "guaranteed to find the shortest path" in unweighted graphs and is useful for problems requiring level-order information. However, it can consume more memory for wide trees.
//* BFS uses a queue to keep track of nodes, iska reason ye hai ki, BFS me hum ek level ke saare nodes ko explore karte hain, aur phir next level me jaate hain, isliye hume queue ka use karna padta hai, kyunki queue FIFO (First In First Out) hota hai, aur ye level order traversal ke liye perfect hai. Agar ham yahan stack use karte, toh hume pehle se stored nodes milte, jisse hum backtrack karte, aur ye BFS ke concept ke against hota. Isliye queue ka use kiya jata hai BFS me.

class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}
// let root = new TreeNode(3);
// root.left = new TreeNode(9);
// root.right = new TreeNode(20);
// root.right.left = new TreeNode(15);
// root.right.right = new TreeNode(7);
// root.right.right.right = new TreeNode(8);


//! Leetcode 104. Maximum Depth of Binary Tree
// top down approch
var maxDepth = function (root) {
  let depth = 0;
  function dfs(curr, level) {
    if (!curr) return;
    if (depth < level) depth = level;
    curr.left && dfs(curr.left, level + 1);
    curr.right && dfs(curr.right, level + 1);
  }
  dfs(root, 1);
  return depth;
};

// bottom up approch [recursion helps to calculate the depth of the tree from the bottom up]
var maxDepthBottomUp = function (root) {
  if (!root) return 0;
  let leftDepth = maxDepthBottomUp(root.left);
  let rightDepth = maxDepthBottomUp(root.right);
  return 1 + Math.max(leftDepth, rightDepth);

}

// console.log("depth of binary tree", maxDepth(root)); // Output: 3
// console.log("depth of binary tree with recursion", maxDepthBottomUp(root)); // Output: 3

let root1 = new TreeNode(5);
root1.left = new TreeNode(4);
root1.right = new TreeNode(8);
root1.left.left = new TreeNode(11);
root1.left.left.left = new TreeNode(7);
root1.left.left.right = new TreeNode(2);
root1.right.left = new TreeNode(13);
root1.right.right = new TreeNode(4);
root1.right.right.right = new TreeNode(1);

//! Leetcode 112. Path Sum
// top down approch
var hasPathSum = function (root, targetSum) {

  if (!root) return false;
  function traversal(curr, targetSum) {
    if (!curr) return false;

    targetSum -= curr.val;
    if (!curr.left && !curr.right) return targetSum === 0;

    if (traversal(curr.left, targetSum)) return true;
    if (traversal(curr.right, targetSum)) return true;
    return false;
  }
  return traversal(root, targetSum);
}

// bottom-up approach
var hasPathSumOtherWay = function (root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;

  let left = hasPathSumOtherWay(root.left, targetSum - root.val);
  let right = hasPathSumOtherWay(root.right, targetSum - root.val);
  return left || right;
}

// console.log(hasPathSum(root1, 22)); // Output: true
// console.log(hasPathSum(root1, 5)); // Output: false


/* 
///! Top-Down vs Bottom-Up 
           | Top-Down               | Bottom-Up                      |
           |----------              |----------                      | 
|Kaam kab: | Node pe pahunchte hi   |Children se answer aane ke baad |
|Info:     | Parent se child        |  Child se parent               |
|Extra param |Haan (level, path)    | Nahi                           |
|Return    | Kuch nahi / void       | Answer                         |
|Answer kahan| Global variable      | Return value                   |


///* Ek line me:-  Top-Down: "Main pehle apna kaam karta hoon, phir bachcho ko bhejta hoon" .
///* Bottom-Up: "Main pehle bachcho se poochta hoon, phir apna kaam karta hoon"

///? Max Depth me tune dono dekhe:
 
Top-Down: dfs(curr, level) — level bahar se aaya, depth global update kiya
Bottom-Up: maxDepth(root) — koi param nahi, 1 + max(left, right) return kiya

*/


//! Leetcode 101. Symmetric Tree
// recursive solution
var isSymmetric = function (root) {

  function isMirror(left, right) {
    // if we find a leaf then we return true because there is no left annd right node
    if (!left && !right) return true;

    // if left is exist but right not exist and if right exist but left not, so if any of them not exist we return false;
    if (!left || !right) return false;

    return left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
  }
  return isMirror(root.left, root.right);
}

//? Iterative approch using queue
var isSymmetric = function (root) {
  let queue = [[root.left, root.right]];

  while (queue.length) {
    let [left, right] = queue.shift();

    if (!left && !right) continue;
    if (!left || !right) return false;

    if (left && right) {
      if (left.val === right.val) {
        queue.push([left.left, right.right], [left.right, right.left]);
      } else return false;
    }
  }
  return true;
}
// we can write same code like
var isSymmetric = function (root) {
  let queue = [];
  queue.push(root.left, root.right);
  while (queue.length) {
    let pair1 = queue.shift();
    let pair2 = queue.shift();

    if (!pair1 && !pair2) continue; // means they both are null
    if (!pair1 || !pair2) return false; // means maybe left or right not exist
    if (pair1.val != pair2.val) return false;

    queue.push(pair1.left, pair2.right);
    queue.push(pair1.right, pair2.left);
  }
  return true
}

//! Leetcode 226. Invert Binary Tree
// recursive approch [top down approch]
var invertTree = function (root) {
  if (!root) return null;
  // [root.left, root.right] = [root.right, root.left];
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);
  return root;
}
// iterative approch [using queue]
var invertTreeIterative = function (root) {
  if (!root) return null;

  let q = [root];

  while (q.length) {
    let node = q.shift();
    [node.left, node.right] = [node.right, node.left];

    node.left && q.push(node.left);
    node.right && q.push(node.right);
  }

  return root;
}

//! Leetcode 100. Same Tree
// recursive approch
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val != q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// iterative approch [using queue] (bottom up approch)
var issameTreeIterative = function (p, q) {
  let queue = [p, q];
  while (queue.length) {
    let p1 = queue.shift();
    let p2 = queue.shift();

    if (!p1 && !p2) continue;
    if (!p1 || !p2) return false;
    if (p1.val != p2.val) return false;

    queue.push(p1.left, p2.left);
    queue.push(p1.right, p2.right);
  }
  return true;
}

//! Leetcode 110. Balanced Binary Tree
var isBalanced = function (root) {
  let ans = true;

  function calculateHeight(curr) {
    if (!curr) return 0;

    let leftHeight = calculateHeight(curr.left);
    let righHeight = calculateHeight(curr.right);
    if (Math.abs(leftHeight - righHeight) > 1) { ans = ans && false; }

    return 1 + Math.max(leftHeight, righHeight);
  }
  calculateHeight(root);
  return ans;
}

//! Leetcode 543. Diameter of Binary Tree
var diameterOfBinaryTree = function (root) {
  let maxDiamter = 0;
  function diameter(root) {
    if (!root) return 0;
    let leftH = diameter(root.left);
    let rightH = diameter(root.right);

    let currDiameter = leftH + rightH
    maxDiamter = Math.max(maxDiamter, currDiameter);

    return 1 + Math.max(leftH, rightH);
  }
  diameter(root);
  return maxDiamter;
}

//! Leetcode 103. Binary Tree Zigzag Level Order Traversal
// recursive solution
var zigzagLevelOrder = function (root) {
  let ans = [];
  function traversal(curr, level) {
    if (!curr) return;
    if (!ans[level]) ans[level] = [];

    if (level % 2 === 0) ans[level].push(curr.val);
    else ans[level].unshift(curr.val);

    curr.left && traversal(curr.left, level + 1);
    curr.right && traversal(curr.right, level + 1);
  }
  traversal(root, 0);
  return ans;
}

// other way to solve [pushing normally ---> but we reversing the ans which level is odd]
var zigzagLevelOrderOtherWay = function (root) {
  let ans = [];
  function traversal(curr, level) {
    if (!curr) return;
    if (!ans[level]) ans[level] = [];

    ans[level].push(curr.val);

    curr.left && traversal(curr.left, level + 1);
    curr.right && traversal(curr.right, level + 1);
  }
  traversal(root, 0);

  // reversing
  for (let i = 0; i < ans.length; i++) {
    if (i % 2 != 0) {
      ans[i].reverse();
    }
  }
  return ans;
}

// iterative solution
var zigzagLevelOrderIterative = function (root) {
  if (!root) return [];
  let q = [root], ans = [], level = 0;
  while (q.length) {
    let currLevel = [], levelSize = q.length;

    while (levelSize) {
      let curr = q.shift();
      if (level % 2 === 0) currLevel.push(curr.val);
      else currLevel.unshift(curr.val);

      curr.left && q.push(curr.left);
      curr.right && q.push(curr.right);
      levelSize--;
    }
    ans.push(currLevel);
    level++;
  }
  return ans;
}

// iterative solution [reversing]
var zigzagLevelOrderIterativeOtherWay = function (root) {
  if (!root) return [];
  let q = [root], ans = [];
  while (q.length) {
    let currLevel = [], levelSize = q.length;

    while (levelSize) {
      let curr = q.shift();
      currLevel.push(curr.val);
      curr.left && q.push(curr.left);
      curr.right && q.push(curr.right);
      levelSize--;
    }
    ans.push(currLevel);
  }
  // reversing
  for (let i = 0; i < ans.length; i++) {
    if (i % 2 != 0) {
      ans[i].reverse();
    }
  }

  return ans;
}

//! Leetcode 572. Subtree of Another Tree
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//? APPROACH 1 — My Solution (Combination of two problems)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━═════════════════════════
// This is a combination of two problems:
//   1. Traverse recursively on whole root (every node)
//   2. Check isSameTree on every node
//
// ⏱️  Time Complexity: O(n * m)
//    n = nodes in root, m = nodes in subRoot
//    Reason: for every node in root, we check if it is same as subRoot.
//    In worst case, we traverse the whole subRoot for every node in root.
//
// 💾 Space Complexity: O(n + m)
//    Reason: recursion stack for root (O(n)) + recursion stack for subRoot (O(m)).
//    We don't traverse both trees at the same time.

var isSubtree = function (root, subRoot) {
  if (!root) return false;

  // if parent value matches, check if trees are identical
  if (root.val === subRoot.val) {
    if (checkIsSameTree(root, subRoot)) return true;
  }

  // try left and right subtree
  let left = isSubtree(root.left, subRoot);
  let right = isSubtree(root.right, subRoot);
  return left || right;
};

function checkIsSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return checkIsSameTree(p.left, q.left) && checkIsSameTree(p.right, q.right);
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//? APPROACH 2 — Optimized (Serialization + String Search)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Interviewer asks to optimize? Use serialization + substring search.
//
// ⏱️  Time Complexity: O(n + m)  [with KMP]
//    n = nodes in root, m = nodes in subRoot
// 💾 Space Complexity: O(n + m)
//
// Idea:
//   1. Convert both trees into strings (preorder traversal with null markers)
//   2. Search subRoot string inside root string

//? Why do we need null markers in serialization?
// Suppose we have:
//   root    = [1, 2, 3]
//   subRoot = [2]
//
// Without null markers:
//   root    → "1,2,3"
//   subRoot → "2"
//   "2" is in "1,2,3" → returns TRUE  ❌ (but [2] is not a subtree of [1,2,3])
//
// With null markers (# or $):
//   root    → "[1[2##3##"
//   subRoot → "[2##"
//   "[2##" is in "[1[2##3##" → returns FALSE  ✅
//? If we use '-' as null marker, then: if there is negative value in the tree, it will create confusion. So we use '#' or '$' as null marker.
//
// Null markers preserve the STRUCTURE, not just the values.

var isSubtreeOptimized = function (root, subRoot) {
  let rootHash = serialize(root);
  let subRootHash = serialize(subRoot);

  // rootHash [3,4,5,1,2]    → "[3[4[1##2##5##"
  // subRootHash [4,1,2] → "[4[1##2##"

  // now we need to find: is subRootHash a substring of rootHash?

  // return rootHash.includes(subRootHash);

  // ⚠️ Built-in includes() TC is O(n * m) — NOT KMP.
  //    So this is still not fully optimized. For true O(n + m), implement KMP.
  // -----------------------------------------------
  // If we dont want to use built-in includes() method, so we implement KMP ok

  return searchSubstringInString(rootHash, subRootHash); // search subRoot string inside root string in O(n + m)
};

function serialize(root) {
  let hash = "";

  let traversal = (curr) => {
    if (!curr) {
      hash = hash + "#";   // null marker
      return;
    }

    hash = hash + "[" + curr.val;

    traversal(curr.left);
    traversal(curr.right);
  };

  traversal(root);
  return hash;
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//? APPROACH 3 — Serialization + KMP (True O(n + m))
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// To get true O(n + m), replace includes() with KMP.
//
// Steps:
//   1. Build LPS (Longest Prefix Suffix) array for the subRoot string.
//   2. Use LPS to search subRoot string inside root string in O(n + m).

function calculateLpsTable(subStr) {
  // build prefix table from substring
  // creating empty array filled with 0 
  let lps = new Array(subStr.length).fill(0);
  let i = 1, j = 0;

  // we run loop till i reaches in the end because we move j and i both and i is ahead that's why

  // a a b a a a c
  // 0 1 0 1 2 2 0
  // j i
  while (i < subStr.length) {
    // if character matches, we increase value of j in prefix table and move i and j both
    if (subStr[i] === subStr[j]) {
      lps[i] = j + 1;
      i++; j++;
    } else {
      // if not match, we move back j to previous prefix value, if j is 0 then we move i to next character
      if (j != 0) j = lps[j - 1];
      else i++;
    }
  }
  return lps;
}

function searchSubstringInString(str, subStr) {
  let stringLength = str.length, subStringLength = subStr.length;
  let lpsTable = calculateLpsTable(subStr);

  // i → pointer for str, j → pointer for subStr
  let i = 0, j = 0;
  // we run loop on root string, and we check if the character matches with subRoot string, if it matches we move both pointers, if not we move i to previous prefix value, if i is 0 then we move j to next character
  while (i < stringLength) {
    if (str[i] === subStr[j]) {
      // if character matches, we move both pointers thats it
      i++; j++;
    } else {
      if (j != 0) j = lpsTable[j - 1];
      else i++;
    }
    if (j === subStringLength) return true; // if we reach the end of subStr, it means we found the substring in string
  }
  return false;
}


//! Leetcode 236. Lowest Common Ancestor of a Binary Tree
var lowestCommonAncestor = function (root, p, q) { }

//! Leetcode 199. Binary Tree Right Side View
var rightSideView = function (root) { }

//! Leetcode 1448. Count Good Nodes in Binary Tree
var goodNodes = function (root) { }

//! Leetcode 116. Populating Next Right Pointers in Each Node
var connect = function (root) { }

//! Leetcode 117. Populating Next Right Pointers in Each Node II
var connect = function (root) { }

//! Leetcode 124. Binary Tree Maximum Path Sum
var maxPathSum = function (root) { }

//! Leetcode 105. Construct Binary Tree from Preorder and Inorder Traversal
var buildTree = function (preorder, inorder) { }

//! Leetcode 297. Serialize and Deserialize Binary Tree
var serialize = function (root) { }