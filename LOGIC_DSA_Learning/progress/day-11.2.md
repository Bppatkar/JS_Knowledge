# Day 11.2 Progress Report

Date: __________

Phase: Phase 2 — Hashing

Section: Section 2 — JavaScript Hash Data Structures

Status

✅ COMPLETED

---

# Topics Covered

## Object

- Creation
- Insert
- Update
- Delete
- Search
- Iteration
- Object.keys()
- Object.values()
- Object.entries()

Engineering Discussion

- Keys become strings internally
- Real-world entity representation
- Limitations of Object
- CRUD operations

---

## Map

Learned

- new Map()
- set()
- get()
- has()
- delete()
- clear()
- size
- Iteration

Engineering Discussion

- Dynamic Key → Value Mapping
- Primitive keys
- Object keys
- Difference from Object
- CRUD operations

---

## Set

Learned

- new Set()
- add()
- has()
- delete()
- clear()
- size
- Iteration

Engineering Discussion

- Uniqueness Guarantee
- Presence Checking
- Duplicate Removal

---

## WeakMap / WeakSet

Awareness Only

- Object keys only
- Garbage Collection friendly
- High-level understanding

---

# Engineering Mental Models

## Object

Represents

Real-world entities

Examples

- Student
- User
- Product
- Car

---

## Map

Represents

Dynamic Key → Value relationships

Applications

- Frequency
- Presence
- Index Mapping
- Counting
- Cache
- Lookup Tables

---

## Set

Represents

Unique Values

Applications

- Duplicate Detection
- Distinct Values
- Presence Checking

---

# CRUD Cheat Sheet

Object

Create

{}

Insert

obj[key] = value

Search

obj[key]

Delete

delete obj[key]

---

Map

Create

new Map()

Insert / Update

map.set()

Search

map.get()

Exists

map.has()

Delete

map.delete()

Clear

map.clear()

Size

map.size

---

Set

Create

new Set()

Insert

set.add()

Exists

set.has()

Delete

set.delete()

Clear

set.clear()

Size

set.size

---

# Decision Tree

Need only unique values?

↓

Use Set

----------------------------

Need Key → Value?

↓

Yes

↓

Real-world entity?

↓

Use Object

----------------------------

Need dynamic lookup?

↓

Use Map

---

# MIMP

Mistakes

- Initially mixed Object and Array concepts.
- Assumed Object cannot use string keys.

Improvements

- Understood Object internally converts keys to strings.
- Learned why Map was introduced.
- Understood Set is not a Map without values.

Mental Models

Object = Entity

Map = Dynamic Lookup

Set = Unique Values

Patterns

Hash-based thinking starts with choosing the correct data structure.

---

# Interview Questions

- Why Map over Object?
- Why Set over Array?
- When should Object NOT be used?
- Why does Object convert keys to strings?
- Can Map use objects as keys?
- Why is Set useful for duplicate detection?

---

# Section Status

Section 2

✅ COMPLETED