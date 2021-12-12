import React from "react";

import "./App.css";

import { tiles } from "./tiles.js";
import Offer from "./Offer";
import Board from "./Board";
import Score from "./Score";
import Tutorial from "./Tutorial";
import GameOver from "./GameOver";
import { validDropQ } from "./validDropQ";
import { updateRoutes } from "./updateRoutes";
import { getInitialSetup } from "./getInitialSetup";

function Game() {
  const numRows = 9;
  const numColumns = 7;

  const [showRules, setShowRules] = React.useState(false);

  function reducer(currentState, payload) {
    if (payload.action == "reset") {
      return getInitialSetup({
        numRows: payload.numRows,
        numColumns: payload.numColumns,
        force: true,
      });
    }

    if (!validDropQ(currentState.played, payload.flatIndex, numColumns)) {
      return currentState;
    }

    // Put a token in the square where the token was dropped
    const newPlayed = [...currentState.played];
    newPlayed[payload.flatIndex] = payload.tile;

    const updatedRoutes = updateRoutes(
      currentState.routes.slice(),
      tiles[payload.tile],
      payload.flatIndex,
      payload.numColumns
    );

    // const offerIndex = event.dragData.offerIndex;
    let newRemainingTileIDs = [...currentState.remainingTileIDs];
    if (newRemainingTileIDs.length > 3) {
      // replace the played tile with the tile at the bottom of the pool
      newRemainingTileIDs[payload.offerIndex] =
        newRemainingTileIDs[newRemainingTileIDs.length - 1];
      // remove the tile at the bottom of the pool
      newRemainingTileIDs.splice(-1, 1);
    } else {
      // If there aren't unrevealed tiles left, replace the played tile with null
      newRemainingTileIDs[payload.offerIndex] = null;
    }

    return {
      ...currentState,
      played: newPlayed,
      routes: updatedRoutes,
      remainingTileIDs: newRemainingTileIDs,
    };
  }

  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    { numRows: numRows, numColumns: numColumns },
    getInitialSetup
  );

  React.useEffect(() => {
    window.localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const handleDrop = (event, flatIndex) => {
    event.target.style["background-color"] = "transparent";

    const offerIndex = event.dataTransfer.getData("offerIndex");
    const tile = event.dataTransfer.getData("tile");

    dispatchGameState({
      action: "drop",
      numRows: numRows,
      numColumns: numColumns,
      offerIndex: offerIndex,
      tile: tile,
      flatIndex: flatIndex,
    });
  };

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
              numRows: numRows,
              numColumns: numColumns,
            })
          }
        />
        <Tutorial showRules={showRules} setShowRules={setShowRules} />
        <GameOver
          remainingTileIDs={gameState.remainingTileIDs}
          routes={gameState.routes}
        />
      </div>
    </div>
  );
}

export default Game;
