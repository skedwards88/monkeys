import React, { useState } from "react";

import "./App.css";

import { tiles } from "./tiles.js";
import Offer from "./Offer";
import Board from "./Board";
import Score from "./Score";
import Tutorial from "./Tutorial";
import GameOver from "./GameOver";
import { validDropQ } from "./validDropQ";
import { updateRoutes} from "./updateRoutes"
import { getInitialSetup } from "./getInitialSetup";
import { getDrawEffect } from "./getDrawEffect";

function Game() {
  const numRows = 9;
  const numColumns = 7;
  const [startingTileIDs, startingBoard, startingRoutes] = getInitialSetup(
    numRows,
    numColumns
  );
  
  const ref = React.useRef();
  const [remainingTileIDs, setRemainingTileIDs] = useState(startingTileIDs);
  const [played, setPlayed] = useState(startingBoard);
  const [routes, setRoutes] = useState(startingRoutes);
  const [showRules, setShowRules] = useState(false);
  React.useLayoutEffect(() => {
    const drawEffect = getDrawEffect(remainingTileIDs.length)
    ref.current.style.setProperty("--deck-size", drawEffect.join(","));
  }, [remainingTileIDs]);

  function handleNewGame() {
    const [startingTileIDs, startingBoard, startingRoutes] = getInitialSetup(
      numRows,
      numColumns
    );
    setRemainingTileIDs(startingTileIDs);
    setPlayed(startingBoard);
    setRoutes(startingRoutes);
  }

  const handleDrop = (event, flatIndex) => {
    event.target.style["background-color"] = "transparent";

    const offerIndex = event.dataTransfer.getData("offerIndex");
    const tile = event.dataTransfer.getData("tile");
    const newPlayed = [...played];

    if (!validDropQ(newPlayed, flatIndex, numColumns)) {
      return;
    }

    // Put a token in the square where the token was dropped
    newPlayed[flatIndex] = tile;

    // Update played
    setPlayed(newPlayed);

    // update routes
    let updatedRoutes = updateRoutes(
      routes.slice(),
      tiles[tile],
      flatIndex,
      numColumns
    );
    setRoutes(updatedRoutes);

    // const offerIndex = event.dragData.offerIndex;
    let newRemainingTileIDs = [...remainingTileIDs];
    if (newRemainingTileIDs.length > 3) {
      // replace the played tile with the tile at the bottom of the pool
      newRemainingTileIDs[offerIndex] =
        newRemainingTileIDs[newRemainingTileIDs.length - 1];
      // remove the tile at the bottom of the pool
      newRemainingTileIDs.splice(-1, 1);
    } else {
      // If there aren't unrevealed tiles left, replace the played tile with null
      newRemainingTileIDs[offerIndex] = null;
    }

    setRemainingTileIDs(newRemainingTileIDs);
  };

  return (
    <div id="game" ref={ref}>
      <Offer remainingTileIDs={remainingTileIDs} />
      <Board played={played} handleDrop={handleDrop} />
      <div id="off-board">
        <Score routes={routes} />
        <button id="new-game-button" onClick={handleNewGame} />
        <Tutorial showRules={showRules} setShowRules={setShowRules} />
        <GameOver remainingTileIDs={remainingTileIDs} routes={routes} />
      </div>
    </div>
  );
}

export default Game;
