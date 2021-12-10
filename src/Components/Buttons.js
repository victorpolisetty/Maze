import { useEffect } from "react";
import bfs from "../Algorithms/bfs";
import dijkstra from "../Algorithms/dijkstra";
import Gators from "../Mazes/Gators";

function Buttons({
  sizePx,
  graph,
  input,
  edit,
  label,
  setGraph,
  setLoading,
  setInput,
  toggleEdit,
  toggleLabel,
  generateBlank
}) {
  useEffect(() => {
    console.log(graph);
  }, [graph.adjStack, graph.bfsAdjTime]);

  return (
    <div className="Side" style={{ height: sizePx - 40 }}>
      <div className="sidetext">Modify Maze</div>
      <div>
        <label className="subtext">Maze Size:</label>
        <input
          value={input}
          type="number"
          min="1"
          max="50"
          onInput={(e) => {
            if (parseInt(e.target.value, 10) > 50) {
              e.target.value = 50;
            }
            setInput(parseInt(e.target.value, 10) || "");
          }}
        />
        <button onClick={() => toggleLabel(!label)}>Show Indices</button>
        <button onClick={() => toggleEdit(!edit)}>Edit Maze</button>
      </div>
      {edit ? (
        <div>
          <div className="subtext">Right Click Drag: Make Path</div>
          <div className="subtext">Left Click Drag: Block Path</div>
        </div>
      ) : (
        ""
      )}
      <div className="sidetext">Load Maze</div>
      <div>
        <button
          onClick={() => {
            setGraph(JSON.parse(JSON.stringify(Gators)));
            setLoading(true);
            setInput(Gators.dim);
          }}
        >
          Gator Maze
        </button>
        <button onClick={() => setGraph(generateBlank(input))}>
          Blank Maze
        </button>
      </div>
      <div className="sidetext">Solve</div>
      <div>
        <button onClick={() => dijkstra(graph, setGraph)}>Dijkstra</button>
        <button onClick={() => bfs(graph, setGraph)}>BFS</button>
      </div>

      <div className="sidetext">Timing</div>
      <br />
      <div className="subtext">BFS Algorithm</div>
      <div className="listtext">
        Path Length: {graph.bfsLength ? graph.bfsLength : ""}
      </div>
      <div className="listtext">Adjacency List Time (ms):</div>
      {graph.bfsAdjTime ? (
        <div className="listtext">{graph.bfsAdjTime}</div>
      ) : (
        ""
      )}
      <div className="listtext">Edge List Time (ms):</div>
      {graph.bfsEdgeTime ? (
        <div className="listtext">{graph.bfsEdgeTime}</div>
      ) : (
        ""
      )}
      <br />
      <div className="subtext">Dijkstra's Algorithm</div>
      <div className="listtext">
        Path Length: {graph.dijkstraLength ? graph.dijkstraLength : ""}
      </div>

      <div className="listtext">Adjacency List Time (ms):</div>
      {graph.dijkstraAdjTime ? (
        <div className="listtext">{graph.dijkstraAdjTime}</div>
      ) : (
        ""
      )}
      <div className="listtext">Edge List Time (ms):</div>
      {graph.dijkstraEdgeTime ? (
        <div className="listtext">{graph.dijkstraEdgeTime}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Buttons;
