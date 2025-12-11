'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      if (puzzle === undefined || coordinate === undefined || value === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const validation = solver.validate(puzzle);
      if (!validation.valid) {
        return res.json({ error: validation.error });
      }

      if (!/^[A-Ia-i][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }

      if (!/^[1-9]$/.test(value.toString())) {
        return res.json({ error: 'Invalid value' });
      }

      const row = solver.letterToRow(coordinate[0]);
      const col = parseInt(coordinate[1]) - 1;
      const val = value.toString();

      const conflicts = [];
      
      if (!solver.checkRowPlacement(puzzle, row, col, val)) {
        conflicts.push('row');
      }
      if (!solver.checkColPlacement(puzzle, row, col, val)) {
        conflicts.push('column');
      }
      if (!solver.checkRegionPlacement(puzzle, row, col, val)) {
        conflicts.push('region');
      }

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }

      return res.json({ valid: true });
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      const result = solver.solve(puzzle);
      return res.json(result);
    });
};
