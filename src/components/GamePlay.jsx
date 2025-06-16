import { useState } from "react";
import { useEffect } from "react";
import "./GamePlay.css"; // Importing styles for the game board
import Orbs from "./Orbs"; // Importing the Orbs component to display orbs in each cell
import Winner from "./Winner"; // Importing the Winner component to display the winner
import TopBarInGamePlay from "./TopBarInGamePlay"; // Importing the TopBar component to display the current player's turn
import { create_initial_board, is_valid_move, update_cell } from "./GameLogics";

const ROWS = 9;
const COLS = 6;

const GamePlay = (props) => {
  // State to hold the game board
  const [board, set_board] = useState(create_initial_board(ROWS, COLS));
  // State to hold the current player
  const [current_player, set_current_player] = useState("R"); // Player 1 plays with red orbs, Player 2 with blue orbs

  const [explodingCells, setExplodingCells] = useState([]);

  const [move_count, set_move_count] = useState(0);

  const [red_cell_count, set_red_cell_count] = useState(0);
  const [blue_cell_count, set_blue_cell_count] = useState(0);
  const [disabled, set_disabled] = useState(false); // Variable to disable cells based on game version

  const [winner, set_winner] = useState(null);

  const red_player_name = props.player_names.R || "Player 1";
  const blue_player_name = props.player_names.B || "Player 2";

  const switch_player = () => {
    set_current_player(current_player === "R" ? "B" : "R");
  };

  const update_board = (new_board) => {
    set_board(new_board);
  };

  const increment_move_count = () => {
    set_move_count(move_count + 1);
  };
const handleCellClick = (rowIndex, colIndex) => {
  if (disabled) return;

  const cell = board[rowIndex][colIndex];
  if (!is_valid_move(cell, current_player)) return;

  increment_move_count();

  update_cell(
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
      setTimeout(() => set_winner(current_player), 400);
      return;
    }
    switch_player();
  });
};

useEffect(() => {
  if (current_player === "B" && props.version === "ai") {
    set_disabled(true);  // disable board during AI move

    const timer = setTimeout(() => {
      
    
    fetch("http://localhost:3000/ai-move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board }),
    })
      .then((res) => res.json())
      .then(({ row, col }) => {
        // apply AI move to board
        console.log("AI move:", row, col);
        update_cell(board, row, col, "B", ROWS, COLS, update_board, setExplodingCells, red_cell_count, blue_cell_count, set_red_cell_count, set_blue_cell_count)
          .then((is_game_over) => {
            if (is_game_over) {
              setTimeout(() => set_winner("AI"), 400);
            }
            switch_player();
            set_disabled(false);
          });
      })
      .catch((err) => {
        console.error("AI move error:", err);
        set_current_player("Human");
        set_disabled(false);
      });

      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when current_player changes
  }
}, [current_player]);




  return (
    <div className="game-container">
      <TopBarInGamePlay
        current_player={current_player}
        player_names={props.player_names}
        version={props.version}
      />
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
      <Winner
        winner={winner}
        red_player_name={red_player_name}
        blue_player_name={blue_player_name}
        version =  {props.version}
        set_game_id={props.set_game_id}
      />
    </div>
  );
};

export default GamePlay;
