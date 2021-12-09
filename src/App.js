import { useEffect, useState } from "react";

import MazeComponent from "./Components/MazeComponent";
import Buttons from "./Components/Buttons";
import Info from "./Components/Info";
import useWindowDimensions from "./useWindowDimensions";
import Title from "./Components/Title";
import {
  generateMaze,
  generateBlankMaze,
  mazeAdjacencyListBuilder,
  mazeEdgeListBuilder
} from "./MazeComponent/newMaze";

import "./styles.css";

export default function App() {
  const [input, setInput] = useState(16);
  const [label, toggleLabel] = useState(false);
  const [edit, toggleEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const { height, width } = useWindowDimensions();

  const [graph, setGraph] = useState(generateGraph(input));
  useEffect(() => {
    if (!loading) setGraph(generateGraph(input));
    setLoading(false);
  }, [input]);

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

  return (
    <div className="App">
      <Title />
      <div className="dual">
        <div>
          <Info sizePx={width * 0.4} />
        </div>
        <div className="maze">
          <MazeComponent
            sizePx={width * 0.4}
            graph={graph}
            label={label}
            edit={edit}
          />
        </div>
        <div>
          <Buttons
            sizePx={width * 0.4}
            graph={graph}
            input={input}
            edit={edit}
            label={label}
            setGraph={setGraph}
            setLoading={setLoading}
            setInput={setInput}
            toggleEdit={toggleEdit}
            toggleLabel={toggleLabel}
            generateBlank={generateBlank}
          />
        </div>
      </div>
    </div>
  );
}
