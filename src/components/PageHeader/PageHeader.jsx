import React from "react";
import "./pageHeader.css";

function PageHeader({ gameStatus }) {
  return (
    <header className="page-header">
      <div className="page-logo">
        <h1>POKEMON MEMORY GAME</h1>
      </div>
      <div className="score-board">
        <span className="score">Score: {gameStatus.score}</span>
        <span className="best">Best Score: {gameStatus.bestScore}</span>
      </div>
    </header>
  );
}

export default React.memo(PageHeader);
