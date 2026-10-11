# 🌈 HEAP AND PRIORITY QUEUE - COMPLETE BINARY TREE DEEP DIVE 🌈

---

## <span style="color:#FF6347">📚 BASIC DEFINITIONS</span>

### <span style="color:#1E90FF">🌳 WHAT IS A BINARY TREE?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

Binary tree ke paas at most **2 children** hote hain (max 2, min 0)
Har node ke left aur right child ho sakte hain ya nahi bhi

</div>

### <span style="color:#32CD32">🌲 WHAT IS A COMPLETE BINARY TREE?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

Complete Binary Tree ek aisa tree hai jismein:

1. 🔹 Saare levels **COMPLETELY filled** hote hain, **EXCEPT last level**
2. 🔹 Last level mein nodes **LEFT se RIGHT** fill hote hain (continuously)
3. 🔹 Koi **GAP nahi** hona chahiye - agar ek node missing hai aur uske baad koi node exist karta hai, to wo gap hai

</div>

---

## <span style="color:#FFD700">📊 LEVEL WISE UNDERSTANDING</span>

### <span style="color:#FF69B4">Level 0 (Root Level)</span> - Sirf 1 node ho sakti hai

```text
          1
```

### <span style="color:#FF69B4">Level 1</span> - Maximum 2 nodes ho sakte hain

```text
          1
       /     \
      2       3
```

### <span style="color:#FF69B4">Level 2</span> - Maximum 4 nodes ho sakte hain

```text
          1
       /     \
      2       3
    /   \   /   \
   4     5 6     7
```

### <span style="color:#FF69B4">Level 3</span> - Maximum 8 nodes ho sakte hain

```text
              1
           /     \
          2       3
        /   \   /   \
       4     5 6     7
      / \  / \ / \ / \
     8  9 10 11 12 13 14 15
```

---

## <span style="color:#00CED1">🏆 EXAMPLE 1: PERFECT COMPLETE BINARY TREE</span>

### ✅ <span style="color:#32CD32">PERFECT COMPLETE BINARY TREE</span>

```text
        1          (Level 0: 2^0 = 1 node)
      /   \
     2     3       (Level 1: 2^1 = 2 nodes)
    / \   / \
   4   5 6   7     (Level 2: 2^2 = 4 nodes)
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🔍 PROPERTIES:**

- ✅ Har level completely filled hai
- ✅ Total nodes = 2^(h+1) - 1, jahan h = height (yahan h=2)
- ✅ Total nodes = 2^3 - 1 = **7 nodes**
- ✅ Yeh **COMPLETE** bhi hai aur **FULL** bhi hai

</div>

---

## <span style="color:#FF8C00">🏆 EXAMPLE 2: VALID COMPLETE BINARY TREE (Last level incomplete)</span>

### ✅ <span style="color:#32CD32">VALID COMPLETE BINARY TREE (Most common example)</span>

```text
          1
       /     \
      2       3
    /   \   /   \
   4     5 6     7
  / \   /
 8   9 10
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🔍 VERIFICATION:**

- ✅ Level 0: 1 node ✓
- ✅ Level 1: 2 nodes ✓
- ✅ Level 2: 4 nodes ✓
- ✅ Level 3: Nodes left to right: 8,9,10 (continuously) ✓

**RESULT:** ✅ **VALID COMPLETE BINARY TREE**

</div>

---

## <span style="color:#9370DB">🏆 EXAMPLE 3: DIFFERENT VALID COMPLETE BINARY TREES</span>

### ✅ <span style="color:#32CD32">CASE A: Sirf left subtree hai</span>

```text
          1
       /     \
      2       3
     /
    4
   /
  5
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🔍 CHECKING:**

- ✅ Level 0: 1 ✓
- ✅ Level 1: 2,3 ✓
- ✅ Level 2: 4 (left se start) ✓
- ✅ Level 3: 5 (left se start) ✓

**RESULT:** ✅ **VALID** (saare levels left se continuously fill)

</div>

### ✅ <span style="color:#32CD32">CASE B: Right side incomplete but continuous</span>

```text
          1
       /     \
      2       3
     / \     /
    4   5   6
   / \
  7   8
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🔍 CHECKING:**

- ✅ Level 0: 1 ✓
- ✅ Level 1: 2,3 ✓
- ✅ Level 2: 4,5,6 (left to right continuous) ✓
- ✅ Level 3: 7,8 (left to right continuous) ✓

**RESULT:** ✅ **VALID** (koi gap nahi)

</div>

### ✅ <span style="color:#32CD32">CASE C: Multiple levels incomplete but continuous</span>

```text
          1
       /     \
      2       3
     / \     /
    4   5   6
   /
  7
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🔍 CHECKING:**

- ✅ Level 0: 1 ✓
- ✅ Level 1: 2,3 ✓
- ✅ Level 2: 4,5,6 ✓
- ✅ Level 3: 7 (left se start) ✓

**RESULT:** ✅ **VALID** (continuity maintained)

</div>

---

## <span style="color:#20B2AA">🏆 EXAMPLE 4: VALID COMPLETE BINARY TREES WITH ARRAY REPRESENTATION</span>

### <span style="color:#FFD700">📦 ARRAY REPRESENTATION (Index 1-based for simplicity)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

COMPLETE BINARY TREE KO ARRAY MEIN REPRESENT KARNA:

- 🔸 Parent index = `i`
- 🔸 Left child index = `2*i`
- 🔸 Right child index = `2*i + 1`

</div>

### ✅ <span style="color:#32CD32">TREE 1: 3 nodes</span>

```text
          1
       /     \
      2       3
```

📦 Array: `[-, 1, 2, 3]` (Index 1 = 1, Index 2 = 2, Index 3 = 3)

### ✅ <span style="color:#32CD32">TREE 2: 4 nodes</span>

```text
          1
       /     \
      2       3
     /
    4
```

📦 Array: `[-, 1, 2, 3, 4]` (Index 4 = 4)

### ✅ <span style="color:#32CD32">TREE 3: 6 nodes</span>

```text
          1
       /     \
      2       3
     / \     /
    4   5   6
```

📦 Array: `[-, 1, 2, 3, 4, 5, 6]` (Sab indexes fill hain, koi gap nahi)

---

## <span style="color:#7B68EE">🏆 EXAMPLE 5: BOUNDARY CASES - VALID COMPLETE BINARY TREES</span>

### ✅ <span style="color:#32CD32">CASE 1: Sirf root node</span>

```text
          1
```

Yeh **COMPLETE** hai - kyunki last level (level 0) mein left se fill hai

### ✅ <span style="color:#32CD32">CASE 2: Sirf left child</span>

```text
          1
         /
        2
```

Yeh **COMPLETE** hai - level 1 mein left child hai, right missing hai but continuous hai

### ✅ <span style="color:#32CD32">CASE 3: Sirf left child ke left child</span>

```text
          1
         /
        2
       /
      3
```

Yeh **COMPLETE** hai - har level left se continuous fill

### ✅ <span style="color:#32CD32">CASE 4: Complex but valid</span>

```text
          1
       /     \
      2       3
     / \     /
    4   5   6
   /   /
  7   8
```

📦 Array representation: `[-, 1, 2, 3, 4, 5, 6, 7, 8]`
Index: 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8 ✓ Sab fill hain

---

## <span style="color:#FF4500">💀 INVALID COMPLETE BINARY TREES - WITH EXPLANATION</span>

### ❌ <span style="color:#FF0000">INVALID 1: Right child before left</span>

```text
          1
       /     \
      2       3
       \     /
        4   5
```

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

**💥 PROBLEM:** Level order: 1,2,3,4,5
2 ka left child missing hai, phir 4 aaya
**⛔ YEH GAP HAI!**

</div>

### ❌ <span style="color:#FF0000">INVALID 2: Gap in last level</span>

```text
          1
       /     \
      2       3
     /       / \
    4       6   7
```

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

**💥 PROBLEM:** Level order: 1,2,3,4,6,7
2 ka right child missing (gap), phir 3 ke children aaye
**⛔ GAP KE BAAD NODES!**

</div>

### ❌ <span style="color:#FF0000">INVALID 3: Non-continuous last level</span>

```text
          1
       /     \
      2       3
     / \       \
    4   5       7
```

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

**💥 PROBLEM:** Level order: 1,2,3,4,5,7
3 ka left child missing (gap), phir 7 aaya
**⛔ CONTINUITY TOOT GAYI!**

</div>

### ❌ <span style="color:#FF0000">INVALID 4: Multiple gaps</span>

```text
          1
       /     \
      2       3
     /         \
    4           7
```

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

**💥 PROBLEM:** Level order: 1,2,3,4,7
2 ka right child missing, 3 ka left child missing
**⛔ DO BAAR GAP!**

</div>

### ❌ <span style="color:#FF0000">INVALID 5: Middle level gap</span>

```text
          1
       /     \
      2       3
     / \     /
    4   5   6
         \
          8
```

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

**💥 PROBLEM:** Level order: 1,2,3,4,5,6,8
5 ka right child to hai, but 6 ke baad 8?
7 missing hai - iska matlab 6 ke baad gap, phir 8
**⛔ CONTINUITY TOOT GAYI!**

</div>

---

## <span style="color:#FFD700">⚡ QUICK IDENTIFICATION TRICKS</span>

### <span style="color:#00BFFF">🎯 TRICK 1: Level Order Traversal Method</span>

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

1. 🔹 Tree ko level order traverse karo
2. 🔹 Jaise hi koi node mile jiska koi child missing hai
3. 🔹 Uske baad koi aur node nahi aani chahiye

**Example:**

- ✅ `1,2,3,4,5,6` (Valid)
- ❌ `1,2,3,4,6,7` (Invalid - 4 ke baad 5 missing, phir 6,7)

</div>

### <span style="color:#00BFFF">🎯 TRICK 2: Array Index Method</span>

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

Agar tree ko array mein represent kar rahe ho:

1. 🔹 Index 1 se start karo
2. 🔹 Saare nodes consecutive indexes par hone chahiye
3. 🔹 Koi bhi index gap nahi hona chahiye

**Example:**

- ✅ `[-,1,2,3,4,5,6]` Valid
- ❌ `[-,1,2,3,4,5,7]` Invalid (6 missing)

</div>

### <span style="color:#00BFFF">🎯 TRICK 3: Visual Inspection</span>

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

Tree dekhte hi check karo:

1. 👁️ Kya kisi node ka left child missing hai jab right child exist karta hai?
2. 👁️ Kya last level mein koi gap hai?
3. 👁️ Kya nodes left to right continuously hain?

</div>

---

## <span style="color:#DA70D6">🔄 COMPLETE BINARY TREE vs OTHER TREES</span>

### <span style="color:#FF6347">🌳 FULL BINARY TREE</span>

```text
          1
       /     \
      2       3
    /   \   /   \
   4     5 6     7
```

- 🔸 Har node ke **0 ya 2** children
- 🔸 Yeh **FULL** bhi hai, **COMPLETE** bhi hai

### <span style="color:#32CD32">🌳 PERFECT BINARY TREE</span>

```text
          1
       /     \
      2       3
    /   \   /   \
   4     5 6     7
```

- 🔸 Saare levels completely filled
- 🔸 Har node ke 2 children (except leaves)
- 🔸 **PERFECT = COMPLETE + FULL**

### <span style="color:#1E90FF">🌳 BALANCED BINARY TREE</span>

```text
          1
       /     \
      2       3
     / \     /
    4   5   6
   /
  7
```

- 🔸 Har node ke left aur right subtree ki height difference <= 1
- 🔸 Yeh COMPLETE hai, lekin BALANCED bhi hai

### <span style="color:#FFD700">🌳 SKEWED BINARY TREE</span>

```text
          1
         /
        2
       /
      3
     /
    4
```

- 🔸 Saare nodes sirf ek taraf
- 🔸 Yeh COMPLETE nahi hai? Actually yeh **COMPLETE hai!**
- 🔸 Ha! Yeh COMPLETE hai kyunki left se continuously fill ho raha hai

---

## <span style="color:#FF8C00">📏 IMPORTANT PROPERTIES</span>

### <span style="color:#00CED1">📐 PROPERTY 1: Height vs Nodes</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

Height `h` ke liye:

- 📊 **Minimum nodes** = `2^h`
- 📊 **Maximum nodes** = `2^(h+1) - 1`

**Example:** Height 2 ke liye

- Min nodes = 4 (2^2)
- Max nodes = 7 (2^3 - 1)

</div>

### <span style="color:#00CED1">📐 PROPERTY 2: Leaf Nodes</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

Complete binary tree mein:

- 🍃 Leaf nodes = `floor(n/2) + 1` se start hote hain
- 🔧 Internal nodes = `ceil(n/2)`

</div>

### <span style="color:#00CED1">📐 PROPERTY 3: Array Implementation</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

Parent index `i` ke liye:

- ⬅️ Left child = `2i`
- ➡️ Right child = `2i + 1`
- ⬆️ Parent = `floor(i/2)`

</div>

---

## <span style="color:#FF69B4">📝 PRACTICE PROBLEMS</span>

### <span style="color:#FFD700">🧩 PRACTICE 1: Pehchano ki ye COMPLETE hai ya nahi</span>

**🌳 TREE A:**

```text
          10
       /     \
      20      30
     /  \    /
    40  50  60
   /
  70
```

<div style="background-color:#0d3320; padding:10px; border-radius:8px; border-left:5px solid #32CD32;">

✅ **COMPLETE** (Level order: 10,20,30,40,50,60,70)

</div>

**🌳 TREE B:**

```text
          10
       /     \
      20      30
     /  \       \
    40  50       70
```

<div style="background-color:#3d0d0d; padding:10px; border-radius:8px; border-left:5px solid #FF0000;">

❌ **NOT COMPLETE** (Level order: 10,20,30,40,50,70 - gap after 50)

</div>

**🌳 TREE C:**

```text
          10
       /     \
      20      30
     /       /  \
    40      60   70
```

<div style="background-color:#3d0d0d; padding:10px; border-radius:8px; border-left:5px solid #FF0000;">

❌ **NOT COMPLETE** (Level order: 10,20,30,40,60,70 - 50 missing)

</div>

### <span style="color:#FFD700">🧩 PRACTICE 2: Array se tree banao aur check karo</span>

📦 Array: `[-, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
✅ **COMPLETE** (saare indexes fill hain)

📦 Array: `[-, 1, 2, 3, 4, 5, 7, 8]`
❌ **NOT COMPLETE** (6 missing)

---

## <span style="color:#00FA9A">🌍 REAL WORLD APPLICATIONS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

### 1️⃣ HEAP DATA STRUCTURE

- Priority Queue implementation
- Heap Sort
- Always uses Complete Binary Tree

### 2️⃣ SEGMENT TREES

- Used in competitive programming
- Array representation uses complete binary tree concept

### 3️⃣ BINARY HEAP

- Min Heap / Max Heap
- Must be a complete binary tree

### 4️⃣ PRIORITY QUEUES

- Operating system scheduling
- Dijkstra's algorithm
- Prim's algorithm

</div>

---

## <span style="color:#FFD700">🎯 SUMMARY - KEY TAKEAWAYS</span>

### <span style="color:#32CD32">✅ DO's</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

- ✅ Last level mein **left se right** fill hona chahiye
- ✅ Level order traversal **continuously** hona chahiye
- ✅ Array representation mein **koi gap nahi** hona chahiye

</div>

### <span style="color:#FF0000">❌ DON'Ts</span>

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

- ❌ Kisi node ka left child missing jab right child ho
- ❌ Last level mein gap ke baad node hona
- ❌ Level order traversal mein missing nodes ke baad nodes hona

</div>

> 💡 **REMEMBER:** Complete Binary Tree = **LEFT se RIGHT fill, koi GAP nahi!**
>
> 🔥 **IMPORTANT:** Heap implementation ke liye Complete Binary Tree **must** hai!

### <span style="color:#DA70D6">📊 Visual Summary Table</span>

| Tree Type                                              | All levels filled except last | Last level left to right | Example       |
| :----------------------------------------------------- | :---------------------------: | :----------------------: | :------------ |
| ✅ <span style="color:#32CD32">**Complete**</span>     |               ✓               |            ✓             | 1,2,3,4,5,6   |
| ❌ <span style="color:#FF0000">**Not Complete**</span> |               ✓               |            ✗             | 1,2,3,4,6,7   |
| ✅ <span style="color:#1E90FF">**Full**</span>         |  All nodes have 0/2 children  |            -             | 1,2,3,4,5,6,7 |
| ✅ <span style="color:#FFD700">**Perfect**</span>      | All levels completely filled  |            -             | 1,2,3,4,5,6,7 |

---

---

## <span style="color:#FF6347">🔥 Heap</span>

<div style="background-color:#2d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

Heap ek **complete binary tree** hai. Agar tree complete binary tree nahi hai, to woh heap bhi nahi hai. Heap ek binary tree hai jo ya to **max heap** hota hai ya **min heap**.

</div>

### <span style="color:#FF4500">⬆️ Max Heap</span>

Max heap mein, har node ki value uske children ki values se hamesha badi ya barabar (`>=`) hoti hai.

**Example (Max Heap):**
Parent ki value hamesha apne dono children se badi ya barabar hoti hai.

```text
        10
      /    \
     9      8
    / \    / \
   7   6  5   4
```

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

🏆 **Guarantee:** Max heap mein, sabse badi value hamesha **root node** par hoti hai. Isliye, hum heap se maximum value **`O(1)`** time complexity mein nikal sakte hain.

</div>

### <span style="color:#00BFFF">⬇️ Min Heap</span>

Min heap mein, har node ki value uske children ki values se hamesha chhoti ya barabar (`<=`) hoti hai. Heap ka use Priority Queue implement karne ke liye hota hai.

**Example (Min Heap):**
Parent ki value hamesha apne dono children se chhoti ya barabar hoti hai.

```text
         1
       /    \
      2      3
     / \    / \
    4   5  6   7
```

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

🏆 **Guarantee:** Min heap mein, sabse chhoti value hamesha **root node** par hoti hai.

</div>

### <span style="color:#FFD700">📋 Summary</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

1. 🔸 Heap ek **complete binary tree** hai.
2. 🔸 Min heap mein, parent node ki value apne children se **chhoti ya barabar** hoti hai.
3. 🔸 Max heap mein, parent node ki value apne children se **badi ya barabar** hoti hai.

</div>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6; margin-top:10px;">

**📝 Note:** Jin problems ko aap heap se solve kar sakte hain, unhe dusre data structures se bhi solve kiya ja sakta hai. Lekin, heap ka use aksar problem ki **time complexity ko kam** karne ke liye hota hai.

🧩 Kuch problems jo heap se solve ho sakti hain:

- 🔹 **Kth largest**, Kth smallest, Kth minimum, Kth maximum
- 🔹 **Top K values**, Bottom K values
- 🔹 **Median** of a stream of data
- 🔹 **Merge K sorted arrays**
- 🔹 **Merge K sorted linked lists**

</div>

## <span style="color:#9370DB">📊 Heap Sort</span>

Hum Heap Sort bhi seekh sakte hain, jahan time complexity **`O(n log n)`** aur space complexity **`O(1)`** hoti hai, kyunki hum array ko **in-place** sort karte hain.

---

## <span style="color:#32CD32">✨ Heap ke Fayde (Advantages)</span>

### <span style="color:#FF4500">⬆️ Max Heap</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

1. ⚡ Agar hamare paas Max heap hai, aur humein maximum element nikalna hai, to hum use **`O(1)`** time complexity mein nikal sakte hain kyunki maximum element hamesha **root node** par hota hai.
2. ⚡ Agar humein heap mein ek element **insert** karna hai, to hum **`O(log n)`** time complexity mein kar sakte hain, kyunki element insert karne ke baad humein heap property ko maintain karna padta hai.
3. ⚡ Agar humein heap se maximum element **delete** karna hai, to hum **`O(log n)`** time complexity mein kar sakte hain, kyunki element delete karne ke baad bhi humein heap property ko maintain karna padta hai.

</div>

### <span style="color:#00BFFF">⬇️ Min Heap</span>

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

1. ⚡ Agar hamare paas Min heap hai, aur humein minimum element nikalna hai, to hum use **`O(1)`** time complexity mein nikal sakte hain kyunki minimum element hamesha **root node** par hota hai.
2. ⚡ Agar humein heap mein ek element **insert** karna hai, to hum **`O(log n)`** time complexity mein kar sakte hain.
3. ⚡ Agar humein heap se minimum element **delete** karna hai, to hum **`O(log n)`** time complexity mein kar sakte hain.

</div>

### <span style="color:#FF0000">⚠️ Heap ke Nuksan (Disadvantages)</span>

<div style="background-color:#3d0d0d; padding:15px; border-radius:10px; border-left:5px solid #FF0000;">

1. 🐌 **Search karna slow hai:** Heap mein kisi specific element (jo min/max na ho) ko search karne mein **`O(n)`** time lagta hai. Aisa isliye hai kyunki heap ek sorted data structure nahi hai, aur aapko har node ko check karna pad sakta hai.
2. 🔀 **Sorted nahi hota:** Heap aapko sirf minimum ya maximum element `O(1)` time mein deta hai. Baaki ke elements sorted order mein nahi hote.
3. 🕐 **Sorted order mein print karna slow hai:** Agar aapko saare elements ko sorted order mein print karna hai, to aapko ek-ek karke saare elements nikalne padenge, jismein total **`O(n log n)`** time lagta hai.

</div>

---

## <span style="color:#FF6347">🚀 Diving Deep into Heaps</span>

### <span style="color:#1E90FF">📌 Array Representation of a Heap (Heap ko Array mein represent karna)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

Tree ya BST mein hum pointers use karte hain (`.left`, `.right`) nodes tak pahunchne ke liye.
Par Heap mein hum **Array** use karte hain.

**Kyun?**
Taaki index ki madad se parent aur child nodes ko easily dhund sakein. Array use karne se life easy ho jati hai! (Aisa nahi hai ki pointers use nahi kar sakte, par array zyada efficient hai yahan).

</div>

### <span style="color:#FFD700">📝 How to store Tree Like Structure in Array?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Level Order Traversal ka use karke hum tree ko array mein dalte hain.
Matlab: **Level-by-level, left-to-right** nodes ko array mein bharte jao.

</div>

**💡 Example:**

```text
        10        <-- Level 0
      /    \
     9       8     <-- Level 1
   /   \    /
  7     6  5       <-- Level 2
```

📦 **Iska Array Representation:** `[10, 9, 8, 7, 6, 5]`

### <span style="color:#00CED1">📐 Formula to find Nodes (0-based indexing)</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

Agar parent ka index `i` hai:

- ⬅️ **Left Child** = `2 * i + 1`
- ➡️ **Right Child** = `2 * i + 2`
- ⬆️ **Parent Node** = `Math.floor((i - 1) / 2)`

</div>

<div style="background-color:#2d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF8C00; margin-top:10px;">

🔥 **Important Note:**
Agar hum heap use kar rahe hain, to hum **100% sure** hain ki beech mein koi empty nodes nahi honge, kyunki **Heap ek Complete Binary Tree hai**. Isliye hum directly nodes ko array mein put kar sakte hain bina gaps (`#`) ki chinta kiye.

</div>

### <span style="color:#FF4500">⬆️ Max Heap Example</span>

```text
        50
      /    \
     30     20
   /   \   /  \
  10   15  8   9
  / \
  5   3
```

📦 **Array Representation of Max Heap:** `[50, 30, 20, 10, 15, 8, 9, 5, 3]`

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🔍 Finding Max Element:**
Max element (root) hamesha index `0` par hota hai.
`maxElem = heap[0]` -> ⚡ **Time Complexity: O(1)**

</div>

### <span style="color:#FFD700">⚠️ 0-based vs 1-based Indexing</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Internet par aksar Heaps mein indexing `1` se start hoti hai, lekin JavaScript (aur most programming languages) mein hum `0`-based indexing use karte hain. Formulas mein bas thoda sa change hota hai:

</div>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB; margin-top:10px;">

**🔢 For 1-based indexing:**

- ⬅️ Left Child = `2 * i`
- ➡️ Right Child = `2 * i + 1`
- ⬆️ Parent Node = `Math.floor(i / 2)`

</div>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32; margin-top:10px;">

**🔢 For 0-based indexing (Hum ye use karenge):** ⭐

- ⬅️ Left Child = `2 * i + 1`
- ➡️ Right Child = `2 * i + 2`
- ⬆️ Parent Node = `Math.floor((i - 1) / 2)`

</div>

---

## <span style="color:#FF6347">🔥 HEAP OPERATIONS - INSERT, REMOVE, PEEK</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

Jaise Stack mein `push` aur `pop` hota hai, aur Queue mein `enqueue` aur `dequeue`, waise hi Heap ke apne specific operations hain: `insert`, `remove`, aur `peek`. Heap mein hum randomly kahin se bhi element remove nahi kar sakte, kyunki isse Heap ka structure (Complete Binary Tree) aur property (Min/Max Heap) dono break ho jayenge.

</div>

### <span style="color:#32CD32">✅ INSERT Operation (Heapify Up)</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

Jab bhi hum naya element insert karte hain, hum usko hamesha tree ke **sabse last position** par daalte hain (taaki Complete Binary Tree ki property bani rahe). Iske baad, hum **Heapify Up** (ya sift-up) karte hain.

Is process mein, hum naye node ko uske **parent node** se compare karte hain. Agar new node parent se bada hai (Max Heap mein), to hum unhe **swap** kar dete hain. Yeh process tab tak chalta hai jab tak new node apni sahi jagah par na aa jaye ya root na ban jaye.

</div>

### <span style="color:#FF4500">❌ REMOVE Operation (Heapify Down)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

Jab hum root node ko remove karte hain, toh tree ka structure maintain karne ke liye hum **sabse last element** ko utha kar root par rakh dete hain. Ab Heap property (Min/Max) bigad sakti hai, isliye hum **Heapify Down** (ya sift-down) karte hain.

Is process mein, hum root ko uske **children** se compare karte hain. Agar root apne children se chota hai (Max Heap mein), to hum usko **sabse bade child** ke sath swap kar dete hain. Yeh process tab tak chalta rehta hai jab tak node apni sahi jagah par na aa jaye ya leaf node na ban jaye.

</div>

### <span style="color:#00BFFF">👀 PEEK Operation</span>

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

`peek()` operation se hum sirf **root element** ko dekh sakte hain. Max Heap mein yeh sabse bada element hota hai aur Min Heap mein sabse chota. Iski time complexity **O(1)** hoti hai. Hum kisi random element ko access nahi kar sakte.

</div>

---

### <span style="color:#FFD700">📜 HARD BOUND RULES</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32; margin-bottom: 10px;">

1.  🔥 **INSERT:** Hamesha **last position** par insert karo aur phir **Heapify Up** karo.

</div>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

2.  🔥 **REMOVE:** Hamesha **root node** ko remove karo, **last element** ko root par lao, aur phir **Heapify Down** karo.

</div>

---

## <span style="color:#9370DB">📝 HEAPIFY SUMMARY (Hinglish)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

**⬆️ Heapify Up:**
Jab hum new element ko insert karte hai to hum usko sabse last position pe insert karte hai aur phir usko parent node ke sath compare karte hai. Agar new element ka value parent node se zyada hai to hum usko parent node ke sath swap karte hai aur phir usko parent node ke sath compare karte hai jab tak new element ka value parent node se zyada nahi hota hai ya phir hum root node tak nahi pahuch jate hai.

**⬇️ Heapify Down:**
Jab hum root node ko remove karte hain, to hum sabse last element ko root node par le aate hain. Phir, hum usko uske children (left aur right) se compare karte hain. Agar parent apne children se chota hai (Max Heap ke case mein), to hum uske sabse bade child ke sath swap karte hain. Yeh process tab tak chalta rehta hai jab tak node apni sahi jagah par na aa jaye ya leaf node na ban jaye.

</div>

---

# 🔬 HEAPIFY UP & HEAPIFY DOWN — COMPLETE DEEP DIVE

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

Ab tak humne dekha ki Heap mein **insert** aur **remove** kaise hote hain. Lekin asli magic **Heapify Up** aur **Heapify Down** mein hai. Is section mein hum yeh dono cheezein **step-by-step visuals** ke saath samjhenge.

</div>

---

## <span style="color:#FFD700">❓ SABSE PEHLE: NAAM KYUN AISA HAI?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Naam **direction** se aaya hai — element tree mein kis taraf **travel** karta hai.

- ⬆️ **Heapify UP** → Element **neeche se upar** jaata hai (leaf ➜ root ki taraf)
- ⬇️ **Heapify DOWN** → Element **upar se neeche** jaata hai (root ➜ leaf ki taraf)

</div>

### <span style="color:#32CD32">⬆️ Heapify Up — Kyun?</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

Jab naya element insert hota hai, wo hamesha **last position (sabse neeche)** par daala jaata hai. Phir wo apne **parent** se compare hota hai aur agar bada hai to **swap** hoke **ek level upar** chala jaata hai.

➡️ Yeh process tab tak chalta hai jab tak element **root tak na pahunch jaye** ya **parent se chhota na ho jaye**.

Isliye naam **"Heapify UP"** — kyunki element har swap ke baad **UPAR** move karta hai.

</div>

### <span style="color:#FF4500">⬇️ Heapify Down — Kyun?</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

Jab root remove hota hai, hum **last element** ko uthakar **root par** rakh dete hain. Ab yeh element galat jagah par hai (chhota hone ke bawajood root par baitha hai). Ab hum ise apne **children** se compare karte hain aur agar koi bada child hai to uske saath **swap** hoke **ek level neeche** chala jaata hai.

➡️ Yeh process tab tak chalta hai jab tak element **leaf na ban jaye** ya **dono children se bada na ho jaye**.

Isliye naam **"Heapify DOWN"** — kyunki element har swap ke baad **NEECHE** move karta hai.

</div>

---

## <span style="color:#00CED1">⏰ KAB CALL KARTE HAIN? (WHEN TO CALL)</span>

| Situation                                              | Kya karte hain?                                        |   Kaunsa Heapify?   |
| :----------------------------------------------------- | :----------------------------------------------------- | :-----------------: |
| ✅ Naya element **insert** karna hai                   | Last position par daalo, phir upar sift karo           |  ⬆️ **Heapify Up**  |
| ✅ Root (min/max) **remove** karna hai                 | Last element ko root par lao, phir neeche sift karo    | ⬇️ **Heapify Down** |
| ✅ **Build Heap** from random array                    | Last non-leaf node se root tak, har node par call karo | ⬇️ **Heapify Down** |
| ✅ Kisi bhi node ki value **badh gayi** (increase key) | Us node se upar sift karo                              |  ⬆️ **Heapify Up**  |
| ✅ Kisi bhi node ki value **ghat gayi** (decrease key) | Us node se neeche sift karo                            | ⬇️ **Heapify Down** |

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">

**📌 RULE OF THUMB:**

- 🔼 Element agar **apni sahi jagah se neeche** hai → **UP** karo
- 🔽 Element agar **apni sahi jagah se upar** hai → **DOWN** karo

</div>

---

## <span style="color:#32CD32">⬆️ HEAPIFY UP — STEP BY STEP VISUAL</span>

### <span style="color:#FFD700">📦 Initial Max Heap (7 nodes)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

```
        50          ← Index 0 (root)
      /    \
    30      20      ← Index 1, 2
   /  \    /  \
  10   15 8    9    ← Index 3, 4, 5, 6
```

📦 Array: `[50, 30, 20, 10, 15, 8, 9]`

</div>

### <span style="color:#FF69B4">🎯 Goal: Insert `60` into Max Heap</span>

---

### <span style="color:#FFD700">🔹 STEP 1: Naya element last position par daalo</span>

```
        50                  ← Index 0
      /    \
    30      20              ← Index 1, 2
   /  \    /  \
  10   15 8    9            ← Index 3, 4, 5, 6
 /
60                          ← Index 7 (naya element)
```

📦 Array: `[50, 30, 20, 10, 15, 8, 9, 60]`

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**🧮 Compare:** Index 7 ka parent = `floor((7-1)/2) = 3` → value = `10`

`60 > 10`? ✅ **Haan** → **SWAP** karo!

</div>

---

### <span style="color:#FFD700">🔹 STEP 2: 60 apne parent (10) se swap hua → ek level UPAR</span>

```
        50                  ← Index 0
      /    \
    30      20              ← Index 1, 2
   /  \    /  \
  60   15 8    9            ← Index 3 (ab 60 yahan hai)
 /
10                          ← Index 7 (ab 10 yahan)
```

📦 Array: `[50, 30, 20, 60, 15, 8, 9, 10]`

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**🧮 Compare:** Index 3 ka parent = `floor((3-1)/2) = 1` → value = `30`

`60 > 30`? ✅ **Haan** → **SWAP** karo!

</div>

---

### <span style="color:#FFD700">🔹 STEP 3: 60 apne parent (30) se swap hua → ek aur level UPAR</span>

```
        50                  ← Index 0
      /    \
    60      20              ← Index 1 (ab 60 yahan)
   /  \    /  \
  30   15 8    9            ← Index 3 (ab 30 yahan)
 /
10
```

📦 Array: `[50, 60, 20, 30, 15, 8, 9, 10]`

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**🧮 Compare:** Index 1 ka parent = `floor((1-1)/2) = 0` → value = `50`

`60 > 50`? ✅ **Haan** → **SWAP** karo!

</div>

---

### <span style="color:#FFD700">🔹 STEP 4: 60 root par pahunch gaya → 50 se swap hua</span>

```
        60                  ← Index 0 (60 root ban gaya!)
      /    \
    50      20              ← Index 1 (ab 50 yahan)
   /  \    /  \
  30   15 8    9
 /
10
```

📦 Array: `[60, 50, 20, 30, 15, 8, 9, 10]`

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🛑 STOP!** Index 0 = root hai, upar koi parent nahi. Heap property satisfied ✅

**🎉 Final Max Heap:** `[60, 50, 20, 30, 15, 8, 9, 10]`

**⏱️ Total swaps:** 3 = height of tree = `O(log n)`

</div>

---

## <span style="color:#FF4500">⬇️ HEAPIFY DOWN — STEP BY STEP VISUAL</span>

### <span style="color:#FFD700">📦 Initial Max Heap (8 nodes)</span>

```
        60                  ← Index 0
      /    \
    50      20              ← Index 1, 2
   /  \    /  \
  30   15 8    9            ← Index 3, 4, 5, 6
 /
10                          ← Index 7
```

📦 Array: `[60, 50, 20, 30, 15, 8, 9, 10]`

### <span style="color:#FF69B4">🎯 Goal: Remove maximum element (root = 60)</span>

---

### <span style="color:#FFD700">🔹 STEP 1: Root hatao → last element (10) ko root par lao</span>

```
        10                  ← Index 0 (last element root par)
      /    \
    50      20              ← Index 1, 2
   /  \    /  \
  30   15 8    9            ← Index 3, 4, 5, 6
```

📦 Array: `[10, 50, 20, 30, 15, 8, 9]` (60 removed, 10 moved to root)

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**🧮 Compare:** Index 0 ke children = Index 1 (`50`) aur Index 2 (`20`)

Sabse bada child = `50`. `10 < 50`? ✅ **Haan** → **SWAP** with 50!

</div>

---

### <span style="color:#FFD700">🔹 STEP 2: 10 apne bade child (50) se swap hua → ek level NEECHE</span>

```
        50                  ← Index 0 (50 ab root par)
      /    \
    10      20              ← Index 1 (ab 10 yahan)
   /  \    /  \
  30   15 8    9
```

📦 Array: `[50, 10, 20, 30, 15, 8, 9]`

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**🧮 Compare:** Index 1 ke children = Index 3 (`30`) aur Index 4 (`15`)

Sabse bada child = `30`. `10 < 30`? ✅ **Haan** → **SWAP** with 30!

</div>

---

### <span style="color:#FFD700">🔹 STEP 3: 10 apne bade child (30) se swap hua → ek aur level NEECHE</span>

```
        50                  ← Index 0
      /    \
    30      20              ← Index 1 (ab 30 yahan)
   /  \    /  \
  10   15 8    9            ← Index 3 (ab 10 yahan)
```

📦 Array: `[50, 30, 20, 10, 15, 8, 9]`

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

**🧮 Compare:** Index 3 ke children = Index 7 aur Index 8

Array ki length = `7`, toh Index 7 aur 8 **out of bounds** hain. `10` ab **leaf** hai.

</div>

---

### <span style="color:#FFD700">🔹 STEP 4: 10 leaf ban gaya → STOP</span>

```
        50
      /    \
    30      20
   /  \    /  \
  10   15 8    9
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🛑 STOP!** 10 ab leaf node hai, koi child nahi. Heap property satisfied ✅

**🎉 Final Max Heap:** `[50, 30, 20, 10, 15, 8, 9]`

**🗑️ Removed maximum:** `60` (return value)

**⏱️ Total swaps:** 2 = height of tree = `O(log n)`

</div>

---

## <span style="color:#9370DB">🏗️ BUILD HEAP — SIRF HEAPIFY DOWN SE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

Ek random array ko heap mein convert karna ho, toh hum **last non-leaf node** se **root** tak jaate hain aur har node par **Heapify Down** call karte hain.

**Kyun last non-leaf se?** Kyunki leaf nodes already valid heaps hote hain (unke paas koi child nahi hota). Toh unpar kaam karne ki zaroorat nahi.

**Last non-leaf index** = `floor(n/2) - 1` (0-based indexing)

</div>

### <span style="color:#FFD700">📦 Example: Random array `[3, 9, 2, 1, 4, 5]` ko Max Heap banao</span>

```
Initial Tree:
        3
      /   \
     9     2
    / \   /
   1   4 5
```

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

n = 6, last non-leaf index = `floor(6/2) - 1 = 2`

Toh hum **Index 2 ➜ 1 ➜ 0** par Heapify Down karenge.

</div>

### <span style="color:#FFD700">🔹 i = 2 (value 2): children = 5 (idx 5). 5 > 2 → swap</span>

```
        3
      /   \
     9     5
    / \   /
   1   4 2
```

### <span style="color:#FFD700">🔹 i = 1 (value 9): children = 1, 4. 9 sabse bada → no swap</span>

```
        3
      /   \
     9     5
    / \   /
   1   4 2
```

### <span style="color:#FFD700">🔹 i = 0 (value 3): children = 9, 5. 9 sabse bada → swap</span>

```
        9
      /   \
     3     5
    / \   /
   1   4 2
```

### <span style="color:#FFD700">🔹 Continue Heapify Down on Index 1 (value 3): children = 1, 4. 4 > 3 → swap</span>

```
        9
      /   \
     4     5
    / \   /
   1   3 2
```

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

**🎉 Final Max Heap:** `[9, 4, 5, 1, 3, 2]` ✅

**⏱️ Build Heap Time Complexity:** `O(n)` (na ki O(n log n) — kyunki zyada nodes leaf ke paas hain jinko kam kaam karna padta hai)

</div>

---

## <span style="color:#DA70D6">📊 QUICK COMPARISON TABLE</span>

| Feature               |          ⬆️ Heapify Up           |            ⬇️ Heapify Down             |
| :-------------------- | :------------------------------: | :------------------------------------: |
| **Direction**         |           Leaf ➜ Root            |              Root ➜ Leaf               |
| **Compare with**      |              Parent              |            Children (dono)             |
| **Swap with**         |     Parent (agar child bada)     |        Sabse bada/chhota child         |
| **Kab call hota hai** |          Insert ke baad          |      Remove ke baad / Build Heap       |
| **Time Complexity**   |            `O(log n)`            |               `O(log n)`               |
| **Space Complexity**  |              `O(1)`              |           `O(1)` (iterative)           |
| **Alternative names** | Sift Up, Bubble Up, Percolate Up | Sift Down, Bubble Down, Percolate Down |
| **Kitne swaps max?**  |          Height of tree          |             Height of tree             |

---

## <span style="color:#FFD700">🎯 EK LINE MEIN YAAD RAKHO</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

> ⬆️ **INSERT** karo → Last mein daalo → **HEAPIFY UP** (parent se compare)
>
> ⬇️ **REMOVE** karo → Last ko root par lao → **HEAPIFY DOWN** (children se compare)
>
> 🏗️ **BUILD HEAP** → Last non-leaf se root tak → **HEAPIFY DOWN**

</div>

---

---

## <span style="color:#00FA9A">💻 JAVASCRIPT IMPLEMENTATION</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

Ab poora **Max Heap** JavaScript mein likhte hain — `insert`, `remove`, `peek`, `heapifyUp`, `heapifyDown`, aur `buildHeap` — sab kuch! (0-based indexing use karenge ⭐)

</div>

### <span style="color:#FFD700">📝 Complete MaxHeap Class</span>

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // ---------- 🔢 INDEX HELPERS (0-based) ----------
  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  leftChild(i) {
    return 2 * i + 1;
  }
  rightChild(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // ---------- 👀 PEEK : O(1) ----------
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // ---------- ✅ INSERT : O(log n) ----------
  insert(value) {
    this.heap.push(value); // 1. last position par daalo
    this.heapifyUp(this.heap.length - 1); // 2. phir upar sift karo
  }

  // ---------- ⬆️ HEAPIFY UP : O(log n) ----------
  heapifyUp(index) {
    while (index > 0) {
      const parentIdx = this.parent(index);

      // Max Heap: agar child parent se bada hai to swap
      if (this.heap[index] > this.heap[parentIdx]) {
        this.swap(index, parentIdx);
        index = parentIdx; // ⬆️ upar chalo
      } else {
        break; // ✅ sahi jagah mil gayi
      }
    }
  }

  // ---------- ❌ REMOVE (max) : O(log n) ----------
  remove() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0]; // 1. root = max
    this.heap[0] = this.heap.pop(); // 2. last element root par
    this.heapifyDown(0); // 3. neeche sift karo
    return max;
  }

  // ---------- ⬇️ HEAPIFY DOWN : O(log n) ----------
  heapifyDown(index) {
    const n = this.heap.length;

    while (true) {
      let largest = index;
      const left = this.leftChild(index);
      const right = this.rightChild(index);

      // Left child se compare
      if (left < n && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      // Right child se compare
      if (right < n && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest === index) break; // ✅ heap property satisfied

      this.swap(index, largest);
      index = largest; // ⬇️ neeche chalo
    }
  }

  // ---------- 🏗️ BUILD HEAP : O(n) ----------
  buildHeap(array) {
    this.heap = [...array];

    // Last non-leaf node se start karo (floor(n/2) - 1), root tak
    const lastNonLeaf = Math.floor(this.heap.length / 2) - 1;

    for (let i = lastNonLeaf; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  // ---------- 🖨️ PRINT ----------
  print() {
    console.log(this.heap);
  }
}
```

---

### <span style="color:#00BFFF">🧪 Usage Example — Insert & Heapify Up</span>

```javascript
const heap = new MaxHeap();

// Insert karte jaao
[50, 30, 20, 10, 15, 8, 9].forEach((v) => heap.insert(v));
heap.print();
// 👉 [50, 30, 20, 10, 15, 8, 9]

// Ab 60 insert karo → Heapify Up trigger hoga
heap.insert(60);
heap.print();
// 👉 [60, 50, 20, 30, 15, 8, 9, 10]  ✅ 60 root par
```

---

### <span style="color:#00BFFF">🧪 Usage Example — Remove & Heapify Down</span>

```javascript
const heap = new MaxHeap();
heap.buildHeap([60, 50, 20, 30, 15, 8, 9, 10]);
heap.print();
// 👉 [60, 50, 20, 30, 15, 8, 9, 10]

const max = heap.remove();
console.log('Removed:', max); // 👉 Removed: 60
heap.print();
// 👉 [50, 30, 20, 10, 15, 8, 9]  ✅ Heapify Down ne sambhal liya
```

---

### <span style="color:#00BFFF">🧪 Usage Example — Build Heap from Random Array</span>

```javascript
const heap = new MaxHeap();
heap.buildHeap([3, 9, 2, 1, 4, 5]);
heap.print();
// 👉 [9, 4, 5, 1, 3, 2]  ✅
```

---

### <span style="color:#FF69B4">🔁 Min Heap banane ke liye sirf 2 line badlo</span>

<div style="background-color:#2d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF8C00;">

**Heapify Up** mein `>` ko `<` karo, aur **Heapify Down** mein `>` ko `<` karo — bas!

```javascript
// ⬆️ Heapify Up (Min Heap version)
if (this.heap[index] < this.heap[parentIdx]) { ... }

// ⬇️ Heapify Down (Min Heap version)
if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
```

</div>

---

## <span style="color:#FFD700">🎯 FINAL SUMMARY</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">

1. 🔼 **Heapify Up** = leaf se root ki taraf sift. **Insert** ke baad call hota hai.
2. 🔽 **Heapify Down** = root se leaf ki taraf sift. **Remove** ke baad aur **Build Heap** mein call hota hai.
3. 🕐 Dono ki time complexity = `O(log n)` = tree ki height.
4. 🏗️ **Build Heap** = `O(n)` (kyunki zyada nodes bottom ke paas hain, unhe kam kaam karna padta hai).
5. 🎯 Heap mein **koi bhi random node** remove nahi kar sakte — sirf **root**.
6. 💡 **Rule of Thumb:** Element agar sahi jagah se **neeche hai → UP**, agar **upar hai → DOWN**.

</div>

> 🔥 **REMEMBER:** Insert = Last mein daalo + **UP** | Remove = Last ko root par lao + **DOWN**

---

# <span style="color:#FF4500">🔥 MAX HEAP vs MIN HEAP — DEEP COMPARISON</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

Ab tak humne **Min Heap** aur **Max Heap** dono ke baare mein baat ki. Lekin dono mein **asli farak sirf 3 comparisons** ka hai. Baaki poora structure, code, aur logic **bilkul same** rehta hai.

</div>

---

## <span style="color:#FFD700">📊 Sirf 3 Comparisons Ka Farak</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Comparison              | Min Heap                       | Max Heap                      |
| :---------------------- | :----------------------------- | :---------------------------- |
| **heapifyUp**           | `heap[idx] < heap[parent]`     | `heap[idx] > heap[parent]`    |
| **heapifyDown (left)**  | `heap[left] < heap[smallest]`  | `heap[left] > heap[largest]`  |
| **heapifyDown (right)** | `heap[right] < heap[smallest]` | `heap[right] > heap[largest]` |
| **Root**                | Sabse chhota                   | Sabse bada                    |
| **Variable name**       | `smallestElem`                 | `largestElem`                 |

</div>

---

## <span style="color:#00CED1">🔑 Rule Yaad Rakhne Ka</span>

<div style="background-color:#0d2d2d; padding:15px; border-radius:10px; border-left:5px solid #00CED1;">

Poora structure same — sirf **`<`** ki jagah **`>`** (comparisons ulti).

Min Heap: Parent < Children (chhota upar)
Max Heap: Parent > Children (bada upar)

Bas yahi ek line yaad rakh. Baaki sab isi se derive ho jata hai.

</div>

---

## <span style="color:#FF69B4">📌 Visual Example — Same Values, Different Heaps</span>

### <span style="color:#00BFFF">⬇️ Min Heap (chhota upar)</span>

```text
         1
       /   \
      3     5
     / \   /
    8   12 18
📦 Array: [1, 3, 5, 8, 12, 18]
```

<div style="background-color:#0d1a3d; padding:15px; border-radius:10px; border-left:5px solid #00BFFF;">
🏆 Root = 1 → sabse chhota element (O(1) me nikal sakte)
</div>

### <span style="color:#FF4500">⬆️ Max Heap (bada upar)</span>

```text
         18
       /    \
      12     5
     /  \   /
    8    3 1
📦 Array: [18, 12, 5, 8, 3, 1]
```

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">
🏆 Root = 18 → sabse bada element (O(1) me nikal sakte)
</div>

### <span style="color:#9370DB">⚡ Ek Line Me Summary</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">
Min Heap: Parent apne children se chhota
Max Heap: Parent apne children se bada
Farak: Sirf comparisons ulti — baaki sab same
</div>

### <span style="color:#DA70D6">🎯 GENERIC HEAP — EK CLASS, DO HEAPS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #DA70D6;">
Do alag classes (MinHeap, MaxHeap) banane ki zaroorat nahi hai. Ek hi generic Heap class banao, aur ek comparator function pass karo. Code duplicate nahi hoga, aur class flexible rahegi.
</div>

### <span style="color:#FFD700">🔑 Comparator Kya Karta Hai?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">
compare(a, b) batata hai — "kya a, b se BETTER hai?"

✅ true → a better hai, upar jayega

❌ false → b better hai, wahi rahega

Examples:

```javascript
(a, b) => a < b   //  Min Heap (chhota upar)
(a, b) => a > b   //  Max Heap (bada upar)
```

</div>

### <span style="color:#00FA9A">💻 Complete Generic Heap Class</span>

```javascript
class Heap {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator; // (a, b) => boolean
  }

  // ---------- 🔢 INDEX HELPERS ----------
  getLeftChildIdx(i) {
    return 2 * i + 1;
  }
  getRightChildIdx(i) {
    return 2 * i + 2;
  }
  getParentIdx(i) {
    return Math.floor((i - 1) / 2);
  }

  // ---------- ✅ INSERT : O(log n) ----------
  insert(val) {
    this.heap.push(val);
    let lastIdx = this.heap.length - 1;
    this.heapifyUp(lastIdx);
  }

  // ---------- ⬆️ HEAPIFY UP ----------
  heapifyUp(idx) {
    while (idx > 0) {
      let parentIdx = this.getParentIdx(idx);

      // Agar child parent se "better" hai (compare true), to swap
      if (this.compare(this.heap[idx], this.heap[parentIdx])) {
        [this.heap[idx], this.heap[parentIdx]] = [
          this.heap[parentIdx],
          this.heap[idx],
        ];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  // ---------- ❌ DELETE ROOT : O(log n) ----------
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

  // ---------- ⬇️ HEAPIFY DOWN ----------
  heapifyDown(idx) {
    let leftChildIdx = this.getLeftChildIdx(idx);
    let rightChildIdx = this.getRightChildIdx(idx);

    let best = idx;
    let heapLength = this.heap.length;

    // Left child agar "better" hai to best update karo
    if (
      leftChildIdx < heapLength &&
      this.compare(this.heap[leftChildIdx], this.heap[best])
    ) {
      best = leftChildIdx;
    }

    // Right child agar "better" hai to best update karo
    if (
      rightChildIdx < heapLength &&
      this.compare(this.heap[rightChildIdx], this.heap[best])
    ) {
      best = rightChildIdx;
    }

    if (best !== idx) {
      [this.heap[idx], this.heap[best]] = [this.heap[best], this.heap[idx]];
      this.heapifyDown(best);
    }
  }

  // ---------- 👀 PEEK : O(1) ----------
  peek() {
    return this.heap[0] ?? null;
  }

  // ---------- 📏 SIZE ----------
  size() {
    return this.heap.length;
  }
}
```

### <span style="color:#00BFFF">🧪 Usage — Min Heap vs Max Heap</span>

```javascript
// ⬇️ Min Heap — chhota upar
let minHeap = new Heap((a, b) => a < b);
minHeap.insert(8);
minHeap.insert(3);
minHeap.insert(5);
minHeap.insert(1);
console.log(minHeap.heap); // 👉 [1, 3, 5, 8]
console.log(minHeap.deleteRoot()); // 👉 1
console.log(minHeap.heap); // 👉 [3, 8, 5]

// ⬆️ Max Heap — bada upar
let maxHeap = new Heap((a, b) => a > b);
maxHeap.insert(8);
maxHeap.insert(3);
maxHeap.insert(5);
maxHeap.insert(1);
console.log(maxHeap.heap); // 👉 [8, 3, 5, 1]
console.log(maxHeap.deleteRoot()); // 👉 8
console.log(maxHeap.heap); // 👉 [5, 3, 1]
```

### <span style="color:#FF8C00">🎨 Custom Comparator Ke Examples</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF8C00;">

```javascript
// 🔢 Numbers — Min Heap
new Heap((a, b) => a < b);

// 🔢 Numbers — Max Heap
new Heap((a, b) => a > b);

// 📦 Objects — chhota priority pehle
new Heap((a, b) => a.priority < b.priority);

// 📦 Objects — bada priority pehle
new Heap((a, b) => a.priority > b.priority);

// 🔗 Pairs — pehle first compare, phir second
new Heap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]));
```

</div>

### <span style="color:#32CD32">📊 Do Alag Classes vs Ek Generic Class</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">
Point	Two Classes (MinHeap, MaxHeap)	One Generic Class
Code	Duplicate hota hai	Ek hi baar
Flexibility	Fixed min/max	Koi bhi comparator
Readability	Explicit naam	Thoda abstract
Reusability	Kam	Zyada
Objects ke liye	Nahi kaam karta	Bilkul kaam karega
Interview me	Theek	Impressive
</div>

### <span style="color:#FFD700">⚡ Quick Reference — Yaad Rakhne Ka Rule</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">
compare(a, b) — "kya a, b se pehle aana chahiye?"

Min Heap → compare = (a, b) => a < b "chhota pehle"
Max Heap → compare = (a, b) => a > b "bada pehle"
Heapify me sirf yahi compare use hota hai — baaki sab same:

heapifyUp → child parent se better? → swap

heapifyDown → child best se better? → value update

root → sabse better element

</div>
