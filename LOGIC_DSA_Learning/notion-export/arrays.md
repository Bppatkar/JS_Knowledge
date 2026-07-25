# Arrays Notes

## Completed Patterns

- Traversal
- State Update
- Build New Array
- Comparison
- Early Exit
- Linear Search
- Count Pattern
- Running Count Pattern
- Current State vs Best State

## Engineering Concepts Learned

- Contiguous Memory
- Base Address
- Random Access
- Read Index
- Write Index
- State Thinking

## LeetCode Completed

- 1920
- 1480
- 1929
- 485

---

# Minimum / Maximum Pattern

## Patterns Learned

- Maximum Value Tracking
- Minimum Value Tracking
- Best Index Tracking
- First Occurrence
- Last Occurrence
- Pattern Mixing (Introduction)

---

## Engineering Concepts

- Best State Tracking
- Index vs Value
- Current State vs Best State
- Monitoring Systems
- Richest Customer Analytics

---

## LeetCode

### LC 1672

Patterns Used:

- Traversal
- Running Sum
- Best Value Tracking

Pattern Mixing Introduced.

## Next Topics

- Prefix Sum
- Difference Array
- Two Pointer
- Sliding Window
- Kadane
- HashMap
- Matrix

---

# Day 5 — Prefix Sum

## New Patterns Learned

- Prefix Sum
- Precomputation
- Range Sum Query
- Dummy Zero Technique
- Index Mapping

---

## Prefix Construction

Prefix[0] = 0

Prefix[i] = Prefix[i-1] + nums[i-1]

---

## Range Query Formula

Prefix[R+1] - Prefix[L]

---

## Key Discoveries

Repeated Work

↓

Precompute

↓

Store

↓

Reuse

---

Dummy Zero removes edge cases.

---

Index Mapping

Prefix Index

↓

Nums Index

i

↓

i-1

---

## LeetCode

303

724

---

## Engineering Connections

Analytics Dashboard

Caching

Financial Reports

Database Aggregation

Monitoring Systems

---

## Thinking Upgrade

I no longer think:

Question

↓

Loop

Instead I think

Question

↓

Range

↓

Formula

↓

Algorithm

↓

Code
