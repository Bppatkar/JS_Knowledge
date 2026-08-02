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