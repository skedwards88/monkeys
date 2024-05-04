import React from "react";

import Offer from "./Offer.js";
import Board from "./Board";
import Score from "./Score.js";
import Tutorial from "./Tutorial.js";
import GameOver from "./GameOver";
import {reducer} from "../logic/reducer.js";
import {getInitialSetup} from "../logic/getInitialSetup.js";

function Game() {
  const numRows = 9;
  const numColumns = 7;

  const [showRules, setShowRules] = React.useState(false);

  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    {numRows: numRows, numColumns: numColumns},
    getInitialSetup,
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
