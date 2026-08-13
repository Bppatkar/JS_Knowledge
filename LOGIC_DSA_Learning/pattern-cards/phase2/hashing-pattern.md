# Phase 2 — Hashing Pattern Card

## Pattern Map

1. Frequency Counting
2. Presence Checking
3. Counting
4. Grouping
5. Mapping
6. Prefix Hash
7. Hash + Sliding Window
8. Hash + Prefix
9. Hash + Two Pointer
10. Custom Hash

## Recognition

```text
Existence → Set
Frequency → value → count
Location → value → index
Grouping → signature → group
Prefix relation → Prefix + Hash
Window state → Hash + Sliding Window
Ordered pair/triplet → consider Sort + Two Pointer
Built-in hashing unavailable → Custom Hash
```

## Prefix Hash

```text
currentPrefix - previousPrefix = target
previousPrefix = currentPrefix - target
```

For longest range:

```text
prefix → earliest index
```

Important:

```js
map.set(0, -1);
```

## Hash + Sliding Window

Maintain:

- frequency
- presence
- last-seen index

## Hash + Two Pointer

LC #15 — 3Sum:

```text
sort → fix i → left/right → compare sum → skip duplicates
```

## Custom Hash

LC #705 — Design HashSet:

```text
key → hash → bucket → collision handling
```

## Core Lesson

Hashing is not “use Map everywhere”.

Ask:

> What information must I remember?

Then let requirements and constraints choose the data structure.
