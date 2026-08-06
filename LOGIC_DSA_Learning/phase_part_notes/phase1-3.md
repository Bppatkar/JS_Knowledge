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