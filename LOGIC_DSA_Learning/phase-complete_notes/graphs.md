# GRAPH - COMPLETE NOTES

> Graph = dosto ka network, cities ke beech roads, ya packages ki dependencies - ek simple idea, bahut saari real-life situations.

---

# FEYNMAN START - Agar Graph ke baare mein kuch nahi pata

## Pehla simple jawab

**Graph ek drawing nahi, ek sochne ka tareeka hai.**

```text
Agar paas ek idea hai:
    log, jagah ya cheezein
aur
    unke beech rishta ya connection

to hum Graph use karenge.
```

### Example

Socho teen dost hain:

```text
Amit ---- Neha
  |
  |
Ravi
```

- Amit, Neha, Ravi -> **nodes/vertices**
- Friendship ke lines -> **edges**
- Har friendship mutual hai -> **undirected graph**

**Easy sentence:**

> **Graph = Points (nodes) + Un points ko jodne wali lines (edges)**

---

## Feynman steps - child-friendly order

```text
1. Pehle point aur line samjho
2. Phir direction samjho
3. Phir weight/cost samjho
4. Phir cycle aur connectivity samjho
5. Phir graph ko kaise dikhaye
6. Phir graph ko explore karo
7. Phir question ke hisaab se BFS/DFS/DSU/Dijkstra chuno
```

---

## 1.1 City-road story se Graph samjho

Maan lo char cities hain:

```text
Delhi ----- Jaipur
  |          |
  |          |
Agra ----- Udaipur
```

- Delhi, Jaipur, Agra, Udaipur -> **vertices**
- Roads -> **edges**
- Direct road nahi hai -> no direct edge
- Jaipur se Delhi jaana possible hai aur Delhi se Jaipur bhi -> undirected

**Important:**

> Edge ka matlab "sidha connection" hota hai.
> Edge ke bina sidhe jaana possible nahi hota.

---

## 1.2 Graph ke sabse common words

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #1E90FF;">

| Naam | Socho is tareeke se | Asaan example |
|:---|:---|:---|
| **Vertex / Node** | Ek point/jagah | Delhi |
| **Edge** | Do points ke beech line | Delhi-Agra road |
| **Neighbor** | Mere seedhe paaswale point | Delhi ke neighbor Jaipur, Agra |
| **Degree** | Mere kitne neighbors hain | Delhi ke 2 roads = degree 2 |
| **Path** | Point se point tak edges ka raasta | Delhi -> Jaipur -> Udaipur |
| **Cycle** | Raaste par aakhir phir wahi point aa jaao | A -> B -> C -> A |
| **Visited** | Main is point ko check kar chuka hoon | Tick mark |

</div>

---

## 1.3 Degree ko chhote example se samjho

```text
       B
      / \
     A   C
      \ /
       D
```

| Point | Directly connected | Degree |
|:---:|:---|:---:|
| A | B, D | 2 |
| B | A, C | 2 |
| C | B, D | 2 |
| D | A, C | 2 |

**Rule:**

```text
Degree = seedha connect hone wali lines ki count
```

---

## 1.4 Path aur cycle mein farak

### Path

Ek point se doosre point tak jaana:

```text
A --- B --- C --- D

Path: A -> B -> C -> D
```

### Cycle

Shuru aur end wahi point ho:

```text
A --- B
|     |
D --- C

Cycle: A -> B -> C -> D -> A
```

**Feynman rule:**

> Path = kahin jaana.
> Cycle = ghoom kar wahi ghar pahunch jaana.

---

# 2. Graph ke types ko bilkul simple bhasha mein

## 2.1 Direction hai ya nahi?

### Undirected = ek mutual road

```text
A --- B

A -> B possible
B -> A possible
```

**Example:** mutual friendship.

### Directed = ek-way road

```text
A --> B

A -> B possible
B -> A possible nahi
```

**Example:** Instagram follow.

**Ek line yaad rakho:**

> One-way arrow dikhe -> directed.
> Simple line dikhe -> undirected.

---

## 2.2 Cost hai ya nahi?

### Unweighted

Har edge ki cost same:

```text
A --- B --- C

Har edge = 1 step
```

### Weighted

Har edge ka apna cost:

```text
A --5 km-- B
A --2 km-- C
```

**Ek line yaad rakho:**

> Number edge ke paas hai -> weighted.

---

## 2.3 Cycle hai ya nahi?

### Acyclic

Cycle nahi; ghar par wapas nahi aa sakte:

```text
Task 1 -> Task 2 -> Task 3
```

### Cyclic

Kam se kam ek loop:

```text
A -> B -> C -> A
```

**DAG = Directed Acyclic Graph**

```text
Direction hai
Aur koi cycle nahi hai
```

**Example:** course prerequisites.

---

## 2.4 Sab connected hain ya alag?

### Connected

Har point se har point tak raasta hai:

```text
A --- B
|     |
C --- D
```

### Disconnected

Kuch points alag island hain:

```text
A --- B       C --- D

Connected groups: 2
```

---

# 3. Types ka ek-slide summary

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

| Agar question hai | Graph ka matlab |
|:---|:---|
| Road dono taraf hai? | Undirected |
| Road ek taraf hai? | Directed |
| Edge par cost hai? | Weighted |
| Edge par cost nahi? | Unweighted |
| Loop milta hai? | Cyclic |
| Directed + no loop? | DAG |
| Sab points connected? | Connected |
| Kuch alag islands? | Disconnected |
| Graph aur Tree? | Tree ek special connected acyclic graph |

</div>

---

# 4. Graph ko computer mein kaise dikhaye?

Sach baat: Graph ko computer ek picture ki tarah nahi rakhta.
Do common forms hain.

## 4.1 Adjacency List - sabse common

Har node apne direct neighbors ki list rakhe.

```text
A ke paas: B, C
B ke paas: A, D
C ke paas: A
D ke paas: B
```

```javascript
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"]
};
```

**Feynman rule:**

> Har point ke liye ek friend-list.

**Mostly ye use karo**, kyunki interview aur DSA mein sabse useful hai.

## 4.2 Adjacency Matrix - table form

```text
    A  B  C  D
A   0  1  1  0
B   1  0  0  1
C   1  0  0  0
D   0  1  0  0
```

```text
1 = edge hai
0 = edge nahi hai
```

**Small rule:**

> Adjacency List = memory friendly
> Adjacency Matrix = edge check quick, memory heavy

---

# 5. Graph ko explore karna seekho

Bahut important:

> Graph pehle koi linearly sorted data structure nahi hai.
> Isliye **start point** aur **visited** zaroori hai.

## Kyu visited?

```text
A --- B
|     |
D --- C
```

Bina visited ke loop ke andar chale jaoge:

```text
A -> B -> C -> D -> A -> B -> C...
```

**Visited = "main is point ko check kar chuka hoon"**

---

# 6. Graph ke do main raaste

## BFS - Breadth First Search

**BFS matlab:**

> Pahle apne nearest points, phir unke neighbors.

Example:

```text
        0
      /   \
     1     2
     |     |
     3     4
```

```text
Start: 0
Level 0: 0
Level 1: 1, 2
Level 2: 3, 4
```

**Queue yaad rakho:**

```text
Pehle line mein aaye -> pehle check ho
FIFO = First In, First Out
```

```javascript
function bfs(start, graph) {
  const visited = new Set([start]);
  const queue = [start];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

**BFS kab:**

- Minimum steps
- Minimum edges
- Unweighted shortest path
- Level-wise traversal
- Rotting Oranges / 01 Matrix

---

## DFS - Depth First Search

**DFS matlab:**

> Ek raasta pakdo aur end tak jao; phir pichhe aao aur doosra raasta lo.

Example:

```text
        0
      /   \
     1     2
     |
     3
```

```text
0 -> 1 -> 3
wapas 1
wapas 0
0 -> 2
```

**Stack/recursion yaad rakho:**

```text
Recursion: pehle andar, phir wapas
LIFO: Last In, First Out
```

```javascript
function dfs(node, graph, visited) {
  visited.add(node);

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, graph, visited);
    }
  }
}
```

**DFS kab:**

- Cycle detection
- Components/islands
- Full branch exploration
- Topological sort
- Grid flood fill
- Backtracking

---

## 6.1 BFS vs DFS simple comparison

| Question | Answer |
|:---|:---|
| Level chahiye? | BFS |
| Minimum steps chahiye? | BFS |
| Ek branch depth tak explore? | DFS |
| Cycle check? | DFS |
| All connected areas? | DFS/BFS |
| Friend circles? | BFS/DFS |

**Feynman memory rule:**

```text
Nearest first -> BFS
Deep first -> DFS
```

---

# 7. DEEP ALGORITHM NOTES

# 8. Cycle Detection

## Undirected graph

Parent ko pass karke check karein ki neighbor visited hai aur parent nahi hai.

```javascript
function hasCycleUndirected(n, graph) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true;
      }
    }

    return false;
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i) && dfs(i, -1)) return true;
  }

  return false;
}
```

## Directed graph

Three states use karo:

- `0` = unvisited
- `1` = currently in recursion stack
- `2` = completely visited

```javascript
function hasCycleDirected(n, graph) {
  const state = new Array(n).fill(0);

  function dfs(node) {
    if (state[node] === 1) return true;
    if (state[node] === 2) return false;

    state[node] = 1;

    for (const neighbor of graph[node]) {
      if (dfs(neighbor)) return true;
    }

    state[node] = 2;
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (dfs(i)) return true;
  }

  return false;
}
```

---

# 9. Connected Components

Har component ko ek BFS/DFS call se visit karo.

```javascript
function countComponents(n, graph) {
  const visited = new Set();
  let components = 0;

  function dfs(node) {
    visited.add(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      components++;
    }
  }

  return components;
}
```

**Grid components:**

- Har unvisited land/cell ko DFS/BFS se flood karo
- Har new call ek naya island/component

---

# 10. Topological Sort

<div style="background-color:#2d2d0d; padding:15px; border-radius:10px; border-left:5px solid #FFD700;">

Topological sort **only Directed Acyclic Graph** ke liye possible hai.

Rule: `A -> B` edge ke liye topological order mein A, B se pehle hoga.

```text
Courses:
A -> C
B -> C
C -> D

Possible:
A, B, C, D
B, A, C, D
```

## Kahn's Algorithm - indegree + BFS

```javascript
function topologicalSort(n, graph) {
  const indegree = new Array(n).fill(0);

  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) indegree[v]++;
  }

  const queue = [];

  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let head = 0;
  const result = [];

  while (head < queue.length) {
    const node = queue[head++];
    result.push(node);

    for (const neighbor of graph[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return result.length === n ? result : [];
}
```

**Cycle case:** Result length `n` se kam ho -> cycle present.

## DFS Topological Sort

Postorder complete hone ke baad node ko reverse stack mein push karo.

```javascript
function dfsTopological(n, graph) {
  const visited = new Array(n).fill(false);
  const result = [];

  function dfs(node) {
    visited[node] = true;

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }

    result.push(node);
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs(i);
  }

  return result.reverse();
}
```

</div>

---

# 11. Shortest Path Algorithms

| Graph | Algorithm |
|:---|:---|
| Unweighted | BFS |
| Weighted, non-negative | Dijkstra |
| Negative weights | Bellman-Ford |
| All pairs | Floyd-Warshall |
| 0/1 weighted | 0-1 BFS |

## BFS - unweighted

BFS naturally minimum edges return karta hai.

```javascript
// queue, visited and distance template from Section 10
```

## Dijkstra - non-negative weights

Min-heap se minimum tentative distance wala node nikalo.

```javascript
function dijkstra(n, start, graph) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  // [distance, node]
  const heap = [[0, start]];

  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [currentDistance, node] = heap.shift();

    if (currentDistance > dist[node]) continue;

    for (const [neighbor, weight] of graph[node]) {
      const nextDistance = currentDistance + weight;

      if (nextDistance < dist[neighbor]) {
        dist[neighbor] = nextDistance;
        heap.push([nextDistance, neighbor]);
      }
    }
  }

  return dist;
}
```

**Dijkstra ka rule:** Negative edge weight ho to Dijkstra use nahi hota.

## Bellman-Ford

Sab edges ko `V-1` rounds mein relax karo.

```javascript
function bellmanFord(n, edges, start) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  for (let i = 0; i < n - 1; i++) {
    let changed = false;

    for (const [u, v, weight] of edges) {
      if (dist[u] !== Infinity &&
          dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        changed = true;
      }
    }

    if (!changed) break;
  }

  return dist;
}
```

## Floyd-Warshall

All-pairs shortest path:

```javascript
function floydWarshall(dist) {
  const n = dist.length;

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(
          dist[i][j],
          dist[i][k] + dist[k][j]
        );
      }
    }
  }

  return dist;
}
```

**Time:** `O(V^3)`

---

# 12. Minimum Spanning Tree

MST ek connected weighted undirected graph ke subset edges ko represent karta hai:

- Sab vertices connect rahen
- Koi cycle na ho
- Total weight minimum ho
- Edge count = `V-1`

## Kruskal

1. Edges ko weight ascending mein sort karo
2. Smallest edge choose karo
3. Cycle ban raha ho to skip karo
4. `V-1` edges tak continue karo
5. Cycle detection ke liye DSU

## Prim

1. Kisi node se start karo
2. Visited aur unvisited ke beech minimum edge heap se lo
3. New node ko add karo
4. `V-1` edges tak repeat karo

| Algorithm | Data structure | Complexities |
|:---|:---|:---|
| Kruskal | DSU | `O(E log E)` |
| Prim | Heap | `O(E log V)` |

---

# 13. Union-Find / DSU

Disjoint sets ko efficiently manage karo:

- Find: node kis group mein hai
- Union: two groups ko merge karo

```javascript
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return false;

    if (this.size[rootA] < this.size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;
    this.size[rootA] += this.size[rootB];
    return true;
  }
}
```

**DSU use cases:**

- Cycle detection
- Number of provinces
- Redundant connection
- Kruskal MST
- Dynamic connected components

---

# 14. Bipartite Graph

Vertices ko two colors mein divide kar sakte hain aur har edge ke endpoints ka color different ho.

```text
Left             Right

A ----------------------------- C
|               |
|               |
B ----------------------------- D
```

```javascript
function isBipartite(graph) {
  const color = new Array(graph.length).fill(-1);

  for (let start = 0; start < graph.length; start++) {
    if (color[start] !== -1) continue;

    const queue = [start];
    color[start] = 0;
    let head = 0;

    while (head < queue.length) {
      const node = queue[head++];

      for (const neighbor of graph[node]) {
        if (color[neighbor] === -1) {
          color[neighbor] = 1 - color[node];
          queue.push(neighbor);
        } else if (color[neighbor] === color[node]) {
          return false;
        }
      }
    }
  }

  return true;
}
```

**Cycle rule:** Odd-length cycle -> graph bipartite nahi.

---

# 15. Grid ko Graph samjho

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

Har cell ek vertex hoti hai aur valid adjacent cells uske neighbors hote hain.

## 4 directions

```javascript
const directions = [[0,1],[0,-1],[1,0],[-1,0]];
```

## 8 directions

```javascript
const directions = [
  [-1,-1], [-1,0], [-1,1],
  [0,-1],           [0,1],
  [1,-1],  [1,0],  [1,1]
];
```

## Grid DFS template

```javascript
function dfsGrid(grid, row, col, visited) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (row < 0 || row >= rows ||
      col < 0 || col >= cols ||
      visited[row][col]) return;

  visited[row][col] = true;

  for (const [dr, dc] of directions) {
    dfsGrid(grid, row + dr, col + dc, visited);
  }
}
```

**Common patterns:**

| Problem | Pattern |
|:---|:---|
| Number of Islands | Component DFS/BFS |
| Flood Fill | Grid DFS |
| Rotting Oranges | Multi-source BFS |
| 01 Matrix | Multi-source BFS |
| Shortest Path in Binary Matrix | BFS |
| Pacific Atlantic | Reverse/multi-source traversal |
| Word Search | DFS with backtracking |

</div>

---

# 16. Multi-Source BFS

Multiple starting nodes ek saath queue mein daalo.

```javascript
function multiSourceBFS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let head = 0;
  const distance = Array.from(
    { length: rows },
    () => new Array(cols).fill(-1)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
        distance[r][c] = 0;
      }
    }
  }

  while (head < queue.length) {
    const [r, c] = queue[head++];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          distance[nr][nc] === -1) {
        distance[nr][nc] = distance[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return distance;
}
```

---

# 17. Graph Problem Decision Table

| Problem signal | Algorithm |
|:---|:---|
| Visit all nodes | DFS/BFS |
| Count components/islands | DFS/BFS/DSU |
| Minimum edges in unweighted graph | BFS |
| Negative cycle or negative weight | Bellman-Ford |
| All-pairs shortest path | Floyd-Warshall |
| Weighted shortest path, no negative | Dijkstra |
| Course prerequisite ordering | Topological Sort |
| Cycle in directed graph | 3-state DFS |
| Cycle in undirected graph | DFS parent / DSU |
| Minimum cost to connect nodes | MST |
| Two groups with opposite colors | Bipartite BFS/DFS |
| Dynamic grouping | DSU |
| Critical edges | Bridges/Tarjan |
| Strongly connected directed groups | Kosaraju/Tarjan |
| 0/1 edge weights | 0-1 BFS |

---

# 18. Must-Know Graph Problems

<div style="background-color:#1a1a2e; padding:15px; border-radius:10px; border-left:5px solid #9370DB;">

| Pattern | Examples |
|:---|:---|
| Traversal | Clone Graph, Number of Islands |
| Flood Fill | Flood Fill, Rotten Oranges |
| Connected components | Provinces, Islands |
| Cycle | Course Schedule, Redundant Connection |
| Topological sort | Course Schedule II, Alien Dictionary |
| BFS shortest path | Word Ladder, Binary Matrix |
| Dijkstra | Network Delay Time, Min Effort |
| Bellman-Ford | Cheapest Flights with Stops |
| DSU | Satisfiability of Equations |
| MST | Min Cost to Connect Points |
| Bipartite | Possible Bipartition |
| Bridges | Critical Connections in Network |
| SCC | Connected components in directed graph |

</div>

---

# 19. Common Mistakes

| Mistake | Correct approach |
|:---|:---|
| `visited` mark nahi karna | DFS/BFS ke entry/push par mark karo |
| Directed aur undirected edge confuse karna | Directed mein ek side, undirected mein both |
| Undirected cycle mein parent ignore karna | Parent ko separately pass karo |
| BFS push par visited miss karna | Push karte hi mark karo |
| Topological sort cycle check nahi karna | `result.length === n` verify karo |
| Dijkstra pe negative edges | Bellman-Ford use karo |
| Stale Dijkstra heap entry | `currentDistance > dist[node]` skip karo |
| Grid boundary miss karna | Row/column dono validate karo |
| DSU cycle miss karna | Same root means already connected |

---

# 20. Graph Solve Framework

<div style="background-color:#3d1a0d; padding:15px; border-radius:10px; border-left:5px solid #FF4500;">

```text
Step 1 - Graph type identify karo
        Directed / Undirected
        Weighted / Unweighted
        Cyclic / DAG
        Connected / Disconnected

Step 2 - Input ko graph mein convert karo
        Adjacency List
        Matrix
        Grid
        Edge list

Step 3 - State choose karo
        visited
        distance
        parent
        color
        indegree
        recursion state

Step 4 - Pattern choose karo
        BFS, DFS, Kahn, Dijkstra, DSU, MST

Step 5 - Chhote example par dry run karo
        3-5 nodes
        queue/stack state
        visited state
        result

Step 6 - Complexity aur edge cases verify karo
        Disconnected graph
        Empty graph
        Cycle
        Duplicate edges
        Self-loop
```

</div>

---

# 21. Final Revision Summary

<div style="background-color:#0d3320; padding:15px; border-radius:10px; border-left:5px solid #32CD32;">

> **Graph = vertices + edges**

> **Directed = direction; Weighted = edge cost**

> **DAG = directed aur acyclic; topological sort possible**

> **Adjacency list = sparse graph ka default**

> **BFS = queue = level/order = unweighted shortest path**

> **DFS = stack/recursion = cycle/components/deep exploration**

> **Topological sort = only DAG**

> **Dijkstra = weighted shortest path, non-negative**

> **Bellman-Ford = negative edges**

> **Floyd-Warshall = all-pairs**

> **MST = min cost spanning + all vertices**

> **DSU = groups + cycle + Kruskal**

> **Odd cycle = not bipartite**

</div>
