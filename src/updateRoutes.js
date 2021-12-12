import { getBoardNodesFromFlatIndex } from "./getBoardNodesFromFlatIndex";
import { BoardRoute } from "./tiles";

export function updateRoutes(boardRoutes, tile, flatIndex, numColumns) {
  // Convert the row/col where the tile was placed to numbers describing
  // the corner positions ("nodes") of the tile on the board
  let boardNodes = getBoardNodesFromFlatIndex(flatIndex, numColumns);

  // For each route on the placed tile:
  for (let tileRoute of tile.routes) {
    // Convert the tile head/tail (0, 1, 2, 3, or null) to the corresponding board node
    let convertedTileHead =
      typeof tileRoute.tileHead === "number"
        ? boardNodes[tileRoute.tileHead]
        : null;
    let convertedTileTail =
      typeof tileRoute.tileTail === "number"
        ? boardNodes[tileRoute.tileTail]
        : null;

    // Find if there is an existing board route that matches the tile route head/tail
    // There will be max 1 route match for head and tail each
    let headMatch = null;
    let tailMatch = null;

    for (let boardRoute of boardRoutes) {
      // If there is a head on the tile route
      // and we haven't found a head match
      // and the board route head or tail position matches the position of the tile route head
      // record the board route as the head match
      if (
        convertedTileHead &&
        !headMatch &&
        (boardRoute.boardHead === convertedTileHead ||
          boardRoute.boardTail === convertedTileHead)
      ) {
        headMatch = boardRoute;
      }

      // If there is a tail on the tile route
      // and we haven't found a tail match
      // and the board route head or tail position matches the position of the tile route tail
      // record the board route as the tail match
      if (
        convertedTileTail &&
        !tailMatch &&
        (boardRoute.boardHead === convertedTileTail ||
          boardRoute.boardTail === convertedTileTail)
      ) {
        tailMatch = boardRoute;
      }

      // If all possible matches have been found, exit.
      // (There will be a max 1 route matching the head and 1 matching the tail.)
      if (
        (headMatch || !convertedTileHead) &&
        (tailMatch || !convertedTileTail)
      ) {
        break;
      }
    }

    // If no match was found for the tile route head or tail,
    // add the tile route as a new board route
    if (!headMatch && !tailMatch) {
      let newRoute = new BoardRoute({
        boardHead: convertedTileHead,
        boardTail: convertedTileTail,
        tileRoutes: [tileRoute],
      });
      boardRoutes.push(newRoute);
    }

    // If only a head or tail (but not both) match was found,
    // update the matching board route head/tail with the head/tail non-match
    // and update the board route members
    else if ((headMatch && !tailMatch) || (tailMatch && !headMatch)) {
      // Get the matching board route
      let matchingRoute = headMatch ? headMatch : tailMatch;

      // If the board route matched at the head of the tile route,
      // the tile tail will replace the board route head or tail
      // Otherwise, the tile head will replace the board route head or tail
      let newValue = headMatch ? convertedTileTail : convertedTileHead;

      // Find the node where the board route joins the tile route
      let matchingValue = headMatch ? convertedTileHead : convertedTileTail;

      // Update the board route head or tail (whichever joins to the new tile) to be the new value
      matchingRoute.boardHead === matchingValue
        ? (matchingRoute.boardHead = newValue)
        : (matchingRoute.boardTail = newValue);

      // Add the new tile to the route
      matchingRoute.tileRoutes.push(tileRoute);
    }

    // If head and tail match the same board route, the route is now a loop.
    // Set the route head/tail to null
    // and update the board route members
    else if (headMatch === tailMatch) {
      headMatch.boardHead = null;
      headMatch.boardTail = null;
      headMatch.tileRoutes.push(tileRoute);
    }

    // Otherwise, head and tail match different routes; the routes are now joined.
    // Update head/tail on one route,
    // add the new tile and the tiles from the other route to the updated route,
    // delete the other route
    else {
      // For both matching board routes, set the terminus that doesn't connect to the new tile to be the new head/tail
      let newHead =
        headMatch.boardHead === convertedTileHead ||
        headMatch.boardHead === convertedTileTail
          ? headMatch.boardTail
          : headMatch.boardHead;
      let newTail =
        tailMatch.boardHead === convertedTileHead ||
        tailMatch.boardHead === convertedTileTail
          ? tailMatch.boardTail
          : tailMatch.boardHead;

      // Arbitrarily keep the "head route" as the base route
      // Update the head and tail
      headMatch.boardHead = newHead;
      headMatch.boardTail = newTail;

      // Update the tiles in the route
      headMatch.tileRoutes = headMatch.tileRoutes.concat(tailMatch.tileRoutes);
      headMatch.tileRoutes.push(tileRoute);

      // Delete the other board route
      let indexToDelete = boardRoutes.indexOf(tailMatch);
      boardRoutes.splice(indexToDelete, 1);
    }
  }
  return boardRoutes;
}
