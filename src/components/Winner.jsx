import "./Winner.css";
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

const Winner = (props) => {
  const winning_message= () => {
    if(props.version === "ai") {
      return props.winner === "R" ? "You Won!" : "You Lost!";
    }
    else if(props.version === "random") {
      return props.winner === "R"
        ? "Random Agent Won!"
        : "AI Agent Won!";
    }
    else if(props.version === "aivsai") {
      return props.winner === "R"
        ? "Red AI Won!"
        : "Blue AI Won!";
    }
    else {
      return props.winner === "R"
        ? props.red_player_name + " Won!" || "Player 1 Won!"
        : props.blue_player_name + " Won!" || "Player 2 Won!";
    }
  }

  const link_to = () => {
    if (props.version === "ai") {
      return "/game/ai";
    } else if (props.version === "random") {
      return "/game/ai/random";
    } else if (props.version === "aivsai") {
      return "/game/ai/ai";
    } else {
      return "/twoplayer";
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
            <Link to={link_to()} className="winner-btn" onClick={() => props.set_game_id((prev) => prev + 1)}>
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
