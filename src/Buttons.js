import { useEffect } from "react";
import bfs from "./Algorithms/bfs";
import dijkstra from "./Algorithms/dijkstra";

function Buttons({ graph, setGraph }) {
  useEffect(() => {}, [graph.adjStack]);

  return (
    <div className="Buttons">
      <button onClick={() => dijkstra(graph, setGraph)}>dijkstra</button>
      <button onClick={() => bfs(graph, setGraph)}>bfs</button>
    </div>
  );
}

export default Buttons;
