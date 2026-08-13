# ⚔️ MASTER DSA ROADMAP

### Supreme Engineering Training System (Official)

Version: 11.0 [As Per Constitution Amendment 6A]
Status: LOCKED
Learning Style:

- Pattern First
- Engineering First
- 80/20 Rule
- First Principles
- Feynman Technique
- Active Recall
- Spaced Repetition
- Parkinson's Law

---

# Core Philosophy

Question ≠ Algorithm

Question = Pattern(s) + Data Structure(s)

Never memorize code.

Always derive the algorithm.

---

# Learning Principles

## 1. Pareto Principle (80/20)

Learn the small number of reusable patterns that solve the majority of interview questions.

---

## 2. First Principles Thinking

Always derive:

Problem

↓

Constraints

↓

Pattern

↓

Algorithm

↓

Code

Never memorize implementations.

---

## 3. Feynman Technique

Every pattern must be explainable:

- Like I'm 12
- Interview level
- Engineering level

---

## 4. Active Recall

Every study day begins with one blind revision question.

Maximum revision time:

30 minutes.

---

## 5. Spaced Repetition

Every important pattern is revised after:

- 1 Day
- 3 Days
- 7 Days
- 15 Days
- 30 Days

---

## 6. Parkinson's Law

No single problem may block roadmap progression.

Maximum struggle time:

45 minutes.

After that:

Hint →

Pattern →

Derivation →

Continue Roadmap

---

# PHASE 0

## Engineering Thinking

Patterns

- Time Complexity
- Space Complexity
- Dry Run
- Debugging
- Constraint Analysis
- Pattern Recognition
- State Thinking
- Interview Communication
- Complexity Estimation

---

# PHASE 1 - Linear Data Processing (COMPLETED)

✅ Arrays
⏳ Strings (Will be covered after Hashing as a focused mini-module)

Why?

Because almost every important String interview problem uses HashMap, Sliding Window, or Two Pointers.

If we teach Strings before Hashing, many problems become awkward.

So we'll first master Hashing, then revisit Strings with much stronger tools.

We are not skipping Strings—only postponing the dedicated String module.

### ✅ Traversal Family Completed ✅

- ✅ Simple Traversal
- ✅ Build New Array
- ✅ Running State
- ✅ Running Sum
- ✅ Running Product
- ✅ Count Pattern
- ✅ Max Pattern
- ✅ Min Pattern
- ✅ Index Tracking
- ✅ Comparison Pattern
- ✅ Early Exit Pattern

### ✅ Prefix Family Completed ✅

- ✅ Prefix Sum
- ✅ Prefix Product
- ✅ Dummy Zero Technique
- ✅ Range Sum Query
- ✅ Difference Array
- ✅ Lazy Update Thinking

### ✅ Two Pointer Family Completed ✅

#### Same Direction

- ✅ Slow Fast Pointer
- ✅ Compaction
- ✅ Build In-place

#### Opposite Direction

- ✅ Sorted Array Pair
- ✅ Palindrome
- ✅ Two Sum II

### ✅ Sliding Window Family Completed ✅

#### Fixed Window

- ✅ Fixed Size Window
- ✅ Running Sum
- ✅ Running Product

#### Variable Window

- ✅ Longest Window
- ✅ Smallest Window
- ✅ Presence Window
- ✅ Frequency Window
- ✅ Distinct Window
- ✅ Count Window
- ✅ Minimum Window
- ✅ Window Validity Rules
- ✅ Expand vs Shrink Logic
- ✅ Incremental State Maintenance

### ✅ Kadane Family Completed ✅

- ✅ Maximum Subarray
- ✅ Current State
- ✅ Best State
- ✅ Restart vs Extend Decision

### ✅ Cyclic Sort Family Completed ✅

- ✅ Correct Position Concept
- ✅ Missing Number
- ✅ Missing Numbers
- ✅ First Missing Positive
- ✅ Duplicate Placement Thinking

### ✅ Matrix Family Completed ✅

✅ Matrix Basics
✅ Row Traversal
✅ Column Traversal
✅ Boundary Variables
✅ Boundary Traversal
✅ Diagonal Traversal
✅ Transpose
✅ Rotate Matrix

### ✅ Simulation Family Completed ✅

- ✅ Simulation Thinking
- ✅ State Changes
- ✅ In-place Simulation

Phase 1 Representative Problems
Approximately
40+ LeetCode Problems

---

# PHASE 2 Hashing (IN PROGRESS)

### Goal

Master Hashing as a Data Structure and Pattern Family.

Learn when to trade **memory for speed** and instantly recognize when Hashing is the correct approach.

Representative Problems

20+ LeetCode Problems

---

## SECTION 1 — Hashing Fundamentals

### Theory

- ✅ What is Hashing?
- ✅ Why Hashing Exists
- ✅ Time vs Memory Trade-off
- ✅ Lookup Tables
- ✅ Key-Value Mapping
- ✅ Hash Function
- ✅ Buckets
- ✅ Collision
- ✅ Collision Resolution (Awareness)
  - Chaining
  - Open Addressing
- ✅ Load Factor
- ✅ Rehashing (Awareness)
- ✅ Average vs Worst Case Complexity

### Engineering Thinking

- ✅Why Hashing gives O(1) average lookup
- ✅Why worst case becomes O(n)
- ✅Why Arrays cannot solve every lookup problem
- ✅Memory vs Performance Trade-off
- ✅Real-world Engineering Applications
  - ✅Cache
  - ✅Session Storage
  - ✅Database Indexing (Concept)
  - ✅API Lookup
  - ✅Authentication
  - ✅Redis

---

## SECTION 2 — JavaScript Hash Data Structures

### Object

- ✅ Creation
- ✅ Insert
- ✅ Update
- ✅ Delete
- ✅ Search
- ✅ Iteration
- ✅ Object.keys()
- ✅ Object.values()
- ✅ Object.entries()

Engineering Discussion

- ✅ Why keys become strings
- ✅ Prototype chain problems
- ✅ When Object should NOT be used

---

### Map

✅ new Map()
✅ set()
✅ get()
✅ has()
✅ delete()
✅ clear()
✅ size
✅ Iteration
✅ Nested Map

Engineering Discussion

✅ Why Map exists
✅ Map vs Object
✅ Primitive vs Object keys
✅ Performance discussion

---

### Set

Learn

- ✅ new Set()
- ✅ add()
- ✅ has()
- ✅ delete()
- ✅ clear()
- ✅ size
- ✅ Learn Iteration

Engineering Discussion

- ✅ Uniqueness Guarantee
- ✅ Presence Checking

---

### WeakMap / WeakSet

Awareness Only

- ✅ What they are
- ✅ Garbage Collection Concept
- ✅ Real-world use cases (High Level)

---

## SECTION 3 — Hashing Pattern Family

### Pattern 1 — Frequency Counting

- ✅ Character Frequency
- ✅ Number Frequency
- ✅ Frequency Table
- ✅ Frequency Comparison

Representative Problems

- ✅ Valid Anagram — LC 242
- ✅ Majority Element — LC 169 [Boyer–Moore Algorithm]
- ✅ Top K Frequent Elements (Introduction) — LC 347

---

### Pattern 2 — Presence Checking

- ✅ Exists / Doesn't Exist
- ✅ Duplicate Detection
- ✅ Missing Element Detection

Representative Problems

- ✅ Contains Duplicate LC217
- ✅ Happy Number LC202
- ✅ Longest Consecutive Sequence (Intro) LC128

---

### Pattern 3 — Counting Pattern

- 🟢 80/20 COMPRESSED

- ✅ Counting Occurrences
- ✅ Counting Unique Values
- ✅ Counting Valid Pairs
- ✅ Counting Valid Subarrays

---

### Pattern 4 — Grouping Pattern

- ✅ Group by Key
- ✅ Group by Frequency
- ✅ Group by Signature

Representative Problems

- ✅ Group Anagrams [LC 49]

---

### Pattern 5 — Mapping Pattern

- ✅ Value → Index
- ✅ Value → Frequency
- ✅ Parent → Children
- ✅ Custom Mapping

Representative Problems

- ✅ Two Sum [LC 1]
- ✅ Isomorphic Strings [LC 205]

---

### Pattern 6 — Prefix Hash

- ✅ Prefix Sum + HashMap
- ✅ Running Prefix Storage
- ✅ Prefix Lookup
- ✅ Zero Sum Detection
- ✅ Target Prefix Derivation
- ✅ Index-Based Prefix Storage
- ✅ Frequency-Based Prefix Storage

  Representative Problems

- ✅ Subarray Sum Equals K [LC 560]
- ✅ Continuous Subarray Sum [LC 523]

---

### Pattern 7 — Hash + Sliding Window

- ✅ Character Frequency Window
- ✅ Distinct Characters
- ✅ Window Validity using HashMap
- ✅ Presence using HashSet
- ✅ Last-Seen Index
- ✅ Incremental Window State
- ✅ Requirement Decomposition
- ✅ Constraint-Driven Window Design
- ✅ Pattern Composition

Representative Problems

- ✅ Longest Substring Without Repeating Characters — LC 3
- ✅ Minimum Window Substring — LC 76
- ✅ Permutation in String — LC 567
- ✅ Find All Anagrams in a String — LC 438

---

### Pattern 8 — Hash + Prefix Sum

- ✅ Prefix Frequency
- ✅ Prefix Difference
- ✅ Prefix Count

Representative Problems

- ✅ Maximum Size Subarray Sum Equals k [LC 325]

---

### Pattern 9 — Hash + Two Pointer

- Pair Lookup
- Complement Search
- Optimized Searching

Representative Problems

- Two Sum [LC 1]
- 3Sum (Hash Approach Discussion) [LC 15]

---

### Pattern 10 — Custom Hash Thinking

- Designing Keys
- Composite Keys
- Tuple Keys
- Encoding Multiple Values

Interview Discussion Only

---

## SECTION 4 — Pattern Mixing

Learn to combine Hashing with previously learned patterns.

- Hash + Traversal
- Hash + Prefix Sum
- Hash + Sliding Window
- Hash + Two Pointer
- Hash + Matrix
- Hash + Simulation

---

# PHASE 3 Linear ADTs

(Data Structures)

- Stack
- Queue
- Deque

Patterns (~12)

## Stack

- Basic Stack
- Parentheses
- Monotonic Increasing
- Monotonic Decreasing
- Expression Evaluation
- Histogram

## Queue

- Queue Basics
- Circular Queue

## Deque

- Double Ended Queue
- Monotonic Queue

Representative Problems

20

---

# PHASE 4 Linked List

Patterns (~10)

- Traversal
- Reverse
- Merge
- Dummy Node
- Fast Slow Pointer
- Cycle Detection
- K Group
- Intersection
- Middle Node
- Random Pointer

Representative Problems

20

---

# PHASE 5 Binary Search

Patterns (~8)

- Classic
- Lower Bound
- Upper Bound
- Rotated Array
- Binary Search on Answer
- Search Space
- Peak
- Partition

Representative Problems

20

---

# PHASE 6 Trees

Patterns (~18)

- DFS
- BFS
- Recursive Traversal
- Iterative Traversal
- Height
- Diameter
- Path Sum
- LCA
- BST
- Balanced Tree
- Construction
- Serialization
- Tree DP Introduction

Representative Problems

35+

---

# PHASE 7 Heap

Patterns (~8)

- Priority Queue
- Top K
- Merge K
- Running Median
- Frequency Heap
- Scheduling
- Two Heap
- Greedy + Heap

Representative Problems

20

---

# PHASE 8 Graphs

Patterns (~15)

- DFS
- BFS
- Flood Fill
- Multi Source BFS
- Topological Sort
- Union Find
- Dijkstra
- MST
- SCC
- Shortest Path

Representative Problems

35+

---

# PHASE 9 Recursion & Backtracking

Patterns (~10)

- Base Case
- Choice Diagram
- Subsets
- Permutations
- Combination
- N Queens
- Sudoku
- Word Search
- Partition
- Restore

Representative Problems

25

---

# PHASE 10 Greedy

Patterns (~10)

- Activity Selection
- Interval Scheduling
- Job Scheduling
- Huffman
- Jump Game
- Gas Station
- Meeting Rooms
- Merge Intervals

Representative Problems

20

---

# PHASE 11 Dynamic Programming

Patterns (~20)

- Memoization
- Tabulation
- 1D DP
- 2D DP
- Knapsack
- LCS
- LIS
- Grid DP
- Interval DP
- Partition DP
- Digit DP
- Bitmask DP
- Tree DP

Representative Problems

50+

---

# PHASE 12 Advanced Data Structures

- Trie
- Segment Tree
- Fenwick Tree
- Sparse Table
- DSU
- Skip List (Intro)

---

# Roadmap Rules

1. Patterns are taught once.

2. Arrays and Strings belong to one phase.

3. Stack, Queue and Deque belong to one phase.

4. Every phase begins with Data Structure fundamentals.

5. Then patterns.

6. Then representative LeetCode problems.

7. Then revision.

8. Engineering understanding is mandatory before memorization.

9. Code is derived, never memorized.

10. This roadmap is LOCKED and can only be modified through an approved Constitution Amendment.
