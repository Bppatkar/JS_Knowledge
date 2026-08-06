# Phase1_Array.md — Part 2
### Two Pointer Family + Sliding Window Family

*(Continues directly from Part 1 — Foundations, Traversal Family, Prefix Family.
Concatenate after Part 1. No front matter repeated here.)*

---

# D. Two Pointer Family

## D.1 Same Direction Two Pointer

### 1. Definition
Same Direction Two Pointer uses two indices, both moving from left to right, where the
"slow" pointer only advances when a specific condition is met, while the "fast" pointer
advances unconditionally on every iteration. The gap between them encodes useful state —
often "how many valid elements have been written so far."

### 2. Why This Pattern Exists
- **Brute force:** operations like "remove duplicates in place" or "move all zeros to
  the end" are naturally solved with a nested loop — for each element, scan the rest of
  the array to decide what to do with it — costing O(n²).
- **What it wastes:** repeatedly re-scanning portions of the array that a single forward
  pass could already account for.
- **Why waste is avoidable:** if the fast pointer has already seen everything up to its
  current position, the slow pointer only needs to know "how many elements have
  qualified so far" — a single number — rather than re-deriving that from scratch.
- **This pattern:** advance a fast pointer through the whole array once, and let a slow
  pointer trail behind, only stepping forward (and writing) when the fast pointer finds
  something that belongs at the slow pointer's position.

### 3. Engineering Intuition (Mental Model)
Picture a teacher and a student walking down a hallway together. The teacher (fast
pointer) checks every door. The student (slow pointer) only moves forward and steps
through a door when the teacher says "this one counts." Both always move forward, never
backward, but the student's position always represents "how many valid rooms we've
confirmed so far," while the teacher's position represents "how far we've inspected."

### 4. Why It Works (Proof / Reasoning)
The slow pointer maintains the invariant: *everything at index `< slow` is already
correct/finalized output*. Because the fast pointer inspects every element exactly once,
and the slow pointer only advances (and writes) when the current fast element satisfies
the condition, every valid element is eventually written into the compacted region
`[0, slow)`, and nothing invalid is ever included, since the slow pointer simply doesn't
move for elements that fail the condition. The invariant holds at the start (both
pointers at 0, zero elements confirmed) and is preserved at every step, so it holds at
the end.

### 5. Visualization
Removing duplicates from sorted `[1, 1, 2, 2, 3]`:

```
fast:  0  1  2  3  4
value: 1  1  2  2  3

slow=0: nums[0]=1, keep → slow becomes 1
fast=1: nums[1]=1 == nums[slow-1]=1 → skip, slow stays 1
fast=2: nums[2]=2 != nums[slow-1]=1 → write nums[slow]=2, slow becomes 2
fast=3: nums[3]=2 == nums[slow-1]=2 → skip
fast=4: nums[4]=3 != nums[slow-1]=2 → write nums[slow]=3, slow becomes 3

Result region [0, slow): [1, 2, 3]
```

### 6. Recognition Signal
The problem statement mentions: *remove duplicates*, *remove element*, *move zeros*, *in
place*, *compact the array*, "fast/slow pointer," or any variant of merging/filtering
where the array is processed once left to right and a subset must be written back into
the same array.

### 7. Algorithm (Step-by-Step)
1. Initialize `slow = 0`.
2. For `fast` from `0` to `n - 1`:
   a. Evaluate the condition using `nums[fast]` (and possibly the last written value).
   b. If it holds: write the needed value at `nums[slow]`, then increment `slow`.
   c. If not: do nothing, let `fast` continue.
3. After the loop, `slow` is the count of valid elements, and `nums[0..slow-1]` holds
   the compacted result.

### 8. Pseudocode
```
function sameDirectionTwoPointer(nums):
    slow = 0
    for fast from 0 to length(nums) - 1:
        if condition(nums, fast, slow):
            nums[slow] = nums[fast]
            slow = slow + 1
    return slow
```

### 9. JavaScript Implementation
```js
// Example: remove duplicates from a sorted array, in place
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0; // slow marks the boundary of the "confirmed unique" region
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;                  // a new unique value — advance the boundary
      nums[slow] = nums[fast]; // and write it into place
    }
  }
  return slow + 1; // number of unique elements
}
```

### 10. Dry Run
Input: `[1, 1, 2, 2, 3]`

| fast | nums[fast] | nums[slow] | condition | action | slow after |
|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 !== 1? no | skip | 0 |
| 2 | 2 | 1 | 2 !== 1? yes | slow=1, nums[1]=2 | 1 |
| 3 | 2 | 2 | 2 !== 2? no | skip | 1 |
| 4 | 3 | 2 | 3 !== 2? yes | slow=2, nums[2]=3 | 2 |

Final: array becomes `[1, 2, 3, 2, 3]` (only first 3 slots matter), return `3`.

### 11. Complexity Analysis
- **Time: O(n)** — the fast pointer visits every element exactly once; the slow pointer
  moves at most `n` times total across the whole run (it never revisits a position), so
  total work is linear, not quadratic.
- **Space: O(1)** — the compaction happens in place; only the two pointer variables are
  extra.

### 12. Common Mistakes
- ❌ Advancing `slow` on every iteration regardless of the condition, which defeats the
  entire purpose (it becomes indistinguishable from `fast`).
- ❌ Writing `nums[fast]` into `nums[slow]` **before** checking the condition, corrupting
  values that haven't been evaluated yet.
- ❌ Off-by-one when returning the final count — returning `slow` instead of `slow + 1`
  (or vice versa), depending on whether `slow` was pre- or post-incremented.

### 13. Edge Cases
- Empty array — return `0` immediately, before touching `nums[0]`.
- Array with all identical elements — `slow` should never advance past `0`.
- Array with no duplicates at all — `slow` should advance on every iteration, ending at
  `n - 1`.

### 14. Interview Explanation
"Same Direction Two Pointer uses a fast pointer that scans every element once, and a
slow pointer that only advances when the fast pointer finds something that belongs in
the compacted result. The slow pointer's position always represents how many valid
elements have been confirmed so far. Because the fast pointer never revisits an element
and the slow pointer never moves backward, the whole process is O(n) time and O(1)
space, in place."

### 15. Related Problems & Revision Box
- **LC26** — Remove Duplicates from Sorted Array
- **LC27** — Remove Element
- **LC283** — Move Zeroes

> **Revision Box**
> Formula/invariant: *slow only advances (and writes) when fast's element qualifies.*
> Mental model in one phrase: *teacher checks every door, student only steps through the good ones.*
> Complexity: *O(n) time, O(1) space.*

---

## D.2 Opposite Direction Two Pointer

### 1. Definition
Opposite Direction Two Pointer places one pointer at the start of the array and one at
the end, then moves them toward each other, comparing or swapping the elements they
point to at each step, until they meet or cross.

### 2. Why This Pattern Exists
- **Brute force:** reversing an array, or checking a palindrome, by comparing every pair
  of positions against every other position would be O(n²) — wildly more than necessary.
- **What it wastes:** most pairs of positions are irrelevant; only *symmetric* pairs
  (position `i` and position `n-1-i`) matter for reversal or palindrome checks, and for
  sorted-array pair-sum problems only the two extreme ends need adjusting at each step.
- **Why waste is avoidable:** by starting at both ends and closing inward, each pair is
  visited exactly once, and the search space shrinks by one from each side every step.
- **This pattern:** two indices converge from opposite ends, doing O(1) work per step,
  covering the whole array in a single pass toward the middle.

### 3. Engineering Intuition (Mental Model)
Picture two people standing at opposite ends of a long table, walking toward each other
to shake hands somewhere in the middle. At each step, they either swap what's in front of
them (reversal) or compare their two positions and decide which one should step inward
(sorted pair-sum). They stop the moment they meet or pass each other — there is no
reason to keep going once every pair has been considered exactly once.

### 4. Why It Works (Proof / Reasoning)
For reversal/palindrome-style problems: swapping `nums[left]` and `nums[right]`, then
moving both pointers inward, guarantees that every symmetric pair `(i, n-1-i)` is
swapped/compared exactly once, since `left` and `right` sweep toward each other and never
revisit a pair. For sorted pair-sum problems: because the array is sorted, if
`nums[left] + nums[right]` is too large, the *only* way to decrease the sum is to
decrease `nums[right]` (moving `right` left) — increasing `nums[left]` could only make it
larger or equal. Symmetric logic holds if the sum is too small. This means no valid pair
is ever skipped by moving a pointer inward — the direction to move is always
unambiguous given the sorted order.

### 5. Visualization
Reversing `[1, 2, 3, 4, 5]`:

```
left=0, right=4:  [1,2,3,4,5] → swap → [5,2,3,4,1]
left=1, right=3:  [5,2,3,4,1] → swap → [5,4,3,2,1]
left=2, right=2:  loop ends (left >= right)
Result: [5,4,3,2,1]
```

### 6. Recognition Signal
The problem statement mentions: *reverse*, *palindrome*, *pair sum on a sorted array*,
or any scenario naturally described as "start from both ends and move inward."

### 7. Algorithm (Step-by-Step)
1. Initialize `left = 0`, `right = n - 1`.
2. While `left < right`:
   a. Do the required work at `left` and `right` (swap, or compare-and-decide).
   b. Move `left` forward and/or `right` backward, depending on the outcome.
3. Stop when `left >= right` — every pair has been considered.

### 8. Pseudocode
```
function oppositeDirectionTwoPointer(nums):
    left = 0
    right = length(nums) - 1
    while left < right:
        swap(nums[left], nums[right])
        left = left + 1
        right = right - 1
```

### 9. JavaScript Implementation
```js
// Example: reverse an array in place
function reverseArray(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]]; // swap
    left++;
    right--; // both pointers close inward every iteration
  }
  return nums;
}

// Example: pair sum on a sorted array (does a pair sum to target?)
function pairSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;   // sum too small, only increasing left can help
    else right--;               // sum too large, only decreasing right can help
  }
  return [-1, -1]; // no pair found
}
```

### 10. Dry Run
`pairSumSorted([1, 3, 5, 7, 9], 12)`

| left | right | nums[left] | nums[right] | sum | action |
|---|---|---|---|---|---|
| 0 | 4 | 1 | 9 | 10 | 10 < 12 → left++ |
| 1 | 4 | 3 | 9 | 12 | match! return [1, 4] |

Final answer: `[1, 4]`

### 11. Complexity Analysis
- **Time: O(n)** — `left` and `right` together traverse the array once; the gap between
  them shrinks by at least one every iteration, so the loop runs at most `n/2` times.
- **Space: O(1)** — only the two pointer variables (and, for reversal, no extra array —
  the swap happens in place).

### 12. Common Mistakes
- ❌ Using `left <= right` instead of `left < right` — this causes a self-swap at the
  middle element (harmless for reversal, but can cause incorrect double-processing in
  pair-sum-style logic).
- ❌ Moving *both* pointers on every iteration in a pair-sum search regardless of the
  comparison outcome — this skips valid pairs.
- ❌ Forgetting that this technique **requires sorted order** for pair-sum-style logic;
  applying it to an unsorted array silently gives wrong answers.

### 13. Edge Cases
- Empty array or single-element array — loop condition `left < right` is false
  immediately; no work is done, which is correct.
- All elements identical (pair sum case) — still terminates correctly since the sum
  comparison logic doesn't depend on distinctness.
- Odd-length array (reversal case) — the middle element is untouched, which is correct
  since it doesn't need to move.

### 14. Interview Explanation
"Opposite Direction Two Pointer starts one index at each end of the array and moves them
toward each other. For reversal, I swap the two ends and step inward every time. For a
sorted pair-sum search, I compare the sum at the two ends against the target — since the
array is sorted, if the sum is too big only shrinking from the right can help, and if
it's too small only growing from the left can help, so the direction to move is always
unambiguous. Either way, the gap between the pointers shrinks by at least one every
step, so it's O(n) time and O(1) space."

### 15. Related Problems & Revision Box
- **LC125** — Valid Palindrome
- **LC167** — Two Sum II - Input Array Is Sorted
- **LC344** — Reverse String

> **Important cross-reference:** Rotate Image (LC48, Matrix family, Part 3) reuses this
> exact reversal logic to reverse each row after transposing.

> **Revision Box**
> Formula/invariant: *left and right close inward; direction to move is forced by sorted order.*
> Mental model in one phrase: *two people shaking hands from opposite ends of a table.*
> Complexity: *O(n) time, O(1) space.*

---

# E. Sliding Window Family

## E.1 Sliding Window — Core Concept

### 1. Definition
Sliding Window is a technique for processing every contiguous subarray or substring of
an array/string without recomputing each one from scratch, by maintaining a window
`[left, right]` that expands and shrinks, carrying forward whatever state (sum, count,
frequency map) describes the current window's contents.

### 2. Why This Pattern Exists
- **Brute force:** checking every contiguous subarray by generating each one and
  recomputing its sum/count/validity independently costs O(n²) (or O(n³) if the
  recomputation itself is O(n)).
- **What it wastes:** adjacent subarrays overlap almost entirely — shifting the window
  by one position only adds one new element and removes one old element, yet brute force
  redoes the whole computation anyway.
- **Why waste is avoidable:** if you already know the state of the window
  `[left, right]`, the state of `[left, right+1]` or `[left+1, right]` can be derived by
  a single O(1) update (add or remove one element's contribution), not a full
  recomputation.
- **This pattern:** maintain the window's state incrementally, so each expansion or
  shrink step costs O(1), and the whole scan across the array costs O(n) instead of
  O(n²).

### 3. Engineering Intuition (Mental Model)
Picture a camera frame sliding across a strip of film. As it moves right, one new frame
enters view on the right edge, and (when the window shrinks) one frame leaves view on the
left edge. You never re-develop the whole strip from scratch — you just track what's
currently visible by adding what enters and removing what leaves.

### 4. Why It Works (Proof / Reasoning)
The correctness of sliding window rests on maintaining the invariant: *the window's
tracked state (sum, frequency map, count, etc.) always exactly reflects the elements
currently between `left` and `right`, inclusive*. Because every expansion adds exactly
one element's contribution and every shrink removes exactly one element's contribution,
this invariant is preserved at every step by construction — there is no scenario where
the tracked state silently drifts from the window's true contents, provided every add
and every remove is paired correctly.

### 5. Visualization
Window of size 3 sliding across `[2, 5, 9, 1, 4]`:

```
[2 5 9] 1  4    sum = 16
 2 [5 9 1] 4    sum = 15   (added 1, removed 2)
 2  5 [9 1 4]   sum = 14   (added 4, removed 5)
```

### 6. Recognition Signal
The problem statement mentions: *subarray*, *substring*, *contiguous*, *longest*,
*shortest*, *maximum/minimum within a window*, or "count of windows," where the region
of interest must always be a **contiguous** run of elements.

### 7. Algorithm (Step-by-Step)
1. Initialize `left = 0` and whatever state variables the window needs (sum, map, count).
2. For `right` from `0` to `n - 1`: add `nums[right]`'s contribution to the state.
3. While the window is invalid (per the problem's specific rule): remove
   `nums[left]`'s contribution from the state, then increment `left`.
4. Use the now-valid window to update the answer.
5. Repeat until `right` reaches the end of the array.

### 8. Pseudocode
```
function slidingWindow(nums):
    left = 0
    state = initial_state()
    answer = initial_answer()
    for right from 0 to length(nums) - 1:
        add(state, nums[right])
        while not isValid(state):
            remove(state, nums[left])
            left = left + 1
        answer = update(answer, state, left, right)
    return answer
```

### 9. JavaScript Implementation
```js
// Generic skeleton — the "isValid" check is what differs between every variant below.
function slidingWindowSkeleton(nums, isValid, addToState, removeFromState) {
  let left = 0;
  const state = {};
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    addToState(state, nums[right]); // expand: bring nums[right] into the window

    while (!isValid(state)) {
      removeFromState(state, nums[left]); // shrink: push nums[left] out of the window
      left++;
    }

    best = Math.max(best, right - left + 1); // window is valid here — update the answer
  }
  return best;
}
```

### 10. Dry Run
This is the shared skeleton; a concrete dry run is shown per variant below, since the
`isValid` rule (and therefore the exact behavior) differs per problem.

### 11. Complexity Analysis
- **Time: O(n)** — `right` advances at most `n` times, and `left` also advances at most
  `n` times total across the *entire* run (never more than `right`, and never
  backward), so combined pointer movement is O(n), not O(n²).
- **Space: O(1)** if the state is a fixed number of scalars (e.g., a running sum), or
  **O(k)** if the state is a frequency map over an alphabet/value-set of size `k`.

### 12. Common Mistakes
- ❌ Rescanning the entire window from scratch on every step instead of maintaining
  state incrementally — this silently regresses back to O(n²).
- ❌ Shrinking the window too early (before checking validity) or too late (after
  already using an invalid window to update the answer).
- ❌ Forgetting that "sliding window" is really "state maintenance" — treating `left`
  and `right` as the whole story while forgetting to keep the associated state (sum,
  map) correctly synced with them.

### 13. Edge Cases
- Empty array — the loop never executes; the answer should default sensibly (e.g., `0`).
- Window that's never valid — `left` may end up equal to `right + 1`; ensure this
  doesn't produce a negative window size in the answer calculation.
- Entire array is one valid window — `left` should never need to move past `0`.

### 14. Interview Explanation
"Sliding Window maintains a contiguous region `[left, right]` and updates its state
incrementally instead of recomputing it — when I expand, I add one element's
contribution; when I shrink, I remove one element's contribution. Because both pointers
only ever move forward and each moves at most n times total, it's O(n) time overall,
even though it looks like a nested loop. The key mental shift is that sliding window is
about maintaining state, not about the pointers themselves."

### 15. Related Problems & Revision Box
See the specific variants below (Fixed, Variable, Frequency, Distinct, Count, Minimum
Window) for concrete problems, since "core concept" alone is rarely asked as a standalone
LeetCode problem — it's the shared skeleton every variant specializes.

> **Revision Box**
> Formula/invariant: *expand adds one element's contribution; shrink removes one; state always reflects `[left, right]` exactly.*
> Mental model in one phrase: *a camera frame sliding over a strip of film.*
> Complexity: *O(n) time; O(1) or O(k) space depending on the state's shape.*

---

## E.2 Fixed Size Window

### 1. Definition
Fixed Size Window is the sliding window variant where the window's size `k` is
predetermined and never changes — every time the window grows past `k`, exactly one
element must be removed from the left to keep the size constant.

### 2. Why This Pattern Exists
- **Brute force:** computing the sum (or other aggregate) of every window of size `k`
  independently costs O(k) per window and O(n) windows, giving O(n·k).
- **What it wastes:** consecutive windows of the same size differ by exactly one element
  entering and one leaving — recomputing the whole sum ignores this near-total overlap.
- **Why waste is avoidable:** maintaining a running sum and updating it by "add the new
  right element, subtract the element that just fell out of the left" turns each shift
  into O(1).
- **This pattern:** slide a window of constant width `k` across the array, updating its
  aggregate in O(1) per shift instead of O(k).

### 3. Engineering Intuition (Mental Model)
Imagine a ruler exactly `k` units wide laid on top of a number line, sliding one unit at
a time. At each slide, you don't re-measure everything under the ruler — you just note
that one unit of length was uncovered on the left and one new unit was covered on the
right, and update your running total by exactly that difference.

### 4. Why It Works (Proof / Reasoning)
Let `sum(i)` denote the sum of the window starting at index `i`, of fixed width `k`.
Then `sum(i+1) = sum(i) - nums[i] + nums[i+k]` — the window loses its leftmost element
(`nums[i]`) and gains one new element on the right (`nums[i+k]`). This is an exact
algebraic identity: every element in `[i+1, i+k]` is counted in both `sum(i)` and
`sum(i+1)` unchanged, so the only correction needed is subtracting what left and adding
what entered.

### 5. Visualization
Window size `k = 3` over `[1, 2, 3, 4, 5]`:

```
[1 2 3] 4  5    sum = 6
 1 [2 3 4] 5    sum = 9   (9 = 6 - 1 + 4)
 1  2 [3 4 5]   sum = 12  (12 = 9 - 2 + 5)
```

### 6. Recognition Signal
The problem statement explicitly says *"window/subarray of size k,"* or asks for the
maximum/minimum/average of every fixed-length contiguous chunk.

### 7. Algorithm (Step-by-Step)
1. Compute the sum (or aggregate) of the first `k` elements directly — this is the
   initial window.
2. Record it as the current best.
3. Slide the window one position at a time: subtract the element leaving on the left,
   add the element entering on the right.
4. Update the best after each slide.
5. Stop once the window's right edge reaches the end of the array.

### 8. Pseudocode
```
function fixedWindow(nums, k):
    windowSum = sum(nums[0..k-1])
    best = windowSum
    for right from k to length(nums) - 1:
        windowSum = windowSum + nums[right] - nums[right - k]
        best = max(best, windowSum)
    return best
```

### 9. JavaScript Implementation
```js
// Example: maximum sum of any subarray of size k
function maxSumFixedWindow(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i]; // build the very first window directly
  }
  let best = windowSum;

  for (let right = k; right < nums.length; right++) {
    windowSum += nums[right] - nums[right - k]; // add new right, remove old left
    best = Math.max(best, windowSum);
  }
  return best;
}
```

### 10. Dry Run
Input: `[1, 2, 3, 4, 5]`, `k = 3`

Initial window `[0..2]`: sum = `1+2+3 = 6`, best = 6

| right | nums[right] | nums[right-k] | windowSum | best |
|---|---|---|---|---|
| 3 | 4 | nums[0]=1 | 6 + 4 - 1 = 9 | 9 |
| 4 | 5 | nums[1]=2 | 9 + 5 - 2 = 12 | 12 |

Final answer: `12`

### 11. Complexity Analysis
- **Time: O(n)** — the initial window build is O(k), and each subsequent slide is O(1),
  for `n - k` slides — total O(k + (n-k)) = O(n).
- **Space: O(1)** — only the running sum and best value are stored.

### 12. Common Mistakes
- ❌ Recomputing the window sum from scratch at every slide instead of incrementally
  updating it — silently regresses to O(n·k).
- ❌ Off-by-one on which element leaves — using `nums[right - k]` vs `nums[right - k -
  1]` incorrectly desyncs the window.
- ❌ Not handling `k > n` (window larger than the array) — should be treated as invalid
  input or handled explicitly before the main loop.

### 13. Edge Cases
- `k === n` — the "window" is the whole array; the loop for sliding never executes, and
  the initial sum alone is the answer.
- `k === 1` — every single element is its own window; this should reduce to plain
  traversal for the max/min.
- Array shorter than `k` — no valid window exists; this must be handled before
  attempting to build the initial window.

### 14. Interview Explanation
"Fixed Size Window keeps a window of constant width k and slides it one step at a time.
Instead of resumming the whole window at every position, I maintain a running sum and
just add the new element entering on the right while subtracting the element that just
left on the left. That turns O(k) work per shift into O(1), so the whole scan is O(n)
instead of O(n·k)."

### 15. Related Problems & Revision Box
- Maximum Sum Subarray of Size K (classic template problem)
- Average of Subarrays of Size K

> **Revision Box**
> Formula/invariant: `windowSum += nums[right] - nums[right - k]`.
> Mental model in one phrase: *a ruler of fixed width sliding across a number line.*
> Complexity: *O(n) time, O(1) space.*

---

## E.3 Variable Size Window

### 1. Definition
Variable Size Window is the sliding window variant where the window's size is not fixed
in advance — instead, the window expands by moving `right` forward, and shrinks by
moving `left` forward *only when the window becomes invalid*, according to a
problem-specific validity rule.

### 2. Why This Pattern Exists
- **Brute force:** checking every possible `(left, right)` pair as a candidate window
  costs O(n²) pairs, each potentially requiring O(n) work to evaluate validity —
  O(n³) in the worst case.
- **What it wastes:** most of those `(left, right)` pairs are wasted work, because once
  a window becomes invalid, *every larger window starting at the same `left` is also
  invalid* — there's no reason to keep checking them.
- **Why waste is avoidable:** by only shrinking (moving `left`) exactly when the current
  window becomes invalid, and never re-checking windows that are obviously worse, the
  total pointer movement across the whole scan is bounded by O(n).
- **This pattern:** grow the window greedily, and shrink it minimally, exactly when
  needed — never more, never less.

### 3. Engineering Intuition (Mental Model)
Think of a rubber band stretched between your fingers. You keep stretching it wider
(moving `right`) as long as it doesn't snap. The moment it's about to snap (the window
becomes invalid), you let a bit of slack out from the other end (move `left`) — just
enough to make it valid again — and then keep stretching from where you left off.

### 4. Why It Works (Proof / Reasoning)
The core algorithmic invariant is: *`left` never moves backward, and it only moves
forward when the window is currently invalid*. Since validity in these problems is
typically **monotonic** with respect to shrinking (shrinking a window can only make it
more valid, never less), it's always correct to shrink from the left exactly until
validity is restored, and no further. Because `right` moves forward at most `n` times
and `left` moves forward at most `n` times total across the *entire* scan (never
resetting backward), the amortized total work is O(n), even though it looks like there
could be a nested loop.

### 5. Visualization
Golden rule as a loop:

```
Expand (right++)
   ↓
Check Validity
   ↓
If Invalid → Shrink (left++) → repeat check
   ↓
Update Answer
```

### 6. Recognition Signal
The problem statement mentions *longest/shortest substring or subarray satisfying some
condition*, where the window size is not given up front and must be discovered.

### 7. Algorithm (Step-by-Step)
1. Initialize `left = 0` and whatever state the validity check needs.
2. For `right` from `0` to `n - 1`: add `nums[right]` to the state.
3. While the window `[left, right]` is invalid: remove `nums[left]` from the state,
   increment `left`.
4. Now the window is guaranteed valid — update the answer using `right - left + 1` (or
   whatever the problem asks for).

### 8. Pseudocode
```
function variableWindow(nums):
    left = 0
    state = initial_state()
    best = 0
    for right from 0 to length(nums) - 1:
        add(state, nums[right])
        while not isValid(state):
            remove(state, nums[left])
            left = left + 1
        best = max(best, right - left + 1)
    return best
```

### 9. JavaScript Implementation
```js
// Example: length of the longest substring without repeating characters
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {         // window is invalid: duplicate found
      seen.delete(s[left]);              // shrink from the left...
      left++;                            // ...until the duplicate is gone
    }
    seen.add(s[right]);                  // window is now valid — include s[right]
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### 10. Dry Run
Input: `"abba"`

| right | s[right] | shrink? | left after | seen | window | best |
|---|---|---|---|---|---|---|
| 0 | a | no | 0 | {a} | "a" | 1 |
| 1 | b | no | 0 | {a,b} | "ab" | 2 |
| 2 | b | yes (dup b) | 2 | {b} | "b" | 2 |
| 3 | a | no | 2 | {b,a} | "ba" | 2 |

Final answer: `2`

### 11. Complexity Analysis
- **Time: O(n)** — `right` advances n times; `left` advances at most n times total
  across the whole run (it only ever increases), so total pointer movement is O(n), not
  O(n²).
- **Space: O(k)**, where `k` is the size of the tracked state (e.g., a `Set` bounded by
  the alphabet size or window contents).

### 12. Common Mistakes
- ❌ Using `if` instead of `while` for the shrink check — a single shrink step might not
  be enough to restore validity; you must keep shrinking until it's actually valid
  again.
- ❌ Updating the answer *before* the shrink loop, using an invalid window.
- ❌ Forgetting that different problems define "invalid" completely differently — see
  the validity comparison table below; copying one problem's exact condition into
  another problem's code without adapting it is the single most common bug in this
  family.

### 13. Edge Cases
- Empty string/array — loop never executes, answer stays at `0`.
- Every element identical — the window should shrink to size 1 repeatedly if the
  validity rule requires distinctness.
- Entire array/string is already valid — `left` should never need to move; the window
  grows to cover everything.

### 14. Interview Explanation
"Variable Size Window expands by moving right forward and only shrinks from the left
when the window becomes invalid, by whatever rule the problem defines. Because shrinking
is monotonic — a smaller window is never less valid than a larger one that contains it —
I only ever need to shrink until validity is restored, never more. Left and right each
move forward at most n times across the whole scan, so it's O(n) time total, even though
there's a while loop nested inside a for loop."

### 15. Related Problems & Revision Box — Validity Rule Comparison

Every variable window problem is the *same skeleton* with a *different validity rule*.
This is the single biggest lesson of the whole family:

| Problem | What's being tracked | Validity Condition |
|---|---|---|
| **LC3** — Longest Substring Without Repeating Characters | a `Set`/frequency map of characters in the window | every character's frequency ≤ 1 |
| **LC424** — Longest Repeating Character Replacement | frequency map + running `maxFreq` | `(windowLength - maxFreq) <= k` |
| **LC713** — Subarray Product Less Than K | running product | `product < k` |
| **LC76** — Minimum Window Substring | frequency map vs. target frequency map | every required character's window frequency ≥ its target frequency |

> **Revision Box**
> Formula/invariant: *expand always; shrink with `while`, not `if`, until valid.*
> Mental model in one phrase: *a rubber band — stretch until it's about to snap, then let out just enough slack.*
> Complexity: *O(n) time, O(k) space.*

---

## E.4 Frequency Window

### 1. Definition
Frequency Window is the sliding window specialization where the window's state is a
frequency map (character/value → count), maintained incrementally as elements enter and
leave the window, so validity or answer checks never require rescanning the window's
contents.

### 2. Why This Pattern Exists
- **Brute force:** to know "how many times does character X appear in the current
  window," recomputing the count by rescanning the window every time costs O(window
  size) per check.
- **What it wastes:** only one count actually changes per window shift (the entering
  element's count goes up by one, the leaving element's count goes down by one) — the
  rest of the frequency map is unaffected.
- **Why waste is avoidable:** update just the two affected counts (`map[entering]++`,
  `map[leaving]--`) instead of rebuilding the whole map.
- **This pattern:** maintain a live frequency map as a piece of window state, updated in
  O(1) per expand/shrink, never rescanned wholesale.

### 3. Engineering Intuition (Mental Model)
Think of a tally board at a shop counter, tracking how many of each item are currently
in a customer's cart. When a new item is added, you tick up its tally by one. When an
item is removed, you tick it down by one. You never recount the entire cart from
scratch just to know "how many apples are in there right now" — the tally board already
knows.

### 4. Why It Works (Proof / Reasoning)
The invariant maintained is: *`map[x]` always equals the exact count of value `x`
currently within `[left, right]`*. This holds by construction: every time an element
enters the window (`right` advances), its count is incremented exactly once; every time
an element leaves (`left` advances), its count is decremented exactly once. No count is
ever incremented or decremented for an element that isn't actually entering/leaving, so
the map can never drift out of sync with the window's true contents.

### 5. Visualization
Window sliding over `"abac"`, tracking character frequency:

```
window "a"     map: {a:1}
window "ab"    map: {a:1, b:1}
window "aba"   map: {a:2, b:1}
window "bac"   map: {a:1, b:1, c:1}   (shrunk: removed leading 'a', added 'c')
```

### 6. Recognition Signal
The problem statement requires knowing "how many of X are currently in the window" — for
character replacement, anagram detection, or any condition phrased in terms of counts of
specific values within the current window.

### 7. Algorithm (Step-by-Step)
1. Initialize an empty frequency map and `left = 0`.
2. For `right` from `0` to `n - 1`: increment `map[nums[right]]`.
3. While the window is invalid according to the map's current contents: decrement
   `map[nums[left]]` (removing the entry entirely, or leaving it at `0`, per
   implementation preference), then increment `left`.
4. Update the answer using the now-valid window.

### 8. Pseudocode
```
function frequencyWindow(nums):
    map = empty map
    left = 0
    best = 0
    for right from 0 to length(nums) - 1:
        map[nums[right]] = map[nums[right]] + 1
        while not isValid(map):
            map[nums[left]] = map[nums[left]] - 1
            left = left + 1
        best = max(best, right - left + 1)
    return best
```

### 9. JavaScript Implementation
```js
// Example: longest substring with at most 2 distinct characters (a Frequency Window)
function longestSubstringAtMostKDistinct(s, k) {
  const freq = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) || 0) + 1); // expand: tally up

    while (freq.size > k) {                            // invalid: too many distinct chars
      const leftChar = s[left];
      freq.set(leftChar, freq.get(leftChar) - 1);
      if (freq.get(leftChar) === 0) freq.delete(leftChar); // keep map clean for freq.size
      left++;
    }

    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### 10. Dry Run
Input: `"eceba"`, `k = 2`

| right | s[right] | freq after add | freq.size | shrink? | left after | best |
|---|---|---|---|---|---|---|
| 0 | e | {e:1} | 1 | no | 0 | 1 |
| 1 | c | {e:1,c:1} | 2 | no | 0 | 2 |
| 2 | e | {e:2,c:1} | 2 | no | 0 | 3 |
| 3 | b | {e:2,c:1,b:1} | 3 | yes → remove s[0]=e → {e:1,c:1,b:1}, left=1; still size 3 → remove s[1]=c → {e:1,b:1}, left=2 | 2 | 2 |
| 4 | a | {e:1,b:1,a:1} | 3 | yes → remove s[2]=e → {b:1,a:1}, left=3 | 3 | 2 |

Final answer: `3` (achieved at right=2, window `"ece"`)

### 11. Complexity Analysis
- **Time: O(n)** — each element enters and leaves the map at most once across the whole
  scan; every map operation is O(1) amortized (for a hash map).
- **Space: O(k)** — the map holds at most `k` distinct keys once the window is valid
  (bounded further by the alphabet size in general).

### 12. Common Mistakes
- ❌ Leaving stale zero-count entries in the map instead of deleting them — this corrupts
  checks like `map.size` that depend on only counting *present* keys.
- ❌ Checking validity using a full rescan of the map's values instead of a tracked
  summary (like `map.size`, or a separately maintained `maxFreq`).
- ❌ Forgetting to decrement the correct key when shrinking — always decrement
  `nums[left]`, the element actually leaving, not `nums[left + 1]` or some other index.

### 13. Edge Cases
- Empty string/array — map stays empty, answer stays `0`.
- Every character distinct — the window may never grow past `k` size if `k` is small.
- All characters identical — the map should only ever contain one key, with a growing
  count.

### 14. Interview Explanation
"Frequency Window is Sliding Window where the tracked state is a live frequency map,
updated by incrementing the entering element's count and decrementing the leaving
element's count — never rescanned wholesale. That keeps every window-content query O(1)
instead of O(window size), which is what keeps the whole algorithm at O(n) instead of
O(n * window size)."

### 15. Related Problems & Revision Box
- **LC3** — Longest Substring Without Repeating Characters
- **LC424** — Longest Repeating Character Replacement
- **LC76** — Minimum Window Substring

> **Revision Box**
> Formula/invariant: `map[entering]++` on expand, `map[leaving]--` on shrink — never rescan.
> Mental model in one phrase: *a tally board at a shop counter.*
> Complexity: *O(n) time, O(k) space.*

---

## E.5 Distinct Window

### 1. Definition
Distinct Window is the Frequency Window specialization where validity is defined purely
in terms of *uniqueness* — the window is valid exactly when it contains no duplicate
elements (or no more than a specified number of distinct elements), rather than tracking
arbitrary count-based conditions.

### 2. Why This Pattern Exists
- **Brute force:** for every candidate window, scanning it to check "are all elements
  unique?" costs O(window size) per check, and there are O(n) candidate windows in the
  worst case — O(n²) total.
- **What it wastes:** re-verifying uniqueness for elements that were already confirmed
  unique in the previous window, most of which are still present after a single-element
  shift.
- **Why waste is avoidable:** a `Set` (or frequency map) can tell you in O(1) whether the
  *newly entering* element is already present — you don't need to re-check the rest of
  the window, since they were already confirmed unique.
- **This pattern:** maintain a `Set` of the window's current contents; the moment the
  newly entering element is already in the set, shrink from the left until it isn't.

### 3. Engineering Intuition (Mental Model)
Picture a bouncer at a club checking IDs (a `Set`). Everyone currently inside is
guaranteed to be a different person — the bouncer already verified that. When someone
new tries to enter and their ID matches someone already inside, the bouncer doesn't
recheck everyone — they simply ask the people who entered earliest to leave (shrink from
the left) until the duplicate is resolved.

### 4. Why It Works (Proof / Reasoning)
The invariant is: *at every point where the window is confirmed valid, the `Set`
contains exactly the distinct elements of `[left, right]`, with no duplicates*. When
`nums[right]` is about to be added and is already present in the set, that specific
duplicate must be the one occupying some earlier position `left'` within the window.
Removing elements from the left one at a time is guaranteed to eventually remove that
earlier occurrence (since it lies within `[left, right]`), at which point the duplicate
is resolved and `nums[right]` can be safely added. No unnecessary shrinking occurs
because the loop stops the instant validity is restored.

### 5. Visualization
Longest window with all-distinct values over `[1, 2, 3, 2, 4]`:

```
[1]              set:{1}         len=1
[1 2]            set:{1,2}       len=2
[1 2 3]          set:{1,2,3}     len=3
   [2 3] 2 →invalid, shrink→ [3] 2   set:{3}    (removed leading 1, then 2)
      [3 2]          set:{3,2}     len=2
      [3 2 4]        set:{3,2,4}   len=3
```

### 6. Recognition Signal
The problem statement mentions: *longest substring/subarray with all unique/distinct
elements*, or "no repeating characters" — the validity rule is exclusively about
uniqueness, with no additional counting logic layered on top.

### 7. Algorithm (Step-by-Step)
1. Initialize an empty `Set` and `left = 0`.
2. For `right` from `0` to `n - 1`:
   a. While `nums[right]` is already in the set: remove `nums[left]` from the set,
      increment `left`.
   b. Add `nums[right]` to the set.
3. Update the answer using `right - left + 1`.

### 8. Pseudocode
```
function distinctWindow(nums):
    seen = empty set
    left = 0
    best = 0
    for right from 0 to length(nums) - 1:
        while nums[right] in seen:
            remove(seen, nums[left])
            left = left + 1
        add(seen, nums[right])
        best = max(best, right - left + 1)
    return best
```

### 9. JavaScript Implementation
```js
// Longest subarray with all distinct values
function longestDistinctSubarray(nums) {
  const seen = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    while (seen.has(nums[right])) {   // duplicate found — window is invalid
      seen.delete(nums[left]);
      left++;
    }
    seen.add(nums[right]);            // safe to add now — no duplicate remains
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### 10. Dry Run
Input: `[1, 2, 3, 2, 4]`

| right | nums[right] | duplicate? | shrink steps | left after | seen after | best |
|---|---|---|---|---|---|---|
| 0 | 1 | no | — | 0 | {1} | 1 |
| 1 | 2 | no | — | 0 | {1,2} | 2 |
| 2 | 3 | no | — | 0 | {1,2,3} | 3 |
| 3 | 2 | yes | remove nums[0]=1 (left=1); remove nums[1]=2 (left=2) | 2 | {3} then add 2 → {3,2} | 2 |
| 4 | 4 | no | — | 2 | {3,2,4} | 3 |

Final answer: `3`

### 11. Complexity Analysis
- **Time: O(n)** — same reasoning as core Sliding Window: `left` and `right` each move
  forward at most n times total.
- **Space: O(k)**, where `k` is the number of distinct values possible (bounded by the
  window size, and further by the input's value range/alphabet).

### 12. Common Mistakes
- ❌ Checking `seen.has(nums[right])` **after** adding it to the set instead of before —
  this makes every check trivially true.
- ❌ Using `if` instead of `while` for the shrink — a single removal might not be enough
  if there are duplicate structures spanning multiple positions.
- ❌ Forgetting to actually remove `nums[left]` from the set during shrink, leaving the
  set out of sync with the window's true contents.

### 13. Edge Cases
- Empty array — loop never runs, answer is `0`.
- All elements identical — the window can never exceed size 1.
- All elements distinct — the window should grow to cover the entire array without ever
  shrinking.

### 14. Interview Explanation
"Distinct Window is Sliding Window where validity means 'no duplicates in the current
window.' I track the window's contents in a Set — when the newly entering element is
already in the set, I know its earlier occurrence is somewhere inside the current
window, so I shrink from the left until that duplicate is removed. Because both pointers
only ever move forward, it's still O(n) time overall."

### 15. Related Problems & Revision Box
- **LC3** — Longest Substring Without Repeating Characters

> **Revision Box**
> Formula/invariant: *duplicate found → shrink left until the Set no longer contains it.*
> Mental model in one phrase: *a bouncer checking IDs at the door.*
> Complexity: *O(n) time, O(k) space.*

---

## E.6 Count Window

### 1. Definition
Count Window is the Sliding Window variant used when the goal is not to find *one* best
window, but to **count how many contiguous subarrays/substrings satisfy a given
condition** — using the key identity `count += right - left + 1` at each step, once the
window `[left, right]` is valid.

### 2. Why This Pattern Exists
- **Brute force:** counting every valid contiguous subarray by generating all O(n²)
  candidate ranges and checking each one costs at least O(n²), often more if checking
  validity itself isn't O(1).
- **What it wastes:** re-verifying validity for every one of the many sub-ranges that
  share the same right endpoint, when a single sliding-window pass could classify all of
  them at once.
- **Why waste is avoidable:** once `[left, right]` is known valid, every suffix of that
  window ending at `right` — that is, `[left, right]`, `[left+1, right]`, ...,
  `[right, right]` — is *also* valid, under monotonic validity conditions. That's
  exactly `right - left + 1` valid windows, discoverable without individually checking
  each one.
- **This pattern:** maintain the same expand/shrink skeleton as ordinary sliding window,
  but instead of tracking a single best answer, accumulate `right - left + 1` into a
  running count at every step.

### 3. Engineering Intuition (Mental Model)
Imagine you've confirmed that a rope of length `L` (from `left` to `right`) can hold a
certain weight. It follows immediately that any *shorter* piece cut from the same rope,
still ending at the same right edge, can also hold that weight — you don't need to
re-test each shorter piece individually. Each of those `L` shorter pieces is a separately
valid window, and you can count all of them in one step.

### 4. Why It Works (Proof / Reasoning)
This relies on **monotonic validity**: if `[left, right]` is valid, then for the specific
class of problems this pattern applies to (e.g., product strictly less than `k`, with
strictly positive numbers), removing elements from the left can only make the window
"more valid" (smaller product, smaller sum), never less. Therefore every one of the
`right - left + 1` windows sharing the right endpoint `right` and starting anywhere from
`left` to `right` is guaranteed valid too. Summing `right - left + 1` at each `right`
therefore counts every valid window exactly once, with no duplicates and no omissions,
across the entire scan.

### 5. Visualization
Counting subarrays with product `< 20` in `[10, 5, 2, 6]`:

```
right=0: window=[10]         valid, count += 1  (total=1)
right=1: window=[10,5]=50    invalid → shrink → window=[5]=5  valid, count += 1  (total=2)
right=2: window=[5,2]=10     valid, count += 2  (total=4)    ([5,2] and [2])
right=3: window=[5,2,6]=60   invalid → shrink → [2,6]=12     valid, count += 2  (total=6)   ([2,6] and [6])
```

### 6. Recognition Signal
The problem statement asks *"how many subarrays/substrings..."* rather than "what is
the longest/shortest..." — the answer is a **count**, not a length or a specific window.

### 7. Algorithm (Step-by-Step)
1. Initialize `left = 0`, window state, and `count = 0`.
2. For `right` from `0` to `n - 1`: add `nums[right]` to the state.
3. While the window `[left, right]` is invalid: remove `nums[left]`, increment `left`.
4. Add `right - left + 1` to `count` — every window ending at `right` and starting
   anywhere from `left` to `right` is valid.
5. After the loop, `count` holds the total number of valid windows.

### 8. Pseudocode
```
function countWindow(nums, k):
    left = 0
    product = 1
    count = 0
    for right from 0 to length(nums) - 1:
        product = product * nums[right]
        while product >= k and left <= right:
            product = product / nums[left]
            left = left + 1
        count = count + (right - left + 1)
    return count
```

### 9. JavaScript Implementation
```js
// Count subarrays with product strictly less than k
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0; // no product of positive integers can ever be < 1

  let left = 0;
  let product = 1;
  let count = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right]; // expand

    while (product >= k) {              // invalid: product too large
      product /= nums[left];            // shrink from the left
      left++;
    }

    count += right - left + 1; // every window ending at `right`, starting from
                                // `left` to `right`, is valid — count them all at once
  }
  return count;
}
```

### 10. Dry Run
Input: `[10, 5, 2, 6]`, `k = 100`

| right | nums[right] | product after add | shrink? | left after | window | count += | total |
|---|---|---|---|---|---|---|---|
| 0 | 10 | 10 | no | 0 | [10] | 1 | 1 |
| 1 | 5 | 50 | no | 0 | [10,5] | 2 | 3 |
| 2 | 2 | 100 | yes (100>=100) → /10 → 10, left=1 | 1 | [5,2] | 2 | 5 |
| 3 | 6 | 60 | no | 1 | [5,2,6] | 3 | 8 |

Final answer: `8`

### 11. Complexity Analysis
- **Time: O(n)** — same amortized bound as ordinary Sliding Window; `left` and `right`
  each advance at most n times total.
- **Space: O(1)** — the running `product` and `count` are single scalars (no frequency
  map needed for this particular problem, though other count-window problems may need
  one).

### 12. Common Mistakes
- ❌ Forgetting the `k <= 1` guard for product-based problems — if `k <= 1`, no product
  of positive integers can ever be strictly less than `k`, so the answer must be `0`
  before the main loop even runs (dividing by elements could also cause issues if not
  guarded).
- ❌ Using `best = max(best, ...)` instead of `count += (...)` — this is the single most
  common bug: confusing this pattern with ordinary Variable Window, which tracks a best
  window rather than a running total.
- ❌ Applying this trick to a validity condition that is **not** monotonic under
  shrinking — the `right - left + 1` shortcut is only valid when every shorter window
  sharing the right endpoint is guaranteed valid too.

### 13. Edge Cases
- `k <= 1` (product-based problems) — return `0` immediately.
- All elements individually already invalid (e.g., a single element `>= k`) — the window
  should shrink to size zero at that point, contributing `0` to the count for that step.
- Entire array is one valid window — `left` never moves, and `count` accumulates
  `1 + 2 + 3 + ... + n`.

### 14. Interview Explanation
"Count Window uses the same expand/shrink skeleton as ordinary sliding window, but
instead of tracking a single best window, I add `right - left + 1` to a running count at
every step. That works because, once `[left, right]` is valid, every shorter window that
still ends at `right` is also valid — so instead of counting them one at a time, I count
all of them in one addition. This only works when validity is monotonic under
shrinking, which is true for problems like product-less-than-k over positive integers."

### 15. Related Problems & Revision Box
- **LC713** — Subarray Product Less Than K

> **Revision Box**
> Formula/invariant: `count += right - left + 1`, valid only when shrinking-monotonic.
> Mental model in one phrase: *if the whole rope holds, every shorter piece from the same end holds too.*
> Complexity: *O(n) time, O(1) space (for scalar state).*

---

## E.7 Minimum Window

### 1. Definition
Minimum Window is the Sliding Window variant where the goal is the **smallest**
contiguous window that satisfies a validity condition — the opposite optimization
target from problems that seek the longest valid window, requiring the shrink step to
happen as aggressively as possible, the instant the window becomes valid.

### 2. Why This Pattern Exists
- **Brute force:** checking every possible window and filtering for the smallest one
  that's valid costs O(n²) at minimum, since window generation alone is quadratic.
- **What it wastes:** most windows are either obviously too large (once a smaller valid
  one has already been found) or invalid — brute force doesn't prioritize shrinking
  toward the smallest valid option.
- **Why waste is avoidable:** once a window becomes valid, immediately try to shrink it
  as far as possible before it becomes invalid again — this greedily finds the smallest
  valid window ending near the current `right`, without ever needing to re-examine
  larger windows that a smaller one already dominates.
- **This pattern:** flip the usual shrink timing — instead of shrinking only when
  invalid, shrink **as long as the window remains valid**, recording the best (smallest)
  answer at every valid state along the way.

### 3. Engineering Intuition (Mental Model)
Picture tightening a rope around a bundle of sticks until it's just about to snap. You
don't stop pulling the instant it becomes tight enough — you keep pulling, checking
after every notch, until pulling any further would actually break the bundle apart
(make the window invalid). The very last notch before it breaks is your answer: the
smallest window that still holds everything together.

### 4. Why It Works (Proof / Reasoning)
For a fixed `right`, the largest possible valid window ending at `right` is not what's
wanted — the *smallest* valid window ending at (or extending to) `right` is. By
shrinking from the left as long as validity holds, the algorithm finds, for each
position of `right`, the tightest possible `left` such that `[left, right]` is still
valid — which is exactly the smallest valid window "anchored" at that `right`. Because
every possible `right` is tried, and for each the smallest valid window is found via
greedy shrinking, the overall minimum across all of them is the true global minimum —
no smaller valid window could exist without being captured at some `right` value along
the way.

### 5. Visualization
Contrast in shrink timing:

```
MAXIMUM / VARIABLE WINDOW:
  Expand → if INVALID → shrink just until valid → record answer

MINIMUM WINDOW:
  Expand → if VALID → record answer, then shrink AGAIN to try to go smaller
                    → repeat until it becomes invalid
```

### 6. Recognition Signal
The problem statement mentions *"minimum window,"* *"smallest substring,"* or "shortest
subarray satisfying..." — the optimization direction is explicitly toward the smallest
valid size, not the largest.

### 7. Algorithm (Step-by-Step)
1. Initialize `left = 0`, window state, and `best = Infinity` (window not yet found).
2. For `right` from `0` to `n - 1`: add `nums[right]` to the state.
3. While the window `[left, right]` **is valid**: record `right - left + 1` if it's
   smaller than `best`, then remove `nums[left]` from the state and increment `left`
   (shrink even though it's still valid, to try to go smaller).
4. After the loop, `best` (if it was updated at least once) holds the answer.

### 8. Pseudocode
```
function minimumWindow(nums, targetMap):
    left = 0
    windowMap = empty map
    matched = 0
    best = infinity

    for right from 0 to length(nums) - 1:
        add nums[right] to windowMap
        if windowMap satisfies one more requirement of targetMap:
            matched = matched + 1

        while matched == required(targetMap):
            best = min(best, right - left + 1)
            remove nums[left] from windowMap
            if windowMap no longer satisfies that requirement:
                matched = matched - 1
            left = left + 1

    return best if best != infinity else 0
```

### 9. JavaScript Implementation
```js
// Minimum Window Substring: smallest window in s containing all characters of t
function minWindow(s, t) {
  if (t.length === 0 || s.length === 0) return "";

  const targetFreq = new Map();
  for (const ch of t) {
    targetFreq.set(ch, (targetFreq.get(ch) || 0) + 1);
  }
  const required = targetFreq.size; // number of DISTINCT chars that must be satisfied

  const windowFreq = new Map();
  let formed = 0; // how many distinct required chars are currently fully satisfied
  let left = 0;
  let best = Infinity;
  let bestLeft = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    windowFreq.set(ch, (windowFreq.get(ch) || 0) + 1);

    if (targetFreq.has(ch) && windowFreq.get(ch) === targetFreq.get(ch)) {
      formed++; // this character just reached its required count
    }

    // window is valid: SHRINK aggressively, even though it's still valid,
    // to search for something smaller
    while (formed === required) {
      if (right - left + 1 < best) {
        best = right - left + 1;
        bestLeft = left;
      }

      const leftChar = s[left];
      windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
      if (targetFreq.has(leftChar) && windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
        formed--; // removing this element just broke a requirement
      }
      left++;
    }
  }

  return best === Infinity ? "" : s.substring(bestLeft, bestLeft + best);
}
```

### 10. Dry Run
Input: `s = "ADOBECODEBANC"`, `t = "ABC"` (targetFreq: A:1, B:1, C:1, required=3)

| right | s[right] | formed | valid? | shrink action | best after |
|---|---|---|---|---|---|
| ... | ... | grows to 3 at right=5 (window "ADOBEC") | yes | shrink left from 0 → "DOBEC" (formed drops, stop) | 6 |
| ... | continues expanding... | reaches 3 again around right=9 ("CODEBA" region) | yes | shrinks down to "BANC" territory eventually | 4 |

(Full character-by-character trace omitted for length — the key behavior to trust is:
every time `formed === required`, the algorithm records the window size **and then keeps
shrinking**, rather than moving on to the next `right` immediately.)

Final answer: `"BANC"` (length 4)

### 11. Complexity Analysis
- **Time: O(n + m)** where `n = s.length` and `m = t.length` — building `targetFreq` is
  O(m), and the main scan has `right` and `left` each advancing at most `n` times total.
- **Space: O(m)** for `targetFreq` (bounded by the number of distinct characters in
  `t`), plus O(k) for `windowFreq` where `k` is the alphabet size.

### 12. Common Mistakes
- ❌ Shrinking only until the window is *no longer* valid, then stopping — the correct
  behavior is to record the answer **while still valid**, and only stop shrinking once
  it actually becomes invalid.
- ❌ Comparing `windowFreq.size` to `targetFreq.size` instead of tracking `formed`
  precisely — `windowFreq` may contain extra characters not in `t` at all, so size
  comparisons alone are insufficient.
- ❌ Forgetting to decrement `formed` when a shrink step causes a previously-satisfied
  requirement to fall below its target count.

### 13. Edge Cases
- `t` longer than `s` — no valid window can exist; should return an empty result
  immediately (or after the scan naturally finds nothing).
- `t` contains characters not present anywhere in `s` — `formed` can never reach
  `required`; the function should return empty.
- `s === t` (same length, same characters) — the entire string is the minimum window.

### 14. Interview Explanation
"Minimum Window flips the usual shrink timing: instead of shrinking only when invalid, I
shrink as long as the window stays valid, recording the window size at every valid state
along the way, and only stop shrinking once it actually breaks. That greedily finds, for
every right endpoint, the tightest possible left boundary — and taking the best across
all right endpoints gives the true global minimum. It's still O(n) because both pointers
only move forward across the entire scan."

### 15. Related Problems & Revision Box
- **LC76** — Minimum Window Substring

> **Revision Box**
> Formula/invariant: *while valid: record answer, then shrink anyway — stop only when invalid.*
> Mental model in one phrase: *tighten the rope until it's just about to snap.*
> Complexity: *O(n + m) time, O(k) space.*

---

## Family Comparison — Sliding Window Sub-Patterns

| Variant | Window size | Shrink trigger | Answer accumulation |
|---|---|---|---|
| Fixed | constant `k` | every step (add 1, drop 1) | compare aggregate to best |
| Variable | dynamic | when invalid | `right - left + 1` at valid states |
| Frequency | dynamic | when map-based condition invalid | depends on specific problem |
| Distinct | dynamic | when a duplicate enters | `right - left + 1` at valid states |
| Count | dynamic | when invalid | **accumulate** `right - left + 1` (sum, not max) |
| Minimum | dynamic | **while still valid** (opposite of the rest) | `min` of `right - left + 1` at every valid state |

---

*(End of Part 2 — Two Pointer Family, Sliding Window Family. Continue with Part 3:
Kadane's Algorithm + Cyclic Sort + Matrix Family.)*