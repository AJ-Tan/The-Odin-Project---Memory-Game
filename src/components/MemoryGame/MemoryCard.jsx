import React from "react";
import "./css/memoryCard.css";

function MemoryCard({ memoryObj, handleCardSelection }) {
  return (
    <div
      className="memory-card"
      onClick={() => handleCardSelection(memoryObj.id)}
    >
      <div className="card-content">
        <div className="card-image-container">
          <img src={memoryObj.img} alt="" />
        </div>
        <div className="card-title">
          <span>{memoryObj.name}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MemoryCard);
