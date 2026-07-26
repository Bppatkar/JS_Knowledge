# Day 05 Revision - Prefix Sum & Precomputation

---

# Topics Covered

- Prefix Sum
- Precomputation
- Range Sum Query
- Dummy Zero Technique
- Index Mapping

---

# Recognition Rules

## Prefix Sum

Use when:

Multiple Range Sum Queries perform karni ho.

Recognition Keywords

- Sum between L and R
- Multiple Queries
- Fast Range Sum
- Repeated Sum Calculation

---

## Precomputation

Use when:

Ek expensive calculation ko sirf ek baar perform karke
future mein baar-baar reuse karna ho.

Formula

Compute Once

↓

Store

↓

Reuse

---

## Range Sum Query

Formula

Without Dummy Zero

prefix[R] - prefix[L-1]

With Dummy Zero

prefix[R+1] - prefix[L]

---

## Dummy Zero Technique

Purpose

Boundary case remove karna.

Without Dummy Zero

if (L == 0)

else

With Dummy Zero

Single Formula

prefix[R+1] - prefix[L]

---

## Index Mapping

Original Array

↓

Prefix Array

Original Index

↓

Prefix Index + 1

---

# Engineering Thinking

Brute Force

Every query

↓

Traverse again

↓

O(N × Q)

Prefix Sum

One Traversal

↓

Store Results

↓

Answer Every Query in O(1)

Total

O(N + Q)

---

# Common Mistakes

❌ Wrong Prefix Formula

❌ Forgetting Dummy Zero

❌ Wrong Index Mapping

❌ Building Prefix Multiple Times

❌ Recalculating Sum Every Query

---

# Interview Notes

Prefix Sum is NOT an optimization trick.

It is a Precomputation Pattern.

Idea

Pay once

↓

Use forever

Real Engineering Examples

- Database Cached Reports
- Analytics Dashboard
- Monthly Sales Summary
- CPU Prefix Calculations
- Financial Reports

---

# 2-Minute Revision Checklist

✅ Prefix Sum

✅ Precomputation

✅ Range Sum Query

✅ Dummy Zero Technique

✅ Index Mapping

✅ O(N + Q)

Pattern Locked ✅
