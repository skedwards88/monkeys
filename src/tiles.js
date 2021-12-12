export class TileRoute {
  constructor({
    tileHead = null,
    tileTail = null,
    coconuts = 0,
    chests = 0,
    redShips = 0,
    blueShips = 0,
    redAnchors = 0,
    blueAnchors = 0,
  }) {
    // head and tail will be coordinates (0,0) to (1,1)
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

export class Tile {
  constructor({ routes }) {
    this.routes = routes;
  }
}

export class BoardRoute {
  constructor({ boardHead = null, boardTail = null, tileRoutes = [] }) {
    // head and tail are ints corresponding to location on the board.
    // Head and/or tail may be null if the route terminates.
    this.boardHead = boardHead;
    this.boardTail = boardTail;
    this.tileRoutes = tileRoutes;
  }
}

function getTiles() {
  const tile_list = [
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          tileTail: 2,
          coconuts: 1,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 3,
          coconuts: 1,
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
          coconuts: 1,
          redShips: 1,
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
          tileTail: 1,
          chests: 1,
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
          tileTail: null,
          coconuts: 1,
        }),
        new TileRoute({
          tileHead: 2,
          tileTail: null,
          blueAnchors: 1,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 3,
          redShips: 1,
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
          redShips: 1,
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
          coconuts: 2,
        }),
        new TileRoute({
          tileHead: null,
          tileTail: 2,
          redShips: 1,
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
          redShips: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          tileTail: 3,
          blueShips: 1,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 2,
          redShips: 1,
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
          tileHead: null,
          tileTail: 2,
          redAnchors: 1,
        }),
        new TileRoute({
          tileHead: 1,
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
          coconuts: 1,
          chests: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          blueAnchors: 1,
        }),
        new TileRoute({
          tileHead: 1,
          blueShips: 1,
        }),
        new TileRoute({
          tileHead: 2,
          tileTail: 3,
          redShips: 1,
          coconuts: 1,
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
          blueAnchors: 1,
        }),
        new TileRoute({
          tileHead: 2,
          coconuts: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          tileTail: 3,
          redShips: 1,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 2,
          coconuts: 2,
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
          coconuts: 1,
        }),
        new TileRoute({
          tileHead: 3,
          redAnchors: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          tileTail: 1,
          coconuts: 2,
        }),
        new TileRoute({
          tileHead: 2,
          tileTail: 3,
          chests: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          coconuts: 2,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 2,
          blueShips: 1,
        }),
        new TileRoute({
          tileHead: 3,
          coconuts: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          coconuts: 1,
        }),
        new TileRoute({
          tileHead: 2,
          blueShips: 1,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 3,
          blueShips: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          tileTail: 3,
          coconuts: 2,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 2,
          blueShips: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          redAnchors: 1,
        }),
        new TileRoute({
          tileHead: 1,
          tileTail: 2,
          blueShips: 2,
        }),
        new TileRoute({
          tileHead: 3,
          coconuts: 1,
        }),
      ],
    }),
    new Tile({
      routes: [
        new TileRoute({
          tileHead: 0,
          tileTail: 1,
          chests: 1,
        }),
        new TileRoute({
          tileHead: 2,
          tileTail: 3,
          redShips: 2,
        }),
      ],
    }),
  ];

  let tiles = {};

  tile_list.forEach((tile, index) => (tiles[index] = tile));

  return tiles;
}

export const tiles = getTiles();
