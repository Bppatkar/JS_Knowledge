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
var calPoints = function (ops) { }
console.log(calPoints(["5", "2", "C", "D", "+"])); // 30
console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"])); // 27
console.log(calPoints(["1", "C"])); // 0
