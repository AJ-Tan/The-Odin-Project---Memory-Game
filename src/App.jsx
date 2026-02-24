import MemoryGame from "./components/MemoryGame/MemoryGame";
import "./App.css";
import PageHeader from "./components/PageHeader/PageHeader";
import { useState } from "react";

function App() {
  const [gameStatus, setGameStatus] = useState({
    score: 0,
    bestScore: 0,
    selectedIds: [],
  });

  return (
    <>
      <PageHeader gameStatus={gameStatus} />
      <MemoryGame gameStatus={gameStatus} setGameStatus={setGameStatus} />
    </>
  );
}

export default App;
