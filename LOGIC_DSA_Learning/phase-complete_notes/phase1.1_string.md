# Phase1_String.md
### A Permanent Reference — Strings (Phase 1, Linear Data Processing)

**Author:** Bhanu Pratap
**Language:** JavaScript
**Status:** Strings — Complete (15/15 problems)
**Roadmap Position:** Phase 1 — Linear Data Processing → Arrays ✅ → **Strings ✅**

---

## Goal

Learn to treat a string as a specialized array — same underlying patterns (Traversal,
Two Pointer, Sliding Window, Hashing), but with one structural difference that changes
everything about implementation: **strings are immutable.** Everything genuinely new in
this phase either comes directly from that immutability, or from problems where the
"contiguous unit" of interest is a *substring* rather than a subarray of numbers.

**Core question this whole phase answers:**
> Given that I can't mutate a string in place, what do I build instead — and which
> already-known pattern (Two Pointer, Sliding Window, Hashing) does this problem reduce
> to once I see past the "it's text" surface?

---

## How To Use This Book

Same discipline as Phase 1 (Arrays) and Phase 2 (Hashing): read once fully. On revision,
jump to a pattern's **Revision Box**. Where a pattern was already fully documented in an
earlier phase (because a string problem turned out to be an ordinary array/hash pattern
in disguise), this book gives a **cross-reference**, not a duplicate — go to the linked
file for the full 15-section treatment, and use the short addendum here for what's
*specifically* different when the input happens to be a string.

---

## Solved Problems (15/15)

| # | Problem | Section in This Book |
|---|---|---|
| LC125 | Valid Palindrome | Cross-Reference (→ Phase1_Array.md, Two Pointer) |
| LC242 | Valid Anagram | Cross-Reference (→ Phase2_Hashing.md, Frequency Counting) |
| LC205 | Isomorphic Strings | Cross-Reference (→ Phase2_Hashing.md, Mapping) |
| LC49 | Group Anagrams | Cross-Reference (→ Phase2_Hashing.md, Grouping) |
| LC3 | Longest Substring Without Repeating Characters | Cross-Reference (→ Phase1_Array.md, Distinct Window) |
| LC76 | Minimum Window Substring | Cross-Reference + Addendum (→ Phase1_Array.md, Minimum Window) |
| LC5 | Longest Palindromic Substring | **New — Section C.2** |
| LC344 | Reverse String | Cross-Reference (→ Phase1_Array.md, Opposite Direction Two Pointer) |
| LC14 | Longest Common Prefix | **New — Part 2** |
| LC151 | Reverse Words in a String | **New — Part 2** |
| LC567 | Permutation in String | **New — Section C.3** |
| LC438 | Find All Anagrams in a String | **New — Section C.3** |
| LC459 | Repeated Substring Pattern | **New — Part 2** |
| LC443 | String Compression | **New — Part 2** |
| LC647 | Palindromic Substrings | **New — Section C.2** |

---

# Section A — String Fundamentals

### Definition
A string is, structurally, an array of characters — but with one binding rule that
overrides everything else: **JavaScript strings are immutable.** Once created, a
string's characters can never be changed in place; every "modification" actually builds
and returns a brand-new string.

### Core JavaScript Facts

| Operation | Behavior |
|---|---|
| `str[i]` | Reads the character at index `i` — works fine. |
| `str[i] = x` | **Silently does nothing.** No error, no mutation — the string is unchanged. |
| `str.trim()` | Returns a **new** string with whitespace removed; the original is untouched. |
| `str.substring(start, end)` | Returns characters from `start` up to, but **excluding**, `end`. |
| `str.split("")` | Converts a string into a **mutable** array of characters. |
| Character arrays (`["a","b","c"]`) | Mutable — `arr[i] = x` works, because it's a real array, not a string. |

### Why This Matters (Engineering Reasoning)
- **Why immutable?** Strings are frequently used as dictionary keys, cached values, and
  passed by reference in ways where in-place mutation would cause subtle,
  hard-to-trace bugs across every place that string is referenced. Immutability makes a
  string's value a permanent, safe fact once created — a deliberate language design
  trade-off, not an oversight.
- **How do you construct a changed string, given you can't mutate one?** You build a new
  string (via concatenation, `.slice()`, `.join()`, or converting to a character array,
  mutating that array, and joining it back) and either return it or reassign the
  variable to point at the new string.
- **The single most common bug this causes:** writing `str[i] = x` and assuming it
  worked, because JavaScript doesn't throw an error — it just silently no-ops. Always
  convert to an array first (`str.split("")`) if in-place-style mutation logic is
  needed, then `.join("")` at the end.

### Complexity Baseline Per Pattern (String-Specific)

| Pattern | Time |
|---|---|
| Traversal | O(n) |
| Hash + String | O(n) average |
| Two Pointer | O(n) |
| Sliding Window | O(n) |
| Center Expansion | O(n²) |

---

# Section B — Cross-Reference Notes (Already Covered in Prior Phases)

These five problems are **string-flavored instances of patterns already fully
documented** elsewhere. Rather than duplicate the 15-section treatment, this section
gives the pointer plus whatever is *specifically* new about seeing the pattern applied
to text instead of numbers.

## B.1 — LC344 Reverse String → [[Phase1_Array]] Opposite Direction Two Pointer (D.2)

**What's identical:** the exact same `left`/`right` converge-inward swap logic used for
reversing a numeric array.

**What's different for strings:** LC344's signature takes a `char[]` (character array),
*not* a string — this is a deliberate constraint in the problem itself, precisely
because a real JS string couldn't be mutated in place via `s[left] = s[right]`. The
takeaway: whenever a string problem asks for an "in-place" mutation, check whether the
input is actually a character array already, or whether you need to `.split("")` first.

```js
var reverseString = function (s) { // s is char[] here, not a string
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    [s[left], s[right]] = [s[right], s[left]];
  }
  return s;
};
```

## B.2 — LC125 Valid Palindrome → [[Phase1_Array]] Opposite Direction Two Pointer (D.2)

**What's identical:** converge-inward comparison from both ends.

**What's different for strings:** the comparison step must first *skip* non-alphanumeric
characters (spaces, punctuation) and normalize case, before comparing — the two-pointer
*mechanics* are unchanged, but each pointer's advance is now conditional on a character
filter, not unconditional.

```js
function isPalindrome(s) {
  const isAlnum = (ch) => /[a-z0-9]/i.test(ch);
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlnum(s[left])) left++;   // skip junk from the left
    while (left < right && !isAlnum(s[right])) right--; // skip junk from the right
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}
```

## B.3 — LC242 Valid Anagram → [[Phase2_Hashing]] Frequency Counting (Pattern 1)

**What's identical:** build a frequency map from one string, decrement while scanning
the other, verify every count returns to exactly zero.

**Nothing string-specific to add** — this is the canonical example the pattern was
originally documented against.

## B.4 — LC205 Isomorphic Strings → [[Phase2_Hashing]] Mapping Pattern (Pattern 5)

**What's identical:** the two-directional `value → value` map (`mapST`/`mapTS`), already
fully documented.

**Nothing string-specific to add.**

## B.5 — LC49 Group Anagrams → [[Phase2_Hashing]] Grouping Pattern (Pattern 4)

**What's identical:** compute a signature (sorted characters) per string, bucket by that
signature.

**Nothing string-specific to add** — this is the canonical example the pattern was
originally documented against.

## B.6 — LC3 Longest Substring Without Repeating Characters → [[Phase1_Array]] Distinct Window (E.5)

**What's identical:** the exact Set-based shrink-on-duplicate skeleton.

**What's different for strings:** none, mechanically — but worth noting explicitly,
since the character-frequency-map variant (`map.get(s[right]) > 1` triggers shrink) is
an equally valid alternative implementation, shown here for contrast against the
Set-based version already in Phase 1:

```js
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    map.set(s[right], (map.get(s[right]) || 0) + 1);
    while (map.get(s[right]) > 1) {          // frequency-map variant of the same idea
      map.set(s[left], map.get(s[left]) - 1);
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
```

## B.7 — LC76 Minimum Window Substring → [[Phase1_Array]] Minimum Window (E.7) + [[Phase2_Hashing]] Hash + Sliding Window (Pattern 7)

**What's identical:** everything — the `formed`/`matched` counter design, the
shrink-while-valid loop, the two frequency maps.

**The one insight worth re-stating explicitly (from original notes), because it's the
most important idea in this entire problem and is easy to forget under pressure:**

> **We never compare two HashMaps directly.** Comparing `windowMap` against `needMap`
> character-by-character on every iteration would cost O(k) per step (k = alphabet
> size), silently degrading the whole algorithm. Instead, we maintain a single small
> variable — `matched` — that already tells us in O(1) whether every requirement is
> currently satisfied. `matched` only changes at the exact moment a specific
> character's count crosses into or out of satisfying its requirement — never by
> re-scanning the maps.

```js
var minWindow = function (s, t) {
  if (s.length < t.length) return "";
  const needMap = {};
  for (const ch of t) needMap[ch] = (needMap[ch] || 0) + 1;

  const required = Object.keys(needMap).length;
  const windowMap = {};
  let left = 0, matched = 0, minLength = Infinity, startIndex = 0;

  for (let right = 0; right < s.length; right++) {
    windowMap[s[right]] = (windowMap[s[right]] || 0) + 1;
    if (needMap[s[right]] !== undefined && needMap[s[right]] === windowMap[s[right]]) {
      matched++; // this character JUST reached its required count — update the O(1) signal
    }

    while (matched === required) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        startIndex = left;
      }
      windowMap[s[left]]--;
      if (needMap[s[left]] !== undefined && needMap[s[left]] > windowMap[s[left]]) {
        matched--; // removing s[left] just BROKE a requirement — update the signal
      }
      left++;
    }
  }
  return minLength === Infinity ? "" : s.substring(startIndex, startIndex + minLength);
};
```

> **Revision Box (B.7 addendum)**
> Formula/invariant: *`matched` is the O(1) summary of "are all requirements satisfied" — never compare maps directly.*
> Mental model in one phrase: *a single scoreboard number instead of re-reading every player's stats.*
> Complexity: *O(|s| + |t|) time, O(k) space.*

---

# Section C — New String Patterns

## C.1 — Two Pointer for Strings (General Note)

This is not a separate 15-section pattern — it's the observation that **every**
Opposite/Same-Direction Two Pointer technique from Phase 1 (Arrays) applies to strings
completely unchanged in *mechanics*, with the only addition being: strings are
immutable, so if the problem asks for in-place output, convert to a character array
first (`.split("")`), do the two-pointer work there, and `.join("")` (or accept a
`char[]` input directly, as LC344 does). See B.1 and B.2 above for the two worked
examples.

---

## C.2 — Center Expansion (Palindrome Family)

### 1. Definition
Center Expansion finds palindromic substrings by treating every possible **center**
(either a single character, for odd-length palindromes, or the gap between two adjacent
characters, for even-length palindromes) as a starting point, and expanding outward in
both directions simultaneously as long as the characters on each side match.

### 2. Why This Pattern Exists
- **Brute force:** checking every possible substring (`O(n²)` substrings) and verifying
  each one is a palindrome (`O(n)` per check) costs **O(n³)** total — this is exactly
  what a naive nested-loop-plus-`palindromeCheck` solution produces, and it hits Time
  Limit Exceeded on any reasonably sized input.
- **What it wastes:** re-verifying overlapping regions of the string from scratch for
  every single candidate substring, when a palindrome's own symmetric structure already
  tells you *directly* where to look — around a center, not across arbitrary
  `(left, right)` pairs chosen independently.
- **Why waste is avoidable:** a palindrome is defined entirely by its center and how far
  it extends symmetrically outward — so instead of guessing `(left, right)` pairs and
  checking them, you can *generate* valid palindromes directly by picking every possible
  center and growing outward until symmetry breaks.
- **This pattern:** collapse O(n³) down to O(n²) by anchoring the search at each of the
  `O(n)` possible centers and letting each one expand in O(n) worst case, rather than
  independently verifying O(n²) candidate substrings at O(n) cost each.

### 3. Engineering Intuition (Mental Model)
Picture a palindrome as ripples spreading outward from a point dropped in still water.
For an odd-length palindrome like `"bab"`, the drop point is a single character (the
`a`), and the ripples (`b` and `b`) move outward symmetrically. For an even-length
palindrome like `"abba"`, there is no single center character — the drop point falls
*between* the two middle characters (`b` and `b`), and the ripples still spread out
symmetrically from that gap. Either way, you're not scanning for palindromes — you're
*growing* them outward from a fixed point until the water hits an edge that breaks the
symmetry.

### 4. Why It Works (Proof / Reasoning)
Every palindrome, by definition, is symmetric around exactly one of two kinds of
centers: a single character (odd length) or a gap between two adjacent characters (even
length). This means **every possible palindromic substring in the entire string** can be
discovered by trying all `n` single-character centers and all `n-1` between-character
centers, and expanding each one as far as symmetry allows — no palindrome can exist that
isn't anchored at one of these `2n - 1` centers, because its own middle point (or middle
gap) *is* one of them by construction. Expansion is correct because the moment
`s[left] !== s[right]`, extending further can never produce a valid palindrome (any
larger candidate would necessarily still need to match at that exact `left`/`right`
pair) — so stopping there and taking `s.substring(left + 1, right)` (the last valid
matching bounds before the mismatch, or before running off either edge of the string)
is guaranteed to be the largest palindrome centered at that specific point.

### 5. Visualization

**Odd center**, `s = "aba"`, center at index 1:
```
a b a
  ↑
left=1, right=1: s[1]===s[1] → expand
left=0, right=2: s[0]===s[2] ('a'==='a') → expand
left=-1, right=3: out of bounds → STOP
Last valid range: substring(left+1, right) = substring(0, 3) = "aba"
```

**Even center**, `s = "abba"`, center between index 1 and 2:
```
a b b a
  ↑ ↑
left=1, right=2: s[1]===s[2] ('b'==='b') → expand
left=0, right=3: s[0]===s[3] ('a'==='a') → expand
left=-1, right=4: out of bounds → STOP
Last valid range: substring(left+1, right) = substring(0, 4) = "abba"
```

**Mismatch case**, `s = "babad"`, odd center at index 2:
```
left=2, right=2: 'b'==='b' → expand
left=1, right=3: 'a'==='a' → expand
left=0, right=4: 'b' !== 'd' → STOP (mismatch, not a boundary)
Last valid range: substring(left+1, right) = substring(1, 4) = "aba"
```

The **same rule** — `substring(left + 1, right)` — applies whether the loop stopped
because of an out-of-bounds index or an actual character mismatch; both cases leave
`left`/`right` one step past the last valid matching pair.

### 6. Recognition Signal
The problem statement mentions: *palindrome*, *palindromic substring*, and asks for
either the **longest** one (LC5) or a **count** of all of them (LC647) — as opposed to
just checking whether one given string is a palindrome (which is Two Pointer, C.1/B.2,
not Center Expansion).

### 7. Algorithm (Step-by-Step)
1. For every index `i` from `0` to `n - 1`:
   a. Run expansion with `left = i, right = i` (odd-length center at `i`).
   b. Run expansion with `left = i, right = i + 1` (even-length center between `i` and
      `i+1`).
2. Expansion: while `left >= 0 && right < n && s[left] === s[right]`, decrement `left`
   and increment `right`.
3. When expansion stops, the valid palindrome bounds are `(left + 1, right)` —
   exclusive on `right`, matching `substring`'s own convention.
4. For **longest palindrome** (LC5): track the longest such substring found across all
   centers.
   For **count all palindromic substrings** (LC647): every successful expansion step
   itself represents one valid palindrome — increment a counter *inside* the expansion
   loop, once per successful match, not just once per center.

### 8. Pseudocode
```
function longestPalindrome(s):
    longest = ""
    for i from 0 to length(s) - 1:
        odd = expand(s, i, i)
        even = expand(s, i, i + 1)
        current = the longer of odd and even
        if length(current) > length(longest):
            longest = current
    return longest

function expand(s, left, right):
    while left >= 0 and right < length(s) and s[left] == s[right]:
        left = left - 1
        right = right + 1
    return s.substring(left + 1, right)
```

### 9. JavaScript Implementation
```js
// LC5 — Longest Palindromic Substring
var longestPalindrome = function (s) {
  if (s.length === 0) return "";
  let longest = "";

  for (let i = 0; i < s.length; i++) {
    const oddPalindrome = expand(s, i, i);       // single-character center
    const evenPalindrome = expand(s, i, i + 1);  // between-character center

    // Math.max does NOT work on strings — compare by .length explicitly
    const current = oddPalindrome.length > evenPalindrome.length ? oddPalindrome : evenPalindrome;
    if (current.length > longest.length) longest = current;
  }
  return longest;
};

function expand(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return s.substring(left + 1, right); // last valid bounds BEFORE the mismatch/out-of-bounds
}

// LC647 — Palindromic Substrings (count, not longest)
var countSubstrings = function (s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    total = expandAndCount(s, i, i, total);      // odd
    total = expandAndCount(s, i, i + 1, total);  // even
  }
  return total;
};

function expandAndCount(s, left, right, count) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++;      // EVERY successful expansion IS one valid palindrome — count it here
    left--;
    right++;
  }
  return count;
}
```

### 10. Dry Run
`longestPalindrome("babad")`

| i | odd expand(i,i) | even expand(i,i+1) | current | longest after |
|---|---|---|---|---|
| 0 | "b" | "" (s[0]!==s[1]) | "b" | "b" |
| 1 | "aba" (expands from a) | "" | "aba" | "aba" |
| 2 | "bab" | "" | "bab" | "aba" (tie, first kept) |
| 3 | "a" | "" | "a" | "aba" |
| 4 | "d" | — (right out of bounds) | "d" | "aba" |

Final: `"aba"` (or `"bab"` — both length 3, either is an accepted answer for LC5)

`countSubstrings("aaa")`

| i | odd expansions (count++) | even expansions (count++) | running total |
|---|---|---|---|
| 0 | "a" (1) | "aa" (1, since s[0]==s[1]) | 2 |
| 1 | "a" then expands to "aaa" (2) | "aa" (1, s[1]==s[2]) | 5 |
| 2 | "a" (1) | — (right out of bounds) | 6 |

Final: `6` — matches expected output for `"aaa"` (`"a","a","a","aa","aa","aaa"`)

### 11. Complexity Analysis
- **Time: O(n²)** — there are `2n - 1` possible centers, which is `O(n)`; each center's
  expansion can run up to `O(n)` steps in the worst case (e.g., a string of all
  identical characters). `O(n) × O(n) = O(n²)`.
- **Space: O(1)** extra, beyond whatever the returned substring itself requires (for
  LC5); **O(1)** entirely for LC647, since only a running integer count is kept.

### 12. Common Mistakes
- ❌ **Checking `s.length % 2` to decide whether to look for an odd or even center** —
  this is a fundamental misunderstanding. A palindrome's center type has *nothing* to do
  with the overall string's length parity; every index needs *both* an odd-center check
  (`i, i`) and an even-center check (`i, i+1`) tried, every single time.
  Any single character *can* be an odd center (a palindrome of length 1) inside a string
  of any length, odd or even.
- ❌ **Using `Math.max()` to compare candidate palindromes** — `Math.max()` only works on
  numbers; comparing two strings directly requires comparing `.length` explicitly
  (`a.length > b.length ? a : b`), never `Math.max(a, b)`.
- ❌ **Forgetting `s.substring(left + 1, right)` after the expansion loop, and instead
  using `left`/`right` directly** — at the moment the `while` loop exits, `left` and
  `right` point *one step past* the last valid palindrome boundary (either from a
  mismatch or from running off the string's edge); the actual palindrome is
  `substring(left + 1, right)`, not `substring(left, right + 1)`.
- ❌ **For LC647 specifically, forgetting that `count++` belongs inside the `while` loop
  of the expansion itself** — every successful match *during* expansion is its own
  distinct valid palindrome (a shorter one nested inside a longer one at the same
  center), not just the final, longest expansion at that center.

### 13. Edge Cases
- Single-character string — trivially a palindrome of length 1; both LC5 and LC647
  should handle this correctly via the odd-center case (`expand(s, 0, 0)` immediately).
- Entire string is one repeated character (e.g., `"aaaa"`) — every possible substring is
  a palindrome; LC647's count should reflect `n(n+1)/2` total palindromic substrings.
- No palindrome longer than 1 character exists (e.g., `"abcd"`) — LC5 should return any
  single character (all are trivially valid), and LC647 should return exactly `n` (one
  per single character, no longer palindromes).

### 14. Interview Explanation
"Center Expansion solves palindrome problems by recognizing that every palindrome is
symmetric around either a single character (odd length) or a gap between two characters
(even length) — so instead of checking O(n²) candidate substrings at O(n) cost each
(O(n³) total), I try all `2n-1` possible centers and expand each one outward while the
characters match. That's O(n) centers times O(n) expansion each, giving O(n²). The
overall length parity of the string is irrelevant — every index needs both an odd-center
and an even-center attempt, since a short palindrome of either type can occur anywhere.
For counting all palindromic substrings rather than just the longest, every successful
expansion step is itself one valid palindrome, so I increment the count inside the
expansion loop, not just once per center."

### 15. Related Problems & Revision Box
- **LC5** — Longest Palindromic Substring
- **LC647** — Palindromic Substrings
- (Related but not yet solved: LC516 — Longest Palindromic Subsequence, which is a
  different family entirely — Dynamic Programming, not Center Expansion, since a
  *subsequence* doesn't need to be contiguous.)

> **Revision Box**
> Formula/invariant: *try both `(i,i)` and `(i,i+1)` for every index; after expansion, the palindrome is `substring(left+1, right)`.*
> Mental model in one phrase: *ripples spreading outward from a dropped point (or a gap) in still water.*
> Complexity: *O(n²) time, O(1) extra space.*

---

## C.3 — Fixed Window + Frequency (The Permutation Family)

### 1. Definition
This pattern detects whether a **fixed-size window** of one string is a permutation
(anagram) of another string, by maintaining a live frequency comparison between the
window's current character counts and a target's required character counts — without
ever regenerating permutations or comparing the two frequency maps wholesale on every
step.

### 2. Why This Pattern Exists
- **Brute force:** to check whether *any* substring of `s2` is a permutation of `s1`,
  generating all permutations of `s1` and searching for each one inside `s2` is
  factorially expensive (`O(k!)` for a pattern of length `k`) and completely impractical.
- **What it wastes:** permutations don't need to be *generated* at all — "is this window
  a permutation of the target" is exactly the same question as "do these two multisets
  of characters have identical frequency," which Frequency Counting (Phase 2, Pattern 1)
  already answers, and Sliding Window (Phase 1) already knows how to maintain
  incrementally.
- **Why waste is avoidable:** since a permutation must have *exactly* the same length as
  the target, the window size is always fixed at `s1.length` — combine that fixed window
  with an incrementally maintained frequency map (add on entry, remove on exit) and a
  `matched` counter (same O(1) validity signal as LC76), and every window can be checked
  for permutation-equality in O(1) amortized.
- **This pattern:** compose Fixed Size Window (Phase 1) with Frequency Counting (Phase
  2) — recognizing this composition, rather than reasoning about permutations directly,
  is the entire skill.

### 3. Engineering Intuition (Mental Model)
Think of a bouncer checking whether a group of people entering a room exactly matches a
required guest list — not by name and order, just by *composition* (2 doctors, 1
lawyer, 3 engineers, say). As people enter and leave through a revolving door
(the sliding window), the bouncer just ticks a running tally up or down and watches a
single "fully matched?" indicator — never re-counting the whole room from scratch on
every person's entry or exit.

### 4. Why It Works (Proof / Reasoning)
Two strings of the same length are permutations of each other **if and only if** they
have identical character frequency profiles — this is the defining property of an
anagram/permutation. Since the required window size is always exactly `s1.length` (a
permutation can't be longer or shorter than the string it permutes), the window never
needs to *search* for the right size — it's fixed and known up front. Maintaining
`windowMap` incrementally (Phase 1's Fixed Window technique) and tracking `matched`
(Phase 2/LC76's O(1) validity signal) together guarantee that `matched === required`
exactly captures "the window's frequency profile currently equals the target's," with
no wasted re-comparison.

### 5. Visualization
`checkInclusion("ab", "eidbaooo")` — window size = 2:

```
window "ei": e:1,i:1 vs need a:1,b:1 → matched=0
window "id": no match
window "db": d matches nothing, b partially → matched grows/shrinks
window "ba": a:1, b:1 → matched === required (2) → FOUND, return true
```

### 6. Recognition Signal
The problem statement mentions: *permutation of s1 exists within s2*, or *find all
starting indices of anagrams of p in s* — the signal is "same character composition, any
order, fixed length" combined with a search across a larger string.

### 7. Algorithm (Step-by-Step)
1. Build `needMap` from the target string (`s1` or `p`); `required = needMap.size`
   (number of *distinct* characters required).
2. Slide a window of size exactly `target.length` across the source string:
   a. Add the entering character to `windowMap`; if its count now exactly equals
      `needMap`'s count for that character, increment `matched`.
   b. Once the window exceeds the target length, remove the exiting character from
      `windowMap` — if its count *was* exactly matching before the removal, decrement
      `matched` first, then remove.
3. Whenever `matched === required`, the current window is a valid permutation —
   **for LC567:** return `true` immediately.
   **for LC438:** record the window's starting index and continue scanning (do not
   stop).

### 8. Pseudocode
```
function slidingPermutationCheck(source, target, onMatch):
    needMap = frequency map of target
    required = number of distinct keys in needMap
    windowMap = empty map
    left = 0, matched = 0

    for right from 0 to length(source) - 1:
        char = source[right]
        windowMap[char] += 1
        if windowMap[char] == needMap[char]:
            matched += 1

        if right - left + 1 > length(target):
            leftChar = source[left]
            if windowMap[leftChar] == needMap[leftChar]:
                matched -= 1
            windowMap[leftChar] -= 1
            left += 1

        if matched == required:
            onMatch(left)   // return true (LC567), or push(left) and continue (LC438)
```

### 9. JavaScript Implementation
```js
// LC567 — Permutation in String: does ANY permutation of s1 exist in s2?
function checkInclusion(s1, s2) {
  const needMap = new Map();
  for (const ch of s1) needMap.set(ch, (needMap.get(ch) || 0) + 1);

  const required = needMap.size;
  const windowMap = new Map();
  let left = 0, matched = 0;

  for (let right = 0; right < s2.length; right++) {
    const char = s2[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);
    if (windowMap.get(char) === needMap.get(char)) matched++;

    if (right - left + 1 > s1.length) {          // window has grown past fixed size — shrink
      const leftChar = s2[left];
      if (windowMap.get(leftChar) === needMap.get(leftChar)) matched--;
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      left++;
    }

    if (matched === required) return true; // LC567: stop at the FIRST valid window
  }
  return false;
}

// LC438 — Find All Anagrams: same engine, but collect EVERY valid window's start index
function findAnagrams(s, p) {
  const needMap = new Map();
  for (const ch of p) needMap.set(ch, (needMap.get(ch) || 0) + 1);

  const required = needMap.size;
  const windowMap = new Map();
  const result = [];
  let left = 0, matched = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);
    if (windowMap.get(char) === needMap.get(char)) matched++;

    if (right - left + 1 > p.length) {
      const leftChar = s[left];
      if (windowMap.get(leftChar) === needMap.get(leftChar)) matched--;
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      left++;
    }

    if (matched === required) result.push(left); // LC438: RECORD and keep scanning, never return early
  }
  return result;
}
```

### 10. Dry Run
`checkInclusion("ab", "eidbaooo")`

| right | char | windowMap | matched | shrink? | left after | matched===required? |
|---|---|---|---|---|---|---|
| 0 | e | {e:1} | 0 | no (win size 1 ≤ 2) | 0 | no |
| 1 | i | {e:1,i:1} | 0 | no | 0 | no |
| 2 | d | {e:1,i:1,d:1} | 0 | win size 3 > 2 → remove e | 1 | no |
| 3 | b | {i:1,d:1,b:1} | 1 (b matches need) | win size 3 > 2 → remove i | 2 | no |
| 4 | a | {d:1,b:1,a:1} | 2 (a matches too) | win size 3 > 2 → remove d | 3 | **yes → return true** |

### 11. Complexity Analysis
- **Time: O(n)**, where `n = source.length` — building `needMap` is O(m), and the main
  scan has `left`/`right` each advancing at most `n` times, each map operation O(1)
  average.
- **Space: O(k)**, where `k` is the alphabet size (bounded, e.g., 26 for lowercase
  English letters) — both maps are bounded regardless of `n`.

### 12. Common Mistakes
- ❌ **The single most important distinction between LC567 and LC438 (from original
  notes):** they share the *exact same* algorithmic engine (frequency map + fixed
  sliding window + incremental update) — the only difference is what happens on a
  match. LC567 returns `true` immediately (only existence matters); LC438 pushes the
  index and **keeps scanning** (every occurrence matters). Writing `return true` inside
  LC438's loop, or forgetting to `continue`/not-return inside LC567's, is the most
  common copy-paste bug between these two problems.
- ❌ Comparing `windowMap` and `needMap` directly (wholesale) at every step instead of
  maintaining `matched` — reintroduces O(k) work per step.
- ❌ Decrementing `windowMap[leftChar]` **before** checking whether it currently matches
  `needMap[leftChar]` — the `matched` decrement must be evaluated against the
  *pre-removal* count, not the post-removal one.

### 13. Edge Cases
- `target.length > source.length` — no valid window can ever exist; the fixed-window
  shrink condition (`right - left + 1 > target.length`) never even needs special-casing,
  since the loop simply never reaches a state where `matched === required`.
- `target` has repeated characters (e.g., `"aab"`) — handled correctly by construction,
  since frequency comparison (not just presence) is what `windowMap.get(char) ===
  needMap.get(char)` checks.
- No valid permutation exists anywhere in `source` — LC567 returns `false`; LC438
  returns an empty array.

### 14. Interview Explanation
"Both Permutation in String and Find All Anagrams reduce to the same thing: a fixed-size
sliding window (size equals the target's length, since a permutation must match length
exactly) combined with an incrementally maintained frequency map and a `matched` counter
— the same O(1) validity signal used in Minimum Window Substring. The only difference
between the two problems is what happens when `matched === required`: one returns
immediately since only existence matters, the other records the index and keeps
scanning since every occurrence matters. Recognizing that both problems are the exact
same engine with a different match-handler is the actual insight — not two separate
algorithms."

### 15. Related Problems & Revision Box
- **LC567** — Permutation in String
- **LC438** — Find All Anagrams in a String

> **Revision Box**
> Formula/invariant: *fixed window size = target.length; same `matched` engine as LC76; only the match-handler differs between "return true" and "record and continue."*
> Mental model in one phrase: *a bouncer watching a running tally through a revolving door, not recounting the whole room each time.*
> Complexity: *O(n) time, O(k) space.*

---

*(End of Part 1 — Fundamentals, Cross-Reference Notes, Two Pointer for Strings, Center
Expansion / Palindrome Family, Fixed Window + Frequency / Permutation Family. Continue
with Part 2: Parsing, Prefix Comparison, Repetition Reasoning, Construction/Compression,
plus Back Matter.)*
# Phase1_String.md — Part 2
### Parsing, Prefix Comparison, Repetition Reasoning, Construction + Back Matter

*(Continues directly from Part 1 — Fundamentals, Cross-Reference Notes, Two Pointer for
Strings, Center Expansion, Fixed Window + Frequency. Concatenate after Part 1. No front
matter repeated here.)*

---

## C.4 — Parsing (Word Reversal)

### 1. Definition
Parsing is the pattern of breaking a string into meaningful **tokens** (words, in this
case) using a defined delimiter rule, then processing those tokens as discrete units
(reordering, filtering, transforming) rather than working with the raw character stream
directly.

### 2. Why This Pattern Exists
- **Brute force:** manually scanning character-by-character to detect word boundaries,
  handle multiple consecutive spaces, and track word start/end indices by hand is
  error-prone and verbose — every edge case (leading spaces, trailing spaces, multiple
  spaces between words) needs its own explicit handling.
- **What it wastes:** re-deriving word-boundary detection from scratch when the
  language's built-in tokenizer (`split` with a regex) already does exactly this,
  correctly, in one call.
- **Why waste is avoidable:** treat the string as "words separated by one-or-more
  whitespace characters," split on that pattern once, and now the problem is just an
  array-reversal problem (Phase 1, Two Pointer) applied to an array of words instead of
  numbers.
- **This pattern:** reduce a text-processing problem to an already-known array pattern,
  by choosing the right tokenization step first.

### 3. Engineering Intuition (Mental Model)
Think of a sentence as a line of people holding word-cards, with some irregular gaps
between them (extra spaces). First, you ask everyone to close ranks so there's exactly
one normal gap between each person (trimming and normalizing whitespace) — then you
simply have them reverse their order, the same way you'd reverse a line of numbered
cards.

### 4. Why It Works (Proof / Reasoning)
Splitting on the regex `/\s+/` (one or more whitespace characters) after first trimming
the string's leading/trailing whitespace produces an array containing exactly the
words, with no empty-string artifacts from consecutive spaces. Once tokenized into an
array, reversing word order is a direct application of Opposite Direction Two Pointer
(Phase 1) — its correctness proof (every symmetric pair is swapped exactly once)
transfers unchanged, since the array now holds words instead of numbers.

### 5. Visualization
`"  hello   world  "` →

```
.trim()             → "hello   world"
.split(/\s+/)        → ["hello", "world"]
two-pointer reverse  → ["world", "hello"]
.join(' ')            → "world hello"
```

### 6. Recognition Signal
The problem statement mentions: *reverse the words*, *tokenize*, *parse into
words/tokens*, or requires treating whitespace-separated substrings as atomic units
rather than individual characters.

### 7. Algorithm (Step-by-Step)
1. `s.trim()` — remove leading/trailing whitespace.
2. `s.split(/\s+/)` — split on one-or-more whitespace characters, producing an array of
   words with no empty entries.
3. Apply Opposite Direction Two Pointer to reverse the word array in place.
4. `words.join(' ')` — reassemble into a single string with single-space separators.

### 8. Pseudocode
```
function reverseWords(s):
    s = trim(s)
    words = split(s, one-or-more-whitespace)
    left = 0
    right = length(words) - 1
    while left < right:
        swap(words[left], words[right])
        left = left + 1
        right = right - 1
    return join(words, " ")
```

### 9. JavaScript Implementation
```js
var reverseWords = function (s) {
  s = s.trim();                    // strip leading/trailing whitespace first
  const words = s.split(/\s+/);    // \s+ collapses ANY run of whitespace into one delimiter

  let left = 0, right = words.length - 1;
  while (left < right) {           // exact same Opposite Direction Two Pointer as Phase 1
    [words[left], words[right]] = [words[right], words[left]];
    left++;
    right--;
  }
  return words.join(' ');
};
```

### 10. Dry Run
Input: `"  hello   world  "`

| step | value |
|---|---|
| after trim | `"hello   world"` |
| after split(/\s+/) | `["hello", "world"]` |
| left=0,right=1: swap | `["world", "hello"]` |
| left=1,right=0: loop ends | — |
| after join(' ') | `"world hello"` |

Final: `"world hello"`

### 11. Complexity Analysis
- **Time: O(n)** — trimming, splitting, and joining are each O(n); the two-pointer
  reversal over the word array is O(w), where `w ≤ n` is the number of words —
  dominated by the O(n) string operations.
- **Space: O(n)** — the split produces a new array holding copies of every word.

### 12. Common Mistakes
- ❌ Splitting on a single space (`split(' ')`) instead of `/\s+/` — this produces empty
  string entries wherever there were multiple consecutive spaces, which then get
  reversed into the output incorrectly (or need separate filtering).
- ❌ Forgetting `.trim()` before splitting — leading/trailing whitespace produces leading/
  trailing empty-string tokens.
- ❌ Trying to reverse the words via direct string manipulation instead of tokenizing
  first — significantly more error-prone than treating it as an already-solved array
  problem.

### 13. Edge Cases
- Multiple consecutive spaces between words — handled correctly by `/\s+/`.
- Leading/trailing whitespace — handled by `.trim()` before splitting.
- Single word input — the two-pointer loop condition (`left < right`) is immediately
  false; the single word is returned unchanged.

### 14. Interview Explanation
"Reverse Words in a String is really an array-reversal problem wearing a text-processing
costume. I trim the string, then split on any run of whitespace using `/\s+/` — that
gives me a clean array of words with no empty entries from extra spaces. From there it's
the exact same Opposite Direction Two Pointer swap I'd use to reverse an array of
numbers, just applied to words, and I join them back with single spaces at the end."

### 15. Related Problems & Revision Box
- **LC151** — Reverse Words in a String

> **Revision Box**
> Formula/invariant: *trim → split(/\s+/) → two-pointer reverse the array → join(' ').*
> Mental model in one phrase: *a line of word-cards closing ranks, then reversing order.*
> Complexity: *O(n) time, O(n) space.*

---

## C.5 — Prefix Comparison

### 1. Definition
Prefix Comparison finds the longest string that is a **prefix of every string** in a
given collection, by comparing characters at the same position across all strings
simultaneously, one position at a time, and stopping the instant any string disagrees or
runs out of characters.

### 2. Why This Pattern Exists
- **Brute force:** comparing every pair of strings independently, or repeatedly
  recomputing the common prefix from scratch for growing subsets, wastes work when a
  single simultaneous column-by-column scan already answers the question directly.
- **What it wastes:** re-reading characters that have *already* been confirmed common to
  every string, if the comparison strategy isn't structured to fail fast at the first
  disagreement.
- **Why waste is avoidable:** the answer can only ever be as long as the *shortest*
  string in the collection, and the moment any string disagrees at a given position (or
  runs out of characters), no further extension of the prefix is possible — so stop
  immediately rather than continuing to check.
- **This pattern:** treat the first string as a reference and, position by position,
  verify every other string matches it at that position — the first failure (a
  mismatch, or a string that's too short) immediately gives the answer up to that point.

### 3. Engineering Intuition (Mental Model)
Picture proofreading several translated versions of the same opening sentence, letter by
letter, in parallel columns. You read down each column (position `0` across every
version, then position `1`, and so on). The instant you find a column where the letters
disagree — or a version runs out of letters entirely — you stop; the answer is
everything you successfully verified before that column.

### 4. Why It Works (Proof / Reasoning)
The longest common prefix, by definition, is the longest string `P` such that `P` is a
prefix of every string in the collection. Comparing all strings at position `length`
(starting from `0`) against the reference string's character at that position directly
tests whether extending the current confirmed prefix by one more character is still
valid for every string. The moment this fails for *any* string, `P` cannot be extended
further — the current confirmed length is the exact, maximal answer, since going further
would violate the definition for at least one string in the collection.

### 5. Visualization
`["flower", "flow", "flight"]`

```
length=0: char='f' → flower[0]='f' ✓, flow[0]='f' ✓, flight[0]='f' ✓ → continue
length=1: char='l' → all match ✓ → continue
length=2: char='o' → flower[2]='o' ✓, flow[2]='o' ✓, flight[2]='i' ✗ → STOP

Result: strs[0].substring(0, 2) = "fl"
```

### 6. Recognition Signal
The problem statement mentions: *longest common prefix*, or requires finding the longest
shared beginning across multiple strings.

### 7. Algorithm (Step-by-Step)
1. Use `strs[0]` as the reference string.
2. For `length` from `0` up to `strs[0].length - 1`:
   a. Let `char = strs[0][length]`.
   b. For every other string `strs[i]`: if `length === strs[i].length` (that string ran
      out) or `strs[i][length] !== char`, return `strs[0].substring(0, length)`
      immediately.
3. If the loop completes without any mismatch, `strs[0]` itself is the common prefix
   (it's a prefix of, or equal to, every other string).

### 8. Pseudocode
```
function longestCommonPrefix(strs):
    length = 0
    while length < strs[0].length:
        char = strs[0][length]
        for i from 1 to length(strs) - 1:
            if length == strs[i].length or strs[i][length] != char:
                return strs[0].substring(0, length)
        length = length + 1
    return strs[0]
```

### 9. JavaScript Implementation
```js
var longestCommonPrefix = function (strs) {
  let length = 0;

  while (length < strs[0].length) {
    const char = strs[0][length];

    for (let i = 1; i < strs.length; i++) {
      // either this string ran out of characters, or it disagrees at this position
      if (length === strs[i].length || char !== strs[i][length]) {
        return strs[0].substring(0, length); // return everything confirmed BEFORE this failure
      }
    }
    length++;
  }
  return strs[0]; // strs[0] itself is the common prefix (it's the shortest, or all equal)
};
```

### 10. Dry Run
Input: `["flower", "flow", "flight"]`

| length | char (strs[0][length]) | check flow | check flight | result |
|---|---|---|---|---|
| 0 | 'f' | 'f' ✓ | 'f' ✓ | continue |
| 1 | 'l' | 'l' ✓ | 'l' ✓ | continue |
| 2 | 'o' | 'o' ✓ | 'i' ✗ | **return substring(0,2) = "fl"** |

Final: `"fl"`

### 11. Complexity Analysis
- **Time: O(S)**, where `S` is the sum of all characters across all strings in the worst
  case (each character is compared against the reference at most once before a mismatch
  or the reference string is exhausted) — commonly expressed as
  **O(n × m)**, where `n` is the number of strings and `m` is the length of the shortest
  string, since the outer loop can run at most `m` times.
- **Space: O(1)** extra, beyond the returned substring itself.

### 12. Common Mistakes
- ❌ Comparing all pairs of strings against each other instead of using one reference
  string and checking every other string against it — unnecessarily complex and no more
  correct.
- ❌ Forgetting the `length === strs[i].length` boundary check — accessing
  `strs[i][length]` on a string that's already exhausted silently returns `undefined`,
  which technically still fails the `!==` comparison correctly in JS, but relying on
  that implicit behavior instead of an explicit boundary check is fragile and easy to
  break under refactoring.
- ❌ Iterating `length` up to `strs[i].length` for some other string `i` instead of
  `strs[0].length` — the reference string's own length is what bounds the outer loop,
  since the answer can never be longer than *any* string, including the reference.

### 13. Edge Cases
- Empty array of strings — needs an explicit guard (`strs[0]` would throw); check
  problem constraints for whether this is guaranteed non-empty.
- Single string in the array — the whole string is trivially its own common prefix; the
  inner loop never runs (no other strings to compare against), so the outer loop
  completes fully and returns `strs[0]`.
- No common prefix at all (e.g., `["dog", "cat"]`) — the very first character comparison
  fails, returning an empty string (`length` never advances past `0`).

### 14. Interview Explanation
"Longest Common Prefix compares all strings column by column — position 0 across every
string, then position 1, and so on — using the first string as a reference. The instant
any string disagrees at a position, or runs out of characters, I know the prefix can't
be extended any further, so I return everything confirmed up to that point. It's O(n ×
m) where m is the shortest string's length, since that's the maximum the outer loop can
run before either a mismatch or exhausting the reference string."

### 15. Related Problems & Revision Box
- **LC14** — Longest Common Prefix

> **Revision Box**
> Formula/invariant: *compare column-by-column against strs[0]; stop at the first mismatch or exhausted string.*
> Mental model in one phrase: *proofreading parallel translations, letter by letter, down each column.*
> Complexity: *O(n × m) time (m = shortest string length), O(1) extra space.*

---

## C.6 — Repetition Reasoning

### 1. Definition
Repetition Reasoning solves "is this string made of a repeated smaller block?" problems
using a mathematical/structural insight rather than brute-force enumeration — for the
specific case of detecting a repeated substring pattern, the key insight is that
concatenating the string with itself, then stripping the first and last character,
produces a string that contains the original **if and only if** the original is built
from a repeated block.

### 2. Why This Pattern Exists
- **Brute force:** trying every possible block length that evenly divides the string's
  total length, building the repeated string from that block, and comparing it against
  the original, works — but requires reasoning carefully about *which* lengths are even
  worth trying (only divisors of `n`) to avoid wasted comparisons.
- **What it wastes:** the brute-force approach, while already reasonably efficient
  (bounded by divisors of `n`), still requires explicit enumeration of candidate block
  lengths and O(n) string reconstruction/comparison per candidate.
- **Why waste is avoidable:** there's a purely structural trick: if `s` is built from a
  repeated block, then `s + s` (with the very first and very last character removed)
  will still contain a full copy of `s` somewhere in the middle — but if `s` is *not*
  built from a repeated block, this altered doubled string provably cannot contain a
  full copy of `s`.
- **This pattern:** replace explicit divisor enumeration with a single string
  concatenation + substring-containment check, collapsing the whole problem into one
  line, at the cost of requiring a non-obvious proof to trust that it's correct.

### 3. Engineering Intuition (Mental Model)
Think of a repeating wallpaper pattern. If you take two full rolls of the exact same
wallpaper and lay them end to end, then trim off the very first strip and the very last
strip, you can still find one complete repeat of the original pattern somewhere in the
middle of what remains — because the pattern just keeps repeating seamlessly across the
join. If the wallpaper *wasn't* actually a repeating pattern (just one unique image),
trimming the ends this way would break up the only "complete copy" that existed, and you
wouldn't be able to find a full match anymore.

### 4. Why It Works (Proof / Reasoning) — Brute Force Version First
For the brute-force approach: if `s` is built by repeating a block of length `L`, then
`L` must evenly divide `n = s.length` (since the block repeats a whole number of times),
and the block itself must be exactly `s.substring(0, L)` (the repetition must start at
the very beginning). So trying every `L` from `1` to `n/2` (a block can't be more than
half the string, since it must repeat *at least* twice) where `n % L === 0`, and
checking whether repeating `s.substring(0, L)` exactly `n/L` times reconstructs `s`,
covers every possible valid block length exhaustively and correctly.

**Why the optimized `(s + s).slice(1, -1).includes(s)` trick works:** if `s = block
repeated k times` (`k ≥ 2`), then `s + s` is `block` repeated `2k` times. Removing the
first character removes part of the *first* copy of `block`, and removing the last
character removes part of the *last* copy — but since `block` repeats seamlessly at
every boundary, a full, untouched copy of `s` (`block` repeated `k` times) is
still guaranteed to exist somewhere in the remaining middle section, because there are
`2k - 2 ≥ k` complete, unbroken block-boundaries left once you remove just one character
from each end (this holds precisely because `k ≥ 2`, giving enough "slack" repeats to
survive the trim). Conversely, if `s` were *not* built from a repeated block, `s + s`
sliced this way cannot contain a full copy of `s`, because doing so would itself imply a
repetition structure that contradicts the assumption.

### 5. Visualization
`s = "abab"`:

```
s + s = "abababab"
slice(1, -1) = "bababa"
does "bababa" include "abab"? → "b-abab-a" → YES, "abab" appears inside → true
```

`s = "aba"` (NOT a repeated block):

```
s + s = "abaaba"
slice(1, -1) = "baab"
does "baab" include "aba"? → No → false
```

### 6. Recognition Signal
The problem statement mentions: *is this string made up of a repeated substring*, or
asks to detect periodicity in a string.

### 7. Algorithm (Step-by-Step) — Optimized Version
1. Concatenate `s` with itself: `doubled = s + s`.
2. Remove the first and last character: `doubled.slice(1, -1)`.
3. Check whether this trimmed, doubled string contains `s` as a substring
   (`.includes(s)`).
4. Return the result of that containment check directly.

### 8. Pseudocode
```
function repeatedSubstringPattern(s):
    doubled = (s + s)
    trimmed = doubled[1 : length(doubled) - 1]   // remove first and last char
    return trimmed.contains(s)
```

### 9. JavaScript Implementation
```js
// Brute force — explicit divisor enumeration (useful for building the intuition first)
var repeatedSubstringPatternBruteForce = function (s) {
  const n = s.length;
  for (let length = 1; length <= n / 2; length++) { // block can be at most half the string
    if (n % length === 0) {                          // only try lengths that evenly divide n
      const block = s.substring(0, length);
      const repeatCount = n / length;
      if (block.repeat(repeatCount) === s) return true;
    }
  }
  return false;
};

// Optimized — structural trick
var repeatedSubstringPattern = function (s) {
  const doubled = (s + s).slice(1, -1); // drop first char and last char
  return doubled.includes(s);
};
```

### 10. Dry Run
`repeatedSubstringPattern("abcabcabcabc")`

| step | value |
|---|---|
| s + s | "abcabcabcabcabcabcabcabc" |
| slice(1, -1) | "bcabcabcabcabcabcabcabca" |
| includes("abcabcabcabc")? | yes (appears starting at index 2) |

Final: `true`

### 11. Complexity Analysis
- **Time: O(n)** for the optimized version — string concatenation is O(n), and
  `.includes()` on strings of length O(n) using standard efficient substring-search
  runs in O(n) on average (JS engines typically use an efficient algorithm under the
  hood, not naive O(n²) search, though worst-case behavior can vary by engine).
  Brute force: **O(n²)** in the worst case (O(n) candidate lengths in the worst case for
  highly divisible `n`, each requiring an O(n) reconstruction and comparison).
- **Space: O(n)** — the doubled string itself.

### 12. Common Mistakes
- ❌ In the brute-force version, iterating `length` beyond `n/2` — a repeating block must
  appear at least twice, so it can be at most half the total string's length; trying
  longer candidate lengths wastes work checking impossible cases.
- ❌ In the brute-force version, trying every length from `1` to `n/2` **without** the `n
  % length === 0` filter — a block that doesn't evenly divide `n` can never exactly
  reconstruct `s` via whole-number repetition, so skipping the divisor check wastes
  significant work on doomed candidates.
- ❌ Trusting the `(s + s).slice(1, -1).includes(s)` trick without understanding *why*
  it's correct — it's easy to misremember (e.g., forgetting to slice off characters, or
  slicing the wrong ends), and without the underlying proof, a small implementation slip
  is hard to catch.

### 13. Edge Cases
- Single-character string — cannot be a "repeated" block of anything shorter than
  itself; correctly returns `false` (there's no valid divisor `< n` other than degenerate
  cases the algorithm naturally excludes).
- String where the entire string IS the minimal block repeated exactly twice (e.g.,
  `"abab"`) — handled correctly, as shown in the visualization.
- String with no repeating structure at all (e.g., `"abcdefg"`) — both versions
  correctly return `false`.

### 14. Interview Explanation
"The brute-force approach for Repeated Substring Pattern tries every candidate block
length that evenly divides the string's length, since a valid block must repeat a whole
number of times, and checks whether repeating that block reconstructs the original — at
most O(n) candidates, each O(n) to verify, so O(n²) worst case. There's also a clever
O(n) trick: concatenate the string with itself, drop the first and last character, and
check whether the original string still appears inside — if it does, the string must
have a repeating structure, because that's the only way a full copy could survive both a
front-trim and a back-trim simultaneously."

### 15. Related Problems & Revision Box
- **LC459** — Repeated Substring Pattern

> **Revision Box**
> Formula/invariant: *brute force: try every divisor of n up to n/2; optimized: `(s+s).slice(1,-1).includes(s)`.*
> Mental model in one phrase: *two rolls of repeating wallpaper, trimmed at both ends, still hiding one full pattern in the middle.*
> Complexity: *O(n) optimized, O(n²) brute force; O(n) space either way.*

---

## C.7 — Construction (Run-Length Compression)

### 1. Definition
Construction, in the string context, is the pattern of building a new, transformed
output by processing the input in **runs** (maximal consecutive groups of the same
character) — reading each run's character and length once, then writing a compact
representation of that run into the output, rather than processing character-by-character
independently.

### 2. Why This Pattern Exists
- **Brute force:** without explicitly grouping consecutive identical characters into
  runs first, compressing a string requires messy bookkeeping — comparing each
  character against some remembered "previous character" state and manually deciding
  when a run has ended.
- **What it wastes:** processing one character at a time without a clear "run" concept
  makes the count-tracking and output-writing logic tangled together, increasing bug
  surface (off-by-one errors in when to flush a count, forgetting to handle a run of
  length 1, etc.).
- **Why waste is avoidable:** using a nested-loop structure — an outer pointer that
  jumps to the start of each new run, and an inner loop that consumes the entire current
  run — cleanly separates "find where this run ends" from "write this run's compressed
  form," making each piece simple and easy to verify independently.
- **This pattern:** decompose the string into runs explicitly (outer pointer marks run
  starts, inner loop consumes the run), then construct output per-run rather than
  per-character.

### 3. Engineering Intuition (Mental Model)
Think of a warehouse worker scanning a conveyor belt of colored boxes, where identical
colors often arrive in consecutive batches. Instead of writing down every single box
individually, the worker watches for how long a batch of the *same* color continues,
counts the batch, and writes just one summary line per batch ("7 red boxes") before
moving on to notice the next batch's color.

### 4. Why It Works (Proof / Reasoning)
Any string can be decomposed, uniquely, into a sequence of maximal runs — a run being
the longest possible stretch of one repeated character before the character changes.
Processing the string with an outer index `i` that always sits at the start of an
unprocessed run, and an inner `while` loop that advances a second index until the
character changes, guarantees that each run is identified exactly once, in its entirety,
with no run split across two iterations and no character double-counted — because the
inner loop's exit condition (`chars[i] !== ch`) is precisely the definition of "the run
has ended."

### 5. Visualization
`["a", "a", "b", "b", "c", "c", "c"]`

```
i=0: ch='a', count runs while chars[i]==='a' → count=2, i=2. Write: "a2"
i=2: ch='b', count runs while chars[i]==='b' → count=2, i=4. Write: "b2"
i=4: ch='c', count runs while chars[i]==='c' → count=3, i=7. Write: "c3"

Result string: "a2b2c3" → written back into chars[0..5]
Return length: 6
```

### 6. Recognition Signal
The problem statement mentions: *compress*, *run-length encoding*, or requires
identifying and summarizing consecutive repeated elements (this applies to arrays of
characters just as much as raw strings).

### 7. Algorithm (Step-by-Step)
1. Initialize an output accumulator and an outer index `i = 0`.
2. While `i < chars.length`:
   a. Record the current character `ch = chars[i]` and a `count = 0`.
   b. Inner loop: while `chars[i] === ch` (and `i` is still in bounds), increment
      `count` and `i`.
   c. Append `ch` to the output; if `count > 1`, also append the digits of `count`.
3. Once every run has been processed, write the output's characters back into the
   original array (since the problem typically requires in-place modification), and
   return the output's length.

### 8. Pseudocode
```
function compress(chars):
    output = ""
    i = 0
    while i < length(chars):
        ch = chars[i]
        count = 0
        while i < length(chars) and chars[i] == ch:
            count = count + 1
            i = i + 1
        output = output + ch
        if count > 1:
            output = output + toString(count)

    for i from 0 to length(output) - 1:
        chars[i] = output[i]
    return length(output)
```

### 9. JavaScript Implementation
```js
var compress = function (chars) {
  let output = "";
  let i = 0;

  while (i < chars.length) {
    const ch = chars[i];
    let count = 0;

    while (i < chars.length && chars[i] === ch) { // consume the ENTIRE current run
      count++;
      i++;
    }

    output += ch;
    if (count > 1) output += count; // a run of length 1 is written with NO count suffix
  }

  for (let i = 0; i < output.length; i++) {
    chars[i] = output[i]; // write the compressed form back into the original array (in place)
  }
  return output.length;
};
```

### 10. Dry Run
Input: `["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]` (1 'a', 12
'b's)

| i (start of run) | ch | count | i (end of run) | output so far |
|---|---|---|---|---|
| 0 | 'a' | 1 | 1 | "a" |
| 1 | 'b' | 12 | 13 | "ab12" |

Final output string: `"ab12"`, length `4` — matches the expected result
(`chars = ["a","b","1","2"]`, return `4`).

### 11. Complexity Analysis
- **Time: O(n)** — the outer index `i` and inner-loop index together advance across the
  array exactly once in total (the inner loop's advancement of `i` IS the outer loop's
  progress — no character is ever revisited).
- **Space: O(1)** extra beyond the input array itself, if the output is built and
  written back in place without a separate large data structure — though building
  `output` as a JS string does technically use O(n) space for that intermediate string
  before being copied back; a fully O(1)-extra-space version would write compressed
  characters directly into `chars` as it goes, using two pointers (a read pointer and a
  write pointer) instead of an intermediate string.

### 12. Common Mistakes
- ❌ Forgetting that a run of length 1 should **not** have its count written at all — only
  append the numeric count when `count > 1`; writing `"a1"` for a single `'a'` is
  incorrect output.
- ❌ Writing multi-digit counts as a single character instead of writing out each digit —
  a count of `12` must be written as the two characters `'1'` and `'2'` into the array,
  not as a single combined value; string concatenation (`output += count`) handles this
  correctly automatically since JS coerces the number to its full digit string, but a
  naive `chars[writeIndex] = count` (writing the number directly into a character slot)
  would not.
- ❌ Forgetting to actually copy `output` back into `chars` before returning — returning
  the length alone doesn't satisfy the "modify in place" requirement.

### 13. Edge Cases
- Single character, single occurrence (e.g., `["a"]`) — output is just `"a"` (count 1 is
  never written), length `1`.
- No repeated characters at all (e.g., `["a","b","c"]`) — output is `"abc"`, identical in
  length to the input, since every run has length 1.
- Very long single run (e.g., 100 of the same character) — output correctly writes the
  multi-digit count as multiple characters (`"a100"` is 4 characters: `'a'`, `'1'`,
  `'0'`, `'0'`).

### 14. Interview Explanation
"String Compression processes the array in runs — an outer pointer marks where each new
run starts, and an inner loop consumes the entire run of identical characters, counting
as it goes. Once a run's length is known, I write the character, and only append the
count if it's greater than 1, since a lone character doesn't need a count suffix. Every
character in the array is visited exactly once across the combined outer and inner loop
progress, so it's O(n) time. The main things to get right are: no count for runs of
length 1, and writing multi-digit counts as individual characters, not a single
combined token."

### 15. Related Problems & Revision Box
- **LC443** — String Compression

> **Revision Box**
> Formula/invariant: *outer pointer marks run start; inner loop consumes the run; append count only if `count > 1`.*
> Mental model in one phrase: *a warehouse worker logging one summary line per batch of same-colored boxes.*
> Complexity: *O(n) time, O(1) extra space (excluding the intermediate output string in this implementation).*

---

## C.8 — Frequency Counting for Strings (Addendum + Bonus Problem)

The core mechanism here is identical to Phase 2's Frequency Counting pattern — nothing
new to derive. This is just the string-specific example that came up during practice,
worth recording as an additional representative problem.

**LC387 — First Unique Character in a String:** find the index of the first character
that appears exactly once; return `-1` if none exists.

```js
function firstUniqChar(s) {
  const freq = new Map();
  for (let i = 0; i < s.length; i++) {
    freq.set(s[i], (freq.get(s[i]) || 0) + 1); // pass 1: build full frequency map
  }
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;        // pass 2: first index whose char has count 1
  }
  return -1;
}
```

**Worth noting explicitly:** this problem genuinely needs **two passes** — the first to
know every character's *final* total frequency, the second to find the first index whose
character's frequency is exactly `1`. A single forward pass cannot answer this
correctly, because a character's frequency isn't fully known until the entire string has
been scanned (a character that looks unique at index 2 might turn out to repeat at index
50). This is a useful contrast against problems like Sliding Window, where a single pass
suffices because validity only ever depends on the *current window*, not the whole
remaining input.

> **Revision Box**
> Formula/invariant: *two passes required — frequency isn't known until the full string is scanned.*
> Complexity: *O(n) time (two passes, still linear), O(k) space.*

---

# Back Matter

## Master Recognition Cheat Sheet (String-Specific)

| Signal in the Problem | Pattern | Where Documented |
|---|---|---|
| Check if one string equals its reverse | Two Pointer | Section B.2 / [[Phase1_Array]] D.2 |
| Reverse a string/char array in place | Two Pointer | Section B.1 / [[Phase1_Array]] D.2 |
| Same characters, any order (anagram check) | Frequency Counting | Section B.3 / [[Phase2_Hashing]] Pattern 1 |
| Character → character consistent mapping | Mapping | Section B.4 / [[Phase2_Hashing]] Pattern 5 |
| Group strings sharing a signature | Grouping | Section B.5 / [[Phase2_Hashing]] Pattern 4 |
| Longest substring with a uniqueness condition | Distinct/Frequency Window | Section B.6 / [[Phase1_Array]] E.5 |
| Smallest window containing all required characters | Minimum Window | Section B.7 / [[Phase1_Array]] E.7 |
| Longest/count of palindromic substrings | Center Expansion | Section C.2 |
| Does a permutation of X exist / find all occurrences | Fixed Window + Frequency | Section C.3 |
| Reverse or reorder whitespace-separated words | Parsing | Section C.4 |
| Longest shared beginning across multiple strings | Prefix Comparison | Section C.5 |
| Is this string a repeated smaller block | Repetition Reasoning | Section C.6 |
| Summarize consecutive repeated characters | Construction (Compression) | Section C.7 |
| First character with frequency exactly 1 | Frequency Counting (2-pass) | Section C.8 |

---

## Master Complexity Cheat Sheet (New Patterns Only)

| Pattern | Time | Space |
|---|---|---|
| Center Expansion | O(n²) | O(1) extra |
| Fixed Window + Frequency (Permutation Family) | O(n) | O(k) |
| Parsing (Word Reversal) | O(n) | O(n) |
| Prefix Comparison | O(n × m) | O(1) extra |
| Repetition Reasoning (optimized) | O(n) | O(n) |
| Construction (Compression) | O(n) | O(1) extra (excl. intermediate string) |

*(For cross-referenced patterns, see the complexity tables in Phase1_Array.md and
Phase2_Hashing.md.)*

---

## Master Mistakes Index (New Patterns Only)

| Pattern | Most Dangerous Mistake |
|---|---|
| Center Expansion | checking `s.length % 2` to pick odd vs. even center instead of trying both at every index |
| Fixed Window + Frequency | mixing up LC567's "return true immediately" with LC438's "record and keep scanning" |
| Parsing | splitting on a single space instead of `/\s+/`, producing empty-string tokens |
| Prefix Comparison | comparing all string pairs instead of one reference string against the rest |
| Repetition Reasoning | trusting `(s+s).slice(1,-1).includes(s)` without understanding why it's correct |
| Construction (Compression) | writing a count for runs of length 1 |

---

## Revision Card (from original notes — Rapid Recall + Blind Test)

### Rapid Recall

1. Why are strings immutable?
2. How do you construct a changed string?
3. What does `substring(start, end)` return?
4. Does `trim()` mutate the string?
5. Frequency → which DS?
6. Both ends → which pattern?
7. Contiguous substring → which pattern?
8. Why is LC567 window size equal to `s1.length`?
9. Difference between LC567 and LC438?
10. Odd palindrome center?
11. Even palindrome center?
12. Why `substring(left + 1, right)` after mismatch?
13. Why does LC647 count every successful expansion?
14. Why is LC5 O(n²) with center expansion?
15. Why must repeated substring length divide `n`?
16. How does LC443 process runs?
17. How does LC151 reverse words?
18. When does String + Hashing help?
19. When does String + Sliding Window help?
20. Give TC/SC for three String problems.

### Blind Test

- Derive LC567 without code.
- Derive LC438 from LC567.
- Derive LC5 without looking at code.
- Explain LC647 from the same expansion engine.
- Explain LC151 without memorizing a template.
- Explain LC443 as run processing.
- Explain why LC344 can mutate its input.
- Explain String immutability.

### Lock Criteria

```text
Recognize pattern
+
Derive algorithm
+
Explain WHY
+
Dry run
+
TC/SC
+
JavaScript implementation
```

---

## Pattern Mixing (from original pattern card)

```text
String + Hashing         → frequency/mapping problems (Section B.3, B.4, C.3, C.8)
String + Sliding Window  → contiguous substring problems (Section B.6, B.7, C.3)
String + Two Pointer     → both-ends problems (Section B.1, B.2)
String + Array           → tokenized problems, treated as an array of words (Section C.4)
String + Parsing         → word/token extraction (Section C.4)
String + Center Expansion→ palindrome-family problems (Section C.2)
```

---

## Roadmap Status

Per Master DSA Roadmap v12.1: **Strings ✅ COMPLETED**, sitting inside Phase 1 — Linear
Data Processing, alongside Arrays ✅. Phase 2 — Hashing is 🔒 LOCKED. The roadmap's own
next step is already recorded as:

```text
Deep Constraints + TC + SC Foundation  ⏳ ACTIVE
↓
Phase 3 — Linear Data Structures (Stack, Queue, Deque)
```

No changes needed to the roadmap file itself — it already reflects this completion
status as of the version reviewed while building this book.

---

## Phase Lock

**STRINGS (PHASE 1 MODULE): COMPLETE / LOCKED — 15/15 problems**

*(End of Part 2. This completes Phase1_String.md.)*