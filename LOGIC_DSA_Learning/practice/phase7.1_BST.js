//! Binary Search Tree
//* Binary Search Tree is a data structure that stores data in a hierarchical manner. BST is a special type of binary tree with at-most 2 children.

//? For every node: -
//  - all nodes of left subtree have smaller value
//  - all nodes of right subtree have greater value [not equal because there is no case of duplicate values in BST]

//! Important point to note
```
       50
    /     \
   20      70
  /   \      \
  10  60     80
```
  //? check root node is 50 and in left subtree has 60 which is greater than 50, 
  //! so it is not a valid BST.

  ```
       50
    /     \
   20      70
  /         /  \
  10      60     80
```
  //? Now this is a valid BST because all nodes in left subtree of 50 are smaller than 50 and all nodes in right subtree of 50 are greater than 50.

  //! Why it is called a Search Tree? why do we included a word "Search"..?
  //* Because it allows us to search for a value in O(log n) time complexity on average, which is much faster than linear search in an unsorted array (O(n)).

  //? remember binary search , what we do 
  // - we compare target with middle
  // - if target is less than middle, we search in left half
  // - if target is greater than middle, we search in right half

  //? same thing we do in BST, we compare target with root node, if target is less than root node, we search in left subtree, if target is greater than root node, we search in right subtree.

  //! If u do 'Inorder Traversal' of BST, u will get sorted order of elements in ascending order. (left, root, right)
  ```
            50
        /        \
      30          70
    /    \      /    \
   20    40    60    80
  /  \  /  \        /  \
 10  25 35 45      75  85
  ```

//* It Means 'In-Order Traversal' of above BST will give us sorted order of elements in ascending order. ⭐⭐⭐⭐⭐
// 10, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85


//* Time Complexity: O(log n) for search, insert, delete (average case), O(n) (worst case)
//* Space Complexity: O(n)

// ======================================

//! Leetcode 98. Validate Binary Search Tree
var isValidBST = function (root) {
  let max = null, min = null, ans = null;
  function traversal(curr, min, max) {
    if (!curr) return true;

    // if (min != null && curr.val <= min) return false;
    // if (max != null && curr.val >= max) return false;

    //* we can write same condition like this
    if ((min != null && curr.val <= min) || (max != null && curr.val >= max)) return false;


    let isleftValidBST = traversal(curr.left, min, curr.val);
    // left: max = curr.val
    // going left side means lower bound is null and higher bound is carry forward , and our recursion calling for curr.left  

    let isRightValidBST = traversal(curr.right, curr.val, max);
    // right: min = curr.val
    // going right side means lower bound is carry forwar and higher bound is null, and our recursion calling for curr.left   

    return isleftValidBST && isRightValidBST;
  }
  ans = traversal(root, max, min);
  return ans;
}

//! Leetcode 700. Search in a Binary Search Tree
var searchBST = function (root, val) {
  // recursive approch
  if (!root) return null;

  if (val === root.val) return root;

  if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}

// Iterative approch
var searchBSTiterative = function (root, val) {
  let curr = root;

  while (curr) {
    if (curr.val === val) return curr;
    if (val < curr.val) curr = curr.left;
    else curr = curr.right;
  }
  return null;
}

//! Leetcode 701. Insert into a Binary Search Tree
var insertIntoBST = function (root, val) {
  // recursive
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
}

// Iterative
var insertIntoBSTiterative = function (root, val) {
  if (!root) return new TreeNode(val);

  let originalRoot = root;

  while (true) {
    if (val < root.val) {
      if (!root.left) { root.left = new TreeNode(val); break; }
      root = root.left;
    } else {
      if (!root.right) { root.right = new TreeNode(val); break; }
      root = root.right;
    }
  }
  return originalRoot;
}

//! Leetcode 230. Kth Smallest Element in a BST
//*  Do u remember that in above theory we write it that- "Inorder gives us sorted values" so we can use it
//? we use count variable so we ignore O(n), we use O(1) because  we need our k-th element, not the whole array that's why we use simple variable not the empty array, so when our count is reached till k we stop it
var kthSmallest = function (root, k) {
  let ans = null, count = 0;
  let traversal = (curr) => {
    if (!curr) return;

    // If we found any answer, so we stop recursion
    if (ans !== null) return;

    traversal(curr.left);

    count++;
    if (count === k) {
      ans = curr.val;
      return;
    }

    traversal(curr.right);
  }
  traversal(root);
  return ans
}

//! Leetcode 235. Lowest Common Ancestor of a BST
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;


  if ((p.val < root.val) && (q.val < root.val)) {
    return lowestCommonAncestor(root.left, p, q);
  }
  if ((p.val > root.val) && (q.val > root.val)) {
    return lowestCommonAncestor(root.right, p, q);
  }

  return root;
}