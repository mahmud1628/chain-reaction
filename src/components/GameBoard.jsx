import React, { useState } from "react";
import "./GameBoard.css"; // Importing styles for the game board
import Orbs from "./Orbs"; // Importing the Orbs component to display orbs in each cell

const ROWS = 9;
const COLS = 6;

const GameBoard = () => {
  const createInitialBoard = () =>
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        count: 0,
        color: null,
      }))
    );

  const handleCellClick = (rowIndex, colIndex) => {
    const newBoard = [...board];
    const cell = newBoard[rowIndex][colIndex];
    if (cell.color !== null && cell.color !== currentPlayer) {
      return; // ignore cells occupied by the opponent
    }

    newBoard[rowIndex][colIndex] = {
      count: cell.count + 1,
      color: currentPlayer,
    };
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "R" ? "B" : "R"); // Switch players
  };

  // State to hold the game board
  const [board, setBoard] = useState(createInitialBoard());
  // State to hold the current player
  const [currentPlayer, setCurrentPlayer] = useState("R"); // Player 1 plays with red orbs, Player 2 with blue orbs

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <Orbs count={cell.count} color={cell.color} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
