# Day 11.1 Progress Report

Date: __________
Phase: Phase 2 — Hashing
Section: Section 1 — Hashing Fundamentals

Status:
✅ Completed

---

## Topics Covered

- What is Hashing?
- Why Hashing Exists
- Time vs Memory Trade-off
- Lookup Tables
- Key → Value Mapping
- Hash Function
- Buckets
- Collision
- Collision Resolution (Awareness)
  - Chaining
  - Open Addressing
- Load Factor
- Rehashing (Awareness)
- Average vs Worst Case Complexity

---

## Engineering Thinking Learned

### Memory vs Speed Trade-off

Trade a small amount of extra memory to significantly reduce lookup time.

---

### Lookup Table Thinking

Instead of scanning every element repeatedly, preprocess data once and perform fast lookups.

---

### Hash Function

A hash function converts a key into a bucket index.

Good hash functions should:

- Fast
- Deterministic
- Evenly distribute data

---

### Bucket

A bucket is a storage location where keys are placed after hashing.

Multiple keys may map to the same bucket.

---

### Collision

Collision occurs when two different keys are assigned to the same bucket.

Awareness:

- Chaining
- Open Addressing

---

### Load Factor

Load Factor = Number of Elements / Number of Buckets

High Load Factor

- More collisions
- Slower lookup

Low Load Factor

- Faster lookup
- More unused memory

---

### Rehashing

When Load Factor becomes too high:

- Create more buckets
- Recompute bucket positions
- Reduce collisions

---

## Complexity

Average Lookup

O(1)

Worst Case

O(n)

---

## MIMP

Mistakes

- Initially confused Arrays with Objects.

Improvements

- Understood why lookup tables exist.
- Understood why hashing trades memory for speed.

Mental Models

Hashing = Fast Lookup Machine

Patterns

Hashing enables:

- Presence Checking
- Frequency Counting
- Mapping
- Counting
- Grouping

---

## Interview Ready Statements

- Why does hashing exist?
- Why is O(1) average?
- Why can worst case become O(n)?
- What is Load Factor?
- What is Collision?
- What is Rehashing?

---

## Section Status

Section 1

✅ COMPLETED