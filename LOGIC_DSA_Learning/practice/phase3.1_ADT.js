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
console.log(nextGreaterElements([1, 2, 1])); // [2,-1,2]
console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2,3,4,-1,4]