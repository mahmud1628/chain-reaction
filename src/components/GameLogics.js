function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export const create_initial_board = (ROWS, COLS) =>
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        count: 0,
        color: null,
      }))
    );


export const is_valid_move = (cell, current_player) => {
    if(cell.color !== null && cell.color !== current_player) return false; // Cannot place orb in a cell occupied by the opponent
    return true; // Valid move if the cell is empty or occupied by the current player
}

export const update_cell = async (board, row_index, col_index, current_player, ROWS, COLS, update_board, set_exploiding_cells) => {
    const new_board = [...board];
    
    new_board[row_index][col_index] = {
        count: new_board[row_index][col_index].count + 1,
        color: current_player,
    };
    update_board(structuredClone(new_board)); // Update the board state
    if(new_board[row_index][col_index].count >= get_critical_mass(row_index, col_index, ROWS, COLS)) {
        // If the cell reaches critical mass, trigger chain explosion
        await delay(150);
        generate_chain_explosion(new_board, row_index, col_index, current_player, ROWS, COLS, update_board, set_exploiding_cells);
    }
}

export const get_critical_mass = (row_index, col_index, ROWS, COLS) => {
    const upper_left_corner = row_index === 0 && col_index === 0;
    const upper_right_corner = row_index === 0 && col_index === COLS - 1;
    const lower_left_corner = row_index === ROWS - 1 && col_index === 0;
    const lower_right_corner = row_index === ROWS - 1 && col_index === COLS - 1;

    if(upper_left_corner || upper_right_corner || lower_left_corner || lower_right_corner) {
        return 2; // Critical mass for corners is 2
    }

    const is_top_row = row_index === 0;
    const is_bottom_row = row_index === ROWS - 1;
    const is_left_column = col_index === 0;
    const is_right_column = col_index === COLS - 1;

    if(is_top_row || is_bottom_row || is_left_column || is_right_column) {
        return 3; // Critical mass for edges is 3
    }

    return 4; // Critical mass for all other cells is 4
}


export const generate_chain_explosion = async (board, row_index, col_index, current_player, ROWS, COLS, update_board, set_exploiding_cells) => {
    const cells_to_expand = [[row_index, col_index]];

    while(cells_to_expand.length > 0) {
        const [current_row, current_col] = cells_to_expand.shift();
        const cell = board[current_row][current_col];

        set_exploiding_cells([[current_row, current_col]]);
        await delay(450); // wait to let animation play
        set_exploiding_cells([]);

        cell.count = 0; // Reset the cell count to 0
        cell.color = null; // Reset the cell color

        const orthogonal_orbs = [
            [current_row - 1, current_col], // Up
            [current_row + 1, current_col], // Down
            [current_row, current_col - 1], // Left
            [current_row, current_col + 1]  // Right
        ]

        for(const [next_row, next_col] of orthogonal_orbs) {
            if(next_row < 0 || next_row >= ROWS || next_col < 0 || next_col >= COLS) continue; // Skip out of bounds
            const next_cell = board[next_row][next_col];

            next_cell.count += 1; // Increment the count of the orthogonal cell
            next_cell.color = current_player; // Set the color of the orthogonal cell to the current player
            update_board(board); // Update the board state
            if(next_cell.count >= get_critical_mass(next_row, next_col, ROWS, COLS)) {
                cells_to_expand.push([next_row, next_col]); // Add the orthogonal cell to the cells_to_expand for further processing
            }
        }
    }

    return board; // Return the updated board after chain explosion
}


export const getOrbOrientation = (count,row, col, ROWS, COLS) => {
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

    if(count === 2) {
        if(row === 0 && col === 0) {
            defaultPositions[2] = [
                { left: "75%", top: "50%" },
                { left: "50%", top: "75%" },
            ];
        }
        else if(row === 0 && col === COLS - 1) {
            defaultPositions[2] = [
                { left: "25%", top: "50%" },
                { left: "50%", top: "75%" },
            ];
        }
        else if(row === ROWS - 1 && col === 0) {
            defaultPositions[2] = [
                { left: "75%", top: "50%" },
                { left: "50%", top: "25%" },
            ];
        }
        else if(row === ROWS - 1 && col === COLS - 1) {
            defaultPositions[2] = [
                { left: "25%", top: "50%" },
                { left: "50%", top: "25%" },
            ];
        }
    }

    if(count === 3) {
        if(row === 0) {
            defaultPositions[3] = [
                { left: "25%", top: "25%" },
                { left: "75%", top: "25%" },
                { left: "50%", top: "75%" },
            ];
        }
        else if(row === ROWS - 1) {
            defaultPositions[3] = [
                { left: "25%", top: "75%" },
                { left: "75%", top: "75%" },
                { left: "50%", top: "25%" },
            ];
        }
        else if(col === 0) {
            defaultPositions[3] = [
                { left: "25%", top: "75%" },
                { left: "75%", top: "50%" },
                { left: "25%", top: "25%" },
            ];
        }
        else if(col === COLS - 1) {
            defaultPositions[3] = [
                { left: "25%", top: "50%" },
                { left: "75%", top: "75%" },
                { left: "75%", top: "25%" },
            ];
        }
    }

    return defaultPositions;
}