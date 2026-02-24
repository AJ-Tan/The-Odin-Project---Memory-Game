import React, { useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";
import "./css/memoryGame.css";

function MemoryGame({ gameStatus, setGameStatus }) {
  const [memoryList, setMemoryList] = useState(null);

  const initializeCards = () => {
    setMemoryList(null);
    randomMemoryPokemon().then((res) => {
      setMemoryList(res);
    });
  };

  const randomizeCards = () => {
    const currentList = [...memoryList];
    const newList = [];
    let randomizeIndex = Math.floor(Math.random() * currentList.length);
    while (currentList.length > 0) {
      newList.push(currentList.splice(randomizeIndex, 1)[0]);
      randomizeIndex = Math.floor(Math.random() * currentList.length);
    }

    setMemoryList(newList);
  };

  useEffect(() => {
    randomMemoryPokemon().then((res) => {
      setMemoryList(res);
    });
  }, []);

  const handleCardSelection = (id) => {
    if (gameStatus.selectedIds.includes(id)) {
      setGameStatus((prev) => ({
        ...prev,
        score: 0,
        selectedIds: [],
      }));
      initializeCards();
    } else {
      const updatedScore = gameStatus.score + 1;
      setGameStatus((prev) => ({
        score: updatedScore,
        bestScore:
          updatedScore > prev.bestScore ? updatedScore : prev.bestScore,
        selectedIds: [...prev.selectedIds, id],
      }));
      randomizeCards();
    }
  };

  return (
    <section className="memory-game">
      <div className="memory-card-container">
        {memoryList &&
          memoryList.map((item) => (
            <MemoryCard
              key={item.id}
              memoryObj={item}
              handleCardSelection={handleCardSelection}
            />
          ))}
      </div>
    </section>
  );
}

const randomMemoryPokemon = async (limit = 12) => {
  const total = 1000;

  const ids = new Set();
  while (ids.size < limit) {
    ids.add(Math.floor(Math.random() * total) + 1);
  }

  const promises = [...ids].map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
  );

  const fetchPokemon = (await Promise.all(promises)).map((data) => ({
    id: data.id,
    name: data.name,
    img: data.sprites.front_default,
  }));

  return fetchPokemon;
};

export default React.memo(MemoryGame);
