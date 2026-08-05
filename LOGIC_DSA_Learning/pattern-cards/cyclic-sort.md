# Pattern Card — Cyclic Sort

## Recognition

Question asks:

- Missing Number
- Missing Positive
- Duplicate Number
- Disappeared Numbers
- Numbers belong to 1...n or 0...n

Immediately suspect Cyclic Sort.

---

## Core Idea

Every number has a correct index.

Place every number at its correct position.

1...n

↓

correctIndex = value - 1

0...n

↓

correctIndex = value

---

## Algorithm

While current number is not at its correct position:

1. Find correct index.
2. Check if current value belongs to valid range.
3. Swap with the correct index.
4. Repeat until current position becomes correct.

---

## Time

O(n)

---

## Space

O(1)

---

## Engineering Idea

Instead of sorting the entire array,

continuously place each element into its correct position.

Every successful swap permanently fixes at least one element.

---

## Common Mistakes

❌ Forget valid range check

❌ Infinite swapping with duplicates

❌ Wrong correctIndex formula

❌ Swapping already correct values

❌ Forgetting current value may need multiple swaps

---

## Pattern Recognition

Use Cyclic Sort when:

- Numbers belong to a fixed range
- Missing Number
- Duplicate Number
- Missing Positive
- Find misplaced elements

---

## LeetCode

✅ LC268 — Missing Number

✅ LC448 — Find All Numbers Disappeared

✅ LC41 — First Missing Positive

🟡 LC287 — Find Duplicate Number (Floyd's Algorithm later)

---

## Interview Sentence

Cyclic Sort is an index-placement algorithm. Instead of fully sorting the array, each value is repeatedly moved to its correct index until every valid element reaches its expected position.