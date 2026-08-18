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
s
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

