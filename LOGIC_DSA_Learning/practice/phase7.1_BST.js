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
    // going left side means lower bound is null and higher bound is carry forward , and our recursion calling for curr.left
    let isRightValidBST = traversal(curr.right, curr.val, max);
    // going right side means lower bound is carry forwar and higher bound is null, and our recursion calling for curr.left

    return isleftValidBST && isRightValidBST;
  }
  ans = traversal(root, max, min);
  return ans;
}

//! Leetcode 700. Search in a Binary Search Tree
var searchBST = function (root, val) {}

//! 