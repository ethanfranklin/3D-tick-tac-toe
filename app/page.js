'use client';

import { useState } from 'react';

export default function Home() {
  // Initialize a 3x3x3 cube (27 spaces) as null
  const [cube, setCube] = useState(Array(27).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const calculateWinner = (cube) => {
    // All possible winning lines in 3D
    const lines = [
      // Horizontal lines (9 lines, 3 in each layer)
      [0, 1, 2], [3, 4, 5], [6, 7, 8],         // front layer
      [9, 10, 11], [12, 13, 14], [15, 16, 17], // middle layer
      [18, 19, 20], [21, 22, 23], [24, 25, 26], // back layer

      // Vertical lines (9 lines)
      [0, 3, 6], [1, 4, 7], [2, 5, 8],         // front layer
      [9, 12, 15], [10, 13, 16], [11, 14, 17], // middle layer
      [18, 21, 24], [19, 22, 25], [20, 23, 26], // back layer

      // Depth lines (9 lines)
      [0, 9, 18], [1, 10, 19], [2, 11, 20],
      [3, 12, 21], [4, 13, 22], [5, 14, 23],
      [6, 15, 24], [7, 16, 25], [8, 17, 26],

      // Diagonals within each depth layer (6 lines)
      [0, 4, 8], [2, 4, 6],           // front layer
      [9, 13, 17], [11, 13, 15],      // middle layer
      [18, 22, 26], [20, 22, 24],     // back layer

      // Diagonals across depth (4 lines)
      [0, 13, 26], [2, 13, 24],       // diagonal from front to back
      [6, 13, 20], [8, 13, 18],       // diagonal from front to back

      // Horizontal diagonals across layers (12 lines)
      [0, 10, 20], [2, 10, 18],       // top row diagonals
      [3, 13, 23], [5, 13, 21],       // middle row diagonals
      [6, 16, 26], [8, 16, 24],       // bottom row diagonals
      [0, 12, 24], [6, 12, 18],       // left column diagonals
      [1, 13, 25], [7, 13, 19],       // middle column diagonals
      [2, 14, 26], [8, 14, 20]        // right column diagonals
    ];

    for (const [a, b, c] of lines) {
      if (cube[a] && cube[a] === cube[b] && cube[a] === cube[c]) {
        return cube[a];
      }
    }
    return cube.every(square => square) ? 'Draw' : null;
  };

  const handleClick = (i) => {
    if (!gameStarted || cube[i] || calculateWinner(cube)) return;

    const nextCube = cube.slice();
    nextCube[i] = xIsNext ? 'X' : 'O';
    setCube(nextCube);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setCube(Array(27).fill(null));
    setXIsNext(true);
    setGameStarted(false);
    setPlayerX('');
    setPlayerO('');
  };

  const startGame = (e) => {
    e.preventDefault();
    if (playerX.trim() && playerO.trim()) {
      setGameStarted(true);
    }
  };

  const winner = calculateWinner(cube);
  const status = winner
    ? winner === 'Draw'
      ? "It's a draw!"
      : `Winner: ${winner === 'X' ? playerX : playerO}`
    : `Next player: ${xIsNext ? playerX + ' (X)' : playerO + ' (O)'}`;

  // Helper function to render one layer of the cube
  const renderLayer = (startIndex) => (
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((offset) => (
        <button
          key={startIndex + offset}
          className={`h-16 w-16 flex items-center justify-center text-2xl font-bold 
            ${!cube[startIndex + offset] ? 'hover:bg-gray-100 dark:hover:bg-gray-600' : ''} 
            bg-gray-50 dark:bg-gray-800 
            text-gray-800 dark:text-white 
            border border-gray-200 dark:border-gray-600 
            rounded transition-colors
            ${cube[startIndex + offset] === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}
          onClick={() => handleClick(startIndex + offset)}
        >
          {cube[startIndex + offset]}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="flex flex-col items-center max-w-4xl w-full px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">3D Tic Tac Toe</h1>

        {!gameStarted ? (
          <div className="mb-8 w-full max-w-md">
            <form onSubmit={startGame} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
              <div>
                <label htmlFor="playerX" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Player X Name
                </label>
                <input
                  type="text"
                  id="playerX"
                  value={playerX}
                  onChange={(e) => setPlayerX(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="playerO" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Player O Name
                </label>
                <input
                  type="text"
                  id="playerO"
                  value={playerO}
                  onChange={(e) => setPlayerO(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md 
                  transition-colors shadow-md hover:shadow-lg font-medium"
              >
                Start Game
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
              {status}
            </div>

            <div className="flex flex-row gap-8 bg-white/50 dark:bg-gray-700/50 p-8 rounded-xl shadow-xl">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-300 font-semibold">
                  Front
                </div>
                {renderLayer(0)}
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-300 font-semibold">
                  Middle
                </div>
                {renderLayer(9)}
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-300 font-semibold">
                  Back
                </div>
                {renderLayer(18)}
              </div>
            </div>

            <button
              onClick={resetGame}
              className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors
                shadow-md hover:shadow-lg font-medium"
            >
              Reset Game
            </button>
          </>
        )}

        <div className="mt-8 max-w-2xl w-full text-gray-600 dark:text-gray-300 space-y-6 text-sm px-4 pb-8">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">How to Play 3D Tic Tac Toe</h2>
            <p>This is an advanced version of the classic Tic Tac Toe game, played in a 3x3x3 cube (three 3x3 grids). Players take turns placing their marks (X or O) in any empty cell across any of the three layers (Front, Middle, or Back).</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Game Rules</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Players take turns placing their symbol (X goes first)</li>
              <li>A move can be made in any empty cell in any layer</li>
              <li>Once a cell is filled, it cannot be changed</li>
              <li>The game ends when either a player wins or all cells are filled (draw)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">How to Win</h3>
            <p className="mb-2">A player wins by getting three of their symbols in a row. This can happen in several ways:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Regular Lines</span>: Three in a row horizontally, vertically, or diagonally within any single layer (like classic Tic Tac Toe)</li>
              <li><span className="font-semibold">Depth Lines</span>: Three in a row going from front to back through the same position in each layer</li>
              <li><span className="font-semibold">3D Diagonals</span>: Three in a row diagonally across layers, including:
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>Corner to corner through the center (like front-top-left to back-bottom-right)</li>
                  <li>Edge to edge through the middle (like front-middle-top to back-middle-bottom)</li>
                  <li>Any diagonal path that spans all three layers</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Strategy Tips</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Watch for winning opportunities in all three dimensions</li>
              <li>The center cell of the middle layer is powerful as it's part of many possible winning lines</li>
              <li>Don't forget about diagonal wins that cross through different layers</li>
              <li>Block your opponent's potential winning moves, especially in 3D diagonals which can be harder to spot</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Winning Combinations</h3>
            <p className="mb-2">There are 49 possible ways to win, broken down as follows:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>9 horizontal lines (3 in each layer)</li>
              <li>9 vertical lines (3 in each layer)</li>
              <li>9 depth lines (straight front-to-back)</li>
              <li>6 regular diagonals (2 in each layer)</li>
              <li>4 corner-to-corner 3D diagonals</li>
              <li>12 edge-to-edge 3D diagonals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
