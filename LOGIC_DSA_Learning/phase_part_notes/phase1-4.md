# Phase1_Array.md — Part 4

### Simulation + Back Matter

_(Continues directly from Part 3 — Kadane's Algorithm, Cyclic Sort, Matrix Family.
Concatenate after Part 3. No front matter repeated here.)_

---

# I. Simulation

## 1. Definition

Simulation is the pattern of solving a problem by directly executing the rules it
describes, step by step, exactly as stated — rather than searching for a closed-form
mathematical shortcut or a named algorithmic trick. The "algorithm" _is_ the problem's
own stated process.

## 2. Why This Pattern Exists

- **Brute force:** for problems governed by explicit movement or state-transition rules
  (a robot's commands, a game character's turns, cells changing state based on
  neighbors), there often isn't a faster closed-form shortcut at all — trying to derive
  one is usually the wrong instinct and wastes time in an interview.
  wastes time in an interview.
- **What it wastes:** attempting to find a clever mathematical formula for a process that
  is _inherently_ sequential and stateful (where step 5 depends on the exact outcome of
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

The problem statement mentions: _robot movement_, _game character/turns_, _step-by-step
rules_, _grid movement with explicit commands_, or describes a process where each step's
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
  const directions = ['up', 'right', 'down', 'left']; // clockwise order
  let dirIndex = 0; // starts facing "up"
  let x = 0,
    y = 0;

  const deltas = {
    up: [0, 1],
    right: [1, 0],
    down: [0, -1],
    left: [-1, 0],
  };

  for (const command of commands) {
    if (command === 'left') {
      dirIndex = (dirIndex + 3) % 4; // turn counter-clockwise
    } else if (command === 'right') {
      dirIndex = (dirIndex + 1) % 4; // turn clockwise
    } else {
      const steps = parseInt(command.split(' ')[1], 10);
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

| command   | dirIndex before | action         | dirIndex after | position after |
| --------- | --------------- | -------------- | -------------- | -------------- |
| forward 2 | 0 (up)          | move (0,1)\*2  | 0              | (0,2)          |
| right     | 0               | turn clockwise | 1 (right)      | (0,2)          |
| forward 1 | 1 (right)       | move (1,0)\*1  | 1              | (1,2)          |

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
> Formula/invariant: _implement the stated rules literally; state transitions in the given order._
> Mental model in one phrase: _a robot following a fixed list of movement commands._
> Complexity: _O(number of steps) time; space matches whatever state the problem defines._

---

# Back Matter

## Master Recognition Cheat Sheet

| Pattern                        | Trigger Keywords                                              |
| ------------------------------ | ------------------------------------------------------------- |
| Traversal                      | visit, count, maximum, minimum, linear scan                   |
| Running State                  | consecutive, streak, current run, running total               |
| Index Tracking                 | "return the index of," "which position," "where did X happen" |
| Prefix Sum                     | range sum, multiple queries, running sum                      |
| Prefix Product                 | product except self, running multiplication                   |
| Difference Array               | range update, flights, bookings, batch updates                |
| Same Direction Two Pointer     | remove duplicates/element, move zeros, in place, fast/slow    |
| Opposite Direction Two Pointer | pair, reverse, sorted, palindrome                             |
| Sliding Window (all variants)  | subarray, substring, longest, shortest, contiguous            |
| Fixed Window                   | "size = k"                                                    |
| Variable Window                | longest/shortest satisfying a condition                       |
| Frequency Window               | count of X currently in the window                            |
| Distinct Window                | unique/distinct elements only, no repeats                     |
| Count Window                   | "how many subarrays/substrings..."                            |
| Minimum Window                 | "minimum window," "smallest substring"                        |
| Kadane                         | maximum sum, contiguous                                       |
| Cyclic Sort                    | missing, duplicate, range 1..n or 0..n                        |
| Matrix (general)               | rows, columns, grid, image                                    |
| Transpose                      | transpose                                                     |
| Rotate                         | rotate 90 degrees, in place                                   |
| Spiral                         | "in spiral order"                                             |
| Simulation                     | movement rules, step-by-step, robot/game/grid commands        |

---

## Master Complexity Cheat Sheet

| Pattern                       | Time                              | Space                       |
| ----------------------------- | --------------------------------- | --------------------------- |
| Traversal                     | O(n)                              | O(1)                        |
| Running State                 | O(n)                              | O(1)                        |
| Index Tracking                | O(n)                              | O(1)                        |
| Prefix Sum                    | build O(n), query O(1)            | O(n)                        |
| Prefix Product                | O(n)                              | O(1) extra (excl. output)   |
| Difference Array              | O(1) per update, O(n) final build | O(n)                        |
| Two Pointer (both variants)   | O(n)                              | O(1)                        |
| Sliding Window (all variants) | O(n)                              | O(1) or O(k)                |
| Kadane                        | O(n)                              | O(1)                        |
| Cyclic Sort                   | O(n)                              | O(1)                        |
| Matrix Traversal              | O(rows × cols)                    | O(1) extra                  |
| Transpose                     | O(n²)                             | O(1)                        |
| Rotate Image                  | O(n²)                             | O(1)                        |
| Spiral Matrix                 | O(rows × cols)                    | O(1) extra                  |
| Simulation                    | O(number of steps)                | matches problem's own state |

---

## Master Mistakes Index

| Pattern                        | Most Dangerous Mistake                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| Traversal                      | seeding accumulator with `0` instead of `nums[0]` for max/min problems                         |
| Running State                  | forgetting to update `best` every iteration, not just on resets                                |
| Index Tracking                 | updating the value but forgetting to update the index in the same branch                       |
| Prefix Sum                     | forgetting the `left === 0` boundary case                                                      |
| Prefix Product                 | using division instead of prefix+suffix — breaks on zeros                                      |
| Difference Array               | forgetting the `end + 1` marker for the "switch off"                                           |
| Same Direction Two Pointer     | advancing slow unconditionally, defeating the pattern                                          |
| Opposite Direction Two Pointer | moving both pointers regardless of comparison outcome                                          |
| Sliding Window (Variable)      | using `if` instead of `while` for the shrink check                                             |
| Fixed Window                   | recomputing the window sum from scratch each slide                                             |
| Frequency Window               | leaving stale zero-count entries in the map                                                    |
| Distinct Window                | checking the Set before adding, forgetting order of operations                                 |
| Count Window                   | using `max()` instead of `+=` — confusing it with Variable Window                              |
| Minimum Window                 | stopping shrink the instant it's valid, instead of shrinking further                           |
| Kadane                         | seeding `currentSum = 0` instead of `nums[0]`                                                  |
| Cyclic Sort                    | swapping unconditionally without checking for already-correct/duplicate values (infinite loop) |
| Transpose                      | iterating the full matrix instead of just the upper triangle (double-swaps back to original)   |
| Rotate Image                   | reversing columns instead of rows for a clockwise rotation                                     |
| Spiral Matrix                  | missing the `top <= bottom` / `left <= right` guards on the last two sides                     |
| Simulation                     | reaching for a mathematical shortcut instead of trusting the literal stated rules              |

---

## Cross-Pattern Comparison Table

| Pattern                              | Core Question It Answers                                                               | Wins Over Traversal When...                                                                              | Wins Over Two Pointer When...                                                                                                   | Wins Over Sliding Window When...                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Traversal**                        | "What do I learn by looking at everything once?"                                       | — (this is the baseline)                                                                                 | the problem needs no notion of pairs or windows at all                                                                          | the problem needs no notion of a contiguous region at all                                                                       |
| **Two Pointer**                      | "Can I use two positions and known order (sorted/reverse) to avoid nested comparison?" | the problem is fundamentally about _pairs_ or symmetric positions, not single-element accumulation       | —                                                                                                                               | the region of interest isn't necessarily _contiguous_, or is defined by a pair of positions rather than everything between them |
| **Sliding Window**                   | "What's true about every contiguous region, maintained incrementally?"                 | the problem is about a _contiguous_ subarray/substring's properties, not single elements                 | the "window" needs to track aggregate state (sum, frequency) across a growing/shrinking range, not just two symmetric positions | —                                                                                                                               |
| **Prefix Sum/Product/Difference**    | "Can I precompute once and answer many range queries/updates in O(1)?"                 | there are _many repeated queries_ over static data, where re-traversing each time would be wasteful      | queries are about _ranges_, not pairs of specific positions                                                                     | the queries don't require incremental expand/shrink — the whole array is static and range-based                                 |
| **Kadane**                           | "What's the best contiguous run, allowing restart at any point?"                       | specifically for _maximum-sum contiguous subarray_ — a specialized Running State                         | not a pair-based problem                                                                                                        | the "window" doesn't need an explicit validity/shrink condition — restart is the only state transition needed                   |
| **Cyclic Sort**                      | "Can I place every value directly using its own value as an index?"                    | values are known to lie in a _tight, known range_ tied to array length, making direct placement possible | not a pair/order-comparison problem                                                                                             | not about contiguous regions at all — about correct absolute positions                                                          |
| **Matrix (Transpose/Rotate/Spiral)** | "How do 2D structural transformations decompose into simpler primitives?"              | the structure is inherently 2D, not linear                                                               | reuses Two Pointer (row reversal) as a sub-step, but adds the 2D transpose layer on top                                         | not a windowing problem — a structural transformation of the whole grid                                                         |
| **Simulation**                       | "What does directly executing the stated rules produce?"                               | the process is _sequential and stateful_ with no evident shortcut, unlike simple accumulation            | the "movement" isn't symmetric or pair-based — it's rule-driven                                                                 | there's no natural contiguous "window" to maintain — just an evolving state                                                     |

---

## Phase 2 Preview — What Linear-Array Thinking Does _Not_ Cover

Everything in this book assumes the answer can be derived by scanning an array (or grid)
with a bounded amount of carried state — a running sum, a frequency map, two pointers, a
shrinking boundary. That covers an enormous fraction of interview problems, but it
deliberately stops short of several categories of thinking that Phase 2 should pick up:

- **HashMaps and Sets as first-class structures** — this book used them as _supporting_
  state inside Sliding Window and Cyclic Sort, but Phase 2 should treat "can I trade
  O(n) space for O(1) lookup?" as its own primary pattern-selection question (e.g., Two
  Sum via hashing, grouping problems, subarray-sum-equals-k via prefix-sum-plus-hashmap).
- **Stacks and Queues** — including the Monotonic Stack pattern (next-greater-element,
  histogram-area problems), which this book never touched, since it requires maintaining
  an _ordered_ auxiliary structure rather than a scalar or a fixed-size map.
- **Linked Lists** — a fundamentally different memory model (no random access, only
  pointer-following), which invalidates several assumptions this book relied on (e.g.,
  Two Pointer still applies conceptually, but "index arithmetic" does not).
- **Binary Search on Answer Spaces** — a search strategy over a _range of possible
  answers_ rather than over array positions, which is a different flavor of "shrink the
  search space" than anything in the Sliding Window or Two Pointer families here.

**Progression:** Problem Solver → Software Engineer → SDE-2 → Senior Engineer →
Architect.

---

_(End of Part 4 — Simulation, Back Matter. This completes Phase1_Array.md.)_
