# Prefix Sum Pattern

## Recognition

Use Prefix Sum when:

- Multiple Range Sum Queries
- Repeated Summation
- Sum between L and R
- Query Optimization Required
- Immutable Array

---

## Visualization

Original

2 5 1 8 3

↓

Prefix

0 2 7 8 16 19

Each Prefix[i] stores the sum of elements before index i.

---

## Engineering Analogy

Company Revenue Dashboard

Instead of calculating revenue every time for a date range,

Store cumulative revenue once.

Range Revenue

=

Total Until End

-

Total Before Start

---

## Pattern Formula

### Prefix Construction

Prefix[0] = 0

Prefix[i] = Prefix[i-1] + nums[i-1]

---

### Range Sum

Range(L,R)

=

Prefix[R+1] - Prefix[L]

---

## Algorithm

1. Create Prefix Array.
2. Store cumulative sum.
3. For every query
4. Return

Prefix[R+1]-Prefix[L]

---

## Pseudo Code

Create Prefix

Prefix[0]=0

Loop

Prefix[i]=Prefix[i-1]+nums[i-1]

For Query

return Prefix[R+1]-Prefix[L]

---

## Complexity

Build

O(n)

Query

O(1)

Space

O(n)

---

## Common Bugs

❌ Forgetting Dummy Zero

❌ Wrong Index Mapping

❌ Using nums[i] instead of nums[i-1]

❌ Wrong Loop Length

---

## Interview Questions

Why Prefix Sum?

Why Dummy Zero?

Can Prefix Sum work in-place?

Difference between Running Sum and Prefix Sum?

---

## Related Problems

LC1480

LC303

LC724

LC560

LC930

LC974

LC523

---

## Pattern Mixing

Prefix + HashMap

Prefix + Sliding Window

Prefix + Matrix

---

## Engineering Connection

Caching

Analytics Dashboard

Financial Reports

Monitoring Systems

Database Aggregation

---

## Revision Checklist

☐ Can build Prefix Array

☐ Can derive Prefix Formula

☐ Can derive Range Formula

☐ Can explain Dummy Zero

☐ Can explain O(1) Query

☐ Can identify Prefix Pattern

---

//\* Notes Revision range sum and prefix sum

//? 🎯 Revision (2 Minutes)

Original Array

Index : 0 1 2 3 4
Value : 2 5 1 8 3
//\* Step 1: Prefix Sum WITHOUT Dummy 0
Prefix

Index : 0 1 2 3 4
Value : 2 7 8 16 19

Meaning:
Prefix[0] = 2
Prefix[1] = 2+5 = 7
Prefix[2] = 2+5+1 = 8
Prefix[3] = 2+5+1+8 = 16
Prefix[4] = 19

//\* Range Sum
Suppose interviewer asks: Sum from index 2 to 4

Original 1 + 8 + 3 = 12

Formula :- Prefix[4] - Prefix[1]
19 - 7 = 12 Works.

Problem :- Now suppose Sum from index 0 to 3
Formula becomes- Prefix[3] - Prefix[-1] 😑 Prefix[-1] exist hi nahi karta.

Isliye edge case likhna padta hai.

if(L==0) return Prefix[R]
else return Prefix[R]-Prefix[L-1]

Interviewer ko extra condition pasand nahi aati agar avoid ho sakti ho.

//\* Step 2: Prefix WITH Dummy 0 (Engineering Version)

Hum beginning mein ek extra 0 rakh dete hain.

Prefix

Index : 0 1 2 3 4 5
Value : 0 2 7 8 16 19

Dhyan do.

Ye extra 0 kisi sum ka part nahi hai. Ye sirf index shifting ke liye hai.
Ab wahi query Index 2 → 4
Formula: - Prefix[5] - Prefix[2]
19 - 7 = 12 ab difficult case

Index 0 → 3
Formula :- Prefix[4] - Prefix[0]
16 - 0 = 16

🎉 Koi edge case nahi. Koi if nahi. Har baar same formula.

🧠 Visualization (Sabse Important)

Socho Prefix Array mein har element apne left side ka total store karta hai.

Original

2 5 1 8 3

        ↑
      Start

Tumhe index 2 se chahiye. To usse pehle ka total hata do. Total till 4

19 - [Total till before 2] 7 = 12

Yehi Prefix Sum ka magic hai.

//? Ek Rule Yaad Rakhna
//_ Without Dummy Answer = Prefix[R] - Prefix[L-1] Problem: ❌ L==0
//_ With Dummy (Preferred) Answer = Prefix[R+1] - Prefix[L] Problem: ✅ None

💡 Engineer Dummy 0 Kyun Pasand Karte Hain? Ek line mein: Because one formula works for every query without any special case.

📌 Difference
Prefix Sum | Range Sum
Prefix Array banata hai | Prefix Array use karta hai
Precomputation | Query
O(n) | O(1)
Build Phase | Query Phase

🔥 Ye table yaad rakhna.
