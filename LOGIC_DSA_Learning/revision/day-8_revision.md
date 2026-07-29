# Day 8 Revision

---

# Revision Checklist

## Variable Size Sliding Window

□ Why Fixed Window cannot solve these problems

□ Expand

□ Shrink

□ Valid Window

□ Invalid Window

□ O(n) Proof

---

## LeetCode 3

□ Duplicate detection

□ Set operations

□ Removing duplicates

□ Updating answer

---

## LeetCode 424

□ Frequency Map

□ maxFreq

□ Window Length

□ Replacement Formula

```
windowLength - maxFreq
```

□ Validity Rule

```
(windowLength - maxFreq) <= k
```

□ Stale maxFreq

---

# Complexity Revision

LeetCode 3

Time

```
O(n)
```

Space

```
O(min(n, charset))
```

---

LeetCode 424

Time

```
O(n)
```

Space

```
O(1)
```

---

# Interview Notes

If interviewer asks

### Why Sliding Window?

Because every answer is a contiguous substring and brute force is O(n²).

---

### Why Frequency Map?

We need counts, not just presence.

---

### Why Set cannot solve LC 424?

Set stores uniqueness only.

It cannot tell which character appears the most.

---

### Why stale maxFreq works?

An outdated larger value never causes us to miss the optimal answer. It may delay shrinking, but correctness is preserved while maintaining O(n).

---

### Why O(n)?

Both pointers move only forward.

Each element enters once and leaves once.

---

# Vocabulary

Substring

Continuous part of a string.

---

Frequency

How many times something appears.

---

Replace

Change one value into another.

---

Valid

Condition satisfied.

---

Invalid

Condition not satisfied.

---

Invariant

A rule that remains true throughout the algorithm.

---

# Final Revision Goal

Be able to derive the entire Variable Size Sliding Window algorithm without memorizing code.


---
# Notes [Comparison btw Same Direction or Opposite Direction]

## 1. Opposite Direction Example

deta hoon

Suppose `1 4 7 10 13 16`
Target = 17

```
Current
1  4  7  10  13  16
L                 R
Sum = 17
```

Ab sum par depend karta to movement hi nahi hota. To asli reason sum nahi hai. Sum sirf signal hai. Decision kis baat se ho raha hai? 👉 **Sorted property.**

Hum jaante hain: Array sorted hai. Isliye hume pata hai:

- Bigger sum chahiye → Left ko badhao.
- Smaller sum chahiye → Right ko ghatao.

Agar array sorted hi na hota... aisa hota `arr = [5 1 8 2 6 3]`
Aur sum chhota hota. Kya confidently `left++` kar sakte? ❌ Nahi.

Kyuki next value chhoti bhi ho sakti hai. Isliye interview answer hoga 🎯:

> "Opposite Direction pointer movement depends on the sorted property of the data, which allows us to eliminate impossible search space."

Ye sentence SDE interview level ka hai.

## 2. Same Direction

> "Same Direction pointer movement depends on maintaining a valid window according to the problem's condition."

Notice difference 🎯.

- "Add old remove" kaam hai.
- "Maintain valid window" objective hai.

---

## 🎯 Sabse Important Visualization

### Opposite Direction

Imagine tum ek library mein ho. Tumhe dictionary mein ek word dhoondhna hai. Tum jaante ho dictionary alphabetical hai. Agar tum "Mango" dhoondh rahe ho aur page "Apple" par ho... Tum peeche jaoge? ❌ Nahi. Seedha aage jaoge. Kyun?

Sorted order tumhe direction de raha hai. Isliye search space eliminate hota hai.

### Same Direction

Imagine tum bus mein travel kar rahe ho aur conductor ko hamesha current passengers ka count rakhna hai. Har stop par:

- Kuch log utarte hain.
- Kuch log chadhte hain.

Conductor poori bus dobara count karta hai? ❌ Nahi.

Bas:

```
Current Count
- Utarne wale
+ Chadhne wale
```

Yehi Window Maintenance hai.

Window = "Current passengers."

---

## Ek Table Bana Lo (Ye Lifetime Yaad Rahega)

| Opposite Direction                                     | Same Direction                                                |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| Sorted array is important                              | Sorted hona zaroori nahi                                      |
| Search space eliminate karta hai                       | Window maintain karta hai                                     |
| Sum/condition batata hai kis pointer ko move karna hai | Window valid/invalid batata hai kis pointer ko move karna hai |
| Pair problems / Subarray                               | Substring problems                                            |
| Example: Two Sum II                                    | Example: Longest Subarray                                     |

---

## Sliding Window Foundation [Two Pointer Same Direction] [Fixed Size]

### Algorithm

```
Step 1: Build the first window of size k.
Step 2: Calculate the sum of the first window.
Step 3: Initialize maxSum = currentWindowSum
Step 4: Slide the window one position at a time.
        For every move:
        • Add incoming element
        • Remove outgoing element
        • Update current window sum
        • Compare with maxSum
Step 5: Return maxSum
```

```javascript
function maxSumFixedWindow(arr, k) {
  let current_sum = 0,
    max_sum;
  // if array values is negative to max_sum compare 0 is always greater thats why we dont write - max_sum = 0;
  for (let i = 0; i < k; i++) {
    current_sum += arr[i];
  }
  max_sum = current_sum;
  let left = 0,
    right = k;
  // while (right < arr.length) {
  //     current_sum += arr[right];
  //     current_sum -= arr[left]
  //     if (current_sum > max_sum) max_sum = current_sum;
  //     left++; right++;
  // }
  for (let i = k; i < arr.length; i++) {
    current_sum += arr[i] - arr[i - k];
    max_sum = Math.max(current_sum, max_sum);
  }
  return max_sum;
}
```

### Maximum Average Subarray I

```javascript
function findMaxAverage(arr, k) {
  let sum = 0,
    max_sum;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  max_sum = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    max_sum = Math.max(sum, max_sum);
  }
  return max_sum / k;
}

// let arr1 = [1, 9, 3, 6, 8, 7, 5], k = 3;
// console.log("max average", findMaxAverage(arr1, k))
```

---

## Sliding Window [Variable Size]

- In Fixed Size Sliding Window, the window moved because of size.
- In Variable Size Sliding Window, the window moves because of rules.

### Complexity

```
In Fixed Sliding Window:
Left moves at most n times. Right moves at most n times. Therefore O(n).

In Variable size sliding window:
Right pointer 0 → 1 → 2 → 3 → 4 ... Kabhi peeche gaya? ❌ Nahi.
Maximum movement? n

Left pointer 0 → 1 → 2 → 3 → 4 ... Kabhi peeche gaya? ❌ Nahi.
Maximum movement? n

Total movements: right [n] + left [n] = 2n

Constant ignore.
O(2n)
  ↓
O(n)
Left moves at most n times. Same Right moves at most n times. Therefore O(n)
```

### Algorithm Derivation

```
Step 1: Pehle Goal ko Mathematical Language me likho
Step 2: Window kis taraf move karegi?
Step 3: Character add karne ke baad kya hoga?
Step 4: Shrink kitna karna hai?
Step 5: Valid hone ke baad kya karenge?
Step 6: Maximum kab update hoga?
```

### Algorithm

- Initialize two pointers (left, right) at 0.
- Maintain a data structure to keep track of characters inside the current window. [Set Data structure helps us to detect duplicate value because it is a collection of unique values]
- Expand the window by moving right.
- If the current window becomes invalid (duplicate character exists), keep moving left and remove characters until the window becomes valid again. [but condition is how much time we shrink — if we have to shrink multiple times in any condition so we write while loop for removing character from left rather than if condition because it shrinks only once]
- Whenever the window is valid, calculate its length.
- Update the maximum length found so far.
- Continue until right reaches the end of the string.

```
for every right character

    agar duplicate nahi hai
        add karo

    agar duplicate hai
        jab tak duplicate rahe
            left hatao
            left aage badhao

    current character add karo

    answer update karo
```

### Pseudocode Derivation

```
Create an empty Set

left = 0
answer = 0

For every right character

    While current character already exists in Set

        Remove left character from Set

        Move left forward

    Add current character into Set

    Calculate current window length

    Update maximum answer

Return answer
```

### Leetcode 3. Longest Substring Without Repeating Characters

```javascript
var lengthOfLongestSubstring = function (s) {
  let set = new Set(),
    left = 0,
    answer = 0,
    windowLength = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    windowLength = right - left + 1;
    answer = Math.max(answer, windowLength);
  }
  return answer;
};
// console.log(lengthOfLongestSubstring("pwwkew"))   // 3
// console.log(lengthOfLongestSubstring("abcabcbb")) // 3
// console.log(lengthOfLongestSubstring("bbbbb"))    // 1
```

---

## Category of Sliding Window

**Presence based so we use = Set**
Examples: Longest Substring Without Repeating Characters, Contains Duplicate in Window

**Frequency based so we use = Map/Object**
Examples: At Most K Distinct Characters, Minimum Window Substring, Permutation in String, Find All Anagrams

---

Ab Samjho: Question — At Most K Distinct Characters

Example: K = 2

```
Window
a a b b

Distinct? - a b
Answer - 2, Window valid hai.

Window
a a b c
Distinct? a b c
Answer - 3, Window Invalid hai because value of k is 2 and 3 > 2 which is ❌
```

Ab Socho... Suppose

```
Window
a a b
```

Ab left se remove kiya. `a b`
Question: Abhi bhi 'a' window me hai? ✔️ Haan.

Agar hum Set use karein...
Set `{a,b}`
Aur humne `set.delete('a')` kar diya.
Set ban gaya `{b}` ❌ Galat. Kyun?

Kyuki window me abhi bhi ek aur 'a' bacha hua hai. Set ko pata hi nahi ki 'a' kitni baar tha. Isi liye Set Fail — Set sirf ye jaanta hai: Hai Ya Nahi hai. Usse ye nahi pata: Kitni baar hai.

To Hume Kya Chahiye? Hume aisa Data Structure chahiye jo bole:

```
a -> 2
b -> 3
c -> 1
```

Yaani... Frequency. Aur uske liye hum use karte hain: Map Ya Object.

### Fixed Sliding Window

Question bolega: **Exactly k**
Examples:

- Size k
- Window of length k
- Every subarray of size k
- Every substring of length k

To dimaag bole: **k = Window Size**

### Variable Sliding Window

Question bolega:

- At most k replacements
- At most k distinct
- At most k zeros
- At most k operations
- At most k changes

To dimaag bole: **k = Constraint, NOT window size.**
Window jitni chahe badi ho sakti hai, bas constraint satisfy hona chahiye.

---

```
Window hai: A A B B C
Aur k = 2

window - AABBC and
k = 2
Window Length = 5
Max Frequency = 2 [of A or B]
Required Replacement = length - maxFreq so 5-2 = 3 [either we can change A to B or vice versa]
Window Valid ya Invalid? invalid because we check 3 character need replacement and exact value of k is 2 so, required replacement is 3 so it is > 2 so invalid window
```

## MIMP Line

- **Fixed Sliding Window:** "Window ko k ke hisaab se control karte hain."
- **Variable Sliding Window:** "Window ko validity/validation ke hisaab se control karte hain."

## Sample Code for Variable Sliding Window

```javascript
function vSw(s, k) {
  let left = 0,
    right = 0,
    map = {},
    maxFreq = 0,
    answer = 0;
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = (map[s[i]] || 0) + 1;
  }
  maxFreq = map[0];
  while (right < s.length) {}
  return answer;
}
vSw('ABAABCAAABDEDCCDB', 2);
```

---

## Longest Repeating Character Replacement (LeetCode 424)

**MIMP Line** — We intentionally allow maxFreq to become stale [purana value] because an exact value is not required to find the correct longest answer. because Hum kya chahte hain? Perfect maxFreq? ❌ Nahi. Balki, Longest possible window.

We intentionally allow maxFreq to become stale because our goal is to find the longest valid window, not to keep the exact frequency updated after every shrink. Recomputing the exact maximum after every left move would require scanning the whole map repeatedly, which adds unnecessary work.

`"Window invalid → right stop → left++"`

matlab hme — maxFreq is variable ko bar bar update nahi krna hai [in Deep - maxFreq ko sirf window expand (right++) hone par update karte hain. Window shrink (left++) hone par usse intentionally decrease nahi karte.], bs stringLength - maxFreq pata kr lena hai means kitne replaceble character chahiye and check krna hai ki jo result aaya minus krne par wo <= k hai ya nahi thats it.

[Hum maxFreq ko left move par isliye decrease nahi karte kyunki exact maximum maintain karne ke liye hume baar-baar poora map scan karna padega. Hamara goal exact frequency maintain karna nahi, balki longest valid window efficiently find karna hai. maxFreq stale reh sakta hai aur right pointer expand hone par naturally update ho jata hai.]

```
requiredReplacements = windowLength - maxFreq

if (requiredReplacements <= k)
    window is valid
else
    shrink the window
```

## IMP RULE

```
Example: String
A A B A
    ^
   right
```

currentChar = `s[right]`
Yahan currentChar = 'B'. Ab us character ki frequency map me hogi.

```
currentCharFrequency = map.get(currentChar)
```

Ya Object use kar rahe ho to `currentCharFrequency = freq[currentChar]`

Phir `maxFreq = Math.max(maxFreq, currentCharFrequency)`

Ye exact flow hai.

```
1. Right move → Frequency increase.
2. maxFreq = max(maxFreq, currentCharFrequency) and currentCharFreq -> where right pointer is means string[right]
3. Check:
   windowLength - maxFreq <= k ?
4. If invalid → Left move (decrease frequency only).
   Do NOT decrease maxFreq.
```

```
Matlab order hona chahiye:

Right arrives
↓
Map update
↓
maxFreq update
↓
Replacement calculate
↓
Validity check

if window is invalid
Invalid
↓
Shrink
↓
Window valid ho jaye
↓
Tab hi answer update.
```

### - Algorithm

```
1. Add current character to map.
2. Update maxFreq.
3. Calculate required replacements.
4. If invalid:
      Shrink window until valid.
5. Update best answer.
6. Move right.
```

### - Pseudocode

```Javascript
left = 0, right = 0, map = {}, maxFreq = 0, bestAnswer = 0;
while (right < s.length) {

  map[s[right]] = (map[s[right]] || 0) + 1;

  maxFreq = Math.max(map[s[right]], maxFreq);
  const windowLength= right - left + 1;

  while ( windowLength - maxFreq > k ) { // valid condition - requiredReplacment <= k
    map[s[left]]--;
    left++;
    windowLength= right - left + 1;

  }
  bestAnswer = Math.max( windowLength, bestAnswer); // best answer is current window length
  right++;
}
  return bestAnswer;
```
