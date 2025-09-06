import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./GridSizeInput.css";

const GridSizeInput = ({ setGridSize }) => {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(6);
  const [isHovered, setIsHovered] = useState(false);
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
        <div className="header-section">
          <h2>🎯 Configure BattleField</h2>
          <p className="grid-size-subtitle">
            {isAIGame ? "🤖 Battle With AI" : "👥 Two Player Duel"}
          </p>
        </div>
        
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="rows">
              <span className="label-icon">📏</span>
              Rows <span className="range">(5-9)</span>
            </label>
            <div className="input-wrapper">
              <input
                id="rows"
                type="number"
                min="5"
                max="9"
                value={rows}
                onChange={handleRowChange}
                className="size-input"
              />
              <div className="input-stepper">
                <button 
                  type="button" 
                  onClick={() => setRows(Math.min(9, rows + 1))}
                  className="stepper-btn"
                >+</button>
                <button 
                  type="button" 
                  onClick={() => setRows(Math.max(5, rows - 1))}
                  className="stepper-btn"
                >-</button>
              </div>
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="cols">
              <span className="label-icon">📐</span>
              Columns <span className="range">(4-6)</span>
            </label>
            <div className="input-wrapper">
              <input
                id="cols"
                type="number"
                min="4"
                max="6"
                value={cols}
                onChange={handleColChange}
                className="size-input"
              />
              <div className="input-stepper">
                <button 
                  type="button" 
                  onClick={() => setCols(Math.min(6, cols + 1))}
                  className="stepper-btn"
                >+</button>
                <button 
                  type="button" 
                  onClick={() => setCols(Math.max(4, cols - 1))}
                  className="stepper-btn"
                >-</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid-preview">
          <p className="preview-title">
            🎮 Grid Preview: {rows} × {cols}
          </p>
          <div className="mini-grid">
            {Array.from({ length: Math.min(rows, 5) }, (_, r) => (
              <div key={r} className="mini-row">
                {Array.from({ length: Math.min(cols, 6) }, (_, c) => (
                  <div key={c} className="mini-cell" style={{
                    animationDelay: `${(r * cols + c) * 0.1}s`
                  }}></div>
                ))}
              </div>
            ))}
            {rows > 5 && <div className="dots">⋮</div>}
          </div>
        </div>
        
        <div className="grid-size-buttons">
          <Link to="/" className="grid-size-btn back-btn">
            ⬅ Back
          </Link>
          <button 
            onClick={handleContinue} 
            className="grid-size-btn continue-btn"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? "🚀 Start Battle!" : "Continue ➡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridSizeInput;
