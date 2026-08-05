# Day 10 Revision

## Vocabulary

Subarray
Contiguous
Running Sum
Restart
Continue
Current State
Best State
State Compression

---

## Formula

currentSum = max(currentSum + nums[i], nums[i])

bestSum = max(bestSum, currentSum)

---

## Recognition

Maximum Sum

+

Contiguous

+

O(n)

↓

Kadane

---

## Dry Run Reminder

Always update:

1. currentSum

2. bestSum

---

## Complexity

Time

O(n)

Space

O(1)

---

## Interview Notes

Kadane is both:

- Greedy
- Dynamic Programming (State Compression)

State:

dp[i]

↓

Maximum subarray ending at index i

Optimized to

currentSum

---

# Cyclic Sort Revision

## Vocabulary

Correct Position

Correct Index

Valid Range

Index Placement

Swap Until Correct

Duplicate

Missing Number

Missing Positive

---

## Recognition

Numbers belong to

1...n

or

0...n

↓

Think

Cyclic Sort

---

## Correct Index

1...n

↓

index = value - 1

------------------------

0...n

↓

index = value

---

## Golden Rules

Every number should be placed
at its correct index.

Always verify

Valid Range

before swapping.

Never swap an already correct value.

---

## Complexity

Time

O(n)

Space

O(1)

---

## Interview Notes

Cyclic Sort is not a general sorting algorithm.

It is an index-placement technique that works only when numbers belong to a fixed range.

---

# Matrix Revision

## Vocabulary

Row

Column

Transpose

Boundary

Diagonal

Simulation

Clockwise

Anti-Clockwise

---

## Main Diagonal

row == col

---

## Secondary Diagonal

row + col == n - 1

---

## Transpose

Rows

↓

Columns

---

## Rotate Image

90° Clockwise

Transpose

↓

Reverse Every Row

------------------------

90° Anti-Clockwise

Transpose

↓

Reverse Every Column

---

## Reverse Pattern

Opposite Direction

Two Pointers

left

↓

Swap

↓

right

---

## Complexity

Traversal

O(rows × cols)

Transpose

O(n²)

Rotate

O(n²)

---

## Interview Notes

Rotation is not memorized.

It is derived.

Column

↓

Row

↓

Reverse

---

# Simulation Pattern Revision

## Vocabulary

Simulation

Boundary

Layer

State

Movement

Traversal

---

## Mental Model

Robot follows instructions.

Never jumps to the answer.

---

## Spiral Matrix Order

Top

↓

Right

↓

Bottom

↓

Left

↓

Shrink Boundaries

↓

Repeat

---

## Boundary Variables

top

bottom

left

right

---

## Boundary Updates

top++

right--

bottom--

left++

---

## Important Edge Cases

Before Bottom Row

if(top <= bottom)

Before Left Column

if(left <= right)

---

## Complexity

Time

O(rows × cols)

Space

O(1)

---

# Phase 1 Final Revision

## Pattern Order

Traversal

↓

Prefix Sum

↓

Prefix Product

↓

Difference Array

↓

Same Direction Two Pointer

↓

Opposite Direction Two Pointer

↓

Sliding Window

↓

Kadane

↓

Cyclic Sort

↓

Matrix

↓

Simulation

---

## Final Recognition Flow

Need every element?

↓

Traversal

Need cumulative information?

↓

Prefix

Need pair processing?

↓

Two Pointer

Need contiguous region?

↓

Sliding Window

Need maximum sum?

↓

Kadane

Need numbers in fixed range?

↓

Cyclic Sort

Need rows & columns?

↓

Matrix

Need movement rules?

↓

Simulation

---

## Thinking Level

Day 1

2.0 / 5

↓

Day 10.4

4.9 / 5

---

## Phase 1 Status

✅ Completed
