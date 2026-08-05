# PHASE 1 — Linear Data Structures
### Arrays & Strings | Pattern-Based Mastery Guide

**Author:** Bhanu Pratap
**Language:** JavaScript
**Status:** Phase 1 Complete — 18 Patterns
**Training Duration:** Day 1 → Day 10.4

> "The goal was never to memorize algorithms. The goal was to think like an engineer."

---

## How to Use This Guide

Every pattern follows the same five-step discipline. Don't skip steps.

1. **Understand** the problem
2. **Identify** the pattern
3. **Estimate** the complexity
4. **Dry run** before coding
5. **Then** write the solution

```
Constraints → Pattern → Algorithm → Code
```
Never: Code first.

---

## Table of Contents

1. [Foundations](#1-foundations)
2. [Pattern Map — 18 Patterns](#2-pattern-map)
3. [Traversal Family](#3-traversal-family)
4. [Prefix Family](#4-prefix-family)
5. [Two Pointer Family](#5-two-pointer-family)
6. [Sliding Window Family](#6-sliding-window-family)
7. [Kadane's Algorithm](#7-kadanes-algorithm)
8. [Cyclic Sort](#8-cyclic-sort)
9. [Matrix Traversal & Transform](#9-matrix-traversal--transform)
10. [Simulation](#10-simulation)
11. [Master Recognition Cheat Sheet](#11-master-recognition-cheat-sheet)
12. [Complexity Cheat Sheet](#12-complexity-cheat-sheet)
13. [Mistakes Log](#13-mistakes-log)
14. [Solved Problems Tracker](#14-solved-problems-tracker)
15. [Interview Q&A Bank](#15-interview-qa-bank)
16. [Final Checklist](#16-final-checklist)

---

## 1. Foundations

### Arrays

A linear structure with elements in contiguous memory, accessed by index.

| Operation | Method | Time |
|---|---|---|
| Read | `nums[i]` | O(1) |
| Update | `nums[i] = x` | O(1) |
| Insert at end | `push()` | O(1) avg |
| Delete at end | `pop()` | O(1) |
| Insert at start | `unshift()` | O(n) |
| Delete at start | `shift()` | O(n) |

**Properties:** ordered · indexed · fast random access · fixed positions

### Complexity Ladder

`O(1)` constant → `O(log n)` binary search → `O(n)` traversal → `O(n log n)` sorting → `O(n²)` nested loops → `O(2ⁿ)` backtracking

### The Space Question

Ask: *"Am I creating another array/map/set?"*
- No → usually **O(1)**
- Yes (new array, HashMap, Set, prefix array) → **O(n)**

---

## 2. Pattern Map

```
Need every element once?          → Traversal
Need cumulative sum?              → Prefix Sum
Need cumulative product?          → Prefix Product
Need many range updates?          → Difference Array
Need pair comparison / sorted?    → Two Pointer
Need contiguous subarray/string?  → Sliding Window
Need maximum sum?                 → Kadane
Need numbers in range 1..n?       → Cyclic Sort
Need rows and columns?            → Matrix
Need step-by-step movement rules? → Simulation
```

**18 patterns, grouped into 8 families:**

| Family | Patterns |
|---|---|
| Traversal | Traversal, Running State, Count, Max, Min, Index Tracking |
| Prefix | Prefix Sum, Prefix Product, Difference Array |
| Two Pointer | Same Direction, Opposite Direction |
| Sliding Window | Fixed, Variable, Presence, Frequency, Distinct, Count, Minimum Window |
| — | Kadane |
| — | Cyclic Sort |
| — | Matrix Traversal |
| — | Simulation |

---

## 3. Traversal Family

**Definition:** Visit every element exactly once and maintain running state as you go (count, max, min, index, or a running accumulator).

**Mental model:** Walking through every house on a street, keeping a tally as you go.

```js
for (let i = 0; i < nums.length; i++) {
  // process nums[i], update running state
}
```

| Metric | Value |
|---|---|
| Time | O(n) |
| Space | O(1) |

**Recognition keywords:** visit · count · maximum · minimum · sum · search · linear scan

**Sub-patterns:**
- **Running State** — carry a value forward across iterations (running sum, running max)
- **Index Tracking** — remember *where* something happened, not just *what*

**Common mistakes**
- ❌ Starting at the wrong index
- ❌ Using `<=` instead of `<`
- ❌ Forgetting edge cases (empty array, single element)

**Q&A:** *Why is traversal O(n)?* — Every element is visited exactly once, no repeated work.

---

## 4. Prefix Family

### 4.1 Prefix Sum

**Definition:** Running sum from the start of the array.

```
prefix[i] = prefix[i-1] + nums[i]
```

**Mental model:** Bank balance — every transaction adds to the previous balance.

**Range query formula:**
```
rangeSum(left, right) = prefix[right] - prefix[left-1]
```

| Build | Query | Space |
|---|---|---|
| O(n) | O(1) | O(n) |

**Recognition:** range sum · multiple queries · continuous sum

**Common mistakes:** wrong left boundary · forgetting the `left == 0` edge case

**Q&A:** *Why not just compute every query separately?* — That's O(n·q); prefix sums make each query O(1) after an O(n) build.

### 4.2 Prefix Product

**Definition:** Running multiplication instead of running sum.

```
product[i] = product[i-1] * nums[i]
```

**Mental model:** Domino effect — each multiplication carries the previous result forward.

**Key insight:** Division can't always substitute for this (zeros, multiple zeros break it). That's why "product of array except self" needs **prefix product + suffix product**, not division.

| Build | Space |
|---|---|
| O(n) | O(n) |

### 4.3 Difference Array

**Definition:** Instead of updating every element in a range, mark only where a change *starts* and *ends*, then prefix-sum the marks at the end.

**Mental model:** An electric switch — flip ON at the start, flip OFF right after the end.

```
Update range [2..5] by +3
→ diff[2] += 3
→ diff[6] -= 3
Final array = prefix sum of diff array
```

| Range update | Final build | Without this trick |
|---|---|---|
| O(1) | O(n) | O(n·q) |

**Recognition:** many range updates · flight bookings · batch updates

**Common mistakes:** forgetting `end + 1` · boundary overflow

**Q&A:** *Why is this faster?* — Every update becomes O(1) instead of touching every element in the range.

---

## 5. Two Pointer Family

**Definition:** Use two indices instead of one to cut O(n²) brute force down to O(n).

**Recognition:** pair problems · sorted arrays · reverse · partition · window boundaries

### 5.1 Same Direction

Both pointers move left → right; the left pointer only advances when a condition is met (fast/slow, expanding window, remove duplicates).

```js
let left = 0;
for (let right = 0; right < n; right++) {
  // process right
  // move left only when needed
}
```
**Mental model:** Teacher and student walking together, teacher pausing when needed.

**Used for:** remove duplicates · merge logic · fast/slow pointer · expanding window

### 5.2 Opposite Direction

Pointers start at both ends and move inward.

```js
while (left < right) {
  // compare / swap
  left++;
  right--;
}
```
**Mental model:** Two people shaking hands from opposite ends of a line.

**Used for:** reverse array/string · palindrome check · pair sum on sorted array

**Note:** Rotate Image (matrix) reuses this exact reversal logic per row.

| Both variants | Time | Space |
|---|---|---|
| — | O(n) | O(1) |

---

## 6. Sliding Window Family

**Definition:** Maintain a contiguous region `[left, right]` by expanding and shrinking instead of recomputing every subarray from scratch.

**Mental model:** A camera frame sliding over the array.

**Recognition:** subarray · substring · contiguous · longest · shortest · count · max/min in a window

**Core truth:** Sliding window is not about moving pointers — it's **state maintenance**. Track frequency, count, product, or max without ever rescanning the window.

### 6.1 Fixed Size Window

Window size is constant — add the new element, remove the old one.

```
Add new → check condition → remove old → slide
```
**Recognition:** "size = k" · maximum sum subarray of size k · average of k

### 6.2 Variable Size Window

Window size changes based on a **validity condition**.

```
Expand → Check Validity → If Invalid: Shrink → Repeat
```
**Mental model:** A rubber band — stretches and shrinks.

Every problem defines validity differently:

| Problem | Validity Rule |
|---|---|
| Longest substring w/o repeats | every character frequency ≤ 1 |
| Longest repeating char replacement | `windowLength - maxFreq ≤ k` |
| Subarray product less than k | running product `< k` |
| Minimum window substring | window frequency ≥ target frequency |

**Big lesson:** same algorithm skeleton, different validity condition each time.

### 6.3 Presence / Frequency / Distinct

- **Presence** — does the window contain (or not contain) a specific element?
- **Frequency** — maintained via HashMap/object; expand with `map[right]++`, shrink with `map[left]--`. Never rescan.
- **Distinct** — track unique elements only; shrink whenever a duplicate appears.

### 6.4 Count Window

Count *all* valid windows, not just find one.

```
count += right - left + 1
```
**Why it works:** if `[left..right]` is valid, then `[left+1..right]`, `[left+2..right]`, ..., `[right..right]` are all valid too — but only when validity is monotonic (e.g., positive numbers).

### 6.5 Minimum Window

Goal: the *smallest* valid window, not the largest.

| Maximum Window | Minimum Window |
|---|---|
| Expand, shrink only if invalid | Expand until valid, then shrink immediately and keep the best |

**Mental model:** Tighten the rope until it just barely breaks.

**Common mistakes across the family**
- ❌ Rescanning every window from scratch
- ❌ Shrinking too early or too late
- ❌ Updating the answer before validating
- ❌ Forgetting `k ≤ 1` edge case (product-window problems)
- ❌ Decreasing `maxFreq` incorrectly — a *stale* maxFreq is fine, it only delays shrinking, never breaks correctness

**Q&A:** *Why is sliding window O(n)?* — Each pointer only moves forward; every index is visited at most twice.

---

## 7. Kadane's Algorithm

**Definition:** Find the maximum-sum contiguous subarray.

**Mental model:** Carry the profit, drop the loss.

```
currentSum = max(nums[i], currentSum + nums[i])
bestSum    = max(bestSum, currentSum)
```

At every index, decide: **continue** the existing run, or **restart** from here.

| Time | Space |
|---|---|
| O(n) | O(1) |

**Recognition:** maximum sum · contiguous subarray · O(n) required

**Common mistakes:** initializing `currentSum = 0` instead of `nums[0]` · mishandling all-negative arrays

**Q&A:** *Why compare `nums[i]` vs `currentSum + nums[i]`?* — That comparison **is** the continue-or-restart decision.

---

## 8. Cyclic Sort

**Definition:** Place every number at its "correct" index in-place, for arrays containing numbers in a known range (`1..n` or `0..n`).

**Mental model:** Students finding their assigned seats — each one moves to their own seat, no exceptions.

```
Correct index for value v (range 1..n): v - 1
Correct index for value v (range 0..n): v

while (current number is not at its correct position):
    swap it into place
```

| Time | Space |
|---|---|
| O(n) | O(1) |

**Recognition:** missing number · duplicate number · first missing positive · numbers in a known range

**Key rule:** only swap when the current number actually belongs within the valid range — otherwise you'll infinite-loop.

**Common mistakes:** invalid index access · infinite swapping · duplicate/no-op swaps

---

## 9. Matrix Traversal & Transform

**Definition:** A 2D array, accessed as `matrix[row][col]`. Think of it as a spreadsheet — rows run horizontal, columns run vertical.

**Base traversal complexity:** O(rows × cols)

### 9.1 Traversal Orders

- **Row-wise:** outer loop rows, inner loop cols
- **Column-wise:** outer loop cols, inner loop rows
- **Boundary:** top → right → bottom → left

### 9.2 Diagonals

| Diagonal | Condition |
|---|---|
| Main | `row == col` |
| Secondary | `row + col == n - 1` |

Full diagonal traversal starts from every cell along the top row plus the last column.

### 9.3 Transpose

Mirror the matrix across its main diagonal: `matrix[row][col] ↔ matrix[col][row]`.

To do it **in-place**, only swap the upper triangle (`col = row + 1` onward) — swapping the full matrix would undo itself.

| Time | Space |
|---|---|
| O(n²) | O(1) |

### 9.4 Rotate Image

**Pattern:** Transpose + Reverse Every Row (clockwise), or Transpose + Reverse Every Column (counter-clockwise).

```
Transpose → Reverse Rows (uses opposite-direction two pointers per row)
```

| Time | Space |
|---|---|
| O(n²) | O(1) |

**Common mistakes:** double-transposing · wrong transpose loop bound · reversing columns instead of rows for clockwise rotation

### 9.5 Spiral Matrix

**Pattern:** Simulation — walk the boundary layer by layer, shrinking inward after each side.

```
Order: Top Row → Right Column → Bottom Row → Left Column
After each side: top++, right--, bottom--, left++
Loop while: top <= bottom && left <= right
```

Guard the last two sides with `if (top <= bottom)` and `if (left <= right)` to avoid re-traversing a row/column that's already been consumed.

| Time | Space |
|---|---|
| O(rows × cols) | O(1) |

**Common mistakes:** missing `left++` · missing the boundary guards on the last two sides

---

## 10. Simulation

**Definition:** Follow the problem's stated rules step by step instead of trying to derive a closed-form shortcut.

**Mental model:** Robot movement, game character logic, car navigation.

**Recognition:** spiral matrix · snake simulation · robot problems · grid movement

**Engineering rule:** Simulate — don't guess.

---

## 11. Master Recognition Cheat Sheet

| Pattern | Trigger Keywords |
|---|---|
| Traversal | visit, count, maximum, minimum, linear scan |
| Prefix Sum | range sum, multiple queries, running sum |
| Difference Array | range update, flights, bookings, batch updates |
| Two Pointer | pair, reverse, sorted, palindrome |
| Sliding Window | subarray, substring, longest, shortest, contiguous |
| Kadane | maximum sum, contiguous |
| Cyclic Sort | missing, duplicate, range 1..n or 0..n |
| Matrix | rows, columns, grid, image |
| Simulation | movement rules, step-by-step, boundaries |

---

## 12. Complexity Cheat Sheet

| Pattern | Time | Space |
|---|---|---|
| Traversal | O(n) | O(1) |
| Prefix Build | O(n) | O(n) |
| Prefix Query | O(1) | — |
| Difference Update | O(1) | — |
| Difference Build | O(n) | O(n) |
| Two Pointer | O(n) | O(1) |
| Sliding Window | O(n) | O(1) or O(k) |
| Kadane | O(n) | O(1) |
| Cyclic Sort | O(n) | O(1) |
| Matrix Traversal | O(rows × cols) | O(1) |
| Transpose / Rotate | O(n²) | O(1) |
| Spiral | O(rows × cols) | O(1) |

---

## 13. Mistakes Log

| Area | Mistake |
|---|---|
| Traversal | `<=` instead of `<` |
| Prefix | wrong left boundary |
| Difference | missing `end + 1` |
| Two Pointer | wrong pointer movement direction |
| Sliding Window | wrong validity rule, updating answer before validating |
| Replacement window | decreasing `maxFreq` incorrectly |
| Product window | missing `k ≤ 1` guard |
| Kadane | ignoring the all-negative-array case |
| Cyclic Sort | infinite swapping |
| Transpose | double swapping |
| Rotate | wrong transpose loop bound |
| Spiral | missing `left++` / missing boundary checks |
| General | choosing a pattern before reading constraints |

---

## 14. Solved Problems Tracker

| Family | Problems |
|---|---|
| Traversal | LC1920, LC1929, LC485, LC1672 ✅ |
| Prefix Sum | LC303, LC724 ✅ |
| Prefix Product | LC238 ✅ |
| Difference Array | LC370, LC1109 ✅ |
| Two Pointer | LC125, LC167 ✅ |
| Sliding Window | LC3, LC424, LC713 ✅ · LC76 (theory) |
| Kadane | LC53 ✅ |
| Cyclic Sort | LC268, LC448, LC41 ✅ · LC287 (theory) |
| Matrix | LC48, LC54 ✅ |

---

## 15. Interview Q&A Bank

**Traversal**
Q: Why is traversal O(n)? — A: Every element is visited exactly once.

**Prefix Sum**
Q: Why is a range query O(1)? — A: The heavy lifting (the running sum) is precomputed once in O(n); each query is then just a subtraction.

**Difference Array**
Q: Why mark `end + 1`? — A: To cancel the effect of the range update exactly one index past where it should stop, so the prefix sum reflects the correct boundary.

**Two Pointer**
Q: Why is this better than nested loops? — A: It replaces O(n²) pairwise comparison with a single O(n) pass by exploiting order (sorted-ness or direction).

**Sliding Window**
Q: Why is it O(n)? — A: Each pointer only ever moves forward; every index is touched at most twice.

**Kadane**
Q: Why "restart"? — A: A negative running sum can only hurt future subarrays, so it's better to start fresh at the current index.

**Cyclic Sort**
Q: Why swap instead of sort? — A: Because the target position of each value is already known from its value, sorting is unnecessary — you can place everything correctly in one O(n) pass.

**Matrix**
Q: Why transpose before rotating? — A: Transposing converts columns into rows, which are cheap to reverse in place.

**Spiral**
Q: Why the boundary guard on the last two sides? — A: To avoid retraversing a row or column that the first two sides already consumed.

**General**
Q: Traversal vs. Simulation — what's the difference? — A: Traversal visits existing data; simulation follows a set of movement/state-change rules step by step.

---

## 16. Final Checklist

- [x] Can identify the correct pattern from a problem statement
- [x] Can estimate time and space complexity before coding
- [x] Can dry-run a solution on paper before submitting
- [x] Can explain *why* a pattern works, not just apply it
- [x] Can optimize only after correctness is confirmed
- [x] Can solve without relying on memorized code

---

## Engineering Principles

```
Always:  Understand → Pattern → Algorithm → Code
Never:   Memorize code
Always:  Read constraints before selecting a pattern
Always:  Maintain state — don't recalculate
Always:  Optimize only after correctness
Always:  Dry run before submission
```

---

## What's Next — Phase 2

Phase 1 covered **linear traversal-based reasoning** over arrays (and sets up the same thinking for strings, which share almost every pattern here — sliding window and two pointer especially). Phase 2 should build on this foundation with structures that require non-linear or auxiliary-state thinking: **HashMaps/Sets as a first-class pattern, Stacks & Queues (monotonic stack, next-greater-element), Linked Lists, and Binary Search on answer spaces.**

**Progression:** Problem Solver → Software Engineer → SDE-2 → Senior Engineer → Architect