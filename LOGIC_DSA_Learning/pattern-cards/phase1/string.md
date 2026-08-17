# 🔤 STRING — PATTERN CARD

## Pattern Name
String Problem-Solving Family

## Recognition

```text
Character-by-character → Traversal
Frequency / mapping → Hashing
Both ends matter → Two Pointer
Contiguous substring → Sliding Window
Palindrome → Two Pointer / Center Expansion
Transform text → Construction
Words/tokens → Parsing
Common beginning → Prefix Comparison
Repeated blocks → Repetition reasoning
```

## Visualization

```text
Odd palindrome:  (i, i)
Even palindrome: (i, i+1)

Window:
left → [ relevant substring ] ← right
```

## Engineering Analogy

Process only the text/state that matters, maintain useful information, and avoid repeating expensive scans.

## Algorithm

1. Decode requirement.
2. Identify character / word / substring / prefix.
3. Read constraints.
4. Identify required state.
5. Choose the appropriate pattern.
6. Maintain the invariant.
7. Build/return the answer.
8. Verify boundaries.
9. Derive TC/SC.

## Pseudo Code

```text
identify required unit
identify state
scan
update state
maintain invariant
resolve answer
analyze TC/SC
```

## JavaScript Notes

- Strings are immutable.
- `str[i]` reads.
- `str[i] = x` does not mutate a string.
- `trim()` returns a new string.
- `substring(start, end)` excludes `end`.
- Character arrays are mutable.

## Complexity

```text
Traversal → O(n)
Hash + String → O(n) average
Two Pointer → O(n)
Sliding Window → O(n)
Center Expansion → O(n²)
```

## Common Bugs

- Wrong substring boundary.
- Forgetting `trim()` is non-mutating.
- Confusing words and characters.
- Wrong window size.
- Missing even centers.
- Using overall string parity to choose one center.
- Confusing mutable arrays with immutable strings.

## Interview Questions

- Why immutable?
- Why fixed window for LC 567?
- Why center expansion is O(n²)?
- Why does LC 647 count every expansion?
- When does hashing beat repeated scanning?

## Related Problems

LC 125, 242, 205, 49, 3, 76, 5, 344, 14, 151, 567, 438, 459, 443, 647.

## Pattern Mixing

```text
String + Hashing
String + Sliding Window
String + Two Pointer
String + Array
String + Parsing
String + Center Expansion
```

## Revision Checklist

- [ ] Immutability
- [ ] Traversal
- [ ] Hashing
- [ ] Two Pointer
- [ ] Sliding Window
- [ ] Parsing
- [ ] Center Expansion
- [ ] Compression
- [ ] Prefix comparison
- [ ] TC/SC
