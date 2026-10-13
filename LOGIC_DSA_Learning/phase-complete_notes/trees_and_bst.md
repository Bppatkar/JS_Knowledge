# 🌈 TREES + BINARY SEARCH TREE (BST) — COMPLETE DEEP DIVE 🌈

# <span style="color:#FF6347">📚 PART 1 — TREE FUNDAMENTALS</span>

## <span style="color:#1E90FF">🌳 TREE KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Tree** ek **non-linear data structure** hai jisme nodes **hierarchical** tarike se organized hote hain — ek root se shuru, branches me failte hain.

**Real life examples:**

- 📁 File system — folders ke andar folders
- 👨‍👩‍👧 Family tree — grandparents se lekar grandchildren
- 🏢 Company hierarchy — CEO → Managers → Employees
- 🌐 HTML DOM — elements ke andar elements

**Tree vs Array/LinkedList:**

- Array/LinkedList = **linear** (ek line me)
- Tree = **hierarchical** (branches me)

</div>

---

## <span style="color:#32CD32">⚡ TREE KE BASIC TERMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

Ye saare terms **zaroori** hain — interview me poochte hain:

| Term | Matlab | Example |
|:---|:---|:---|
| **Root** | Sabse upar wala node | Tree ka pehla node |
| **Parent** | Jiske neeche children hain | Root parent hai |
| **Child** | Jo parent ke neeche hai | Direct descendant |
| **Leaf** | Jiske koi children nahi | Tree ka end |
| **Sibling** | Same parent ke children | Bhai-behen |
| **Ancestor** | Upar wale saare nodes | Parent, grandparent, ... |
| **Descendant** | Neeche wale saare nodes | Child, grandchild, ... |
| **Subtree** | Ek node + uske saare descendants | Chhota tree |
| **Depth** | Root se node tak ki distance | Root ki depth = 0 |
| **Height** | Node se deepest leaf tak ki distance | Leaf ki height = 0 |
| **Level** | Same depth ke saare nodes | Level 0 = root |
| **Degree** | Kitne children hain | Binary tree me max 2 |
| **Edge** | Do nodes ke beech ka connection | Parent-child link |

### 🔑 Visual

```text
                A          ← root (level 0, depth 0)
              /   \
             B     C       ← level 1, depth 1
           /  \     \
          D    E     F     ← level 2, depth 2
         /
        G                  ← level 3, depth 3 (leaf)

Leaf nodes: E, F, G
Height of A: 3
Depth of G: 3
Siblings: B and C, D and E
Subtree of B: B, D, E, G
```

</div>

---

## <span style="color:#FFD700">📐 BINARY TREE KYA HAI?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Binary Tree** ek tree hai jisme **har node ke max 2 children** hote hain — **left** aur **right**.

**Types of Binary Trees:**

### 🔹 1. Full Binary Tree

Har node ke **0 ya 2** children. Beech ka koi nahi.

```text
        1
       / \
      2   3
     / \
    4   5
```

### 🔹 2. Complete Binary Tree

Saare levels bhare hue **except last**, aur last level **left se right** fill.

```text
        1
       / \
      2   3
     / \  /
    4  5 6
```

**Yehi Heap me use hota hai.**

### 🔹 3. Perfect Binary Tree

Saare levels **completely** bhare. Total nodes = `2^(h+1) - 1`.

```text
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

### 🔹 4. Balanced Binary Tree

Har node ke left aur right subtree ki height ka difference **≤ 1**.

### 🔹 5. Skewed Binary Tree

Saare nodes ek side pe.

```text
    1
     \
      2
       \
        3
```

</div>

---

## <span style="color:#9370DB">💻 TREE NODE STRUCTURE (JavaScript)</span>

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Tree banao
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
```

**Visual:**
```text
        1
       / \
      2   3
     / \
    4   5
```

---

## <span style="color:#FF4500">🎯 TREE TRAVERSALS (DFS + BFS)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

Tree traverse karne ke **4 tarike** hain:

### 🔹 DFS (Depth First Search)

Stack use karta hai — gehra pehle jaata hai.

| Traversal | Order | Use |
|:---|:---|:---|
| **Preorder** | Root → Left → Right | Copy tree, serialize |
| **Inorder** | Left → Root → Right | BST me sorted order |
| **Postorder** | Left → Right → Root | Delete tree, evaluate expression |

### 🔹 BFS (Breadth First Search)

Queue use karta hai — level by level.

| Traversal | Order | Use |
|:---|:---|:---|
| **Level Order** | Level 0, 1, 2... | Level-wise processing |

</div>

---

### <span style="color:#FFD700">🔍 PREORDER — Recursive</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

```javascript
function preorder(root) {
  let result = [];
  function dfs(node) {
    if (!node) return;
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
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

Preorder: 1, 2, 4, 5, 3
```

</div>

---

### <span style="color:#FFD700">🔍 INORDER — Recursive</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

```javascript
function inorder(root) {
  let result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
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

Inorder: 4, 2, 5, 1, 3
```

</div>

---

### <span style="color:#FFD700">🔍 POSTORDER — Recursive</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

```javascript
function postorder(root) {
  let result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    result.push(node.val);
  }
  dfs(root);
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

Postorder: 4, 5, 2, 3, 1
```

</div>

---

### <span style="color:#FFD700">🔍 LEVEL ORDER (BFS)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

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

Level Order: [[1], [2, 3], [4, 5]]
```

</div>

---

### <span style="color:#FFD700">🔄 ITERATIVE TRAVERSALS (Using Stack)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**Preorder Iterative:**
```javascript
function preorderIterative(root) {
  if (!root) return [];
  let stack = [root], result = [];
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);  // Right pehle
    if (node.left) stack.push(node.left);    // Left baad me
  }
  return result;
}
```

**Inorder Iterative:**
```javascript
function inorderIterative(root) {
  let stack = [], result = [], curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}
```

**Postorder Iterative (Reverse Preorder Trick):**
```javascript
function postorderIterative(root) {
  if (!root) return [];
  let stack = [root], result = [];
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);
    if (node.left) stack.push(node.left);   // Left pehle
    if (node.right) stack.push(node.right); // Right baad me
  }
  return result.reverse();
}
```

**Kyun Reverse Trick?**
- Preorder: `root → left → right`
- Modified: `root → right → left`
- Reverse: `left → right → root` = Postorder ✅

</div>

---

---

# <span style="color:#FF6347">📚 PART 2 — TREE PATTERNS (DFS)</span>

## <span style="color:#1E90FF">🎯 PATTERN 1 — MAX DEPTH (Bottom-Up)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har node apne children se height maangta hai, `1 + max(left, right)` return karta hai.

```javascript
function maxDepth(root) {
  if (!root) return 0;
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return 1 + Math.max(left, right);
}
```

**Time:** `O(n)` · **Space:** `O(h)` stack

**Visual:**
```text
        3
       / \
      9   20
         /  \
        15   7

maxDepth(3) = 1 + max(1, 2) = 3
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 2 — DIAMETER (Bottom-Up + Global)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har node pe `leftHeight + rightHeight` = diameter candidate. Global max track karo.

```javascript
function diameterOfBinaryTree(root) {
  let maxDia = 0;
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    maxDia = Math.max(maxDia, left + right);  // Update global
    return 1 + Math.max(left, right);          // Return height
  }
  dfs(root);
  return maxDia;
}
```

**Key:** Ek function se **height return** karo, **diameter track** karo.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 3 — BALANCED TREE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har node pe check karo — left-right height difference ≤ 1.

```javascript
function isBalanced(root) {
  let balanced = true;
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    if (Math.abs(left - right) > 1) balanced = false;
    return 1 + Math.max(left, right);
  }
  dfs(root);
  return balanced;
}
```

**Alternative (-1 signal):**
```javascript
function isBalanced(root) {
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    if (left === -1 || right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }
  return dfs(root) !== -1;
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 4 — PATH SUM (Top-Down)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Root to leaf ka sum track karo. Target mile to true.

```javascript
function hasPathSum(root, targetSum) {
  if (!root) return false;
  targetSum -= root.val;

  // Leaf node pe check
  if (!root.left && !root.right) return targetSum === 0;

  return hasPathSum(root.left, targetSum) ||
         hasPathSum(root.right, targetSum);
}
```

**Key:** Leaf pe check karo — non-leaf pe nahi.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 5 — LCA (Lowest Common Ancestor)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har node pe check — p aur q kis side hain?

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;   // Dono sides me — yehi LCA
  return left || right;              // Ek side me
}
```

**Time:** `O(n)` · **Space:** `O(h)`

**Visual:**
```text
        3
       / \
      5   1
     / \
    6   2

LCA(5, 1) = 3   (alag sides)
LCA(5, 2) = 5   (5 khud ancestor hai)
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 6 — SAME TREE / SYMMETRIC</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Same Tree:**
```javascript
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val &&
         isSameTree(p.left, q.left) &&
         isSameTree(p.right, q.right);
}
```

**Symmetric (Mirror Check):**
```javascript
function isSymmetric(root) {
  function isMirror(l, r) {
    if (!l && !r) return true;
    if (!l || !r) return false;
    return l.val === r.val &&
           isMirror(l.left, r.right) &&    // Mirror!
           isMirror(l.right, r.left);       // Mirror!
  }
  return isMirror(root.left, root.right);
}
```

**Key Farak:** Symmetric me **mirror** check hota hai — `left.left` vs `right.right` aur `left.right` vs `right.left`.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 7 — INVERT BINARY TREE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

```javascript
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];  // Swap
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
```

**Visual:**
```text
        1                   1
       / \                 / \
      2   3       →       3   2
     / \                 / \
    4   5               5   4
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 8 — COUNT GOOD NODES (Top-Down with State)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Path ka max track karo. Agar current `>= max`, to good.

```javascript
function goodNodes(root) {
  let count = 0;
  function dfs(node, maxSoFar) {
    if (!node) return;
    if (node.val >= maxSoFar) count++;
    maxSoFar = Math.max(maxSoFar, node.val);
    dfs(node.left, maxSoFar);
    dfs(node.right, maxSoFar);
  }
  dfs(root, -Infinity);
  return count;
}
```

**Key:** `maxSoFar` **parameter** me pass karo — global nahi.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 9 — RIGHT SIDE VIEW</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har level ka **rightmost** node.

**Recursive (Right Pehle):**
```javascript
function rightSideView(root) {
  let result = [];
  function dfs(node, level) {
    if (!node) return;
    if (result[level] === undefined) result[level] = node.val;
    dfs(node.right, level + 1);  // Right pehle!
    dfs(node.left, level + 1);
  }
  dfs(root, 0);
  return result;
}
```

**Iterative (BFS):**
```javascript
function rightSideView(root) {
  if (!root) return [];
  let queue = [root], result = [];
  while (queue.length) {
    let levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      if (i === levelSize - 1) result.push(node.val);  // Last = rightmost
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 10 — MAXIMUM PATH SUM (Global + Return)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har node pe **peak** banao (left + node + right) — global max track karo. Parent ko **ek side** return karo.

```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    let left = Math.max(0, dfs(node.left));   // Negative skip
    let right = Math.max(0, dfs(node.right));
    maxSum = Math.max(maxSum, node.val + left + right);  // Peak
    return node.val + Math.max(left, right);  // Ek side
  }
  dfs(root);
  return maxSum;
}
```

**Key:** Negative children ko **0** maano — kyunki negative path sum kam karega.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 11 — SUBTREE OF ANOTHER TREE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Har node pe `isSameTree` check karo.

```javascript
function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

**Optimized:** Serialize + KMP → `O(n + m)`

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 12 — CONSTRUCT TREE (Preorder + Inorder)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Idea:** Preorder ka pehla element root. Inorder me root dhundho → left/right size pata chalega.

```javascript
function buildTree(preorder, inorder) {
  let map = new Map();
  for (let i = 0; i < inorder.length; i++) map.set(inorder[i], i);

  function helper(preStart, preEnd, inStart, inEnd) {
    if (preStart > preEnd) return null;

    let rootVal = preorder[preStart];
    let root = new TreeNode(rootVal);
    let idx = map.get(rootVal);
    let leftSize = idx - inStart;

    root.left = helper(preStart + 1, preStart + leftSize, inStart, idx - 1);
    root.right = helper(preStart + leftSize + 1, preEnd, idx + 1, inEnd);
    return root;
  }

  return helper(0, preorder.length - 1, 0, inorder.length - 1);
}
```

**Time:** `O(n)` (with HashMap) · **Space:** `O(n)`

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 13 — SERIALIZE & DESERIALIZE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Serialize (Preorder):**
```javascript
function serialize(root) {
  let result = [];
  function dfs(node) {
    if (!node) { result.push("#"); return; }
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result.join(",");
}
```

**Deserialize:**
```javascript
function deserialize(data) {
  let tokens = data.split(",");
  let i = 0;
  function dfs() {
    let token = tokens[i++];
    if (token === "#") return null;
    let node = new TreeNode(Number(token));
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  return dfs();
}
```

**Key:** Preorder + `#` null marker. Deserialize me **pointer** track karo.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 14 — POPULATING NEXT RIGHT POINTERS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Perfect Tree (LC 116):** `curr.left.next = curr.right`

```javascript
function connect(root) {
  if (!root) return root;
  let start = root;
  while (start.left) {
    let curr = start;
    while (curr) {
      curr.left.next = curr.right;
      if (curr.next) curr.right.next = curr.next.left;
      curr = curr.next;
    }
    start = start.left;
  }
  return root;
}
```

**Any Tree (LC 117):** Dummy node trick

```javascript
function connect(root) {
  if (!root) return root;
  let curr = root;
  while (curr) {
    let dummy = new Node(0), prev = dummy;
    while (curr) {
      if (curr.left) { prev.next = curr.left; prev = prev.next; }
      if (curr.right) { prev.next = curr.right; prev = prev.next; }
      curr = curr.next;
    }
    curr = dummy.next;
  }
  return root;
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 15 — ZIGZAG LEVEL ORDER</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Recursive (Push/Unshift Alternate):**
```javascript
function zigzagLevelOrder(root) {
  let ans = [];
  function dfs(node, level) {
    if (!node) return;
    if (!ans[level]) ans[level] = [];
    if (level % 2 === 0) ans[level].push(node.val);
    else ans[level].unshift(node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
  dfs(root, 0);
  return ans;
}
```

**Iterative (BFS + Reverse):**
```javascript
function zigzagLevelOrder(root) {
  if (!root) return [];
  let queue = [root], ans = [];
  while (queue.length) {
    let levelSize = queue.length, level = [];
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    if (ans.length % 2 !== 0) level.reverse();
    ans.push(level);
  }
  return ans;
}
```

</div>

---

---

# <span style="color:#FF6347">📚 PART 3 — BINARY SEARCH TREE (BST)</span>

## <span style="color:#1E90FF">🌳 BST KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**BST** ek binary tree hai jisme **har node** ke liye:

- **Left subtree** ke saare nodes **chhote** hain
- **Right subtree** ke saare nodes **bade** hain

**Rule:** `left < root < right`

**Visual:**
```text
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13

Har node pe check:
- 3 < 8 < 10 ✅
- 1 < 3 < 6 ✅
- 4 < 6 < 7 ✅
```

</div>

---

## <span style="color:#32CD32">⭐ BST KA KEY PROPERTY — INORDER = SORTED</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**BST ka inorder traversal HAMESHA sorted order me hota hai!**

```text
        8
       / \
      3   10
     / \    \
    1   6    14

Inorder: 1, 3, 4, 6, 7, 8, 10, 13, 14  ← Sorted! ✅
```

### 🔥 Ye Property Bahut Kaam Aati Hai

- **Kth smallest** → inorder me K-th element
- **Validate BST** → inorder sorted hai ya nahi
- **Range sum** → inorder me range filter

</div>

---

## <span style="color:#FFD700">⚡ BST OPERATIONS</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Operation | Balanced BST | Skewed BST |
|:---|:---:|:---:|
| **Search** | `O(log n)` | ❌ `O(n)` |
| **Insert** | `O(log n)` | ❌ `O(n)` |
| **Delete** | `O(log n)` | ❌ `O(n)` |
| **Min/Max** | `O(log n)` | `O(n)` |
| **Inorder** | `O(n)` | `O(n)` |

**Balanced BST** me sab `O(log n)` — isliye AVL/Red-Black trees use hote hain (but vo advance hai).

</div>

---

## <span style="color:#9370DB">🎯 BST PATTERNS</span>

### <span style="color:#FF69B4">Pattern 1 — Search in BST</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

```javascript
function searchBST(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}
```

**Iterative:**
```javascript
function searchBST(root, val) {
  let curr = root;
  while (curr) {
    if (curr.val === val) return curr;
    if (val < curr.val) curr = curr.left;
    else curr = curr.right;
  }
  return null;
}
```

**Time:** `O(log n)` average, `O(n)` worst (skewed)

</div>

### <span style="color:#FF69B4">Pattern 2 — Insert in BST</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

```javascript
function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insertIntoBST(root.left, val);
  else root.right = insertIntoBST(root.right, val);
  return root;
}
```

**Iterative:**
```javascript
function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);
  let originalRoot = root, curr = root;
  while (true) {
    if (val < curr.val) {
      if (!curr.left) { curr.left = new TreeNode(val); break; }
      curr = curr.left;
    } else {
      if (!curr.right) { curr.right = new TreeNode(val); break; }
      curr = curr.right;
    }
  }
  return originalRoot;
}
```

</div>

### <span style="color:#FF69B4">Pattern 3 — Validate BST (Range Method)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Galti:** Sirf `parent-child` compare karna.  
**Sahi:** **Range (min, max)** pass karo.

```javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (min !== null && node.val <= min) return false;
    if (max !== null && node.val >= max) return false;
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  return validate(root, null, null);
}
```

**Kyun Range?**

```text
        5
       / \
      1   6
         / \
        3   7    ← 3 yahan nahi hona chahiye (5 se chhota hai, but right me hai)

Range (5, ∞) me 3 fit nahi hota → Invalid ❌
```

**Left jaate waqt:** `max = node.val`  
**Right jaate waqt:** `min = node.val`

**Alternative — Inorder Traversal:**
```javascript
function isValidBST(root) {
  let prev = null;
  function inorder(node) {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (prev !== null && node.val <= prev) return false;
    prev = node.val;
    return inorder(node.right);
  }
  return inorder(root);
}
```

</div>

### <span style="color:#FF69B4">Pattern 4 — Kth Smallest Element</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Idea:** Inorder me `k`-th element.

```javascript
function kthSmallest(root, k) {
  let count = 0, ans = null;
  function inorder(node) {
    if (!node || ans !== null) return;
    inorder(node.left);
    count++;
    if (count === k) { ans = node.val; return; }
    inorder(node.right);
  }
  inorder(root);
  return ans;
}
```

**Optimized:** Subtree sizes store karo (advanced BST).

</div>

### <span style="color:#FF69B4">Pattern 5 — LCA in BST (O(log n))</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

**Idea:** BST property use karo — dono left me, dono right me, ya split.

```javascript
function lowestCommonAncestor(root, p, q) {
  if (p.val < root.val && q.val < root.val)
    return lowestCommonAncestor(root.left, p, q);
  if (p.val > root.val && q.val > root.val)
    return lowestCommonAncestor(root.right, p, q);
  return root;  // Split ho gaya
}
```

**Time:** `O(log n)` — Binary Tree LCA se faster!

**Iterative:**
```javascript
function lowestCommonAncestor(root, p, q) {
  let curr = root;
  while (curr) {
    if (p.val < curr.val && q.val < curr.val) curr = curr.left;
    else if (p.val > curr.val && q.val > curr.val) curr = curr.right;
    else return curr;
  }
}
```

</div>

---

## <span style="color:#00FA9A">💻 TREES + BST — MUST-KNOW LEETCODE PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

### 🔹 Traversals

| # | Problem | Pattern |
|:---:|:---|:---|
| **94** | Binary Tree Inorder | Inorder |
| **144** | Binary Tree Preorder | Preorder |
| **145** | Binary Tree Postorder | Postorder |
| **102** | Level Order Traversal | BFS |

### 🔹 Depth/Height Patterns

| # | Problem | Pattern |
|:---:|:---|:---|
| **104** | Maximum Depth | Bottom-up |
| **543** | Diameter | Height + Global |
| **110** | Balanced Binary Tree | Height + Diff |
| **111** | Minimum Depth | BFS or DFS |

### 🔹 Path Patterns

| # | Problem | Pattern |
|:---:|:---|:---|
| **112** | Path Sum | Top-down |
| **113** | Path Sum II | Backtracking |
| **437** | Path Sum III | Prefix sum |
| **124** | Maximum Path Sum | Global + Return |
| **129** | Sum Root to Leaf | Top-down |

### 🔹 Comparison Patterns

| # | Problem | Pattern |
|:---:|:---|:---|
| **100** | Same Tree | Two-tree |
| **101** | Symmetric Tree | Mirror |
| **572** | Subtree of Another | Same Tree + Traverse |
| **226** | Invert Binary Tree | Swap |

### 🔹 LCA Patterns

| # | Problem | Pattern |
|:---:|:---|:---|
| **236** | LCA Binary Tree | DFS |
| **235** | LCA of BST | BST property |

### 🔹 View Patterns

| # | Problem | Pattern |
|:---:|:---|:---|
| **199** | Right Side View | BFS / Right-first DFS |
| **103** | Zigzag Level Order | BFS + Reverse |
| **1448** | Count Good Nodes | Top-down with state |

### 🔹 Special Patterns

| # | Problem | Pattern |
|:---:|:---|:---|
| **105** | Construct from Pre+In | Divide & Conquer |
| **106** | Construct from In+Post | Divide & Conquer |
| **297** | Serialize & Deserialize | Preorder |
| **116** | Next Right Pointers | Level linking |
| **117** | Next Right Pointers II | Dummy node |
| **98** | Validate BST | Range method |
| **700** | Search in BST | BST property |
| **701** | Insert into BST | BST property |
| **230** | Kth Smallest | Inorder |

### 🔹 Advanced

| # | Problem | Pattern |
|:---:|:---|:---|
| **968** | Binary Tree Cameras | Greedy + Tree DP |
| **337** | House Robber III | Tree DP |
| **662** | Max Width of Binary Tree | BFS with index |

</div>

---

## <span style="color:#DA70D6">🎯 TREE PATTERNS — QUICK REFERENCE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

| Pattern | Approach | Global? |
|:---|:---|:---:|
| **Max Depth** | Bottom-up return height | Nahi |
| **Diameter** | Height + global max | Haan |
| **Balanced** | Height + diff check | Haan/Nahi |
| **Path Sum** | Top-down subtract | Nahi |
| **LCA** | Return node | Nahi |
| **Same Tree** | Two-tree recursion | Nahi |
| **Symmetry** | Mirror check | Nahi |
| **Max Path Sum** | Peak + return one side | Haan |
| **Right View** | Level tracking | Nahi |
| **Good Nodes** | Top-down with max | Nahi |
| **Serialize** | Preorder + null marker | Nahi |
| **Construct** | Divide & Conquer | Nahi |
| **BST Search** | Value comparison | Nahi |
| **BST Validate** | Range pass down | Nahi |

</div>

---

## <span style="color:#FF4500">⚠️ COMMON MISTAKES IN TREE PROBLEMS</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

| ❌ Galti | ✅ Sahi |
|:---|:---|
| `if (!root.left)` — null check bhool jana | `if (!root)` pehle check karo |
| `return curr.val` — node object bhool jana | `return node` |
| Symmetric me `left.left === right.left` | `left.left === right.right` (mirror) |
| BST validate sirf parent-child | Range pass karo |
| Global variable bhool jana | `let maxX = ...` outside |
| Return value propagate na karna | `return recurse(...)` |
| Leaf pe check na karna | `if (!node.left && !node.right)` |
| Path sum me sum reset karna | Parameter me pass karo |

</div>

---

## <span style="color:#32CD32">📊 COMPLEXITY SUMMARY — TREES</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Operation | Time | Space |
|:---|:---:|:---:|
| **Traversal (any)** | `O(n)` | `O(h)` stack |
| **Level Order** | `O(n)` | `O(w)` queue (w = max width) |
| **Max Depth** | `O(n)` | `O(h)` |
| **Diameter** | `O(n)` | `O(h)` |
| **LCA (BT)** | `O(n)` | `O(h)` |
| **LCA (BST)** | `O(log n)` | `O(1)` iterative |
| **Search BST** | `O(log n)` | `O(log n)` / `O(1)` |
| **Insert BST** | `O(log n)` | `O(log n)` / `O(1)` |
| **Validate BST** | `O(n)` | `O(h)` |
| **Kth Smallest** | `O(n)` | `O(h)` |

**`h` = height** (balanced me `O(log n)`, skewed me `O(n)`)

</div>

---

## <span style="color:#FF69B4">🔑 KEY INSIGHTS — TREES ME SOCHNE KA TARIKA</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF69B4;">

### 🔹 3 Sawaal Har Node Pe

1. **Base case?** — `null` pe kya return karna hai?
2. **Children se kya chahiye?** — Left/right se kya maangna hai?
3. **Parent ko kya dena hai?** — Combine karke kya return karna hai?

### 🔹 Top-Down vs Bottom-Up

| | Top-Down | Bottom-Up |
|:---|:---|:---|
| **Info** | Root → Leaf | Leaf → Root |
| **Param** | `level`, `sum`, `min`, `max` | Koi nahi |
| **Return** | Kuch nahi / void | Answer |
| **Use** | Path-based problems | Height-based problems |

### 🔹 Global vs Return

- **Return** → Parent ko dena
- **Global** → Track karna answer jo parent ko nahi chahiye

**Example (Diameter):**

- Height **return** karo
- Diameter **global** me track karo

</div>

---

## <span style="color:#32CD32">🎯 FINAL SUMMARY — TREES + BST</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Tree Fundamentals

1. **Terminology** — root, leaf, height, depth, ancestor
2. **4 Traversals** — Pre, In, Post, Level
3. **DFS vs BFS** — Stack vs Queue

### 🔹 Tree Patterns

1. **Height-based** → Bottom-up return
2. **Path-based** → Top-down with state
3. **Two-tree** → Compare side by side
4. **Global track** → Diameter, Max Path Sum
5. **BST property** → Value comparison for O(log n)

### 🔹 BST Special

1. **Inorder = Sorted** — ye kabhi mat bhool
2. **Search/Insert** — value comparison
3. **Validate** — range pass karo, parent-child nahi
4. **LCA** — BST me O(log n)

### 🔥 Golden Rule

> **"Har node pe 3 sawaal pooch — base case, children se kya, parent ko kya."**

> **"BST me value comparison se direction pata chal jati hai."**

</div>
