import PriorityQueue from "js-priority-queue";

function dijkstraAdjList(graph, setGraph) {
  function clear() {
    setGraph({
      ...graph,
      adjStack: []
    });
    graph.adjStack = [];
  }

  function push(val) {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack, val]
    });
    graph.adjStack = [...graph.adjStack, val];
  }

  //Algorithm Start
  clear();
  let size = graph.dim * graph.dim;
  let dist = new Array(size);
  let prev = new Array(size);

  let pq = new PriorityQueue();

  dist[0] = 0;
  prev[0] = -1;
  for (let i = 0; i < size; ++i) {
    if (i !== 0) {
      dist[i] = Number.MAX_VALUE;
      prev[i] = -1;
    }
    pq.queue(i);
  }

  while (pq.length !== 0) {
    let u = pq.dequeue();
    for (let i = 0; i < graph.adjList[u].length; i++) {
      let v = graph.adjList[u][i];
      let alt = dist[u] + 1;
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
        pq.queue(v);
      }
    }
  }

  let end = size - 1;
  let cur = end;
  let path = [];
  while (cur >= 0) {
    path.push(cur);
    cur = prev[cur];
  }
  push(path);
}

function dijkstraEdgeList(graph, setGraph) {
  function clear() {
    setGraph({
      ...graph,
      adjStack: []
    });
    graph.adjStack = [];
  }

  function push(val) {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack, val]
    });
    graph.adjStack = [...graph.adjStack, val];
  }

  //Algorithm Start
  clear();
  let size = graph.dim * graph.dim;
  let dist = new Array(size);
  let prev = new Array(size);

  let pq = new PriorityQueue();

  dist[0] = 0;
  prev[0] = -1;
  for (let i = 0; i < size; ++i) {
    if (i !== 0) {
      dist[i] = Number.MAX_VALUE;
      prev[i] = -1;
    }
    pq.queue(i);
  }

  while (pq.length !== 0) {
    let u = pq.dequeue();
    for (let i = 0; i < graph.edgeList.length; i++) {
      if (graph.edgeList[i][0] === u) {
        let v = graph.edgeList[i][1];
        let alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
          pq.queue(v);
        }
      }
    }
  }

  //construct path
  let end = size - 1;
  let cur = end;
  let path = [];
  while (cur >= 0) {
    path.push(cur);
    cur = prev[cur];
  }
  push(path);
}

export default function dijkstra(graph, setGraph) {
  var startTimeAdj = performance.now();
  dijkstraAdjList(graph, setGraph);
  var endTimeAdj = performance.now();

  var startTimeEdge = performance.now();
  dijkstraEdgeList(graph, setGraph);
  var endTimeEdge = performance.now();

  setGraph({
    ...graph,
    dijkstraAdjTime: endTimeAdj - startTimeAdj,
    dijkstraEdgeTime: endTimeEdge - startTimeEdge
  });
}
