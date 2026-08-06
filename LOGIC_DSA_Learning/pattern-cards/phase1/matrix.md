# Pattern Card — Matrix

## Recognition

Question asks:

- Grid
- Matrix
- Image
- 2D Array
- Rows and Columns
- Diagonal
- Rotation
- Spiral

Immediately suspect Matrix Pattern.

---

## Core Concepts

- Row Traversal
- Column Traversal
- Boundary Traversal
- Main Diagonal
- Secondary Diagonal
- Full Diagonal Traversal
- Matrix Transpose
- In-place Transpose
- Rotate Image
- Spiral Matrix

---

## Matrix Access

matrix[row][col]

---

## Important Formulas

Main Diagonal

row == col

-------------------------

Secondary Diagonal

row + col == n - 1

---

## Transpose

Rows

↓

Columns

Formula

matrix[row][col]

↓

matrix[col][row]

---

## Rotate Image

90° Clockwise

Transpose

↓

Reverse Every Row

-------------------------

90° Anti-Clockwise

Transpose

↓

Reverse Every Column

---

## Complexity

Traversal

O(rows × cols)

Transpose

O(n²)

Rotate

O(n²)

---

## Engineering Idea

Most matrix problems are combinations of simple traversals.

Instead of memorizing every problem,

learn the transformations.

---

## Common Mistakes

❌ Confusing rows and columns

❌ Wrong boundary variables

❌ Double swapping during transpose

❌ Wrong transpose loop

(col = row + 1)

❌ Forgetting in-place requirement

---

## LeetCode

✅ LC48 — Rotate Image

✅ LC54 — Spiral Matrix

---

## Interview Sentence

Most matrix problems are built using traversal, boundary management and matrix transformations like transpose and reverse.