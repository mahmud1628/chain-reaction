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

  const [move_count, set_move_count] = useState(0);

  const [red_cell_count, set_red_cell_count] = useState(0);
  const [blue_cell_count, set_blue_cell_count] = useState(0);

  const [winner, set_winner] = useState(null);

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "R" ? "B" : "R");
  };

  const update_board = (new_board) => {
    setBoard(new_board);
  };

  const increment_move_count = () => {
    set_move_count(move_count + 1);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    if (!is_valid_move(cell, currentPlayer) || winner !== null) return; // Check if the move is valid

    increment_move_count();

    update_cell(
      board,
      rowIndex,
      colIndex,
      currentPlayer,
      ROWS,
      COLS,
      update_board,
      setExplodingCells,
      red_cell_count,
      blue_cell_count,
      set_red_cell_count,
      set_blue_cell_count
    ).then((is_game_over) => {
      if (is_game_over) {
        setTimeout(() => {
          set_winner(currentPlayer);
        }, 400);
        console.log("Game Over! Player " + currentPlayer + " wins!");
      }
    });

    switchPlayer(); // Switch players
  };

  return (
    <div className="game-container">
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
                <Orbs
                  count={cell.count}
                  color={cell.color}
                  row={rowIndex}
                  col={colIndex}
                  ROWS={ROWS}
                  COLS={COLS}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {winner && (
        <div className="overlay">
          <div className="winner-box">
            <h2 className="winner-text">
              🎉 {winner === "R" ? "Player 1" : "Player 2"} Won!
            </h2>
            <div className="winner-buttons">
              <button className="winner-btn">Play Again</button>
              <button className="winner-btn">Back to Main Menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
