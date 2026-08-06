# State Update Pattern

## Recognition

Use when a variable changes while traversing an array.

## Visualization

Carry a notebook while walking through the array. Update the notebook whenever new information is found.

## Engineering Analogy

* Running total
* User balance updates
* Notification count
* Shopping cart total
* API request counter

## Generic Algorithm

Initialize state.

Traverse the array.

Update state based on current element.

Return final state.

## Time Complexity

O(n)

## Space Complexity

O(1)

## Common Bugs

* Forgetting initialization
* Updating state at the wrong time
* Resetting state accidentally

## Related Patterns

* Running Count
* Maximum Pattern
* Prefix Sum

## Recognition Keywords

Update

Maintain

Track

Running value

## Interview Tip

Ask yourself:
"What information should survive to the next iteration?"
