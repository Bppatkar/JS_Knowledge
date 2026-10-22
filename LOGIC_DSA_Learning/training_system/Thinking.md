# Meta-Principles Jo Experienced Solvers Automatically Follow Karte Hain

## A. Sochne Se Pehle: Setup

### 1. Problem ko apne words mein restate karo

Problem ko apne words mein likho aur ye cheezein clearly identify karo:

- Constraints kya hain?
- Kya guaranteed hai?
- Output exactly kya chahiye?

90% galat approaches problem ko galat samajhne ki wajah se hoti hain. Agar statement mein likha hai ki **unique solution guaranteed hai**, toh ye detail approach ko fundamentally badal sakti hai.

### 2. Brute force pehle likho

Brute-force solution ko skip mat karo. Optimal solution aksar brute force ka hi optimized version hota hai. Brute force likhe bina "clever" solution sochna aksar confusion create karta hai.

## B. Sochne Ki Direction

### 3. Chhote examples trace karo

Do ya teen chhote examples haath se solve karo, including edge cases. Pattern data se nikalta hai, sirf screen ko dekhne se nahi.

### 4. Redundant work identify karo

Poocho: **brute force mein kaunsa kaam baar-baar repeat ho raha hai?**

Optimization ka main goal isi repeated work ko remove karna hai. Prefix sum, sliding window, memoization aur monotonic stack—sab isi principle par based hain.

> Sabse important optimization rule: repeated work ko eliminate karo.

### 5. Invariant dhundo

Poocho: **har step par kya hamesha true rehna chahiye?**

Greedy, dynamic programming aur two-pointer problems ko aksar ek suitable invariant identify karke solve kiya ja sakta hai.

## C. Data Structure Kaise Choose Karein

Ye mat poocho: **"Mujhe kaunsa data structure aata hai?"**

Iske bajay poocho:

1. Algorithm ko kaunse operations chahiye?
2. Bottleneck kya hai?
3. Kaunsa data structure bottleneck ko `O(1)` ya `O(log n)` bana sakta hai?

### Quick Reference

| Requirement                    | Suitable data structure   |
| ------------------------------ | ------------------------- |
| Order ke saath minimum/maximum | Heap                      |
| Lookup ke saath order          | Sorted array / BST        |
| Frequency count                | Hash map / Array          |
| Range query                    | Prefix sum / Segment tree |
| LIFO operations                | Stack                     |
| FIFO operations                | Queue                     |

### 6. Representation badlo

Agar atak jao, toh problem ki representation change karke dekho:

- Array ko sort kar do
- Frequency map bana do
- Graph construct karo
- Coordinates compress karo

Bahut si difficult problems representation change karne ke baad simple ho jaati hain.

## D. Verify Aur Ship

### 7. Apne approach ko todne ki koshish karo

Approach milne ke baad paanch minute tak counterexample dhoondo. Agar counterexample na mile, toh code karo. Agar mil jaaye, toh usi example ka use karke approach refine karo.

### 8. Time-box follow karo

- Medium problem: maximum 45 minutes
- Stuck ho jao: hint ya solution dekho
- Phir agle problem par move karo

Learning ek problem se nahi, balki 100 problems solve karne se hoti hai.
