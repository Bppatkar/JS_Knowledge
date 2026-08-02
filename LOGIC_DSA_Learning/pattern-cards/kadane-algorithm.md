# Pattern Card — Kadane Algorithm

## Recognition

Question asks:

- Maximum Sum
- Contiguous Subarray
- Largest Sum
- O(n)

Immediately suspect Kadane.

---

## State

currentSum

bestSum

---

## Current State Meaning

Maximum subarray sum ending at current index.

---

## Best State Meaning

Maximum subarray sum found so far.

---

## Transition

currentSum = max(currentSum + nums[i], nums[i])

bestSum = max(bestSum, currentSum)

---

## Initialization

currentSum = nums[0]

bestSum = nums[0]

Loop starts from index 1.

---

## Time

O(n)

---

## Space

O(1)

---

## Engineering Idea

Negative running sums hurt future answers.

Throw them away.

Positive running sums help future answers.

Keep them.

---

## Common Mistakes

❌ Initialize with 0

❌ Forget all-negative array

❌ Update bestSum before currentSum

❌ Compare with bestSum instead of nums[i]

---

## Interview Sentence

Kadane maintains the best subarray ending at the current index and the best subarray found overall. At each element, it decides whether extending the current subarray or starting a new one gives a larger sum.
---

//! Kadane's Algorithm - Maximum Subarray Sum

// nums = [-2,1,-3,4,-1,2,1,-5,4] , output - 6 , You need to find the contiguous subarray which has the largest sum and return its sum.

 Kadane's Algorithm simply says - if the sum of the subarray becomes negative, then we can discard that subarray and start a new subarray from the next element. This is because a negative sum will only decrease the sum of any future subarray means [our previous sum is hurting us so we restart]. 

 Rule -> Kadane always asks: - Which choice gives me the larger sum?

/*
If currentSum < 0
↓
Restart
Else
↓
Continue adding 
 */


//! heart of Kadane Algorithm is: currentSum = max(currentSum + nums[i],nums[i]); ⭐⭐⭐⭐⭐

//! Interview explanation("Why does Kadane work?"). -
//?   "Kadane Algorithm maintains two states: currentSum and bestSum. At every element, we decide whether extending the current subarray gives a better sum or starting a new subarray from the current element gives a better sum. We choose the larger of these two options. Then we update bestSum if the current subarray is the best seen so far. This greedy decision is optimal because a negative running sum can never improve a future subarray."

function maxSubArray(nums) {
  let maxSum = nums[0], currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(currSum + nums[i], nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([-1, -2, -3, -4]));
console.log(maxSubArray([5]));
