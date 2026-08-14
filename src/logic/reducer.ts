import {validDropQ} from "./validDropQ";
import type {GameState} from "./gameInit";
import {gameInit} from "./gameInit";
import {updateRoutes} from "./updateRoutes";
import {tiles} from "./tiles";

export type GameReducerPayload =
  | {
      action: "reset";
    }
  | {
      action: "clearGameOver";
    }
  | {
      action: "drop";
      flatIndex: number;
      numColumns: number;
      tile: number;
      offerIndex: number;
    };

export function reducer(
  currentState: GameState,
  payload: GameReducerPayload,
): GameState {
  if (payload.action == "reset") {
    return gameInit({
      useSaved: false,
    });
  } else if (payload.action == "clearGameOver") {
    return {
      ...currentState,
      gameOverCleared: true,
    };
  } else if (payload.action == "drop") {
    if (
      !validDropQ(currentState.played, payload.flatIndex, payload.numColumns)
    ) {
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
    const newRemainingTileIDs = [...currentState.remainingTileIDs];
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
  } else {
    console.log(
      `unknown action: ${(payload as unknown as {action: string}).action}`,
    );
    return currentState;
  }
}
