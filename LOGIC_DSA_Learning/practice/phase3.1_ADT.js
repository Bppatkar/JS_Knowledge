//! Leetcode 20. Valid Parentheses
var isValid = function (s) {
  let stack = [];
  let map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    if (map[current]) stack.push(current);
    else {
      let top = stack[stack.length - 1];
      if (stack.length === 0) return false;
      else if (map[top] === current) stack.pop();
      else return false;
    }
  }
  return stack.length === 0;
}
// console.log(isValid("()")); // true
// console.log(isValid("()[]{}")); // true
// console.log(isValid("(]")); // false

//! Leetcode 155. Min Stack

var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function (value) {
  this.stack.push(value);
  if (this.minStack.length === 0) this.minStack.push(value);
  else if (value < this.minStack[this.minStack.length - 1]) this.minStack.push(value);
  else this.minStack.push(this.minStack[this.minStack.length - 1]);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};
// --------------------------------------
///! with single stack

var MinStack = function () {
  this.stack = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function (value) {
  if (this.stack.length === 0)
    this.stack.push([value, value]);
  else {
    let minVal = Math.min(value, this.stack[this.stack.length - 1][1]);
    this.stack.push([value, minVal]);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1][0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.stack[this.stack.length - 1][1];
};
/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// const minStack = new MinStack();
// console.log(minStack.push(-2));
// console.log(minStack.push(0));
// console.log(minStack.push(-3));
// console.log(minStack.getMin()); // return -3
// console.log(minStack.pop());
// console.log(minStack.top());    // return 0
// console.log(minStack.getMin()); // return -2

//! Leetcode 150. Evaluate Reverse Polish Notation
/* 
my thinking in steps
1- create stack and set for operators set = {"+", "-", "*", "/"}
 2- agar token mein operator hai to calculation perform result firse store in stack
 3 - agar operator nahi hai to means operand hai to string se number mein change krege and 
 4 - last 2 value pop krege and operator ke according calculation perform krege and result ko stack mein push krege
 5- last mein stack mein jo value bachi hai wahi answer hoga
*/


var evalRPN = function (tokens) {
  let operators = new Set(["+", "-", "*", "/"]), stack = [], result;
  for (let i = 0; i < tokens.length; i++) {
    if (operators.has(tokens[i])) {
      let val1 = stack.pop();
      let val2 = stack.pop();
      if (tokens[i] === "+")
        result = val2 + val1;
      else if (tokens[i] === "-")
        result = val2 - val1;
      else if (tokens[i] === "*")
        result = val2 * val1;
      else
        result = Math.trunc(val2 / val1);
      stack.push(result);
    } else stack.push(Number(tokens[i]));
  }
  return stack[stack.length - 1];
}
// --------------------------------------------------------
//! using MAP
var evalRPN = function (tokens) {
  let stack = [], map = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  }

  for (let i = 0; i < tokens.length; i++) {
    if (map[tokens[i]]) {
      let b = stack.pop();
      let a = stack.pop();
      let result = map[tokens[i]](a, b);
      stack.push(result);
    } else stack.push(Number(tokens[i]))
  }
  return stack[0];
}

// console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9
// console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6
// console.log(evalRPN(["10", "6", "9", "3", "/", "-", "*"])); // 30
// console.log(evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])); // 22

//! Leetcode 682. Baseball Game
var calPoints = function (ops) {
  let stack = [], map = {
    "C": () => stack.pop(),
    "D": () => stack.push(stack[stack.length - 1] * 2),
    "+": () => stack.push(stack[stack.length - 1] + stack[stack.length - 2]),
  }

  for (let i = 0; i < ops.length; i++) {
    if (map[ops[i]]) {
      map[ops[i]]();
    } else {
      stack.push(Number(ops[i]));
    }
  }
  let result = 0;
  for (let i = 0; i < stack.length; i++) {
    result += stack[i];
  }
  return result;
}
// console.log(calPoints(["5", "2", "C", "D", "+"])); // 30
// console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"])); // 27
// console.log(calPoints(["1", "C"])); // 0


//! Leetcode 496. Next Greater Element I
/* 
///* Brute Force Thinking
nums1[i] = 4

→ nums2 mein 4 find karo
→ 4 ke right side dekho
→ pehli greater value mile → answer
→ nahi mile → -1
///? problem - Brute force mein hum nums1 ke har element ko separately solve kar rahe hain. and yes worst case mein nums1 ke har elem ke liye nums2 ke sare right side ko scan krna hi padega wo v bar bar So brute force roughly: O(nums1 × nums2)
*/

///* Stack Approch -"Kyun na nums2 ko ek hi baar scan karte hue sabke answers nikal dein?"
/* 
Example: nums2 = [1, 3, 4, 2]
Hum left → right chal rahe hain.
Step 1 - 1 mila.  Hume nahi pata 1 ke right mein greater kaun hai.
➡️ 1 ko yaad rakh lo.

Step 2 - 3 mila.
3 > 1
➡️ 1 ka answer = 3
➡️ 1 ka kaam khatam.

Lekin 3 ka answer? ❓ Abhi nahi pata. ➡️ 3 ko yaad rakh lo.

Step 3 - 4 mila.
4 > 3
➡️ 3 ka answer = 4 Ab 4 ka answer?  ❓ Abhi nahi pata.
➡️ 4 ko yaad rakh lo.

Main point - Ek time par multiple values ka answer pending ho sakta hai.
For example: [1, 3]
Dono ka answer future mein mil sakta hai. 
Aur jab 4 aaya: 4 > 3 ✅ → 3 solve
 4 > 1 bhi hai, but 1 ka answer pehle hi 3 mil chuka tha.
Ab sirf ye batao: Jab 1 aur 3 dono ka answer pending ho:
[1, 3] aur 4 aaye,
sabse pehle kis ka answer milega — 1 ka ya 3 ka?

Obviously 3 ka - Bas yahi Stack ki entry point hai.Hmne ek important cheez already discover kar li:

1 aur 3 dono future answer ka wait kar rahe the. 
4 aaya → sabse recently encountered pending value 3 ka answer pehle mila. Ye LIFO hai.
Agar hum pending values ko ek jagah rakh rahe hain, aur latest pending value ko sabse pehle check karna hai, toh kaunsa data structure naturally fit hota hai?
answer - Stack
-------------------------------------------
Simple: nums2 = [1, 3, 4, 2]
Hum left → right jayenge. 1 mila
Abhi iska greater nahi mila. ➡️ Stack mein 1 daal do.
stack = [1]

3 mila Ab check: 3 > stack ka TOP (1) ✅
Toh: 1 ka answer = 3 , 1 ko stack se hata do
stack = []

Ab 3 khud future ke greater ka wait karega. ➡️ 3 ko stack mein daal do.

stack = [3]

🔥 Bas rule ban raha hai

Current number > Stack TOP

→ TOP ka answer mil gaya
→ POP
→ answer store

Aur current number ko future ke liye PUSH karna hai.
--------------------------------------------------
Pehle nums2 se ek mapping banayenge
Example: nums2 = [5, 2, 1]

Process karne ke baad:
5 → -1
2 → -1
1 → -1
Toh internally hume kuch aisa information mil gaya:
5: -1
2: -1
1: -1

Stack ka kaam: nums2 scan karte waqt pending elements ke answers find karna.  Map ka kaam: har number ka final answer yaad rakhna.

Phir nums1 aayega Suppose: nums1 = [2, 5]
Ab bas:  2 → map mein dekho → -1
5 → map mein dekho → -1
Answer: [-1, -1]

Important separation 🧠 Phase 1: nums2 process - Har number ka Next Greater Element find karo.
Phase 2: nums1 process - nums1 ke numbers ke corresponding answers map se nikaal lo.


TC: O(n + m) where n = nums2.length, m = nums1.length → overall O(n + m) = O(n)
SC: O(n)
*/

var nextGreaterElement = function (nums1, nums2) {
  let stack = [], map = {}, result = [];
  for (let i = 0; i < nums2.length; i++) {
    let current = nums2[i];
    while (stack.length > 0 && current > stack[stack.length - 1]) {
      let popped = stack.pop();
      map[popped] = current;
    }
    stack.push(current);
  }

  for (let j = 0; j < nums1.length; j++) {
    if (map[nums1[j]] !== undefined) result.push(map[nums1[j]])
    else result.push(-1);
  }
  return result;
}
// console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1,3,-1]
// console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); // [3,-1]
// console.log(nextGreaterElement([1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7])); // [7,7,7,7,7]

//! Leetcode 503. Next Greater Element II
///*  Hint 1: Traverse 2 baar (2n iterations)
var nextGreaterElements = function (nums) {
  let n = nums.length;
  let stack = [], result = new Array(n).fill(-1);

  for (let i = 0; i < n * 2; i++) {  // n*2 for circular repetetaion
    let curr = nums[i % n]; // for  repetetion
    while (stack.length > 0 && nums[stack[stack.length - 1]] < curr) {
      let popped = stack.pop();
      result[popped] = curr;
    }
    if (i < n) stack.push(i % n);
  }
  return result;
}
// console.log(nextGreaterElements([1, 2, 1])); // [2,-1,2]
// console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2,3,4,-1,4]

//! Leetcode 739. Daily Temperatures
var dailyTemperatures = function (temp) {
  let n = temp.length;
  let answer = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (temp[j] > temp[i]) { answer[i] = j - i; break; }
    }
  }

  return answer;
} // TC - O(n^2) SC - O(n)

/* 
Worst case mein agar temperatures decreasing hain: [80,79,78,77,76,...]
Har element ke liye kya hoga? Kya har element ko almost poora remaining array scan karna padega? Is brute force ki TC kya hogi?
---------------------------------------------
Humara problem hai:

[73, 74, 75, 71, 69, 72]

Hum left → right ja rahe hain. Jab 72 par aaye:

73  74  75  71  69  72
             ↑   ↑   ↑
            wait wait current

71 aur 69 ko abhi tak warmer temperature nahi mila. Ab 72 aaya:

69 ke liye → 72 warmer hai → answer 1
71 ke liye → 72 warmer hai → answer 1
75 ke liye → 72 warmer nahi hai → woh abhi wait karega
Ab important point
 
Humein previous unresolved days ko store karna hai. Aur jab naya temperature aaye, sabse pehle recent unresolved day ko 
check karna natural hai:

69 ← sabse recent
71
75 ← purana

Agar 72 > 69: 69 → solve
Phir: 72 > 71
71 → solve
Lekin 72 > 75 false, toh stop. 

So question: Jo element last mein  store hua, wahi pehle bahar/process hona chahiye.
Ye: LIFO hai ya FIFO?  - ans is LIFO - because most recent ya fir last mein store hua wo LIFO

73 → stack = [73]
74 → 74 > 73 → 73 solve → stack = [74]
75 → 75 > 74 → 74 solve → stack = [75]
71 → stack = [75,71]
69 → stack = [75,71,69]
72 → 
      72 > 69 → solve
      72 > 71 → solve
      72 > 75 → false → stop
*/

//* Optimized Approach - Stack
var dailyTemperatures = function (temp) {
  let ans = new Array(temp.length).fill(0), stack = [];

  for (let i = 0; i < temp.length; i++) {
    let curr = temp[i];
    while (stack.length > 0 && curr > temp[stack[stack.length - 1]]) {
      let popped = stack.pop();
      ans[popped] = i - popped;
    }
    stack.push(i);
  }
  return ans;
}

// console.log(dailyTemperatures([30, 60, 90])); // [1,1,0]
// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
// console.log(dailyTemperatures([30, 40, 50, 60])); // [1,1,1,0]

//! Leetcodde 901. Online Stock Span

var StockSpanner = function () {
  this.stack = [];
};

/** 
 * @param {number} price
 * @return {number}
*/
StockSpanner.prototype.next = function (price) {
  let span = 1;
  while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) { // we are comparing value
    let popped = this.stack.pop();
    span += popped[1];    // adding popped element span value in span
  }
  this.stack.push([price, span]); // we are adding value and span in stack
  return span;
};

/** 
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

const stockSpanner = new StockSpanner();
// console.log(stockSpanner.next(100));
// console.log(stockSpanner.next(80));
// console.log(stockSpanner.next(60));
// console.log(stockSpanner.next(70));
// console.log(stockSpanner.next(60));
// console.log(stockSpanner.next(75));
// console.log(stockSpanner.next(85));

//! Leetcode 84. Largest Rectangle in Histogram
/* 
Brute Force Approach [Thinking]

bar i = rectangle ki height
↓
left mein expand
↓
right mein expand
↓
jahan height < heights[i], stop
↓
width calculate
↓
area calculate
*/
var largestRectangleArea = function (heights) {
  let n = heights.length, maxArea = 0;
  for (let i = 0; i < n; i++) {
    let height = heights[i], width = 1;
    // we can expand left and right so we move firstly left and then right
    for (let j = i - 1; j >= 0; j--) {
      if (heights[j] >= height) width++;
      else break;
    }
    // moving right
    for (let j = i + 1; j < n; j++) {
      if (heights[j] >= height) width++;
      else break;
    }
    // now we have height and width so we can calculate area
    let area = height * width;
    maxArea = Math.max(maxArea, area);
  }
  return maxArea;
} // TC- O(n^2) SC - O(1)

//* Optimized Approach - Stack
// In Brute Force we are scanning heights array again and again for each element to find left and right boundary that why its TC is O(n^2). 
//? Question -  Har bar ke liye mujhe actually kaunsi information chahiye, jisse mujhe left aur right dono taraf scan na karna pade? 
/* 
Brute force mein hum dhoondh rahe the:

Isliye brute force ka actual kaam

Har i ke liye:

height = heights[i]


← left scan
   jab tak heights[j] >= height


→ right scan
   jab tak heights[j] >= height


width
↓
area
------------------------------------------
Aur conceptually hum boundary dhoondh rahe hain:
Nearest Smaller on Left
+
Nearest Smaller on Right
*/
/* 
Example: [2, 1, 5, 6, 2, 3]
Jab hum 5 dekhte hain: 5 → abhi iska right smaller nahi mila , To 5 ko yaad rakhna padega.

Phir 6: 6 → iska bhi right smaller nahi mila
To: pending: 
5
6

Ab 2 aaya: 2 < 6 , To 6 ka right boundary mil gaya.
Aur: 2 < 5, To 5 ka bhi right boundary mil gaya.

Yahi main reason hai Stack ki need ka.
--------------------------------
Lekin Stack hi kyun? - Kyuki pending bars mein humein most recently encountered unresolved bar ko pehle resolve karna padta hai.

Dekho:
5
6

2 aaya.

Pehle kaun resolve hoga? 6  ← latest / top
Uske baad: 5

Ye exactly: Last In → First Out
yaani LIFO.
*/
// Instead we can use stack to find left and right boundary for each element in one pass. we are using stack to store the index of the elements in increasing order. when we find an element which is smaller than the top of the stack, we pop the stack and calculate the area for the popped element. we repeat this process until the stack is empty or the current element is greater than the top of the stack. finally we return the max area.

var largestRectangleArea = function (heights) {
  let n = heights.length, maxArea = 0, stack = [];

  for (let i = 0; i < n; i++) {
    // taking first elem to check if its smaller than top of stack or not
    let curr = heights[i];
    while (stack.length > 0 && curr < heights[stack[stack.length - 1]]) {
      // if current element is smaller than top of stack, we pop the stack and calculate the area for the popped element
      let popped = stack.pop();
      let height = heights[popped];

      let rightBoundary = i;
      let leftBoundary = stack.length > 0 ? stack[stack.length - 1] : -1;
      let width = rightBoundary - leftBoundary - 1;

      let area = height * width;
      maxArea = Math.max(maxArea, area);
    }
    stack.push(i);
  }

  // process remaining bars
  while (stack.length > 0) {
    let popped = stack.pop();
    let height = heights[popped];

    let rightBoundary = n; // last boundary because array ka end bhi boundary h
    let leftBoundary = stack.length > 0 ? stack[stack.length - 1] : -1;
    let width = rightBoundary - leftBoundary - 1;

    let area = height * width;
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}
// TC: O(n) — each index stack mein ek baar push aur maximum ek baar pop hota hai.
// SC: O(n) — stack.

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 0
