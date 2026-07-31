# Day 9 Revision

## Module

Sliding Window (Final Revision)

Status

✅ COMPLETED

---

# Complete Sliding Window Family

## 1. Fixed Size Sliding Window

Use When

Window size is already given.

Examples

Maximum Sum of Size K

Average of Size K

Sliding Window Maximum (uses Deque later)

Template

Expand Right

↓

If window size becomes K

Process answer

↓

Remove Left

↓

Move Left

---

## 2. Variable Size Sliding Window (Presence)

Representative Problem

LeetCode 3

Longest Substring Without Repeating Characters

Window State

Character Frequency

Validity

No duplicate exists

Shrink Until

Duplicate disappears

Answer

Maximum Length

---

## 3. Variable Size Sliding Window (Frequency)

Representative Problem

LeetCode 424

Longest Repeating Character Replacement

Window State

Frequency Map

maxFreq

Validity

(windowLength - maxFreq) <= k

Answer

Maximum Length

Key Insight

windowLength - maxFreq

represents

Number of characters that must be replaced.

---

## 4. At Most K Distinct

Representative Problem

LeetCode 340

Longest Substring with At Most K Distinct Characters

Window State

Frequency Map

Distinct Count

Validity

Distinct <= k

Answer

Maximum Length

Key Insight

Delete character from map when frequency becomes zero.

---

## 5. Minimum Window Substring

Representative Problem

LeetCode 76

Window State

Need Map

Window Map

matched

required

Validity

matched == required

Answer

Minimum Length

Key Insight

Never compare two hash maps repeatedly.

Maintain

matched

instead.

Increase matched

When

windowFrequency == needFrequency

Decrease matched

When

windowFrequency < needFrequency

---

## 6. Count Based Sliding Window

Representative Problem

LeetCode 713

Window State

Running Product

Validity

product < k

Answer

count += right - left + 1

Key Insight

If current window is valid

Every suffix ending at Right

is also valid.

---

# Universal Variable Sliding Window Template

Initialize

↓

Expand Right

↓

Update Window State

↓

While Window Invalid

    Shrink Left

    Reverse Update State

↓

Update Answer

↓

Move Right

---

# Three Things That Change

Every Variable Sliding Window problem changes only

1.

Window State

Examples

Frequency

Product

Sum

Distinct Count

Matched Count

---

2.

Window Validity Rule

Examples

No Duplicate

Distinct <= k

Product < k

matched == required

---

3.

Answer Update

Examples

Maximum Length

Minimum Length

Count

Window Itself

Everything else remains the same.

---

# Time Complexity

Fixed Size

O(n)

Variable Size

O(n)

Reason

Every pointer moves only forward once.

Left

0 → n

Right

0 → n

Total

O(2n)

=

O(n)

---

# Space Complexity

Depends on Window State

Frequency Map

O(unique characters)

Running Product

O(1)

---

# Common Interview Questions

Q.

Why is Sliding Window O(n)?

Answer

Both pointers move only forward.

No pointer moves backward.

Every index enters and leaves the window at most once.

---

Q.

Why can't Set solve LC76?

Answer

Set stores only presence.

LC76 requires duplicate frequencies.

Need Map is required.

---

Q.

Why matched instead of comparing maps?

Answer

Comparing two maps every iteration is inefficient.

matched stores the number of satisfied character requirements.

Window becomes valid immediately when

matched == required.

---

Q.

Why does

count += right - left + 1

work?

Answer

Every suffix ending at Right remains valid because removing positive numbers from the left only decreases the product.

---

Q.

Why

if (k <= 1) return 0;

in LC713?

Answer

All numbers are positive.

Minimum possible product is 1.

No product can be smaller than 1 when k <= 1.

---

# Mistakes I Made During Learning

LC76

❌ Tried Set

✔ Switched to Frequency Map

---

LC76

❌ Tried comparing complete HashMaps

✔ Learned matched optimization

---

LC76

❌ Mixed Object and Map syntax

✔ Learned correct usage

---

LC713

❌ Wanted to recalculate product every time

✔ Learned Running Product

---

LC713

❌ Used count++

✔ Learned

count += right - left + 1

---

LC713

❌ Forgot edge case

k <= 1

✔ Added interview edge case

---

# Interview Notes

Always start with

Vocabulary

↓

Constraints Analysis

↓

Expected Time Complexity

↓

Expected Space Complexity

↓

Pattern Recognition

↓

Window State

↓

Validity Rule

↓

Algorithm

↓

Pseudocode

↓

JavaScript

Never memorize code.

Derive the algorithm from the pattern.

---

# Final Sliding Window Cheat Sheet

Fixed Size

↓

Variable Presence

↓

Variable Frequency

↓

At Most K Distinct

↓

Minimum Window

↓

Count Based

Pattern Family

✅ MASTERED

---

# Day 10 Starting Point

Next Module

Monotonic Queue / Deque

Representative Problem

LeetCode 239

Sliding Window Maximum

Status

READYpart 3