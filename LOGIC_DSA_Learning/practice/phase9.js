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
console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([1, 2, 3, 4, 5]));