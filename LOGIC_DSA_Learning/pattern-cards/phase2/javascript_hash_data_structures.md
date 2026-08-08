# Pattern Card

# JavaScript Hash Data Structures

---

# Object

Purpose

Represent real-world entities.

Examples

- Student
- User
- Product

CRUD

Create

{}

Insert

obj[key] = value

Search

obj[key]

Delete

delete obj[key]

---

Advantages

- Simple
- Lightweight
- Entity representation

Limitations

- Keys become strings
- Not ideal for dynamic hash lookups
- Object keys are problematic

---

# Map

Purpose

Dynamic Key → Value storage

CRUD

Create

new Map()

Insert

set()

Search

get()

Exists

has()

Delete

delete()

Clear

clear()

Size

size

Advantages

- Any key type
- Predictable behavior
- Better for lookup-heavy problems

Applications

- Frequency
- Presence
- Mapping
- Counting
- Cache

---

# Set

Purpose

Store unique values

CRUD

Create

new Set()

Insert

add()

Search

has()

Delete

delete()

Clear

clear()

Advantages

- Removes duplicates
- Fast presence checking
- Stores only unique values

Applications

- Contains Duplicate
- Distinct Elements
- Unique Visitors

---

# Decision Rule

Entity

↓

Object

--------------------

Dynamic Key → Value

↓

Map

--------------------

Only Unique Values

↓

Set

---

# Active Recall

1. Why Object?

2. Why Map?

3. Why Set?

4. Biggest limitation of Object?

5. Biggest advantage of Set?

6. Biggest advantage of Map?