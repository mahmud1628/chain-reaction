import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DifficultySelection.css";

const DifficultySelection = ({ setDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const difficulties = [
    {
      id: "easy",
      name: "Easy",
      emoji: "🟢",
      description: "Perfect for beginners",
      color: "#4ade80",
      value: 1
    },
    {
      id: "intermediate",
      name: "Intermediate", 
      emoji: "🟡",
      description: "Balanced challenge",
      color: "#fbbf24",
      value: 2
    },
    {
      id: "hard",
      name: "Hard",
      emoji: "�",
      description: "For experienced players",
      color: "#ef4444",
      value: 3
    }
  ];

  const handleContinue = () => {
    const selectedDifficultyObj = difficulties.find(d => d.id === selectedDifficulty);
    setDifficulty(selectedDifficultyObj.value);
    navigate("/game/ai");
  };

  const handleDifficultySelect = (difficultyId) => {
    setSelectedDifficulty(difficultyId);
  };

  return (
    <div className="difficulty-container">
      <div className="difficulty-box">
        <div className="header-section">
          <h2>🎯 Select AI Difficulty</h2>
          <p className="difficulty-subtitle">
            🤖 Choose your challenge level
          </p>
        </div>
        
        <div className="difficulty-options">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              className={`difficulty-option ${
                selectedDifficulty === difficulty.id ? "selected" : ""
              }`}
              onClick={() => handleDifficultySelect(difficulty.id)}
            >
              <div className="difficulty-emoji">{difficulty.emoji}</div>
              <div className="difficulty-info">
                <h3 className="difficulty-name">{difficulty.name}</h3>
                <p className="difficulty-description">{difficulty.description}</p>
              </div>
              <div className="difficulty-indicator">
                {selectedDifficulty === difficulty.id && "✓"}
              </div>
            </div>
          ))}
        </div>
        
        <div className="difficulty-buttons">
          <Link to="/grid-size/ai" className="difficulty-btn back-btn">
            ⬅ Back
          </Link>
          <button 
            onClick={handleContinue} 
            className="difficulty-btn continue-btn"
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

export default DifficultySelection;
