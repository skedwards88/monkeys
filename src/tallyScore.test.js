import { tallyScore } from "./tallyScore";
import { BoardRoute, TileRoute } from "./tiles";

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
