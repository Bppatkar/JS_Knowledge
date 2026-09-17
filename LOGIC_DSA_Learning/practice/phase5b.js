// ==========================================================
//! SORTING KA "GAON" STORY — Sortingpur
// ==========================================================
//
// Ek gaon hai — Sortingpur.
// Sarpanch chahta h: "Sab log height ke ascending order me khade ho jao." Par kisi ko nahi pata kaun kahan khada ho.

// Ab alag-alag SORTING METHODS gaon me aati h — har wali  pichhli wali ki PROBLEM solve karke aati h. Yahi humari mental story h, isse hi sab yaad rahega.


//! ----- 1. BUBBLE SORT — "Padosi-Padosi Dekho" -----

//* Bubble bhai bola: "Main door ke aadmi se compare nahi karunga, sirf apne PADOSI ko dekhunga."
//   left > right -> swap (chhota left, bada right)
//
// DRY RUN:
//   5 2 8 1
//   5 vs 2 -> swap  => 2 5 8 1
//   5 vs 8 -> no swap
//   8 vs 1 -> swap  => 2 5 1 8
//
// NAAM = BEHAVIOR/VISUAL -> bade elements dheere dheere end ki taraf "bubble" hote h, har pass me ek bada element apni final position ke paas chala jata h

// PROBLEM: "Main HAR BAAR padosiyon ko compare karta hoon"
//   -> bahut comparisons/swaps. Gaon bada -> Bubble slow.

///! ================================
// Bubble: largest → right
// Selection: smallest → left
///! ================================


//! ----- 2. SELECTION SORT — "Sabse Bada/Chhota Chuno" -----

//* Selection bhai ne Bubble ko dekha, bola: "Itna idhar-udhar kyu kara rahe ho? Main POORE remaining gaon me sabse CHHOTA/BADA aadmi select karunga, seedha sahi position pe bhejunga."

// DRY RUN:
//   [5, 2, 8, 1] -> minimum = 1 -> [1, 2, 8, 5]
//   remaining [2, 8, 5] -> minimum = 2 -> already sahi jagah
//
// NAAM = MECHANISM -> select the minimum
//
// BUBBLE SE BETTER: "Pura remaining area dekho -> best
//   element select karo -> EK baar place karo" -> swaps kam
//
// PROBLEM: Gaon already sorted ho (1 2 3 4 5) phir bhi
//   Selection bolega "check karunga remaining me sabse chhota  kaun h" -> unnecessary searching -> O(n^2) hi rahega


//! ----- 3. INSERTION SORT — "Haath Mein Cards" -----

//* Insertion bhai bola: "Mujhe poora gaon ek saath sort nahi karna. Main logo ko EK-EK karke apni sorted line me INSERT karunga." Jaise playing cards.

// DRY RUN:
//   [2, 5, 8 | 3] -> 3 ko sahi jagah insert -> [2, 3, 5, 8]
//
// NAAM = MECHANISM -> correct position me ghusa do / insert karo
//
// SELECTION SE BETTER: data almost sorted ho (1 2 3 5 4) to bas "4 ko 3 aur 5 ke beech insert karna h" -> kam work
//  Nearly sorted data -> Insertion bahut achha

// PROBLEM: reverse sorted (8 7 6 5 4 3 2 1) ho to har naye  element ko bahut peeche shift karna padega -> O(n^2) worst


//! ----- 4. MERGE SORT — "Gaon Ko Aadhaa-Aadhaa Karo" -----

//* Gaon bahut bada ho gaya. Merge bhai bola: "Tum log poore gaon ko ek saath sort karne ki koshish kar rahe ho. Gaon  ko AADHA-AADHA kar do."

// DRY RUN:
//   [5,2,8,1] -> divide -> [5,2] [8,1] -> divide -> [5][2][8][1]
//   sort+merge chhoti lines -> [2,5] [1,8] -> merge -> [1,2,5,8]
//
// NAAM = MECHANISM -> sorted pieces ko merge/join karo
//
///? SABSE MAJOR IMPROVEMENT: Insertion/Selection/Bubble teeno ka worst case O(n^2) tha. Merge: O(n log n) -> large data  ke liye much better
//
// PROBLEM: pieces ko merge karne ke liye extra SPACE chahiye  -> "Main fast hoon, lekin mujhe extra jagah do"


//! ----- 5. QUICK SORT — "Leader/Pivot Banao" -----

//* Quick bhai ne Merge ko dekha, bola: "Tum aadha-aadha tod rahe ho aur baad me merge kar rahe ho. Main ek LEADER/PIVOT choose karunga."

// DRY RUN:
//   [5,2,8,1,6] pivot=5 -> chhote[2,1] | 5 | bade[8,6]
//   dono sides ko independently sort karo
//
// NAAM = BEHAVIOR/CLAIM -> "practically fast (quick) hota h"
//   -> actual mechanism (PIVOT + PARTITION) naam me nahi likha

// MERGE SE ACHHA: standard Quick me generally same tarah ka extra array nahi banana padta, practical me bahut fast

// PROBLEM: pivot baar baar kharab choose ho (already sorted array pe extreme element pivot) -> partition unbalanced
//   -> worst case O(n^2)


//! ----- 6. COUNTING SORT — "Compare Hi Mat Karo!" -----

//* Counting bhai ne sabko dekha, bola: "Tum log ek dusre ki height COMPARE kyu kar rahe ho?" Agar values limited h to woh seedha COUNT karega.
//
// DRY RUN:
//   values 1,2,3,4,5 -> 1->2 log, 2->1 log, 3->3 log, 4->1 log
//   phir counts ke according arrange
//
// NAAM = MECHANISM -> count karo, comparison nahi
//
// BIGGEST ADVANTAGE: comparison-based sorting ki limitation se bahar nikal sakta h

// PROBLEM: values ka range enormous ho (1 se 1,000,000,000)
//   to range maintain karna expensive ho jata h


//! ----- 7. RADIX SORT — "Number Ko Digit-Digit Dekho" -----

//* Radix bhai bola: "Main poore numbers compare nahi karunga. Main DIGITS ko step-by-step process karunga."

// DRY RUN:
//   170, 045, 075, 090 -> pehle units digit, phir tens, phir
//   hundreds...
//
// NAAM = MECHANISM -> "radix" matlab base (jaise base-10) ->
//   digits/places ke basis par process
//
// PROBLEM: har type ke data ke liye general-purpose nahi h


//! ----- 8. BUCKET SORT — "Alag-Alag Tokri" -----

//* Bucket bhai bola: "Main sabko ek line me compare nahi karunga. Pehle similar range wale logo ko ALAG BUCKETS me daalunga."

// DRY RUN:
//   0-10 -> Bucket1, 10-20 -> Bucket2, 20-30 -> Bucket3...
//   phir har bucket ko sort karo
//
// NAAM = MECHANISM -> values ko buckets/groups me distribute karo
//
// PROBLEM: data distribution kharab ho (sab ek hi bucket me)
//   to buckets useful nahi rahenge


// ==========================================================
//! POORI STORY EK FLOW MEIN
// ==========================================================
//
//   BUBBLE     "Padosi se compare + swap"
//                |  Problem: bahut comparisons/swaps
//   SELECTION  "Sabse chhota SELECT karke place karo"
//                |  Problem: sorted data me bhi poora search
//   INSERTION  "Ek-ek element ko correct place INSERT karo"
//                |  Benefit: nearly sorted data me fast
//                |  Problem: worst case O(n^2)
//   MERGE      "Divide -> sort pieces -> MERGE"
//                |  Benefit: O(n log n)
//                |  Problem: extra space
//   QUICK      "Pivot -> PARTITION -> recursively sort"
//                |  Benefit: fast + generally in-place
//                |  Problem: bad pivot -> O(n^2)
//   COUNTING   "Compare mat karo -> COUNT karo"
//                |  Benefit: O(n+k)
//                |  Problem: range huge ho sakta h
//   RADIX      "Digit-by-digit process"
//                |  Benefit: suitable numeric/string keys
//                |  Problem: specialized
//   BUCKET     "Range ke hisaab se BUCKETS"
//                   Benefit: suitable distribution
//                   Problem: bad distribution
//
//! ABHI ISKO RATNA NAHI H. Ye sirf FIRST MENTAL STORY h.
//! Har algorithm padhte waqt isi story ke andar wapas connect
//! karna h.
//!
//! Bubble wali core observation yaad rakhna:
//!   LEFT BADA -> RIGHT CHHOTA -> SWAP -> chhota left, bada right.
//-----------------------------------------------------------

///! =========== Comparision =====================
// Bubble: largest → right
// Selection: smallest → left

// Bubble:
// compare adjacent
// → swap immediately
// → largest moves to end

// Selection:
// search minimum
// → remember its index
// → swap once at end
// → smallest moves to front
///! ================================

// ==========================================================
//* Bubble Sort -
// ==========================================================
/* 
for each pass:
    swapped = false

    neighbouring elements compare karo:
        agar left > right:
            swap
            swapped = true

    agar swapped false:
        stop
-------------------------------
Baju wale compare karo
        ↓
left > right ?
   ↓          ↓
  YES         NO
   ↓           ↓
 SWAP       kuch nahi
   ↓
pair aage badhao
   ↓
largest end mein
   ↓
next pass mein end wala skip
*/
//? Bubble Sort mein kya chahiye?- Humein har time current neighbour pair chahiye:
function bubbleSort(arr) {
   for (let i = 0; i < arr.length - 1; i++) {
      let swapped = false;
      // Har pass ke baad 1 largest element apni final position par fix ho jata hai,
      // isliye next pass mein 1 element kam compare karna hota hai.
      for (let j = 0; j < arr.length - 1 - i; j++) {
         if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;
         }
      }
      if (!swapped) break;
   }
   return arr;
}
// console.log(bubbleSort([5, 2, 8, 1])); // [1, 2, 5, 8]
/*
///! Time Space Complexity
Worst case: O(n²)
Average case: O(n²)

Agar array already sorted hai: - to no swaps, O(n) time complexity

space complexity: O(1) - in-place sorting
*/



//! Example -  Sort in Asceding order using Bubble Sort
/* 
Input:  [7, 3, 9, 2, 5]
Output: [2, 3, 5, 7, 9]
*/
function solution1BubbleSort(arr) {
   for (let i = 0; i < arr.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < arr.length - 1 - i; j++) {
         if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;
         }
      }
      if (!swapped) break;
   }
   return arr;
}
// console.log(solution1BubbleSort([7, 3, 9, 2, 5]));

// ==========================================================
// Bubble Sort → COMPLETE ✅
// ==========================================================


// ==========================================================
//! Selection Sort - [Select → smallest/biggest element → correct position par place]
// ==========================================================
/* 
Selection Sort kya karta hai? - Selection Sort array ko do parts mein sochta hai:

[ SORTED | UNSORTED ]

Initially:

[ | 5, 2, 8, 1 ]

Har pass mein unsorted portion ka smallest element dhundho.

Us smallest ko unsorted portion ke first element ke saath swap karo.

-----------------------------------------------
[1, 2, 8, 5]

mein 1 position 0 par aa gaya, position 0 permanently fixed hai.

So next pass:

[1 | 2, 8, 5]
     ↑-------↑
     unsorted portion

Hum sirf unsorted portion check karenge.

Selection Sort ka mental model
[sorted | unsorted]

     ↓
unsorted mein smallest select karo
     ↓
sorted portion ke next position par swap karo
     ↓
sorted portion grow

For example:

[5, 2, 8, 1]
 ↓
[1 | 2, 8, 5]
     ↓
[1, 2 | 8, 5]
          ↓
[1, 2, 5 | 8]
--------------------------------------
Humara goal hai:-  Unsorted portion ka smallest element select karo → uski final position par ek baar place karo.
--------------------------------------
Array:- [5, 2, 8, 1]

Scan karte raho:

5 → current minimum
2 → new minimum
8 → no
1 → new minimum

Aur bas yaad rakho:

minimum = 1
minimumIndex = 3

Scan complete hone ke baad sirf ek swap.
SELECT minimum → SWAP once → position fixed
*/

/* 
///! ======== Thinking ===============
Bubble mein hum pooch rahe the:- “Ye dono neighbours sahi order mein hain?”
Selection mein hum poochte hain: - “Unsorted portion mein sabse chhota kaun hai?”
--------------------------------------------
Position i fill karni hai
        ↓
Unsorted portion scan karo
        ↓
Minimum ka INDEX yaad rakho
        ↓
Scan complete?
        ↓
Minimum ko position i par swap karo
        ↓
i++
        ↓
Next position fill karo
*/
function selectionSort(arr) {
   for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
         if (arr[j] < arr[minIndex]) minIndex = j;
      }

      if (minIndex !== i) {
         let temp = arr[i];
         arr[i] = arr[minIndex];
         arr[minIndex] = temp;
      }
   }

   return arr;
}

// console.log(selectionSort([22, 5, 1, 8, 17, 9, 13])); // [1, 5, 8, 9, 13, 17, 22]
// console.log(selectionSort([5, 2, 8, 1])); // [1, 2, 5, 8]

// ==========================================================
//! Insertion Sort - [Pick → correct position find → shift → insert]
// ==========================================================
///* Sorted prefix + ek element uthao + usko sorted prefix mein correct position par insert karo.
/* 
Yahan sabse important difference hai.

Bubble: - Neighbours compare.
Selection: - Minimum search.
Insertion: - Ek element uthao aur already-sorted portion mein usko insert karo.
--------------------------------------
i → next element uthao
key → isko temporarily pakdo
j → key ke left se start karo

jab tak:
    j array ke andar hai
    AND arr[j] > key

    → arr[j] ko right shift
    → j--

loop khatam
→ gap mein key insert
→ i++
------------------------------
key = arr[i]
j = i-1

while (j >= 0 && arr[j] > key)
    right shift
    j--

insert key at j+1
*/

function trainInsertion(arr) {
   for (let i = 1; i < arr.length; i++) {

      // 1. Current element uthao
      let key = arr[i];

      // 2. Key ke just left se start
      let j = i - 1;

      // 3. Bade elements ko right shift karo
      while (j >= 0 && arr[j] > key) {

         arr[j + 1] = arr[j];

         // 4. Ek step left jao
         j--;
      }

      // 5. Empty position mein key insert
      arr[j + 1] = key;
   }

   return arr;
}
// console.log("insertion", insetionSort([23, 1, 10, 5, 2])); // [1,2,5,10,23]

function insetionSort1(arr) {
   for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
         arr[j + 1] = arr[j];
         j--;
      }
      arr[j + 1] = key;
   }
   return arr;
}
console.log(insetionSort1([4, 2, 1, 3]))



//! Leetcode 147. Insertion Sort List
var insertionSortList = function (head) { }