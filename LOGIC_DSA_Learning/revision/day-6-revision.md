# Day 06 Revision - Difference Array

---

# Topics Covered

- Difference Array
- Range Update Pattern
- Lazy Update Thinking
- Difference ↔ Prefix Relationship
- Flight Number → Index Mapping
- Boundary Handling

---

# Recognition Rules

## Difference Array

Use when:

Multiple Range Updates perform karni ho.

Recognition Keywords

- Increase all values from L to R
- Add X in a range
- Multiple Updates
- Batch Update
- Interval Update

---

# Core Idea

Never update every element immediately.

Only mark

Where update starts

↓

Where update stops

After all markings

↓

Run ONE Prefix Sum

↓

Get Final Array

---

# Marker Rules

Increase

diff[L] += value

Decrease

diff[R + 1] -= value

Boundary Rule

Apply second marker ONLY IF

R + 1 < Array Length

---

# Difference Array Workflow

Step 1

Create Difference Array

↓

Step 2

Process Every Query

↓

Step 3

Place Start Marker

↓

Step 4

Place Stop Marker

↓

Step 5

Run ONE Prefix Sum

↓

Step 6

Return Final Updated Array

---

# Mapping Rule

Real World

Flight 1

↓

Programming

Index 0

Formula

Index = Flight Number - 1

---

# Engineering Thinking

Brute Force

Every Update

↓

Traverse Whole Range

↓

O(N × Q)

Difference Array

Every Update

↓

Only Two Marks

↓

O(Q)

Final Prefix

↓

O(N)

Total

O(N + Q)

---

# Engineering Connections

- Bulk Salary Increment
- Railway Fare Update
- Flight Booking Seats
- Database Batch Updates
- Event Timeline Updates
- Booking Systems
- Game Buff / Debuff Updates

---

# Common Mistakes

❌ Updating every element

❌ Using '=' instead of '+='

❌ Forgetting R + 1

❌ Wrong Boundary Check

❌ Running Prefix After Every Query

❌ Forgetting Flight Number → Array Index Mapping

❌ Mixing 1-based and 0-based Indexing

---

# Interview Notes

Difference Array is often called the inverse of Prefix Sum.

Prefix Sum

Stores cumulative values.

Difference Array

Stores only where change starts
and where change stops.

One Prefix Sum reconstructs the final array.

---

# 2-Minute Revision Checklist

✅ Difference Array

✅ Two Marker Rule

✅ R + 1 Logic

✅ Boundary Check

✅ Mapping

✅ One Prefix at End

✅ O(N + Q)

Pattern Locked ✅

---

# Problems Solved

✅ LeetCode 1109 - Corporate Flight Bookings

Patterns Used

- Difference Array
- Prefix Sum
- Index Mapping
- Boundary Handling