//! Leetcode 5. Longest Palindromic Substring
///? Brtue Force Solution
var longestPalindrome = function (s) {
  let longest = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let subStr = s.substring(i, j + 1);
      if (palindromeCheck(subStr) && subStr.length > longest.length) longest = subStr;
    }
  }
  return longest;
};
function palindromeCheck(str) {
  if (str.length === 1) return true;
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] != str[right]) return false;
    left++; right--;
  }
  return true;
}

/* 
   
///! Time Limit Exceeded (TLE) aa raha hai! 🕐 Matlab tumhara logic sahi hai but too slow for large inputs.

🐢 KYUN TLE AA RAHA HAI?
Tumhara solution O(n³) hai:

Outer loop: O(n)
Inner loop: O(n)
palindromeCheck: O(n) for each substring
Total: O(n³)
*/

///? Optimise Solution
/* 
Important observation: Palindrome ka center

Palindrome:  "bab"
visualize:
b a b
↑   ↑
same

Center: b [a] b

Agar center se bahar ki taraf expand karein:

    a
   / \
  b   b

Compare:

left = center - 1
right = center + 1

Agar same: expand Again: left-- , right++

///? Even palindrome bhi hota hai

Example: "abba"

Iska ek single center character nahi hai.

Center actually:

ab | ba
   ↑

So center do characters ke beech hai. 
Expansion:

a b | b a
  ↑   ↑
  same

Then:

a | b b | a
↑           ↑
same

///? So humein 2 types of centers consider karne hain: 
Odd length
"aba"
center = b

Even length
"abba"
center = between b and b
-----------------------------------------
Instead of:

Every substring
↓
Check palindrome

we can think:

Every possible center
↓
Expand outward
↓
Stop when characters differ
↓
Keep longest
--------------------------------
///! str=  "aba" 

odd hai, center ke liye left = 1, right = 1

Correct.

a b a
  ↑
center
left = 1
right = 1

Compare:

s[1] === s[1]

Then:

left--
right++

becomes:

left = 0
right = 2

Compare:

s[0] === s[2]
a === a ✅

Then:

left = -1
right = 3

Now boundary ke bahar → stop.

Last valid range:

0 → 2

So:

"aba"
-----------------------------------------
///! str = "abba"

Ye even-length palindrome hai.

a b b a
  ↑ ↑
 center

There is no single center character.

Center is between index 1 and 2.

So:

left = 1
right = 2

Compare:

s[1] === s[2]


b === b ✅

Then:

left = 0
right = 3

Compare:

s[0] === s[3]


a === a ✅

Then:

left = -1
right = 4

Stop.

Last valid range:

0 → 3

Result:

"abba"
--------------------------------
brute force mein TC ≈ O(n³) thi, or isme ham Hum: O(n) possible centers process karte hain. Aur har center se maximum: O(n) expansion ho sakti hai. therefore TC- O(n^2)

Actually centers 
total: Odd centers: n
Even centers: n - 1

So total: 2n - 1 centers.
But Big-O mein: O(2n - 1) = O(n)
Therefore: O(n) × O(n) = O(n²)

Number of centers: O(n)
Expansion per center: O(n)
Therefore: O(n²)
And: n <= 1000 So: O(n²)
-----------------------------------------
Example — Odd
"babad"

center = 2
left/right:
2,2  → b == b
1,3  → a == a
0,4  → b != d ❌

Mismatch ke baad: left = 0 ,right = 4 [4 exclusive hota hai]
Last valid range: 1 → 3 
So: s.substring(left + 1, right) = s.substring(1, 4) = "aba"
------------------------------------------
Example — Even
"abba"

left = 1 , right = 2
1,2 → b == b
0,3 → a == a
-1,4 → boundary ❌

Again: s.substring(left + 1, right) = s.substring(0, 4) = "abba"
///* Expansion loop ke baad: s.substring(left + 1, right)
Odd ho ya even — same rule.
-------------------------------------------
///* if (s.length % 2 !== 0)
poori string ki length odd/even check kar raha hai. Ye required nahi hai. Palindrome ka center string ki overall length se decide nahi hota. 
Humein har index ko odd center banana hai:

i = 0
i = 1
i = 2
...
i = n-1

And har adjacent pair ko even center: (i, i+1)
So: For every i: 
///* Odd: (i, i)
///* even: (i, i+1)
*/
var longestPalindrome = function (s) {
  if (s.length === 0) return "";
  let longest = "";

  for (let i = 0; i < s.length; i++) {
    let oddPalindrome = expand(s, i, i);
    let evenPalindrome = expand(s, i, i + 1);

    // choosing the biggest one and math.max not work in string ok, it work in number
    let current = oddPalindrome.length > evenPalindrome.length ? oddPalindrome : evenPalindrome;
    if (longest.length < current.length) longest = current;
  }
  return longest
}

function expand(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--; right++;
  }
  return s.substring(left + 1, right);
}

// console.log(longestPalindrome("aba"));
// console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
// console.log(longestPalindrome("cbbd")); // Output: "bb"

//! Leetcode 151. Reverse Words in a String
// var reverseWords = function (s) {
//   let ans = [];
//   let words = s.trim().split(/\s+/);  // \s+ use karo multiple spaces handle karne ke liye
//   for (let i = words.length - 1; i >= 0; i--) {
//     if (words[i].length > 0) ans.push(words[i]);
//   }
//   return ans.join(' ')
// };

var reverseWords = function (s) {
  s = s.trim();
  let words = s.split(/\s+/);
  let left = 0, right = words.length - 1;

  while (left < right) {
    let temp = words[left];
    words[left] = words[right];
    words[right] = temp;
    left++;
    right--;
  }
  return words.join(' ');
}

// console.log(reverseWords("the sky is blue")); // Output: "blue is sky the"
// console.log(reverseWords("  hello world  ")); // Output: "world hello"
// console.log(reverseWords("a good   example")); // Output: "example good a"


//! Leetcode 567. Permutation in String
//? String + Fixed Sliding Window
/* 
We don't need to generate permutations. Instead:

Permutation
↓
Same character frequencies
↓
Frequency comparison
↓
Fixed-size window
*/

function checkInclusion(s1, s2) {
  let needMap = new Map(), windowMap = new Map();
  for (let ch of s1) {
    needMap.set(ch, (needMap.get(ch) || 0) + 1);
  }
  let required = needMap.size;
  let left = 0, matched = 0;

  for (let right = 0; right < s2.length; right++) {
    let char = s2[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (windowMap.get(char) === needMap.get(char)) matched++;

    if (right - left + 1 > s1.length) {
      let leftChar = s2[left];
      if (windowMap.get(leftChar) === needMap.get(leftChar)) matched--;

      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      left++;
    }

    if (matched === required) return true
  }
  return false;
}
// console.log(checkInclusion("ab", "eidbaooo")); // Output: true
// console.log(checkInclusion("ab", "eidboaoo")); // Output: false
// console.log(checkInclusion("adc", "dcda")); // Output: true
//*--------------------------------------------
/* 
LC 567 "Does ANY permutation exist?"
Answer: true / false

LC 438 "Find ALL windows that are permutations."
Answer: indices

///! So algorithmic structure almost same hai:
Frequency Map
+
Fixed Sliding Window
+
Incremental Window Update

Difference = result handling.

LC 567: valid window
            ↓ 
         return true

LC 438: valid window
          ↓
       push left index
          ↓
       continue searching

///! LC 567 mein tumne: if (matched === required) return true; kiya.
LC 438 mein ye nahi karna. Instead:

matched === required
↓
result.push(left)
↓
window continue
*/
//*--------------------------------------------

//! Leetcode 438. Find All Anagrams in a String
var findAnagrams = function (s, p) {
  let windowMap = new Map(), needMap = new Map(), ans = [];

  for (let ch of p) {
    needMap.set(ch, (needMap.get(ch) || 0) + 1);
  }

  let required = needMap.size;
  let left = 0, matched = 0;

  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (windowMap.get(char) === needMap.get(char)) matched++;

    if (right - left + 1 > p.length) {
      let leftChar = s[left];
      if (windowMap.get(leftChar) === needMap.get(leftChar)) matched--;
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      left++;
    }

    if (matched === required) ans.push(left);
  }
  return ans;
}

// console.log(findAnagrams("cbaebabacd", "abc")); // Output: [0, 6]
// console.log(findAnagrams("abab", "ab")); // Output: [0, 1, 2]
// console.log(findAnagrams("af", "be")); // Output: []

//! Leetcode 459. Repeated Substring Pattern
//* brute force
var repeatedSubstringPattern = function (s) {
  /* 
  Substring ki length kitni ho sakti hai?

  Hint: Minimum: 1 (ek character)
  Maximum: n/2 (kyunki at least 2 baar repeat hona chahiye)
  Example: "abab" n=4 → substring length 1 ya 2 ho sakti hai, isiliye 1 start kiya
  */

  let n = s.length;
  for (let length = 1; length <= n / 2; length++) {
    if (n % length === 0) {
      let subStr = s.substring(0, length);
      let repeatCount = n / length;
      let repeated = subStr.repeat(repeatCount);
      if (repeated === s) return true
    }
  }
  return false;
}

//? Optimise One
var repeatedSubstringPattern = function (s) {
  let doubled = (s + s).slice(1, -1);
  return doubled.includes(s);
}
// console.log(repeatedSubstringPattern("abab")); // Output: true
// console.log(repeatedSubstringPattern("aba")); // Output: false
// console.log(repeatedSubstringPattern("abcabcabcabc")); // Output: true

//! Leetcode 443. String Compression
var compress = function (chars) {
  let s = "", i = 0;
  while (i < chars.length) {
    let ch = chars[i], count = 0;

    while (i < chars.length && chars[i] === ch) {
      count++; i++;
    }
    s += ch;
    if (count > 1) s += count;
  }
  for (let i = 0; i < s.length; i++) {
    chars[i] = s[i]
  }
  return s.length;
}
// console.log(compress(["a", "a", "b", "b", "c", "c", "c"])); // Output: 6, chars = ["a","2","b","2","c","3"]
// console.log(compress(["a"])); // Output: 1, chars = ["a"]
// console.log(compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"])); // Output: 4, chars = ["a","b","1","2"]

//! Leetcode 647. Palindromic Substrings
var countSubstrings = function (s) {
  let count = 0
  for (let i = 0; i < s.length; i++) {
    let count = expand(s, i, i, count);
    let count = expand(s, i, i + 1, count);
  }
  return count;
}
function expand(s, left, right, count) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--; right++, count++;
  }
  return count;
}

console.log(countSubstrings("abc")); // Output: 3, ["a","b","c"]
console.log(countSubstrings("aaa")); // Output: 6, ["a","a","a","aa","aa","aaa"]
console.log(countSubstrings("ababa")); // Output: 9, ["a","b","a","b","a","aba","bab","aba","ababa"]

/* 
string complete ab tum roadmap update karoge tick lagaoge or sare question jo solve kiya hai wo add kroge and ye new topic ya phase add kroge- "Deep Constraints + TC + SC Foundation" , aur phir Deep Constraints + TC + SC Foundation ke liye new chat mein start krne keliye secret key then again new chat mein → Phase 3 start hoga.
agar kuch updatation phase 0 mein krna hai to kr dena
---------------------------------------------------
Current String status

Completed:

LC 125  ✅
LC 242  ✅
LC 205  ✅
LC 49   ✅
LC 3    ✅
LC 76   ✅
LC 5    ✅
LC 344  ✅
LC 14   ✅
LC 567  ✅
LC 438  ✅
LC 459  ✅
LC 443  ✅
LC 647  ✅

 update  roadmap with:

Strings
→ 🔒 COMPLETED
→ every solved String LC listed with number + title + ✅

and add the next dedicated topic:

Deep Constraints + TC + SC Foundation

Then I'll give you a new Secret Key specifically for starting that foundation in a new chat.

After that foundation is genuinely completed:

NEW CHAT
↓
Secret Key
↓
Phase 3 — Linear Data Structures
(Stack + Queue + Deque)

So the sequence is now locked:

String
  ↓
LC 459
LC 443
LC 647
  ↓
🔒 STRING COMPLETE
  ↓
Roadmap Update
  ↓
Deep Constraints + TC + SC Foundation
  ↓
🔒 FOUNDATION COMPLETE
  ↓
NEW SECRET KEY
  ↓
Phase 3 — Linear Data Structures
*/