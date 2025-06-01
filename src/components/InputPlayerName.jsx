// src/components/PlayerSetup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./InputPlayerName.css";

const InputPlayerName = ({set_player_names}) => {
  const [player1_name, set_player1_name] = useState("");
  const [player2_name, set_player2_name] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (player1_name.trim() && player2_name.trim()) {
      set_player_names({ R: player1_name, B: player2_name });
      navigate("/game");
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-box">
        <h2>🧑‍🤝‍🧑 Enter Player Names</h2>
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1_name}
          onChange={(e) => set_player1_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2_name}
          onChange={(e) => set_player2_name(e.target.value)}
        />
        <div className="setup-buttons">
          <Link to="/" className="setup-btn">Back</Link>
          <button onClick={handleContinue} className="setup-btn">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default InputPlayerName;
