//! Hashing -
//* Definition - A technique that helps us perform very fast lookup by storing data in a special structure.
// OR
//* Hashing is a technique designed to make lookups fast by using extra memory.

//? what we learn here - How to remember information while processing data.

//!  Checklist
/*
Whenever you see a new problem in this Phase 2, start asking:

Do I need to remember something I've seen before?
Am I repeatedly searching for the same value?
Am I counting occurrences?
Am I checking whether something already exists?
Do I need fast lookup?

If you answer yes to any of these, your brain should start thinking:

"Maybe Hashing can help."
*/

//! Engineering Thinking
/*
Remember Phase 1. We often traded extra computation to save time later. Example: Prefix Sum.

Extra Array
↓
Faster Queries

Hashing follows the same philosophy, but with a different trade - off.  Instead of storing prefix values, we store information.
So the trade becomes:

More Memory
  ↓
Less Computation
  ↓
Faster [Less Time]

This is called a Time vs Memory Trade - off.

  Trade - off(Hindi): Ek cheez paane ke liye doosri cheez ka thoda sacrifice karna.
*/

//! The Core Problem
/*
Notice something.  The problem is not storing data.  Arrays already store data very well.
The real problem is:  Finding the data quickly.
This is the first mental model of Hashing.

Storage ❌
Lookup ✅

///* Arrays are optimized for:  Store data in order.
///* Hashing is optimized for: Find data quickly.

This is why Hashing was invented.

The whole purpose of Hashing is:

Without Traversal
        ↓
Direct Lookup

///* just remember this mental model:

Array
↓
Search
↓
Traversal

///? vs

Hash Structure
↓
Lookup
↓
Direct Answer
*/


//! Lookup Table - A data structure designed for extremely fast searching.
/*
The array already maps:
Index
↓
Value
ex- 0 → 15
---------
But Hashing lets you choose the key. Instead of 0 → 15

You can have
15 → true or
15 → Index 0 or
15 → "Found"

---

Arrays

Index
↓
Value

Lookup Tables

Any Key
↓
Any Value
*/

//! 🧠 First Hashing Pattern Preview
/*
Pattern 1 [Purpose: Presence Checking]

Key
↓
true

Pattern 2 [Purpose: Mapping]
Key
↓
Information
*/

//! Hash Function - it is a function that converts a key into a small integer (index). [Converts any key into an array index]
//! Why can't we simply use an array for storing user emails like: lookup["bhanu@gmail.com"] instead of a HashMap?
//? Because array limitation - we cant use string as a key,
///*  - good Hash Function should satisfy these three properties - 
/* 
1 - be fast - means computing index quickly
2 - be deterministic - means same input same output everyime
3 - spread data evenly
*/