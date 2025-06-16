function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const create_initial_board = (ROWS, COLS) => {
  let board = [];
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let j = 0; j < COLS; j++) {
      row.push({
        count: 0,
        color: null,
      });
    }
    board.push(row);
  }
  return board;
};

export const is_valid_move = (cell, current_player) => {
  if (cell.color === null) return true; // valid moce if the cell is empty
  if (cell.color === current_player) return true; // valid move if the cell is occupied by the current player
  return false; // invalid move if the cell is occupied by the opponent already
};

export const update_cell = async (
  board,
  row_index,
  col_index,
  current_player,
  ROWS,
  COLS,
  update_board,
  set_exploiding_cells,
  red_cell_count,
  blue_cell_count,
  set_red_cell_count,
  set_blue_cell_count
) => {
  const updated_board = [...board];

  let red_blue_counts = {
    R: red_cell_count,
    B: blue_cell_count,
  };

  let count = updated_board[row_index][col_index].count;
  count += 1; // Increment the count of orbs in the cell
  updated_board[row_index][col_index] = {
    count: count, // set the new count
    color: current_player,
  };

  if (count === 1) {
    // Increment the count of cells occupied by the current player
    if (current_player === "R") set_red_cell_count((prev) => prev + 1);
    else set_blue_cell_count((prev) => prev + 1);

    red_blue_counts[current_player] += 1; // Update the count of cells occupied by the current player
  }

  update_board(structuredClone(updated_board)); // Update the board state after incrementing orb count

  let critical_mass = get_critical_mass(row_index, col_index, ROWS, COLS);

  if (count >= critical_mass) {
    // If the cell reaches critical mass, trigger chain explosion
    await delay(150);
    const is_game_over = generate_chain_explosion(
      updated_board,
      row_index,
      col_index,
      current_player,
      ROWS,
      COLS,
      update_board,
      set_exploiding_cells,
      red_blue_counts,
      set_red_cell_count,
      set_blue_cell_count
    );

    return is_game_over; // Return true if the game is over, false otherwise
  }
  return false; // indicates that game is not over yet
};

export const get_critical_mass = (row_index, col_index, ROWS, COLS) => {
  const upper_left_corner = row_index === 0 && col_index === 0;
  const upper_right_corner = row_index === 0 && col_index === COLS - 1;
  const lower_left_corner = row_index === ROWS - 1 && col_index === 0;
  const lower_right_corner = row_index === ROWS - 1 && col_index === COLS - 1;

  if (
    upper_left_corner ||
    upper_right_corner ||
    lower_left_corner ||
    lower_right_corner
  ) {
    return 2; // Critical mass for corners is 2
  }

  const is_top_row = row_index === 0;
  const is_bottom_row = row_index === ROWS - 1;
  const is_left_column = col_index === 0;
  const is_right_column = col_index === COLS - 1;

  if (is_top_row || is_bottom_row || is_left_column || is_right_column) {
    return 3; // Critical mass for edges is 3
  }

  return 4; // Critical mass for all other cells is 4
};

export const generate_chain_explosion = async (
  board,
  start_row,
  start_col,
  current_player,
  ROWS,
  COLS,
  update_board,
  set_exploiding_cells,
  red_blue_counts,
  set_red_cell_count,
  set_blue_cell_count
) => {
  let indices_of_current_exploding_cells = [[start_row, start_col]];

  let opponenet_player = current_player === "R" ? "B" : "R";

  while (indices_of_current_exploding_cells.length > 0) {
    set_exploiding_cells(indices_of_current_exploding_cells);
    await delay(250); // for animation of the explosion
    set_exploiding_cells([]);

    for (const index of indices_of_current_exploding_cells) {
      const [row, col] = index;
      const cell = board[row][col];
      cell.count = 0;
      cell.color = null;
      red_blue_counts[current_player] -= 1; // decrement the count of cells occupied by the current player
    }

    update_board(structuredClone(board)); // all the exploiding cells will explode in the same time now

    let indices_of_next_exploding_cells = []; // to store the indices of cells that will explode next

    for (const index of indices_of_current_exploding_cells) {
      const [row, col] = index;
      const indices_of_orthogonal_cells = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      for (const orthogonal_index of indices_of_orthogonal_cells) {
        const [orthogonal_row_index, orthogonal_col_index] = orthogonal_index;

        const is_valid_row =
          orthogonal_row_index >= 0 && orthogonal_row_index < ROWS;
        const is_valid_col =
          orthogonal_col_index >= 0 && orthogonal_col_index < COLS;
        const is_valid_cell = is_valid_row && is_valid_col;

        if (!is_valid_cell) continue; // skip if the cell is out of bounds

        const orthogonal_cell =
          board[orthogonal_row_index][orthogonal_col_index];
        orthogonal_cell.count += 1;

        if (orthogonal_cell.color === null) {
          red_blue_counts[current_player] += 1; // Increment the count of cells occupied by the current player
        }
        if (orthogonal_cell.color === opponenet_player) {
          red_blue_counts[opponenet_player] -= 1; // Decrement the count of cells occupied by the opponent player
          red_blue_counts[current_player] += 1; // Increment the count of cells occupied by the current player
        }

        orthogonal_cell.color = current_player;

        const critical_mass = get_critical_mass(
          orthogonal_row_index,
          orthogonal_col_index,
          ROWS,
          COLS
        );
        const is_critical_mass = orthogonal_cell.count >= critical_mass;

        const is_already_exploding = indices_of_next_exploding_cells.some(
          ([r, c]) => r === orthogonal_row_index && c === orthogonal_col_index
        );

        if (is_critical_mass && !is_already_exploding) {
          indices_of_next_exploding_cells.push([
            orthogonal_row_index,
            orthogonal_col_index,
          ]);
        }
      }
    }

    update_board(structuredClone(board));
    await delay(100); // small delay before next explosion
    indices_of_current_exploding_cells = indices_of_next_exploding_cells;
    set_blue_cell_count(red_blue_counts["B"]);
    set_red_cell_count(red_blue_counts["R"]);
    if (red_blue_counts["R"] === 0 || red_blue_counts["B"] === 0) {
      return true; // indicates that game is over
    }
  }
  return false; // indicates that game is not over
};

export const get_orb_orientation = (count, row, col, ROWS, COLS) => {
  const default_orientation = {
    1: [{ left: "50%", top: "50%" }],
    2: [
      { left: "25%", top: "50%" },
      { left: "75%", top: "50%" },
    ],
    3: [
      { left: "50%", top: "25%" },
      { left: "25%", top: "75%" },
      { left: "75%", top: "75%" },
    ],
    4: [
      { left: "50%", top: "20%" },
      { left: "20%", top: "50%" },
      { left: "80%", top: "50%" },
      { left: "50%", top: "80%" },
    ],
  };

  if (count === 2) {
    if (row === 0 && col === 0) {
      default_orientation[2] = [
        { left: "75%", top: "50%" },
        { left: "50%", top: "75%" },
      ];
    } else if (row === 0 && col === COLS - 1) {
      default_orientation[2] = [
        { left: "25%", top: "50%" },
        { left: "50%", top: "75%" },
      ];
    } else if (row === ROWS - 1 && col === 0) {
      default_orientation[2] = [
        { left: "75%", top: "50%" },
        { left: "50%", top: "25%" },
      ];
    } else if (row === ROWS - 1 && col === COLS - 1) {
      default_orientation[2] = [
        { left: "25%", top: "50%" },
        { left: "50%", top: "25%" },
      ];
    }
  }

  if (count === 3) {
    if (row === 0) {
      default_orientation[3] = [
        { left: "25%", top: "25%" },
        { left: "75%", top: "25%" },
        { left: "50%", top: "75%" },
      ];
    } else if (row === ROWS - 1) {
      default_orientation[3] = [
        { left: "25%", top: "75%" },
        { left: "75%", top: "75%" },
        { left: "50%", top: "25%" },
      ];
    } else if (col === 0) {
      default_orientation[3] = [
        { left: "25%", top: "75%" },
        { left: "75%", top: "50%" },
        { left: "25%", top: "25%" },
      ];
    } else if (col === COLS - 1) {
      default_orientation[3] = [
        { left: "25%", top: "50%" },
        { left: "75%", top: "75%" },
        { left: "75%", top: "25%" },
      ];
    }
  }

  return default_orientation;
};

export const get_random_move = (board) => {
  const valid_moves = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (is_valid_move(board[i][j], "R")) {
        valid_moves.push({ row: i, col: j });
      }
    }
  }
  
  if (valid_moves.length === 0) return null; 
  
  const random_index = Math.floor(Math.random() * valid_moves.length);
  return valid_moves[random_index];
}
