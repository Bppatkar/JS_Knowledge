# Day 7 Progress Report

## Topic

Arrays

## Pattern

Two Pointers (Opposite Direction)

## Status

✅ Completed & Locked

---

# What I Learned

## Recognition

A Two Pointer pattern is suitable when:

- Two positions need to be compared.
- Search space can be reduced after every decision.
- Re-visiting discarded elements is unnecessary.
- Pointer movement eliminates unnecessary comparisons.
- Sorted array is a strong hint (not mandatory for every variation).

---

## Concepts Mastered

- Opposite Direction Two Pointers
- Pointer Initialization
- Pointer Movement Logic
- Search Space Elimination
- Pair Search
- String Comparison using Two Pointers

---

## Engineering Thinking

Instead of remembering:

sum < target → left++

I now derive it:

Need Bigger Sum
↓

Increase Smaller Value
↓

left++

Likewise,

Need Smaller Sum
↓

Decrease Larger Value
↓

right--

---

## Problems Solved

### LeetCode 167

Two Sum II

Pattern:
Opposite Direction Two Pointers

Status:
Solved

---

### LeetCode 125

Valid Palindrome

Pattern:
Opposite Direction Two Pointers

Status:
Solved

---

## Bugs Faced

- Forgot pointer movement.
- Dry run exposed the issue.
- Fixed by moving both pointers after successful comparison.

---

## Interview Growth

Now able to explain

- Why O(n)
- Why sorted property matters
- Why search space reduces
- Why nested loops are unnecessary

---

## Thinking Level

Previous

3.1 / 5

Current

**3.3 / 5**

Reason

Pattern is now being derived instead of memorized.

---

## Next Day

Day 8

Topic

Same Direction Two Pointers

Foundation of Sliding Window
