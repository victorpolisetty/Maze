import { useEffect } from "react";
import bfs from "./Algorithms/bfs";
import dijkstra from "./Algorithms/dijkstra";

function Buttons({ graph, setGraph }) {
  useEffect(() => {}, [graph.adjStack]);

  // function dijkstra() {
  //   //queue functions
  //   function clear() {
  //     setGraph({
  //       ...graph,
  //       adjStack: []
  //     });
  //     graph.adjStack = [];
  //   }

  //   function push(val) {
  //     setGraph({
  //       ...graph,
  //       adjStack: [...graph.adjStack, val]
  //     });
  //     graph.adjStack = [...graph.adjStack, val];
  //   }

  //   function pop() {
  //     setGraph({
  //       ...graph,
  //       adjStack: [...graph.adjStack.slice(1, graph.adjStack.length)]
  //     });
  //     graph.adjStack = [...graph.adjStack.slice(1, graph.adjStack.length)];
  //   }

  //   function front() {
  //     return graph.adjStack[0];
  //   }

  //   const includesArray = (data, arr) => {
  //     return data.some(
  //       (e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o))
  //     );
  //   };

  //   graph.adjStack = [];
  //   graph.adjStack;

  //   let vistied = [];
  //   vistied.push();
  //   vistied.includes();

  //   graph.adjList;
  // }

  return (
    <div className="Buttons">
      <button onClick={() => dijkstra(graph, setGraph)}>dijkstra</button>
      <button onClick={() => bfs(graph, setGraph)}>bfs</button>
    </div>
  );
}

export default Buttons;
