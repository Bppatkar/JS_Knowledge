# Traversal Pattern

## Recognition

Use this pattern when every element of an array needs to be visited exactly once.

## Visualization

Imagine walking through a line of people one by one without skipping anyone.

## Engineering Analogy

- Reading server logs
- Processing API responses
- Rendering UI lists
- Scanning database records

## Generic Algorithm

1. Start from index 0.
2. Visit each element.
3. Perform the required operation.
4. Move to the next index.

## Pseudocode

FOR every element in array

```
Read current element

Process it
```

END

## Time Complexity

O(n)

## Space Complexity

O(1)

## Common Bugs

- Off-by-one errors
- Incorrect loop boundary
- Skipping the first element
- Skipping the last element

## Related Patterns

- State Update
- Count Pattern
- Linear Search
- Maximum Pattern

## Recognition Keywords

Traverse

Visit every element

Process entire array

## Interview Tip

If every element must be examined, traversal is usually the first pattern to consider.
