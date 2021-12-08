import { useEffect, useState } from "react";

import MazeRenderer from "./MazeComponent/MazeRenderer.js";

function createArrAdjMaze(adjList, dim, adjStack) {
  var numVerts = dim * dim;
  var arrMaze = new Array(numVerts);
  for (let i = 0; i < numVerts; i++) {
    arrMaze[i] = {
      index: i
    };
    arrMaze[i].top = adjList[i].includes(i - dim);
    arrMaze[i].right = adjList[i].includes(i + 1);
    arrMaze[i].bottom = adjList[i].includes(i + dim);
    arrMaze[i].left = adjList[i].includes(i - 1);
    if (adjStack.length > 0)
      arrMaze[i].color = adjStack[0].includes(i) ? "red" : "white";
  }
  return arrMaze;
}

/*
Deep Include Check
Credits to "Fullstack Guy"
https://stackoverflow.com/questions/64303074/check-if-an-array-includes-an-array-in-javascript
*/
const includesArray = (data, arr) => {
  return data.some(
    (e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o))
  );
};

function connect(graph, cellNumPast, cellNum, mouseType) {
  if (cellNum !== null && cellNumPast !== null) {
    if (
      cellNum + 1 !== cellNumPast &&
      cellNum - 1 !== cellNumPast &&
      cellNum + graph.dim !== cellNumPast &&
      cellNum - graph.dim !== cellNumPast
    ) {
      return;
    }
    if (mouseType === 1) {
      //Add Edges
      //Add to edge list
      if (
        !includesArray(graph.edgeList, [cellNumPast, cellNum]) &&
        !includesArray(graph.edgeList, [cellNum, cellNumPast])
      ) {
        graph.edgeList.push([cellNumPast, cellNum]);
        graph.edgeList.push([cellNum, cellNumPast]);
      }
      //Add to adjacency list
      if (
        !graph.adjList[cellNumPast].includes(cellNum) &&
        !graph.adjList[cellNum].includes(cellNumPast)
      ) {
        graph.adjList[cellNumPast].push(cellNum);
        graph.adjList[cellNum].push(cellNumPast);
      }
    }
    //Remove Edges
    if (mouseType === 2) {
      console.log(cellNum, cellNumPast);
      //Remove from edge list
      graph.edgeList = graph.edgeList.filter(
        (x) => x[0] !== cellNum || x[1] !== cellNumPast
      );
      graph.edgeList = graph.edgeList.filter(
        (x) => x[0] !== cellNumPast || x[1] !== cellNum
      );
      //Remove from adjacency list
      graph.adjList[cellNumPast] = graph.adjList[cellNumPast].filter(
        (x) => x !== cellNum
      );
      graph.adjList[cellNum] = graph.adjList[cellNum].filter(
        (x) => x !== cellNumPast
      );
    }
  }
}

function MazeComponent({ sizePx, graph, label, edit }) {
  const [cellNumPast, setCellNumPast] = useState(null);
  const [cellNum, setCellNum] = useState(null);
  const [mouseType, setMouseType] = useState(null);
  //stack coloring
  useEffect(() => {}, [graph.adjStack]);
  useEffect(() => {
    setCellNumPast(null);
    setCellNum(null);
  }, [graph]);

  //edge conencting
  useEffect(() => {
    setCellNumPast(cellNum);
    connect(graph, cellNumPast, cellNum, mouseType);
  }, [cellNum]);

  return (
    <MazeRenderer
      sizePx={sizePx}
      label={label}
      edit={edit}
      setCellNum={setCellNum}
      setMouseType={setMouseType}
      arrMaze={createArrAdjMaze(graph.adjList, graph.dim, graph.adjStack)}
    />
  );
}

export default MazeComponent;
