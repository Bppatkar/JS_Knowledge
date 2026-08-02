# Day 10 Progress — Kadane Algorithm

## Status

✅ Completed

---

## Topic

Kadane Algorithm (Maximum Subarray)

---

## Concepts Learned

- Maximum Subarray Problem
- Running Sum
- Current State vs Best State
- Restart vs Continue Decision
- Greedy Decision Making
- Dynamic Programming State
- State Compression (DP → O(1) Space)
- Maximum Subarray Ending at Index i
- Engineering Derivation of Kadane

---

## Key Formula

currentSum = max(currentSum + nums[i], nums[i])

bestSum = max(bestSum, currentSum)

---

## Pattern Recognition

Recognize Kadane when:

- Maximum Sum
- Contiguous Subarray
- O(n) expected
- Running sum can be reused
- Restarting may be better than continuing

---

## Time Complexity

O(n)

---

## Space Complexity

O(1)

---

## Thinking Level

Before:
4.5 / 5

After:
4.6 / 5

---

## Today's Achievement

Derived Kadane Algorithm from first principles instead of memorizing.

Successfully wrote:

- Pseudocode
- JavaScript
- Dry Run
- Complexity
- Interview explanation

without assistance.