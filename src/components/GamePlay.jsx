import { useState } from "react";
import "./GamePlay.css"; // Importing styles for the game board
import Orbs from "./Orbs"; // Importing the Orbs component to display orbs in each cell
import { Link } from "react-router-dom"; // Importing Link for navigation between routes
import Winner from "./Winner"; // Importing the Winner component to display the winner  
import PlayerTurn from "./PlayerTurn"; // Importing the PlayerTurn component to display the current player's turn
import {
  create_initial_board,
  is_valid_move,
  update_cell,
} from "./GameLogics";

const ROWS = 9;
const COLS = 6;

const GamePlay = ({ player_names }) => {
  // State to hold the game board
  const [board, set_board] = useState(create_initial_board(ROWS, COLS));
  // State to hold the current player
  const [current_player, set_current_player] = useState("R"); // Player 1 plays with red orbs, Player 2 with blue orbs

  const [explodingCells, setExplodingCells] = useState([]);

  const [move_count, set_move_count] = useState(0);

  const [red_cell_count, set_red_cell_count] = useState(0);
  const [blue_cell_count, set_blue_cell_count] = useState(0);

  const [winner, set_winner] = useState(null);

  const red_player_name = player_names.R || "Player 1";
  const blue_player_name = player_names.B || "Player 2";
  let winner_name = "";

  const switch_player = () => {
    set_current_player(current_player === "R" ? "B" : "R");
  };

  const update_board = (new_board) => {
    set_board(new_board);
  };

  const increment_move_count = () => {
    set_move_count(move_count + 1);
  };

  const handleCellClick = async (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    if (!is_valid_move(cell, current_player) || winner !== null) return; // Check if the move is valid

    increment_move_count();

    await update_cell(
      board,
      rowIndex,
      colIndex,
      current_player,
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
          current_player === "R" ? red_player_name : blue_player_name;
        setTimeout(() => {
          set_winner(current_player);
        }, 400);
      }
    });

    switch_player(); // Switch players
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
      <Winner winner={winner} red_player_name={red_player_name} blue_player_name={blue_player_name} />
      <PlayerTurn current_player={current_player} player_names={player_names} />
    </div>
  );
};

export default GamePlay;
