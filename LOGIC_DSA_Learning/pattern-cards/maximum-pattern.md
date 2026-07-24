# Maximum Pattern

## Recognition

Use this pattern when the problem asks for:

- Maximum value
- Highest score
- Largest number
- Richest customer
- Peak CPU usage
- Highest memory usage
- Fastest speed
- Best value seen so far

Keywords:

- Maximum
- Highest
- Largest
- Richest
- Peak
- Best

---

## Visualization

Imagine holding a trophy.

Initially, the trophy is with the first element.

While traversing:

If a better element is found,
move the trophy.

At the end,
whoever holds the trophy is the answer.

---

## Engineering Analogy

Examples:

- Highest CPU usage
- Peak memory usage
- Maximum sales
- Richest customer
- Highest temperature

---

## Algorithm

1. Initialize best = first element
2. Traverse from index 1
3. Compare current element with best
4. Update best if current is greater
5. Return best

---

## Pseudocode

```
best = arr[0]

for each remaining element

    if current > best

        best = current

return best
```

---

## Complexity

Time: O(n)

Space: O(1)

---

## Common Bugs

❌ Initialize with 0 instead of arr[0]

❌ Start loop from wrong index

❌ Forget to update best

❌ Wrong comparison operator

---

## Interview Questions

- Find maximum element
- Largest number
- Peak temperature
- Highest salary
- Richest customer

---

## Related Patterns

- Minimum Pattern
- Best Index Tracking
- Running Sum
- Pattern Mixing

---

## Revision Checklist

- [ ] Recognize Maximum Pattern
- [ ] Dry Run
- [ ] Explain Algorithm
- [ ] Write Code
- [ ] Explain Complexity
