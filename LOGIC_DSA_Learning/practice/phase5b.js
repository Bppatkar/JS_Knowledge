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
//* Bubble Sort - [Compare → neighbours → swap if wrong → largest bubbles to end]
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
   for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
         if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
         }
      }
   }
   return arr;
}

//! using swapped flag [//! if our array is already sorted or after one iteration sorted we use flag to make bubblesort faster]
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
//! This is my implementation
function insertionSort(arr) {
   // first part is already sorted because if array has only 1 element then it is already sorted so we started from second one 
   for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      // j har bar chota hota jayega aur ham reverse mein check krege ki elem chota hai ya bada hai agar chota hai to left mein shift karte jayenge aur j-- karte jayenge
      while (j >= 0 && arr[i] < arr[j]) {
         let temp = arr[i];
         arr[i] = arr[j];
         arr[j] = temp;
         j--;
         i--;
      }
   }
   return arr;
}

// other way to implement insertion sort is to use key and j pointer to find the correct position of key in sorted portion and then shift the elements to right and insert the key in correct position
function trainInsertion(arr) {
   for (let i = 1; i < arr.length; i++) {

      // 1. Current element uthao
      let curr = arr[i];

      // 2. prev pointer , curr ke pehle hoga  and har bar prev change hota rhega isiliye arr[i-1] nahi likh rhe ok
      let prev = i - 1;

      // 3. Bade elements ko right shift karo
      while (prev >= 0 && arr[prev] > curr) {

         arr[prev + 1] = arr[prev];

         // 4. Ek step left jao
         prev--;
      }

      // 5. Empty position mein key insert
      arr[prev + 1] = curr;
   }

   return arr;
}
// console.log("insertion", insetionSort([23, 1, 10, 5, 2])); // [1,2,5,10,23]


//! Leetcode 147. Insertion Sort List
var insertionSortList = function (head) {
   if (head === null || head.next === null) return head;

   let dummy = new ListNode(0);
   dummy.next = head;

   let prev = head;
   let curr = head.next;

   while (curr != null) {
      let next = curr.next;

      // curr already correct position par hai
      if (prev.val <= curr.val) {
         prev = curr;
         curr = next;
         continue;
      }

      // 1. curr ko original position se hatao
      prev.next = next;

      // 2. sorted list mein curr ki jagah dhundho
      let pos = dummy;
      while (pos.next != null && pos.next.val <= curr.val) {
         pos = pos.next;
      }

      // 3. cur ko correct position par insert karo
      curr.next = pos.next;
      /*
      Dhyaan do: abhi 2 list mein connected nahi hua hai.
      Abhi complete list: dummy → 4 → 1 → 3
      2 → 4
      */
      pos.next = curr;
      /* 
      dummy → 2
      Aur 2 ka next hum pehle hi 4 kar chuke hain:- dummy → 2 → 4 → 1 → 3
      */

      // 4. next unsorted node par jao
      curr = next;
   }
   return dummy.next;
}
// console.log(insertionSortList([4, 2, 1, 3])); // [1,2,3,4]

// ==========================================================
//! Merge Sort - [Divide -> Sort -> merge]
// Merge Sort ka natural implementation recursive hai.
// ==========================================================
/* 
///* 🧠 Merge Sort — Thinking

///? Bubble mein hum pooch rahe the: - “Ye dono neighbours sahi order mein hain?”

///? Selection mein: - “Unsorted portion mein sabse chhota kaun hai?”

///? Insertion mein: - “Ye key sorted portion mein kahan fit hogi?”

///? Merge Sort mein: - “Bade problem ko chhote sorted problems mein tod sakte hain kya?”
*/
/* 
Array
  ↓
2 halves mein divide karo
  ↓
Har half ko recursively divide karo
  ↓
Single elements?
  ↓
YES → already sorted
  ↓
Ab 2 sorted parts ko MERGE karo
  ↓
Dono ke front elements compare karo
  ↓
Jo chhota hai → result mein daalo
  ↓
Us side ka pointer aage
  ↓
Ek side khatam?
  ↓
Dusri side ke remaining elements append
--------------------------------------
left → portion ka starting index
right → portion ka ending index

left === right
      ↓
sirf 1 element
      ↓
divide karna STOP
-------------------------------------
[8, 3, 5, 1]

       Divide
          ↓
     [8, 3] [5, 1]
       ↓       ↓
   [8] [3]  [5] [1]
       ↓       ↓
     [3,8]   [1,5]
          ↓
        Merge
          ↓
          [1,3,5,8]
-------------------------------------
function mergeSort(arr, left, right)

arr        → actual data
left       → current portion ka START
right      → current portion ka END
mid        → current portion ko 2 halves mein divide karne ki boundary
recursion  → smaller portions par same process repeat
base case  → left >= right → 1 element → STOP
 */
/* 
///! =========== Full Pseudocode ==============
MERGE_SORT(arr, left, right):

    IF left >= right:
        RETURN

    mid = floor((left + right) / 2)

    MERGE_SORT(arr, left, mid)

    MERGE_SORT(arr, mid + 1, right)

    MERGE(arr, left, mid, right)
-------------------------------------------
And MERGE:

MERGE(arr, left, mid, right):

    create empty temp array

    i = left
    j = mid + 1

    WHILE i <= mid AND j <= right:

        IF arr[i] <= arr[j]:
            add arr[i] to temp
            i++

        ELSE:
            add arr[j] to temp
            j++

    WHILE i <= mid:
        add arr[i] to temp
        i++

    WHILE j <= right:
        add arr[j] to temp
        j++

    copy temp back into arr
*/

//! My Implementation of Merge Sort
function mergeSort(arr) {
   //base case
   if (arr.length <= 1) return arr;

   const mid = Math.floor(arr.length / 2);
   const left = mergeSort(arr.slice(0, mid));
   const right = mergeSort(arr.slice(mid));
   return merge(arr, left, right);
   // return arr;
}


function merge(arr, left, right) {
   // Create an empty array and fill it in sorted order.
   let temp = [];

   // assume we get - [3,5,8] [2,4] in left and right so we do this
   // [3,5,8]    [2,4]
   //  i          j
   let i = 0, j = 0;

   // we stop loop when i goes beyond left array length and same for right
   while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
         temp.push(left[i]);
         i++;
      } else {
         temp.push(right[j]);
         j++;
      }
   }

   // pushing remaining elems from left halves
   while (i < left.length) {
      temp.push(left[i]);
      i++;
   }

   // pushing remaining elems from right halves
   while (j < right.length) {
      temp.push(right[j]);
      j++;
   }

   // copying temp array to original array
   for (let i = 0; i < temp.length; i++) {
      arr[i] = temp[i];
   }

   return arr;
}

// chatgpt implementation of merge sort
function mergeSort(arr, left, right) {
   // base case [when portion has 1 elem then stop dividing]
   if (left >= right) return;

   // finding middle for breaking into two halves
   let mid = Math.floor((left + right) / 2);

   // sorting left half [recursively]
   mergeSort(arr, left, mid);

   // sorting right half [recursively]
   mergeSort(arr, mid + 1, right);

   // merging both left and right half
   mergeBothHalves(arr, left, mid, right);
}
function mergeBothHalves(arr, left, mid, right) {
   let tempArr = [];

   let i = left, j = mid + 1;

   while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
         tempArr.push(arr[i]);
         i++;
      }
      else {
         tempArr.push(arr[j]);
         j++;
      }
   }

   // pushing remaning ele from left halves
   while (i <= mid) {
      tempArr.push(arr[i]);
      i++;
   }

   // pushing remaning ele from right halves
   while (j <= right) {
      tempArr.push(arr[j]);
      j++;
   }

   // copy tempArr to original arr
   for (let i = 0; i < tempArr.length; i++) {
      arr[left + i] = tempArr[i];
   }

}

let arr = [8, 3, 5, 1, 7];
let arr1 = [8, 3, 5, 1, 7, 2];

// mergeSort(arr, 0, arr.length - 1); // [1, 3, 5, 7, 8]
// console.log(arr);
// mergeSort(arr1, 0, arr1.length - 1); // [1, 2, 3, 5, 7, 8]
// console.log(arr1);

//! Leetcode 912. Sort an Array
var sortArray = function (nums) {
   let left = 0, right = nums.length - 1;
   mergeSort(nums, left, right);
   return nums;
};

function mergeSort(nums, left, right) {
   if (left >= right) return;

   let mid = Math.floor((left + right) / 2);

   // sort left half 
   mergeSort(nums, left, mid);

   // sort right half 
   mergeSort(nums, mid + 1, right);

   // merging both left and right half
   mergeBothHalf(nums, left, mid, right);
}


function mergeBothHalf(arr, left, mid, right) {
   let i = left, j = mid + 1;
   let tempArr = [];

   while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) { tempArr.push(arr[i]); i++; }
      else { tempArr.push(arr[j]); j++; }
   }

   // pushing remaning elems from left halves
   while (i <= mid) { tempArr.push(arr[i]); i++; }

   // pushing remaning elems from right halves
   while (j <= right) { tempArr.push(arr[j]); j++; }

   // copy tempArr into original one
   for (let i = 0; i < tempArr.length; i++) {
      arr[left + i] = tempArr[i];
   }
}

// ==========================================================
//! Quick Sort - [Pivot → Partition → Recursively sort]
// Quick Sort ka natural implementation recursive hai.
// ==========================================================
/* 
///* ======Thinking======= 
/// 1. choose a pivot element [Pivot = ek element jiske basis par array ko 2 sides mein partition karte hain.]

///? Pivot kaunsa element ho sakta hai? - Koi fixed universal rule nahi hai.

Common choices:

- First element
- Last element
- Middle element
- Random element
- Median-of-three

So tumhara question: - "Center ka maanna hai ya last ka ya mid nikalna hai?"

///? Answer: algorithm/partition scheme par depend karta hai.

/// 2. partition the array into two halves:
///    - left half: elements < pivot
///    - right half: elements > pivot
/// 3. recursively apply quick sort to both halves
------------------------
///*   Diff [Merge vs Quick]
///! Merge Sort
Divide → Sort → Merge

///! Quick Sort
Choose Pivot → Partition → Sort left/right
*/
/* 
///? ====== PsuedoCode========
function quickSort(arr, left, right):
    IF left >= right:
        RETURN 
   /// choose pivot and we choose last element as pivot because it is easy to implement

Hum abhi LAST element kyun le rahe hain? - Kyuki hum Lomuto Partition seekh rahe hain.
///! [Lomuto Partition = Quick Sort ke andar array ko partition karne ka ek specific method.]
///? Lomuto Partition ka commonly taught version: - pivot = last element

Isliye: [7, 2, 9, 1, 5, 3]
                         ↑
                   pivot = 3

Ye Quick Sort ka universal rule nahi hai.

Ye specifically hamare Lomuto implementation ka convention hai.

    pivot = arr[right]
    partitionIndex = partition(arr, left, right, pivot)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
   
*/

function quickSort(arr, left, right) {
   if (left >= right) return;

   let pivot = partition(arr, left, right);

   quickSort(arr, left, pivot - 1);
   quickSort(arr, pivot + 1, right);
}

function partition(arr, left, right) {
   let pivot = arr[right] // Lomuto Partition
   let i = left - 1;

   for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
         i++;
         [arr[i], arr[j]] = [arr[j], arr[i]]
      }
   }
   i++;
   [arr[i], arr[right]] = [arr[right], arr[i]]
   return i; // returning pivot
}

// let quickArr = [7, 2, 9, 1, 5, 3];
// quickSort(quickArr, 0, quickArr.length - 1);
// console.log(quickArr)

//! Leetcode 75. Sort Colors
//? using built-in method
var sortColors1 = function (nums) {
   return nums.sort((a, b) => a - b)
} // TC- O(n log n)

//? method 2 - conting 0,1,and 2 and put in array
var sortColors2 = function (nums) {
   let zeroCount = 0, oneCount = 0, twoCount = 0;
   for (let i = 0; i < nums.length; i++) {
      if (nums[i] === 0) zeroCount++;
      else if (nums[i] === 1) oneCount++;
      else twoCount++;
   }
   let index = 0;
   // now we will fill the array with 0s, 1s, and 2s based on their counts
   for (let i = 0; i < zeroCount; i++) {
      // nums[index++] = 0;
      nums[index] = 0;
      index++;
   }
   for (let i = 0; i < oneCount; i++) {
      nums[index++] = 1;
   }
   for (let i = 0; i < twoCount; i++) {
      nums[index++] = 2;
   }
   return nums;
} // TC - O(n)

///! Famous solution
var sortColors = function (nums) {
   // we chhose 3 pointer, ans "ASSUME" ki i/left ke pass 0 hona chahiye, j/mid ke pass 1 and k/high ke pass = 2
   // we put k in last because 2 needs in the end, and we dont know where is 1 so we put i and j in start ok
   // and condition ye rhegi loop ki , ki ye j , k ko cross na kre because k end s fill hoga aur reverse mein aayega , j agar k ko cross krega means sare elem fill ho gye hai sahi jagah end loop end

   let i = 0; // denotes 0
   let j = 0; // denotes 1
   let k = nums.length - 1; // denotes 2

   while (j <= k) {
      if (nums[j] === 0) {
         swap(nums, i, j);
         i++; j++;
      }
      else if (nums[j] === 1) {
         j++;
      } else {
         swap(nums, j, k);
         k--;
      }
   }
   return nums;
} // TC- O(n)

function swap(arr, a, b) {
   let temp = arr[a];
   arr[a] = arr[b];
   arr[b] = temp;
   return arr;
}

// console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]
// console.log(sortColors([2, 0, 1])); // [0,1,2]

//! Leetcode 88. Merge Sorted Array
var merge = function (nums1, m, nums2, n) {
   if (m === 0) {
      for (let k = 0; k < n; k++) {
         nums1[k] = nums2[k];
      }
      return nums1;
   }
   if (n === 0) return nums1;

   let tempArr = [];
   let i = 0, j = 0;
   while (i < m && j < n) {
      if (nums1[i] < nums2[j]) {
         tempArr.push(nums1[i]);
         i++;
      } else if (nums1[i] === nums2[j]) {
         tempArr.push(nums1[i]);
         tempArr.push(nums2[j]);
         i++; j++;
      }
      else {
         tempArr.push(nums2[j]);
         j++;
      }

   }
   // pushing remanning elems
   for (let k = i; k < m; k++) {
      tempArr.push(nums1[k]);
   }
   for (let k = j; k < n; k++) {
      tempArr.push(nums2[k]);
   }
   // replacing tempArr from nums1
   for (let i = 0; i < m + n; i++) {
      nums1[i] = tempArr[i];
   }
   return nums1;
} // O(m+n) and extra space tempArr

//! reversing two pointer approach [no extra space]
var merge1 = function (nums1, m, nums2, n) {
   let p1 = m - 1;
   let p2 = n - 1;

   for (let i = m + n - 1; i >= 0; i--) {
      if (p2 < 0) break;
      if (p1 >= 0 && nums1[p1] > nums2[p2]) {
         nums1[i] = nums1[p1];
         p1--;
      } else {
         nums1[i] = nums2[p2];
         p2--;
      }
   }
   return nums1;
} // O(1) extra space and  TC - O(m+n)

// console.log(merge1([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)); // [1,2,2,3,5,6]
// console.log(merge1([1], 1, [], 0)); // [1]
// console.log(merge1([0], 0, [1], 1)); // [1]

// ======================================
//! Counting Sort - [Count → Place → Output]
// ======================================
/* 
============ Thinking =============
Counting Sort ka main idea hai: - "Compare mat karo, bas count karo."

Array: - [4, 2, 2, 1, 4, 3, 2]

Counting Sort bolta hai: - "Compare kyun karna? Pehle ye count karo ki har number kitni baar aaya."

Dekho:

Value:  1  2  3  4
Count:  1  3  1  2

Matlab:

1 → 1 baar
2 → 3 baar
3 → 1 baar
4 → 2 baar

Ab sorted array banana trivial hai:

1 → [1]
2 → [2,2,2]
3 → [3]
4 → [4,4]

Result:- [1, 2, 2, 2, 3, 4, 4] 

///! Yahi Counting Sort ka core idea hai

Array
  ↓
Har value ki frequency count karo
  ↓
Values ko increasing order mein dekho
  ↓
Jitni baar count hai, utni baar output mein daalo

============ Pseudocode =============
1. pehle range find karo (min, max)
2. count array create karo (size = max - min + 1)
3. input array ke elements ko count array mein count karo
4. count array ke basis par output array fill karo
5. output array ko original array mein copy karo

*/
var countingSort = function (arr) {
   let min = Math.min(...arr);
   let max = Math.max(...arr);

   // finding range
   let range = max - min + 1;

   // creating count array using size of range
   let count = new Array(range).fill(0);

   // counting frequency of each elem
   for (let i = 0; i < arr.length; i++) {
      // incrementing count for each element
      // count[arr[i] - min]++;
      let index = arr[i] - min;
      count[index]++;
   }

   // scanning count array from left to right
   let index = 0;
   for (let i = 0; i < count.length; i++) {
      while (count[i] > 0) {
         arr[index] = i + min;
         index++;
         count[i]--;
      }
   }
   return arr;
}
// console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1,2,2,3,3,4,8]

//! above one is not stable, so we write counting sort using prefix sum

/* 
//* Stable ka matlab

Suppose objects hain:

(2, A)
(1, X)
(2, B)
(1, Y)

Agar sort by number karein, stable result hona chahiye:

(1, X)
(1, Y)
(2, A)
(2, B)

Notice:

2: A → B
1: X → Y

same-value elements ka original order preserve hua.

Tumhara current frequency-rebuild version sirf values jaanta hai:

count[1] = 2
count[2] = 2

Usse ye information nahi pata ki kaunsa 2 pehle tha aur kaunsa baad mein.
*/

function countingSort1(arr) {
   let min = Math.min(...arr);
   let max = Math.max(...arr);

   let range = max - min + 1;

   let count = new Array(range).fill(0);

   for (let i = 0; i < arr.length; i++) {
      let index = arr[i] - min;
      count[index]++;
   }

   // count ko prefix sum mein convert krna h
   for (let i = 1; i < count.length; i++) {
      count[i] = count[i] + count[i - 1];
   }

   // output array same as input size arr
   let outputArr = new Array(arr.length).fill(0);

   // traversing right to left [stable placement]
   for (let j = arr.length - 1; j >= 0; j--) {
      let val = arr[j];
      let index = val - min;
      let position = count[index] - 1;
      outputArr[position] = val;
      count[index]--;
   }


   return outputArr;
}
console.log(countingSort1([4, 2, 2, 8, 3, 3, 1])); // [1,2,2,3,3,4,8]