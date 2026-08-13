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

*(End of Part 1 — Sections 1–2 (Fundamentals, JS Hash Structures), and Patterns 1–5.
Continue with Part 2: Patterns 6–10 + Back Matter.)*
# Phase2_Hashing.md — Part 2
### Patterns 6–10 + Back Matter

*(Continues directly from Part 1 — Sections 1–2, Patterns 1–5. Concatenate after Part 1.
No front matter repeated here.)*

---

## Pattern 6 — Prefix Hash

### 1. Definition
Prefix Hash combines the Prefix Sum idea from Phase 1 with a HashMap: instead of only
being able to answer range-sum *queries* in O(1) (which requires the array to be static
and known in advance), Prefix Hash lets you detect, **during a single pass**, whether a
subarray summing to a target ends at the current position — by checking whether
`currentPrefix - target` has already been seen as a prefix value.

### 2. Why This Pattern Exists
- **Brute force:** to count/find subarrays summing to exactly `k`, checking every
  `(left, right)` pair directly costs O(n²).
- **What it wastes:** for every `right`, brute force re-derives the sum of every
  possible `left` from scratch, when the only thing that actually matters is whether a
  *specific* prefix value (`currentPrefix - k`) has occurred before.
- **Why waste is avoidable:** rearranging the prefix-sum range formula
  (`sum(left, right) = prefix[right] - prefix[left-1]`) into
  `prefix[left-1] = prefix[right] - k` shows that finding a valid `left` is just a
  **hash lookup**, not a search — if `prefix[right] - k` has been seen before as some
  earlier prefix value, a valid subarray ending at `right` exists immediately.
- **This pattern:** maintain a running prefix sum, and at each step, check the map for
  `currentPrefix - target` — turning an O(n²) search into a single O(n) pass with O(1)
  lookups.

### 3. Engineering Intuition (Mental Model)
Think of a running bank balance again (same mental model as Prefix Sum in Phase 1), but
now imagine you keep a **notebook** of every balance value you've ever had, alongside the
date you had it. If you want to know "was there ever a stretch of transactions that
added up to exactly ₹500," you don't need to check every possible pair of dates — you
just ask, at today's balance, "did I ever have exactly `today's balance - 500` before?"
If yes, everything between that earlier date and today added up to exactly ₹500.

### 4. Why It Works (Proof / Reasoning)
By the same identity as Prefix Sum: `sum(left, right) = prefix[right] - prefix[left-1]`.
Setting this equal to the target `k` and solving for the unknown quantity:
`prefix[left-1] = prefix[right] - k`. This means: for the current prefix value
(`prefix[right]`), a subarray ending here sums to exactly `k` **if and only if** the
value `prefix[right] - k` exists somewhere earlier in the sequence of prefix values seen
so far. Checking a HashMap for that exact value is a direct, exact application of this
algebraic identity — not an approximation — so it correctly finds every valid subarray
ending at the current position.

### 5. Visualization
Subarray Sum Equals K — `nums = [1, 2, 3]`, `k = 3`:

```
map = {0: -1}    (handles subarrays starting at index 0 — see Common Mistakes)
prefix = 0

i=0, num=1: prefix=1. need prefix-k = 1-3 = -2. map has -2? no.  map[1] = 0
i=1, num=2: prefix=3. need prefix-k = 3-3 = 0.  map has 0? YES (index -1)! → subarray [0..1] sums to 3
             map[3] = 1
i=2, num=3: prefix=6. need prefix-k = 6-3 = 3.  map has 3? YES (index 1)! → subarray [2..2] sums to 3
             map[6] = 2

Total valid subarrays found: 2
```

### 6. Recognition Signal
The problem statement mentions: *subarray sum equals k*, *continuous subarray with a
sum divisible by k*, *zero-sum subarray*, or any "does a contiguous run summing to X
exist" question that needs to be answered in a single pass rather than with two nested
loops.

### 7. Algorithm (Step-by-Step)
1. Initialize `map = {0: -1}` (for counting: `{0: 1}` — see note below) and
   `prefix = 0`.
2. For each index `i`: add `nums[i]` to `prefix`.
3. Compute `needed = prefix - target`.
4. If `needed` is in the map, a valid subarray exists ending at `i` — use the stored
   information (an index for "longest," a count for "how many").
5. Store the current `prefix` in the map (with either the current index, or increment a
   count, depending on what the problem asks for).

> **Note on the seed value:** `map.set(0, -1)` is used when tracking **indices** (so a
> subarray starting at index 0 is correctly handled, since `prefix[-1]` conceptually
> represents "sum before the array starts," which is 0). When **counting** occurrences
> instead of tracking the earliest index, the seed is `map.set(0, 1)` — one prior
> occurrence of the empty prefix, so a subarray starting at index 0 is counted correctly
> too.

### 8. Pseudocode
```
function subarraySumEqualsK(nums, k):
    map = {0: 1}   // prefix value -> count of times seen
    prefix = 0
    count = 0
    for num in nums:
        prefix = prefix + num
        needed = prefix - k
        if needed in map:
            count = count + map[needed]
        map[prefix] = (map[prefix] or 0) + 1
    return count
```

### 9. JavaScript Implementation
```js
// Subarray Sum Equals K — count how many subarrays sum to exactly k
function subarraySum(nums, k) {
  const prefixCount = new Map();
  prefixCount.set(0, 1); // empty prefix occurs once, before any elements

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;
    const needed = prefix - k;
    count += prefixCount.get(needed) || 0; // every earlier occurrence of `needed`
                                            // is a valid subarray ending HERE
    prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);
  }
  return count;
}
```

### 10. Dry Run
Input: `[1, 2, 3]`, `k = 3`

| num | prefix | needed = prefix-k | map[needed] | count += | map after |
|---|---|---|---|---|---|
| 1 | 1 | -2 | 0 | 0 | {0:1, 1:1} |
| 2 | 3 | 0 | 1 | 1 | {0:1, 1:1, 3:1} |
| 3 | 6 | 3 | 1 | 1 | {0:1, 1:1, 3:1, 6:1} |

Final answer: `2` (subarrays `[1,2]` and `[3]`)

### 11. Complexity Analysis
- **Time: O(n)** — a single pass, each map operation O(1) average.
- **Space: O(n)** — the map can hold up to `n` distinct prefix values.

### 12. Common Mistakes
- ❌ Forgetting to seed the map (`{0: 1}` for counting, or `{0: -1}` for
  earliest-index tracking) — this silently drops every valid subarray that starts at
  index `0`.
- ❌ Checking the map **after** inserting the current prefix instead of before — this
  can incorrectly count a zero-length "subarray" against itself.
- ❌ Assuming this only works for all-positive arrays — Prefix Hash for `subarraySum`
  works correctly with negative numbers too, since it's a pure algebraic identity;
  however, this must **not** be confused with ordinary Sliding Window, which does
  assume non-negative values for its shrink logic to be valid (see Important Lessons in
  Back Matter).

### 13. Edge Cases
- All-zero array with `k = 0` — every subarray is valid; the seed `{0: 1}` combined
  with repeated `prefix = 0` states correctly accumulates a large count via the
  incrementing map values.
- Negative numbers present — handled correctly, since prefix values can both increase
  and decrease; the algebraic identity doesn't depend on monotonicity.
- `k` larger than the total sum of the array — no valid subarray exists; the count
  correctly stays at `0`.

### 14. Interview Explanation
"Prefix Hash extends Prefix Sum with a HashMap: instead of just answering static range
queries, I maintain a running prefix sum during a single pass and, at each step, check
whether `prefix - target` has already occurred as an earlier prefix value. If it has,
that means everything between that earlier point and now sums to exactly the target —
this comes directly from rearranging the prefix-sum range formula. It's O(n) time and
O(n) space, and critically it works correctly even with negative numbers, unlike Sliding
Window."

### 15. Related Problems & Revision Box
- **LC560** — Subarray Sum Equals K
- **LC523** — Continuous Subarray Sum (divisibility variant — the map stores
  `prefix % k` instead of `prefix` directly, since two prefixes with the same remainder
  mod k mean everything between them is divisible by k)

> **Revision Box**
> Formula/invariant: `prefix[left-1] = prefix[right] - target`; look up before inserting.
> Mental model in one phrase: *a notebook of every past balance — ask "did I ever have exactly this much less?"*
> Complexity: *O(n) time, O(n) space. `map.set(0, -1)` for indices, `map.set(0, 1)` for counts.*

---

## Pattern 7 — Hash + Sliding Window

*(Marked 80/20 in the original training — Sliding Window mechanics were already
mastered in Phase 1; this section focuses on what's genuinely **new**: using a
HashMap/HashSet as the window's state instead of a scalar.)*

### Definition
Hash + Sliding Window is ordinary Variable/Frequency Sliding Window (Phase 1, Section E)
where the window's validity state is a HashMap (character/value frequency) or a HashSet
(presence), rather than a simple running sum or count. Nothing about the pointer
mechanics changes — `left`/`right` still only move forward, the shrink loop still runs
`while` invalid — the only difference is *what* is being maintained as state.

### What's Genuinely New Here (vs. Phase 1 Sliding Window)
- **Requirement decomposition:** for problems like Minimum Window Substring or
  Permutation in String, the window must satisfy a *multi-part* requirement (frequency
  of *every* required character simultaneously) — this requires tracking not just a
  frequency map, but often a secondary counter (like `formed`/`matched`) that says "how
  many of the distinct requirements are currently fully satisfied," so validity can be
  checked in O(1) instead of comparing two full frequency maps at every step.
- **Constraint-driven window design:** the exact shape of the map (character → count?
  character → last-seen index?) is dictated entirely by what the problem needs to
  detect — last-seen index answers "is this specific occurrence within the current
  window," while a count answers "how many total are in the window."
- **Pattern composition:** this pattern is literally Phase 1's Sliding Window skeleton
  **plus** Phase 2's Frequency Counting/Presence Checking patterns, composed together —
  recognizing this composition is the actual skill, not re-learning sliding window
  mechanics from scratch.

### Recognition Signal
The problem statement needs a *contiguous* window (Sliding Window signal from Phase 1)
**and** the validity check depends on counts or presence of multiple distinct values
(Hashing signal) — e.g., "longest substring without repeating characters," "minimum
window containing all characters of another string," "permutation of one string exists
within another."

### Minimal Example (Presence-based, last-seen index)
```js
// Longest substring without repeating characters — HashMap storing last-seen INDEX
// (an alternative to the Set-based version from Phase 1 — this variant avoids
// re-shrinking one step at a time, jumping `left` directly instead)
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map(); // char -> most recent index
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1; // jump left past the previous occurrence directly
    }
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### Complexity
- **Time: O(n)** — same amortized reasoning as Phase 1 Sliding Window; the map only
  adds O(1) average per operation.
- **Space: O(k)** — bounded by the alphabet/value-set size.

### Common Mistakes
- ❌ Re-deriving the whole Sliding Window skeleton from scratch instead of recognizing
  it's identical to Phase 1 — the only new work is designing the right map shape.
- ❌ Using `lastSeen.get(ch) >= left` incorrectly — forgetting the `>= left` check means
  jumping `left` backward based on a stale, already-out-of-window occurrence.
- ❌ For multi-requirement problems (Minimum Window Substring style), comparing full
  frequency maps at every step instead of maintaining a `formed`/`matched` counter —
  this silently reintroduces O(k) work per step instead of O(1).

> **Revision Box**
> Formula/invariant: *Phase 1 Sliding Window skeleton + Phase 2 Hash state (map or set) = this pattern.*
> Mental model in one phrase: *the same camera frame from Phase 1, now with a tally board attached.*
> Complexity: *O(n) time, O(k) space.*

---

## Pattern 8 — Hash + Prefix

*(Marked 80/20 compressed in the original training — lighter treatment.)*

### Definition
Hash + Prefix generalizes Prefix Hash (Pattern 6) beyond simple sum-equals-target
detection: the prefix gives a **cumulative state** at each index (a running sum, a
running XOR, a running parity), and the HashMap gives fast O(1) lookup of *where or how
often* that cumulative state has occurred before — enabling both counting questions
("how many subarrays satisfy X") and longest-range questions ("what's the longest
subarray satisfying X") from the same underlying idea.

### Core Idea
```
For LONGEST-range questions: map[cumulativeState] = earliest index it occurred at
   (only set it the FIRST time a state is seen — later occurrences don't overwrite,
    since an earlier index always gives a longer or equal range)

For COUNTING questions: map[cumulativeState] = how many times it has occurred
   (every occurrence increments, since each one contributes to a different valid range)
```

### Why This Distinction Matters
This is the single most important engineering lesson of this pattern: **the payload
stored in the map depends entirely on what kind of question is being asked.** Storing an
index when the problem wants a count, or incrementing a counter when the problem wants
the earliest index, are both common and easy mistakes — the *mechanism* (prefix +
hash) is identical either way, but the *payload* is not.

### Minimal Example (Longest-range variant)
```js
// Maximum Size Subarray Sum Equals k — LONGEST range, so store EARLIEST index only
function maxSubArrayLen(nums, k) {
  const earliestIndexOf = new Map();
  earliestIndexOf.set(0, -1); // empty prefix occurs "before" index 0

  let prefix = 0;
  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    const needed = prefix - k;
    if (earliestIndexOf.has(needed)) {
      best = Math.max(best, i - earliestIndexOf.get(needed));
    }
    if (!earliestIndexOf.has(prefix)) {   // only set the FIRST time this prefix occurs
      earliestIndexOf.set(prefix, i);     // a later occurrence would only shorten the range
    }
  }
  return best;
}
```

### Recognition Signal
The problem statement mentions *"maximum length subarray"* combined with a sum/prefix
condition — the "longest" framing is the signal to store the **earliest index**, not a
running count.

### Complexity
- **Time: O(n)** — one pass, O(1) average map operations.
- **Space: O(n)** — up to `n` distinct prefix values stored.

### Common Mistakes
- ❌ Overwriting `earliestIndexOf[prefix]` on every occurrence instead of only the first
  — this would use a *later* (shorter) starting point instead of the earliest possible
  one, silently under-counting the true longest range.
- ❌ Mixing up this pattern with Pattern 6's counting variant — reusing the "increment a
  count" logic for a "longest range" problem, or vice versa.

> **Revision Box**
> Formula/invariant: *longest → store earliest index (write-once); counting → store frequency (always increment).*
> Mental model in one phrase: *same notebook of past balances, but now you only ever write down the FIRST time you hit each balance.*
> Complexity: *O(n) time, O(n) space.*

---

## Pattern 9 — Hash + Two Pointer

### 1. Definition
Hash + Two Pointer is the recognition that some problems are better solved by *sorting*
first and applying the Opposite Direction Two Pointer pattern from Phase 1, rather than
forcing a HashMap-based lookup — most notably 3Sum, where a naive HashMap-per-pair
approach becomes awkward due to duplicate handling, while sort + two pointer handles
duplicates naturally as a side effect of the sorted order.

### 2. Why This Pattern Exists
- **Brute force:** finding all unique triplets that sum to zero by checking every
  `(i, j, k)` triple directly costs O(n³).
- **What it wastes:** for a *fixed* first element, finding a pair summing to a specific
  remaining target is something Phase 1's Two Pointer pattern already solves in O(n) —
  redoing that as a nested O(n²) search (or even a HashMap-per-pair search with fiddly
  duplicate bookkeeping) wastes the structure the sorted array provides for free.
- **Why waste is avoidable:** fix one element at a time (O(n) choices), and for each
  fixed element, use Opposite Direction Two Pointer on the *remaining sorted subarray*
  to find pairs summing to the needed complement — O(n) per fixed element, O(n²) total.
- **This pattern:** recognize when sorting first and reusing Phase 1's two-pointer
  machinery is a *better* fit than reaching for a HashMap, particularly when duplicate
  *triplets* need to be avoided in the output, since sorted order makes duplicate-skipping
  a simple adjacent-comparison instead of a set-based deduplication step.

### 3. Engineering Intuition (Mental Model)
Picture three people needing to split a shared bill exactly evenly to zero out. Instead
of trying every possible trio (a chaotic search), you sort everyone by how much they owe
or are owed, fix one person's amount, and then use two people standing at opposite ends
of the remaining sorted line to find a pair that exactly offsets the fixed person's
amount — sliding inward based on whether the current pair overshoots or undershoots.

### 4. Why It Works (Proof / Reasoning)
For a fixed index `i`, finding `j, k` (with `j, k != i`) such that
`nums[j] + nums[k] = -nums[i]` is exactly the Opposite Direction Two Pointer pair-sum
problem from Phase 1, applied to the sorted subarray excluding index `i` — and that
pattern's correctness proof (sorted order makes the direction to move unambiguous)
applies unchanged. Iterating `i` across every possible fixed element, and for each one
running the O(n) two-pointer search, covers every valid triplet exactly once (up to the
duplicate-skipping logic, which relies on the array being sorted so that identical
values are adjacent and easy to skip past).

### 5. Visualization
`nums = [-1, 0, 1, 2, -1, -4]`, sorted: `[-4, -1, -1, 0, 1, 2]`

```
i=0 (fixed=-4): left=1,right=5 → -1+2=1, need 4... (search continues, no triplet found for -4)
i=1 (fixed=-1): left=2,right=5 → -1+2=1, need 1 → sum=1+(-1)=0? check: nums[2]+nums[5] = -1+2=1 != 1... 
                (walking through:) eventually finds [-1, -1, 2] and [-1, 0, 1]
i=2 (fixed=-1): SKIP — duplicate of i=1's fixed value (nums[2] == nums[1])
...
Result: [[-1,-1,2], [-1,0,1]]
```

### 6. Recognition Signal
The problem statement mentions: *3Sum, 4Sum*, or any "find k numbers that sum to a
target" problem where `k >= 3` — beyond pairs, sorting plus two pointer (with one or
more elements fixed via an outer loop) generally outperforms and out-simplifies a purely
hash-based approach, particularly once duplicate results need to be avoided.

### 7. Algorithm (Step-by-Step)
1. Sort the array.
2. For each index `i` from `0` to `n - 3`:
   a. If `i > 0` and `nums[i] === nums[i-1]`, skip (avoid duplicate triplets sharing the
      same first element).
   b. Set `left = i + 1`, `right = n - 1`.
   c. While `left < right`: compute `sum = nums[i] + nums[left] + nums[right]`.
      - If `sum === 0`: record the triplet; then skip past any duplicate values at both
        `left` and `right` before continuing.
      - If `sum < 0`: `left++` (need a larger sum).
      - If `sum > 0`: `right--` (need a smaller sum).
3. Return all recorded triplets.

### 8. Pseudocode
```
function threeSum(nums):
    sort(nums)
    result = []
    for i from 0 to length(nums) - 3:
        if i > 0 and nums[i] == nums[i-1]:
            continue
        left = i + 1
        right = length(nums) - 1
        while left < right:
            sum = nums[i] + nums[left] + nums[right]
            if sum == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]: left++
                while left < right and nums[right] == nums[right-1]: right--
                left++
                right--
            elif sum < 0:
                left++
            else:
                right--
    return result
```

### 9. JavaScript Implementation
```js
function threeSum(nums) {
  nums.sort((a, b) => a - b); // sorting is what makes two-pointer applicable at all
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate FIRST elements

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;  // skip dup left
        while (left < right && nums[right] === nums[right - 1]) right--; // skip dup right
        left++;
        right--;
      } else if (sum < 0) {
        left++;  // sum too small, only increasing left can help (sorted order)
      } else {
        right--; // sum too large, only decreasing right can help (sorted order)
      }
    }
  }
  return result;
}
```

### 10. Dry Run
Sorted input: `[-4, -1, -1, 0, 1, 2]`

`i = 1` (fixed = `-1`), `left = 2`, `right = 5`:

| left | right | nums[left] | nums[right] | sum | action |
|---|---|---|---|---|---|
| 2 | 5 | -1 | 2 | -1+(-1)+2=0 | **found [-1,-1,2]**, skip dups, left=3, right=4 |
| 3 | 4 | 0 | 1 | -1+0+1=0 | **found [-1,0,1]**, left=4, right=3, loop ends |

`i = 2`: `nums[2] === nums[1]` (`-1 === -1`) → skipped as a duplicate fixed element.

Final result: `[[-1,-1,2], [-1,0,1]]`

### 11. Complexity Analysis
- **Time: O(n²)** — sorting is O(n log n); the outer loop runs O(n) times, and for each,
  the two-pointer inner search is O(n) — dominant term is O(n²).
- **Space: O(1)** auxiliary (excluding the output array and whatever space the sort
  itself uses internally, typically O(log n) for an in-place sort's recursion).

### 12. Common Mistakes
- ❌ Forgetting to sort first — the entire two-pointer direction logic depends on sorted
  order; without it, this pattern doesn't apply at all.
- ❌ Skipping duplicates incorrectly (or not at all) — leads to duplicate triplets in the
  output, which most 3Sum problem statements explicitly disallow.
- ❌ Forcing a HashMap-based approach instead — technically possible, but the duplicate
  bookkeeping becomes significantly messier than the natural adjacent-skip that sorted
  order provides for free; this is the core lesson of the pattern: **know when hashing
  is the wrong tool**, even in a "Hashing phase."

### 13. Edge Cases
- Fewer than 3 elements — no triplet possible; return an empty result immediately.
- All elements identical (e.g., all zeros) — after sorting, the duplicate-skip logic at
  the outer loop level should still allow exactly one valid triplet (`[0,0,0]`) if the
  count of zeros is at least 3.
- No valid triplet exists — the two-pointer inner loop simply never finds `sum === 0`
  for any fixed `i`, and the result stays empty.

### 14. Interview Explanation
"3Sum is a case where sorting first and reusing two-pointer, fixing one element at a
time, beats a purely hash-based approach — mainly because sorted order makes
duplicate-triplet avoidance trivial (just skip adjacent equal values), whereas a
HashMap-based approach would need its own separate deduplication logic. For each fixed
element, the remaining two-sum-to-target search is exactly Phase 1's Opposite Direction
Two Pointer, applied to the sorted remainder. Overall it's O(n²) time and O(1) auxiliary
space."

### 15. Related Problems & Revision Box
- **LC1** — Two Sum (the direct hash-based version, contrasted here with the sorted
  two-pointer version used as 3Sum's inner loop)
- **LC15** — 3Sum

> **Revision Box**
> Formula/invariant: *sort → fix i → two pointers → compare sum → skip duplicates.*
> Mental model in one phrase: *splitting a bill three ways using a sorted line and two people walking inward.*
> Complexity: *O(n²) time, O(1) auxiliary space (excluding output).*

---

## Pattern 10 — Custom Hash Thinking

### 1. Definition
Custom Hash Thinking is the practice of designing your own hash-table-like structure
from first principles — implementing the hash function, bucket storage, and collision
handling manually — either because a language's built-in Map/Set isn't allowed
(interview constraint) or to deeply understand what those built-ins are actually doing
underneath.

### 2. Why This Pattern Exists
- **Brute force:** without any hashing structure at all, `add`/`contains`/`remove`
  operations on a growing collection would need a linear scan (O(n)) every time, or a
  language built-in that hides exactly the mechanics this pattern exists to teach.
- **What it wastes:** relying purely on a built-in `Map`/`Set` without understanding
  *why* it's fast means you can't reason about worst-case behavior, can't design a
  custom key scheme (composite keys, tuple keys) when the built-in doesn't directly
  support what you need, and can't answer "how would you implement this yourself" in an
  interview.
- **Why waste is avoidable:** implementing your own bucket array plus a hash function
  (even a simple modulo-based one) directly demonstrates and reinforces exactly how
  average O(1) is achieved, and how collisions are handled once understood explicitly.
- **This pattern:** build a hash set/map manually — an array of buckets, each bucket
  handling multiple entries via chaining — and learn to design composite/tuple keys for
  problems where a single primitive value isn't a sufficient key on its own.

### 3. Engineering Intuition (Mental Model)
Think of a large apartment building with a fixed number of mailboxes (buckets). The
building's rule for assigning a mailbox to a resident's name (the hash function) might
occasionally assign two different residents to the same mailbox number — when that
happens, that one mailbox simply holds mail for multiple residents (chaining), and
finding a specific resident's mail means going to their assigned mailbox and then
checking the (hopefully short) list of names inside it.

### 4. Why It Works (Proof / Reasoning)
Given a fixed number of buckets `B` and a hash function that maps any key deterministically
to an index in `[0, B)`, storing an entry always goes to a computable, deterministic
bucket. Looking it up recomputes the same hash and checks only that one bucket's
contents (via chaining, a short list) — correctness follows because the hash function is
deterministic (the same key always lands in the same bucket for both insert and lookup),
and chaining ensures no entry is ever lost even when a collision occurs (it's simply
appended to that bucket's list rather than overwriting anything).

### 5. Visualization
A simple `key % 10` hash function, storing keys `3, 13, 7`:

```
bucket 3: [3, 13]   (3 % 10 = 3, 13 % 10 = 3 → collision, chained)
bucket 7: [7]
All other buckets: []
```

### 6. Recognition Signal
The problem statement explicitly says *"design a HashSet/HashMap"* without using the
language's built-in equivalent, or requires a **custom key** (a combination of multiple
values, like coordinates `(row, col)`, or a tuple) that a simple primitive key can't
represent directly.

### 7. Algorithm (Step-by-Step) — Design HashSet
1. Choose a fixed number of buckets (e.g., 1000, or a prime number for better
   distribution).
2. Hash function: `bucketIndex = key % numberOfBuckets`.
3. Each bucket stores a list of keys that hashed there (chaining).
4. `add(key)`: compute bucket index; if `key` isn't already in that bucket's list,
   append it.
5. `contains(key)`: compute bucket index; scan that bucket's list for `key`.
6. `remove(key)`: compute bucket index; remove `key` from that bucket's list if present.

### 8. Pseudocode
```
class MyHashSet:
    buckets = array of B empty lists

    function hash(key):
        return key mod B

    function add(key):
        idx = hash(key)
        if key not in buckets[idx]:
            buckets[idx].append(key)

    function contains(key):
        idx = hash(key)
        return key in buckets[idx]

    function remove(key):
        idx = hash(key)
        remove key from buckets[idx] if present
```

### 9. JavaScript Implementation
```js
class MyHashSet {
  constructor() {
    this.numBuckets = 1000;                    // fixed bucket count
    this.buckets = Array.from({ length: this.numBuckets }, () => []); // chaining: array per bucket
  }

  _hash(key) {
    return key % this.numBuckets; // simple modulo hash function
  }

  add(key) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    if (!bucket.includes(key)) {   // avoid duplicate entries within the same bucket
      bucket.push(key);
    }
  }

  contains(key) {
    const idx = this._hash(key);
    return this.buckets[idx].includes(key); // scan only THIS bucket, not the whole structure
  }

  remove(key) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const pos = bucket.indexOf(key);
    if (pos !== -1) {
      bucket.splice(pos, 1);
    }
  }
}

// Composite key example: encode a (row, col) pair as a single string key
function encodeCoordinate(row, col) {
  return `${row},${col}`; // simple, unambiguous composite key
}
```

### 10. Dry Run
`add(3)`, `add(13)`, `contains(13)`, `remove(3)`, `contains(3)` (numBuckets = 10 for
illustration)

| operation | hash | bucket before | bucket after | return |
|---|---|---|---|---|
| add(3) | 3 | [] | [3] | — |
| add(13) | 3 | [3] | [3, 13] | — |
| contains(13) | 3 | [3, 13] | [3, 13] | true |
| remove(3) | 3 | [3, 13] | [13] | — |
| contains(3) | 3 | [13] | [13] | false |

### 11. Complexity Analysis
- **Time: O(1) average** for add/contains/remove, given a well-distributed hash function
  and a reasonable bucket count relative to the number of stored keys; **O(k) worst
  case**, where `k` is the number of entries that collided into the same bucket (up to
  O(n) in a pathological case where every key hashes identically).
- **Space: O(numBuckets + n)** — the fixed bucket array plus every stored entry across
  all buckets.

### 12. Common Mistakes
- ❌ Not handling collisions at all (overwriting a bucket's single slot instead of
  chaining) — silently loses previously stored entries.
- ❌ Choosing a bucket count that's a suspiciously "round" number without considering
  distribution (e.g., `numBuckets = 10` with mostly multiples-of-10 keys causes all of
  them to collide into bucket 0) — a prime number of buckets often distributes more
  evenly for many practical hash functions.
- ❌ For composite keys, using a delimiter that could itself appear inside the
  individual values (e.g., joining with `,` when a value can *contain* a `,`) — this can
  cause two genuinely different composite keys to encode to the same string.

### 13. Edge Cases
- Adding the same key twice — `add()` should be idempotent (the `includes()` check
  before pushing prevents duplicate entries in the bucket).
- Removing a key that was never added — `indexOf` returns `-1`; the remove should
  simply no-op, not throw.
- Very large key values relative to the bucket count — the modulo hash still produces a
  valid bucket index; correctness isn't affected, though distribution quality can be.

### 14. Interview Explanation
"When asked to design a HashSet without built-ins, I use a fixed array of buckets and a
simple hash function like modulo to pick a bucket per key, then handle collisions via
chaining — each bucket is itself a small list, so a collision just means appending to
that list instead of overwriting anything. Average case stays O(1) because a
well-distributed hash keeps each bucket's list short; worst case degrades to O(k) if
many keys collide into the same bucket. This exercise is really about understanding what
a built-in Map/Set is doing underneath, and it directly enables designing custom
composite keys — like encoding a `(row, col)` pair as a single string — for problems
where a built-in structure's key type doesn't naturally fit what's needed."

### 15. Related Problems & Revision Box
- **LC705** — Design HashSet

> **Revision Box**
> Formula/invariant: `bucketIndex = hash(key) % numBuckets`; collisions handled via chaining.
> Mental model in one phrase: *an apartment building's mailboxes — one box can hold mail for more than one resident.*
> Complexity: *O(1) average, O(k) worst case per operation; O(numBuckets + n) space.*

---

# Back Matter

## Important Lessons (carried forward verbatim from original training notes, expanded)

- **Map value must match the requirement.** The single most common design mistake across
  this entire phase is storing the wrong payload — an index when a count was needed, a
  count when an index was needed. Always ask "what does the *question* actually need me
  to remember?" before deciding the map's value type.
- **Longest prefix range needs earliest index.** For "longest subarray satisfying X"
  problems, only write a prefix value into the map the *first* time it's seen — a later
  occurrence would only produce a shorter candidate range.
- **`map.set(0, -1)` handles ranges beginning at index 0.** This seed represents "the
  empty prefix, occurring conceptually just before the array starts" — without it, any
  valid subarray that starts at index 0 is silently missed.
- **Negative numbers can make prefix sums increase or decrease.** Prefix Hash (Patterns
  6 and 8) works correctly regardless, since it's a pure algebraic identity — but this
  is exactly why Sliding Window's shrink logic (which assumes shrinking only ever helps,
  i.e., monotonic validity) does **not** transfer directly to negative-number
  problems.
- **Do not assume ordinary sliding window works with arbitrary negative values.** This
  is the single most important boundary to remember between Phase 1 and Phase 2: Sliding
  Window requires monotonic validity under shrinking (true for non-negative sums/
  products); Prefix Hash has no such requirement, which is exactly why it's the correct
  tool once negative numbers enter the picture.
- **Do not force HashMap into 3Sum.** Pattern 9 exists specifically to teach the
  boundary of hashing's usefulness — sorting plus two pointer is the better tool once
  duplicate-avoidance across a triplet (not just a pair) is required.
- **Custom hashing must handle collisions.** Any custom hash table implementation that
  doesn't explicitly account for two different keys landing in the same bucket is
  incomplete — collisions are mathematically guaranteed, not a rare edge case.
- **Hashing should allow direct bucket selection instead of searching every bucket.**
  The entire point of the hash function is to jump straight to the relevant bucket in
  O(1) — an implementation that scans every bucket to find a key has defeated the
  purpose of hashing entirely.

---

## Master Recognition Cheat Sheet

| Pattern | Trigger Keywords / Signal |
|---|---|
| Frequency Counting | anagram, frequency, majority element, k most/least frequent |
| Presence Checking | contains duplicate, does X exist, cycle detection |
| Counting Pattern | "count the number of..." pairs/subarrays/unique values |
| Grouping Pattern | group by, cluster, group anagrams |
| Mapping Pattern | find a pair/complement, index of a previously seen value, isomorphism |
| Prefix Hash | subarray sum equals k, zero-sum subarray, continuous subarray divisible by k |
| Hash + Sliding Window | contiguous window **and** multi-value frequency/presence condition |
| Hash + Prefix | "maximum length subarray" + a sum/prefix condition |
| Hash + Two Pointer | 3Sum, 4Sum, k-sum problems with k ≥ 3 |
| Custom Hash Thinking | "design a HashSet/HashMap," composite/tuple keys needed |

---

## Master Complexity Cheat Sheet

| Pattern | Time | Space |
|---|---|---|
| Frequency Counting | O(n) | O(k) |
| Presence Checking | O(n) | O(n) |
| Counting Pattern | O(n) | O(n) |
| Grouping Pattern | O(n · k log k) (sort-based signature) | O(n · k) |
| Mapping Pattern | O(n) | O(n) |
| Prefix Hash | O(n) | O(n) |
| Hash + Sliding Window | O(n) | O(k) |
| Hash + Prefix | O(n) | O(n) |
| Hash + Two Pointer (3Sum) | O(n²) | O(1) auxiliary (excl. output/sort) |
| Custom Hash Thinking | O(1) average, O(k) worst per op | O(numBuckets + n) |

---

## Master Mistakes Index

| Pattern | Most Dangerous Mistake |
|---|---|
| Frequency Counting | not verifying counts return to exactly zero (only checking presence) |
| Presence Checking | adding before checking, matching an element against itself |
| Counting Pattern | updating the map before accumulating the count for the current element |
| Grouping Pattern | comparing items pairwise instead of using an independent signature |
| Mapping Pattern | checking the map after inserting the current element instead of before |
| Prefix Hash | forgetting to seed `map.set(0, -1)` or `map.set(0, 1)` |
| Hash + Sliding Window | comparing full frequency maps every step instead of a `formed` counter |
| Hash + Prefix | overwriting the earliest index instead of write-once for "longest" problems |
| Hash + Two Pointer | forgetting to sort first, or mishandling duplicate-skipping |
| Custom Hash Thinking | not handling collisions (silently overwriting instead of chaining) |

---

## Cross-Pattern Comparison Table

| Question I'm Trying to Answer | Pattern to Reach For |
|---|---|
| Does this value exist? | Presence Checking (Set) |
| How many times does this occur? | Frequency Counting (Map count) |
| Where did this occur? | Mapping Pattern (Map index) |
| What shares a property with this? | Grouping Pattern (Map signature → list) |
| What was my cumulative state before? | Prefix Hash / Hash + Prefix |
| Is my current contiguous window still valid? | Hash + Sliding Window |
| Do three (or more) elements combine to a target? | Hash + Two Pointer (sort first) |
| No built-in hash structure available? | Custom Hash Thinking |

---

## Phase Recognition Checklist (from original training notes)

```
Existence?                     → Set
Frequency?                     → Map count
Location?                      → Map index
Grouping?                      → Map group
Previous cumulative state?     → Prefix + Hash
Active window state?           → Hash + Window
Ordered pair/triplet?          → Sort + Two Pointer may be better
No built-in hash?              → Custom Hash
```

---

## Phase 3 Preview — What Hashing Does *Not* Cover

Hashing answers "have I seen this?" and "what do I know about this?" in O(1), but it
deliberately has no notion of **order**, **structure**, or **relationships between
elements beyond direct lookup**. Phase 3 should pick up exactly where this stops:

- **Stacks & Monotonic Stack** — problems where the *relative order* of unprocessed
  elements matters (next-greater-element, histogram-area problems) — a HashMap has no
  way to represent "what's the nearest unresolved element behind me," which a stack
  captures naturally.
- **Queues & Monotonic Queue** — sliding-window-maximum-style problems, where Phase 1's
  Sliding Window needs an auxiliary ordered structure (not just a scalar or a frequency
  map) to answer "what's the max in the current window" efficiently as it slides.
- **Linked Lists** — a structure where "lookup by position" doesn't exist at all;
  hashing can still help (e.g., detecting a cycle via a Set of visited nodes), but the
  traversal model itself is fundamentally different from array indexing.
- **Graphs (adjacency structures)** — the natural evolution of the Mapping and Grouping
  patterns from this phase (`node → list of neighbors` is literally a grouping map), but
  now layered with traversal algorithms (BFS/DFS) that Phase 2 never needed.

**Progression:** Problem Solver → Software Engineer → SDE-2 → Senior Engineer →
Architect.

---

## Phase Lock

**PHASE 2 — HASHING: COMPLETE / LOCKED**

*(End of Part 2 — Patterns 6–10, Back Matter. This completes Phase2_Hashing.md.)*