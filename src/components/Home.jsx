import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Chain Burst</h1>
        <div className="home-buttons">
          <Link to="/twoplayer" className="home-btn">
            🔴 Play 2-Player
          </Link>
          <Link to="/game/ai" className="home-btn">
            🤖 Play with AI
          </Link>
          <Link to="/game/rules" className="home-btn">
            📘 Game Rules
          </Link>
          <Link to="/game/ai/random" className="home-btn">
            🎲 Random vs AI
          </Link>
          <Link to="/game/ai/ai" className="home-btn">
            🎲 AI vs AI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
