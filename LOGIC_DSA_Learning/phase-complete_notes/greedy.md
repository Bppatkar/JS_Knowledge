# 🌈 GREEDY ALGORITHM — COMPLETE DEEP DIVE 🌈

> **Philosophy:** Greedy is a problem-solving approach where we make locally optimal choices, with the hope that it will lead to a globally optimal solution.
> **"Take the best choice at the moment, without worrying about the future."**

# <span style="color:#FF6347">📚 PART 1 — GREEDY FUNDAMENTALS</span>

## <span style="color:#1E90FF">🌳 GREEDY KYA HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Greedy Algorithm** ek technique hai jisme hum **har step pe locally best choice** lete hain, ye soch ke ki overall globally best answer milega.

**Matlab:** "Abhi jo best lagta hai wahi karo, aage ka baad me dekhenge."

**Real life examples:**

- 🍽️ Buffet me khaana — har baar best dish uthao
- 💰 Chillar dena — sabse bade coin se start karo
- 📅 Meeting scheduling — jo pehle khatam ho, wahi karo
- 🎒 Bag packing — sabse valuable item pehle

</div>

---


## <span style="color:#FFD700">🎯 GREEDY KE 2 CONDITIONS (Important!)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Greedy tabhi **correct** hoti hai jab ye do properties hon:

### 🔹 1. Greedy Choice Property
**"Local best choice se global best milta hai."**
Matlab — aaj ka best choice, kal ka bhi best hoga.

### 🔹 2. Optimal Substructure
**"Problem ka optimal solution, subproblems ke optimal solutions se banta hai."**
Matlab — badi problem ka answer, chhoti problems ke answers se milta hai.

### ⚠️ Problem Kab Aati Hai
Agar greedy choice property **fail** ho jaye, to greedy **galat answer** dega.

**Classic Example — Coin Change:**
```text
Coins: [1, 3, 4], Target: 6
Greedy: 4 + 1 + 1 = 3 coins ❌
Optimal: 3 + 3 = 2 coins
```
Kyunki greedy ne sabse bada coin (4) pehle liya — jo locally best tha, globally nahi.

</div>

---

## <span style="color:#32CD32">⚡ GREEDY vs DP vs BACKTRACKING</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Aspect          | Greedy                      | DP                       | Backtracking                |
| :-------------- | :-------------------------- | :----------------------- | :-------------------------- |
| **Approach**    | Local best                  | Saare options            | Saare options               |
| **Time**        | Fast (`O(n log n)` usually) | Slow (`O(n²)`, `O(n·k)`) | Exponential                 |
| **Space**       | `O(1)` usually              | `O(n)` DP table          | `O(n)` stack                |
| **Correctness** | Kabhi kabhi ❌              | Always ✅                | Always ✅                   |
| **Kab Use**     | Jab greedy choice safe ho   | Jab overlapping problems | Jab saare solutions chahiye |

### 🔑 Ek Line Me

> **Greedy** — "abhi jo best, wahi karo"  
> **DP** — "saare options try karo, best yaad rakho"  
> **Backtracking** — "saare possible solutions banao"

</div>

---

## <span style="color:#9370DB">🎯 KAB GREEDY CHALEGI, KAB NAHI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

### ✅ Greedy Chalegi Jab:

1. **Sorting-based problems** — intervals, meetings
2. **Local choice global se match kare** — coin change standard coins me
3. **Prefix-based decisions** — har step ka decision independent ho
4. **Exchange argument** — "agar choice swap karein to better nahi hoga"

### ❌ Greedy Nahi Chalegi Jab:

1. **Choices future pe depend karein** — DP chahiye
2. **Multiple valid paths ho** — DP ya backtracking
3. **Local best ≠ global best** — classic coin change
4. **Subproblems overlap karein** — DP chahiye

### 🔑 Rule of Thumb

> **"Agar greedy se answer mil raha hai, aur tu prove kar sakta hai ki local best se global best milega — to greedy use karo."**

> **"Agar doubt ho — DP use karo (safe hai)."**

</div>

---

# <span style="color:#FF6347">📚 PART 2 — GREEDY PROBLEM HINTS & TYPES</span>

## <span style="color:#1E90FF">🔍 TYPES OF PROBLEMS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

1. **Optimization Problems:** (min/max result)
   - Activity selection / Interval Scheduling
   - Fractional Knapsack
   - Job Sequencing with Deadlines
2. **Graph Problems:**
   - Minimum Spanning Tree (MST) → Kruskal's / Prim's
   - Shortest Path → Dijkstra
3. **Scheduling Problems:**
   - CPU Scheduling
4. **Game/Puzzles and much more...**

</div>

---

## <span style="color:#FFD700">🎯 GREEDY PROBLEM HINTS (Keywords to look for)</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

1. Max or min Number of.......
2. Min cost / Max profit / Max utility
3. Min time / Max time / Min distance / Max distance
4. Schedule / allocate / assign / select / choose / pick / find / cover / partition / divide efficiently
5. Sort / Arrange / Order / Organize / Prioritize / Rank / Group / Cluster
6. Shortest / longest / smallest / largest / nearest / farthest (with constraints)
7. Non-overlapping intervals

</div>

---

## <span style="color:#32CD32">📜 GOLDEN RULE & TEMPLATE</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Golden Rule
> **Greedy is an Algorithm, not a Data Structure.** So we can use any data structure to implement greedy algorithm (array, linked list, stack, queue, heap, priority queue, graph etc.)
- Sometimes greedy requires: Sorting → Choosing
- Sometimes greedy requires: Choosing → Sorting
- Sometimes greedy requires: Sorting → Choosing → Sorting
- Sometimes greedy requires: Combined with Heap / Priority Queues
- Sometimes greedy requires: Combined with Graph Algorithms

### 🔹 Greedy Algorithm Template
1. **Sort** the input data (if required)
2. **Initialize** the result variable (if required)
3. **Iterate** through the input data and make locally optimal choices
4. **Update** the result variable (if required)
5. **Return** the result variable (if required)
6. **Analyze** T&S Complexity: mostly `O(nlogn)` for sorting, `O(n)` for iteration → Total `O(nlogn)` Time, `O(1)` Space.
7. **Check** if Greedy Choice Property and Optimal Substructure hold true.

</div>

---


# <span style="color:#FF6347">📚 PART 3 — GREEDY PATTERNS</span>

## <span style="color:#1E90FF">🎯 PATTERN 1 — ACTIVITY SELECTION / INTERVALS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Maximum meetings attend karo, jo overlap na karein.

**Greedy Choice:** Sabse pehle khatam hone wali meeting choose karo.

**Kyun kaam karta:** Jo pehle khatam, wo kam time block karegi — zyada meetings fit hongi.

```javascript
function maxMeetings(intervals) {
  // End time se sort karo
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let lastEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= lastEnd) {
      // No overlap
      count++;
      lastEnd = intervals[i][1];
    }
  }
  return count;
}
```

**Visual:**

```text
Intervals: [[1,3], [2,4], [3,5], [4,6]]

End time sort: [[1,3], [2,4], [3,5], [4,6]]

Pick [1,3] (end=3)
Next: [3,5] (start=3 >= 3) ✅
Skip [2,4]
Pick [3,5] (end=5)
Next: [4,6] (start=4 < 5) ❌ skip

Max: 2 meetings ([1,3] and [3,5])
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 2 — MERGE INTERVALS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Overlapping intervals merge karo.

**Greedy Choice:** Start time se sort karo, phir merge karte jao.

```javascript
function merge(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);

  let result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    let last = result[result.length - 1];
    let curr = intervals[i];

    if (curr[0] <= last[1]) {
      // Overlap — merge
      last[1] = Math.max(last[1], curr[1]);
    } else {
      result.push(curr);
    }
  }
  return result;
}
```

**Visual:**

```text
[[1,3], [2,6], [8,10], [15,18]]
       ↑ overlap

After merge:
[[1,6], [8,10], [15,18]]
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 3 — MINIMUM MEETING ROOMS</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Kitne rooms chahiye saari meetings ke liye?

**Idea:** Start aur end times alag sort karo. Do pointers se chal.

```javascript
function minMeetingRooms(intervals) {
  let starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  let ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let rooms = 0,
    endPtr = 0,
    maxRooms = 0;

  for (let start of starts) {
    if (start < ends[endPtr]) {
      rooms++; // Naya room chahiye
    } else {
      endPtr++; // Ek room free ho gaya
    }
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}
```

**Visual:**

```text
Meetings: [[0,30], [5,10], [15,20]]

Starts: [0, 5, 15]
Ends:   [10, 20, 30]

start=0 < end=10 → rooms=1
start=5 < end=10 → rooms=2
start=15 > end=10 → endPtr=1, rooms=2
start=15 < end=20 → rooms=3 (wait, recalc)

Actually: start=15 >= ends[1]=20? No → rooms=3? Let me redo.

Better trace:
rooms = 0, maxRooms = 0, endPtr = 0

start=0: 0 < 10 → rooms=1, maxRooms=1
start=5: 5 < 10 → rooms=2, maxRooms=2
start=15: 15 >= 10 → endPtr=1, rooms stays 2
start=15: 15 < 20 → hmm wait

Correct trace:
start=0: 0 < ends[0]=10 → rooms=1
start=5: 5 < 10 → rooms=2
start=15: 15 >= 10 → endPtr=1, rooms stays 2
         then check 15 vs ends[1]=20?

Actually algorithm:
for start in starts:
  if start < ends[endPtr]: rooms++
  else: endPtr++

start=0: 0 < 10 → rooms=1
start=5: 5 < 10 → rooms=2
start=15: 15 >= 10 → endPtr=1, rooms stays 2
start=15: next iter? No, only 3 starts.

Answer: 2 rooms ✅
```

**Alternative — Min Heap:**

```javascript
function minMeetingRooms(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let heap = []; // min-heap of end times

  for (let [start, end] of intervals) {
    if (heap.length && heap[0] <= start) heap.shift();
    heap.push(end);
    heap.sort((a, b) => a - b);
  }
  return heap.length;
}
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 4 — JUMP GAME</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Array me `nums[i]` = max jump length. Last index tak pahunch sakte ho?

**Greedy Choice:** Maximum reachable index track karo.

```javascript
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // Can't reach
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}
```

**Visual:**

```text
nums = [2, 3, 1, 1, 4]

i=0: maxReach=2
i=1: maxReach=max(2, 1+3=4)=4
i=2: maxReach=max(4, 2+1=3)=4
i=3: maxReach=max(4, 3+1=4)=4
i=4: maxReach=max(4, 4+4=8)=8

Reach end ✅
```

### 🔹 Jump Game II — Minimum Jumps

```javascript
function jump(nums) {
  let jumps = 0,
    currEnd = 0,
    farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currEnd) {
      // Current jump khatam
      jumps++;
      currEnd = farthest;
    }
  }
  return jumps;
}
```

**Idea:** Current jump ke boundary pe pahuncho, phir next jump lo (farthest tak).

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 5 — GAS STATION</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Kahan se start karo ki poora circle travel ho jaye?

**Greedy Choice:** Agar total gas ≥ total cost, to answer **exist karta hai**. Start index wahi hoga jahan se pehli baar tank khaali na ho.

```javascript
function canCompleteCircuit(gas, cost) {
  let totalGas = 0,
    totalCost = 0;
  let tank = 0,
    start = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    tank += gas[i] - cost[i];

    if (tank < 0) {
      // Reset
      start = i + 1;
      tank = 0;
    }
  }
  return totalGas >= totalCost ? start : -1;
}
```

**Idea:**

- Total gas ≥ total cost → answer exists
- Jahan tank negative hua, wahan se start nahi ho sakta → next index se try karo
- Last me jo start bacha, wahi answer

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 6 — COIN CHANGE (Greedy — Limited)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Minimum coins chahiye amount ke liye.

**Greedy:** Sabse bada coin pehle lo.

**⚠️ Warning:** Ye **sirf standard currency systems** me kaam karta hai (jaise Indian, US). Custom coins me fail ho sakta hai.

```javascript
function coinChange(coins, amount) {
  coins.sort((a, b) => b - a); // Descending
  let count = 0;
  for (let coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  return amount === 0 ? count : -1;
}
```

**Kab Fail Hota:**

```text
Coins: [1, 3, 4], Target: 6

Greedy: 4 + 1 + 1 = 3 coins
Optimal: 3 + 3 = 2 coins

Greedy FAILS ❌
```

**Isko solve karne ke liye DP use karo (next chapter).**

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 7 — FRACTIONAL KNAPSACK</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Items ko todkar le sakte ho (fractions). Max value chahiye capacity ke andar.

**Greedy:** Value/Weight ratio se sort karo, sabse zyada ratio wala pehle.

```javascript
function fractionalKnapsack(items, capacity) {
  // items = [{value, weight}]
  items.sort((a, b) => b.value / b.weight - a.value / a.weight);

  let totalValue = 0;
  for (let item of items) {
    if (capacity >= item.weight) {
      totalValue += item.value;
      capacity -= item.weight;
    } else {
      totalValue += item.value * (capacity / item.weight);
      break;
    }
  }
  return totalValue;
}
```

**Visual:**

```text
Items: [{v:60, w:10}, {v:100, w:20}, {v:120, w:30}]
Capacity = 50

Ratios: 6, 5, 4
Sort: [{60,10}, {100,20}, {120,30}]

Take item 1 (60, 10): cap = 40, value = 60
Take item 2 (100, 20): cap = 20, value = 160
Take 20/30 of item 3: value += 120 * 20/30 = 80
Total: 240
```

**Note:** Ye **0/1 Knapsack** nahi hai. Wahan items tod nahi sakte — wahan DP lagta hai.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 8 — SCHEDULING (Deadlines)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Jobs ke deadlines aur profits hain. Max profit chahiye (har job 1 unit time leta hai).

**Greedy:** Profit se sort karo (descending). Har job ko **latest possible slot** me rakho.

```javascript
function jobScheduling(jobs) {
  // jobs = [{id, deadline, profit}]
  jobs.sort((a, b) => b.profit - a.profit);

  let maxDeadline = Math.max(...jobs.map((j) => j.deadline));
  let slots = new Array(maxDeadline + 1).fill(false);

  let totalProfit = 0;
  for (let job of jobs) {
    for (let t = job.deadline; t > 0; t--) {
      if (!slots[t]) {
        slots[t] = true;
        totalProfit += job.profit;
        break;
      }
    }
  }
  return totalProfit;
}
```

**Visual:**

```text
Jobs: [(1,4,20), (2,1,10), (3,1,40), (4,1,30)]

Sort by profit: [(3,1,40), (4,1,30), (1,4,20), (2,1,10)]

Slots: [_, _, _, _] (index 1-4)

Job 3 (deadline 1, profit 40): Slot 1 → [_, 3, _, _]
Job 4 (deadline 1, profit 30): Slot 1 occupied → no slot
Job 1 (deadline 4, profit 20): Slot 4 → [_, 3, _, 1]
Job 2 (deadline 1, profit 10): Slot 1 occupied → no slot

Total profit: 40 + 20 = 60
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 9 — TWO POINTER GREEDY</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Boat problem — har boat max 2 log, max weight limit. Minimum boats?

**Greedy:** Sabse heavy aur sabse light ko pair karo.

```javascript
function numRescueBoats(people, limit) {
  people.sort((a, b) => a - b);
  let left = 0,
    right = people.length - 1;
  let boats = 0;

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++; // Light wala bhi chala gaya
    }
    right--;
    boats++;
  }
  return boats;
}
```

**Idea:** Heaviest insaan ko hamesha boat chahiye. Agar uske saath lightest fit ho jaye, to dono bhej do. Warna heaviest akela.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 10 — STOCK BUY/SELL (Multiple Transactions)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Multiple transactions allowed. Max profit?

**Greedy:** Jab bhi price badhe, profit le lo.

```javascript
function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}
```

**Visual:**

```text
prices = [7, 1, 5, 3, 6, 4]

Buy at 1, sell at 5 → profit 4
Buy at 3, sell at 6 → profit 3

Total: 7 ✅

Greedy: 1→5 (+4), 3→6 (+3) = 7
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 11 — HUFFMAN CODING (Greedy + Heap)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Minimum bits me characters encode karo, frequency ke hisaab se.

**Greedy:** Do sabse kam frequency wale nodes combine karo, naya node banao.

**Min Heap use karo** — har step pe 2 smallest nikaalo.

```javascript
function huffmanCoding(freqs) {
  // Min heap banao
  let heap = freqs.slice().sort((a, b) => a - b);

  while (heap.length > 1) {
    heap.sort((a, b) => a - b);
    let a = heap.shift();
    let b = heap.shift();
    heap.push(a + b);
  }
  return heap[0]; // Total cost
}
```

**Visual:**

```text
Freqs: [5, 9, 12, 13, 16, 45]

Combine 5+9 = 14    → [12, 13, 14, 16, 45]
Combine 12+13 = 25  → [14, 16, 25, 45]
Combine 14+16 = 30  → [25, 30, 45]
Combine 25+30 = 55  → [45, 55]
Combine 45+55 = 100 → [100]

Total: 100
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 12 — LEMONADE CHANGE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Lemonade bechna hai $5 me. Customers $5, $10, $20 de sakte hain. Change de sakte ho?

**Greedy:** Bade notes pehle use karo change dene ke liye.

```javascript
function lemonadeChange(bills) {
  let five = 0,
    ten = 0;

  for (let bill of bills) {
    if (bill === 5) five++;
    else if (bill === 10) {
      if (five === 0) return false;
      five--;
      ten++;
    } else {
      // 20
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else return false;
    }
  }
  return true;
}
```

**Key:** $20 ke change me **$10 + $5** prefer karo, **3 × $5** nahi — kyunki $5 flexible hai.

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 13 — CANDY DISTRIBUTION</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Bachcho ko candies do — jo zyada rating wale, zyada candies.

**Idea:** Left-to-right pass + right-to-left pass.

```javascript
function candy(ratings) {
  let n = ratings.length;
  let candies = new Array(n).fill(1);

  // Left to right
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }

  // Right to left
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((a, b) => a + b, 0);
}
```

**Visual:**

```text
ratings = [1, 0, 2]

Left pass:  [1, 1, 2]
Right pass: [2, 1, 2]

Total: 5
```

</div>

---

## <span style="color:#1E90FF">🎯 PATTERN 14 — TASK SCHEDULER</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

**Problem:** Same task ke beech `n` idle time. Minimum intervals?

**Greedy:** Sabse frequent task pehle karo.

```javascript
function leastInterval(tasks, n) {
  let freq = {};
  for (let t of tasks) freq[t] = (freq[t] || 0) + 1;

  let maxFreq = Math.max(...Object.values(freq));
  let maxCount = 0;
  for (let f of Object.values(freq)) {
    if (f === maxFreq) maxCount++;
  }

  let formula = (maxFreq - 1) * (n + 1) + maxCount;
  return Math.max(formula, tasks.length);
}
```

**Visual:**

```text
tasks = ["A","A","A","B","B","B"],  n = 2

maxFreq = 3 (A and B)
maxCount = 2

Formula: (3-1) * (2+1) + 2 = 8

Layout: A B _ A B _ A B  → 8 slots
```

</div>

---


# <span style="color:#FF6347">📚 PART 4 — GREEDY vs DP & PROVING TECHNIQUES</span>

## <span style="color:#1E90FF">🔍 CONFUSION CLEAR KARO (Greedy vs DP)</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

| Problem | Greedy | DP |
|:---|:---:|:---:|
| Activity Selection | ✅ | ✅ |
| Merge Intervals | ✅ | — |
| Jump Game I, II | ✅ | ✅ |
| Coin Change (standard) | ✅ | ✅ |
| Coin Change (custom) | ❌ | ✅ |
| 0/1 Knapsack | ❌ | ✅ |
| Fractional Knapsack | ✅ | ✅ |
| Huffman Coding | ✅ | ✅ |
| Task Scheduler | ✅ | ✅ |
| LIS | ❌ | ✅ |

**Rule:** Jahan greedy chal jaye, wahi use karo — fast hai. Nahi chale to DP.

</div>

---

## <span style="color:#FFD700">🎯 KAISE PATA CHALEGA GREEDY CHALEGI?</span>

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

### 🔹 3 Sawaal Khud Se Pooch

1. **Kya local best = global best?**
   - Agar haan → greedy
   - Agar doubt → DP

2. **Kya choices future pe depend karti hain?**
   - Nahi → greedy
   - Haan → DP

3. **Kya ek chhota example me greedy fail hota hai?**
   - Counter-example mile → greedy nahi
   - Nahi mile → greedy try karo

### 🔹 Exchange Argument (Proof Technique)

"Greedy choice ko kisi bhi optimal solution me **swap** kar sakte ho, aur answer better ya same rahega."

Agar ye prove kar sake → greedy sahi hai.

### 🔹 Classic Greedy Signals

- **Sort karo** + linear scan
- **Har step pe decision** independent
- **Intervals, meetings, scheduling**
- **Prefix decisions**
- **Two-pointer**
- **Min/Max Heap ke saath** (Huffman, K-closest)

</div>

---

## <span style="color:#9370DB">📊 GREEDY vs DP — COMPARISON</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

| Problem                     |     Greedy      | DP  |
| :-------------------------- | :-------------: | :-: |
| Activity Selection          |       ✅        | ✅  |
| Merge Intervals             |       ✅        |  —  |
| Jump Game I, II             |       ✅        | ✅  |
| Coin Change (standard)      |       ✅        | ✅  |
| Coin Change (custom)        |       ❌        | ✅  |
| 0/1 Knapsack                |       ❌        | ✅  |
| Fractional Knapsack         |       ✅        | ✅  |
| Huffman Coding              |       ✅        | ✅  |
| Task Scheduler              |       ✅        | ✅  |
| LIS                         |       ❌        | ✅  |
| Edit Distance               |       ❌        | ✅  |
| Matrix Chain Multiplication |       ❌        | ✅  |
| Longest Common Subsequence  |       ❌        | ✅  |
| Gas Station                 |       ✅        |  —  |
| Stock Buy/Sell (multiple)   |       ✅        | ✅  |
| Stock Buy/Sell (single)     | ✅ (min so far) | ✅  |

**Rule:** Jahan greedy chal jaye, wahi use karo — fast hai. Nahi chale to DP.

</div>

---

---

# <span style="color:#FF6347">📚 PART 5 — HEAP + GREEDY COMBINATIONS</span>

## <span style="color:#1E90FF">🔍 HEAP KA USE GREEDY ME</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

Kai greedy problems **heap** ke saath solve hoti hain:

### 🔹 Pattern — K Smallest/Largest

- **K largest** → Min Heap (size K)
- **K smallest** → Max Heap (size K)

### 🔹 Pattern — Top K Frequent

- Frequency count + Min Heap of size K

### 🔹 Pattern — Huffman Coding

- Min Heap se 2 smallest combine

### 🔹 Pattern — Task Scheduler

- Max Heap + cooldown queue

### 🔹 Pattern — K Closest Points

- Max Heap of size K

### 🔹 Pattern — Merge K Sorted Lists

- Min Heap of K elements

### 🔑 Rule

> **Jab bhi problem me "top K", "smallest K", "cheapest", "most frequent" jaisa kuch ho — Heap use karo.**

</div>

---

---

# <span style="color:#FF6347">📚 PART 6 — GREEDY PROVING TECHNIQUES</span>

## <span style="color:#1E90FF">🔍 KAISE PROVE KARE GREEDY SAHI HAI?</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

Interview me sirf greedy likhna kaafi nahi — **prove** bhi karna padta hai.

### 🔹 1. Exchange Argument

**Idea:** Maan lo ek optimal solution hai. Usme greedy choice ko **swap** karo. Agar answer **worse nahi hota**, to greedy bhi optimal hai.

**Example — Activity Selection:**

- Optimal solution me pehli meeting `A` hai
- Greedy ne `B` choose kiya (jo pehle khatam hoti hai)
- `B` ki end time `A` se kam ya barabar hai
- To `A` ki jagah `B` rakhne se baaki meetings bhi fit hongi
- Isliye greedy optimal hai ✅

### 🔹 2. Greedy Stays Ahead

**Idea:** Induction se prove karo — "har step pe greedy, optimal se peeche nahi hai."

**Example — Jump Game:**

- Har index pe greedy farthest reach rakhta hai
- Induction: agar `i` tak greedy pahunch sakta hai, to `i+1` tak bhi

### 🔹 3. Contradiction

**Idea:** Maan lo greedy optimal nahi hai. Optimal solution me pehla difference dhundho. Wahan greedy better ya equal hai — contradiction.

### 🔹 4. Structural Argument

**Idea:** Problem ki structure se prove karo ki greedy choice **forced** hai.

**Example — Huffman:**

- Two least frequent nodes MUST be deepest siblings in optimal tree
- Isliye unko combine karna forced choice hai

</div>

---

## <span style="color:#32CD32">🎯 WHEN TO USE EACH PROOF</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

| Proof Method           | Kab Use                     |
| :--------------------- | :-------------------------- |
| **Exchange Argument**  | Most common — sorting based |
| **Greedy Stays Ahead** | Sequential decisions        |
| **Contradiction**      | Complex proofs              |
| **Structural**         | Tree/graph based            |

**Interview me:** Exchange argument sabse zyada impressive hai. Bolo — "Maan lo optimal solution me ye choice X hai, hum isko Y se replace kar sakte hain..."

</div>

---

---

# <span style="color:#FF6347">📚 PART 7 — CLASSIC GREEDY PROBLEMS</span>

## <span style="color:#00FA9A">💻 MUST-KNOW LEETCODE PROBLEMS</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #00FA9A;">

### 🔹 Interval / Scheduling

|    #     | Problem                      | Pattern            |
| :------: | :--------------------------- | :----------------- |
| **435**  | Non-overlapping Intervals    | Activity selection |
|  **56**  | Merge Intervals              | Sort + merge       |
|  **57**  | Insert Interval              | Merge              |
| **253**  | Meeting Rooms II             | Heap               |
| **452**  | Min Arrows to Burst Balloons | Sort by end        |
| **252**  | Meeting Rooms                | Sort               |
| **1288** | Remove Covered Intervals     | Sort               |
| **1024** | Video Stitching              | Jump game variant  |

### 🔹 Array Greedy

|    #    | Problem           | Pattern         |
| :-----: | :---------------- | :-------------- |
| **55**  | Jump Game         | Farthest reach  |
| **45**  | Jump Game II      | Min jumps       |
| **134** | Gas Station       | Total + start   |
| **135** | Candy             | Two passes      |
| **122** | Stock Buy/Sell II | Sum increases   |
| **121** | Stock Buy/Sell I  | Min so far      |
| **763** | Partition Labels  | Last occurrence |

### 🔹 Heap + Greedy

|    #    | Problem              | Pattern         |
| :-----: | :------------------- | :-------------- |
| **215** | Kth Largest          | Min Heap        |
| **347** | Top K Frequent       | Heap + HashMap  |
| **621** | Task Scheduler       | Max Heap + math |
| **973** | K Closest Points     | Max Heap        |
| **692** | Top K Frequent Words | Heap + custom   |

### 🔹 String Greedy

|    #    | Problem                  | Pattern            |
| :-----: | :----------------------- | :----------------- |
| **860** | Lemonade Change          | Greedy with counts |
| **409** | Longest Palindrome       | Char counts        |
| **680** | Valid Palindrome II      | Two pointers       |
| **316** | Remove Duplicate Letters | Monotonic stack    |

### 🔹 Graph Greedy

|    #     | Problem                    | Pattern                |
| :------: | :------------------------- | :--------------------- |
| **261**  | Graph Valid Tree           | DFS/BFS                |
| **1584** | Min Cost to Connect Points | MST (Prim's/Kruskal's) |
| **743**  | Network Delay Time         | Dijkstra               |
| **787**  | Cheapest Flights K Stops   | Bellman-Ford / DP      |

</div>

---

---

# <span style="color:#FF6347">📚 PART 8 — GREEDY PATTERNS — QUICK REFERENCE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

| Pattern                 | Signal                     | Greedy Choice               |
| :---------------------- | :------------------------- | :-------------------------- |
| **Activity Selection**  | Max events without overlap | Sort by end time            |
| **Merge Intervals**     | Combine overlaps           | Sort by start time          |
| **Meeting Rooms**       | Min resources              | Heap of end times           |
| **Jump Game**           | Reach end                  | Track farthest              |
| **Gas Station**         | Circular route             | Reset on negative           |
| **Fractional Knapsack** | Value/weight               | Sort by ratio               |
| **Job Scheduling**      | Deadlines                  | Sort by profit, latest slot |
| **Huffman**             | Min bits                   | Two smallest combine        |
| **Lemonade**            | Change dena                | Prefer big notes            |
| **Candy**               | Ratings                    | Two passes                  |
| **Task Scheduler**      | Cooldown                   | Max freq first              |
| **Stock II**            | Profit                     | Sum positives               |
| **Partition Labels**    | Split string               | Last occurrence             |
| **K Largest**           | Top K                      | Min Heap size K             |

</div>

---

---

# <span style="color:#FF6347">📚 PART 9 — GREEDY MISTAKES (COMMON)</span>

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

### ⚠️ Mistake 1 — Bina Prove Kiye Greedy Use Karna

```text
Coin Change: [1, 3, 4], Target: 6

Greedy: 4 + 1 + 1 = 3 coins ❌
Optimal: 3 + 3 = 2 coins
```

**Fix:** Small example se check karo. Agar fails → DP.

### ⚠️ Mistake 2 — Galat Sorting Key

```text
Activity Selection:
Sort by START ❌
Sort by END ✅

Intervals:
Sort by START ✅ (for merge)
Sort by END ✅ (for max non-overlapping)
```

**Fix:** Problem ke hisaab se sorting key socho.

### ⚠️ Mistake 3 — Local Choice Se Global Assume Karna

**Rule:** Har greedy choice ko **prove** karo — exchange argument se.

### ⚠️ Mistake 4 — Boundary Cases Ignore Karna

- Empty input
- Single element
- Equal values
- Negative numbers

### ⚠️ Mistake 5 — Tie-Breaking Ignore Karna

Jab **equal** values hain — kaunsa pehle? Sorting stable hai ya nahi?

**Example:** Candy distribution me equal ratings pe same candy.

</div>

---

---

# <span style="color:#FF6347">📚 PART 10 — GREEDY VS DP — DECISION TREE</span>

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #FF6347;">

```text
Problem dekha
    ↓
Kya problem me "min/max/count" chahiye?
    ↓
Kya local best choice global best deti hai?
    ├── YES → Greedy try karo
    │         ↓
    │    Kya chhote example pe fail hota hai?
    │         ├── NO → Greedy use karo ✅
    │         └── YES → DP chahiye
    │
    └── NO / DOUBT → DP use karo
              ↓
         Kya overlapping subproblems hain?
              ├── YES → DP
              └── NO → Backtracking / Greedy
```

### 🔑 Ek Line Me

> **"Jab sure ho greedy chalega, tab greedy. Warna DP safe hai."**

</div>

---

---

# <span style="color:#FF6347">📚 PART 11 — FINAL SUMMARY</span>

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

### 🔹 Greedy Fundamentals

1. **Local best** se **global best** ki umeed
2. **2 conditions** — greedy choice property + optimal substructure
3. **Kabhi fail** hoti hai — tab DP

### 🔹 Greedy Patterns (14 total)

1. **Activity Selection** — sort by end
2. **Merge Intervals** — sort by start
3. **Meeting Rooms** — heap of ends
4. **Jump Game** — track farthest
5. **Gas Station** — reset on negative
6. **Fractional Knapsack** — value/weight ratio
7. **Job Scheduling** — deadline + profit
8. **Huffman** — min heap
9. **Lemonade** — prefer big notes
10. **Candy** — two passes
11. **Task Scheduler** — max freq
12. **Stock II** — sum positives
13. **Partition Labels** — last occurrence
14. **K Largest** — min heap

### 🔹 Proving Techniques

1. **Exchange Argument** — most common
2. **Greedy Stays Ahead** — induction
3. **Contradiction** — assume opposite
4. **Structural** — problem structure

### 🔹 Greedy + Heap

- K largest → min heap
- Top K → min heap
- Huffman → min heap
- Task Scheduler → max heap

### 🔥 Golden Rules

> **"Greedy tab use karo jab local best = global best, warna DP."**

> **"Sorting key se sab decide hota hai — sahi key choose karo."**

> **"Proof zaroori hai — exchange argument ya stays ahead."**

> **"Chhote example pe test karo — counter-example mila to greedy nahi."**

</div>
