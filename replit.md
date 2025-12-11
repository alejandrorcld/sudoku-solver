# Sudoku Solver

## Overview
A full stack JavaScript application for solving Sudoku puzzles. This is a FreeCodeCamp Quality Assurance project that provides puzzle validation and solving functionality.

## Project Structure
- `server.js` - Main Express server entry point
- `controllers/` - Sudoku solver logic and puzzle strings
  - `sudoku-solver.js` - Core solving algorithm
  - `puzzle-strings.js` - Sample puzzle data
- `routes/` - API route handlers
  - `api.js` - Main API endpoints
  - `fcctesting.js` - FreeCodeCamp testing routes
- `public/` - Static frontend files
  - `index.js` - Frontend JavaScript
  - `style.css` - Styles
- `views/` - HTML templates
  - `index.html` - Main page
- `tests/` - Mocha/Chai test suites

## Running the App
The app runs on port 5000 using nodemon for auto-restart during development.

```bash
npm start
```

## Running Tests
```bash
npm test
```

## API Endpoints
- `POST /api/solve` - Solve a puzzle
- `POST /api/check` - Check a single placement

## Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to 'test' to run tests on startup

## Recent Changes
- Configured to run on port 5000 with 0.0.0.0 binding for Replit environment
