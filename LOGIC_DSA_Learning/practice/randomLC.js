//? Leetcode 387. First Unique Character in a String

var firstUniqChar = function (s) {
  if (s.length === 0) return -1;
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], 1);
    else map.set(s[i], map.get(s[i]) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) return i;
  }
  return -1;
};

//? i want to do it in one traversal

function firstUniqChar(s) {
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], 1);
    else map.set(s[i], map.get(s[i]) + 1);
  }
  return s.split("").findIndex(ch => map.get(ch) === 1);
}
// console.log(firstUniqChar("leetcode")); // Output: 0
// console.log(firstUniqChar("loveleetcode")); // Output: 2`