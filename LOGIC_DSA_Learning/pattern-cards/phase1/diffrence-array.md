# Pattern Card

# Difference Array

---

# Recognition

Use when:

- Multiple range updates exist.
- Final updated array is required.
- Updating every element is expensive.

Keywords

- Range Update
- Bulk Update
- Multiple Queries
- Lazy Update
- Event Based Processing

---

# Visualization

Instead of updating every element:

L ------------ R

Mark

Start

↓

Effect ON

...

...

R + 1

↓

Effect OFF

---

# Engineering Analogy

Imagine switching ON a light.

At index L

Switch ON

The light keeps glowing automatically.

At index R + 1

Switch OFF

The light stops.

Difference Array works exactly like this.

---

# Algorithm

Create Difference Array.

For every query:

diff[L] += value

If (R + 1 < n)

diff[R + 1] -= value

After all updates:

Run Prefix Sum once.

Result becomes the updated array.

---

# Pseudo Code

Create diff[]

For every update

diff[L] += value

if (R + 1 < n)

diff[R + 1] -= value

Build Prefix Sum

Return updated array

---

# Complexity

Time

Updates

O(Q)

Prefix

O(N)

Total

O(Q + N)

Space

O(N)

---

# Common Bugs

❌ Updating every element.

❌ Using diff[R].

❌ Forgetting boundary check.

❌ Resetting Difference Array.

❌ Building Prefix after every query.

---

# Interview Questions

Q1

Why use Difference Array?

Q2

Why R + 1?

Q3

Why only one Prefix Sum?

Q4

Difference Array vs Prefix Sum?

Q5

Real-world use cases?

---

# Related Problems

LeetCode 370 (Premium)

LeetCode 1109

Car Pooling

Range Update Problems

---

# Pattern Mixing

Difference Array

-

Prefix Sum

↓

Efficient Range Update

---

# Revision Checklist

☐ Recognition

☐ Algorithm

☐ Prefix Reconstruction

☐ Complexity

☐ Boundary Case

☐ Engineering Connection

☐ Interview Explanation

<!--
🧩 Complete Topic Revision (Difference Array)
1. Recognition

Kab use karna hai?

Bahut saari range update queries ho.
Har query L se R tak same value add/subtract karti ho.
Final array end mein chahiye ho.
2. Core Idea

Normal approach:

Har element update karo.

Difference approach:

Start mark karo.

Stop mark karo.

Baad mein Prefix Sum se effect spread ho jayega.
3. Rule

For every query:

diff[L] += value

if (R + 1 < n)

diff[R + 1] -= value
4. Final Reconstruction

Ek baar Prefix Sum.

Answer[i]

=

Answer[i-1]

+

diff[i]
5. Complexity

Normal

Q queries

×

N elements

=

O(QN)

Difference

Updates

O(Q)

+

One Prefix

O(N)

=

O(Q+N)

Huge improvement.

6. Visualization
Start

↓

Effect ON

↓

↓

↓

Stop Marker

↓

Effect OFF
7. Prefix vs Difference
Prefix Sum	Difference Array
Fast Queries	Fast Updates
Compute cumulative sums	Store only change events
Query optimization	Update optimization
8. Common Bugs

❌ diff[R] -= value (Wrong)

✅ diff[R + 1] -= value

❌ Second marker lagana jab R+1 array ke bahar ho.

✅ Boundary check zaroor karo.

❌ Har query ke baad Diff Array reset kar dena.

✅ Ek hi Diff Array mein accumulate karna.

9. Engineering Connections
Bulk salary increments
Database batch updates
Calendar event ranges
Hotel room booking timelines
Railway reservation availability
Game buffs/debuffs
Analytics event windows
Subscription active periods

 -->

<!--
Rule yaad rakho:

diff[L] += value
Agar R + 1 array ke andar hai, to diff[R + 1] -= value
Agar R + 1 array ke bahar chala jaye, to second update nahi karte.
 -->

 <!-- 
 Train Analogy

Passengers

Station

0   1   2   3   4

Passengers station 1 par chadhe.

Wo station

1
2
3

tak travel karenge.

Wo station 3 par hi utarte hain.

Matlab station 3 tak train mein hain.

To train mein passengers kab nahi honge?

Station 4 se.

Isi liye Difference Array mein hum end par nahi...

end + 1 par marker lagate hain.
  -->
