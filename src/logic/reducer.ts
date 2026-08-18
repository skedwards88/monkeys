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

function updateStateWithPlayedTile({
  currentState,
  playedBoardIndex,
  playedTileID,
  playedOfferIndex,
}: {
  currentState: GameState;
  playedBoardIndex: number;
  playedTileID: number;
  playedOfferIndex: number;
}): GameState {
  const updatedPlayed = [...currentState.played];
  updatedPlayed[playedBoardIndex] = playedTileID;

  const updatedRoutes = updateRoutes(
    currentState.routes.slice(),
    tiles[playedTileID],
    playedBoardIndex,
    NUM_COLUMNS,
  );

  const newRemainingTileIDs = [...currentState.remainingTileIDs];
  if (newRemainingTileIDs.length > OFFER_SIZE) {
    // replace the played tile with the tile at the bottom of the pool
    newRemainingTileIDs[playedOfferIndex] =
      newRemainingTileIDs[newRemainingTileIDs.length - 1];
    // remove the tile at the bottom of the pool
    newRemainingTileIDs.splice(-1, 1);
  } else {
    // If there aren't unrevealed tiles left, replace the played tile with null
    newRemainingTileIDs[playedOfferIndex] = null;
  }

  return {
    ...currentState,
    played: updatedPlayed,
    routes: updatedRoutes,
    remainingTileIDs: newRemainingTileIDs,
    dragData: null,
    isBlueTurn: !currentState.isBlueTurn,
  };
}

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

    const updatedState = updateStateWithPlayedTile({
      currentState,
      playedBoardIndex: payload.boardIndex,
      playedTileID: currentState.dragData.draggedTileID,
      playedOfferIndex: currentState.dragData.draggedOfferIndex,
    });

    return updatedState;
  } else if (payload.action == "playBot") {
    const playedTileID = currentState.remainingTileIDs[payload.offerIndex];

    if (playedTileID === null) {
      throw new Error("bot did not play a tile");
    }

    const updatedState = updateStateWithPlayedTile({
      currentState,
      playedBoardIndex: payload.boardIndex,
      playedTileID,
      playedOfferIndex: payload.offerIndex,
    });

    return updatedState;
  } else {
    console.log(
      `unknown action: ${(payload as unknown as {action: string}).action}`,
    );
    return currentState;
  }
}
