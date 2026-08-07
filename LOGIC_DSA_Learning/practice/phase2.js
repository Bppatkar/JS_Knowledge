//! Hashing -
//* Definition - A technique that helps us perform very fast lookup by storing data in a special structure.
// OR
//* Hashing is a technique designed to make lookups fast by using extra memory.

//? what we learn here - How to remember information while processing data.

//!  Checklist
/*
Whenever you see a new problem in this Phase 2, start asking:

Do I need to remember something I've seen before?
Am I repeatedly searching for the same value?
Am I counting occurrences?
Am I checking whether something already exists?
Do I need fast lookup?

If you answer yes to any of these, your brain should start thinking:

"Maybe Hashing can help."
*/

//! Engineering Thinking
/*
Remember Phase 1. We often traded extra computation to save time later. Example: Prefix Sum.

Extra Array
↓
Faster Queries

Hashing follows the same philosophy, but with a different trade - off.  Instead of storing prefix values, we store information.
So the trade becomes:

More Memory
  ↓
Less Computation
  ↓
Faster [Less Time]

This is called a Time vs Memory Trade - off.

  Trade - off(Hindi): Ek cheez paane ke liye doosri cheez ka thoda sacrifice karna.
*/

//! The Core Problem
/*
Notice something.  The problem is not storing data.  Arrays already store data very well.
The real problem is:  Finding the data quickly.
This is the first mental model of Hashing.

Storage ❌
Lookup ✅

///* Arrays are optimized for:  Store data in order.
///* Hashing is optimized for: Find data quickly.

This is why Hashing was invented.

The whole purpose of Hashing is:

Without Traversal
        ↓
Direct Lookup

///* just remember this mental model:

Array
↓
Search
↓
Traversal

///? vs

Hash Structure
↓
Lookup
↓
Direct Answer
*/


//! Lookup Table - A data structure designed for extremely fast searching.
/*
The array already maps:
Index
↓
Value
ex- 0 → 15
---------
But Hashing lets you choose the key. Instead of 0 → 15

You can have
15 → true or
15 → Index 0 or
15 → "Found"

---

Arrays

Index
↓
Value

Lookup Tables

Any Key
↓
Any Value
*/

//! 🧠 First Hashing Pattern Preview
/*
Pattern 1 [Purpose: Presence Checking]

Key
↓
true

Pattern 2 [Purpose: Mapping]
Key
↓
Information
*/

//! Hash Function - it is a function that converts a key into a small integer (index). [Converts any key into an array index]
//! Why can't we simply use an array for storing user emails like: lookup["bhanu@gmail.com"] instead of a HashMap?
//? Because array limitation - we cant use string as a key,
///*  - good Hash Function should satisfy these three properties - 
/* 
1 - be fast - means computing index quickly
2 - be deterministic - means same input same output everyime
3 - spread data evenly
*/

/* 
Ab sabse important question  Agar 
Hash("apple")
↓
2

Aur 
Hash("orange")
↓
2

Dono ko Drawer/Bucket 2 chahiye. Ab kya hoga? Isi problem ko bolte hain... Collision
///* Collision - Collision occurs when two different keys produce the same bucket index. [Jab 2 alag-alag keys same bucket mein jana chahein.]
Aur Collision ko handle karne ke do popular methods hote hain:
///? 1- Chaining - ek hi bucket ke andar list bana kar rakh dete hain ex. - [apple, orange, banana], teeno ko yahi bucket allow hue hai
///? 2- Open Addressing (Awareness Only) - Agar Bucket 2 full hai Bucket 2 ❌ To HashMap bolega Bucket 3 khali hai? --- Yes to Store there. Ya Bucket 4. Ya Bucket 0. Yaani next empty bucket dhoondh lega.Isko bolte hain Open Addressing
*/
//!Interview Point - "Can collisions be avoided completely?"
//? Answer: No.
//Reason:
/* 
Buckets limited hote hain.
Keys infinite ho sakti hain.
Isliye kuch different keys ka same bucket mein jana mathematically unavoidable hai.
*/
// if there are 3 bucket and keys are 10 then , internally hashmap ko aise pata chalta hai ki uske andr ek metric laga hua hai jo batata hai ki buckets kam pad rhe hai
//* Load Factor -  means ab bucket full ho gya hai new buckets banao and this process is called Rehashing [means colliision ke karan jo new bucket jo banae hai ab values ko usme rakho means maan lo phle apple 2 mein tha to ab bucket count badal gya to ab wo ex.- bucket 7 mein jayega ]. [Load Factor = Number of Entries / Number of Buckets]

/* 
///! Rehashing Steps
Old Buckets
      ↓
Create Bigger Bucket Array
      ↓
Run Hash Function Again
      ↓
Move Every Element

Ye ek expensive operation hai. Lekin baar-baar nahi hota. Kabhi-kabhi hota hai.  Isliye average performance fast rehti hai.
*/

/* 
///! Question tha: Why can't HashMap simply create more buckets without rehashing?
///* Correct answer: Suppose pehle Buckets = 5 Aur
Hash("apple")
↓
Bucket 2

Ab HashMap ne buckets badha diye Buckets = 10
Ab Hash Function ka result hi change ho sakta hai. Ab ho sakta hai
Hash("apple")
↓
Bucket 7

Agar apple ko Bucket 2 mein hi rehne diya, to jab hum lookup karenge,
Hash Function bolega Bucket 7 mein dekho Lekin apple to Bucket 2 mein pada hai. 😂 Kabhi milega hi nahi. Isliye har element ko dobara hash karke naye bucket mein shift karna padta hai.
Isi process ka naam hai: Rehashing  Ye bahut important interview point hai.
*/

// agar ye kuch buckets mein kuch value hamne insert ki
/* 
apple  → Bucket 2
orange → Bucket 1
banana → Bucket 3
mango  → Bucket 0
grapes → Bucket 4

and or bhi values aa gae or collisoin hua to fir aise store karege

Bucket 0 → mango → kiwi → pear
Bucket 1 → orange → melon
Bucket 2 → apple → papaya → pineapple
Bucket 3 → banana
Bucket 4 → grapes

///? now i want to search for "pineapple" so yaha par bhi traversal suru ho gya means jitni jyada collision utni speed kam
*/

//! Time Complexity of Hashing
/* 
///* Average O(1)
Interviewer: Why is HashMap O(1) average?
Answer: Kyuki normally:

- Hash Function fast hai.
- Data evenly spread hota hai.
- Load Factor control mein rehta hai.
- Collisions kam hote hain.

Isliye directly correct bucket mil jata hai. Average: O(1)

///* Worst Case O(n)
Interviewer: When does HashMap become O(n)?
Imagine. Hash Function bahut kharab hai. Sab kuch yahin bhej raha hai.

Bucket 2
↓
apple
↓
banana
↓
orange
↓
mango
↓
grapes
↓
...
1000 elements

Ab lookup karna hai. Traversal karna padega. 
apple ❌
banana ❌
orange ❌
...
1000th element ✅

Time Complexity O(n) Ye hai worst case.

///! Why is HashMap O(1) average but O(n) worst?
///? "A HashMap uses a hash function to map keys to buckets. When the hash function distributes keys evenly and the load factor is maintained, lookup is O(1) on average. In the worst case, many keys collide into the same bucket, causing traversal within that bucket and degrading the complexity to O(n)."
*/

//! Why was Map introduced when Object already existed?
/* Answer:
///? "Objects in JavaScript were designed to represent structured data (like a student or a product). Although they can be used as key-value stores, they convert keys to strings and have some limitations with object keys and iteration. Map was introduced as a dedicated hash-based data structure that supports keys of any type, provides cleaner APIs (set, get, has, delete), preserves insertion order, and is better suited for dynamic key-value operations." 
 */


/*
///! WHY WAS MAP INTRODUCED WHEN OBJECT EXISTED?

Reason 1 — Object Keys become Strings
Object: obj[1] = "One"; obj["1"] = "String One"; → Both stored as "1" (collision)
Map: map.set(1, "One"); map.set("1", "String One"); → Keeps 1 and "1" as separate keys ✅

Reason 2 — Object Cannot Use Other Objects as Keys
Object ==> 
const obj = {};
const user = { id: 1 };
obj[user] = "Bhanu";

Internally -- "[object Object]" 

Object: obj[{ id: 1 }] → Becomes "[object Object]" (overwrite issue) ❌
Map: map.set({ id: 1 }, value); → Uses actual reference as key ✅

Reason 3 — Object Was Designed for Data Representation, Not Hashing
Object: { name: "Bhanu", age: 22 } → Represents real-world entities
Map: Specifically designed for Key↔Value operations with dedicated methods:
  map.set(), map.get(), map.has(), map.delete(), map.clear(), map.size

Reason 4 — Better Iteration API
Object: Object.keys(), Object.values(), Object.entries() → Tedious // Tedious means time consuming
Map: for (const [key, value] of map) → Direct and cleaner

Reason 5 — Better Performance for Dynamic Collections
Object: Average O(1) lookup, acceptable for most cases
Map: Optimized for frequent insert/delete/large datasets with predictable behavior

Note: Map wasn't created because Object was slow. It was created for semantic clarity and specific use cases.

///! 🧠 Mental Model (Very Important)

Never think:
Object == Map

///* Instead think:

Object
│
├── Represents an entity
│      (Student, User, Product)
│
└── Can also behave like a HashMap

///* Whereas

Map
│
└── Pure HashMap
*/

///* Object Iteration
let obj = {
  name: "Bhanu",
  age: 28,
  cty: "jabalpur"
}

// insert 
obj["gender"] = "male" // here gender is a variable so it will be treated as key and value will be male, we have to use bracket notation and stringify the key if it is not a string. If we use dot notation then it will be treated as a property of the object and not a key-value pair.


// print all keys
console.log(Object.keys(obj)); // ['name', 'age', 'cty' ]

// print all values
console.log(Object.values(obj)); // ['Bhanu', 28, 'jabalpur']

// print all key-value pairs means entries gives array of arrays where each array is key-value pair
console.log(Object.entries(obj)); // [ [ 'name', 'Bhanu' ], [ 'age', 28 ], [ 'cty', 'jabalpur' ] ]


// loop
for (let key in obj) {
  console.log(key);
}
/* 
name 
age
cty
*/

for (let key of obj) {
  console.log(key); // TypeError: obj is not iterable like array means we cant use for of loop on object because object is not iterable like array  so soulion is to  use Object.entries(obj) or Object.keys(obj) or Object.values(obj)
}
for (let value of Object.values(obj)) {
  console.log(value); // Bhanu 28 jabalpur
}

for (let [key, value] of Object.entries(obj)) {
  console.log(key, value);
} // name Bhanu
// age 28
// cty jabalpur
//-----------------------------------------

//! Map
/*
| Operation   | Object                   | Map |
|----------   |--------                  |-----|
| Create      | {}                       | new Map() |
| Insert      | obj[key] = value         | map.set(key, value) |
| Search      | obj[key]                 | map.get(key) |
| Exists      | key in obj               | map.has(key) |
| Delete      | delete obj[key]          | map.delete(key) |
| Size        | Object.keys(obj).length  | map.size |
| Clear       | obj = {}                 | map.clear() |
*/
///------------------------------------

///? Bigest Advantage
// obj[1] and obj["1"] same key in object
// but in map
const map = new Map();
map.set(1, "One");
map.set("1", "String One");
/*
1
↓
Number

"1"
↓
String
*/
// 2 diff enetires
// -----------------------------
/*
📌 NOTES: Object vs Map (Key Conversion)
///! 1. Object {} mein key kaise store hoti hai?


const obj = {};
const user = { id: 1 };

obj[user] = "Bhanu";
console.log(obj);  // { '[object Object]': 'Bhanu' }
Rule:

Object ki key hamesha string hoti hai, Agar key,  object diya toh JavaScript auto-convert karta hai string mein

Conversion: String(user) → "[object Object]"
-------------------------------------------------------
let userNew = {"details" : "developer"};
console.log(String(userNew)); // "[object Object]"
-------------------------------------------------------

///! 2. Har object ka string representation same kyun?

const user1 = { id: 1 };
const user2 = { name: "Raj" };

String(user1);  // "[object Object]"
String(user2);  // "[object Object]"  (same!)
Kyunki: Default toString() method har object mein same hota hai.

///! 3. Overwrite kyun hota hai?
const obj = {};
const user1 = { id: 1 };
const user2 = { id: 2 };

obj[user1] = "Bhanu";
obj[user2] = "Rahul";

console.log(obj);  // { '[object Object]': 'Rahul' }
///?  Pehli value overwrite ho gayi kyunki key same hai!

///! 4. Map kyun safe hai?
const map = new Map();
const user1 = { id: 1 };
const user2 = { id: 2 };

map.set(user1, "Bhanu");
map.set(user2, "Rahul");

console.log(map.size);  // 2 (dono alag keys)
console.log(map.get(user1));  // "Bhanu"
-----------------------------------
///! Map:

Key object ho sakta hai because ye Reference store karta hai, string nahi or Har object ek unique key hoti hai in map

///* 🤔 object vs Object - Kya farak hai?
///? object (small 'o') - Type/Instance
const user = { id: 1 };        // ye ek object hai
const arr = [1, 2, 3];         // array bhi object hai
const func = function() {};    // function bhi object hai

console.log(typeof user);  // "object"  (small 'o')
console.log(typeof arr);   // "object"
console.log(typeof func);  // "function" (special case)
object = JavaScript ka data type (primitive types ke alawa sab kuch)

///? Object (capital 'O') - Constructor/Class

///* Object ek built-in constructor hai
const obj1 = new Object();     // same as {}
const obj2 = Object.create();  // create object

console.log(Object.keys({a: 1}));     // ['a']
console.log(Object.values({a: 1}));   // [1]
console.log(Object.prototype);        // parent of all objects
Object = Built-in function/class jisme methods hain:

Object.keys()
Object.values()
Object.assign()
Object.prototype.toString() ← yahi hai jo "[object Object]" deta hai

///? Visual Summary
Term	Meaning	Example
object (small)	Data type / instance	{id: 1}, [], null
Object (capital)	Constructor function	new Object(), Object.keys()
"[object Object]"	String representation	String({}) ka result
📝 Quick Reference Card


/// 🔴 OBJECT as key - Problem
const obj = {};
obj[{id: 1}] = "Bhanu";   // key ban gayi "[object Object]"
obj[{id: 2}] = "Rahul";   // overwrite ho gaya!

/// 🟢 MAP as key - Solution
const map = new Map();
map.set({id: 1}, "Bhanu");  // unique key
map.set({id: 2}, "Rahul");  // unique key
map.size;  // 2

/// 🧠 Yaad rakho:
/// 1. Object key = always string
/// 2. [object Object] = default string of any object
/// 3. Map = object as key allowed (reference based)
/// 4. object (small) = type, Object (capital) = constructor

✅ Final Summary Table
Feature	            Object {}	             Map
Key type	       String/Symbol only	     Any type
Object as key	   "[object Object]"	     Reference
Overwrite issue	   ✅ Haan	              ❌ Nahi
Use when	       Simple key-value	    Complex keys needed

 ///*  Ek line mein: -
object = data type hai,
Object = class hai, aur
"[object Object]" = kisi bhi object ka default string form hai!
*/

//! What to use when?
/*
Agar data ek real-world entity represent karta hai like this to  ✅ Object

const student = {
    name:"Bhanu",
    age:22
};
-----------------------
✅ Map - Agar data dynamic key-value lookup hai
Frequency
Index Mapping
Presence
Caching
Lookup Tables
Counting

*/
//! Set - "Ye Value pehle dikhi hai ya nahi...?" bas yes/no check karne ke liye use hota hai. [Set is a collection of unique values]

///* Biggest Property - Uniqueness Guarantee

/* 
///* Mental Model

///? Object and Map

Key
 ↓
Value

///? Set - Value Bas.
Set ke andar key-value pair nahi hota. Sirf values hoti hain.
*/

// CRUD
// Create
let set = new Set();
set.add("apple");
set.add(2);

// Read [search]
console.log(set.has("apple")); // returns true if value exists, false otherwise
// same thing in map
console.log(map.has("apple")); // returns true if key exists, false otherwise

// there is no update operation in set because set is a collection of unique values. If we want to update a value, we have to delete the old value and add the new value.

// Delete
set.delete("apple"); // removes the value from set

// size
set.size; // returns the number of unique values in the set

// Clear
set.clear(); // removes all values from the set

/*
Object vs Map vs Set
Need	                 Choose
Real-world          entity	Object
Key → Value         mapping	Map
Only unique         values	Set
*/

///! WeakMap / WeakSet (Awareness Only)
/* 
Is topic ko hum implementation level par nahi padhenge.

Sirf interview awareness.

///? WeakMap
Garbage Collection friendly.
Keys sirf Objects ho sakte hain.
Memory leaks avoid karne ke liye use hota hai.

///? WeakSet
Garbage Collection friendly.
Sirf Objects store karta hai.

Bas itna hi yaad rakhna.
*/