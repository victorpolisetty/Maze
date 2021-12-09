import Cell from "./Cell.js";

function MazeRenderer({
  sizePx,
  arrMaze,
  label,
  setCellNum,
  edit,
  setMouseType
}) {
  let container = {};
  container.width = sizePx + "px";
  container.height = sizePx + "px";
  container.border = edit ? "solid 4px red" : "solid 4px black";

  return (
    <div style={container} className="mazeBorder">
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
