import Cell from "./Cell.js";

function MazeRenderer({
  sizePx,
  arrMaze,
  label,
  setCellNum,
  edit,
  setMouseType
}) {
  let container = {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    border: edit ? "solid 4px red" : "solid 4px black"
  };
  container.width = sizePx + "px";
  container.height = sizePx + "px";

  return (
    <div style={container}>
      {arrMaze.map((cell) => (
        <Cell
          key={cell.index}
          label={label}
          cell={cell}
          edit={edit}
          setCellNum={setCellNum}
          setMouseType={setMouseType}
          size={sizePx / Math.sqrt(arrMaze.length)}
        />
      ))}
    </div>
  );
}

export default MazeRenderer;
