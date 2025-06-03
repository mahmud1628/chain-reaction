import React, { useState } from "react";
import "./GameBoard.css"; // Importing styles for the game board
import Orbs from "./Orbs"; // Importing the Orbs component to display orbs in each cell
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

import {
  create_initial_board,
  is_valid_move,
  update_cell,
  generate_chain_explosion,
  get_critical_mass,
} from "./GameLogics";

const ROWS = 9;
const COLS = 6;

const GameBoard = ({ player_names }) => {
  // State to hold the game board
  const [board, setBoard] = useState(create_initial_board(ROWS, COLS));
  // State to hold the current player
  const [currentPlayer, setCurrentPlayer] = useState("R"); // Player 1 plays with red orbs, Player 2 with blue orbs

  const [explodingCells, setExplodingCells] = useState([]);

  const [move_count, set_move_count] = useState(0);

  const [red_cell_count, set_red_cell_count] = useState(0);
  const [blue_cell_count, set_blue_cell_count] = useState(0);

  const [winner, set_winner] = useState(null);

  const red_player_name = player_names.R || "Player 1";
  const blue_player_name = player_names.B || "Player 2";
  let winner_name = "";

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "R" ? "B" : "R");
  };

  const update_board = (new_board) => {
    setBoard(new_board);
  };

  const increment_move_count = () => {
    set_move_count(move_count + 1);
  };

  const handleCellClick = async (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    if (!is_valid_move(cell, currentPlayer) || winner !== null) return; // Check if the move is valid

    increment_move_count();

    await update_cell(
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
        winner_name =
          currentPlayer === "R" ? red_player_name : blue_player_name;
        setTimeout(() => {
          set_winner(currentPlayer);
        }, 400);
      }
    });

    switchPlayer(); // Switch players
  };

  return (
    <div className="game-container">
      <Link to="/" className="back-btn">
        ⬅️ Back to Main Menu
      </Link>

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
              🎉 {winner === "R" ? red_player_name : blue_player_name} Won!
            </h2>
            <div className="winner-buttons">
              <Link to="/twoplayer" className="winner-btn">
                Play Again
              </Link>
              <Link to="/" className="winner-btn">
                Back to Main Menu
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="turn-float-box">
        <div
          key={currentPlayer}
          className={`turn-indicator-content ${
            currentPlayer === "R" ? "turn-red" : "turn-blue"
          }`}
        >
          {currentPlayer === "R" ? (
            <>🔴 {player_names.R || "Player 1"}'s Turn</>
          ) : (
            <>🔵 {player_names.B || "Player 2"}'s Turn</>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
