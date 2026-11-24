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


//! Leetcode 133 — Clone Graph
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

var cloneGraph = function (root) {
  if (!root) return null;

  let queue = [root];
  let cloneRoot = new Node(root.val); // first argu is val second is neighbors

  let visited = new Map(); //tracking- originalRoot and cloneRoot is visited or not 

  visited.set(root, cloneRoot); // setting first key value pair in map

  while (queue.length) {
    let curr = queue.shift();

    for (let singlePadosi of curr.neighbors) { // means neighbors
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