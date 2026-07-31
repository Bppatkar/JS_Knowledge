//! Advanced Sliding window pattern
//* Algorithm Derivation

/*
let left =0, right = 0, map= {}, maxLength = 0;
intitialize pointer and map
↓
expand right pointer and map and increase the frequency of the character in the map
↓
while window invalid
    decrease frequency
    remove if frequency is 0
    move left pointer
↓
update maxLength
↓
move right pointer and return answer
*/

//* Pseudocode
/*
left = 0, maxLength = 0, map = {}
for every right
      currentChar = s[right]
      increase frequency of currentChar in map
      while window invalid
            decrease frequency of s[left] in map
            if frequency of s[left] is 0
                  remove s[left] from map
            move left pointer
      update maxLength
return maxLength
*/

//! Longest Substring with at most K distinct [diff diff] characters
function longestSubstringKDistinct(s, k) {
  let left = 0, right = 0, maxLength = 0, map = {};
  while (right < s.length) {
    map[s[right]] = (map[s[right]] || 0) + 1;
    // when we use Object.keys(map).length , Time complexity is O(26 * n) for lowercase english letters
    while (Object.keys(map).length > k) {
      map[s[left]]--;
      if (map[s[left]] === 0) delete map[s[left]];
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
}
//* TC - O(n) - right move onces till end and left move at most n times, and O(1) for map operations since we have only 26 lowercase english letters so total time complexity is O(n)+O(1) = O(n)
//* SC - O(1) - map will have at most 26 lowercase english letters so space complexity is O(1) */

// console.log("longestSubstringKDistinct", longestSubstringKDistinct("eceba", 2)); // 3
// console.log("longestSubstringKDistinct", longestSubstringKDistinct("aa", 1)); // 2

//---------------------------------------------

//! Leetcode 76. Minimum Window Substring
/* 
//* The Complete Algorithm - 
Create needMap ,Create windowMap, matched = 0 ,left = 0, bestWindow = Infinity

For every Right
1. Add current character into windowMap
2. If current character exists in needMap
   AND
   window frequency == need frequency
   matched++
3. While window is valid
      Update minimum answer
      Remove left character
      If removing breaks a requirement
            matched--
      left++
4. Move right
Finished.
Return answer.
*/
//! MIMP  - 
/* 
remember one sentence. We never compare two HashMaps.
We maintain a small variable (matched) that tells us whether all requirements are currently satisfied.
*/

function minWindow(s, t) {
  if (s.length < t.length) return "";
  let needMap = {}, windowMap = {};
  for (let ch of t) {
    needMap[ch] = (needMap[ch] || 0) + 1;
  }
  let left = 0, minLength = Infinity, matched = 0, startIndex = 0;
  let required = Object.keys(needMap).length;

  for (let right = 0; right < s.length; right++) {
    let ch = s[right];
    windowMap[ch] = (windowMap[ch] || 0) + 1;
    if (needMap[ch] !== undefined && needMap[ch] === windowMap[ch]) {
      matched++;
    }
    while (matched === required) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        startIndex = left;
      }
      let leftChar = s[left];
      windowMap[leftChar]--;
      if (needMap[leftChar] !== undefined && windowMap[leftChar] < needMap[leftChar]) {
        matched--;
      }
      left++;
    }
  }
  return minLength === Infinity ? "" : s.substring(startIndex, startIndex + minLength)
}

// console.log("minWindow", minWindow("ADOBECODEBANC", "ABC")); // BANC
// console.log("minWindow", minWindow("a", "a")); // a
// console.log("minWindow", minWindow("a", "aa")); // ""

// ---------------------------------------------

//! Leetcode 713 Subarray Product Less Than K
// nums = [10,5,2,6] , k = 100 , output - 8
// [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]

//* Psuedo Code
/* 
initialize value and we want count not frequency so we use obj
For every Right
1. Add current character into windowMap
     current window all character product < k
    if yes return count
*/

function numSubarrayProductLessThanK(nums, k) {
  let left = 0, right = 0, count = 0, product = 1;
  while (right < nums.length) {
    product *= nums[right]
    while (product >= k) {
      if (k <= 1) return 0
      product /= nums[left]
      left++;
    }
    count += right - left + 1;
    right++;

  }
  return count;
}
console.log("numSubarrayProductLessThanK", numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // 8
// console.log("numSubarrayProductLessThanK", numSubarrayProductLessThanK([1, 2, 3], 0)); // 0
// console.log("numSubarrayProductLessThanK", numSubarrayProductLessThanK([1, 2, 3], 1)); // 0