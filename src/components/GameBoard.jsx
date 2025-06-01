import React, { useState } from "react";
import "./GameBoard.css"; // Importing styles for the game board
import Orbs from "./Orbs"; // Importing the Orbs component to display orbs in each cell

import {
  create_initial_board,
  is_valid_move,
  update_cell,
  generate_chain_explosion,
  get_critical_mass,
} from "./GameLogics";

const ROWS = 9;
const COLS = 6;

const GameBoard = () => {
  // State to hold the game board
  const [board, setBoard] = useState(create_initial_board(ROWS, COLS));
  // State to hold the current player
  const [currentPlayer, setCurrentPlayer] = useState("R"); // Player 1 plays with red orbs, Player 2 with blue orbs

  const [explodingCells, setExplodingCells] = useState([]);

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "R" ? "B" : "R");
  };

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    if (!is_valid_move(cell, currentPlayer)) return; // Check if the move is valid

    update_cell(
      board,
      rowIndex,
      colIndex,
      currentPlayer,
      ROWS,
      COLS,
      updateBoard,
      setExplodingCells
    );

    switchPlayer(); // Switch players
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${
                explodingCells.some(
                  ([r, c]) => r === rowIndex && c === colIndex
                )
                  ? "pulse"
                  : ""
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <Orbs count={cell.count} color={cell.color} row={rowIndex} col={colIndex} ROWS={ROWS} COLS={COLS} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
