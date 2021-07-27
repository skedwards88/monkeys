import {
  shuffleArray,
  getBoardNodesFromFlatIndex,
  updateRoutes,
  getInitialSetup,
} from "./index";
import { tallyScore } from "./Score";
import { BoardRoute, TileRoute, tiles } from "./tiles";

test("Shuffle an array", () => {
  let original = [1, 2, 3, 4, 5];
  let input = original.slice();
  shuffleArray(input);
  let originalSet = new Set(original);
  let shuffledSet = new Set(input);
  expect(input).not.toEqual(original);
  expect(input.length).toEqual(original.length);
  expect(originalSet).toEqual(shuffledSet);
});

test("getBoardNodesFromFlatIndex", () => {
  expect(getBoardNodesFromFlatIndex(0, 9)).toEqual([0, 1, 10, 11]);
  expect(getBoardNodesFromFlatIndex(15, 4)).toEqual([18, 19, 23, 24]);
  expect(getBoardNodesFromFlatIndex(2, 4)).toEqual([2, 3, 7, 8]);
  expect(getBoardNodesFromFlatIndex(12, 4)).toEqual([15, 16, 20, 21]);
});

test("tallyScore: If a board route is tied, neither player receives points", () => {
  let routes = [
    new BoardRoute({
      tileRoutes: [
        new TileRoute({
          coconuts: 2,
          chests: 0,
          redShips: 1,
          blueShips: 0,
          redAnchors: 0,
          blueAnchors: 0,
        }),
        new TileRoute({
          coconuts: 2,
          chests: 0,
          redShips: 0,
          blueShips: 1,
          redAnchors: 0,
          blueAnchors: 0,
        }),
      ],
    }),
  ];

  let expectedScore = { red: 0, blue: 0 };

  expect(tallyScore(routes)).toEqual(expectedScore);
});

test("tallyScore: If the score is tied overall but players earned points for separate routes, the points are displayed:", () => {
  let routes = [
    new BoardRoute({
      tileRoutes: [
        new TileRoute({
          coconuts: 2,
          chests: 0,
          redShips: 1,
          blueShips: 0,
          redAnchors: 0,
          blueAnchors: 0,
        }),
        new TileRoute({
          coconuts: 2,
          chests: 0,
          redShips: 1,
          blueShips: 0,
          redAnchors: 0,
          blueAnchors: 0,
        }),
      ],
    }),
    new BoardRoute({
      tileRoutes: [
        new TileRoute({
          coconuts: 2,
          chests: 0,
          redShips: 0,
          blueShips: 1,
          redAnchors: 0,
          blueAnchors: 0,
        }),
        new TileRoute({
          coconuts: 2,
          chests: 0,
          redShips: 0,
          blueShips: 1,
          redAnchors: 0,
          blueAnchors: 0,
        }),
      ],
    }),
  ];

  let expectedScore = { red: 4, blue: 4 };

  expect(tallyScore(routes)).toEqual(expectedScore);
});

test("tallyScore: If there are no routes, the score is 0", () => {
  let routes = [];

  let expectedScore = { red: 0, blue: 0 };

  expect(tallyScore(routes)).toEqual(expectedScore);
});

// test("updateRoutes, starting tiles 0-3, add tile 4 to left of tile 1 (index 9)", () => {
//   const [_, __, startingRoutesTiles_0_1_2_3] = getInitialSetup(9, 7);
//   // console.log(JSON.parse(JSON.stringify(startingRoutesTiles_0_1_2_3)));
//   const tile_1 = tiles["4"];
//   const newRoutes = updateRoutes(startingRoutesTiles_0_1_2_3, tile_1, 9, 7);
//   expect(updateRoutes(startingRoutesTiles_0_1_2_3, tile_1, 9, 7)).toEqual([
//     0, 1, 10, 11,
//   ]);
// });
