class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString) {
      return { valid: false, error: 'Required field missing' };
    }
    if (puzzleString.length !== 81) {
      return { valid: false, error: 'Expected puzzle to be 81 characters long' };
    }
    if (/[^1-9.]/.test(puzzleString)) {
      return { valid: false, error: 'Invalid characters in puzzle' };
    }
    return { valid: true };
  }

  letterToRow(letter) {
    return letter.toUpperCase().charCodeAt(0) - 65;
  }

  getIndex(row, col) {
    return row * 9 + col;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let col = 0; col < 9; col++) {
      if (col === column) continue;
      if (puzzleString[this.getIndex(row, col)] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let r = 0; r < 9; r++) {
      if (r === row) continue;
      if (puzzleString[this.getIndex(r, column)] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (r === row && c === column) continue;
        if (puzzleString[this.getIndex(r, c)] === value.toString()) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    const validation = this.validate(puzzleString);
    if (!validation.valid) {
      return { error: validation.error };
    }

    let puzzle = puzzleString.split('');
    
    if (this.solveSudoku(puzzle)) {
      return { solution: puzzle.join('') };
    }
    return { error: 'Puzzle cannot be solved' };
  }

  solveSudoku(puzzle) {
    const emptyIndex = puzzle.indexOf('.');
    if (emptyIndex === -1) {
      return true;
    }

    const row = Math.floor(emptyIndex / 9);
    const col = emptyIndex % 9;
    const puzzleString = puzzle.join('');

    for (let num = 1; num <= 9; num++) {
      const value = num.toString();
      if (this.checkRowPlacement(puzzleString, row, col, value) &&
          this.checkColPlacement(puzzleString, row, col, value) &&
          this.checkRegionPlacement(puzzleString, row, col, value)) {
        puzzle[emptyIndex] = value;
        if (this.solveSudoku(puzzle)) {
          return true;
        }
        puzzle[emptyIndex] = '.';
      }
    }
    return false;
  }
}

module.exports = SudokuSolver;
