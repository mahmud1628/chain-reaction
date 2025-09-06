import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./GridSizeInput.css";

const GridSizeInput = ({ setGridSize }) => {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(6);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're setting up for AI or 2-player game
  const isAIGame = location.pathname.includes('/ai');

  const handleContinue = () => {
    if (rows >= 5 && rows <= 9 && cols >= 4 && cols <= 6) {
      setGridSize({ rows, cols });
      if (isAIGame) {
        navigate("/game/ai");
      } else {
        navigate("/twoplayer");
      }
    }
  };

  const handleRowChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 5 && value <= 9) {
      setRows(value);
    }
  };

  const handleColChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 4 && value <= 6) {
      setCols(value);
    }
  };

  return (
    <div className="grid-size-container">
      <div className="grid-size-box">
        <h2>🎯 Select Grid Size</h2>
        <p className="grid-size-subtitle">
          {isAIGame ? "Playing with AI" : "2-Player Game"}
        </p>
        
        <div className="input-group">
          <label htmlFor="rows">Rows (5-9):</label>
          <input
            id="rows"
            type="number"
            min="5"
            max="9"
            value={rows}
            onChange={handleRowChange}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="cols">Columns (4-6):</label>
          <input
            id="cols"
            type="number"
            min="4"
            max="6"
            value={cols}
            onChange={handleColChange}
          />
        </div>
        
        <div className="grid-preview">
          <p>Grid Preview: {rows} × {cols}</p>
          <div className="mini-grid">
            {Array.from({ length: Math.min(rows, 5) }, (_, r) => (
              <div key={r} className="mini-row">
                {Array.from({ length: Math.min(cols, 6) }, (_, c) => (
                  <div key={c} className="mini-cell"></div>
                ))}
              </div>
            ))}
            {rows > 5 && <div className="dots">...</div>}
          </div>
        </div>
        
        <div className="grid-size-buttons">
          <Link to="/" className="grid-size-btn">Back</Link>
          <button onClick={handleContinue} className="grid-size-btn">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default GridSizeInput;
