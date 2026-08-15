import {getBoardNodesFromFlatIndex} from "./getBoardNodesFromFlatIndex";
import {BoardRoute, tiles} from "./tiles";
import {updateRoutes} from "./updateRoutes";

describe("updateRoutes", () => {
  test("does not mutate the input routes", () => {
    const startingRoutes: BoardRoute[] = [];
    [11, 16, 12, 14].forEach((tileID, index) => {
      // Convert the row/col where the tile was placed to board node numbers
      const startingPosition = [10, 24, 38, 52][index];
      const boardNodes = getBoardNodesFromFlatIndex(startingPosition, 7);

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

    const initialRoutes = structuredClone(startingRoutes);

    updateRoutes(startingRoutes, tiles[17], 16, 7);

    const postUpdateInitialRoutes = structuredClone(startingRoutes);

    expect(initialRoutes).toEqual(postUpdateInitialRoutes);
  });
});
