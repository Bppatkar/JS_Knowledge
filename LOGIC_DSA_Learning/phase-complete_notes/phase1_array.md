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
# Phase1_Array.md — Part 3
### Kadane's Algorithm + Cyclic Sort + Matrix Family

*(Continues directly from Part 2 — Two Pointer Family, Sliding Window Family.
Concatenate after Part 2. No front matter repeated here.)*

---

# F. Kadane's Algorithm

## 1. Definition
Kadane's Algorithm finds the maximum-sum contiguous subarray in a single linear pass, by
maintaining, at every index, the best sum of a subarray that *ends exactly at that
index*, and taking the running maximum of that quantity across the whole array.

## 2. Why This Pattern Exists
- **Brute force:** checking the sum of every possible contiguous subarray directly costs
  O(n²) (or O(n³) if each sum is recomputed from scratch instead of incrementally).
- **What it wastes:** most of those subarrays are provably worse than a shorter or
  differently-positioned one — specifically, a subarray extended by a negative running
  total is always worse than simply starting fresh at the next element.
- **Why waste is avoidable:** at every index, there are really only two candidates worth
  considering — extend the best subarray ending at the previous index, or abandon it and
  start a brand new subarray here — and comparing just those two options is enough to
  guarantee the true global maximum is found somewhere along the way.
- **This pattern:** collapse the search from "consider every subarray" down to "at each
  index, decide continue-or-restart," reducing O(n²) to O(n).

## 3. Engineering Intuition (Mental Model)
Think of tracking your net profit day by day while trading. Some days you're up, some
days you're down. If your cumulative profit *so far* ever dips into a state where
carrying it forward would only drag down tomorrow's number, you mentally "reset" and
start counting fresh from today — you carry the profit, but you drop the loss. You never
literally lose money by doing this; it's a bookkeeping decision about which run to keep
counting.

## 4. Why It Works (Proof / Reasoning)
Define `currentSum[i]` = the maximum sum of any contiguous subarray that *ends* exactly
at index `i`. There are only two ways such a subarray can be formed: either it consists
of just `nums[i]` alone, or it extends the best subarray ending at `i-1` by including
`nums[i]`. Formally:

```
currentSum[i] = max(nums[i], currentSum[i-1] + nums[i])
```

This is a valid recurrence because any subarray ending at `i` either has length 1 (just
`nums[i]`) or length > 1, in which case removing its last element gives a subarray ending
at `i-1`, and to maximize the sum, that shorter subarray must itself be the best possible
subarray ending at `i-1` — which is exactly `currentSum[i-1]` by definition. The global
answer is `max` over all `currentSum[i]`, since the best subarray overall must end
*somewhere*, and every possible ending index is considered.

## 5. Visualization

```
Array:        -2   1  -3   4  -1   2   1
currentSum:   -2   1  -2   4   3   5   6
bestSum:      -2   1   1   4   4   5   6
```

At index 2 (`nums[2] = -3`), `currentSum` would be `1 + (-3) = -2` if extended, versus
`-3` alone — extending is still better here (`-2 > -3`), so it's kept, even though it's
negative; the *decision* is still "extend," it's just that neither option is great at
that particular index. At index 3 (`nums[3] = 4`), extending gives `-2 + 4 = 2`, but
starting fresh gives `4` alone — `max(4, 2) = 4`, so the algorithm restarts here.

## 6. Recognition Signal
The problem statement mentions: *maximum sum*, *contiguous subarray*, and typically
requires an O(n) solution given constraint sizes that rule out O(n²).

## 7. Algorithm (Step-by-Step)
1. Initialize `currentSum = nums[0]` and `bestSum = nums[0]` (seed with the first
   element, never with `0`).
2. For each subsequent index `i`: `currentSum = max(nums[i], currentSum + nums[i])`.
3. Update `bestSum = max(bestSum, currentSum)`.
4. After the loop, `bestSum` holds the maximum subarray sum.

## 8. Pseudocode
```
function kadane(nums):
    currentSum = nums[0]
    bestSum = nums[0]
    for i from 1 to length(nums) - 1:
        currentSum = max(nums[i], currentSum + nums[i])
        bestSum = max(bestSum, currentSum)
    return bestSum
```

## 9. JavaScript Implementation
```js
function maxSubArray(nums) {
  let currentSum = nums[0]; // seed with first element — NOT 0, handles all-negative arrays
  let bestSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Decide: extend the previous run, or abandon it and restart here
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    bestSum = Math.max(bestSum, currentSum);
  }
  return bestSum;
}
```

## 10. Dry Run
Input: `[-2, 1, -3, 4, -1, 2, 1]`

| i | nums[i] | currentSum + nums[i] | nums[i] alone | currentSum (max of the two) | bestSum |
|---|---|---|---|---|---|
| 0 (seed) | -2 | — | — | -2 | -2 |
| 1 | 1 | -2+1=-1 | 1 | 1 | 1 |
| 2 | -3 | 1-3=-2 | -3 | -2 | 1 |
| 3 | 4 | -2+4=2 | 4 | 4 | 4 |
| 4 | -1 | 4-1=3 | -1 | 3 | 4 |
| 5 | 2 | 3+2=5 | 2 | 5 | 5 |
| 6 | 1 | 5+1=6 | 1 | 6 | 6 |

Final answer: `6` (subarray `[4, -1, 2, 1]`)

## 11. Complexity Analysis
- **Time: O(n)** — a single pass, with O(1) work (two comparisons) per index.
- **Space: O(1)** — only `currentSum` and `bestSum` are stored, regardless of input
  size.

## 12. Common Mistakes
- ❌ Seeding `currentSum = 0` instead of `nums[0]` — this silently breaks on
  all-negative arrays, since `0` would incorrectly look like a valid "empty subarray"
  option when the problem requires a non-empty subarray.
- ❌ Forgetting that an all-negative array still has a correct answer: the single least
  negative element, not `0`.
- ❌ Updating `bestSum` before computing the new `currentSum`, using a stale value from
  the previous iteration.

## 13. Edge Cases
- Single-element array — the loop never executes; the seed value is the correct and
  only possible answer.
- All-negative array — the correct answer is the maximum (least negative) single
  element, which the seed-with-`nums[0]` approach handles correctly.
- All-positive array — `currentSum` should never reset; it simply grows to the full
  array's sum.

## 14. Interview Explanation
"Kadane's Algorithm tracks, at every index, the best sum of a subarray ending exactly
there. At each step I decide whether to extend the previous best run by including the
current element, or abandon it and start fresh — whichever gives a larger sum. I take
that as the new running value, and separately track the best value seen across the whole
scan, since the best subarray ending at the very last index isn't necessarily the global
best. It's O(n) time and O(1) space because each index only requires comparing two
numbers."

## 15. Related Problems & Revision Box
- **LC53** — Maximum Subarray

> **Revision Box**
> Formula/invariant: `currentSum = max(nums[i], currentSum + nums[i])`.
> Mental model in one phrase: *carry the profit, drop the loss.*
> Complexity: *O(n) time, O(1) space.*

---

# G. Cyclic Sort

## 1. Definition
Cyclic Sort places every number directly at its "correct" index — computed straight from
its value — for arrays whose elements are guaranteed to lie within a known, small range
such as `1..n` or `0..n`, without needing a general-purpose comparison-based sort.

## 2. Why This Pattern Exists
- **Brute force:** running a general sort (`Array.prototype.sort`, merge sort, etc.)
  costs O(n log n), even though the values are known to lie in a tightly bounded range
  where a much cheaper placement strategy is possible.
- **What it wastes:** comparison-based sorting spends time discovering relative order
  between elements via comparisons, when for range-bounded values the correct final
  position of every element is already known directly from its value — no comparisons
  are needed at all.
- **Why waste is avoidable:** if value `v` belongs at index `v - 1` (for a `1..n` range)
  or index `v` (for a `0..n` range), you can place each element directly by swapping it
  into that position — repeatedly, until the element that lands in the current slot
  already belongs there.
- **This pattern:** achieve correct placement in O(n) by direct index computation and
  swapping, entirely avoiding the O(n log n) lower bound that applies to
  comparison-based sorting.

## 3. Engineering Intuition (Mental Model)
Picture a classroom where every student has an assigned seat number written on their
shirt. A teacher walks down the row of seats: at each seat, if the student sitting there
doesn't belong (their shirt number doesn't match the seat number), the teacher swaps them
with whoever is currently sitting in *their* correct seat. This repeats at the same seat
until whoever ends up there actually belongs — only then does the teacher move to the
next seat.

## 4. Why It Works (Proof / Reasoning)
The key invariant is: *once index `i` holds a value that belongs there (`nums[i] == i +
1` for the `1..n` convention), it is never disturbed again*, because every subsequent
swap only ever touches indices that haven't yet been finalized. Each swap places at
least one additional element into its final correct position (the element that was
swapped *into* the current index either belongs there — loop ends — or gets swapped out
again later when its own correct index is visited, but crucially, every swap strictly
increases the count of correctly-placed elements over the course of the whole algorithm,
so the total number of swaps across the entire run is bounded by `n`).

## 5. Visualization
Sorting `[3, 1, 5, 4, 2]` into `1..5` positions (`index = value - 1`):

```
i=0: nums[0]=3, belongs at index 2. Swap → [5, 1, 3, 4, 2]
i=0: nums[0]=5, belongs at index 4. Swap → [2, 1, 3, 4, 5]
i=0: nums[0]=2, belongs at index 1. Swap → [1, 2, 3, 4, 5]
i=0: nums[0]=1, belongs at index 0. Correct! Move to i=1.
i=1: nums[1]=2, belongs at index 1. Correct! Move to i=2.
... (already sorted)
Result: [1, 2, 3, 4, 5]
```

## 6. Recognition Signal
The problem statement mentions: *numbers from 1 to n*, *numbers from 0 to n*, *missing
number*, *duplicate number*, *first missing positive*, or any scenario where the array's
values are explicitly bounded to a known range tied to the array's own length.

## 7. Algorithm (Step-by-Step)
1. Set `i = 0`.
2. While `i < n`:
   a. Compute `correctIndex` for `nums[i]` (e.g., `nums[i] - 1` for a `1..n` range).
   b. If `nums[i]` is within the valid range **and** `nums[i] !== nums[correctIndex]`:
      swap `nums[i]` and `nums[correctIndex]`. Do **not** advance `i` — recheck the new
      value now sitting at `i`.
   c. Otherwise (already correct, or out of range/duplicate): advance `i` by 1.
3. After the loop, every value that could be correctly placed is at its correct index.

## 8. Pseudocode
```
function cyclicSort(nums):
    i = 0
    n = length(nums)
    while i < n:
        correctIndex = nums[i] - 1
        if nums[i] >= 1 and nums[i] <= n and nums[i] != nums[correctIndex]:
            swap(nums[i], nums[correctIndex])
        else:
            i = i + 1
    return nums
```

## 9. JavaScript Implementation
```js
// Cyclic sort for values in range 1..n
function cyclicSort(nums) {
  let i = 0;
  const n = nums.length;

  while (i < n) {
    const correctIndex = nums[i] - 1; // where nums[i] SHOULD live

    // Only swap if the value is in valid range AND it's not already in place
    // (the second check is what prevents infinite loops on duplicates)
    if (nums[i] >= 1 && nums[i] <= n && nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
      // do NOT increment i — recheck the newly-placed value at position i
    } else {
      i++;
    }
  }
  return nums;
}

// Example downstream use: find the first missing positive after cyclic sort
function firstMissingPositive(nums) {
  cyclicSort(nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1; // first index that doesn't hold its own value+1
  }
  return nums.length + 1; // array was 1..n exactly — the missing value is one past the end
}
```

## 10. Dry Run
Input: `[3, 1, 5, 4, 2]`

| i | nums[i] | correctIndex | nums[correctIndex] | equal? | action | array after |
|---|---|---|---|---|---|---|
| 0 | 3 | 2 | 5 | no | swap | [5,1,3,4,2] |
| 0 | 5 | 4 | 2 | no | swap | [2,1,3,4,5] |
| 0 | 2 | 1 | 1 | no | swap | [1,2,3,4,5] |
| 0 | 1 | 0 | 1 | yes | i++ | [1,2,3,4,5] |
| 1 | 2 | 1 | 2 | yes | i++ | (unchanged) |
| 2..4 | already correct | — | — | yes | i++ each time | (unchanged) |

Final: `[1, 2, 3, 4, 5]`

## 11. Complexity Analysis
- **Time: O(n)** — although there's a nested-looking swap inside a `while`, each swap
  places at least one more element into its final correct position, and once an element
  is correctly placed it is never moved again. So the total number of swaps across the
  *entire* algorithm is bounded by `n`, giving amortized O(n), not O(n²).
- **Space: O(1)** — sorting happens in place; only the loop index and a temporary swap
  are used.

## 12. Common Mistakes
- ❌ Swapping unconditionally, without checking `nums[i] !== nums[correctIndex]` first —
  this causes an **infinite loop** the moment there's a duplicate value, since swapping
  two equal values does nothing but repeats forever.
- ❌ Forgetting the range check (`nums[i] >= 1 && nums[i] <= n`) — attempting to compute
  `correctIndex` for an out-of-range value causes an out-of-bounds array access.
- ❌ Incrementing `i` immediately after a swap — this skips rechecking the new value that
  just landed at index `i`, which might itself need to be swapped again.

## 13. Edge Cases
- Array already fully sorted (`[1, 2, 3, ..., n]`) — every check finds `nums[i] ===
  nums[correctIndex]` immediately, so `i` simply increments through with zero swaps.
- Array with duplicates — the equality check prevents infinite loops; duplicates
  naturally get skipped once one copy occupies the correct slot.
- Array with values outside `1..n` (e.g., negative numbers, or values `> n`) — the range
  check causes those positions to simply be skipped (`i++`), since they can never belong
  anywhere in this array.

## 14. Interview Explanation
"Cyclic Sort works when array values are known to lie in a range tied to the array's own
length, like 1 to n. Instead of comparing elements to each other like a general sort, I
compute each value's correct index directly and swap it there — repeating at the same
position until the value that lands there actually belongs. Because every swap places at
least one more element into its final position permanently, the total number of swaps
across the whole run is bounded by n, giving O(n) time and O(1) space, in place, no
general sorting required."

## 15. Related Problems & Revision Box
- **LC268** — Missing Number
- **LC448** — Find All Numbers Disappeared in an Array
- **LC41** — First Missing Positive
- **LC287** — Find the Duplicate Number (theory reference — cyclic sort's placement
  logic directly motivates why a duplicate must exist and where a mismatch will surface)

> **Revision Box**
> Formula/invariant: *swap only when the value is in range AND not already correctly placed.*
> Mental model in one phrase: *students finding their assigned seats.*
> Complexity: *O(n) time, O(1) space.*

---

# H. Matrix Family

## H.1 Matrix Fundamentals & Traversal Orders

### 1. Definition
A matrix is a two-dimensional array — an array of arrays — accessed via two indices,
`matrix[row][col]`, where `row` selects the horizontal band and `col` selects the
position within that band.

### 2. Why This Pattern Exists
- **Brute force:** there isn't a "more brute" version of basic matrix access — like
  plain array traversal, it's the baseline every matrix algorithm builds on.
- **What it wastes:** N/A at this foundational level.
- **Why waste is avoidable:** N/A.
- **This pattern:** understanding the exact traversal orders (row-wise, column-wise,
  boundary) precisely is what makes every more advanced matrix technique (transpose,
  rotate, spiral) legible, since each of those is just a specific, structured traversal
  order layered with extra logic.

### 3. Engineering Intuition (Mental Model)
Think of a matrix as a spreadsheet. Rows run horizontally (like spreadsheet rows 1, 2,
3...), columns run vertically (like spreadsheet columns A, B, C...). "Row-wise
traversal" means reading the spreadsheet the way you'd read a page of text — left to
right, then down to the next line. "Column-wise" means reading down each column fully
before moving to the next one, like scanning down one field of a form at a time.

### 4. Why It Works (Proof / Reasoning)
Correctness of any traversal order follows directly from covering every valid `(row,
col)` pair exactly once, in a well-defined, non-overlapping sequence. Row-wise traversal
(outer loop over rows, inner loop over columns) visits `(0,0), (0,1), ..., (0, cols-1),
(1,0), ...` — a strict enumeration with no gaps and no repeats, by construction of the
nested loop bounds. The same argument applies symmetrically to column-wise traversal
with the loop order swapped.

### 5. Visualization

```
Row-wise order (outer=row, inner=col):
(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)
(2,0) (2,1) (2,2)
Visit sequence: (0,0)→(0,1)→(0,2)→(1,0)→(1,1)→(1,2)→(2,0)→(2,1)→(2,2)

Column-wise order (outer=col, inner=row):
Visit sequence: (0,0)→(1,0)→(2,0)→(0,1)→(1,1)→(2,1)→(0,2)→(1,2)→(2,2)
```

Diagonals:

```
Main diagonal (row == col):        Secondary diagonal (row + col == n-1):
1 . .                                . . 3
. 5 .                                . 5 .
. . 9                                7 . .
```

### 6. Recognition Signal
The problem statement mentions: *rows and columns*, *grid*, *image*, *2D array*, or any
task that requires printing, visiting, or transforming every cell of a matrix in a
specific structured order.

### 7. Algorithm (Step-by-Step) — Row-wise Traversal
1. For `row` from `0` to `rows - 1`:
2. For `col` from `0` to `cols - 1`:
3. Process `matrix[row][col]`.

### 8. Pseudocode
```
function rowWiseTraversal(matrix):
    for row from 0 to rows(matrix) - 1:
        for col from 0 to cols(matrix) - 1:
            process(matrix[row][col])
```

### 9. JavaScript Implementation
```js
function rowWiseTraversal(matrix) {
  const result = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      result.push(matrix[row][col]); // process each cell in row-major order
    }
  }
  return result;
}

function mainDiagonal(matrix) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][i]); // row == col
  }
  return result;
}
```

### 10. Dry Run
Input: `[[1,2],[3,4]]`, row-wise traversal:

| row | col | matrix[row][col] | result so far |
|---|---|---|---|
| 0 | 0 | 1 | [1] |
| 0 | 1 | 2 | [1,2] |
| 1 | 0 | 3 | [1,2,3] |
| 1 | 1 | 4 | [1,2,3,4] |

### 11. Complexity Analysis
- **Time: O(rows × cols)** — every cell is visited exactly once.
- **Space: O(1)** beyond the output, if any output is required at all; O(rows × cols)
  if the traversal builds a result array of every visited value.

### 12. Common Mistakes
- ❌ Swapping the loop order without intending to (accidentally doing column-wise when
  row-wise was required, or vice versa) — subtly wrong output order.
- ❌ Using `matrix.length` for the column bound instead of `matrix[0].length` — this is
  a very common bug when the matrix isn't square, silently truncating or overrunning
  rows.
- ❌ Assuming all rows have the same length without verifying — a "ragged" matrix
  (rows of different lengths) breaks bound assumptions.

### 13. Edge Cases
- Empty matrix (`[]`) or a matrix with empty rows (`[[]]`) — loops should simply not
  execute; guard against reading `matrix[0].length` on an empty matrix.
- Single row or single column matrix — traversal order still works correctly, just
  degenerates to a simple 1D scan.
- Non-square matrix — row-wise/column-wise traversal is unaffected, but any square-only
  technique (transpose, rotate) does not directly apply without adjustment.

### 14. Interview Explanation
"A matrix is just a 2D array accessed by row and column index. Row-wise traversal nests
a column loop inside a row loop; column-wise swaps that order. Every matrix technique
after this — transpose, rotation, spiral traversal — is built from this same nested-loop
foundation, just with a more specific visiting order or extra bookkeeping layered on
top."

### 15. Related Problems & Revision Box
- General printing/visiting matrix problems; foundational for every pattern below.

> **Revision Box**
> Formula/invariant: *outer loop picks the "slow" axis, inner loop picks the "fast" axis.*
> Mental model in one phrase: *an Excel sheet — rows horizontal, columns vertical.*
> Complexity: *O(rows × cols) time.*

---

## H.2 Matrix Transpose

### 1. Definition
Transposing a matrix converts every row into a column and vice versa — formally,
`transposed[col][row] = matrix[row][col]` for every valid `(row, col)`, which is
equivalent to mirroring the matrix across its main diagonal.

### 2. Why This Pattern Exists
- **Brute force:** building a brand new matrix and copying every element into its
  swapped position costs O(n²) time **and** O(n²) extra space for the new matrix.
- **What it wastes:** for a square matrix, the extra space is entirely unnecessary — the
  transpose can be achieved by swapping elements in place.
- **Why waste is avoidable:** every off-diagonal element has exactly one "mirror
  partner" across the main diagonal; swapping each such pair directly achieves the
  transpose without ever needing a second matrix.
- **This pattern:** swap only the upper triangle (elements above the main diagonal) with
  their lower-triangle mirror partners, achieving an in-place transpose in O(1) extra
  space.

### 3. Engineering Intuition (Mental Model)
Think of folding a square piece of paper along its main diagonal (top-left to
bottom-right corner). Every point on one side of the fold lands exactly on its mirrored
partner on the other side. Transposing is performing that fold digitally — swapping each
point with the one it lands on.

### 4. Why It Works (Proof / Reasoning)
For any off-diagonal pair `(row, col)` with `row < col`, transposing requires
`matrix[row][col]` and `matrix[col][row]` to swap places — this is a single, self-
contained pair-swap, independent of every other pair. Diagonal elements (`row == col`)
map to themselves and need no swap at all. If the loop only iterates `col` starting from
`row + 1` (strictly the upper triangle), every off-diagonal pair is swapped **exactly
once** — swapping the full matrix (both triangles) would swap each pair twice, silently
undoing the transpose and returning the original matrix.

### 5. Visualization

```
Original:            Transposed:
1 2 3                1 4 7
4 5 6      →          2 5 8
7 8 9                3 6 9

Swap (0,1)↔(1,0): 2↔4
Swap (0,2)↔(2,0): 3↔7
Swap (1,2)↔(2,1): 6↔8
Diagonal (0,0),(1,1),(2,2) untouched.
```

### 6. Recognition Signal
The problem statement mentions: *transpose*, or is a sub-step of a larger problem (like
Rotate Image) that requires converting rows into columns as an intermediate step.

### 7. Algorithm (Step-by-Step)
1. For `row` from `0` to `n - 1`:
2. For `col` from `row + 1` to `n - 1` (strictly upper triangle only):
3. Swap `matrix[row][col]` and `matrix[col][row]`.

### 8. Pseudocode
```
function transpose(matrix):
    n = length(matrix)
    for row from 0 to n - 1:
        for col from row + 1 to n - 1:
            swap(matrix[row][col], matrix[col][row])
```

### 9. JavaScript Implementation
```js
function transpose(matrix) {
  const n = matrix.length;
  for (let row = 0; row < n; row++) {
    for (let col = row + 1; col < n; col++) { // starts at row+1: upper triangle ONLY
      [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
    }
  }
  return matrix;
}
```

### 10. Dry Run
Input: `[[1,2,3],[4,5,6],[7,8,9]]`

| row | col | swap pair | matrix after |
|---|---|---|---|
| 0 | 1 | (0,1)↔(1,0) | [[1,4,3],[2,5,6],[7,8,9]] |
| 0 | 2 | (0,2)↔(2,0) | [[1,4,7],[2,5,6],[3,8,9]] |
| 1 | 2 | (1,2)↔(2,1) | [[1,4,7],[2,5,8],[3,6,9]] |

Final: `[[1,4,7],[2,5,8],[3,6,9]]` ✓

### 11. Complexity Analysis
- **Time: O(n²)** — every off-diagonal pair is visited (and swapped) exactly once;
  there are `n(n-1)/2` such pairs, which is O(n²).
- **Space: O(1)** — the swap happens in place, with no auxiliary matrix.

### 12. Common Mistakes
- ❌ Iterating `col` from `0` instead of `row + 1` — this swaps every pair **twice**
  (once as `(row,col)` and again later as `(col,row)`), silently returning the original
  matrix unchanged.
- ❌ Applying this in-place technique to a non-square matrix — the transpose of an
  `m × n` matrix is `n × m`, which cannot be done in place within the original array's
  shape; a new matrix is required in that case.
- ❌ Forgetting that diagonal elements need no action at all — attempting to "swap"
  `matrix[row][row]` with itself is harmless but wasted work if not explicitly skipped
  by the loop bound.

### 13. Edge Cases
- `1×1` matrix — no swaps occur; the matrix is trivially its own transpose.
- Non-square matrix — the in-place algorithm as described does **not** apply directly;
  a separate output matrix is required.
- Matrix already symmetric — transposing produces an identical matrix, though the swaps
  still execute (each swap exchanges two equal values, which is harmless).

### 14. Interview Explanation
"Transpose mirrors the matrix across its main diagonal — row and column indices swap for
every element. I do it in place by only iterating the upper triangle, starting each
inner loop at `row + 1`, and swapping each element with its mirror partner below the
diagonal. If I iterated the full matrix instead of just the upper triangle, I'd swap
every pair twice and undo the transpose entirely. It's O(n²) time, matching the number
of elements, and O(1) space since it's done in place."

### 15. Related Problems & Revision Box
- Used as a direct sub-step of **LC48** — Rotate Image (see below)

> **Revision Box**
> Formula/invariant: *swap only the upper triangle (`col` starts at `row + 1`).*
> Mental model in one phrase: *folding a square sheet of paper along its diagonal.*
> Complexity: *O(n²) time, O(1) space.*

---

## H.3 Rotate Image

### 1. Definition
Rotate Image rotates a square matrix 90 degrees in place — clockwise or
counter-clockwise — by composing two simpler operations: a full transpose, followed by
reversing either every row (for clockwise) or every column (for counter-clockwise).

### 2. Why This Pattern Exists
- **Brute force:** computing the rotated matrix directly by mapping each source
  position to its destination position in a brand-new matrix costs O(n²) time and O(n²)
  extra space.
- **What it wastes:** the extra matrix is unnecessary — rotation can be decomposed into
  two operations that are each individually achievable in place.
- **Why waste is avoidable:** a 90-degree clockwise rotation is mathematically
  equivalent to transposing the matrix, then reversing each row — two operations already
  known to work in-place from the previous two sections (Transpose, and Opposite
  Direction Two Pointer for the row reversal).
- **This pattern:** compose two already-in-place primitives to achieve the full rotation
  with zero extra matrix allocation.

### 3. Engineering Intuition (Mental Model)
Picture converting each column of the original matrix into a row (that's the transpose
step) — but the columns, read top-to-bottom, become rows read in the *wrong* left-to-
right order for a clockwise rotation. Reversing each of those new rows fixes the
orientation, completing the 90-degree clockwise turn. It's like flipping a photo: first
you tilt it onto its side (transpose), then you flip each strip left-right to make it
look correctly oriented (reverse rows).

### 4. Why It Works (Proof / Reasoning)
A 90-degree clockwise rotation maps the element originally at `(row, col)` to the new
position `(col, n-1-row)`. Transposing maps `(row, col) → (col, row)`. Reversing each row
afterward maps a value now at `(col, row)` to `(col, n-1-row)` — because reversing row
`col` moves the element from column-index `row` to column-index `n-1-row`. Composing
these two mappings gives exactly `(row, col) → (col, n-1-row)`, matching the definition
of a clockwise rotation precisely. The counter-clockwise case follows symmetrically by
reversing columns instead of rows after transposing.

### 5. Visualization

```
Original:        Transpose:        Reverse each row (clockwise):
1 2 3             1 4 7              7 4 1
4 5 6     →       2 5 8      →       8 5 2
7 8 9             3 6 9              9 6 3
```

### 6. Recognition Signal
The problem statement mentions: *rotate the matrix/image*, *90 degrees clockwise/
counter-clockwise*, *in place*, for a square 2D grid.

### 7. Algorithm (Step-by-Step)
1. Transpose the matrix in place (swap upper triangle with lower triangle, as in H.2).
2. For clockwise rotation: reverse every row in place (opposite-direction two-pointer
   swap within each row).
   For counter-clockwise rotation: reverse every column in place instead.
3. The matrix is now rotated 90 degrees, with no extra matrix allocated.

### 8. Pseudocode
```
function rotateClockwise(matrix):
    transpose(matrix)
    for row in matrix:
        reverse(row)

function rotateCounterClockwise(matrix):
    transpose(matrix)
    reverseEachColumn(matrix)
```

### 9. JavaScript Implementation
```js
function transpose(matrix) {
  const n = matrix.length;
  for (let row = 0; row < n; row++) {
    for (let col = row + 1; col < n; col++) {
      [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
    }
  }
}

function reverseRow(row) {
  let left = 0;
  let right = row.length - 1;
  while (left < right) {
    [row[left], row[right]] = [row[right], row[left]];
    left++;
    right--;
  }
}

// 90 degrees CLOCKWISE, in place
function rotate(matrix) {
  transpose(matrix);           // step 1: rows become columns
  for (const row of matrix) {
    reverseRow(row);            // step 2: reverse each row to complete the clockwise turn
  }
  return matrix;
}
```

### 10. Dry Run
Input: `[[1,2,3],[4,5,6],[7,8,9]]`

**After transpose:** `[[1,4,7],[2,5,8],[3,6,9]]`

**After reversing each row:**

| row before reverse | row after reverse |
|---|---|
| [1,4,7] | [7,4,1] |
| [2,5,8] | [8,5,2] |
| [3,6,9] | [9,6,3] |

Final: `[[7,4,1],[8,5,2],[9,6,3]]` ✓ (matches the visualization above)

### 11. Complexity Analysis
- **Time: O(n²)** — transpose is O(n²) (as established), and reversing every row is also
  O(n²) total across all rows (n rows × O(n) per row) — combined, still O(n²), not
  O(n⁴) or anything worse, since the two O(n²) steps simply add.
- **Space: O(1)** — both sub-steps operate in place; no auxiliary matrix is ever
  allocated.

### 12. Common Mistakes
- ❌ Reversing columns instead of rows for a **clockwise** rotation (columns are correct
  only for counter-clockwise) — a very common mix-up.
- ❌ Transposing twice by accident (e.g., calling `transpose` in a loop, or misordering
  helper calls) — two transposes cancel out and return the original matrix.
- ❌ Forgetting the transpose loop bound (`col = row + 1`, not `col = 0`) — as covered
  in H.2, this silently breaks the transpose sub-step and corrupts the whole rotation.

### 13. Edge Cases
- `1×1` matrix — transpose and row-reversal are both no-ops; the "rotated" matrix is
  identical to the original, correctly.
- Matrix with all identical values — rotation still executes correctly (swaps of equal
  values are harmless), and the result is visually unchanged, which is correct.
- Rotating 180 or 270 degrees — achievable by applying the 90-degree clockwise rotation
  multiple times (2x for 180, 3x for 270, or -1x/270 for counter-clockwise).

### 14. Interview Explanation
"Rotating a matrix 90 degrees clockwise in place is transpose, then reverse every row.
Transposing turns columns into rows; reversing each row then fixes the left-right
orientation to complete the clockwise turn. Both sub-steps are individually in-place —
transpose swaps only the upper triangle, and row reversal uses the standard
opposite-direction two-pointer swap — so the whole rotation needs zero extra matrix
allocation, running in O(n²) time and O(1) space."

### 15. Related Problems & Revision Box
- **LC48** — Rotate Image

> **Revision Box**
> Formula/invariant: *clockwise = transpose + reverse rows; counter-clockwise = transpose + reverse columns.*
> Mental model in one phrase: *tilt the photo onto its side, then flip each strip.*
> Complexity: *O(n²) time, O(1) space.*

---

## H.4 Spiral Matrix

### 1. Definition
Spiral Matrix traversal visits every cell of a matrix by walking around its outer
boundary — top row left-to-right, right column top-to-bottom, bottom row right-to-left,
left column bottom-to-top — then shrinking the boundary inward and repeating, until the
entire matrix has been visited.

### 2. Why This Pattern Exists
- **Brute force:** there is no simpler "brute force" for this specific visiting order —
  the order itself *is* the requirement of the problem; the challenge is implementing it
  correctly without duplicate visits or missed cells, which naive nested loops don't
  produce directly.
- **What it wastes:** an incorrectly bounded implementation risks re-visiting cells
  already covered by an earlier side of the spiral, or missing the innermost cell(s)
  entirely.
- **Why waste is avoidable:** maintaining four shrinking boundaries (`top`, `bottom`,
  `left`, `right`) and updating them immediately after each side is walked ensures every
  cell is visited exactly once, with explicit guards preventing the last two sides of
  each "ring" from re-walking cells already covered by the first two sides of that ring.
- **This pattern:** simulate the boundary walk directly, shrinking inward after each
  side, rather than trying to derive a closed-form index formula.

### 3. Engineering Intuition (Mental Model)
Picture peeling an onion, layer by layer, but each "layer" is walked as a loop around a
rectangular boundary — starting at the top-left corner of that layer, sweeping right
across the top, down the right side, left across the bottom, and up the left side —
before moving one layer further inward and repeating on the smaller rectangle that
remains.

### 4. Why It Works (Proof / Reasoning)
The four boundaries `top`, `bottom`, `left`, `right` define the current "ring" still
unvisited. Walking the top row moves `top` down by one (since that row is now fully
visited); walking the right column moves `right` left by one; and so on for the bottom
and left sides. The loop continues `while (top <= bottom && left <= right)` — precisely
the condition under which a ring with at least one row and one column of unvisited cells
still remains. The guard checks before the last two sides
(`if (top <= bottom)` before the bottom row, `if (left <= right)` before the left
column) are necessary because, for a ring that has shrunk to a single row or single
column, walking the top row (or right column) alone already covers every remaining cell
— attempting to also walk the "bottom row" or "left column" in that degenerate case
would re-visit cells already covered by the first side of that ring.

### 5. Visualization

```
Matrix:
1  2  3
4  5  6
7  8  9

top=0,bottom=2,left=0,right=2

Top row (left→right):    1 2 3     → top becomes 1
Right col (top→bottom):  6 9       → right becomes 1
Bottom row (right→left): 8 7       → bottom becomes 1     [guard: top(1)<=bottom(1) ✓]
Left col (bottom→top):   4         → left becomes 1        [guard: left(0)<=right(1) ✓... wait, uses pre-shrink right]
Now top=1,bottom=1,left=1,right=1 → loop continues
Top row (left→right):    5         → top becomes 2
Loop ends: top(2) > bottom(1)

Full spiral order: 1, 2, 3, 6, 9, 8, 7, 4, 5
```

### 6. Recognition Signal
The problem statement explicitly asks for elements *"in spiral order,"* or describes a
boundary-peeling visiting pattern for a 2D grid.

### 7. Algorithm (Step-by-Step)
1. Initialize `top = 0`, `bottom = rows - 1`, `left = 0`, `right = cols - 1`.
2. While `top <= bottom && left <= right`:
   a. Walk the top row left→right; then `top++`.
   b. Walk the right column top→bottom; then `right--`.
   c. **If** `top <= bottom`: walk the bottom row right→left; then `bottom--`.
   d. **If** `left <= right`: walk the left column bottom→top; then `left++`.
3. Repeat until the loop condition fails — every cell has been visited exactly once.

### 8. Pseudocode
```
function spiralOrder(matrix):
    result = []
    top, bottom = 0, rows(matrix) - 1
    left, right = 0, cols(matrix) - 1

    while top <= bottom and left <= right:
        for col from left to right:
            result.append(matrix[top][col])
        top = top + 1

        for row from top to bottom:
            result.append(matrix[row][right])
        right = right - 1

        if top <= bottom:
            for col from right down to left:
                result.append(matrix[bottom][col])
            bottom = bottom - 1

        if left <= right:
            for row from bottom down to top:
                result.append(matrix[row][left])
            left = left + 1

    return result
```

### 9. JavaScript Implementation
```js
function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Walk top row, left to right
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++;

    // Walk right column, top to bottom
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;

    // Walk bottom row, right to left — GUARD: only if a bottom row still remains
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--;
    }

    // Walk left column, bottom to top — GUARD: only if a left column still remains
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++;
    }
  }

  return result;
}
```

### 10. Dry Run
Input: `[[1,2,3],[4,5,6],[7,8,9]]`

| Step | Boundaries before | Action | Result so far | Boundaries after |
|---|---|---|---|---|
| 1 | t=0,b=2,l=0,r=2 | top row 0: 1,2,3 | [1,2,3] | t=1 |
| 2 | t=1,b=2,l=0,r=2 | right col: 6,9 | [1,2,3,6,9] | r=1 |
| 3 | t=1,b=2,l=0,r=1 | guard t<=b (1<=2) ✓ bottom row: 8,7 | [...,8,7] | b=1 |
| 4 | t=1,b=1,l=0,r=1 | guard l<=r (0<=1) ✓ left col: 4 | [...,4] | l=1 |
| 5 | t=1,b=1,l=1,r=1 | top row: 5 | [...,5] | t=2 |
| — | t=2,b=1 | loop condition fails (2 > 1) | done | — |

Final: `[1, 2, 3, 6, 9, 8, 7, 4, 5]`

### 11. Complexity Analysis
- **Time: O(rows × cols)** — every cell is visited exactly once across all rings
  combined; the guards prevent any cell from being visited twice.
- **Space: O(1)** extra (excluding the output array, which necessarily holds
  `rows × cols` elements since that's the required output).

### 12. Common Mistakes
- ❌ Missing the `if (top <= bottom)` guard before the bottom-row walk — causes the
  bottom row to be re-walked (duplicating cells) when the ring has shrunk to a single
  row.
- ❌ Missing the `if (left <= right)` guard before the left-column walk — same
  duplication issue for a ring shrunk to a single column.
- ❌ Forgetting to increment/decrement a boundary after walking its side — this causes
  the *next* side's walk to overlap the side just completed.

### 13. Edge Cases
- Single row matrix — only the "top row" walk executes meaningfully; both guards
  prevent the bottom-row and left-column walks from re-processing it.
- Single column matrix — symmetric to the single-row case; the right-column walk covers
  everything, and the remaining guarded walks are skipped.
- Empty matrix — should return an empty result immediately, before touching
  `matrix[0].length`.

### 14. Interview Explanation
"Spiral Matrix simulates walking the boundary of the matrix — top row, right column,
bottom row, left column — shrinking each of four boundary variables inward after
finishing that side, and repeating on the smaller remaining rectangle. The two guard
checks, before the bottom row and before the left column, are essential: once a ring has
shrunk to just one row or one column, the first side already covers every remaining
cell, so walking the 'bottom row' or 'left column' again without the guard would
duplicate cells already visited. It's O(rows × cols) time since every cell is touched
exactly once."

### 15. Related Problems & Revision Box
- **LC54** — Spiral Matrix

> **Revision Box**
> Formula/invariant: *walk top→right→bottom→left, shrinking each boundary; guard the last two sides.*
> Mental model in one phrase: *peeling an onion, one rectangular ring at a time.*
> Complexity: *O(rows × cols) time, O(1) extra space.*

---

*(End of Part 3 — Kadane's Algorithm, Cyclic Sort, Matrix Family. Continue with Part 4:
Simulation + Back Matter — master cheat sheets, cross-pattern comparison, Phase 2
preview.)*
# Phase1_Array.md — Part 4
### Simulation + Back Matter

*(Continues directly from Part 3 — Kadane's Algorithm, Cyclic Sort, Matrix Family.
Concatenate after Part 3. No front matter repeated here.)*

---

# I. Simulation

## 1. Definition
Simulation is the pattern of solving a problem by directly executing the rules it
describes, step by step, exactly as stated — rather than searching for a closed-form
mathematical shortcut or a named algorithmic trick. The "algorithm" *is* the problem's
own stated process.

## 2. Why This Pattern Exists
- **Brute force:** for problems governed by explicit movement or state-transition rules
  (a robot's commands, a game character's turns, cells changing state based on
  neighbors), there often isn't a faster closed-form shortcut at all — trying to derive
  one is usually the wrong instinct and wastes time in an interview.
  wastes time in an interview.
- **What it wastes:** attempting to find a clever mathematical formula for a process that
  is *inherently* sequential and stateful (where step 5 depends on the exact outcome of
  step 4) usually produces something more complex and more bug-prone than just running
  the steps directly.
- **Why waste is avoidable:** the problem statement itself is already a precise
  specification of an algorithm — following it literally, one step at a time, with
  correctly maintained state, **is** the algorithm.
- **This pattern:** trust the literal rules given, translate them directly into code,
  and maintain whatever state (position, direction, boundaries, grid) those rules
  reference — nothing more, nothing less.

## 3. Engineering Intuition (Mental Model)
Think of a robot on a factory floor following a fixed list of movement commands: "move
forward 3 steps, turn right, move forward 2 steps." You don't need a shortcut formula to
know where the robot ends up — you track its current position and facing direction, and
apply each command to that state, one at a time, exactly as instructed. The final
position is just whatever the last applied command leaves you with.

## 4. Why It Works (Proof / Reasoning)
Because a simulation problem's rules define a deterministic sequence of state
transitions, correctness follows directly from correctly implementing each transition
exactly as specified and applying them in the stated order. If state `S(i)` is derived
correctly from `S(i-1)` and the `i`-th rule/command, then by induction the final state
`S(n)` after all `n` steps is guaranteed correct — there is no approximation or shortcut
being taken; the code is a literal transcription of the problem's own process.

## 5. Visualization
Robot simulation example — commands `["forward 2", "right", "forward 1"]`, starting at
`(0,0)` facing "up":

```
Start: position=(0,0), facing=up

"forward 2": position=(0,2)     (moved up 2)
"right":     facing=right       (turned from up to right)
"forward 1": position=(1,2)     (moved right 1)

Final: position=(1,2), facing=right
```

## 6. Recognition Signal
The problem statement mentions: *robot movement*, *game character/turns*, *step-by-step
rules*, *grid movement with explicit commands*, or describes a process where each step's
outcome depends on the exact current state, with no evident closed-form shortcut.

## 7. Algorithm (Step-by-Step)
1. Identify every piece of state the rules reference (position, direction, boundaries,
   grid contents, etc.) and initialize it exactly as the problem specifies.
2. For each step/command/rule, in the order given: apply it to the current state,
   producing the next state.
3. After all steps have been applied, the final state is the answer (or is used to
   derive the answer).

## 8. Pseudocode
```
function simulate(commands, initialState):
    state = initialState
    for command in commands:
        state = applyRule(state, command)
    return state
```

## 9. JavaScript Implementation
```js
// Example: simulate a robot moving on a 2D grid with "forward N", "left", "right"
function simulateRobot(commands) {
  const directions = ["up", "right", "down", "left"]; // clockwise order
  let dirIndex = 0; // starts facing "up"
  let x = 0, y = 0;

  const deltas = {
    up: [0, 1],
    right: [1, 0],
    down: [0, -1],
    left: [-1, 0],
  };

  for (const command of commands) {
    if (command === "left") {
      dirIndex = (dirIndex + 3) % 4; // turn counter-clockwise
    } else if (command === "right") {
      dirIndex = (dirIndex + 1) % 4; // turn clockwise
    } else {
      const steps = parseInt(command.split(" ")[1], 10);
      const [dx, dy] = deltas[directions[dirIndex]];
      x += dx * steps;
      y += dy * steps;
    }
  }
  return [x, y];
}
```

## 10. Dry Run
Input: `["forward 2", "right", "forward 1"]`

| command | dirIndex before | action | dirIndex after | position after |
|---|---|---|---|---|
| forward 2 | 0 (up) | move (0,1)*2 | 0 | (0,2) |
| right | 0 | turn clockwise | 1 (right) | (0,2) |
| forward 1 | 1 (right) | move (1,0)*1 | 1 | (1,2) |

Final: position `(1, 2)`, facing "right" — matches the visualization above.

## 11. Complexity Analysis
- **Time: O(number of commands)** — each command/step is processed exactly once, in O(1)
  (or, for grid-based simulations, O(grid size) if a full grid must be updated per
  step, e.g., a cellular-automaton-style simulation).
- **Space: O(1)** beyond whatever persistent state the problem inherently requires (a
  position and direction are O(1); a full grid being simulated is O(rows × cols)).

## 12. Common Mistakes
- ❌ Searching for a mathematical shortcut for a process that's inherently sequential
  and stateful — this usually produces an incorrect or overcomplicated solution when a
  direct simulation would have been both simpler and correct.
- ❌ Mismanaging direction/state transitions (e.g., turning clockwise when the rule
  means counter-clockwise) — a subtle off-by-one in a modular direction index is one of
  the most common simulation bugs.
- ❌ Applying a rule to a stale copy of the state instead of the most recently updated
  one, breaking the step-by-step dependency chain.

## 13. Edge Cases
- Empty command list — the state should remain at its initial value, unchanged.
- Commands that would move outside a bounded grid (if the problem defines boundaries) —
  decide explicitly whether such commands are clipped, ignored, or cause an error, per
  the problem's rules.
- Repeated/redundant commands (e.g., turning right four times) — should correctly return
  to the original facing direction via the modular arithmetic on the direction index.

## 14. Interview Explanation
"Simulation means implementing the problem's own stated rules directly, step by step,
rather than looking for a mathematical shortcut. I identify exactly what state the rules
reference — position, direction, whatever the problem defines — and apply each rule to
that state in order, since each step's correctness only depends on correctly applying
the previous step. It's usually O(number of steps) time, because each step does a fixed,
bounded amount of work."

## 15. Related Problems & Revision Box
- **LC54** — Spiral Matrix (a boundary-walking simulation — see Matrix Family, H.4)
- Robot movement / grid navigation problems
- Game-of-Life-style step simulations (each generation computed from the previous one's
  state, applied uniformly across the grid)

> **Revision Box**
> Formula/invariant: *implement the stated rules literally; state transitions in the given order.*
> Mental model in one phrase: *a robot following a fixed list of movement commands.*
> Complexity: *O(number of steps) time; space matches whatever state the problem defines.*

---

# Back Matter

## Master Recognition Cheat Sheet

| Pattern | Trigger Keywords |
|---|---|
| Traversal | visit, count, maximum, minimum, linear scan |
| Running State | consecutive, streak, current run, running total |
| Index Tracking | "return the index of," "which position," "where did X happen" |
| Prefix Sum | range sum, multiple queries, running sum |
| Prefix Product | product except self, running multiplication |
| Difference Array | range update, flights, bookings, batch updates |
| Same Direction Two Pointer | remove duplicates/element, move zeros, in place, fast/slow |
| Opposite Direction Two Pointer | pair, reverse, sorted, palindrome |
| Sliding Window (all variants) | subarray, substring, longest, shortest, contiguous |
| Fixed Window | "size = k" |
| Variable Window | longest/shortest satisfying a condition |
| Frequency Window | count of X currently in the window |
| Distinct Window | unique/distinct elements only, no repeats |
| Count Window | "how many subarrays/substrings..." |
| Minimum Window | "minimum window," "smallest substring" |
| Kadane | maximum sum, contiguous |
| Cyclic Sort | missing, duplicate, range 1..n or 0..n |
| Matrix (general) | rows, columns, grid, image |
| Transpose | transpose |
| Rotate | rotate 90 degrees, in place |
| Spiral | "in spiral order" |
| Simulation | movement rules, step-by-step, robot/game/grid commands |

---

## Master Complexity Cheat Sheet

| Pattern | Time | Space |
|---|---|---|
| Traversal | O(n) | O(1) |
| Running State | O(n) | O(1) |
| Index Tracking | O(n) | O(1) |
| Prefix Sum | build O(n), query O(1) | O(n) |
| Prefix Product | O(n) | O(1) extra (excl. output) |
| Difference Array | O(1) per update, O(n) final build | O(n) |
| Two Pointer (both variants) | O(n) | O(1) |
| Sliding Window (all variants) | O(n) | O(1) or O(k) |
| Kadane | O(n) | O(1) |
| Cyclic Sort | O(n) | O(1) |
| Matrix Traversal | O(rows × cols) | O(1) extra |
| Transpose | O(n²) | O(1) |
| Rotate Image | O(n²) | O(1) |
| Spiral Matrix | O(rows × cols) | O(1) extra |
| Simulation | O(number of steps) | matches problem's own state |

---

## Master Mistakes Index

| Pattern | Most Dangerous Mistake |
|---|---|
| Traversal | seeding accumulator with `0` instead of `nums[0]` for max/min problems |
| Running State | forgetting to update `best` every iteration, not just on resets |
| Index Tracking | updating the value but forgetting to update the index in the same branch |
| Prefix Sum | forgetting the `left === 0` boundary case |
| Prefix Product | using division instead of prefix+suffix — breaks on zeros |
| Difference Array | forgetting the `end + 1` marker for the "switch off" |
| Same Direction Two Pointer | advancing slow unconditionally, defeating the pattern |
| Opposite Direction Two Pointer | moving both pointers regardless of comparison outcome |
| Sliding Window (Variable) | using `if` instead of `while` for the shrink check |
| Fixed Window | recomputing the window sum from scratch each slide |
| Frequency Window | leaving stale zero-count entries in the map |
| Distinct Window | checking the Set before adding, forgetting order of operations |
| Count Window | using `max()` instead of `+=` — confusing it with Variable Window |
| Minimum Window | stopping shrink the instant it's valid, instead of shrinking further |
| Kadane | seeding `currentSum = 0` instead of `nums[0]` |
| Cyclic Sort | swapping unconditionally without checking for already-correct/duplicate values (infinite loop) |
| Transpose | iterating the full matrix instead of just the upper triangle (double-swaps back to original) |
| Rotate Image | reversing columns instead of rows for a clockwise rotation |
| Spiral Matrix | missing the `top <= bottom` / `left <= right` guards on the last two sides |
| Simulation | reaching for a mathematical shortcut instead of trusting the literal stated rules |

---

## Cross-Pattern Comparison Table

| Pattern | Core Question It Answers | Wins Over Traversal When... | Wins Over Two Pointer When... | Wins Over Sliding Window When... |
|---|---|---|---|---|
| **Traversal** | "What do I learn by looking at everything once?" | — (this is the baseline) | the problem needs no notion of pairs or windows at all | the problem needs no notion of a contiguous region at all |
| **Two Pointer** | "Can I use two positions and known order (sorted/reverse) to avoid nested comparison?" | the problem is fundamentally about *pairs* or symmetric positions, not single-element accumulation | — | the region of interest isn't necessarily *contiguous*, or is defined by a pair of positions rather than everything between them |
| **Sliding Window** | "What's true about every contiguous region, maintained incrementally?" | the problem is about a *contiguous* subarray/substring's properties, not single elements | the "window" needs to track aggregate state (sum, frequency) across a growing/shrinking range, not just two symmetric positions | — |
| **Prefix Sum/Product/Difference** | "Can I precompute once and answer many range queries/updates in O(1)?" | there are *many repeated queries* over static data, where re-traversing each time would be wasteful | queries are about *ranges*, not pairs of specific positions | the queries don't require incremental expand/shrink — the whole array is static and range-based |
| **Kadane** | "What's the best contiguous run, allowing restart at any point?" | specifically for *maximum-sum contiguous subarray* — a specialized Running State | not a pair-based problem | the "window" doesn't need an explicit validity/shrink condition — restart is the only state transition needed |
| **Cyclic Sort** | "Can I place every value directly using its own value as an index?" | values are known to lie in a *tight, known range* tied to array length, making direct placement possible | not a pair/order-comparison problem | not about contiguous regions at all — about correct absolute positions |
| **Matrix (Transpose/Rotate/Spiral)** | "How do 2D structural transformations decompose into simpler primitives?" | the structure is inherently 2D, not linear | reuses Two Pointer (row reversal) as a sub-step, but adds the 2D transpose layer on top | not a windowing problem — a structural transformation of the whole grid |
| **Simulation** | "What does directly executing the stated rules produce?" | the process is *sequential and stateful* with no evident shortcut, unlike simple accumulation | the "movement" isn't symmetric or pair-based — it's rule-driven | there's no natural contiguous "window" to maintain — just an evolving state |

---

## Phase 2 Preview — What Linear-Array Thinking Does *Not* Cover

Everything in this book assumes the answer can be derived by scanning an array (or grid)
with a bounded amount of carried state — a running sum, a frequency map, two pointers, a
shrinking boundary. That covers an enormous fraction of interview problems, but it
deliberately stops short of several categories of thinking that Phase 2 should pick up:

- **HashMaps and Sets as first-class structures** — this book used them as *supporting*
  state inside Sliding Window and Cyclic Sort, but Phase 2 should treat "can I trade
  O(n) space for O(1) lookup?" as its own primary pattern-selection question (e.g., Two
  Sum via hashing, grouping problems, subarray-sum-equals-k via prefix-sum-plus-hashmap).
- **Stacks and Queues** — including the Monotonic Stack pattern (next-greater-element,
  histogram-area problems), which this book never touched, since it requires maintaining
  an *ordered* auxiliary structure rather than a scalar or a fixed-size map.
- **Linked Lists** — a fundamentally different memory model (no random access, only
  pointer-following), which invalidates several assumptions this book relied on (e.g.,
  Two Pointer still applies conceptually, but "index arithmetic" does not).
- **Binary Search on Answer Spaces** — a search strategy over a *range of possible
  answers* rather than over array positions, which is a different flavor of "shrink the
  search space" than anything in the Sliding Window or Two Pointer families here.

**Progression:** Problem Solver → Software Engineer → SDE-2 → Senior Engineer →
Architect.

---

*(End of Part 4 — Simulation, Back Matter. This completes Phase1_Array.md.)*