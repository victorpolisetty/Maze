import logo from "../Assets/logo.png";

function Info({ sizePx }) {
  return (
    <div className="Side" style={{ height: sizePx - 40 }}>
      <img src={logo} alt="logo" width="240" />
      <br />
      <br />
      <div className="sidetext">COP 3530 Final Project</div>
      <div className="subtext">Group 8</div>
      <div>
        <li className="listtext">Ryan Circelli</li>
        <li className="listtext">Victor Polisetty</li>
        <li className="listtext">Nick Borowski</li>
      </div>
    </div>
  );
}

export default Info;
