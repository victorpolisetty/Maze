export default function bfs(graph, setGraph) {
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

  function pop() {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack.slice(1, graph.adjStack.length)]
    });
    graph.adjStack = [...graph.adjStack.slice(1, graph.adjStack.length)];
  }

  function front() {
    return graph.adjStack[0];
  }

  //Algorithm Start
  let visited = new Array(graph.dim * graph.dim);
  for (let i = 0; i < visited.length; ++i) visited[i] = false;

  clear();

  visited[0] = true;
  push([0]);

  let qpath = [];
  qpath.push(0);

  while (graph.adjStack.length !== 0) {
    let s = qpath[0];
    qpath = qpath.slice(1, qpath.length);

    let path = front();
    pop();
    let node = path[path.length - 1];
    if (node === graph.dim * graph.dim - 1) {
      clear();
      push(path);
      break;
    }
    for (var i = 0; i < graph.adjList[s].length; i++) {
      if (!visited[graph.adjList[s][i]]) {
        visited[graph.adjList[s][i]] = true;
        qpath.push(graph.adjList[s][i]);

        push([...path, graph.adjList[s][i]]);
      }
    }
  }
  console.log(graph);
}
