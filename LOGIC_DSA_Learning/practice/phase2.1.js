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
function majorityElement(nums) {
  //! solving using map
  let map = new Map();
  let n = nums.length;
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], 1)
    else map.set(nums[i], map.get(nums[i]) + 1)
  }
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i]) > n / 2) return nums[i];
  }
} // TC - O(n) and SC - O(n)

/* 
[2, 2, 1, 1, 1, 2, 2]

candidate = 2
count = 1

2 → same       → count 2
1 → different  → count 1
1 → different  → count 0

1 → count 0
     ↓
new candidate = 1
count = 1

1 → same       → count 2
2 → different  → count 1
2 → different  → count 0

But wait—this dry run starting at the wrong points can make it look confusing. The cleaner formulation is:

if count === 0:
    candidate = nums[i]

if nums[i] === candidate:
    count++
else:
    count--

Run it from left to right.
*/
function majorityElement(nums) {
  //! solving withou map - [Boyer-Moore Voting Algorithm]
  let count = 0, candidate;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) candidate = nums[i];
    if (nums[i] === candidate) count++;
    else count--;
  }
  return candidate;
} // TC - O(n) and SC - O(1)

/* 
HashMap
↓
more memory
↓
frequency information available

Boyer-Moore
↓
constant memory
↓
uses mathematical majority property
*/
// console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
// console.log(majorityElement([3, 2, 3])); // 3


//! Leetcode 347. Top K Frequent Elements
function topKFrequent(nums, k) {
  let ans = [], map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], 1);
    else map.set(nums[i], map.get(nums[i]) + 1);
  }
  map = [...map].sort((a, b) => b[1] - a[1]);
  // a and b are array and we want to subtract the frequemcy a = [1, 3] b = [2, 2] not the array
  for (let i = 0; i < k; i++) {
    ans.push(map[i][0]); // sorted map has key and values and we need key in ans array
    // map[i]      →[number, frequency]
    // map[i][0]   → number / key
    // map[i][1]   → frequency / value
  }
  return ans
}
// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]
// console.log(topKFrequent([-1, -1], 1)); // [-1]

/*
Frequency counting  → O(n)
Map → Array         → O(m)
Sorting              → O(m log m)
Taking k             → O(k)

Therefore: TC = O(n + m log m)
Worst case m = n: TC = O(n log n)
Space: SC = O(m)
where m = number of distinct elements.
*/

//! Leetcode 217. Contains Duplicate
function containsDuplicate(nums) {
  let set = new Set();
  for (let num of nums) {
    if (set.has(num)) return true;
    set.add(num)
  }
  return false;
}
function containsDuplicatewithMap(nums) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], 1);
    else return true;
  }
  return false;
}
function containsDuplicate(nums) {
  let set = new Set(nums);
  return set.size != nums.length;
}

//! Leetcode 202. Happy Number
var isHappy = function (n) {
  let set = new Set();
  while (n !== 1) {
    if (set.has(n)) return false;
    set.add(n);

    let sum = 0, current = n;
    while (current > 0) {
      let lastDigit = current % 10;
      sum += lastDigit * lastDigit
      current = Math.floor(current / 10);
    }
    n = sum;
  }
  return true;
}
// console.log(isHappy(19)); // true
// console.log(isHappy(2)); // false

//! Leetcode 128. Longest Consecutive Sequence
/* 
1. Create Set
2. Put all nums into Set
3. For every num:
4. Check whether (num - 1) exists
5. If (num - 1) DOES exist
      → num is NOT a starting point
      → skip it
6. If (num - 1) DOES NOT exist
      → num IS a starting point
7. Starting from num:
      check num + 1
      check num + 2
      check num + 3
      ...
      maintain count
8. Maintain maximum count
9. Return maximum count
*/
var longestConsecutive = function (nums) {
  let set = new Set(), maxCount = 0;

  for (let num of nums) {
    set.add(num);
  }

  // now loop run on set with selective numbers
  for (let num of set) {
    if (set.has(num - 1)) continue;

    let count = 1;
    let current = num;

    while (set.has(current + 1)) {
      current++;
      count++;
    }
    maxCount = Math.max(count, maxCount);
  }
  return maxCount;
};

/*
Build Set              → O(n)
Traverse unique Set    → O(n)
Sequence expansion     → O(n) average

Total                  → O(n) average
Space                  → O(n)
*/
// console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
// console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
// console.log(longestConsecutive([1, 0, 1, 2])) // 3
// console.log(longestConsecutive([0])) // 1

//! Leetcode 1512 Number of Good Pairs
// algorithm
/* 
1. Create a map to store the frequency of each number
2. For each number in the array:
   a. If the number is not in the map, add it with frequency 1
   b. If the number is in the map, increment its frequency and add the current frequency to the count
3. Return the count
*/
function numIdenticalPairs(nums) {
  let map = new Map(), count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], 1);
    else {
      count += map.get(nums[i]);
      map.set(nums[i], map.get(nums[i]) + 1);
    }
  }
  return count;
}
// Optimized Solution
function numIdenticalPairs(nums) {
  let map = new Map(), count = 0;
  for (let i = 0; i < nums.length; i++) {
    count += map.get(nums[i]) || 0;
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
  }
  return count;
}

// console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3])); // 4

//! Leetcode 49. Group Anagrams
function groupAnagrams(strs) {
  let map = new Map();
  for (let str of strs) {
    let sorted = str.split("").sort().join("");
    if (!map.has(sorted)) map.set(sorted, [str]);
    else map.get(sorted).push(str);

  }
  return Array.from(map.values());
}
// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["bat"],["nat","tan"],["ate","eat","tea"]]

//! Leetcode 1. Two Sum
/* 
needed = target - current
if needed exists in Map
    return stored index + current index
otherwise
    store current → current index
*/
function twoSum(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let needed = target - nums[i];
    if (map.has(needed)) return [map.get(needed), i];
    map.set(nums[i], i);
  }
}
// console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
// console.log(twoSum([3, 2, 4], 6)); // [1,2]
// console.log(twoSum([3, 3], 6)); // [0,1]

//! Leetcode 205. Isomorphic Strings
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  let sMap = new Map(), tMap = new Map();
  for (let i = 0; i < s.length; i++) {
    // if (!sMap.has(s[i])) sMap.set(s[i], t[i]);
    // if (!tMap.has(t[i])) tMap.set(t[i], s[i]);
    // if (sMap.get(s[i]) === t[i] && tMap.get(t[i]) === s[i]) continue;
    // else return false;
    if (sMap.has(s[i]) && sMap.get(s[i]) !== t[i]) return false;
    if (tMap.has(t[i]) && tMap.get(t[i]) !== s[i]) return false;
    sMap.set(s[i], t[i]);
    tMap.set(t[i], s[i])
  }
  return true;
}
console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false
console.log(isIsomorphic("ab", "aa")) // false;
