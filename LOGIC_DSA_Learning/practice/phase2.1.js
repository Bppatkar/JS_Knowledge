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
// console.log(isIsomorphic("egg", "add")); // true
// console.log(isIsomorphic("foo", "bar")); // false
// console.log(isIsomorphic("ab", "aa")) // false;


///! Prefix Sum + Hashing
/*
///* Pattern 6 — Prefix Hash ka COMPLETE Mental Model

Sabse pehle ek distinction:  Prefix Sum kya hai?
Prefix Sum = starting se current index tak ka running sum.

nums = [3, 2, -2, 5]

index:       0   1   2   3
nums:       [3,  2, -2,  5]

prefix:      3   5    3   8

Matlab:

prefix[0] = 3
prefix[1] = 3 + 2 = 5
prefix[2] = 3 + 2 - 2 = 3
prefix[3] = 3 + 2 - 2 + 5 = 8

Ab important observation:

prefix[0] = 3
prefix[2] = 3

Same prefix dobara aa gaya. Toh:

prefix[2] - prefix[0]
= 3 - 3
= 0

Therefore: nums[1...2] = [2, -2] , sum = 0
🔥 Prefix Hash actually karta kya hai?  Prefix Sum khud sirf ek running sum hai.

HashMap us prefix sum ki past information remember karta hai.

Prefix Sum
     ↓
HashMap
     ↓
"Ye prefix pehle kab/kis form mein mila tha?"

Isliye:  Prefix Sum + HashMap = past prefix information ko quickly lookup karna.

///! Ab sabse important part - Question ke according Map mein kya store karna hai?

Tumhara statement:  "kabhi index, kabhi frequency, ya information"
100% correct.

Actually 3 common cases yaad rakho:

///! 🟢 Case 1 — Existence / Zero Sum

Question:  Kya koi subarray ka sum 0 hai?
Humein kya chahiye?  Kya same prefix pehle aa chuka hai?
So:
Map:
prefix → earliest index

Example:

3 → 0
5 → 1

Agar 3 dobara mila: 3 → already exists toh beech ka sum 0.

Skeleton
let prefix = 0;
let map = new Map();

map.set(0, -1);

for (let i = 0; i < nums.length; i++) {

    prefix += nums[i];

    if (map.has(prefix)) {
        return true;
    }

    map.set(prefix, i);
}

return false;


///! 🟡 Case 2 — Target Sum

Question: Kya koi subarray ka sum k hai?

Ab: currentPrefix - previousPrefix = k
Rearrange: previousPrefix = currentPrefix - k
Toh Map mein hum search karenge: currentPrefix - k

Skeleton

function hasKSumSubarray(nums, k) {
  let currentPrefix = 0;
  let map = new Map();

  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    currentPrefix += nums[i];

    let requiredPrefix = currentPrefix - k;

    if (map.has(requiredPrefix)) {
      return true;
    }

    map.set(currentPrefix, i);
  }

  return false;
}


///! 🔴 Case 3 — Target Sum ka COUNT [Ye LeetCode #560 wala tha.]

Question: Kitne subarrays ka sum k hai?
Ab difference ye hai: Pehle hum pooch rahe the: "required prefix exist karta hai?"
Ab pooch rahe hain: "required prefix kitni baar pehle aaya?"

Therefore:
Map: prefix → frequency

Skeleton

{let prefix = 0;
let count = 0;

let map = new Map();
map.set(0, 1);

for (let i = 0; i < nums.length; i++) {

    prefix += nums[i];

    let requiredPrefix = prefix - k;

    if (map.has(requiredPrefix)) {
        count += map.get(requiredPrefix);
    }

    map.set(
        prefix,
        (map.get(prefix) || 0) + 1
    );
}

return count;
}

Ye wahi logic hai jo tumne LC #560 mein submit kiya.

///? 🧠 Ab teenon ko ek table mein dekho
Question	                    Map mein kya?	            Lookup
Zero-sum exists?	            prefix → index	          prefix
Sum k exists?	                prefix → index	          prefix - k
Sum k kitne hain?	prefix →    frequency	                prefix - k
Bas ye table Pattern 6 ka 80/20 core hai.

*/
// ---------------------------------------
//! Prefix Hash
/*
Original: nums:

index →    0    1    2    3    4
           ↓    ↓    ↓    ↓    ↓
nums   =  [3,   2,  -2,  -3,   5]

prefix:
index →     0    1    2    3    4
            ↓    ↓    ↓    ↓    ↓
prefix =   [3,   5,   3,   0,   5]

Dono arrays ke index same hain, lekin prefix ka number original nums ka element nahi hai.

2. Tumhara pehla example
prefix[0] = 3
prefix[2] = 3

Matlab:

prefix index 0
        ↓
       [3]

prefix index 2
        ↓
       [3]

Ab humein in dono prefix positions ke beech ka nums portion chahiye.

Important rule:

prefix[i] == prefix[j]

        ↓

nums[i + 1 ... j]

Yaani: nums[0 + 1 ... 2] = nums[1...2] = [2, -2]
Isliye: 2 + (-2) = 0

🔥 Tumhara question: "last wala point tak lena hai?"
YES. Exactly.

Tumne jo bola:  "2 tak lena hai last wale point tak" ✅ Haan.

Prefix ke second/repeated index j ko include karte hue, nums mein:

i + 1 → j

tak lena hai.

So:

prefix[0] = 3
prefix[2] = 3

        ↓

nums[1...2]

3. Ab second example
prefix[1] = 5
prefix[4] = 5

Yahan: i = 1, j = 4

Rule:  nums[i + 1 ... j]

Therefore: nums[2...4]
And: nums[2...4] = [-2, -3, 5]
Sum: -2 + (-3) + 5 = 0
So tumhara observation: - "yaha bhi last wala hi lekar chalna hai"
------------------------------------------------
//* isko ek permanent formula bana lo

Jab: prefix[i] === prefix[j]
toh zero-sum subarray: nums[i + 1 ... j]
Example
prefix[0] === prefix[2]
↓
nums[1...2]

Example
prefix[1] === prefix[4]
↓
nums[2...4]

///? Why i + 1?
Ye sabse important part hai. prefix[i] already nums[i] tak ka total contain karta hai.

For example:
prefix[1] = nums[0] + nums[1]
    = 3 + 2 = 5

Agar: prefix[4] = 5
toh:  prefix[4] - prefix[1]
= 5 - 5 = 0

prefix[1] mein nums[1] already included hai, Isliye humein nums[1] dobara nahi lena. Hum next element se start karte hain: nums[2]

Hence:  nums[2...4]
----------------------------------
🧩 Ek visual yaad rakho
nums:     [ 3    2   -2   -3    5 ]

index       0    1    2    3    4
            ↓    ↓    ↓    ↓    ↓
          [ 3    2   -2   -3    5 ]

prefix:   [ 3    5    3    0    5 ]

index       0    1    2    3    4
            ↓         ↓
            3         3
            ↑         ↑
          same      same

                 ↓

          nums[1 ... 2]
             [2, -2]

And:

prefix:   [ 3    5    3    0    5 ]

index       0    1    2    3    4
                 ↓              ↓
                 5              5
                 ↑              ↑
               same           same

                 ↓

          nums[2 ... 4]
             [-2,-3,5]

///! Formula - prefix[i] === prefix[j] hone par nums mein zero-sum subarray [i+1 ... j] hota hai, kyunki prefix[i] mein nums[i] tak ka sum already included hota hai. Isliye humein uske baad wale elements, yani i+1 se j tak lene hain.
///? to mapping me kya store karna hai?
Mapping me prefix sum ko key ke roop me store karenge aur us ka index value ke roop me store karenge. Agar same prefix sum dobara milta hai, toh iska matlab hai ki unke beech ka subarray ka sum zero hai.

Example: prefix = 5 Index = 1
Map mein store : 5 → 1

Baad mein jab:
current prefix = 5
current index = 4 mile, toh:

Map.has(5)
      ↓
   YES
      ↓
previous index = 1
      ↓
current index = 4
      ↓
zero-sum range = [1 + 1 ... 4]
      ↓
[2 ... 4]

///? Next Powerfull Message - prefix[j] - prefix[i] = target;
Agar humein target sum wala subarray chahiye, toh humein current prefix se ek specific previous prefix dhoondhna padega.

Example:

nums = [3, 2, -2, 4] , target = 4
Yahan hum gradually derive karenge ki:

currentPrefix - previousPrefix = target

Aur HashMap exactly wahi previous prefix quickly find karega.
------------------------------------------------
🎯 Next mini-problem
Given: nums = [3, 2, -2, 4] , target = 4
Prefix sums: 3, 5, 3, 7

///! Question: - Agar current prefix sum 7 hai aur humein subarray sum 4 chahiye, toh 7 mein se kaunsa previous prefix sum subtract hona chahiye?

Ab actual array dekho nums = [3, 2, -2, 4]

index:   0   1   2   3
         ↓   ↓   ↓   ↓
        [3,  2, -2,  4]

prefix:  3   5   3   7
         ↑       ↑       ↑

Current: prefix[3] = 7 , Previous 3 mila: prefix[2] = 3
So: 7 - 3 = 4  Aur actual nums range:
nums[2 + 1 ... 3] = nums[3...3] = [4]
Sum: 4  🔥 Target mil gaya.
*/

//! Prefix Hash Main Power
/* 
///* Prefix Hash = "Prefix sums ko HashMap mein store karke quickly check karna ki required previous prefix sum pehle aaya tha ya nahi."

Ab tak humne do cases dekhe:

///* Case 1 — Same prefix

prefix[j] - prefix[i] = 0
because:  prefix[j] === prefix[i] , → zero-sum subarray.

///* Case 2 — Target prefix difference
prefix[j] - prefix[i] = target
because: → target-sum subarray.

///? Aur HashMap ka kaam: 

Previous Prefix Sum
        ↓
       Map
        ↓
Fast lookup

Yahi Prefix Hash ka main power hai.
------------------------------------------------
///! 1️⃣ Sabse pehle: Prefix Hash ka purpose
Tum already Prefix Sum padh chuke ho.  Prefix Sum ka basic kaam: Repeated range-sum calculation ko fast banana.

Example: nums = [3, 2, -2, 4] 
Prefix: 3, 5, 3, 7

Prefix Sum mein hum calculated information ko store karte hain taaki baad mein reuse kar saken. 

Ab Hashing add karne ka reason: Prefix sums ko HashMap mein store karke quickly check karna ki required previous prefix sum pehle aaya tha ya nahi.

Yahi Prefix + HashMap = Prefix Hash hai.

///! 2️⃣ Humein kya recognize karna hai?

Jab problem bole: 
subarray
+
sum
+
target

especially:  "Find/count a contiguous subarray whose sum is K."
contiguous = continuously connected / beech mein gap nahi.
Tab tumhare dimaag mein ye possibility aani chahiye:

Subarray Sum
      ↓
Prefix Sum?
      ↓
Need previous prefix quickly?
      ↓
HashMap
      ↓
Prefix Hash

///! 3️⃣ Core mathematical idea
Ye Pattern 6 ka heart hai:

Suppose:

prefix[j] = current prefix
prefix[i] = previous prefix

Subarray: nums[i+1 ... j]  ka sum: prefix[j] - prefix[i]
Agar humein target K chahiye: prefix[j] - prefix[i] = K

Toh rearrange: prefix[i] = prefix[j] - K

🔥 Bas yahi equation Prefix Hash ka engine hai.
Current prefix pata hai. Target pata hai. Toh:

required previous prefix = current prefix - target
Phir HashMap mein check: Kya required prefix pehle aaya tha?
Agar haan → target-sum subarray exist karta hai.

///! 4️⃣ HashMap actually kya store karega?

Ye bhi Pattern ka important part hai. Generally:
Prefix Sum → Information
Aur problem ke according information change ho sakti hai.
For example:

Existence / range identify karni ho: prefix → index

Example: 
5 → 1
3 → 2

Count karna ho: prefix → frequency
Example:
5 → 3
matlab prefix sum 5 teen baar aa chuka hai.
Yahi reason hai ki Prefix Hash ek reusable pattern hai, sirf ek formula nahi.

///! 5️⃣ Running Prefix Storage

Running = chalte-chalte maintain karna.
Hum poora prefix array banana zaroori nahi samajhte.
Instead: 
currentPrefix = 0

array traverse karo

currentPrefix += nums[i]

Map mein currentPrefix ki information store karo

So memory mein conceptually:

Current element
      ↓
Current Prefix Sum
      ↓
HashMap
      ↓
Previous Prefix Information

///! 6️⃣ Prefix Lookup

Lookup = jaldi se check karna / dhoondhna.

Ye Pattern ka actual Hashing benefit hai.

Without HashMap:

required prefix
      ↓
poore previous prefixes check karo
      ↓
O(n)

Har index par karoge toh potentially:

O(n²)

HashMap ke saath:

required prefix
      ↓
Map.has(requiredPrefix)
      ↓
average O(1)

Overall:

O(n)

Yahi memory for speed trade-off hai:  Extra memory use karo, repeated searching ko fast karo.

///! 7️⃣ Ek complete example
nums = [3, 2, -2, 4] , K = 4

Traverse: index 0 , prefix = 3
Required previous prefix: 3 - 4 = -1 , Map mein -1? No
Store: 3 → 0 ,index 1 , prefix = 5
Required: 5 - 4 = 1
Map mein 1? No, 
Store:

5 → 1
index 2
prefix = 3

Required: 3 - 4 = -1 No.

Same prefix 3 already hai, iska alag meaning bhi hai: prefix[0] === prefix[2]

Therefore: nums[1...2] = [2,-2], sum 0.

index 3
prefix = 7

Required: 7 - 4 = 3 , Map mein: 3 → 0 ✅ Mil gaya.

Therefore: nums[0+1 ... 3] nums[1...3] [2, -2, 4]
Sum: 2 + (-2) + 4 = 4 🎯 Target mil gaya.
*/