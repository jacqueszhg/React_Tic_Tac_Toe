import { useState } from 'react';

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let stateGame;
  if (winner) {
    stateGame = "Winner: " + winner;
  } else {
    stateGame = "Next player: " + (xIsNext ? "X" : "O")
  }
  return (
    <>
      <div className='status'>{stateGame}</div>
      {[...Array(3)].map((x, i) => <div className="board-row" key={i}>
        {Array.apply(i, Array(3)).map((e, j) => <Square key={j + i * 3} value={squares[j + i * 3]} onSquareClick={() => handleClick(j + i * 3)} />)}
      </div>)}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurentMove] = useState(0)
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;;


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurentMove(nextMove);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className='game-info'>
        <ol>{history.map((e, i) => <li key={e}><button onClick={() => jumpTo(i)}>Move to {i}</button></li>)}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Square({ value, onSquareClick }) {

  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>)
}