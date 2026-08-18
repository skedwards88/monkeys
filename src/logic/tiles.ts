type TileRouteParams = {
  tileHead?: 0 | 1 | 2 | 3 | null;
  tileTail?: 0 | 1 | 2 | 3 | null;
  coconuts?: number;
  chests?: number;
  redShips?: number;
  blueShips?: number;
  redAnchors?: number;
  blueAnchors?: number;
};

export class TileRoute {
  tileHead: 0 | 1 | 2 | 3 | null;
  tileTail: 0 | 1 | 2 | 3 | null;
  coconuts: number;
  chests: number;
  redShips: number;
  blueShips: number;
  redAnchors: number;
  blueAnchors: number;

  constructor({
    tileHead = null,
    tileTail = null,
    coconuts = 0,
    chests = 0,
    redShips = 0,
    blueShips = 0,
    redAnchors = 0,
    blueAnchors = 0,
  }: TileRouteParams = {}) {
    // head and tail will each be a number that together represents coordinates (0,0) to (1,1)
    // describing their location on the tile.
    // They will be converted to an int referring to
    // board placement once placed.
    // Head or tail may be null if the route terminates.
    this.tileHead = tileHead;
    this.tileTail = tileTail;

    // The number of each type of feature on the route
    this.coconuts = coconuts;
    this.chests = chests;
    this.redShips = redShips;
    this.blueShips = blueShips;
    this.redAnchors = redAnchors;
    this.blueAnchors = blueAnchors;
  }
}

type TileParams = {
  routes: TileRoute[];
};

export class Tile {
  routes: TileRoute[];

  constructor({routes}: TileParams) {
    this.routes = routes;
  }
}

type BoardRouteParams = {
  boardHead?: number | null;
  boardTail?: number | null;
  tileRoutes?: TileRoute[];
};

export class BoardRoute {
  boardHead: number | null;
  boardTail: number | null;
  tileRoutes: TileRoute[];

  constructor({
    boardHead = null,
    boardTail = null,
    tileRoutes = [],
  }: BoardRouteParams = {}) {
    // head and tail are ints corresponding to location on the board.
    // Head and/or tail may be null if the route terminates.
    this.boardHead = boardHead;
    this.boardTail = boardTail;
    this.tileRoutes = tileRoutes;
  }
}

export const tiles = [
  new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 2,
        coconuts: 1,
        chests: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: 3,
        coconuts: 2,
      }),
    ],
  }),
  new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        coconuts: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: 3,
        redShips: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: null,
        blueAnchors: 1,
      }),
    ],
  }),
  new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        coconuts: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: 3,
        blueShips: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: null,
        redShips: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 2,
        redShips: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: null,
        coconuts: 1,
      }),
      new TileRoute({
        tileHead: 3,
        tileTail: null,
        blueShips: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 2,
        blueShips: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: null,
        chests: 1,
      }),
      new TileRoute({
        tileHead: 3,
        tileTail: null,
        redAnchors: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        blueShips: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: 2,
        redShips: 1,
        coconuts: 1,
      }),
      new TileRoute({
        tileHead: 3,
        tileTail: null,
        blueAnchors: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 3,
        blueShips: 1,
        coconuts: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: null,
        redShips: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: null,
        redAnchors: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 3,
        redShips: 2,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: null,
        blueAnchors: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: null,
        coconuts: 2,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        coconuts: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: 2,
        blueShips: 2,
      }),
      new TileRoute({
        tileHead: 3,
        tileTail: null,
        coconuts: 2,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 1,
        coconuts: 1,
        chests: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: 3,
        redShips: 2,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 1,
        coconuts: 1,
        redAnchors: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: 3,
        blueShips: 2,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 1,
        coconuts: 1,
        redShips: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: 3,
        coconuts: 1,
        chests: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: 1,
        coconuts: 1,
        blueAnchors: 1,
      }),
      new TileRoute({
        tileHead: 2,
        tileTail: null,
        blueShips: 1,
      }),
        new TileRoute({
        tileHead: 3,
        tileTail: null,
        redShips: 1,
      }),
    ],
  }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        redShips: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: null,
        redAnchors: 1,
      }),
        new TileRoute({
        tileHead: 2,
        tileTail: 3,
        blueAnchors: 1,
        coconuts: 2,
      }),
    ],
    }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        blueAnchors: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: null,
        blueShips: 1,
      }),
        new TileRoute({
        tileHead: 2,
        tileTail: 3,
        redAnchors: 1,
        coconuts: 2,
      }),
    ],
    }),
    new Tile({
    routes: [
      new TileRoute({
        tileHead: 0,
        tileTail: null,
        redAnchors: 1,
      }),
      new TileRoute({
        tileHead: 1,
        tileTail: 2,
        blueShips: 1,
        coconuts: 1,
      }),
        new TileRoute({
        tileHead: 3,
        tileTail: null,
        chests: 1,
      }),
    ],
    })]