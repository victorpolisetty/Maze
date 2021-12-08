import { useEffect, useState } from "react";

import MazeComponent from "./MazeComponent";
import Buttons from "./Buttons";
import {
  generateMaze,
  generateBlankMaze,
  mazeAdjacencyListBuilder,
  mazeEdgeListBuilder
} from "./newMaze";
import Gators from "./Gators";

import "./styles.css";

export default function App() {
  const [input, setInput] = useState(9);
  const [label, toggleLabel] = useState(false);
  const [edit, toggleEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  function generateGraph(input) {
    let baseGraph = {};
    baseGraph.dim = input ? input : 1;
    baseGraph.maze = generateMaze(baseGraph.dim);
    baseGraph.adjList = mazeAdjacencyListBuilder(baseGraph.maze, baseGraph.dim);
    baseGraph.edgeList = mazeEdgeListBuilder(baseGraph.maze, baseGraph.dim);
    baseGraph.adjStack = [];
    return baseGraph;
  }

  function generateBlank(input) {
    let baseGraph = {};
    baseGraph.dim = input ? input : 1;
    baseGraph.maze = generateBlankMaze(baseGraph.dim);
    baseGraph.adjList = mazeAdjacencyListBuilder(baseGraph.maze, baseGraph.dim);
    baseGraph.edgeList = mazeEdgeListBuilder(baseGraph.maze, baseGraph.dim);
    baseGraph.adjStack = [];
    return baseGraph;
  }

  const [graph, setGraph] = useState(generateGraph(input));
  useEffect(() => {
    if (!loading) setGraph(generateGraph(input));
    setLoading(false);
  }, [input]);

  //make edges of corners

  return (
    <div className="App">
      <h2>Maze!</h2>
      <div className="dual">
        <div>
          <MazeComponent sizePx={400} graph={graph} label={label} edit={edit} />
          <label>Maze Size:</label>
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
          <button onClick={() => toggleLabel(!label)}>Show Numbers</button>
        </div>
        <div>
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
            <button onClick={() => toggleEdit(!edit)}>Edit Maze</button>
          </div>
          <Buttons graph={graph} setGraph={setGraph} />
        </div>
      </div>
    </div>
  );
}
