import React, { useState } from "react";
import "./GameBoard.css"; // Importing styles for the game board
import Orbs from "./Orbs"; // Importing the Orbs component to display orbs in each cell

import { create_initial_board, is_valid_move, update_cell, generate_chain_explosion } from "./GameLogics";

const ROWS = 9;
const COLS = 6;

const GameBoard = () => {

    // State to hold the game board
  const [board, setBoard] = useState(create_initial_board(ROWS, COLS));
  // State to hold the current player
  const [currentPlayer, setCurrentPlayer] = useState("R"); // Player 1 plays with red orbs, Player 2 with blue orbs

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "R" ? "B" : "R");
  }

  const handleCellClick = (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    if(!is_valid_move(cell, currentPlayer)) return; // Check if the move is valid

    const newBoard = update_cell(board, rowIndex, colIndex, currentPlayer, ROWS, COLS);

    setBoard(newBoard);
    // if(newBoard[rowIndex][colIndex].count === get_critical_mass(rowIndex, colIndex, ROWS, COLS)) {
    //   generate_chain_explosion(newBoard, rowIndex, colIndex, currentPlayer, ROWS, COLS);
    //   setBoard(newBoard);
    // }
    switchPlayer(); // Switch players
  };

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
