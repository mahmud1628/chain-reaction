import "./Winner.css";
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

const Winner = (props) => {
  const winning_message= () => {
    if(props.version === "ai") {
      return props.winner === "R" ? "You Won!" : "You Lost!";
    }
    else {
      return props.winner === "R"
        ? props.red_player_name + " Won!" || "Player 1 Won!"
        : props.blue_player_name + " Won!" || "Player 2 Won!";
    }
  }
  return (
    props.winner && (
      <div className="overlay">
        <div className="winner-box">
          <h2 className="winner-text">
            🎉{" "}
            {winning_message()}
          </h2>
          <div className="winner-buttons">
            <Link to={props.version === "ai" ? "/grid-size/ai" : "/grid-size/twoplayer"} className="winner-btn" onClick={() => props.set_game_id((prev) => prev + 1)}>
              Play Again
            </Link>
            <Link to="/" className="winner-btn">
              Back to Main Menu
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Winner;
