/*
Graph

Defination - A graph is data structure that helps us to represent relationships or connection between objects.

it consists of :
 👉🏻 Vertices (nodes) - that represents entities or objects in the graph
 👉🏻 Edges -represents links or connections between vertices/nodes

 Mathematically , a graph is written as
 G = (V, E)


 here we show a graph where we show vertices, edge , degree , path and cycle

                7
              ╱ │
             ╱  3 ───── 5
            2 ╱  ╲
             1 ──  6
                   │
              9────┘


Connections:
2 ─ 7, 7 ─ 3, 3 ─ 5, 1 ─ 3, 3 ─ 6, 1 ─ 6, 6 ─ 9


if we see this - hame dikhta hai ki ye tree hai, but tree is a special type of graph, like if u see - 7 , 2 and 3
       7
      ╱ \
    2    3

    this is looking like tree but it is not , the reason is graph has cycle, if we see 3, 6 and 1
       3
      ╱ \
     1───6

    so graph is nodes and connections between nodes, and tree is a special type/kind of graph which has no cycle.


  -->  Terminology in Graph
   Vertices(Nodes) - means graph mein jo objects hote hai unko vertices ya nodes bolte hai
   Edges(Connections) - means graph mein jo connections hote hai unko edges bolte hai
   Degree - means graph mein jo vertices hote hai unke kitne edges hai , mtlb kitne connections hai unko degree bolte hai
   Path - means graph mein jo vertices hote hai unke beech ka connection ko path bolte hai [its a way to go from one node to another node](There can be multiple paths between two vertices){There can be no path also}
   Cycle - means graph mein jo vertices hote hai unke beech ka connection agar start aur end same vertex pe ho to usko cycle bolte hai (means jaha se start kiya wahi ghoom kr pahunch jaaye) [There can be multiple cycles in a graph]{There can be no cycle also}

   --> Visual Representation of Graph with Terminology

                                7  (vertex)
                              ╱ │  (edges)
                             ╱  3 ───── 5
                            2 ╱  ╲
                             1 ──  6     path: 2 → 7 → 3 → 6 → 9
                                   │     cycle: 1 → 3 → 6 → 1
                              9────┘

   Vertices: 1, 2, 3, 5, 6, 7, 9
   Edges: 2–7, 7–3, 3–5, 1–3, 3–6, 1–6, 6–9
   Degree: deg(1)=2, deg(2)=1, deg(3)=3, deg(5)=1,
           deg(6)=3, deg(7)=2, deg(9)=1

--> Types of Graphs

🔹 1. Undirected Graph
Edges ki direction nahi hoti. A-B matlab dono taraf.

A ─── B
│
C

A to B → ok
B to A → ok
{Facebook, Instagram, Twitter, LinkedIn are examples of undirected graph}

🔹 2. Directed Graph (Digraph)
Edges ki direction hoti hai. A → B matlab sirf A se B.

A ──► B
│
▼
C

A to B → ok
B to A → ❌
{Twitter, Instagram, YouTube are examples of directed graph}{If one person follows another person, it doesn't mean that the other person follows back.}

{
InDegree means - kitne edges aa rahe hai kisi vertex/node pe, aur OutDegree means - kitne edges ja rahe hai kisi vertex/node se
}

{
 If u give direction so it is directed graph,
if u give weight so it is weighted graph,
if u give direction and weight so it is directed weighted graph
}

🔹 3. Weighted Graph
Edges pe weight (cost).
{cost, distance, time, price, weight, etc. can be used as weight of edges}
for example, if we have a graph like this:- showing route distance between cities, then we can say that the weight of edges is distance between cities.

                 shimla
                   |
                 120 km
                   |
    chandigarh ── 250 km ── delhi



A ──5── B
│
2
│
C

A to B → cost 5
A to C → cost 2


🔹 4. Unweighted Graph
Edges pe weight nahi hota.
--> All edges are equal in weight (cost).
--> You only care about connections, not their cost/weight.


🔹 5. Cyclic Graph
Cyclic — Cycle hai (koi path jo wapas same vertex pe aaye) [means atleast one cycle exist karta hai]


🔹 6.Acyclic Graph
 — Cycle nahi hai [direction hai , but cycle nahi hai] {means no cycle exist in the graph} [DAG mein weight bhi ho sakta hai, aur weight nahi bhi ho sakta hai]
DAG — Directed Acyclic Graph (very important!)
Example of Acyclic Graph (DAG) — NPM packages, Version Control System (Git), Task Scheduling, Trees etc..
{Some people will confuse that tree is a acyclic graph or not, so answer is yes, tree is a acyclic graph and it also look like tree }
[so remember that thing - graph or directed graph is a general data strucuture and tree is special type of graph which is acyclic and connected] {Tree is special kind/type of graph} [whatever u can do with tree, u can do with graph also like BFS, DFS, Dijkstra, Bellman-Ford, A* etc..] {but u cant do with tree what u can do with graph like cycle detection, connected components, shortest path in weighted graph, etc..} [Tree represents hierarchical structure {Parent child relationship}, but graph represents network structure] {Tree is a special type of graph which is acyclic and connected, but graph is a general data structure which can be cyclic or acyclic, connected or disconnected}


🔹 7. Connected Graph
Connected — Har vertex reachable hai
atleast one path exist karta hai between any two vertices/nodes in the graph. [means all vertices are reachable from any vertex in the graph] {means there is a path between any two vertices in the graph} [means all vertices are connected to each other in the graph]

🔹 8. Disconnected Graph
Disconnected — Kuch components alag hain
[means there are multiple components in the graph that are not connected to each other]
            A ──────── B

        C ───────── D
                  /
                 /
                /
              E

    Here A and B are connected to each other, but C, D and E are not connected to A and B. So this is a disconnected graph.

*/
//==============================================================

//* We are using BFS for clonning a graph
//! Leetcode 133 — Clone Graph
class Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }

}

var cloneGraph = function (root) {
  if (!root) return null;

  let queue = [root];
  let cloneRoot = new Node(root.val); // first argu is val second is neighbors

  let visited = new Map(); //tracking- originalRoot and cloneRoot is visited or not 

  visited.set(root, cloneRoot); // setting first key value pair in map

  while (queue.length) {
    let curr = queue.shift();

    // LeetCode uses the `neighbors` property for adjacent nodes.
    for (let singlePadosi of curr.neighbors) {
      if (!visited.has(singlePadosi)) {
        queue.push(singlePadosi);
        visited.set(singlePadosi, new Node(singlePadosi.val));
      }

      // making connection to cloneRoot curr to its neighbor
      let cloneCurr = visited.get(curr); // clone of curr one
      cloneCurr.neighbors.push(visited.get(singlePadosi));
    }
  }

  return cloneRoot;
};


//! Same Question solution using DFS
var cloneGraph = function (root) {
  if (!root) return null;

  let stack = [root];
  let cloneRoot = new Node(root.val);
  let visited = new Map();

  visited.set(root, cloneRoot);

  while (stack.length) {
    let curr = stack.pop();

    for (let singlePadosi of curr.neighbors) {
      if (!visited.has(singlePadosi)) {
        stack.push(singlePadosi);
        visited.set(singlePadosi, new Node(singlePadosi.val));
      }
      let cloneCurr = visited.get(curr);
      cloneCurr.neighbors.push(visited.get(singlePadosi));
    }
  }
  return cloneRoot;
}

//! same question DFS using recursion
var cloneGraph = function (root) {

  // Handle an empty graph.
  if (!root) return null;

  // Store cloned nodes.
  let visited = new Map();

  function dfs(curr) {
    // Return the existing clone.
    if (visited.has(curr)) return visited.get(curr);

    // Store the clone before its neighbors.
    let cloneCurr = new Node(curr.val);
    visited.set(curr, cloneCurr);

    // Clone and connect each neighbor.
    for (let neighbor of curr.neighbors) {
      cloneCurr.neighbors.push(dfs(neighbor)); // caliing dfs function for each neighbor of curr node
    }

    // Return the clone.
    return cloneCurr;
  }

  // Start DFS at the root.
  return dfs(root);
}


//! LeetCode 1971 — Find if Path Exists in Graph
//* BFS Solution
//? This question is just simple traversal - like a elem present in tree or in stack etc, node present in linkedlist etc
var validPath = function (n, edges, source, destination) {
  let map = {};
  for (let [x, y] of edges) { // [x,y] means in second example [[0,1]]
    // creating empty array so it will not throw error, if array exist so push otherwise create it
    if (!map[x]) map[x] = [];
    if (!map[y]) map[y] = [];
    // we are creating adjacent List like - {0: [1,2], 1: [0], 2: [0]}
    map[x].push(y);
    map[y].push(x);
  }
  // console.log(map);    

  let queue = [source]; // we add source in queue, because we have to start from source and check if destination is reachable or not
  let visited = new Set(); // we are using set to track visited nodes, so that we dont visit same node again and again because set will not allow duplicate values
  visited.add(source); // we are adding source in visited set, because we have already added it in queue

  while (queue.length) {
    let curr = queue.shift();

    if (curr === destination) return true;
    for (let padosi of map[curr] || []) { // if map[curr] is undefined then we will get empty array, so that we dont get error
      if (!visited.has(padosi)) {
        visited.add(padosi);
        queue.push(padosi);
      }
    }
  }
  return false;
}

//* DFS Recursive Solution
var validPath = function (n, edges, source, destination) {
  let map = {};
  for (let [x, y] of edges) {
    if (!map[x]) map[x] = [];
    if (!map[y]) map[y] = [];
    map[x].push(y);
    map[y].push(x);
  }

  let visited = new Set();
  visited.add(source);

  function dfs(curr) {
    if (curr === destination) return true;

    for (let padosi of map[curr] || []) {
      if (!visited.has(padosi)) {
        visited.add(padosi);
        if (dfs(padosi)) return true;
      }
    }
    return false;
  }
  return dfs(source);
}

//! LeetCode 797 - All Paths from Source to Target
/* 
Example 1 - graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]

examples mein hame adjacenty list diya hua hai, jismein graph[0] = [1,2] means 0 se 1 aur 2 connected hai, graph[1] = [3] means 1 se 3 connected hai, graph[2] = [3] means 2 se 3 connected hai, graph[3] = [] means 3 se koi bhi connected nahi hai. So hame source se target tak ke sare paths find karne hai. because question is = " find all possible paths from node 0 to node n - 1 and return them in any order."

Example 2 - graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

same wahi adjacenty list hai, jismein graph[0] = [4,3,1] means 0 se 4,3 aur 1 connected hai, graph[1] = [3,2,4] means 1 se 3,2 aur 4 connected hai, graph[2] = [3] means 2 se 3 connected hai, graph[3] = [4] means 3 se 4 connected hai, graph[4] = [] means 4 se koi bhi connected nahi hai. So hame source se target tak ke sare paths find karne hai. because question is = " find all possible paths from node 0 to node n - 1 and return them in any order."
 */
var allPathsSourceTarget = function (graph) {
  let destination = graph.length - 1;
  let result = [];
  let visited = [];
  const backtrack = (currNode) => {
    visited.push(currNode);

    if (currNode === destination) {
      result.push([...visited]);
    }

    for (let padosi of graph[currNode]) {
      backtrack(padosi);
    }

    // graph[destination] hamesha empty array [] hota hai, toh loop khud hi skip ho jata hai aur pop() chal jata hai)

    visited.pop(); // (Loop khatam hone ke baad, wapas aate waqt means backtrack hoga to node ko path se nikaal do jisse sare path push na ho jaye)
  }
  backtrack(0); // 0 se n-1 tk jana hai isiliye 0 se start
  return result;
}