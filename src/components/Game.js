import React from "react";
import Offer from "./Offer.js";
import Board from "./Board";
import Score from "./Score.js";
import GameOver from "./GameOver";

export function Game({dispatchGameState, gameState, setDisplay}) {
  const handleDrop = (event, flatIndex) => {
    event.target.style["background-color"] = "transparent";

    const offerIndex = event.dataTransfer.getData("offerIndex");
    const tile = event.dataTransfer.getData("tile");

    dispatchGameState({
      action: "drop",
      numRows: gameState.numRows,
      numColumns: gameState.numColumns,
      offerIndex: offerIndex,
      tile: tile,
      flatIndex: flatIndex,
    });
  };

  if (
    !gameState.gameOverCleared &&
    gameState.remainingTileIDs.every((item) => item === null)
  ) {
    return (
      <GameOver
        setDisplay={setDisplay}
        routes={gameState.routes}
        dispatchGameState={dispatchGameState}
      ></GameOver>
    );
  }

  return (
    <div id="game">
      <Offer remainingTileIDs={gameState.remainingTileIDs} />
      <Board played={gameState.played} handleDrop={handleDrop} />
      <div id="off-board">
        <Score routes={gameState.routes} />
        <button
          id="new-game-button"
          onClick={() =>
            dispatchGameState({
              action: "reset",
              numRows: gameState.numRows,
              numColumns: gameState.numColumns,
            })
          }
        />
        <button id="rules-button" onClick={() => setDisplay("rules")}></button>
      </div>
    </div>
  );
}
