//! Section 3 Hashing Pattern Family

//! Leetcode 242 Valid Anagram
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  let sMap = new Map(), tMap = new Map();

  for (let i = 0; i < s.length; i++) {
    if (!sMap.has(s[i])) sMap.set(s[i], 1);
    else sMap.set(s[i], sMap.get(s[i]) + 1);

    if (!tMap.has(t[i])) tMap.set(t[i], 1);
    else tMap.set(t[i], tMap.get(t[i]) + 1);
  }

  for (let [key, value] of sMap) {
    if (sMap.get(key) !== tMap.get(key)) return false;
  }
  return true;
}
//* Optimized Solution - create single map and increment for s and decrement for t

function isAnagramOptimized(s, t) {
  if (s.length !== t.length) return false;

  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], 1)
    else map.set(s[i], map.get(s[i]) + 1)
  }
  for (let i = 0; i < t.length; i++) {
    // console.log("has function key exist - true/false", map.has(t[i])); //true
    // console.log("get value", map.get(t[i])); // 1
    if (!map.has(t[i]) || map.get(t[i]) === 0) return false;
    else map.set(t[i], map.get(t[i]) - 1);
  }

  return true;
}

// console.log(isAnagramOptimized("anagram", "nagaram")); // true
// console.log(isAnagram("rat", "car")); // false

//! Leetcode 169. Majority Element
function majorityElement(nums) { }
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2

