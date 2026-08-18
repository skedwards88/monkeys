import {validDropQ} from "./validDropQ";
import type {GameState, Position} from "./gameInit";
import {gameInit, NUM_COLUMNS, OFFER_SIZE} from "./gameInit";
import {updateRoutes} from "./updateRoutes";
import {tiles} from "./tiles";

export type GameReducerPayload =
  | {
      action: "newGame";
      isVsBot: boolean;
    }
  | {
      action: "clearGameOver";
    }
  | {
      action: "dragStart";
      draggedTileID: number;
      draggedOfferIndex: number;
      pointerStartPosition: Position;
      tileDimension: Position;
    }
  | {
      action: "dragMove";
      pointerPosition: Position;
    }
  | {
      action: "dragEnd";
      boardIndex: number | null;
    }
  | {
      action: "playBot";
      boardIndex: number;
      offerIndex: number;
    };

export function reducer(
  currentState: GameState,
  payload: GameReducerPayload,
): GameState {
  if (payload.action == "newGame") {
    return gameInit({
      useSaved: false,
      isVsBot: payload.isVsBot,
    });
  } else if (payload.action == "clearGameOver") {
    return {
      ...currentState,
      gameOverCleared: true,
    };
  } else if (payload.action === "dragStart") {
    return {
      ...currentState,
      dragData: {
        draggedTileID: payload.draggedTileID,
        draggedOfferIndex: payload.draggedOfferIndex,
        pointerOffset: {
          x: payload.tileDimension.x,
          y: payload.tileDimension.y,
        },
        pointerPosition: payload.pointerStartPosition,
      },
    };
  } else if (payload.action === "dragMove") {
    if (!currentState.dragData) {
      return currentState;
    }

    return {
      ...currentState,
      dragData: {
        ...currentState.dragData,
        pointerPosition: payload.pointerPosition,
      },
    };
  } else if (payload.action == "dragEnd") {
    if (!currentState.dragData) {
      return currentState;
    }

    if (
      payload.boardIndex === null ||
      !validDropQ(currentState.played, payload.boardIndex, NUM_COLUMNS)
    ) {
      return {...currentState, dragData: null};
    }

    // Put a token in the square where the token was dropped
    const newPlayed = [...currentState.played];
    newPlayed[payload.boardIndex] = currentState.dragData.draggedTileID;

    const updatedRoutes = updateRoutes(
      currentState.routes.slice(),
      tiles[currentState.dragData.draggedTileID],
      payload.boardIndex,
      NUM_COLUMNS,
    );

    const newRemainingTileIDs = [...currentState.remainingTileIDs];
    if (newRemainingTileIDs.length > OFFER_SIZE) {
      // replace the played tile with the tile at the bottom of the pool
      newRemainingTileIDs[currentState.dragData.draggedOfferIndex] =
        newRemainingTileIDs[newRemainingTileIDs.length - 1];
      // remove the tile at the bottom of the pool
      newRemainingTileIDs.splice(-1, 1);
    } else {
      // If there aren't unrevealed tiles left, replace the played tile with null
      newRemainingTileIDs[currentState.dragData.draggedOfferIndex] = null;
    }

    return {
      ...currentState,
      played: newPlayed,
      routes: updatedRoutes,
      remainingTileIDs: newRemainingTileIDs,
      dragData: null,
      isBlueTurn: !currentState.isBlueTurn,
    };
  } else if (payload.action == "playBot") {
    const playedTileID = currentState.remainingTileIDs[payload.offerIndex];
    // Put a token in the square where the token was dropped
    const newPlayed = [...currentState.played];
    newPlayed[payload.boardIndex] = playedTileID;

    const updatedRoutes = updateRoutes(
      currentState.routes.slice(),
      tiles[playedTileID!],
      payload.boardIndex,
      NUM_COLUMNS,
    );

    const newRemainingTileIDs = [...currentState.remainingTileIDs];
    if (newRemainingTileIDs.length > OFFER_SIZE) {
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
      dragData: null,
      isBlueTurn: !currentState.isBlueTurn,
    };
  } else {
    console.log(
      `unknown action: ${(payload as unknown as {action: string}).action}`,
    );
    return currentState;
  }
}
