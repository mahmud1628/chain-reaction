import "./PlayerTurn.css";

const PlayerTurn = (props) => {
  const red = (name, version) => {
    if(version === "ai") {
      return "Your turn";
    }
    else {
      return `${name || "Player 1"}'s Turn`;
    }
  }

  const blue = (name, version) => {
    if(version === "ai") {
      return "Waiting for AI's move";
    }
    else {
      return `${name || "Player 2"}'s Turn`;
    }
  }
  return (
    <div className="turn-float-box">
      <div
        key={props.current_player}
        className={`turn-indicator-content ${
          props.current_player === "R" ? "turn-red" : "turn-blue"
        }`}
      >
        {props.current_player === "R" ? (
          <>🔴 {red(props.player_names.R, props.version)}</>
        ) : (
          <>🔵 {blue(props.player_names.B, props.version)}</>
        )}
      </div>
    </div>
  );
};

export default PlayerTurn;
