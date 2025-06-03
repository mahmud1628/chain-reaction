import "./PlayerTurn.css";

const PlayerTurn = (props) => {
  return (
    <div className="turn-float-box">
      <div
        key={props.current_player}
        className={`turn-indicator-content ${
          props.current_player === "R" ? "turn-red" : "turn-blue"
        }`}
      >
        {props.current_player === "R" ? (
          <>🔴 {props.player_names.R || "Player 1"}'s Turn</>
        ) : (
          <>🔵 {props.player_names.B || "Player 2"}'s Turn</>
        )}
      </div>
    </div>
  );
};

export default PlayerTurn;
