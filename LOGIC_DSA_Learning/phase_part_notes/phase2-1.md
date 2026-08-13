# Phase2_Hashing.md
### A Permanent Reference — Hashing (HashMap, HashSet, Pattern Family)

**Author:** Bhanu Pratap
**Language:** JavaScript
**Status:** Phase 2 Complete — 10 Patterns
**Phase Lock:** PHASE 2 — HASHING: COMPLETE / LOCKED

---

## Goal

Master HashMap and HashSet as tools for **remembering information** and trading memory
for faster lookup.

**Core question this whole phase answers:**
> What information should I remember?

Every pattern in this book is really just a different answer to that one question —
existence, frequency, index, group, or cumulative state.

---

## How To Use This Book

Same discipline as Phase 1: read once fully. On revision, jump to a pattern's
**Revision Box**. If it doesn't fully bring the idea back, re-read that pattern's full
section — the box is a trigger, not a substitute.

---

## Section Status (from original training log)

| Section | Status |
|---|---|
| Section 1 — Hashing Fundamentals | Complete |
| Section 2 — JavaScript Hash Data Structures | Complete |
| Section 3 — Hashing Pattern Family | Complete |
| Section 4 — Pattern Mixing | 80/20 skipped |

---

# SECTION 1 — Hashing Fundamentals

### What Is Hashing?

Hashing is a technique for mapping a **key** to a **value** using a **hash function**,
so that looking up the value associated with a key doesn't require scanning through
every stored item — the hash function tells you (almost) directly where to look.

### Why Hashing Exists

- **Brute force:** to check "have I seen this value before?" or "what's associated with
  this key?" using only an array, you'd need to scan the whole array — O(n) per check.
- **What it wastes:** repeated linear scans for lookups that could, in principle, be
  answered in constant time if you already knew *where* to look.
- **Why waste is avoidable:** a hash function converts a key directly into a numeric
  address (a bucket index), so the lookup becomes "go straight to that address" instead
  of "search everywhere."
- **This pattern:** trade extra memory (a hash table sized proportionally to the data)
  for average O(1) lookup, insert, and delete — instead of O(n) with a plain array.

### Time vs Memory Trade-off

This is the central engineering idea of the whole phase: **hashing spends memory to buy
speed.** An array uses minimal extra memory but costs O(n) to search. A hash table uses
extra memory (the table itself, plus overhead per entry) but brings search down to
O(1) average. Recognizing *when this trade is worth making* is the actual skill —
almost every pattern in Section 3 is really just "is this a moment where remembering
something is cheaper than re-deriving it?"

### Lookup Tables & Key-Value Mapping

A lookup table is any structure that lets you ask "what value is associated with this
key?" and get an answer without a linear search. A HashMap is the general-purpose
version of a lookup table — keys can be almost anything (strings, numbers, sometimes
objects), and values can be anything too (a count, an index, a list, another map).

### Hash Function

A hash function takes a key and deterministically produces a number (the "hash code"),
which is then reduced (usually via modulo) to fit within the table's current size,
giving a **bucket index**. Two core properties matter:
- **Deterministic:** the same key always produces the same hash code.
- **Well-distributed:** different keys should, ideally, spread evenly across buckets,
  to avoid many keys piling into the same bucket.

### Buckets & Collision

A **bucket** is a slot in the underlying array that the hash table is built on top of.
A **collision** happens when two different keys hash to the same bucket. Collisions are
not a bug — they are a mathematically guaranteed occurrence once the number of keys
approaches (or exceeds) the number of buckets (a direct consequence of the pigeonhole
principle), so every real hash table needs a strategy to handle them.

**Collision Resolution (Awareness level):**
- **Chaining:** each bucket holds a small list (or linked list) of all entries that
  hashed there; a collision just appends to that bucket's list. Lookup degrades to
  scanning that one bucket's (hopefully short) list.
- **Open Addressing:** on a collision, the table probes for the *next* available slot
  (via some deterministic sequence) instead of growing a list — the colliding entry is
  stored elsewhere in the same underlying array.

### Load Factor & Rehashing (Awareness level)

**Load factor** = `number of entries / number of buckets`. As load factor climbs,
collisions become more frequent and performance degrades toward the worst case.
**Rehashing** is the process of growing the underlying table (usually doubling it) and
redistributing every existing entry into the new, larger set of buckets, once the load
factor crosses a threshold — this is what keeps average-case performance close to O(1)
over the table's lifetime, at the cost of an occasional expensive O(n) rehash operation.

### Average vs Worst Case Complexity

| Operation | Average Case | Worst Case | Why the worst case happens |
|---|---|---|---|
| Insert | O(1) | O(n) | all keys collide into the same bucket (pathological hash function or adversarial input) |
| Lookup | O(1) | O(n) | same reason — degenerates to scanning one giant bucket/chain |
| Delete | O(1) | O(n) | same reason |

### Engineering Thinking

**Why hashing gives O(1) average lookup:** with a well-distributed hash function and a
load factor kept low via rehashing, each bucket holds a small, roughly constant number
of entries on average — so checking (or scanning) one bucket is O(1) on average,
regardless of how many total entries the table holds.

**Why the worst case becomes O(n):** if every key happened to hash into the same
bucket (a bad hash function, or a deliberately crafted adversarial input), the "one
bucket" you check devolves into a full linear scan over every entry — the average-case
guarantee is a statistical property, not an absolute one.

**Why arrays cannot solve every lookup problem:** arrays give O(1) access *only* when
you already know the numeric index — they cannot answer "does this value exist?" or
"what's associated with this arbitrary key?" without a full scan, because there's no
direct relationship between a value and its position in the array.

**Real-world engineering applications:** caches (key → cached response), session storage
(session ID → user data), database indexing (conceptually, an index is a hash/tree
structure mapping a column value → row location), API lookup (endpoint/key → handler),
authentication (token → user identity), Redis (an entire database built around
key-value hashing as its primary access pattern).

---

# SECTION 2 — JavaScript Hash Data Structures

## Object

**Operations:** creation (`{}`), insert/update (`obj.key = value`), delete
(`delete obj.key`), search (`obj.key` or `"key" in obj`), iteration
(`for...in`, or via `Object.keys()`, `Object.values()`, `Object.entries()`).

**Engineering discussion:**
- **Why keys become strings:** a plain JS object's keys are always coerced to strings
  (or Symbols) — so using a number, or worse, an object, as a key silently converts it
  to its string representation, which can cause unexpected key collisions
  (`obj[1]` and `obj["1"]` are the *same* key).
- **Prototype chain problems:** every plain object inherits properties from
  `Object.prototype` (like `toString`, `hasOwnProperty`) — so checking `"toString" in
  obj` can return `true` even if you never set it, and iterating with `for...in` without
  an `hasOwnProperty` guard can pick up inherited properties you didn't intend to
  include.
- **When Object should NOT be used:** when keys need to be non-string types preserved
  as-is (numbers, objects), when you need a reliable `.size`, when insertion order
  matters strictly, or when you're doing frequent add/delete cycles where prototype
  pollution or accidental collisions with built-in property names (like `"constructor"`
  or `"__proto__"`) are a risk — `Map` is the safer default in all these cases.

## Map

**Operations:** `new Map()`, `set(key, value)`, `get(key)`, `has(key)`,
`delete(key)`, `clear()`, `.size`, iteration (`for...of map`, `map.forEach`), nested
maps (a Map whose values are themselves Maps, for multi-level lookups).

**Engineering discussion:**
- **Why Map exists:** to fix exactly the problems Object has — keys can be *any* type
  including numbers and objects, preserved as their original type (no string coercion),
  there's no prototype pollution risk, and `.size` gives an O(1) count directly.
- **Map vs Object:** Object is fine for simple, string-keyed, mostly-static data
  (like a config object); Map is the correct choice whenever keys aren't naturally
  strings, when frequent insert/delete is happening, or when you need guaranteed
  insertion-order iteration and a reliable size.
- **Primitive vs object keys:** primitive keys (numbers, strings) are compared by value;
  object keys are compared by *reference* — two different object literals with identical
  contents are treated as two different keys in a Map, which is a common source of bugs
  if not understood.
- **Performance:** both Object and Map give average O(1) get/set/has in V8, but Map is
  generally more consistently optimized for scenarios with frequent additions and
  removals.

## Set

**Operations:** `new Set()`, `add(value)`, `has(value)`, `delete(value)`, `clear()`,
`.size`, iteration (`for...of set`).

**Engineering discussion:**
- **Uniqueness guarantee:** a Set can never contain duplicate values — calling `add()`
  with a value already present is a silent no-op, which makes Sets the natural structure
  for "give me only the distinct elements" type problems.
- **Presence checking:** `.has(value)` is the Set's core operation — O(1) average
  existence checking, which is exactly what replaces an O(n) linear `.includes()` scan
  on an array.

## WeakMap / WeakSet (Awareness Only)

- **What they are:** variants of Map/Set that only accept **objects** as keys (WeakMap)
  or values (WeakSet) — not primitives.
- **Garbage collection concept:** a WeakMap/WeakSet holds its keys/values *weakly* —
  meaning if there's no other reference to an object anywhere else in the program, the
  garbage collector is free to reclaim its memory even though it's still "in" the
  WeakMap/WeakSet. This prevents memory leaks in scenarios where you want to associate
  data with an object only for as long as that object is otherwise still in use.
- **Real-world use cases (high level):** caching computed data tied to DOM elements
  (once the element is removed from the page and has no other references, the cache
  entry disappears automatically), storing private data associated with class instances.

---

# SECTION 3 — Hashing Pattern Family

## Pattern 1 — Frequency Counting

### 1. Definition
Frequency Counting maps each distinct value to how many times it occurs, using a
HashMap where the key is the value itself and the map's value is a running count.

### 2. Why This Pattern Exists
- **Brute force:** to know how many times a specific value occurs, scanning the whole
  array/string for every query costs O(n) per query.
- **What it wastes:** if you need frequency information for *many* values (or all of
  them), repeating that O(n) scan for each one is enormously wasteful.
- **Why waste is avoidable:** a single O(n) pass can populate a frequency map for
  *every* distinct value at once — after that, any single frequency lookup is O(1).
- **This pattern:** build the frequency map once, then answer any frequency-based
  question (comparisons, thresholds, majority) in O(1) per lookup afterward.

### 3. Engineering Intuition (Mental Model)
Think of a ballot-counting table at an election. Instead of re-reading every single
ballot every time someone asks "how many votes does candidate X have right now," a clerk
keeps a running tally sheet — one line per candidate — and just increments the
appropriate line as each ballot comes in. Any question about "how many votes does X
have" is then just reading one line off the sheet.

### 4. Why It Works (Proof / Reasoning)
The invariant maintained is: *`map[value]` always equals the exact number of times
`value` has been seen so far in the input*. This holds by direct construction — every
occurrence of `value` in the input increments `map[value]` exactly once, so after a full
pass, `map[value]` equals the exact count of all occurrences, for every distinct value
simultaneously.

### 5. Visualization
Input: `"aabbbc"`

```
char:  a  a  b  b  b  c
map:   {a:1}
       {a:2}
       {a:2,b:1}
       {a:2,b:2}
       {a:2,b:3}
       {a:2,b:3,c:1}
```

### 6. Recognition Signal
The problem statement mentions: *anagram*, *frequency*, *majority element*, *how many
times does X occur*, *k most/least frequent*, or requires comparing the multiset of
characters/values between two inputs.

### 7. Algorithm (Step-by-Step)
1. Initialize an empty map.
2. For each element in the input: `map[element] = (map[element] || 0) + 1`.
3. Use the completed map to answer whatever frequency-based question is asked.

### 8. Pseudocode
```
function buildFrequencyMap(items):
    map = empty map
    for item in items:
        map[item] = (map[item] or 0) + 1
    return map
```

### 9. JavaScript Implementation
```js
// Example: Valid Anagram — do two strings have identical character frequencies?
function isAnagram(s, t) {
  if (s.length !== t.length) return false; // quick reject — different lengths can't match

  const freq = new Map();
  for (const ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1); // count up for s
  }
  for (const ch of t) {
    if (!freq.has(ch)) return false;       // t has a character s never had
    freq.set(ch, freq.get(ch) - 1);        // count down for t
    if (freq.get(ch) < 0) return false;    // t has MORE of this character than s did
  }
  return true; // every count landed back at exactly 0
}
```

### 10. Dry Run
`isAnagram("anagram", "nagaram")`

| step | char (from s) | freq after |
|---|---|---|
| build from s | a,n,a,g,r,a,m | {a:3,n:1,g:1,r:1,m:1} |

| step | char (from t) | freq[char] before | freq[char] after |
|---|---|---|---|
| n | 1 | 0 |
| a | 3 | 2 |
| g | 1 | 0 |
| a | 2 | 1 |
| r | 1 | 0 |
| a | 1 | 0 |
| m | 1 | 0 |

All counts reach `0`, no negative dip → returns `true`.

### 11. Complexity Analysis
- **Time: O(n)** — one pass to build the map, one pass to verify, each O(1) per
  character on average.
- **Space: O(k)**, where `k` is the number of distinct values/characters (bounded by
  the alphabet size for character problems).

### 12. Common Mistakes
- ❌ Forgetting the length-mismatch quick check, doing unnecessary work before the
  inevitable `false`.
- ❌ Only checking `map.has(char)` without checking counts reaching exactly zero —
  this misses cases where one string has *more* of a character than the other.
- ❌ Using a plain array indexed by character code without bounding it to the actual
  alphabet in use, wasting space or breaking on Unicode input.

### 13. Edge Cases
- Empty strings — two empty strings are trivially anagrams of each other.
- Strings of different lengths — reject immediately, no need to build any map at all.
- Strings with repeated characters — the count-based approach handles this correctly by
  construction (unlike a naive Set-based "same characters" check, which would ignore
  repetition).

### 14. Interview Explanation
"Frequency Counting builds a map from each distinct value to how many times it occurs,
in one O(n) pass. Once built, any question about counts — comparing two frequency
profiles, finding a majority, finding the k most frequent — becomes O(1) per lookup
instead of an O(n) rescan every time."

### 15. Related Problems & Revision Box
- **LC242** — Valid Anagram
- **LC169** — Majority Element (also solvable via Boyer–Moore Voting in O(1) space —
  worth knowing both approaches: hashing trades space for simplicity, Boyer–Moore trades
  a clever invariant for O(1) space)
- **LC347** — Top K Frequent Elements (frequency map + bucket sort or a heap on top)

> **Revision Box**
> Formula/invariant: `map[value] = (map[value] || 0) + 1` for every element, once.
> Mental model in one phrase: *a ballot-counting tally sheet.*
> Complexity: *O(n) time, O(k) space.*

---

## Pattern 2 — Presence Checking

### 1. Definition
Presence Checking uses a HashSet to answer "have I seen this value before?" in O(1)
average time, without caring *how many* times it occurred — only *whether* it occurred.

### 2. Why This Pattern Exists
- **Brute force:** checking whether a value exists anywhere in an already-processed
  portion of the input, by scanning that portion each time, costs O(n) per check.
- **What it wastes:** re-scanning previously seen elements over and over, just to answer
  a yes/no question that a single O(1) set lookup could answer instantly.
- **Why waste is avoidable:** a Set can record every value seen so far as it's
  encountered, so any future "have I seen this?" question is answered in O(1) by
  checking the set, not by rescanning.
- **This pattern:** trade O(n) extra space for turning every existence check from O(n)
  down to O(1).

### 3. Engineering Intuition (Mental Model)
Picture a guest list at the door of an event. Instead of asking everyone already inside
"have you seen this person before?" every time someone new arrives, the doorperson keeps
a checklist and just marks a name the instant someone walks in. Checking "is this person
already inside?" is then a single glance at the checklist, not a room-wide poll.

### 4. Why It Works (Proof / Reasoning)
The invariant is: *at any point during the scan, the Set contains exactly the distinct
values encountered so far*. Since every new element is added to the set the moment it's
processed, and `.has()` checks the set's exact current contents, the presence check is
always accurate relative to "everything seen up to this point" — no approximation, no
staleness.

### 5. Visualization
Detecting a duplicate in `[1, 3, 5, 3, 7]`:

```
value:  1   3   5   3   7
seen:  {1} {1,3} {1,3,5}  → 3 already in seen! duplicate found.
```

### 6. Recognition Signal
The problem statement mentions: *contains duplicate*, *does X exist*, *has this been
seen before*, *cycle detection* (Happy Number — detecting a repeated state), or any
yes/no existence question over a growing set of seen values.

### 7. Algorithm (Step-by-Step)
1. Initialize an empty Set.
2. For each element: if it's already in the set, the condition is met (return/record
   accordingly); otherwise, add it to the set.
3. If the loop completes without a match, no duplicate/match exists.

### 8. Pseudocode
```
function containsDuplicate(items):
    seen = empty set
    for item in items:
        if item in seen:
            return true
        add item to seen
    return false
```

### 9. JavaScript Implementation
```js
// Contains Duplicate
function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true; // already encountered this value
    seen.add(num);
  }
  return false;
}

// Happy Number — presence checking used for CYCLE detection on computed states
function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquaredDigits(n);
  }
  return n === 1;
}

function sumOfSquaredDigits(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}
```

### 10. Dry Run
`containsDuplicate([1, 3, 5, 3, 7])`

| num | seen before | in seen? | action | seen after |
|---|---|---|---|---|
| 1 | {} | no | add | {1} |
| 3 | {1} | no | add | {1,3} |
| 5 | {1,3} | no | add | {1,3,5} |
| 3 | {1,3,5} | **yes** | return true | — |

Final answer: `true`

### 11. Complexity Analysis
- **Time: O(n)** — each element is checked and inserted at most once, O(1) average per
  operation.
- **Space: O(n)** — worst case, every element is distinct and all end up in the set.

### 12. Common Mistakes
- ❌ Adding the element to the set **before** checking presence — this makes the check
  against itself trivially true on the very first occurrence.
- ❌ Using an array with `.includes()` instead of a Set — functionally correct but
  silently regresses to O(n) per check, O(n²) overall.
- ❌ For cycle-detection style problems (Happy Number), forgetting that the *state*
  being tracked is the computed value at each step, not the original input — the Set
  must track the sequence of *transformed* values.

### 13. Edge Cases
- Empty array — no duplicates possible; return `false` immediately.
- Array with all unique elements — the loop completes fully, adding every element,
  returning `false`.
- Single-element array — trivially no duplicate; the set only ever holds one value.

### 14. Interview Explanation
"Presence Checking uses a Set to remember every value seen so far, so that any future
'have I seen this?' question is O(1) instead of an O(n) rescan of everything processed
up to that point. The key implementation detail is checking presence *before* adding the
current element, so it isn't comparing an element against itself."

### 15. Related Problems & Revision Box
- **LC217** — Contains Duplicate
- **LC202** — Happy Number
- **LC128** — Longest Consecutive Sequence (introduces Presence Checking used to find
  *sequence starting points* — only start counting a run from a value whose predecessor
  is absent from the set, which keeps the whole algorithm O(n) instead of O(n log n))

> **Revision Box**
> Formula/invariant: *check `.has()` before `.add()`, always in that order.*
> Mental model in one phrase: *a doorperson's guest checklist.*
> Complexity: *O(n) time, O(n) space.*

---

## Pattern 3 — Counting Pattern

*(Marked 80/20 compressed in the original training — lighter treatment, still complete
enough to recognize and apply.)*

### Definition
The Counting Pattern is the general family of "use a HashMap/HashSet to count something
across the input" — occurrences of a value, the number of unique values, the number of
valid pairs, or the number of valid subarrays satisfying some hash-checkable condition.
It's less a single fixed template and more the recognition that **counting problems
almost always reduce to a map/set update inside a single pass**.

### Core Idea
```
for each element:
    derive a "key" relevant to the counting question
    update a running total using the map's current knowledge about that key
    update the map itself with the new element
```

### Why It Matters
This is really Frequency Counting (Pattern 1) and Presence Checking (Pattern 2)
*generalized* — instead of just building the map and reading it once at the end, the
count is often accumulated incrementally *during* the same pass that builds the map,
because the answer to "how many valid pairs/subarrays end here" typically depends on
what's already in the map at that exact point.

### Recognition Signal
The problem statement asks *"count the number of..."* pairs, subarrays, unique values,
or occurrences — and a per-element hash lookup can answer "how many valid partners does
this element have so far?"

### Minimal Example
```js
// Count pairs (i, j) with i < j where nums[i] + nums[j] === target
function countPairsWithSum(nums, target) {
  const seenCounts = new Map();
  let count = 0;
  for (const num of nums) {
    const complement = target - num;
    count += seenCounts.get(complement) || 0; // every prior occurrence of complement
                                                // forms a valid pair with this element
    seenCounts.set(num, (seenCounts.get(num) || 0) + 1);
  }
  return count;
}
```

### Complexity
- **Time: O(n)** — one pass, O(1) map operations per element.
- **Space: O(n)** — worst case, every element distinct.

### Common Mistakes
- ❌ Updating the map *before* using it to accumulate the count for the current
  element — this can cause an element to incorrectly pair with itself.
- ❌ Conflating "count of unique values" (just `map.size` after a Presence-Checking-style
  pass) with "count of valid pairs/subarrays" (requires accumulating during the pass,
  not just reading the final map size).

> **Revision Box**
> Formula/invariant: *look up first (accumulate count), then update the map — order matters.*
> Mental model in one phrase: *ask "how many valid partners exist so far," then join the party yourself.*
> Complexity: *O(n) time, O(n) space.*

---

## Pattern 4 — Grouping Pattern

### 1. Definition
The Grouping Pattern maps a derived **signature** (some function of the original value —
a sorted version, a canonical form, a computed key) to a list of all original values that
share that signature, letting you cluster related items together in a single pass.

### 2. Why This Pattern Exists
- **Brute force:** to group items by some shared property, comparing every item against
  every other item to test "do these belong in the same group?" costs O(n²)
  comparisons.
- **What it wastes:** if two items belong to the same group, that fact can usually be
  detected *independently*, per item, by computing a canonical signature — there's no
  need to compare items pairwise at all.
- **Why waste is avoidable:** compute each item's signature once, and use that signature
  directly as a HashMap key — items with identical signatures land in the same bucket
  automatically, with no pairwise comparison required.
- **This pattern:** turn an O(n²) pairwise-comparison grouping problem into an O(n ·
  signature-cost) single pass.

### 3. Engineering Intuition (Mental Model)
Think of sorting a huge pile of mail by zip code. You don't compare every letter to
every other letter to decide which pile it belongs to — you just read each letter's zip
code (its "signature") and drop it directly into the bin labeled with that zip code. Two
letters end up in the same bin purely because they happen to share a zip code, not
because they were ever directly compared to each other.

### 4. Why It Works (Proof / Reasoning)
Two items belong in the same group if and only if they share the same signature (by the
problem's definition of "belonging together"). Since the signature is a deterministic
function of the item alone, computing it requires no knowledge of any other item.
Placing each item into `map[signature]` (appending to a list) therefore correctly
clusters every item with every other item sharing that exact signature, with no
comparisons ever needed between two different items directly.

### 5. Visualization
Grouping anagrams from `["eat", "tea", "tan", "ate", "nat", "bat"]` (signature = sorted
characters):

```
"eat" → sorted "aet" → map["aet"] = ["eat"]
"tea" → sorted "aet" → map["aet"] = ["eat", "tea"]
"tan" → sorted "ant" → map["ant"] = ["tan"]
"ate" → sorted "aet" → map["aet"] = ["eat", "tea", "ate"]
"nat" → sorted "ant" → map["ant"] = ["tan", "nat"]
"bat" → sorted "abt" → map["abt"] = ["bat"]
```

### 6. Recognition Signal
The problem statement mentions: *group by*, *cluster*, *anagram grouping*, or any
scenario where items need to be bucketed by a shared derived property rather than
compared pairwise.

### 7. Algorithm (Step-by-Step)
1. Initialize an empty map.
2. For each item: compute its signature (canonical form).
3. If the signature isn't a key yet, initialize `map[signature] = []`.
4. Push the original item into `map[signature]`.
5. After the pass, the map's values are the groups.

### 8. Pseudocode
```
function groupByKey(items, signatureOf):
    map = empty map
    for item in items:
        key = signatureOf(item)
        if key not in map:
            map[key] = []
        map[key].append(item)
    return values(map)
```

### 9. JavaScript Implementation
```js
// Group Anagrams — signature = sorted characters of the string
function groupAnagrams(strs) {
  const groups = new Map();

  for (const str of strs) {
    const signature = str.split("").sort().join(""); // canonical form
    if (!groups.has(signature)) {
      groups.set(signature, []);
    }
    groups.get(signature).push(str); // same signature → same bucket, no comparisons needed
  }

  return Array.from(groups.values());
}
```

### 10. Dry Run
Input: `["eat", "tea", "tan"]`

| str | signature | groups after |
|---|---|---|
| eat | aet | {aet: [eat]} |
| tea | aet | {aet: [eat, tea]} |
| tan | ant | {aet: [eat, tea], ant: [tan]} |

Final: `[["eat", "tea"], ["tan"]]`

### 11. Complexity Analysis
- **Time: O(n · k log k)**, where `n` is the number of strings and `k` is the max string
  length — dominated by sorting each string to compute its signature. (A frequency-count
  signature, instead of sorting, can bring this down to O(n · k).)
- **Space: O(n · k)** — storing every original string across all the groups.

### 12. Common Mistakes
- ❌ Comparing strings pairwise instead of computing an independent signature per
  string — regresses to O(n²) unnecessarily.
- ❌ Forgetting to initialize the array at a new signature before pushing — pushing to
  `undefined` throws.
- ❌ Using an inefficient signature (e.g., string concatenation of unsorted characters)
  that doesn't actually guarantee identical items produce identical signatures.

### 13. Edge Cases
- Empty input list — returns an empty list of groups.
- All strings identical — everything lands in a single group.
- All strings have completely distinct signatures — every "group" has exactly one
  member.

### 14. Interview Explanation
"Grouping computes a canonical signature per item — independent of every other item —
and uses that signature as a HashMap key. Items with the same signature naturally land
in the same bucket without ever being directly compared to each other, which turns what
looks like an O(n²) pairwise-comparison problem into an O(n · signature-cost) single
pass."

### 15. Related Problems & Revision Box
- **LC49** — Group Anagrams

> **Revision Box**
> Formula/invariant: `map[signature(item)].push(item)` — signature computed independently per item.
> Mental model in one phrase: *sorting mail into bins by zip code.*
> Complexity: *O(n · k log k) time (sort-based signature), O(n · k) space.*

---

## Pattern 5 — Mapping Pattern

### 1. Definition
The Mapping Pattern uses a HashMap to associate each value with **useful derived
information** about it — most commonly its index, but potentially its frequency, its
relationship to another value, or any custom payload — so that a later lookup can
retrieve that information in O(1) instead of re-deriving it.

### 2. Why This Pattern Exists
- **Brute force:** to find "the index where value X occurred" or "does some other value
  Y have a matching counterpart," scanning the array again for every query costs O(n)
  per query.
- **What it wastes:** the information needed (an index, a relationship) was already
  available the first time each value was encountered — recomputing it later by
  rescanning throws that information away only to rediscover it.
- **Why waste is avoidable:** record the useful information *at the moment it's first
  known* — while iterating — into a map, so any later lookup is O(1).
- **This pattern:** the map's value is whatever piece of information about a key is
  useful to remember for later — this is the most general of all the hashing patterns,
  since "useful information" can be almost anything.

### 3. Engineering Intuition (Mental Model)
Think of a librarian's card catalog. Instead of walking every aisle to find which shelf
a specific book is on, the catalog directly maps "book title" → "shelf number." The
mapping pattern is exactly this: record the answer to "where/what is this?" once, the
moment you learn it, so any future question about that same key is instant.

### 4. Why It Works (Proof / Reasoning)
The invariant is: *`map[key]` always holds the most recent (or first, depending on the
problem) piece of information associated with `key`, as of the current point in the
scan*. Because the map is updated at the exact moment the relevant information becomes
known (e.g., while iterating and seeing `nums[i]`, you know `i` right then), later
lookups against that map are guaranteed accurate without needing to re-derive anything.

### 5. Visualization
Two Sum — mapping `value → index` while scanning `[2, 7, 11, 15]`, target `9`:

```
i=0, num=2: complement=7, map has 7? no.  map = {2:0}
i=1, num=7: complement=2, map has 2? YES (index 0)! → return [0, 1]
```

### 6. Recognition Signal
The problem statement asks to find *a pair, a complement, an index of a previously seen
value*, or requires transforming one value into another via a known relationship (e.g.,
character-to-character mapping for isomorphism).

### 7. Algorithm (Step-by-Step)
1. Initialize an empty map.
2. For each element (with its index, if relevant): compute whatever "target" you're
   looking for in the map (e.g., a complement).
3. If that target is already in the map, you've found your answer — use the stored
   information.
4. Otherwise, store the current element's information (usually its index) in the map.
5. Continue until a match is found or the input is exhausted.

### 8. Pseudocode
```
function twoSum(nums, target):
    map = empty map  // value -> index
    for i from 0 to length(nums) - 1:
        complement = target - nums[i]
        if complement in map:
            return [map[complement], i]
        map[nums[i]] = i
    return []
```

### 9. JavaScript Implementation
```js
// Two Sum — value -> index mapping
function twoSum(nums, target) {
  const indexOf = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (indexOf.has(complement)) {
      return [indexOf.get(complement), i]; // found the earlier index whose value completes the pair
    }
    indexOf.set(nums[i], i); // remember THIS value's index for future lookups
  }
  return [];
}

// Isomorphic Strings — value -> value mapping (character relationship), both directions
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const mapST = new Map();
  const mapTS = new Map();

  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (mapST.has(a) && mapST.get(a) !== b) return false; // a must always map to the same b
    if (mapTS.has(b) && mapTS.get(b) !== a) return false; // and the mapping must be one-to-one BOTH ways
    mapST.set(a, b);
    mapTS.set(b, a);
  }
  return true;
}
```

### 10. Dry Run
`twoSum([2, 7, 11, 15], 9)`

| i | nums[i] | complement | complement in map? | action | map after |
|---|---|---|---|---|---|
| 0 | 2 | 7 | no | store | {2:0} |
| 1 | 7 | 2 | **yes** (index 0) | return [0,1] | — |

Final answer: `[0, 1]`

### 11. Complexity Analysis
- **Time: O(n)** — a single pass; each map lookup/insert is O(1) average.
- **Space: O(n)** — worst case, every element gets stored before a match is found.

### 12. Common Mistakes
- ❌ Checking `map.has(complement)` **after** inserting the current element — this can
  incorrectly match an element with itself (e.g., `target = 2 * nums[i]`).
- ❌ For Isomorphic Strings specifically, only checking the mapping in one direction —
  this misses cases where two different source characters both try to map to the same
  target character, which breaks the "one-to-one" requirement.
- ❌ Forgetting that "mapping" isn't always `value → index` — it can be `value → value`,
  `value → frequency`, or a custom payload; picking the wrong payload for the problem's
  actual question is the most common design mistake in this pattern.

### 13. Edge Cases
- No valid pair/mapping exists — return an empty result (or `false`), per the problem's
  contract.
- Duplicate values in Two Sum where `target = 2 * value` — correctly handled by checking
  the map *before* inserting the current element, since the *previous* occurrence's
  index is what should be matched, not the current one.
- Isomorphic Strings with strings of different lengths — reject immediately.

### 14. Interview Explanation
"Mapping records useful information about each value — most often its index — at the
exact moment it's encountered, so a later lookup for that value is O(1) instead of a
rescan. For Two Sum specifically, instead of checking every pair, I check whether the
*complement* of the current number has already been seen, which turns an O(n²) pair
search into a single O(n) pass."

### 15. Related Problems & Revision Box
- **LC1** — Two Sum
- **LC205** — Isomorphic Strings

> **Revision Box**
> Formula/invariant: *check the map for what you need BEFORE inserting the current element.*
> Mental model in one phrase: *a librarian's card catalog — title maps straight to shelf number.*
> Complexity: *O(n) time, O(n) space.*

---
