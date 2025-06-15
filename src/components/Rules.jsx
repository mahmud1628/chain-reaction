import "./Rules.css"; // You can style this as needed
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

const Rules = () => {
  return (
    <>
      <Link to="/" className="exit-button">
        ⬅ Back to Main Menu
      </Link>
      <div className="rules-container">
        <h1 className="rules-title">📜 Game Rules: Chain Burst</h1>

        <div className="rule-section">
          <h2>🎯 Objective</h2>
          <p>
            Take control of the entire board by eliminating your opponent’s
            orbs.
          </p>
        </div>

        <div className="rule-section">
          <h2>🧩 Game Board</h2>
          <p>
            The board is a grid of <strong>9 rows × 6 columns</strong>. Each
            cell can contain orbs.
          </p>
        </div>

        <div className="rule-section">
          <h2>🔴🟦 Players</h2>
          <p>
            Two players take turns. Each orb belongs to a player — Red (🔴) or
            Blue (🔵).
          </p>
        </div>

        <div className="rule-section">
          <h2>➕ Adding Orbs</h2>
          <p>
            You can place an orb on an <strong>empty cell</strong> or on a cell
            that <strong>already contains your orbs</strong>.
          </p>
        </div>

        <div className="rule-section">
          <h2>💥 Explosions</h2>
          <p>
            Each cell has a <strong>critical mass</strong>:
            <ul>
              <li>📍 Corners: 2</li>
              <li>🧱 Edges: 3</li>
              <li>🔲 Center: 4</li>
            </ul>
            When the number of orbs in a cell exceeds the critical mass, it
            explodes and sends one orb to each adjacent cell.
          </p>
        </div>

        <div className="rule-section">
          <h2>🔁 Chain Reactions</h2>
          <p>
            Explosions can cause <strong>chain reactions</strong> in neighboring
            cells. During explosions, affected cells are converted to the
            exploding player's color.
          </p>
        </div>

        <div className="rule-section">
          <h2>🏆 Winning</h2>
          <p>
            A player wins when the opponent has <strong>no orbs left</strong> on
            the board.
          </p>
        </div>
      </div>
    </>
  );
};

export default Rules;
