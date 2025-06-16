import "./Start.css";
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

const Start = (props) => {
  return (
    props.current_player == "N" && (
      <div className="overlay">
        <div className="winner-box">
                      <h2 className="winner-text">
            Start game
          </h2>
          <div className="winner-buttons">
            <Link to="#"className="winner-btn" onClick={() => props.set_current_player("R")}>
              Start
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

export default Start;
