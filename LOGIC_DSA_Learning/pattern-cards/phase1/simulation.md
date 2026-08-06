# Pattern Card — Simulation Pattern

## Recognition

Question asks:

- Spiral Traversal
- Robot Movement
- Grid Navigation
- Follow Instructions
- Perform Operations Step-by-Step

Immediately suspect Simulation Pattern.

---

## Definition

Simulation means executing every step exactly as described,

instead of directly calculating the final answer.

---

## Mental Model

Imagine controlling a robot.

The robot follows movement rules one step at a time.

---

## Core Idea

Do not search for a shortcut.

Maintain the current state

↓

Apply one rule

↓

Update the state

↓

Repeat

---

## Spiral Matrix

Movement Order

Top

↓

Right

↓

Bottom

↓

Left

↓

Shrink Boundaries

↓

Repeat

---

## State Variables

top

bottom

left

right

---

## Boundary Updates

top++

right--

bottom--

left++

---

## Complexity

Time

O(rows × cols)

Space

O(1)

---

## Engineering Idea

Simulation problems are solved by maintaining the current state instead of predicting the final state.

---

## Common Mistakes

❌ Forgetting boundary updates

❌ Missing

left++

❌ Missing

Boundary Checks

if(top <= bottom)

if(left <= right)

❌ Printing already visited elements

---

## Recognition

Use Simulation when:

- Rules are explicitly given
- Movement matters
- Every step changes the state
- Direct mathematical solution is difficult

---

## LeetCode

✅ LC54 — Spiral Matrix

---

## Interview Sentence

Simulation solves problems by maintaining the current state and executing each rule sequentially until the process is complete.
