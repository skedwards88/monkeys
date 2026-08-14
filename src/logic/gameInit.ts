import {getBoardNodesFromFlatIndex} from "./getBoardNodesFromFlatIndex";
import {shuffleArray} from "@skedwards88/word_logic";
import {tiles, BoardRoute} from "./tiles";
import {getFromStorage} from "@skedwards88/shared-components/src/logic/safeStorage";

export type GameState = {
  remainingTileIDs: (number | null)[];
  played: (null | number)[];
  routes: BoardRoute[];
  numColumns: number;
  numRows: number;
  gameOverCleared: boolean;
};

export function gameInit({useSaved = true}: {useSaved?: boolean}): GameState {
  const numRows = 9;
  const numColumns = 7;

  if (useSaved) {
    const savedState = getFromStorage<GameState>("gameState");
    if (savedState) {
      return savedState;
    }
  }

  // Shuffle the tile IDs
  const remainingTileIDs = shuffleArray(
    Array.from({length: tiles.length}, (_, index) => index),
  );

  // Draw 4 tile IDs for the starting board
  const initialTileIDs = remainingTileIDs.splice(0, 4);

  // Make the starting board
  const startingPositions = [10, 24, 38, 52]; // todo can calc instead
  const numSquares = numColumns * numRows;
  const startingBoard = Array(numSquares).fill(null);
  initialTileIDs.forEach((tileID, index) => {
    const startingPosition = startingPositions[index];
    startingBoard[startingPosition] = tileID;
  });

  // Calculate the routes present on the starting tiles
  // (Right now, each route on the tile will be a unique route; don't need to worry about the tiles connecting)
  const startingRoutes: BoardRoute[] = [];
  initialTileIDs.forEach((tileID, index) => {
    // Convert the row/col where the tile was placed to board node numbers
    const startingPosition = startingPositions[index];
    const boardNodes = getBoardNodesFromFlatIndex(startingPosition, numColumns);

    // For each route on the tile, convert the tile-relative head/tail to board-relative head/tail
    // and add the route to the starting routes
    for (const route of tiles[tileID].routes) {
      const head = route.tileHead != null ? boardNodes[route.tileHead] : null;
      const tail = route.tileTail != null ? boardNodes[route.tileTail] : null;
      const boardRoute = new BoardRoute({
        boardHead: head,
        boardTail: tail,
        tileRoutes: [route],
      });
      startingRoutes.push(boardRoute);
    }
  });

  return {
    remainingTileIDs: remainingTileIDs,
    played: startingBoard,
    routes: startingRoutes,
    numColumns,
    numRows,
    gameOverCleared: false,
  };
}
