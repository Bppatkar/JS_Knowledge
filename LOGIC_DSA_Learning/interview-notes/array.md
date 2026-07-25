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
