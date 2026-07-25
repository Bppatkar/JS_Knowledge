# Arrays Interview Notes

## Maximum Pattern

Recognition:

Highest / Largest / Maximum

Complexity:

O(n)

Space:

O(1)

---

## Minimum Pattern

Recognition:

Lowest / Smallest / Cheapest

Complexity:

O(n)

Space:

O(1)

---

## Best Index Tracking

Return index instead of value.

Remember:

First Occurrence

>

Last Occurrence

> =

Minimum First

<

Minimum Last

<=

---

## Interview Communication

Problem

↓

Pattern

↓

Algorithm

↓

Complexity

↓

Optimization

Never jump directly to code.

---

## Engineering Examples

- CPU Monitoring
- Response Time
- Richest Customer
- Peak Traffic
- Highest Sales


---

# Day 5 Interview Notes

## Prefix Sum

Recognition

Repeated Range Sum Queries

---

## Why Prefix Sum?

Repeated traversal wastes time.

Precompute cumulative sums once.

Answer each query in O(1).

---

## Dummy Zero

Purpose

Remove boundary conditions.

Universal Formula

Prefix[R+1]-Prefix[L]

---

## Common Mistakes

Using nums[i]

instead of

nums[i-1]

Wrong Prefix Length

Forgetting Prefix[0]=0

---

## Interview Explanation

"I observed repeated range sum calculations.

Instead of recalculating every query,

I precomputed cumulative sums once.

Each query is answered in O(1)."

---

## Engineering Examples

Revenue Dashboard

Analytics

Caching

Database Aggregation

Monitoring Systems

Load Balancing (Pivot Index)
---
# Day 6 Interview Notes

## Pattern

Difference Array

---

## Recognition

Use Difference Array when:

- Multiple Range Updates
- Same operation on an entire range
- Final updated array required

---

## Interview Explanation

Difference Array stores events instead of values.

It marks:

- Where an effect starts
- Where an effect stops

A single Prefix Sum reconstructs the final updated array.

---

## Difference Array vs Prefix Sum

### Prefix Sum

Purpose

Fast Queries

Stores

Cumulative Values

Use Case

Many Queries

---

### Difference Array

Purpose

Fast Updates

Stores

Change Events

Use Case

Many Range Updates

---

## Complexity

Brute Force

O(Q × N)

Difference Array

O(Q + N)

Space

O(N)

---

## Common Interview Questions

Q.
Why use R + 1?

Ans.

Because R also belongs to the updated range.
The effect should stop AFTER R.

---

Q.

Why only one Prefix Sum?

Ans.

All updates are stored first.
Prefix reconstructs everything together.

---

Q.

Why is Difference Array called inverse of Prefix Sum?

Ans.

Prefix Sum converts values into cumulative information.

Difference Array stores only changes and uses Prefix Sum later to reconstruct values.

---

## Engineering Examples

- Payroll Increment
- Railway Pricing
- Flight Fare Updates
- Booking Timeline
- Database Batch Update
- Event Scheduling