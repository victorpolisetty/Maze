function Cell({ label, cell, edit, setCellNum, setMouseType, size }) {
  let s = "  ";
  s += cell.top ? "" : "inset 0px 2px, ";
  s += cell.right ? "" : "inset -2px 0px, ";
  s += cell.bottom ? "" : "inset 0px -2px, ";
  s += cell.left ? "" : "inset 2px 0px, ";

  let test = {
    boxShadow: s.slice(0, -2),
    height: size + 2 + "px",
    width: size + 2 + "px",
    margin: "-1px",
    backgroundColor: cell.color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10
  };
  let debug = {
    boxShadow: s.slice(0, -2),
    height: size + -2 + "px",
    width: size + -2 + "px",
    margin: "1px",
    backgroundColor: cell.color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10
  };
  return (
    <div
      style={test}
      onPointerMoveCapture={(e) => {
        if (e.pressure > 0 && edit) {
          setCellNum(cell.index);
          setMouseType(e.buttons);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className="unselectable"
    >
      {label ? cell.index : ""}
    </div>
  );
}

export default Cell;
