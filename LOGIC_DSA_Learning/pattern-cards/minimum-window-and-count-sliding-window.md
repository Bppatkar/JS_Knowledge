# Pattern Card

# Minimum Window + Count Based Sliding Window

---

# Pattern Name

Advanced Variable Sliding Window

---

# Used When

- Minimum valid substring
- Count valid subarrays
- Count valid substrings
- Product
- Sum
- Frequency
- Multiple constraints

---

# Data Structure

- HashMap
- Running State
- Two Pointers

---

# Window State

Examples

Frequency

Product

Sum

Distinct Count

Matched Count

---

# Generic Algorithm

Expand Right

↓

Update Window State

↓

While Window Invalid

    Shrink Left

    Update Window State

↓

Update Answer

↓

Move Right

---

# Minimum Window Pattern

Need Map

Window Map

matched

required

Validity

matched == required

Answer Update

Minimum Length

---

# Count Based Pattern

Maintain

Running Product

Validity

product < k

If valid

count += right - left + 1

---

# Why Count Formula Works

Current Window

[L........R]

Every suffix ending at R

[L........R]

[L+1......R]

...

[R]

is also valid.

Count

right - left + 1

---

# Time Complexity

O(n)

---

# Space Complexity

Minimum Window

O(unique characters)

Count Product

O(1)

---

# Common Mistakes

❌ Using Set for duplicate frequencies

❌ Comparing two HashMaps repeatedly

❌ Forgetting matched variable

❌ Using if instead of while while shrinking

❌ Returning window length instead of count

❌ Forgetting edge case

k <= 1

---

# Interview Tip

Sliding Window problems differ only in

1. Window State

2. Validity Rule

3. Answer Update

Everything else is the same template.

---

# Engineering Principle

Never recompute the whole window.

Maintain the window state incrementally.

Expand

↓

Update State

Shrink

↓

Reverse Update State
