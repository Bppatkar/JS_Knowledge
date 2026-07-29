# Pattern Card — Variable Size Sliding Window

## Pattern Name

Variable Size Sliding Window

---

## When to Use

Use when:

* Longest Substring
* Shortest Substring
* Maximum Window
* Minimum Window
* Constraints change dynamically
* Window must satisfy a condition

---

## Recognition Words

* Longest
* Shortest
* At most
* At least
* Without repeating
* Replace
* Distinct
* Character frequency
* Continuous subarray
* Continuous substring

---

## Core Idea

Expand the window.

If it becomes invalid,

Shrink it until it becomes valid again.

---

## Generic Template

```
left = 0

for right

    include right element

    while window invalid

        remove left element

        left++

    update answer
```

---

## Window Validity Rule

Every problem defines its own validity rule.

Examples

LeetCode 3

```
No duplicates
```

LeetCode 424

```
(windowLength - maxFreq) <= k
```

---

## Common Data Structures

Presence problems

```
Set
```

Frequency problems

```
Object
Map
Array Frequency
```

---

## Time Complexity

```
O(n)
```

Reason

Each pointer moves only forward.

---

## Space Complexity

Depends on constraints.

Examples

26 characters

```
O(1)
```

General ASCII

```
O(128)
```

Unicode

```
O(n)
```

---

## Interview Tips

Always explain

1. Why Sliding Window?

2. Window validity

3. Expansion

4. Shrinking

5. Complexity proof

---

## Common Mistakes

❌ Forget shrinking

❌ Wrong validity condition

❌ Updating answer before window becomes valid

❌ Recomputing expensive operations unnecessarily

❌ Using Set when frequencies are required

---

## Problems Solved

✅ LeetCode 3

✅ LeetCode 424
