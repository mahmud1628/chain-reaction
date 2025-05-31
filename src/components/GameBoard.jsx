import React from 'react';
import './GameBoard.css'; // Importing styles for the game board

const ROWS = 9;
const COLS = 6;


const GameBoard = () => {
  return (
    <div className="board">
      {Array.from({ length: ROWS }).map((_, rowIdx) => (
        <div key={rowIdx} className="board-row">
          {Array.from({ length: COLS }).map((_, colIdx) => (
            <div key={colIdx} className="cell">
              {/* TODO: Add orbs by clicking the cells */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;