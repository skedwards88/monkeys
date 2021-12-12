import { getBoardNodesFromFlatIndex } from "./getBoardNodesFromFlatIndex";
import { shuffleArray } from "./shuffleArray";
import { tiles, BoardRoute } from "./tiles.js";

export function getInitialSetup({ numRows, numColumns, force = false }) {
  if (!force) {
    const previousGame = window.localStorage.getItem("gameState");
    if (previousGame) {
      console.log("using prev");
      return JSON.parse(previousGame);
    }
  }

  // Shuffle the tiles
  const remainingTileIDs = shuffleArray(Object.keys(tiles));

  // Draw 4 tiles for the starting board
  const initialTiles = remainingTileIDs.splice(0, 4);

  // Make the starting board
  const startingPositions = [10, 24, 38, 52]; // todo can calc instead
  const numSquares = numColumns * numRows;
  let startingBoard = Array(numSquares).fill(null);
  initialTiles.forEach((tile, index) => {
    let startingPosition = startingPositions[index];
    startingBoard[startingPosition] = tile;
  });

  // Calculate the routes present on the starting tiles
  // (Right now, each route on the tile will be a unique route; don't need to worry about the tiles connecting)
  let startingRoutes = [];
  initialTiles.forEach((tile, index) => {
    // Convert the row/col where the tile was placed to board node numbers
    let startingPosition = startingPositions[index];
    let boardNodes = getBoardNodesFromFlatIndex(startingPosition, numColumns);

    // For each route on the tile, convert the tile-relative head/tail to board-relative head/tail
    // and add the route to the starting routes
    for (let route of tiles[tile].routes) {
      let head = boardNodes[route.tileHead];
      let tail = boardNodes[route.tileTail];
      let boardRoute = new BoardRoute({
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
  };
}
