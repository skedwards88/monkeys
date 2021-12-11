import React, { useState, useEffect } from "react";

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

function Game() {
  const numRows = 9;
  const numColumns = 7;
  const [startingTileIDs, startingBoard, startingRoutes] = getInitialSetup(
    numRows,
    numColumns
  );
  // The box shadow around the draw stack
  const drawEffect = [
    "-1px 1px rgba(27, 211, 235, 0.35)",
    "-1px 1px rgba(0,0,0, 0.15)",
    "-2px 2px rgba(27, 211, 235, 0.35)",
    "-2px 2px rgba(0,0,0, 0.05)",
    "-3px 3px rgba(27, 211, 235, 0.35)",
    "-3px 3px rgba(0,0,0, 0.35)",
    "-4px 4px rgba(27, 211, 235, 0.35)",
    "-4px 4px rgba(0,0,0, 0.25)",
    "-5px 5px rgba(27, 211, 235, 0.35)",
    "-5px 5px rgba(0,0,0, 0.45)",
    "-6px 6px rgba(27, 211, 235, 0.35)",
    "-6px 6px rgba(0,0,0, 0.35)",
    "-7px 7px rgba(27, 211, 235, 0.35)",
    "-7px 7px rgba(0,0,0, 0.15)",
    "-8px 8px rgba(27, 211, 235, 0.35)",
    "-8px 8px rgba(0,0,0, 0.25)",
    "-9px 9px rgba(27, 211, 235, 0.35)",
    "-9px 9px rgba(0,0,0, 0.35)",
    "-10px 10px rgba(27, 211, 235, 0.35)",
    "-10px 10px rgba(0,0,0, 0.45)",
    "-11px 11px rgba(27, 211, 235, 0.35)",
    "-11px 11px rgba(0,0,0, 0.35)",
    "-12px 12px rgba(27, 211, 235, 0.35)",
    "-12px 12px rgba(0,0,0, 0.15)",
    "-13px 13px rgba(27, 211, 235, 0.35)",
    "-13px 13px rgba(0,0,0, 0.35)",
  ];
  const [remainingTileIDs, setRemainingTileIDs] = useState(startingTileIDs);
  const [played, setPlayed] = useState(startingBoard);
  const [routes, setRoutes] = useState(startingRoutes);
  const [showRules, setShowRules] = useState(false);
  useEffect(() => {
    const effectiveDrawEffect = drawEffect.slice(
      0,
      2 * (remainingTileIDs.length - 3)
    );
    let body = document.getElementsByTagName("body")[0];
    body.style.setProperty("--deck-size", effectiveDrawEffect.join(","));
  });

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
    <div id="game">
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
