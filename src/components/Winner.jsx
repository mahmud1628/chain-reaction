import "./Winner.css";
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

const Winner = (props) => {
  return (
    props.winner && (
      <div className="overlay">
        <div className="winner-box">
          <h2 className="winner-text">
            🎉{" "}
            {props.winner === "R"
              ? props.red_player_name
              : props.blue_player_name}{" "}
            Won!
          </h2>
          <div className="winner-buttons">
            <Link to="/twoplayer" className="winner-btn">
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
