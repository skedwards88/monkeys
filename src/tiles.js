export class TileRoute {
    constructor({
                    tileHead=null,
                    tileTail=null,
                    coconuts=0,
                    chests=0,
                    redShips=0,
                    blueShips=0,
                    redAnchors=0,
                    blueAnchors=0
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
    constructor({id, routes}) {
        this.id = id;
        this.routes = routes;
    }
}

export class BoardRoute {
    constructor({
                    boardHead=null,
                    boardTail=null,
                    tileRoutes=[],
                }) {
        // head and tail are ints corresponding to location on the board.
        // Head and/or tail may be null if the route terminates.
        this.boardHead = boardHead;
        this.boardTail = boardTail;

        this.tileRoutes = tileRoutes;
    }

    // Getter
    get score() {
        return this.calcScore();
    }
    // Method
    calcScore() {
        // Count the features across all tile routes in this route
        let coconuts = 0;
        let chests = 0;
        let redShips = 0;
        let blueShips = 0;
        let redAnchors = 0;
        let blueAnchors = 0;
        for (let tileRoute of this.tileRoutes) {
            coconuts += tileRoute.coconuts;
            chests += tileRoute.chests;
            redShips += tileRoute.redShips;
            blueShips += tileRoute.blueShips;
            redAnchors += tileRoute.redAnchors;
            blueAnchors += tileRoute.blueAnchors;
        }

        let value = chests ? coconuts * 2 : coconuts;
        let numRed = redAnchors ? redShips * 2 : redShips;
        let numBlue = blueAnchors ? blueShips * 2 : blueShips;
        if (numBlue > numRed) {
            return {red: 0, blue: value};
        } else if (numRed > numBlue) {
            return {red: value, blue: 0};
        } else {
            return {red: 0, blue: 0};
        }
    }
}

export const tiles = [
    new Tile({
        id: 1,
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
        ]
    }),
    new Tile({
        id:2,
        routes:[
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
                blueAnchors: 1
            }),
        ]
    }),
    new Tile({
        id:3,
        routes:[
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
        ]
    }),
    new Tile({
        id:4,
        routes:[
            new TileRoute({
                tileHead: 0,
                tileTail: null,
                coconuts: 1
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
        ]
    }),
    new Tile({
        id:5,
        routes:[
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
        ]
    }),
    new Tile({
        id:6,
        routes:[
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
        ]
    }),
    new Tile({
        id:7,
        routes:[
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
                redShips: 1
            }),
        ]
    }),
    new Tile({
        id:8,
        routes:[
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
        ]
    }),
    new Tile({
        id:9,
        routes:[
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
        ]
    }),
    new Tile({
        id:10,
        routes:[
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
        ]
    }),
    new Tile({
        id:11,
        routes:[
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
        ]
    }),
    new Tile({
        id:12,
        routes:[
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
        ]
    }),
    new Tile({
        id:13,
        routes:[
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
        ]
    }),
    new Tile({
        id:14,
        routes:[
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
        ]
    }),
    new Tile({
        id:15,
        routes:[
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
        ]
    }),
    new Tile({
        id:16,
        routes:[
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
        ]
    }),
    new Tile({
        id:17,
        routes:[
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
        ]
    }),
    new Tile({
        id:18,
        routes:[
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
        ]
    }),
    new Tile({
        id:19,
        routes:[
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
        ]
    }),
    new Tile({
        id: 20,
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
        ]
    }),
];