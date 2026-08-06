# Phase1_Array.md
### A Permanent Reference — Linear Data Structures (Arrays)

**Author:** Bhanu Pratap
**Language:** JavaScript
**Version:** 1.0

---

## How To Use This Book

Read it once, start to finish, without skipping sections — even the ones that feel
obvious right now. The point of a full read is to build the *reasoning*, not just the
final formula, because the formula is the part you'll forget first.

Later, when you come back before an interview, don't re-read everything. Jump straight
to a pattern's **Section 15 — Revision Box**. If three lines are enough to bring the
whole idea back, you're done — go solve a problem. If the Revision Box doesn't fully
click, that's your signal to re-read that pattern's full section, not just the box.
The box is a trigger for memory, not a replacement for understanding.

---

## Master Pattern-Selection Flowchart

Ask these questions **in order** against the problem's constraints. Stop at the first
match.

| # | Question | Pattern |
|---|---|---|
| 1 | Do you need to touch every element exactly once, with no extra structure? | Traversal |
| 2 | Do you need a cumulative running total carried forward as you scan? | Running State |
| 3 | Do you need to remember *where* something happened, not just *what*? | Index Tracking |
| 4 | Do you need the sum of arbitrary ranges, queried many times? | Prefix Sum |
| 5 | Do you need the product of arbitrary ranges, or "product except self"? | Prefix Product |
| 6 | Do you need to apply the same update to many overlapping ranges? | Difference Array |
| 7 | Do you need to compare/swap two positions using order (sorted array, reverse)? | Two Pointer |
| 8 | Do you need the best/longest/shortest **contiguous** subarray or substring? | Sliding Window |
| 9 | Do you need the maximum-sum contiguous subarray specifically? | Kadane |
| 10 | Are the numbers guaranteed to lie in a known range like `1..n` or `0..n`? | Cyclic Sort |
| 11 | Are you working with rows and columns (a grid/image)? | Matrix |
| 12 | Is there no formula — you just need to follow stated movement/step rules? | Simulation |

This table is a starting filter, not a guarantee. Constraints can point to more than one
candidate pattern; when that happens, re-read the **Recognition Signal** section of each
candidate and let the exact wording of the problem break the tie.

---

# A. Foundations

## A.1 Array Fundamentals

**Definition.** An array is a linear data structure that stores elements in contiguous
memory locations, where each element is accessed in constant time via a numeric index.
"Contiguous" is the operative word — it's *why* indexed access is O(1): the address of
element `i` is computable directly as `base_address + i * element_size`, with no
searching involved.

```
nums = [4, 7, 2, 9]
index:   0  1  2  3
```

**Properties:** ordered, indexed, fast random access, fixed positions (inserting or
removing in the middle requires shifting every element after it).

**Operations and their cost:**

| Operation | Syntax | Time | Why |
|---|---|---|---|
| Read | `nums[i]` | O(1) | direct address computation |
| Update | `nums[i] = x` | O(1) | direct address computation |
| Insert at end | `push(x)` | O(1) amortized | usually just writes past the last used slot |
| Delete at end | `pop()` | O(1) | just shrinks the logical length |
| Insert at start | `unshift(x)` | O(n) | every existing element must shift right by one |
| Delete at start | `shift()` | O(n) | every remaining element must shift left by one |

## A.2 Time Complexity Ladder

| Complexity | Name | One-line intuition |
|---|---|---|
| O(1) | Constant | Cost doesn't change no matter how big the input is |
| O(log n) | Logarithmic | You cut the remaining work in half every step (binary search) |
| O(n) | Linear | You touch every element once |
| O(n log n) | Linearithmic | You do a linear amount of work at each of log n levels (sorting) |
| O(n²) | Quadratic | You compare every element against every other element (nested loops) |
| O(2ⁿ) | Exponential | You branch into two choices at every element (backtracking / subsets) |

Always estimate complexity **before** writing code — it tells you which pattern is even
viable given the input size in the constraints.

## A.3 Space Complexity Decision Rule

Ask yourself one question: **"Am I creating another data structure the size of the
input?"**

- No new array, no HashMap, no Set → almost always **O(1)** space.
- Creating a `new Array()`, a HashMap, a Set, or a prefix array → **O(n)** space.

This single question resolves 90% of space-complexity questions in this book faster than
deriving it from scratch each time.

---

# B. Traversal Family

## B.1 Traversal

### 1. Definition
Traversal is the act of visiting every element of an array exactly once, in order, to
either observe it, transform it, or fold it into an accumulated result (count, sum,
max, min, a search hit).

### 2. Why This Pattern Exists
- **Brute force:** there isn't a "more brute" version of traversal — it *is* the
  baseline. Every other pattern in this book is traversal **plus** some extra piece of
  state or structure layered on top.
- **What it wastes:** nothing, by itself — it's already optimal for "look at everything
  once."
- **Why waste is avoidable:** N/A — traversal is the floor, not something being
  optimized away from.
- **This pattern:** the reason it deserves its own section is that almost every other
  pattern in this book is *recognized* as "traversal + X," so understanding plain
  traversal precisely is the foundation for recognizing every variant.

### 3. Engineering Intuition (Mental Model)
Imagine walking down a street, looking into every house's window exactly once, left to
right. You don't go back, you don't skip a house, and at each house you either note
something down (a running count, a new maximum) or just observe and move on. You never
need to revisit a house to answer the question you were asked — one pass, one look,
done.

### 4. Why It Works (Proof / Reasoning)
Correctness follows directly from the definition of "every element exactly once": if the
answer to the problem (a count, a max, a sum, a search result) only depends on
information visible from a single left-to-right pass — and doesn't require comparing
non-adjacent elements against each other in combinations — then visiting each element
once and updating the accumulator is sufficient. No information is lost because nothing
that mattered was skipped.

### 5. Visualization

```
Array:     [2] [5] [9] [1]
Visit:      ↓   ↓   ↓   ↓
Step:       1   2   3   4
Running max: 2   5   9   9
```

### 6. Recognition Signal
The problem statement mentions: *visit*, *count*, *maximum*, *minimum*, *sum*, *search*,
"linear scan," or simply describes an operation that only needs each element once with
no notion of a "range" or "window."

### 7. Algorithm (Step-by-Step)
1. Initialize any accumulator variables (count = 0, max = -Infinity, sum = 0, etc.).
2. Start at index 0.
3. For each index up to `length - 1`: read the element, update the accumulator(s).
4. After the loop ends, the accumulator(s) hold the answer.

### 8. Pseudocode
```
function traverse(nums):
    result = initial_value
    for i from 0 to length(nums) - 1:
        result = update(result, nums[i])
    return result
```

### 9. JavaScript Implementation
```js
// Example: find the maximum element
function findMax(nums) {
  let max = nums[0]; // seed with the first element, not -Infinity or 0 —
                      // avoids assumptions about the value range
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]; // update only when strictly greater
    }
  }
  return max;
}
```

### 10. Dry Run
Input: `[2, 5, 9, 1]`

| i | nums[i] | max before | comparison | max after |
|---|---|---|---|---|
| 0 (seed) | 2 | — | — | 2 |
| 1 | 5 | 2 | 5 > 2 | 5 |
| 2 | 9 | 5 | 9 > 5 | 9 |
| 3 | 1 | 9 | 1 > 9? no | 9 |

Final answer: `9`

### 11. Complexity Analysis
- **Time: O(n)** — the loop body executes exactly once per element; no element is
  revisited, and no nested loop exists.
- **Space: O(1)** — only a fixed number of scalar variables (`max`, loop index `i`) are
  used, regardless of input size.

### 12. Common Mistakes
- ❌ **Wrong start index:** seeding `max = 0` instead of `nums[0]` silently breaks on
  arrays that are entirely negative.
- ❌ **Off-by-one in the loop condition:** using `i <= nums.length` instead of
  `i < nums.length` reads past the last valid index and returns `undefined`.
- ❌ **Forgetting the empty-array case:** `nums[0]` on an empty array is `undefined`,
  which silently poisons every subsequent comparison instead of throwing.

### 13. Edge Cases
- Empty array — decide up front what the "no answer" return value should be.
- Single-element array — the loop body may never execute; make sure the seed value
  alone is a correct answer.
- All elements identical — comparisons like `nums[i] > max` should still behave
  correctly (they will, since equality never triggers an update, which is fine for max).

### 14. Interview Explanation
"Traversal means visiting every element of the array exactly once in a single pass,
updating whatever running value I need — a count, a sum, a max — as I go. It's correct
because the answer only depends on information I've already seen by the time I reach the
end, and it's O(n) time because each element is looked at exactly once, with O(1) extra
space since I only carry a handful of scalar variables forward."

### 15. Related Problems & Revision Box
- **LC1920** — Build Array from Permutation (index-based transform, one pass)
- **LC1929** — Concatenation of Array (straightforward single pass)
- **LC485** — Max Consecutive Ones (running count reset on a break — a Running State
  variant)
- **LC1672** — Richest Customer Wealth (row sum + running max)

> **Revision Box**
> Formula/invariant: *visit each index once, fold into an accumulator.*
> Mental model in one phrase: *walking the street, looking in every window once.*
> Complexity: *O(n) time, O(1) space.*

---

## B.2 Running State

### 1. Definition
Running State is traversal augmented with a value that is *carried forward* from one
iteration to the next and updated based on both the new element and the value's own
previous state — as opposed to plain traversal, where the accumulator update depends
only on the new element.

### 2. Why This Pattern Exists
- **Brute force:** recomputing a "streak," "running total," or "current run length" from
  scratch at every index by looking backward would be O(n) per index, O(n²) overall.
- **What it wastes:** re-reading elements you've already processed, just to answer
  "what's my current streak as of here?"
- **Why waste is avoidable:** the streak/run at index `i` is almost always a simple
  function of the streak at index `i-1` plus the new element — you don't need to look
  back at all.
- **This pattern:** carry exactly one small piece of state forward and update it in O(1)
  per step, turning an O(n²) re-derivation into an O(n) pass.

### 3. Engineering Intuition (Mental Model)
Think of a scoreboard that tracks your current winning streak in a game. You don't
recount every past game after every new result — you just look at the last result: if
you won, streak += 1; if you lost, streak resets to 0. The scoreboard only needs to
remember *one number* (the current streak), not the entire history of games.

### 4. Why It Works (Proof / Reasoning)
This is an inductive argument. If the running value at index `i-1` correctly reflects
everything relevant up to `i-1`, and the update rule at index `i` only needs (a) that
value and (b) `nums[i]`, then by induction the running value at every index is correct,
including the last one. The invariant "running value = correct answer for the prefix
ending here" is preserved at every step, so it holds at the end too.

### 5. Visualization
Example: longest run of consecutive `1`s in `[1, 1, 0, 1, 1, 1, 0]`

```
value:        1   1   0   1   1   1   0
running run:  1   2   0   1   2   3   0
best so far:  1   2   2   2   2   3   3
```

### 6. Recognition Signal
The problem statement mentions: *consecutive*, *streak*, *current run*, *running
total/balance*, or any phrasing where the answer at each position depends on "what
happened most recently" rather than the whole history.

### 7. Algorithm (Step-by-Step)
1. Initialize `running = 0` and `best = 0` (or whatever the sensible starting state is).
2. For each element: update `running` using only `running` and the current element.
3. If the running value can reset (e.g., streak breaks), reset it to its base state.
4. Update `best` if `running` beats it.
5. After the loop, `best` holds the answer.

### 8. Pseudocode
```
function runningState(nums):
    running = 0
    best = 0
    for x in nums:
        if condition_holds(x):
            running = running + 1
        else:
            running = 0
        best = max(best, running)
    return best
```

### 9. JavaScript Implementation
```js
// Example: longest run of consecutive 1s
function findMaxConsecutiveOnes(nums) {
  let running = 0; // current streak
  let best = 0;    // best streak seen so far
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      running++; // extend the streak
    } else {
      running = 0; // streak broken, reset
    }
    if (running > best) {
      best = running; // record the new best
    }
  }
  return best;
}
```

### 10. Dry Run
Input: `[1, 1, 0, 1, 1, 1, 0]`

| i | nums[i] | running before | action | running after | best after |
|---|---|---|---|---|---|
| 0 | 1 | 0 | extend | 1 | 1 |
| 1 | 1 | 1 | extend | 2 | 2 |
| 2 | 0 | 2 | reset | 0 | 2 |
| 3 | 1 | 0 | extend | 1 | 2 |
| 4 | 1 | 1 | extend | 2 | 2 |
| 5 | 1 | 2 | extend | 3 | 3 |
| 6 | 0 | 3 | reset | 0 | 3 |

Final answer: `3`

### 11. Complexity Analysis
- **Time: O(n)** — one update per element, O(1) work per update.
- **Space: O(1)** — only `running` and `best` are stored, independent of input size.

### 12. Common Mistakes
- ❌ Forgetting to update `best` **before** or **after** the reset inconsistently — the
  update-best step must happen every iteration, not just on resets.
- ❌ Resetting `running` to the wrong base value (e.g., `1` instead of `0`) for the
  specific problem's definition of a "break."
- ❌ Confusing "running value" with "best value" and returning the wrong one.

### 13. Edge Cases
- Empty array → best should default to `0` (or whatever "no valid run" means).
- Array with no breaks at all → running should grow the entire length without ever
  resetting.
- Array where every element breaks the streak → best should stay at its minimum
  (e.g., `0` or `1`, depending on problem definition).

### 14. Interview Explanation
"Running State is traversal where I carry one small piece of state — like a current
streak — forward from index to index, updating it in O(1) using only its previous value
and the new element. I never look backward, because the running value already summarizes
everything relevant about the prefix I've seen. That inductive property is what makes it
correct, and it's why the whole thing runs in O(n) time and O(1) space instead of
recomputing the streak from scratch at every index."

### 15. Related Problems & Revision Box
- **LC485** — Max Consecutive Ones
- **LC1004** — Max Consecutive Ones III (Running State escalated into Sliding Window)
- **LC53** — Maximum Subarray (Kadane is a specialized Running State pattern)

> **Revision Box**
> Formula/invariant: *running[i] = f(running[i-1], nums[i]); never look backward.*
> Mental model in one phrase: *a scoreboard that only remembers the current streak.*
> Complexity: *O(n) time, O(1) space.*

---

## B.3 Index Tracking

### 1. Definition
Index Tracking is traversal where the answer required is not just a value (max, sum,
count) but a **position** — the index (or indices) at which something occurred — so the
accumulator stores index information instead of, or in addition to, a value.

### 2. Why This Pattern Exists
- **Brute force:** if you only track the *value* of the maximum, minimum, or first match
  during a scan, you cannot answer "where did that happen?" afterward without a second
  pass — doubling the work or requiring you to re-scan.
- **What it wastes:** a second traversal, or storing the entire array in memory just to
  look the value up afterward.
- **Why waste is avoidable:** you already have the index available for free at the
  moment you're standing on it during the first pass — capturing it costs nothing extra.
- **This pattern:** update an index variable at the exact moment you'd otherwise only
  update a value, so position information survives past the loop without a second pass.

### 3. Engineering Intuition (Mental Model)
Imagine you're a scout walking down a row of houses looking for the tallest one. If you
only remember "the tallest house was 40 feet," you can't point to it later. But if
instead you remember "house #7 was the tallest, at 40 feet," you can always walk back to
it. Index Tracking is the habit of writing down the *address*, not just the *fact*.

### 4. Why It Works (Proof / Reasoning)
At the moment an element satisfies the condition of interest (new max, first match,
etc.), its index `i` is directly available as the loop variable — no computation is
needed to derive it. Storing it alongside (or instead of) the value preserves exactly the
same correctness guarantee as ordinary traversal, since the update rule ("is this better
than what I've stored?") is unchanged; only the payload being stored differs.

### 5. Visualization
Example: index of the maximum element in `[3, 7, 2, 9, 4]`

```
index:        0   1   2   3   4
value:        3   7   2   9   4
best index:   0   1   1   3   3
best value:   3   7   7   9   9
```

### 6. Recognition Signal
The problem asks for *"return the index of..."*, *"find the position where..."*, *"which
element..."*, or requires you to later use the location of a value (e.g., to slice the
array, or to answer a follow-up query about *where*, not just *what*).

### 7. Algorithm (Step-by-Step)
1. Initialize `bestIndex = -1` (or `0`) and `bestValue` to a sentinel appropriate for the
   comparison (e.g., `-Infinity` for a max search).
2. For each index `i`: compare `nums[i]` against `bestValue`.
3. If it satisfies the condition, update **both** `bestValue = nums[i]` and
   `bestIndex = i` together, in the same branch.
4. After the loop, `bestIndex` holds the answer.

### 8. Pseudocode
```
function indexTracking(nums):
    bestIndex = -1
    bestValue = -infinity
    for i from 0 to length(nums) - 1:
        if nums[i] > bestValue:
            bestValue = nums[i]
            bestIndex = i
    return bestIndex
```

### 9. JavaScript Implementation
```js
// Example: index of the maximum element
function indexOfMax(nums) {
  let bestIndex = 0;
  let bestValue = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > bestValue) {
      bestValue = nums[i]; // update the value...
      bestIndex = i;       // ...and the index together, in the same branch
    }
  }
  return bestIndex;
}
```

### 10. Dry Run
Input: `[3, 7, 2, 9, 4]`

| i | nums[i] | bestValue before | condition | bestValue after | bestIndex after |
|---|---|---|---|---|---|
| 0 (seed) | 3 | — | — | 3 | 0 |
| 1 | 7 | 3 | 7 > 3 | 7 | 1 |
| 2 | 2 | 7 | 2 > 7? no | 7 | 1 |
| 3 | 9 | 7 | 9 > 7 | 9 | 3 |
| 4 | 4 | 9 | 4 > 9? no | 9 | 3 |

Final answer: `3` (index of value `9`)

### 11. Complexity Analysis
- **Time: O(n)** — same single pass as plain traversal; capturing the index adds no
  extra asymptotic cost.
- **Space: O(1)** — one extra integer variable (`bestIndex`) compared to plain
  traversal.

### 12. Common Mistakes
- ❌ Updating `bestValue` but forgetting to update `bestIndex` in the same branch,
  leaving them out of sync.
- ❌ Seeding `bestIndex = -1` but then forgetting to handle the case where no element
  ever satisfies the condition (returning `-1` may or may not be the intended contract —
  make sure it matches the problem).
- ❌ Using `>=` instead of `>` (or vice versa) when the problem asks for the *first*
  vs. the *last* occurrence of a tie.

### 13. Edge Cases
- Multiple elements tied for the best value — decide explicitly whether you want the
  first or last matching index, and choose `>` vs `>=` accordingly.
- Empty array — there is no valid index; return a sentinel like `-1` and document it.
- Single-element array — the seed alone is the answer; the loop body never executes.

### 14. Interview Explanation
"Index Tracking is the same single pass as ordinary traversal, but instead of only
remembering the best *value*, I also remember the *index* where that value occurred, by
updating both together whenever the condition is met. It costs nothing extra
asymptotically — I already have the index for free as the loop variable — so it's still
O(n) time and O(1) space, but now I can answer 'where,' not just 'what.'"

### 15. Related Problems & Revision Box
- **LC1** — Two Sum (HashMap-based Index Tracking — index stored as the map value)
- **LC414** — Third Maximum Number (multiple tracked values, same principle)
- **LC896** — Monotonic Array (index tracking used to detect a direction break)

> **Revision Box**
> Formula/invariant: *update value and index together, in the same branch, every time.*
> Mental model in one phrase: *write down the address, not just the fact.*
> Complexity: *O(n) time, O(1) extra space.*

---

# C. Prefix Family

## C.1 Prefix Sum

### 1. Definition
Prefix Sum is a precomputation technique where `prefix[i]` stores the sum of all
elements from the start of the array up to and including index `i`. Once built, the sum
of any range `[left, right]` can be answered in O(1) by subtracting two prefix values,
instead of re-summing the range each time.

### 2. Why This Pattern Exists
- **Brute force:** answering "what's the sum from index `left` to `right`?" by looping
  through the range directly costs O(range length) per query.
- **What it wastes:** if the same array is queried for many different ranges (`q`
  queries), brute force redoes overlapping work every single time — total cost O(n·q).
- **Why waste is avoidable:** the sum of any range can be expressed as the difference of
  two cumulative totals, both of which can be precomputed once, in a single O(n) pass.
- **This pattern:** trade a one-time O(n) build for O(1) answers to unlimited range-sum
  queries afterward.

### 3. Engineering Intuition (Mental Model)
Think of a bank balance. Every deposit (`nums[i]`) adds to whatever the balance already
was. `prefix[i]` is simply "my balance right after transaction `i`." If you want to know
how much money came in *between* transaction 3 and transaction 7, you don't need to
re-read every transaction in between — you just take the balance after transaction 7 and
subtract the balance right before transaction 3. The running balance already encodes
everything that happened before it.

### 4. Why It Works (Proof / Reasoning)
By definition, `prefix[i] = nums[0] + nums[1] + ... + nums[i]`. The sum of the range
`[left, right]` is `nums[left] + nums[left+1] + ... + nums[right]`, which is exactly
`prefix[right] - prefix[left-1]` — the total up to `right`, with everything before
`left` subtracted back out. This is a direct algebraic identity, not an approximation,
so it is exact for every valid range, every time.

### 5. Visualization
Array: `[2, 4, 6, 3]`

| i | nums[i] | prefix[i] |
|---|---|---|
| 0 | 2 | 2 |
| 1 | 4 | 6 |
| 2 | 6 | 12 |
| 3 | 3 | 15 |

Range sum of `[1, 2]` (values `4, 6`): `prefix[2] - prefix[0] = 12 - 2 = 10`. ✓ (4+6=10)

### 6. Recognition Signal
The problem statement mentions: *range sum*, *sum between indices*, *multiple queries*
on the same array, or "how much in total between position A and B" phrased as a query
you'll be asked repeatedly.

### 7. Algorithm (Step-by-Step)
1. Build `prefix` array of the same length as `nums`.
2. `prefix[0] = nums[0]`.
3. For each subsequent index `i`: `prefix[i] = prefix[i-1] + nums[i]`.
4. To answer a range query `[left, right]`: if `left === 0`, return `prefix[right]`;
   otherwise return `prefix[right] - prefix[left-1]`.

### 8. Pseudocode
```
function buildPrefix(nums):
    prefix = new array of length(nums)
    prefix[0] = nums[0]
    for i from 1 to length(nums) - 1:
        prefix[i] = prefix[i-1] + nums[i]
    return prefix

function rangeSum(prefix, left, right):
    if left == 0:
        return prefix[right]
    return prefix[right] - prefix[left - 1]
```

### 9. JavaScript Implementation
```js
class PrefixSum {
  constructor(nums) {
    this.prefix = new Array(nums.length);
    this.prefix[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i]; // carry the running balance forward
    }
  }

  // Inclusive range [left, right]
  rangeSum(left, right) {
    if (left === 0) return this.prefix[right]; // no "before left" balance to subtract
    return this.prefix[right] - this.prefix[left - 1];
  }
}
```

### 10. Dry Run
Build phase on `[2, 4, 6, 3]`:

| i | nums[i] | prefix[i-1] | prefix[i] |
|---|---|---|---|
| 0 | 2 | — | 2 |
| 1 | 4 | 2 | 6 |
| 2 | 6 | 6 | 12 |
| 3 | 3 | 12 | 15 |

Query `rangeSum(1, 3)`: `left != 0`, so `prefix[3] - prefix[0] = 15 - 2 = 13`
(check: 4+6+3 = 13 ✓)

### 11. Complexity Analysis
- **Time: build O(n)** — one pass to compute all prefix values; **query O(1)** — a
  single subtraction regardless of range size.
- **Space: O(n)** — the prefix array itself is the same size as the input.

### 12. Common Mistakes
- ❌ Forgetting the `left === 0` special case, causing `prefix[left - 1]` to read
  `prefix[-1]` (`undefined`), corrupting the subtraction.
- ❌ Off-by-one on the range boundaries — mixing up inclusive vs. exclusive `right`.
- ❌ Rebuilding the prefix array for every query instead of once up front, silently
  regressing back to O(n) per query.

### 13. Edge Cases
- Single-element array — `prefix[0] = nums[0]`, and the only valid range is `[0, 0]`.
- Query where `left === right` — should return exactly `nums[left]`.
- All-zero or all-negative arrays — the algebra still works identically; no special
  casing needed beyond the `left === 0` boundary.

### 14. Interview Explanation
"Prefix Sum precomputes the running total up to every index in one O(n) pass. Once
built, the sum of any range is just the difference of two precomputed totals — subtract
what came before the range from what came up to the end of the range — which is O(1) per
query. It turns what would be O(n) per query, or O(n·q) across many queries, into O(n)
total build time plus O(1) per query, at the cost of O(n) extra space to store the
prefix array."

### 15. Related Problems & Revision Box
- **LC303** — Range Sum Query - Immutable
- **LC724** — Find Pivot Index (prefix sum used to compare left-total vs right-total)

> **Revision Box**
> Formula/invariant: `rangeSum(l, r) = prefix[r] - prefix[l-1]` (or `prefix[r]` if `l==0`).
> Mental model in one phrase: *bank balance — subtract the balance before you started.*
> Complexity: *O(n) build, O(1) query, O(n) space.*

---

## C.2 Prefix Product

### 1. Definition
Prefix Product is the multiplicative analogue of Prefix Sum: `product[i]` stores the
running product of all elements from the start up to and including index `i`. It is most
commonly combined with its mirror, **Suffix Product**, to answer "product of everything
except this index" without division.

### 2. Why This Pattern Exists
- **Brute force:** for "product of array except self" at every index, recomputing the
  product of all *other* elements from scratch at each index costs O(n) per index,
  O(n²) total.
- **What it wastes:** re-multiplying the same elements over and over across different
  indices.
- **Why waste is avoidable:** you'd think division fixes this in O(n) — compute the
  total product once, then divide by `nums[i]` at each index — but this **breaks** the
  moment any element is `0` (division by zero) or if there are multiple zeros (every
  result becomes `0` incorrectly, or undefined).
- **This pattern:** precompute a prefix product (product of everything to the left) and
  a suffix product (product of everything to the right) separately, then multiply the
  two at each index — no division required, and zeros are handled naturally because they
  only zero out one side, not both, unless the zero itself is at that index.

### 3. Engineering Intuition (Mental Model)
Picture a line of dominoes, each one's fall multiplying into the next. `product[i]` is
"the combined effect of every domino up through position `i`." Now imagine a *second*
line of dominoes falling from the right end backward — that's the suffix product. The
answer for "everything except position `i`" is simply: how far the dominoes fell from
the left before reaching `i`, multiplied by how far they fell from the right before
reaching `i`. Neither line ever includes position `i` itself.

### 4. Why It Works (Proof / Reasoning)
For any index `i`, "product of everything except `nums[i]`" is exactly
`(product of nums[0..i-1]) * (product of nums[i+1..n-1])` — a direct partition of the
array into "everything before `i`" and "everything after `i`," which together with
`nums[i]` covers the whole array with no overlap. Prefix product gives the first factor
directly; suffix product gives the second. Multiplying them is a straightforward
application of the associative property of multiplication — no approximation, and
critically, no division, so zeros never cause an undefined operation.

### 5. Visualization
Array: `[1, 2, 3, 4]`

| i | nums[i] | prefix (excl. i) | suffix (excl. i) | answer |
|---|---|---|---|---|
| 0 | 1 | 1 | 24 | 24 |
| 1 | 2 | 1 | 12 | 12 |
| 2 | 3 | 2 | 4 | 8 |
| 3 | 4 | 6 | 1 | 6 |

(Here "prefix (excl. i)" means the product of everything strictly before `i`, and
"suffix (excl. i)" means the product of everything strictly after `i`.)

### 6. Recognition Signal
The problem statement mentions: *product except self*, *running multiplication*, or any
phrasing where each output element depends on multiplying together "everything but this
one."

### 7. Algorithm (Step-by-Step)
1. Create an output array `answer` of the same length as `nums`.
2. First pass (left to right): `answer[i]` = product of everything strictly before `i`
   (start with `1` for index `0`, since there's nothing before it).
3. Second pass (right to left): maintain a running suffix product, and multiply it into
   `answer[i]` at each step (start with `1` for the last index).
4. `answer` now holds "product of everything except `nums[i]`" at each position.

### 8. Pseudocode
```
function productExceptSelf(nums):
    n = length(nums)
    answer = new array of length n, filled with 1

    prefix = 1
    for i from 0 to n - 1:
        answer[i] = prefix
        prefix = prefix * nums[i]

    suffix = 1
    for i from n - 1 down to 0:
        answer[i] = answer[i] * suffix
        suffix = suffix * nums[i]

    return answer
```

### 9. JavaScript Implementation
```js
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // First pass: answer[i] becomes the product of everything to the LEFT of i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i]; // extend the running left-product AFTER using it
  }

  // Second pass: multiply in the product of everything to the RIGHT of i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i]; // extend the running right-product AFTER using it
  }

  return answer;
}
```

### 10. Dry Run
Input: `[1, 2, 3, 4]`

**Pass 1 (prefix, left to right):**

| i | prefix before | answer[i] | prefix after |
|---|---|---|---|
| 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 2 |
| 2 | 2 | 2 | 6 |
| 3 | 6 | 6 | 24 |

**Pass 2 (suffix, right to left):**

| i | answer[i] before | suffix before | answer[i] after | suffix after |
|---|---|---|---|---|
| 3 | 6 | 1 | 6 | 4 |
| 2 | 2 | 4 | 8 | 12 |
| 1 | 1 | 12 | 12 | 24 |
| 0 | 1 | 24 | 24 | 24 |

Final: `[24, 12, 8, 6]` ✓ (matches the visualization table above)

### 11. Complexity Analysis
- **Time: O(n)** — two linear passes, each doing O(1) work per element.
- **Space: build O(n)** for the output array (which is required by the problem anyway);
  **O(1)** truly extra space beyond the output, since `prefix` and `suffix` are single
  running scalars, not arrays.

### 12. Common Mistakes
- ❌ Using division (`totalProduct / nums[i]`) — breaks entirely if any element is `0`,
  and gives wrong answers (or NaN) with multiple zeros.
- ❌ Multiplying `prefix` into `answer[i]` *before* reading it, instead of *after* —
  this accidentally includes `nums[i]` itself in its own answer.
- ❌ Forgetting to initialize `prefix`/`suffix` to `1`, not `0` — multiplying by `0`
  zeroes out everything downstream.

### 13. Edge Cases
- Exactly one zero in the array — every output except the position of that zero should
  be `0`; the zero's own position should hold the product of everything else.
- Multiple zeros — every output becomes `0`, since every position now has at least one
  zero among "everything except itself."
- Single-element array — there is nothing to multiply "except itself"; typically defined
  to return `[1]`.

### 14. Interview Explanation
"Prefix Product asks for the product of everything except the current index, and the
naive approach of dividing by the total product breaks the moment there's a zero. So
instead I do two passes: one left-to-right building the product of everything before
each index, one right-to-left building the product of everything after each index, and I
multiply the two together at each position. It's O(n) time, and O(1) extra space beyond
the required output array, with no division anywhere."

### 15. Related Problems & Revision Box
- **LC238** — Product of Array Except Self

> **Revision Box**
> Formula/invariant: `answer[i] = (product before i) * (product after i)`, no division.
> Mental model in one phrase: *two lines of falling dominoes, from each end.*
> Complexity: *O(n) time, O(1) extra space (excluding required output).*

---

## C.3 Difference Array

### 1. Definition
A Difference Array is a technique for applying the same update to many overlapping
ranges efficiently: instead of updating every element within `[left, right]` directly,
you record only that a change of `+value` starts at `left` and a change of `-value`
starts right after `right`. Taking the prefix sum of this "difference" array at the end
reconstructs the final, fully-updated array.

### 2. Why This Pattern Exists
- **Brute force:** applying `q` range updates directly, each touching up to `n`
  elements, costs O(n·q) in the worst case.
- **What it wastes:** re-touching every single element inside a range on every update,
  even when many updates overlap the same region repeatedly.
- **Why waste is avoidable:** you don't actually need to know the array's state *during*
  the updates — only its *final* state, after all updates are applied. So instead of
  applying each update eagerly, you can just mark where each update begins and ends, and
  reconstruct the final values in one O(n) sweep at the very end.
- **This pattern:** turn each O(range length) update into an O(1) marker write, and pay
  a single O(n) reconstruction cost once, regardless of how many updates you applied.

### 3. Engineering Intuition (Mental Model)
Think of an electric switch controlling a strip of lights. To turn on lights from
position 2 to position 5, you don't walk down the strip flipping each bulb — you flip
the switch **ON** at position 2, and flip a switch **OFF** at position 6 (one past where
the range should stop). If you then walk down the strip once, keeping a running "how many
switches are currently ON" counter, that counter tells you the brightness at every
position — without ever having touched each bulb individually during the update phase.

### 4. Why It Works (Proof / Reasoning)
The prefix sum of the difference array at index `i` equals the sum of all `+value` and
`-value` markers placed at or before `i`. A `+value` marker at `left` contributes
`+value` to every prefix sum from `left` onward; the `-value` marker at `right + 1`
cancels that contribution starting exactly one position past where the range should end.
So for any index `i`, the prefix sum at `i` equals the sum of `value` for every range
`[left, right]` such that `left <= i <= right` — which is precisely the definition of
"total amount added to position `i` across all updates." This is an exact algebraic
cancellation, not an approximation.

### 5. Visualization
Apply `+3` to range `[2, 5]` on a base array of zeros, length 8:

```
Difference array markers:
index:   0  1  2  3  4  5  6  7
diff:    0  0 +3  0  0  0 -3  0

Prefix sum of diff (= final array):
index:   0  1  2  3  4  5  6  7
final:   0  0  3  3  3  3  0  0
```

The `+3` "switches on" at index 2 and the `-3` "switches off" at index 6 — one past the
last index (5) that should receive the update.

### 6. Recognition Signal
The problem statement mentions: *many range updates*, *range increments applied
repeatedly*, *flight bookings* (seats reserved across a range of flights), *batch range
updates*, or any scenario where you apply the same kind of change to overlapping
intervals many times and only need the final result.

### 7. Algorithm (Step-by-Step)
1. Create a `diff` array of length `n + 1` (the extra slot avoids a boundary check when
   `right === n - 1`), initialized to zero.
2. For each update `(left, right, value)`: `diff[left] += value` and
   `diff[right + 1] -= value`.
3. After all updates are recorded, compute the prefix sum of `diff` (ignoring the extra
   last slot) — this prefix sum **is** the final array.

### 8. Pseudocode
```
function applyRangeUpdates(n, updates):
    diff = new array of length n + 1, filled with 0
    for (left, right, value) in updates:
        diff[left] += value
        diff[right + 1] -= value

    result = new array of length n
    running = 0
    for i from 0 to n - 1:
        running += diff[i]
        result[i] = running
    return result
```

### 9. JavaScript Implementation
```js
function applyRangeUpdates(n, updates) {
  const diff = new Array(n + 1).fill(0); // +1 avoids a right === n-1 boundary check

  for (const [left, right, value] of updates) {
    diff[left] += value;       // switch ON at the start of the range
    diff[right + 1] -= value;  // switch OFF one position past the end of the range
  }

  const result = new Array(n);
  let running = 0;
  for (let i = 0; i < n; i++) {
    running += diff[i]; // prefix sum reconstructs the true value at position i
    result[i] = running;
  }
  return result;
}
```

### 10. Dry Run
`n = 8`, updates = `[[2, 5, 3]]` (add 3 to range [2, 5])

**Marking phase:**
`diff[2] += 3` → `diff = [0,0,3,0,0,0,0,0,0]`
`diff[6] -= 3` → `diff = [0,0,3,0,0,0,-3,0,0]`

**Reconstruction phase:**

| i | diff[i] | running before | running after (= result[i]) |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 |
| 2 | 3 | 0 | 3 |
| 3 | 0 | 3 | 3 |
| 4 | 0 | 3 | 3 |
| 5 | 0 | 3 | 3 |
| 6 | -3 | 3 | 0 |
| 7 | 0 | 0 | 0 |

Final: `[0, 0, 3, 3, 3, 3, 0, 0]` — matches the visualization above.

### 11. Complexity Analysis
- **Time: each range update is O(1)** (two array writes); **final reconstruction is
  O(n)** (one prefix-sum pass). **Total: O(n + q)** for `q` updates, versus **O(n·q)**
  for applying each update directly — a decisive win when `q` is large.
- **Space: O(n)** for the difference array itself.

### 12. Common Mistakes
- ❌ Forgetting the `+1` on the "switch off" index (`diff[right + 1]` instead of
  `diff[right]`) — this would cancel the update one position too early, excluding the
  last valid index of the range.
- ❌ Sizing the `diff` array as exactly length `n` instead of `n + 1` — this causes an
  out-of-bounds write when `right === n - 1`.
- ❌ Trying to read intermediate array values *during* the update phase — the diff array
  only represents the correct final values *after* the reconstruction prefix sum; it is
  not a valid snapshot mid-way through applying updates.

### 13. Edge Cases
- A range update covering the entire array (`left = 0, right = n - 1`) — should still
  work cleanly using the `n + 1`-sized diff array.
- Overlapping updates on the same range — their effects should simply add up correctly
  through the prefix sum, with no special-casing needed.
- Zero updates — the reconstructed array should just be all zeros.

### 14. Interview Explanation
"Difference Array is for when you have many range updates and only care about the final
result. Instead of touching every element in a range on every update — which is
O(range length) each time — I just mark where an update starts with a `+value` and where
it should stop with a `-value`, one position past the range's end. Each marker write is
O(1). At the very end, I take a single prefix sum over the marker array, and that
reconstructs the fully updated array in O(n). So overall it's O(n + q) instead of
O(n·q), where q is the number of range updates."

### 15. Related Problems & Revision Box
- **LC370** — Range Addition
- **LC1109** — Corporate Flight Bookings

> **Revision Box**
> Formula/invariant: `diff[left] += v; diff[right+1] -= v;` then prefix-sum at the end.
> Mental model in one phrase: *electric switch — flip ON at the start, OFF right after.*
> Complexity: *O(1) per update, O(n) final build, O(n) space.*

---

*(End of Part 1 — Foundations, Traversal Family, Prefix Family. Continue with Part 2:
Two Pointer Family + Sliding Window Family.)*