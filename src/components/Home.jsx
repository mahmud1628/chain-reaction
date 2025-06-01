import "./Home.css";
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Chain Reaction</h1>
        <div className="home-buttons">
          <Link to = "/twoplayer" className="home-btn">
            🔴 Play 2-Player
          </Link>
          <Link to = "/" className="home-btn">
            🤖 Play with Computer
          </Link>
          <Link to = "/" className="home-btn">
            📘 Game Rules
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
