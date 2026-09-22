//! 1. Linear Search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
//* TC - O(n) | SC - O(1)
console.log("Linear Search", linearSearch([1, 2, 3, 4, 5], 3)); // Output: 2
///====================================================================


//! 2. Binary Search [apply only on sorted array]
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
//* TC - O(log n) | SC - O(1)
console.log("Binary Search", binarySearch([1, 3, 6, 7, 9, 12, 23], 12)); // Output: 5
console.log("Binary Search", binarySearch([5], 5)); // Output: 0
///====================================================================



//! 3. Bubble Sort [compare neighbour and swap]
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

//! if our array is already sorted or after one iteration sorted we use flag to make bubblesort faster
function bubbleSortFlag(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swap = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swap = true;
      }
    }
    if (!swap) break;
  }
  return arr;
}
//* TC - O(n^2) | SC - O(1) 
//* Agar array already sorted hai: - to no swaps, O(n) time complexity
console.log("Bubble Sort", bubbleSort([5, 3, 8, 4, 2])); // Output: [2, 3, 4, 5, 8]
console.log("Bubble Sort", bubbleSortFlag([9, 1, 2, 3])); // Output: [1, 2, 3, 9]
///====================================================================



//! 4. Selection Sort [select min/max -> place in correct place] [start - second se compare first one]
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx != i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}
console.log("Selection Sort", selectionSort([5, 3, 8, 4, 2])); // Output: [2, 3, 4, 5, 8]
///====================================================================



//! 5. Insertion Sort [pick element from unsorted array and place in correct position in sorted array]
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }
  return arr;
} // TC - O(n^2) | SC - O(1)

function insertionSort1(arr) {
  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i];
    let prev = i - 1; // prev changes multiple times isiliye arr[i-1] nahi likh rhe ok
    while (prev >= 0 && arr[prev] > curr) {
      arr[prev + 1] = arr[prev];
      prev--;
    }
    // correct position par pahuch gaye ab curr elem place kr do
    arr[prev + 1] = curr;
  }
  return arr;
} // TC - O(n^2) | SC - O(1)
console.log("Insertion Sort", insertionSort([5, 3, 8, 4, 2])); // Output: [2, 3, 4, 5, 8]
console.log("Insertion Sort", insertionSort([23, 1, 10, 5, 2])); // Output: [1, 2, 5, 10,23]
console.log("Insertion Sort", insertionSort1([23, 1, 10, 5, 2])); // Output: [1, 2, 5, 10,23]

///====================================================================



//! 6. Merge Sort [divide and conquer]
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
console.log("Merge Sort", mergeSort([5, 3, 8, 4, 2])); // Output: [2, 3, 4, 5, 8]
console.log("Merge Sort", mergeSort([23, 1, 10, 5, 2])); // Output: [1, 2, 5, 10,23]
///====================================================================




//! 7. Quick Sort [divide and conqure] [pivot -> left | pivot | right]
function quick(arr, left, right) {
  // base case
  // if (left >= right) return;

  // let pivot = quickSort(arr, left, right);

  // quick(arr, left, pivot - 1);
  // quick(arr, pivot + 1, right);

  // return arr;

  //? OR

  if (left < right) { // it means we have atleast two elem to compare, if it has only one elem we stop 
    let pivot = quickSort(arr, left, right);

    quick(arr, left, pivot - 1);
    quick(arr, pivot + 1, right);

    return arr;
  }
}

function quickSort(arr, left, right) {
  let pivot = arr[right];

  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++;
    }
  }
  // putting pivot in correct position
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

// let arrQuick = [5, 3, 8, 4, 2, -1, 13];
let arrQuick = [8, 3, 1, 7, 0, 10, 2];
quick(arrQuick, 0, arrQuick.length - 1);
console.log("Quick Sort", arrQuick); // Output: [2, 3, 4, 5, 8]
///====================================================================



//! 8. Counting Sort [count frequency and fill new array and return based on frequency]
//if array range is small then it is best
function countingSort(arr) {
  if (arr.length === 0) return [];

  let min = Math.min(...arr);
  let max = Math.max(...arr);


  // creating count array of range
  let range = max - min + 1;
  let countArr = new Array(range).fill(0);

  // counting elems frequency and putting that in countArr
  for (let i = 0; i < arr.length; i++) {
    // arr = [5, 3, 8, 4, 2], min = 2, max = 8, range = 7.

    // Toh countArr ki indexing 0 se 6 tak hai.
    // Lekin arr[i] = 8 ke liye tu countArr[8]++ kar raha hai — jo exist hi nahi karta. Isse array me extra space ban jayegi aur tera logic gadbad ho jayega.

    // Sudhaar:- Jab bhi value ko countArr me daale, us value se min subtract kar:
    // let index = arr[i] - min;
    // count[index]++;
    countArr[arr[i] - min]++;
  }

  ///* Other way - for counting elems frequency and putting that in countArr using for-of loop
  // for (let x of arr) {
  //   countArr[x - min]++;
  // }

  // creating new array and filling that with countArr frequencies
  let temp = [];
  for (let i = 0; i < countArr.length; i++) {
    let freq = countArr[i];
    for (let j = 0; j < freq; j++) {
      temp.push(i + min);
    }
  }
  return temp;
} // TC O(n+range)

function countingSortStable(arr) {
  let min = Math.min(...arr);
  let max = Math.max(...arr);

  let range = max - min + 1;
  let prefixCountArr = new Array(range).fill(0);
  // 0 fill nahi krege to empty array create hoga with value undefined to undefined++ hone lagega and it gives us NaN

  // counting frequency
  // for (let i = 0; i < arr.length; i++) {
  //   prefixCountArr[arr[i] - min]++;
  // }
  //? Counting frequency using for-of loop
  for (let x of arr) {
    prefixCountArr[x - min]++;
  }

  // converting prefixCountArr into prefixSum
  for (let i = 1; i < prefixCountArr.length; i++) {
    prefixCountArr[i] = prefixCountArr[i] + prefixCountArr[i - 1];
  }
  // prefixCountArr = [1, 2, 3, 4, 4, 4, 5]
  //              ↑  ↑  ↑  ↑  ↑  ↑  ↑
  //             2  3  4  5  6  7  8
  // prefixCountArr[i] batata hai ki value(i + min) tak kitne elements hain(inclusive).

  // Jaise: prefixCountArr[0] = 1 → value 2 tak 1 element hai
  // prefixCountArr[3] = 4 → value 5 tak 4 elements hain(2, 3, 4, 5)
  // prefixCountArr[6] = 5 → value 8 tak 5 elements hain(poore array me 5 elements)

  let outputArr = new Array(arr.length);
  // reverse array traversing
  for (let i = arr.length - 1; i >= 0; i--) {
    let val = arr[i];
    // finding index to place the value in outputArr using prefixCountArr/prefixSum array
    let position = prefixCountArr[val - min] - 1;
    // we subtract 1 because prefixCountArr is 1-based index and outputArr is 0-based index
    outputArr[position] = val;
    prefixCountArr[val - min]--; // counting kam kr rhe hai bas counter se
    //prefixCountArr[val - min] kya batata hai , Ye batata hai ki val value tak kitne elements hain (inclusive). Aur - 1 karke uski last position nikalte hain.


    ///!  agar prefixCountArr[val-min]-- na kre to Problem kya hui?

    // prefixCountArr[val - min] har baar same value deta hai (val ke liye). Isliye pos bhi har baar same nikalta hai, aur naya element purane wale ko overwrite kar deta hai.

    // Isliye -- karte hain
    // Jab humne ek val ko uski position pe rakh diya, to ab us val ke liye ek position peeche chale jao, taaki agar same value dobara aaye, to wo ek kam position pe baithe — jahan khali jagah hai. jisse stablity aa jayegi aur values bhi overwrite nhi hogi

  }
  return outputArr;
}

// more sort code
function countingSortStable1(arr) {
  let max = Math.max(...arr);

  let count = new Array(max + 1).fill(0);
  // because i want array from 0 to max , so for 0 index i add +1

  // getting frequency
  for (let x of arr) {
    count[x]++;
  }

  // getting prefixsum array
  let prefix = new Array(max + 1).fill(0);

  for (let i = 1; i < count.length; i++) {
    prefix[i] = count[i] + prefix[i - 1];
  }

  let outputArr = new Array(arr.length);

  for (let i = arr.length - 1; i >= 0; i--) {
    let val = arr[i];
    // we take values from arr from last to first and then we find their position in prefix array and place them in output array
    let pos = prefix[val]; // pos means index
    outputArr[pos - 1] = val;
    prefix[val]--;
  }
  return outputArr;
}

console.log("Counting Sort", countingSort([5, 3, 8, 4, 2])); // Output: [2, 3, 4, 5, 8]
console.log("Counting Sort", countingSortStable([-1, -4, 6, 8, 2, 12])); // Output: [-4, -1, 2, 6, 8, 12]
console.log("Counting Sort", countingSortStable1([4, 2, 5, 3, 3, 2, 1, 4])); // Output: [1, 2, 2, 3, 3, 4, 4, 5]
console.log("Counting Sort", countingSortStable1([5, 3, 3, 6, 2, 5, 1])); // Output: [1, 2, 3, 3, 5, 5, 6]

///====================================================================

