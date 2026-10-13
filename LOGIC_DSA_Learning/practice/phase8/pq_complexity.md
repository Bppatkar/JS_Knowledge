# Priority Queue Time and Space Complexity (Step by Step)

**Implementation:** Heap Based Max Priority Queue

---

## Operation 1 — Enqueue

**Code Logic:**

```javascript
enqueue(val, priority) {
  heap.push({val, priority});
  heapifyUp();
}
```

### Step 1: Push

Array ke end me element insert hota hai (`heap.push()`).

- **Time Complexity:** `O(1)`
- **Space Complexity:** `O(1)`

### Step 2: HeapifyUp

Element starting me leaf position par hota hai aur fir root ki taraf swap hota hai.

**Example:**
Before insert:

```text
          5
         / \
        3   4
```

Insert 10:

```text
      5
     / \
    3   4
   /
 10
```

Swap (Leaf → Root):

```text
      10
     / \
    3   4
   /
  5
```

- **Movement:** Leaf → Root
- **Tree Height:** `log₂(n)`
- **Worst case swaps:** `log n`

- **Time Complexity:** `O(log n)`
- **Space Complexity:** `O(1)`

---

## Operation 2 — Dequeue

**Steps:**

1. Remove root element.
2. Replace root with the last element of the heap.
3. Call `heapifyDown()`.

**Example:**
Before:

```text
          10
         /  \
        8    7
       /
      5
```

Remove root `10`. Replace with last element `5`:

```text
      5
     / \
    8   7
```

`heapifyDown()` (Root → Leaf):

```text
      8
     / \
    5   7
```

- **Movement:** Root → Leaf
- **Height:** `log n`

- **Time Complexity:** `O(log n)`
- **Space Complexity:** `O(1)`

---

## Operation 3 — Peek

**Code Logic:**

```javascript
return heap[0];
```

Direct access to the root element.

- **Time Complexity:** `O(1)`
- **Space Complexity:** `O(1)`

---

## Operation 4 — HeapifyUp

Loop leaf se root tak chalta hai.

- **Tree Height:** `log n`
- **Max Swaps:** `log n`

- **Time Complexity:** `O(log n)`
- **Space Complexity:** `O(1)`

---

## Operation 5 — HeapifyDown

Root se leaf tak comparisons hote hain. Har level par max 2 comparisons (left and right child).

- **Tree Height:** `log n`

- **Time Complexity:** `O(log n)`
- **Space Complexity:** `O(1)`

---

## Final Complexity Table

| Operation       | Time Complexity | Space Complexity |
| --------------- | --------------- | ---------------- |
| **Enqueue**     | `O(log n)`      | `O(1)`           |
| **Dequeue**     | `O(log n)`      | `O(1)`           |
| **Peek**        | `O(1)`          | `O(1)`           |
| **HeapifyUp**   | `O(log n)`      | `O(1)`           |
| **HeapifyDown** | `O(log n)`      | `O(1)`           |
| **BuildHeap**   | `O(n)`          | `O(1)`           |
