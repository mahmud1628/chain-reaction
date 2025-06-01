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
  if (cell.color !== null && cell.color !== current_player) return false; // Cannot place orb in a cell occupied by the opponent
  return true; // Valid move if the cell is empty or occupied by the current player
};

export const update_cell = async (
  board,
  row_index,
  col_index,
  current_player,
  ROWS,
  COLS,
  update_board,
  set_exploiding_cells
) => {
  const new_board = [...board];

  new_board[row_index][col_index] = {
    count: new_board[row_index][col_index].count + 1,
    color: current_player,
  };
  update_board(structuredClone(new_board)); // Update the board state
  if (
    new_board[row_index][col_index].count >=
    get_critical_mass(row_index, col_index, ROWS, COLS)
  ) {
    // If the cell reaches critical mass, trigger chain explosion
    await delay(150);
    generate_chain_explosion(
      new_board,
      row_index,
      col_index,
      current_player,
      ROWS,
      COLS,
      update_board,
      set_exploiding_cells
    );
  }
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
  set_exploiding_cells
) => {
  let current_exploding_cells = [[start_row, start_col]];

  while (current_exploding_cells.length > 0) {
    const next_exploding_cells = [];

    set_exploiding_cells(current_exploding_cells);
    await delay(250); // for animation of the explosion
    set_exploiding_cells([]);

    for (const [row, col] of current_exploding_cells) {
      const cell = board[row][col];
      cell.count = 0;
      cell.color = null;
    }

    update_board(structuredClone(board)); // all the exploiding cells will explode in the same time now

    for (const [row, col] of current_exploding_cells) {
      const orthogonal_orbs = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      for (const [orthogonal_row_index, orthogonal_col_index] of orthogonal_orbs) {
        if (orthogonal_row_index >= 0 && orthogonal_row_index < ROWS && orthogonal_col_index >= 0 && orthogonal_col_index < COLS) {
          const orthogonal_orb = board[orthogonal_row_index][orthogonal_col_index];
          orthogonal_orb.count += 1;
          orthogonal_orb.color = current_player;

          const critical_mass = get_critical_mass(orthogonal_row_index, orthogonal_col_index, ROWS, COLS);

          if (
            orthogonal_orb.count >= critical_mass &&
            !next_exploding_cells.some(([r, c]) => r === orthogonal_row_index && c === orthogonal_col_index)
          ) {
            next_exploding_cells.push([orthogonal_row_index, orthogonal_col_index]);
          }
        }
      }
    }

    update_board(structuredClone(board));
    await delay(100); // small delay before next wave
    current_exploding_cells = next_exploding_cells;
  }
};

export const getOrbOrientation = (count, row, col, ROWS, COLS) => {
  const defaultPositions = {
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
      defaultPositions[2] = [
        { left: "75%", top: "50%" },
        { left: "50%", top: "75%" },
      ];
    } else if (row === 0 && col === COLS - 1) {
      defaultPositions[2] = [
        { left: "25%", top: "50%" },
        { left: "50%", top: "75%" },
      ];
    } else if (row === ROWS - 1 && col === 0) {
      defaultPositions[2] = [
        { left: "75%", top: "50%" },
        { left: "50%", top: "25%" },
      ];
    } else if (row === ROWS - 1 && col === COLS - 1) {
      defaultPositions[2] = [
        { left: "25%", top: "50%" },
        { left: "50%", top: "25%" },
      ];
    }
  }

  if (count === 3) {
    if (row === 0) {
      defaultPositions[3] = [
        { left: "25%", top: "25%" },
        { left: "75%", top: "25%" },
        { left: "50%", top: "75%" },
      ];
    } else if (row === ROWS - 1) {
      defaultPositions[3] = [
        { left: "25%", top: "75%" },
        { left: "75%", top: "75%" },
        { left: "50%", top: "25%" },
      ];
    } else if (col === 0) {
      defaultPositions[3] = [
        { left: "25%", top: "75%" },
        { left: "75%", top: "50%" },
        { left: "25%", top: "25%" },
      ];
    } else if (col === COLS - 1) {
      defaultPositions[3] = [
        { left: "25%", top: "50%" },
        { left: "75%", top: "75%" },
        { left: "75%", top: "25%" },
      ];
    }
  }

  return defaultPositions;
};
