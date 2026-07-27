# Pattern Card

# Opposite Direction Two Pointers

---

## Recognition

Use this pattern when:

- Two values must be compared.
- Search space shrinks after every decision.
- Re-visiting eliminated elements is unnecessary.
- Array/String allows deterministic pointer movement.

---

## Visualization

L R

1 2 4 6 8 10

↓

Move only one pointer at a time.

---

## Engineering Analogy

Library Dictionary

Dictionary is sorted.

If the current page is alphabetically before the target,

you only move forward.

Never backward.

---

## Algorithm

1. Left = 0
2. Right = n-1
3. While left < right
4. Calculate current state
5. Decide pointer movement
6. Return answer when condition satisfies

---

## Pseudo Code

Initialize

↓

Compare

↓

Move Pointer

↓

Repeat

---

## JavaScript Notes

Always verify

- Pointer initialization
- Loop condition
- Pointer movement
- Return type

---

## Complexity

Time

O(n)

Space

O(1)

(or problem dependent)

---

## Common Bugs

- Wrong pointer movement
- Using <= instead of <
- Forgetting pointer update
- Assuming unsorted array works
- Wrong return format

---

## Interview Questions

Why does Two Pointer work?

Why is sorting important?

Can it work without sorting?

How is it better than nested loops?

---

## Related Problems

- Two Sum II
- Valid Palindrome
- Container With Most Water
- Squares of Sorted Array

---

## Pattern Mixing

Two Pointer + Binary Search

Two Pointer + Prefix Sum

Two Pointer + Sliding Window

---

## Revision Checklist

✅ Recognition

✅ Visualization

✅ Pointer Logic

✅ Complexity

✅ Engineering Connection

✅ Debugging

---

//_ Notes [comparision btw same direction or opposite direction]
/_

1. Opposite Direction Example deta hoon
   Suppose 1 4 7 10 13 16
   Target = 17

Current
1 4 7 10 13 16
L R
Sum = 17

Ab sum par depend karta to movement hi nahi hota. To asli reason sum nahi hai. Sum sirf signal hai. Decision kis baat se ho raha hai? 👉 Sorted property.
Hum jaante hain: Array sorted hai. Isliye hume pata hai:
Bigger sum chahiye → Left ko badhao.
Smaller sum chahiye → Right ko ghatao.

Agar array sorted hi na hota... aisa hota arr = [5 1 8 2 6 3]
Aur sum chhota hota. Kya confidently left++ kar sakte? ❌ Nahi.
Kyuki next value chhoti bhi ho sakti hai. Isliye interview answer hoga 🎯:

//\* "Opposite Direction pointer movement depends on the sorted property of the data, which allows us to eliminate impossible search space." Ye sentence SDE interview level ka hai.

2. Same Direction

//\* "Same Direction pointer movement depends on maintaining a valid window according to the problem's condition."

Notice difference 🎯.
"Add old remove" kaam hai.
"Maintain valid window" objective hai.

\*/

/\*
🎯 Sabse Important Visualization
//? Opposite Direction:-
Imagine tum ek library mein ho. Tumhe dictionary mein ek word dhoondhna hai. Tum jaante ho dictionary alphabetical hai. Agar tum "Mango" dhoondh rahe ho aur page "Apple" par ho... Tum peeche jaoge? ❌ Nahi. Seedha aage jaoge. Kyun?

Sorted order tumhe direction de raha hai.Isliye search space eliminate hota hai.

//? Same Direction: -
Imagine tum bus mein travel kar rahe ho aur conductor ko hamesha current passengers ka count rakhna hai. Har stop par:
Kuch log utarte hain.
Kuch log chadhte hain.
Conductor poori bus dobara count karta hai? ❌ Nahi.
Bas:
Current Count

- Utarne wale

* Chadhne wale

Yehi Window Maintenance hai.

Window = "Current passengers."

\*/

/\*
Ek Table Bana Lo (Ye Lifetime Yaad Rahega)
Opposite Direction | Same Direction
Sorted array is important | Sorted hona zaroori nahi
Search space eliminate karta hai | Window maintain karta hai
Sum/condition batata hai kis pointer ko move karna hai | Window valid/invalid batata hai kis pointer ko move karna hai
Pair problems Subarray/Substring problems
Example: Two Sum II Example: Longest Subarray

\*/
