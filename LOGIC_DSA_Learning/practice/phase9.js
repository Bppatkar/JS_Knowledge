//! Greedy Algorithms
//? Greedy is a problem solving approach ,where we make locally optimal choices, with a hope that it will lead to global optimal solution.

//? "Take best choice at the moment, without worrying about the future."

/*
Classic Example — Coin Change:

Coins: [1, 3, 5, 10], Target = 18
- you have to make 18 using minimum number of coins.

Greedy: 10 + 5 + 3 = 3 coins
that is the optimal solution.  - we have taken the best choice at the moment, without worrying about the future.
if we had taken 5 + 5 + 5 + 3 = 4 coins, that is not optimal solution.

///! to kya ham aisa smjhe - ki greedy solution hi optimal solution h?

///? so answer is NO, greedy solution is not always optimal solution. lekin wo optimal solution bhi ho sakta h.
*/

//! Types of Problems:
//* 1) Optmization Problems: (min/max result)
//? - Activity selction/ Interval Scheduling [simply means hame ek aisi activity select krni h, jisme maximum/minimum activities ho sake, like kahin maximum find krna hai, kahin minimum find ya minimum values use krna hai etc.]

//? - Fractional Knapsack [simply means hame ek aisi knapsack select krni h, jisme maximum value ho sake, and we can take fraction of items.]

//? - Job Sequencing with Deadlines [simply means hame ek aisi job select krni h, jisme maximum profit ho sake, and we have to complete the job within deadline.]

//?* 2) Graph Problems:
//? - Minimum Spanning Tree (MST) -> using{ Kruskal's / Prim's Algo} [simply means hame ek aisi tree select krni h, jisme minimum weight ho sake, and all vertices are connected.]

//? - Shortest Path [simply means hame ek aisi path select krni h, jisme minimum distance ho sake, and we have to reach from source to destination.]

//?* 3) Scheduling Problems:
//? - CPU Scheduling [simply means hame ek aisi scheduling select krni h, jisme maximum CPU utilization ho sake, and we have to schedule the processes in such a way that CPU is utilized efficiently.]

//* 4) Game/Puzzles and much more...


//! Greedy Problem Hints...
//* 1- Max or min Number of.......
//* 2- Min cost / Max profit/ Max utility /
//* 3- Min time / Max time / Min distance / Max distance
//* 4- Schedule /allocate / assign / select / choose / pick / find / cover / partition / divide efficiently
//* 5- Sort / Arrange / Order / Organize / Prioritize / Rank / Group / Cluster
//* 6- shortest / longest / smallest / largest / nearest / farthest (with constraints)
//* 7 - non - overlapping intervals [ex: Activity selection problem, where we have to select maximum number of activities that don't overlap with each other.]

//! Golden Rule - Greedy is a Algorithm not Data Structure, so we can use any data structure to implement greedy algorithm. like array, linked list, stack, queue, heap, priority queue, graph etc.
// Sometime greedy required - sorting then choosing
// sometime greedy required - choosing then sorting
// sometime greedy required - sorting then choosing then sorting
// sometime greedy required - combined of heap or priority queues
// sometime greedy required - combined of graph algorithms


//! Greedy Algorithm Template
//? 1- Sort the input data (if required)
//? 2- Initialize the result variable (if required)
//? 3- Iterate through the input data and make locally optimal choices
//? 4- Update the result variable (if required)
//? 5- Return the result variable (if required)
//? 6- Analyze the time and space complexity of the algorithm [mostly O(nlogn) for sorting, O(n) for iteration, O(1) for result variable, O(1) for return statement - so total time complexity is O(nlogn), O(1) for space complexity]
//? 7- Check if the greedy choice property and optimal substructure property holds for the problem [if yes, then greedy algorithm is applicable, otherwise not applicable]

//! Leetcode 1029 - Two City Scheduling
var twoCitySchedCost = function (costs) {
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
  // costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
  //o/p -    [−511, +394, +259, +45, +722, +108]

  let n = costs.length / 2;
  let totalCost = 0;

  for (let i = 0; i < costs.length; i++) {
    if (i < n) {
      // first n -> A [because we need n persons in a and n persons in b from total 2n]
      totalCost += costs[i][0];
    } else {
      // last n -> B
      totalCost += costs[i][1];
    }
  }
  return totalCost;
}
// let costs = [[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]];

//! Leetcode 455. Assign Cookies
// g = greed factor = children
// s = size = cookies

var findContentChildren = function (g, s) {
  let gSort = g.sort((a, b) => a - b);
  let sSort = s.sort((a, b) => a - b);
  let count = 0, j = 0, i = 0;
  // i → children pointer means inside greed
  // j → cookies pointer

  while (i < sSort.length && j < gSort.length) {
    if (sSort[j] >= gSort[i]) {
      //   cookie    child
      //   (size)    (greed)
      // child satisfied
      count++;
      i++; j++;
    } else {
      // cookies is small in size, try diff one
      j++;
    }
  }


  return count;
}

// other way to write
var findContentChildren = function (greed, sizee) {
  sizee.sort((a, b) => a - b);
  greed.sort((a, b) => a - b);

  let j = 0, i = 0;

  while (i < sizee.length) {
    if (sizee[i] >= greed[j]) {
      j++;
    }
    i++;
  }
  return j;
}

//! Leetcode 860. Lemonade Change
var lemonadeChange = function (bills) {
  let billsMap = new Map();

  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 5) {
      billsMap.set(bills[i], (billsMap.get(bills[i]) || 0) + 1);
    } else if (bills[i] === 10) {

      billsMap.set(bills[i], (billsMap.get(bills[i]) || 0) + 1);
      if (billsMap.get(5) > 0) billsMap.set(5, billsMap.get(5) - 1);
      else return false;

    } else {
      if (billsMap.get(10) >= 1 && billsMap.get(5) >= 1) {
        billsMap.set(10, billsMap.get(10) - 1);
        billsMap.set(5, billsMap.get(5) - 1);
      } else if (billsMap.get(5) >= 3) {
        billsMap.set(5, billsMap.get(5) - 3);
      } else {
        return false;
      }
    }
  }
  return true;
}

// smaller code
var lemonadeChange = function (bills) {
  let five = 0, ten = 0;
  for (let bill of bills) {
    if (bill === 5) five++;
    else if (bill === 10) {
      if (!five) return false;
      five--;
      ten++;
    } else {
      if (five && ten) { ten--; five--; }
      else if (five >= 3) five -= 3;
      else return false;
    }
  }
  return true;
}

//! Leetcode 122. Best Time to Buy and Sell Stock II
var maxProfit = function (prices) {
  let diff = 0;

  for (let i = 0; i <= prices.length; i++) {
    if (prices[i - 1] < prices[i])
      diff += prices[i] - prices[i - 1];
  }
  return diff;
}

//* ⭐ Interviews Favourite Topic - Interval Problems
// like - Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms, Minimum Number of Arrows to Burst Balloons, etc.

//! Leetcode 57. Insert Interval
/* 
intervals = [[1,3],[6,9]], newInterval = [2,5]
        1.........3.........6.............9
            2.............5

o/p -   1.................5................9  
o/p - [[1,5],[6,9]]
    
intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]

        1......2..3....5...6..7..8....10....12............16
                     4...........8  

o/p-    1...........2..............10.................16    
o/p-  [[1,2],[3,10],[12,16]]      
*/
var insert = function (arr, x) {
  let resultInterval = [];
  let i = 0, start = 0, end = 1;

  // we split into 3 cases -
  // 1) left side of non-overlapping intervals
  // 2) overlapping intervals
  // 3) right side of non-overlapping intervals

  // In the left side we check, how many intervals are there which end time is less than newInterval start time so we direct add into answer array and we use loop here 
  while (i < arr.length && arr[i][end] < x[start]) {
    resultInterval.push(arr[i]);
    i++;
  }

  // overlapping
  while (i < arr.length && arr[i][start] <= x[end]) {
    // newInterval start is whatever is min of start from interval or newInterval
    // newInterval end is whatever is max of end from interval or newInterval

    x[start] = Math.min(arr[i][start], x[start]);
    x[end] = Math.max(arr[i][end], x[end]);
    i++;
  }
  resultInterval.push(x);

  // same for right side, if start time of interval is > than end time of new Merge interval so we add rightside interval in answer
  while (i < arr.length) {
    resultInterval.push(arr[i]);
    i++;
  }
  return resultInterval;
}
// console.log(insert([[1, 3], [6, 9]], [2, 5])); // [[1,5],[6,9]]
// console.log(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])); // [[1,2],[3,10],[12,16]]



//! Leetcode 56. Merge Interval
var merge = function (intervals) {
  let result = [], start = 0, end = 1;

  intervals.sort((a, b) => a[0] - b[0]);

  // pushing first interval because in else case we push the other one, so we prevent loosing the first interval that's why we pushing it first and loop start from 1
  result.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    // last merged interval
    let last = result[result.length - 1];

    if (last[end] >= intervals[i][start]) {
      // overlap - last ka end update
      last[end] = Math.max(last[end], intervals[i][end]);
    } else {
      result.push(intervals[i]);
    }
  }

  return result;
}
/*
Sort: [[1,3],[2,6],[8,10],[15,18]]  (already sorted)

result = [[1,3]]   ← first push

i=1: last = [1,3], 3 >= 2 ✓
     last.end = max(3, 6) = 6
     result = [[1,6]]

i=2: last = [1,6], 6 >= 8? ❌
     result.push([8,10])
     result = [[1,6],[8,10]]

i=3: last = [8,10], 10 >= 15? ❌
     result.push([15,18])
     result = [[1,6],[8,10],[15,18]]
*/

// Other way
var merge = function (intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  let result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= result[result.length - 1][1]) {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}

//! Leetcode 763. Partition Labels
var partitionLabels = function (s) {
  // partition is depend on first and last occurance of the character 
  // find firstOcc and lastOcc of first character and mark that partition 1
  // same for rest of the character [this problem is same as above question]
  //?  Merge Interval such that partition are non-overlapping

  let ans = [];
  let firstOcc = new Array(26).fill(-1);
  let lastOcc = new Array(26).fill(-1);

  for (let i = 0; i < s.length; i++) {

    let curr = s.charCodeAt(i) - 97;
    if (firstOcc[curr] < 0) {
      firstOcc[curr] = i;
    }
    lastOcc[curr] = i;
  }


  let partitionStart = 0, partitionEnd = 0;

  for (let i = 0; i < s.length; i++) {
    let curr = s.charCodeAt(i) - 97;

    // if i cross the end means new partition start
    if (partitionEnd < firstOcc[curr]) {
      ans.push(partitionEnd - partitionStart + 1)
      partitionStart = i;
      partitionEnd = i;
    }

    partitionEnd = Math.max(partitionEnd, lastOcc[curr]);
  }

  // adding the last partition
  if (partitionEnd - partitionStart + 1 > 0) {
    ans.push(partitionEnd - partitionStart + 1)
  }

  return ans;
}
// console.log(partitionLabels("ababcbacadefegdehijhklij")); // [9,7,8]
// console.log(partitionLabels("eccbbbbdec")); // [10]

//! Leetcode 435. Non-overlapping Intervals
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0, start = 0, end = 1;
  let lastKeep = intervals[0];


  for (let i = 1; i < intervals.length; i++) {
    let curr = intervals[i];

    if (curr[start] < lastKeep[end]) {
      // overlap - remove item
      // we update lastKeep when we remove item
      count++;
      // removed item never be lastKeep and we only have to count
      continue;
    } else {
      lastKeep = curr;
    }
  }
  return count;
}

// Other way
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let k = -Infinity;

  for (let i = 0; i < intervals.length; i++) {
    // k = end of last non-overlapping interval
    if (intervals[i][0] < k) {
      count++;
    } else {
      k = intervals[i][1];
    }
  }
  return count;
}

// console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
// console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])); // 2
// console.log(eraseOverlapIntervals([[1, 11], [2, 12], [11, 22], [1, 100]])); // 2

//! Leetcode 621. Task Scheduler
///* Notes
/* 

## 🎯 Core Variables & Definitions
*   **`maxFreq`**: Sabse zyada baar aane wale task ki frequency (e.g., Task A 3 baar aaya, toh maxFreq = 3).
*   **`numMaxFreq`**: Aise tasks ki ginti jinki frequency `maxFreq` ke barabar hai (e.g., A=3, B=3 hain, toh numMaxFreq = 2).
*   **`n`**: Cooldown period (do same tasks ke beech mein kitne slots ka gap hona chahiye).
*   **`tasks.length`**: Total tasks ka count.

---

## 📊 Case Studies & Data Tables

### Table 1: General Cases
| Case                | maxFreq | n | numMaxFreq | Answer |
| :------------------ | :------ | :- | :--------- | :----- |
| A×3, B×3            | 3       | 0 | 2          | 6      |
| A×3, B×3            | 3       | 1 | 2          | 6      |
| A×3, B×3            | 3       | 2 | 2          | 8      |
| A×3, B×2            | 3       | 2 | 1          | 7      |
| A×3, B×1            | 3       | 2 | 1          | 7      |
| A×3 (only)          | 3       | 2 | 1          | 7      |
| A×4, B×4            | 4       | 2 | 2          | 11     |
| A×4, B×1            | 4       | 2 | 1          | 10     |
| A×4, B×2, C×2       | 4       | 2 | 1          | 10     |
| A×4, B×4, C×4       | 4       | 2 | 3          | 12     |
| A×3, B×3, C×3       | 3       | 2 | 3          | 9      |

### Table 2: Varying `n` (Constant `maxFreq` & `numMaxFreq`)
**For A×4, B×4 (maxFreq=4, numMaxFreq=2)**
| n | Answer | Change in Answer |
|---|---: |:-----------------|
| 0 | 8   | -                |
| 1 | 8   | +0               |
| 2 | 11  | +3               |
| 3 | 14  | +3               |

**For A×3, B×3 (maxFreq=3, numMaxFreq=2)**
| n | Answer | Change in Answer |
|---|---:|:-----------------|
| 0 | 6   | -                |
| 1 | 6   | +0               |
| 2 | 8   | +2               |
| 3 | 10  | +2               |

---

## 🔍 Findings & Coefficient Deductions

Aapne tables se following mathematical patterns nikale hain:

### Finding 1: Effect of `numMaxFreq`
*   **Observation**: Jab `numMaxFreq` 1 unit badhta hai, Answer 1 unit badhta hai.
*   **Example**: A×3, B×3 (numMaxFreq=2, Ans=8) vs A×3, B×2 (numMaxFreq=1, Ans=7).
*   **Conclusion**: `numMaxFreq` ka coefficient = **1**

### Finding 2: Effect of `n`
*   **Observation**: Jab `n` 1 unit badhta hai, Answer `(maxFreq - 1)` units badhta hai.
*   **Example**: 
    *   A×3, B×3: n 1→2 hua, answer +2 badha (kyunki maxFreq=3, 3-1=2).
    *   A×4, B×4: n 1→2 hua, answer +3 badha (kyunki maxFreq=4, 4-1=3).
*   **Conclusion**: `n` ka coefficient = **`maxFreq - 1`**

### Finding 3: Effect of `maxFreq` (when `n` is constant)
*   **Observation**: Jab `maxFreq` 1 unit badhta hai, Answer `(n + 1)` units badhta hai.
*   **Example**: A×3,B×3 (Ans=8) → A×4,B×4 (Ans=11) at n=2. Difference is +3 (kyunki n=2, n+1=3).
*   **Conclusion**: `maxFreq` ka coefficient = **`n + 1`**

---

## 🧮 Formula Construction (Deductions)

In findings ko combine karke ek formula banaya ja sakta hai:

1.  Max frequency wale tasks ke beech mein `(maxFreq - 1)` gaps hote hain.
2.  Har gap ka size `n` hota hai. 
3.  Toh total empty slots = `(maxFreq - 1) * n`.
4.  Total tasks jo max frequency par hain = `numMaxFreq`.
5.  Total tasks ki execution slots = (Total maxFreq tasks) + (Gaps) + (Remaining tasks in last block).

Mathematical derivation from coefficients:
*   Base block size = `maxFreq`
*   Multiply by `(n + 1)` (cooldown + the task itself)
*   Add `numMaxFreq` (last row of tasks)
*   **Derived Formula**: `(maxFreq - 1) * (n + 1) + numMaxFreq`

---

## ⚠️ Finding 4: The Edge Case (n=0 / Small n)
*   **Observation**: Agar hum formula use karein aur `n` bohot chhota ho (e.g., `n=0`), toh formula answer 6 se chhota de sakta hai. Par 6 tasks ko complete karne ke liye minimum 6 slots toh chahiye hi.
*   **Rule**: Answer hamesha total tasks se chhota nahi ho sakta.
*   **Final Logic**: `Answer = max(Formula_Result, tasks.length)`

---

### 🎯 Summary Formula:
Total Time = max( (maxFreq - 1) * (n + 1) + numMaxFreq, tasks.length )
--------------------------------------------------------

Maan lo aapke paas A, A, A (3 baar) aur B, B, B (3 baar) hain ,n = 2

///? Humne A _ _ wala kitne dabbe banaye? 
total 2 dabbe. (Kyunki total 3 A the, aakhri wale A ko chhod ke).
Formula mein isko likhenge: maxFreq - 1 (3 - 1 = 2)

///? Sirf Ek dabba A _ _ ka size kitna hai? 3 slots (1 A + 2 gaps).
Formula mein isko likhenge: n + 1 (2 + 1 = 3)
Toh in 2 dabbon ka total size hua: 2 × 3 = 6 slots.

///? AB bacha-  Aakhri line (Last Row) jodo
Ab humare paas bacha kya? Sirf aakhri wala A.
Par humare paas B bhi toh hai! B bhi 3 baar aata hai. Toh kya B aakhri wale A ke saath fit ho sakta hai?
Haan! Aakhri wala A + aakhri wala B, dono ek saath chal sakte hain: 👉 A B

Yeh aakhri line hai. Isme 2 tasks (A aur B) hain, to ham numMaxFreq [dono A aur B ki freq] ko add karenge. Toh final answer hua: 6 + 2 = 8

///* when n=0 to agar ham formulla lagaye to 
Ax3, Bx3, n=0
maxFreq = 3, numMaxFreq = 2, n=0
Formula = (3-1) * (0+1) + 2 = 2*1 + 2 = 4 but actual answer is 6, so we take max of formula and tasks.length
result =  (maxFreq - 1) * (n + 1) + numMaxFreq
Math.max(result, tasks.length)  // 6


| Case            | maxFreq | numMaxFreq | n | Formula result | tasks.length | Final | Expected |
|-----------------|---------|------------|---|----------------|--------------|-------|----------|
| A×3, B×3        | 3       | 2          | 0 | 4              | 6            | 6     | 6 ✅     |
| A×3, B×3        | 3       | 2          | 1 | 6              | 6            | 6     | 6 ✅     |
| A×3, B×3        | 3       | 2          | 2 | 8              | 6            | 8     | 8 ✅     |
| A×4, B×4        | 4       | 2          | 2 | 11             | 8            | 11    | 11 ✅    |
| A×4, B×4        | 4       | 2          | 3 | 14             | 8            | 14    | 14 ✅    |
| A×4, B×4, C×4   | 4       | 3          | 2 | 12             | 12           | 12    | 12 ✅    |
| A×3, B×3, C×3   | 3       | 3          | 2 | 9              | 9            | 9     | 9 ✅     |
| [A, B, C]       | 1       | 3          | 2 | 3              | 3            | 3     | 3 ✅     |
| [A, B]          | 1       | 2          | 2 | 2              | 2            | 2     | 2 ✅     |
*/

var leastInterval = function (tasks, n) {
  // step 1 - Count the frequency of each task
  // step 2 - find maxFreq and numMaxFreq
  // step 3 - apply the formula
  // step 4 - return the max of formula result and tasks.length

  let freqMap = new Map();
  for (let task of tasks) {
    freqMap.set(task, (freqMap.get(task) || 0) + 1);
  }

  let maxFreq = 0, numMaxFreq = 0;

  for (let freq of freqMap.values()) {
    if (freq > maxFreq) {
      maxFreq = freq;
      numMaxFreq = 1;
    } else if (freq === maxFreq) {
      numMaxFreq++;
    }
  }

  let Formula_Result = (maxFreq - 1) * (n + 1) + numMaxFreq;
  return Math.max(Formula_Result, tasks.length);
}

// Other way
var leastInterval = function (tasks, n) {
  let freq = new Array(26).fill(0);
  let maxFreq = 0, maxFreqCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    let curr = tasks[i].charCodeAt() - 65;
    freq[curr]++;
    maxFreq = Math.max(maxFreq, freq[curr]);
  }

  for (let i = 0; i < 26; i++) {
    if (freq[i] === maxFreq) maxFreqCount++;
  }

  // here n +1 is a given n means the cycle length and +1 is for the task itself and maxFreq - 1 is because we are counting the last task in maxFreqCount

  let formulla = (n + 1) * (maxFreq - 1) + maxFreqCount;
  return Math.max(formulla, tasks.length);
}

// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2)); // 8
// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 0)); // 6

//! Leetcode 134. Gas Station [MIMP - ⭐ Interview]
/* 

gas  = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]
diff = [-2, -2 , -2, 3 , 3]
aise diff s bhi check kr skte h - jahan s +ve mila waha s suru krege to 
phle empty tank - 0 ,and it  is circular path ok
0+3+3-2-2-2  = 0 and hmne index 3 s hi start kiya tha and ham wahi aa gaye
----------------------------------------
Rule:
Station i par gas[i] petrol milta hai.
Station i se next station jaane ke liye cost[i] petrol kharch hota hai.
Tank initially 0 hai.

Important:
Pehle current station ka gas add hoga,
fir next station jaane ka cost minus hoga.
Next station ka gas tab add hoga jab wahan pahunchenge.


Start index 0:
0 par khali tank ke saath pahunche, 1 petrol mila
tank = 0 + 1 = 1

1 se 2 jaane mein kharch 3 hua
tank = 1 - 3 = -2

tank negative ho gaya,
isliye index 0 se start karke circular trip complete nahi hogi.


Start index 1:
1 par khali tank ke saath pahunche, 2 petrol mila
tank = 0 + 2 = 2

2 se 3 jaane mein kharch 4 hua
tank = 2 - 4 = -2

tank negative ho gaya,
isliye index 1 se bhi circular trip complete nahi hogi.


Start index 2:
2 par khali tank ke saath pahunche, 3 petrol mila
tank = 0 + 3 = 3

3 se 4 jaane mein kharch 5 hua
tank = 3 - 5 = -2

tank negative ho gaya,
isliye index 2 se bhi circular trip complete nahi hogi.


Start index 3:
3 par khali tank ke saath pahunche, 4 petrol mila
tank = 0 + 4 = 4

4 se 0 jaane mein kharch 1 hua
tank = 4 - 1 = 3

0 par pahunch kar 5 petrol mila
tank = 3 + 5 = 8

0 se 1 jaane mein kharch 2 hua
tank = 8 - 2 = 6

1 par pahunch kar 2 petrol mila
tank = 6 + 2 = 8

1 se 2 jaane mein kharch 3 hua
tank = 8 - 3 = 5

2 par pahunch kar 3 petrol mila
tank = 5 + 3 = 8

2 se 3 jaane mein kharch 4 hua
tank = 8 - 4 = 4

3 par pahunch kar 4 petrol mila
tank = 4 + 4 = 8

Hum wapas station 3 par pahunch gaye.
Tank kabhi negative nahi hua.
Isliye index 3 se circular trip complete ho jayegi.


LeetCode expected output = 3.
Answer = 3 ✅
*/

/* 
Ek station se dusre station jaane ke liye:
fuel = gas[i] - cost[i]

Agar fuel positive hai => tank badhega
Agar fuel negative hai => tank ghat jayega
Agar tank negative ho gaya => trip fail
*/
/* 
Example:

gas  = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]

gas - cost:
[1-3, 2-4, 3-5, 4-1, 5-2]
[-2, -2, -2, 3, 3]

Agar kisi start se tank negative ho jaye,
to us start aur fail hone wale station ke beech
koi bhi station start nahi kar sakta.

Kyunki beech wale station ke paas
starting fuel kam hoga,
lekin same travel cost dena padega.

Isliye fail hone par next index ko start maan lo.

matlab - 

Simple samjho:

gas  = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]


Start 0:

0 par 1 petrol mila
tank = 1

1 se 2 jaane ka kharch 3
tank = 1 - 3 = -2

tank negative ho gaya
isliye start 0 fail


Ab start 1 karo:

1 par 2 petrol mila
tank = 2

2 se 3 jaane ka kharch 4
tank = 2 - 4 = -2

tank negative ho gaya
isliye start 1 bhi fail


Ab sawaal:

Start 1 ke paas station 0 ka fuel hai ya nahi?

Nahi.
Station 0 ka 1 petrol sirf start 0 ko milta hai.


To start 1 ka tank start 0 se kam hoga ya zyada?

Kam hoga.

Kyunki start 1 ko station 0 ka 1 petrol nahi mila,
lekin station 0 se aage jaane ka kharch bhi nahi diya.

Yaha dono ka net loss same hai:

start 0: 1 - 3 = -2
start 1: 2 - 4 = -2

Isliye dono station 2 tak same tank -2 par pahunchte hain.


Agar start 0 station 2 par -2 par fail hua,
to start 1 bhi station 2 par -2 par fail hoga.

Matlab start 1 se trip complete nahi hogi.


General rule:

Agar koi start station i par fail ho jaye,
to uske baad wala station bhi
usi jagah tak fail hoga.

Isliye greedy me tank negative hone par
start = i + 1 kar dete hain.

*/
var canCompleteCircuit = function (gas, cost) {
  let totalFuelBalance = 0;  // poori circular route ka total gas - cost
  let currentFuelTank = 0;   // current starting station se ab tak ka fuel balance
  let possibleStartStation = 0;  // abhi tak ka best starting station

  for (let currStation = 0; currStation < gas.length; currStation++) {
    const fuelGainedMinusTravelCost = gas[currStation] - cost[currStation];

    totalFuelBalance += fuelGainedMinusTravelCost;
    currentFuelTank += fuelGainedMinusTravelCost;

    if (currentFuelTank < 0) {
      possibleStartStation = currStation + 1;
      currentFuelTank = 0;
    }
  }

  return totalFuelBalance >= 0 ? possibleStartStation : -1;
}

//! Leetcode 1094. Car Pooling
var carPooling = function (trips, capacity) {
  let events = []; // station change

  for (let i = 0; i < trips.length; i++) {
    let [passenger, from, to] = trips[i];
    // firstly passenger come out of car so seat become empty then fill it
    // we dont have to count passenger , we have to count only seat availability , that's why we use +passenger and -passenger
    events.push([to, -passenger]);
    events.push([from, +passenger]);
  }
  // console.log(events);
  // event has only to and passenger
  // sort by station (whether from or to)"
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  // console.log(events);

  let running = 0; // running means current number of passengers in car

  for (let i = 0; i < events.length; i++) {
    running += events[i][1];
    if (running > capacity) return false;
  }
  return true;
}

// Other way to write it
var carPooling = function (trips, capacity) {
  // constraints is like
  // from and to is 0 to 1000 so we can use array of size 1001 to store the number of passengers at each station and it is one side which is east so thats good
  let locationArr = new Array(1001).fill(0);

  for (let i = 0; i < trips.length; i++) {
    let [passenger, from, to] = trips[i];

    locationArr[from] = locationArr[from] + passenger; // passengers get in
    locationArr[to] = locationArr[to] - passenger; // passengers get out
  }

  // now we check used capacity at each station
  let usedCapacity = 0;

  for (let i = 0; i < locationArr.length; i++) {
    usedCapacity += locationArr[i];
    if (usedCapacity > capacity) {
      return false;
    }
    return true;
  }
}

// console.log(carPooling([[2, 1, 5], [3, 3, 7]], 4)); // false
// console.log(carPooling([[2, 1, 5], [3, 3, 7]], 5)); // true
// console.log(carPooling([[2, 1, 5], [3, 5, 7]], 3)); // true


//! Leetcode 135. Candy
/*
Rule 1: Har bachche ko kam se kam 1 candy milegi. (0 nahi.)

Rule 2: Agar kisi bachche ki rating kisi neighbour se zyada hai, toh us
bachche ko us neighbour se zyada candies milni chahiye.

Pehle LeetCode ke given examples:

Example 1: ratings = [1, 0, 2]

Step 1: Sabko minimum 1 candy do.
Ratings: [1, 0, 2]
Candies: [1, 1, 1]

Step 2: Ab left-to-right check karo.
- index 0: left neighbour nahi hai, isliye candies[0] = 1.
  Candies: [1, 1, 1]
- index 1: rating 0, left rating 1 se chhoti hai, isliye change nahi.
  Candies: [1, 1, 1]
- index 2: rating 2, left rating 0 se badi hai, isliye
  candies[2] = candies[1] + 1 = 1 + 1 = 2.
  Candies: [1, 1, 2]

Step 3: Ab right-to-left check karo.
- index 2: right neighbour nahi hai, isliye change nahi.
  Candies: [1, 1, 2]
- index 1: rating 0, right rating 2 se chhoti hai, isliye change nahi.
  Candies: [1, 1, 2]
- index 0: rating 1, right rating 0 se badi hai, isliye
  candies[0] = max(candies[0], candies[1] + 1)
               = max(1, 1 + 1) = 2.
  Candies: [2, 1, 2]

Answer: 2 + 1 + 2 = 5

Example 2: ratings = [1, 2, 2]

Step 1: Initially sabko minimum 1 candy do.
Ratings: [1, 2, 2]
Candies: [1, 1, 1]

Step 2: Ab left-to-right check karo.
- index 0: left neighbour nahi hai, isliye candies[0] = 1.
  Candies: [1, 1, 1]
- index 1: rating 2, left rating 1 se badi hai, isliye
  candies[1] = candies[0] + 1 = 1 + 1 = 2.
  Candies: [1, 2, 1]
- index 2: rating 2, left rating 2 ke equal hai. Equal rating par extra
  candy nahi milti, isliye candies[2] = 1.
  Candies: [1, 2, 1]

Step 3: Ab right-to-left check karo.
- index 2: right neighbour nahi hai, isliye change nahi.
  Candies: [1, 2, 1]
- index 1: rating 2, right rating 2 ke equal hai. Equal rating par
  extra candy nahi milti, isliye change nahi.
  Candies: [1, 2, 1]
- index 0: rating 1, right rating 2 se chhoti hai, isliye change nahi.
  Final candies: [1, 2, 1]

Answer: 1 + 2 + 1 = 4

Ab samjho ki dono passes kyun zaroori hain:

Example 3: Sirf left-to-right kaafi hai
ratings = [1, 2, 3, 4, 5]

Step 1: Initially sabko minimum 1 candy do.
Ratings: [1, 2, 3, 4, 5]
Candies: [1, 1, 1, 1, 1]

Step 2: Ab left-to-right check karo.
- index 0: left neighbour nahi hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 1: 2 > 1, candies[1] = candies[0] + 1 = 1 + 1 = 2
  [1, 2, 1, 1, 1]
- index 2: 3 > 2, candies[2] = candies[1] + 1 = 2 + 1 = 3
  [1, 2, 3, 1, 1]
- index 3: 4 > 3, candies[3] = candies[2] + 1 = 3 + 1 = 4
  [1, 2, 3, 4, 1]
- index 4: 5 > 4, candies[4] = candies[3] + 1 = 4 + 1 = 5
  [1, 2, 3, 4, 5]

Step 3: Ab right-to-left check karo.
- index 4: right neighbour nahi hai, isliye change nahi.
  Candies: [1, 2, 3, 4, 5]
- index 3: rating 4, right rating 5 se chhoti hai, isliye change nahi.
  Candies: [1, 2, 3, 4, 5]
- index 2: rating 3, right rating 4 se chhoti hai, isliye change nahi.
  Candies: [1, 2, 3, 4, 5]
- index 1: rating 2, right rating 3 se chhoti hai, isliye change nahi.
  Candies: [1, 2, 3, 4, 5]
- index 0: rating 1, right rating 2 se chhoti hai, isliye change nahi.
  Final candies: [1, 2, 3, 4, 5]

Yahan right-to-left pass se kuch change nahi hua, kyunki har rating apne
right neighbour se chhoti hai.
Answer: 1 + 2 + 3 + 4 + 5 = 15

Example 4: Sirf right-to-left kaafi hai
ratings = [5, 4, 3, 2, 1]

Step 1: Initially sabko minimum 1 candy do.
Ratings: [5, 4, 3, 2, 1]
Candies: [1, 1, 1, 1, 1]

Step 2: Ab left-to-right check karo.
- index 0: left neighbour nahi hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 1: rating 4, left rating 5 se chhoti hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 2: rating 3, left rating 4 se chhoti hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 3: rating 2, left rating 3 se chhoti hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 4: rating 1, left rating 2 se chhoti hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]

Step 3: Ab right-to-left check karo.
- index 4: right neighbour nahi hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 3: 2 > 1, candies[3] = candies[4] + 1 = 1 + 1 = 2
  [1, 1, 1, 2, 1]
- index 2: 3 > 2, candies[2] = candies[3] + 1 = 2 + 1 = 3
  [1, 1, 3, 2, 1]
- index 1: 4 > 3, candies[1] = candies[2] + 1 = 3 + 1 = 4
  [1, 4, 3, 2, 1]
- index 0: 5 > 4, candies[0] = candies[1] + 1 = 4 + 1 = 5
  [5, 4, 3, 2, 1]

Answer: 5 + 4 + 3 + 2 + 1 = 15

Example 5: Dono passes zaroori hain
ratings = [1, 2, 3, 1, 0]

Step 1: Initially sabko minimum 1 candy do.
Ratings: [1, 2, 3, 1, 0]
Candies: [1, 1, 1, 1, 1]

Step 2: Ab left-to-right check karo.
- index 0: left neighbour nahi hai, isliye change nahi.
  Candies: [1, 1, 1, 1, 1]
- index 1: rating 2, left rating 1 se badi hai, isliye
  candies[1] = candies[0] + 1 = 1 + 1 = 2.
  Candies: [1, 2, 1, 1, 1]
- index 2: rating 3, left rating 2 se badi hai, isliye
  candies[2] = candies[1] + 1 = 2 + 1 = 3.
  Candies: [1, 2, 3, 1, 1]
- index 3: rating 1, left rating 3 se chhoti hai, isliye change nahi.
  Candies: [1, 2, 3, 1, 1]
- index 4: rating 0, left rating 1 se chhoti hai, isliye change nahi.
  Candies: [1, 2, 3, 1, 1]

Step 3: Ab right-to-left check karo.
- index 4: right neighbour nahi hai, isliye change nahi.
  Candies: [1, 2, 3, 1, 1]
- index 3: rating 1, right rating 0 se badi hai, isliye
  candies[3] = max(candies[3], candies[4] + 1)
               = max(1, 1 + 1) = 2.
  [1, 2, 3, 2, 1]
- index 2: rating 3, right rating 1 se badi hai, isliye
  candies[2] = max(candies[2], candies[3] + 1)
               = max(3, 2 + 1) = 3.
  [1, 2, 3, 2, 1]
- index 1: rating 2, right rating 3 se chhoti hai, isliye change nahi.
  Candies: [1, 2, 3, 2, 1]
- index 0: rating 1, right rating 2 se chhoti hai, isliye change nahi.
  Final candies: [1, 2, 3, 2, 1]

Final answer: [1, 2, 3, 2, 1]
Total = 1 + 2 + 3 + 2 + 1 = 9

`+1` kyun lagate hain?

Rule ke hisaab se higher-rated child ko neighbour se strictly zyada candies milni chahiye. Agar neighbour ko 1 candy mili hai, toh current child ko kam se kam 2 candies chahiye, isliye `neighbour candies + 1` karte hain.

Example:
ratings  = [1, 2]
candies  = [1, 1]

Rating 2, rating 1 se zyada hai, isliye:
candies[1] = candies[0] + 1 = 1 + 1 = 2
Final candies = [1, 2]

Agar sirf `candies[i] = candies[i - 1]` karte, toh dono ko 1 candy milti,
jo rule todta hai. Isliye `+1` neighbour se ek candy zyada dene ke liye hai.

`Math.max` isliye use karte hain kyunki left-to-right pass ki value ko
right-to-left pass me unnecessarily chhota nahi karna hai. Dono passes me
jo stronger requirement ho, woh value retain karni hai:

candies[i] = Math.max(current candies[i], neighbour candies[i + 1] + 1)
*/

var candy = function (ratings) {
  let candies = new Array(ratings.length).fill(1);

  // we need to think about two pass - left to right, and right to left and for that two passes we need two loop

  // left to right
  for (let i = 0; i < ratings.length; i++) {
    let left = i - 1;
    if (left >= 0 && ratings[i] > ratings[left]) {
      candies[i] = Math.max(candies[i], candies[left] + 1);
    }
  }

  // right to left
  // for right to left reverse we use reverse loop, and we need to check i+1 so we start from n-1, till 0 so '>='
  for (let i = ratings.length - 1; i >= 0; i--) {
    let right = i + 1;
    if (right < ratings.length && ratings[i] > ratings[right]) {
      candies[i] = Math.max(candies[i], candies[right] + 1);
    }
  }

  return candies.reduce((total, candyCount) => total + candyCount, 0);
}; // TC - O(n), SC - O(n)

// Educator code
var candy = function (ratings) {
  let n = ratings.length;

  /*
///*  separate passes:
for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      leftToRight[i] = leftToRight[i - 1] + 1;
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      rightToLeft[i] = rightToLeft[i + 1] + 1;
    }
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += Math.max(leftToRight[i], rightToLeft[i]);
  }
  return ans;
*/

  let leftToRight = new Array(n).fill(1);
  let rightToLeft = new Array(n).fill(1);

  // Ek hi loop me left-to-right aur right-to-left dono directions process karo.
  for (let i = 0; i < n; i++) {
    // Left-to-right: i ke left neighbour se compare karo.
    if (i > 0 && ratings[i] > ratings[i - 1]) {
      leftToRight[i] = leftToRight[i - 1] + 1;
    }

    // Right-to-left: i ke corresponding right-side index se compare karo.
    let rightIndex = n - 2 - i;
    if (
      rightIndex >= 0 &&
      ratings[rightIndex] > ratings[rightIndex + 1]
    ) {
      rightToLeft[rightIndex] = rightToLeft[rightIndex + 1] + 1;
    }
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += Math.max(leftToRight[i], rightToLeft[i]);
  }
  return ans;
} // TC - O(n), SC - O(n)

//! TC - O(n) but now SC - O(1)
// for O(1) space, we can use only one array and calculate the right-to-left pass on the fly while calculating the answer.
var candy = function (arr) {
  let i = 1, n = arr.length, ans = n;

  while (i < n) {

    if (arr[i] === arr[i - 1]) { ++i; continue; }

    let up = 0;
    while (i < n && arr[i] > arr[i - 1]) {
      ++up;
      ans += up;
      i++;
    }

    let down = 0;
    while (i < n && arr[i] < arr[i - 1]) {
      ++down;
      ans += down;
      ++i;
    }

    // removing lesser value on peeks
    ans = ans - Math.min(up, down);
  }
  return ans;
}
// console.log(candy([1, 0, 2])); // 5
// console.log(candy([1, 2, 2])); // 4
// console.log(candy([1, 3, 2, 2, 1])); // 7


//! Leetcode 452. Minimum Number of Arrows to Burst Balloons
/* 
Input: points = [[10,16],[2,8],[1,6],[7,12]] Output - 2

x:     1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
       |--------------|
          |-----------------|
                         |---------------|
                                  |------------------|
*/
/* 
Ye LC 435 (non-overlapping intervals) se ULTA hai:

LC 435: touching intervals ko non-overlapping maana jaata tha ([1,2] aur [2,3] — alag)

LC 452: touching intervals overlap maana jaata hai (ek arrow dono phatа sakta hai)

Ye difference critical hai — dono problems ka solution similar dikhega par decision ulta hoga.

LC 435 mein maximum non-overlapping intervals dhoondh rahe the — yahan minimum overlapping cove
*/
/* 
Counterexample: [[1,10],[2,3],[4,5],[6,7]]
sort by start - [[1,10],[2,3],[4,5],[6,7]] → arrow at 10 bursts only [1,10]; phir [2,3], [4,5], [6,7] ke liye alag → 4 arrows

sort by end - [[2,3],[4,5],[6,7],[1,10]] → arrow at 3 bursts [2,3] + [1,10]; arrow at 5 bursts [4,5]; arrow at 7 bursts [6,7] → 3 arrows ✅
*/
/* 
Counterexample jahan pairwise fail hota hai
[[1,3],[2,5],[4,10]] — sorted by end already.

Tumhara pairwise approach:

[1,3] → pehla arrow, count = 1, arrow position = 3 (kyunki ye pehle interval ka end hai)

[2,5] vs [1,3]: 2 <= 3 → overlap → skip. ✓ (arrow at 3 bursts [2,5], 2≤3≤5)

[4,10] vs [2,5] (prev): 4 <= 5 → overlap → skip. ❌ GALAT!

Par arrow at 3 bursts [4,10]? 4 ≤ 3? NAHI! [4,10] ko alag arrow chahiye.

Pairwise output: 1 arrow (galat)
Correct output: 2 arrows (arrow at 3 for [1,3]+[2,5]; arrow at 4/10 for [4,10])

Kyun fail hua — root cause
[2,5] skip hua, par uska end (5) arrow position (3) se bada hai. Tum [4,10] ko [2,5] se compare kar rahe ho (4 <= 5 → overlap lagta hai), par actual arrow at 3 hai, [4,10] usse burst nahi hota.

Matlab: tum prev interval ke end se compare kar rahe ho — par prev skip ho chuka ho sakta hai, aur uska end actual arrow position se bada ho sakta hai. Compare kis se karna hai, wo confuse ho raha hai.
*/
var findMinArrowShots = function (points) {
  // sort by end
  points.sort((a, b) => a[1] - b[1]);

  let start = 0, end = 1;
  let lastArrowPosition = points[0][1]; // end of first interval
  let arrowCount = 1; // its start from 1 because our lastArrowPosition showing we burst one ballon [Pehla arrow already shoot ho chuka hai ]

  // overlap 
  for (let curr = 1; curr < points.length; curr++) {
    if (points[curr][start] > lastArrowPosition) {
      // current interval lastArrow se aage h to new arrow chahiye
      arrowCount++;
      // updating lastArrowPosition
      lastArrowPosition = points[curr][end];
    }
    // else: last arrow ne already burst kr diya to skip
  }
  return arrowCount;
}

//! Leetcode 406. Queue Reconstruction by Height
var reconstructQueue = function (people) { }

//! Leetcode 846. Hand of Straights
var isNStraightHand = function (hand, groupSize) { }