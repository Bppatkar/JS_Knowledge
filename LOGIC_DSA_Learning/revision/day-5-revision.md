# Day 05 Revision - Prefix Sum & Precomputation

---

# Topics Covered

- Prefix Sum
- Precomputation
- Range Sum Query
- Dummy Zero Technique
- Index Mapping

---

# Recognition Rules

## Prefix Sum

Use when:

Multiple Range Sum Queries perform karni ho.

Recognition Keywords

- Sum between L and R
- Multiple Queries
- Fast Range Sum
- Repeated Sum Calculation

---

## Precomputation

Use when:

Ek expensive calculation ko sirf ek baar perform karke
future mein baar-baar reuse karna ho.

Formula

Compute Once

↓

Store

↓

Reuse

---

## Range Sum Query

Formula

Without Dummy Zero

prefix[R] - prefix[L-1]

With Dummy Zero

prefix[R+1] - prefix[L]

---

## Dummy Zero Technique

Purpose

Boundary case remove karna.

Without Dummy Zero

if (L == 0)

else

With Dummy Zero

Single Formula

prefix[R+1] - prefix[L]

---

## Index Mapping

Original Array

↓

Prefix Array

Original Index

↓

Prefix Index + 1

---

# Engineering Thinking

Brute Force

Every query

↓

Traverse again

↓

O(N × Q)

Prefix Sum

One Traversal

↓

Store Results

↓

Answer Every Query in O(1)

Total

O(N + Q)

---

# Common Mistakes

❌ Wrong Prefix Formula

❌ Forgetting Dummy Zero

❌ Wrong Index Mapping

❌ Building Prefix Multiple Times

❌ Recalculating Sum Every Query

---

# Interview Notes

Prefix Sum is NOT an optimization trick.

It is a Precomputation Pattern.

Idea

Pay once

↓

Use forever

Real Engineering Examples

- Database Cached Reports
- Analytics Dashboard
- Monthly Sales Summary
- CPU Prefix Calculations
- Financial Reports

---

# 2-Minute Revision Checklist

✅ Prefix Sum

✅ Precomputation

✅ Range Sum Query

✅ Dummy Zero Technique

✅ Index Mapping

✅ O(N + Q)

Pattern Locked ✅
---
//* Prefix Sum 
//! This is a Build Phase ok 
//? ye hai Out of Place algorithm [when we create new array]
// O(n)
let original_array = [3, 5, 7, 12, 22]
// prefix array = [3,8,15,27,49]
function prefixSum(original_array) {
  let ansArr = [];
  ansArr[0] = original_array[0]
  for (let i = 1; i < original_array.length; i++) {
    ansArr[i] = ansArr[i - 1] + original_array[i]
  }
  return ansArr;
}

//? In place algorithm [when we modify orignal array without taking extra memory] O(1)
function inPlaceAlgo(original_array) {
  for (let i = 1; i < original_array.length; i++) {
    original_array[i] = original_array[i - 1] + original_array[i]
  }
  return original_array
}
// console.log(inPlaceAlgo(original_array))

//! Prefix sum is Build Phase and Range sum [Query Phase ok] 
// range sum prefix sum ke bad aata hai means phle poora prefix sum banega fir uske bad range nikalege sum(0,2) sum(2,4) aise range ka sum index wise

---
//* Notes Revision range sum and prefix sum 

//? 🎯 Revision (2 Minutes)

Original Array

Index : 0  1  2  3  4
Value : 2  5  1  8  3
//* Step 1: Prefix Sum WITHOUT Dummy 0
Prefix

Index : 0  1  2   3   4
Value : 2  7  8  16  19

Meaning:
Prefix[0] = 2
Prefix[1] = 2+5 = 7
Prefix[2] = 2+5+1 = 8
Prefix[3] = 2+5+1+8 = 16
Prefix[4] = 19

//* Range Sum
Suppose interviewer asks: Sum from index 2 to 4

Original  1 + 8 + 3 = 12

Formula :- Prefix[4] - Prefix[1]
19 - 7 = 12 Works.

Problem :- Now suppose  Sum from index 0 to 3 
Formula becomes- Prefix[3] - Prefix[-1] 😑 Prefix[-1] exist hi nahi karta.

Isliye edge case likhna padta hai.

if(L==0) return Prefix[R]
else return Prefix[R]-Prefix[L-1]

Interviewer ko extra condition pasand nahi aati agar avoid ho sakti ho.

//* Step 2: Prefix WITH Dummy 0 (Engineering Version)

Hum beginning mein ek extra 0 rakh dete hain.

Prefix

Index : 0  1  2  3   4   5
Value : 0  2  7  8  16  19

Dhyan do.

Ye extra 0 kisi sum ka part nahi hai.  Ye sirf index shifting ke liye hai.
Ab wahi query Index  2 → 4
Formula: -  Prefix[5] - Prefix[2]
19 - 7 =  12 ab difficult case

Index  0 → 3
Formula :- Prefix[4] - Prefix[0]
16 - 0 = 16

🎉 Koi edge case nahi. Koi if nahi. Har baar same formula.

🧠 Visualization (Sabse Important)

Socho Prefix Array mein har element apne left side ka total store karta hai.

Original

2   5   1   8   3

        ↑
      Start

Tumhe index 2 se chahiye. To usse pehle ka total hata do.  Total till 4

19 - [Total till before 2] 7 = 12

Yehi Prefix Sum ka magic hai.

//? Ek Rule Yaad Rakhna
//* Without Dummy Answer = Prefix[R] - Prefix[L-1] Problem: ❌ L==0
//* With Dummy (Preferred) Answer = Prefix[R+1] - Prefix[L] Problem: ✅ None

💡 Engineer Dummy 0 Kyun Pasand Karte Hain? Ek line mein:  Because one formula works for every query without any special case.

*/


/*
📌 Difference
Prefix Sum	             |             Range Sum
Prefix Array banata hai  |	Prefix Array use karta hai
Precomputation           | 	Query
O(n)                     |	O(1)
Build Phase              | 	Query Phase

🔥 Ye table yaad rakhna.

*/
