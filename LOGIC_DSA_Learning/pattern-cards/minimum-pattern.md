# Minimum Pattern

## Recognition

Use this pattern when the problem asks for:

- Minimum value
- Lowest response time
- Cheapest product
- Smallest number
- Lowest temperature

Keywords:

- Minimum
- Lowest
- Smallest
- Cheapest
- Fastest Response Time

---

## Visualization

Hold the trophy with the smallest value.

Whenever a smaller element is found,
move the trophy.

---

## Engineering Analogy

- Lowest API response time
- Cheapest product
- Minimum latency
- Lowest memory usage

---

## Algorithm

1. Initialize minimum = arr[0]
2. Traverse from index 1
3. Compare current with minimum
4. Update if smaller
5. Return minimum

---

## Pseudocode

```
minimum = arr[0]

for each remaining element

    if current < minimum

        minimum = current

return minimum
```

---

## Complexity

Time: O(n)

Space: O(1)

---

## Common Bugs

- Initializing with 0
- Wrong operator
- Skipping first element

---

## Related Patterns

- Maximum Pattern
- Best Index Tracking

---

## Revision Checklist

- [ ] Recognition
- [ ] Dry Run
- [ ] Code
- [ ] Complexity