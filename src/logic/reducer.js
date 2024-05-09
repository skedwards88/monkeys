import {validDropQ} from "./validDropQ";
import {getInitialSetup} from "./getInitialSetup";
import {updateRoutes} from "./updateRoutes";
import {tiles} from "./tiles.js";

export function reducer(currentState, payload) {
  if (payload.action == "reset") {
    return getInitialSetup({
      numRows: payload.numRows,
      numColumns: payload.numColumns,
      force: true,
    });
  } else if (payload.action == "clearGameOver") {
    return {
      ...currentState,
      gameOverCleared: true,
    };
  }

  if (!validDropQ(currentState.played, payload.flatIndex, payload.numColumns)) {
    return currentState;
  }

  // Put a token in the square where the token was dropped
  const newPlayed = [...currentState.played];
  newPlayed[payload.flatIndex] = payload.tile;

  const updatedRoutes = updateRoutes(
    currentState.routes.slice(),
    tiles[payload.tile],
    payload.flatIndex,
    payload.numColumns,
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
