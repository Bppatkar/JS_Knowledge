# Arrays Revision

## Locked Patterns

✅ Traversal

✅ State Update

✅ Build New Array

✅ Comparison

✅ Early Exit

✅ Linear Search

✅ Count Pattern

✅ Running Count Pattern

✅ Current State vs Best State

## Revision Questions

1. When should Traversal Pattern be used?

2. Difference between Count Pattern and Running Count Pattern?

3. Explain Current State vs Best State.

4. Why is Early Exit useful?

5. Difference between Read Index and Write Index?

---

## Maximum / Minimum Revision

### Questions

1. Difference between Maximum and Minimum Pattern?

2. Difference between Best Value and Best Index?

3. Why initialize with arr[0]?

4. Difference between > and >= ?

5. Difference between < and <= ?

6. When should First Occurrence be returned?

7. When should Last Occurrence be returned?

8. Explain LC 1672 pattern mixing.

---

Current Progress

✅ 10 Pattern Families Locked

# Day 5 Revision

## Prefix Construction

Prefix[0]=0

Prefix[i]=Prefix[i-1]+nums[i-1]

---

## Range Query

Prefix[R+1]-Prefix[L]

---

## Left Sum

Prefix[i]

---

## Right Sum

Prefix[n]-Prefix[i+1]

---

## Recognition

Repeated Sum

↓

Prefix Sum

---

## Remember

Compute Once

Store

Reuse

---

## Interview Lines

Prefix Sum is a precomputation technique used to answer multiple range sum queries efficiently.

Dummy Zero removes boundary conditions.

---

## Always identify ranges before writing loops.

# Day 6 Revision

## One Line Summary

Difference Array stores changes.

Prefix Sum reconstructs final values.

---

## Recognition Formula

Many Range Updates

↓

Difference Array

↓

One Prefix Sum

↓

Final Updated Array

---

## Golden Rules

Rule 1

diff[L] += value

Rule 2

if (R + 1 < n)

diff[R + 1] -= value

Rule 3

Run Prefix Sum once.

---

## Interview Formula

Prefix Sum

↓

Fast Queries

Difference Array

↓

Fast Updates

---

## Complexity

Brute Force

O(Q × N)

Optimal

O(Q + N)

---

## Common Bugs

- Wrong stopping index.
- Boundary mistakes.
- Resetting Difference Array.

---

## Self Test

1. Why R + 1?

2. Why only one Prefix Sum?

3. Difference Array vs Prefix Sum?

4. When should Difference Array not be used?

5. Engineering applications?

---

## Pattern Status

✅ Locked
