export class TileRoute {
    constructor({
                    tile_head=null,
                    tile_tail=null,
                    coconuts=0,
                    chests=0,
                    redShips=0,
                    blueShips=0,
                    redAnchors=0,
                    blueAnchors=0
                }) {
        // head and tail will be coordinates (0,0) to (1,1) which will be converted to an int referring to board
        // placement once placed.
        // Head or tail may be null if the route terminates.
        this.tile_head = tile_head;
        this.tile_tail = tile_tail;

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
                    tile_routes=[],
                }) {
        // head and tail are ints corresponding to location on the board.
        // Head and/or tail may be null if the route terminates.
        this.boardHead = boardHead;
        this.boardTail = boardTail;

        this.tile_routes = tile_routes;
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
        for (let tile_route of this.tile_routes) {
            coconuts += tile_route.coconuts;
            chests += tile_route.chests;
            redShips += tile_route.redShips;
            blueShips += tile_route.blueShips;
            redAnchors += tile_route.redAnchors;
            blueAnchors += tile_route.blueAnchors;
        }

        let value = chests ? coconuts * 2 : coconuts;
        let num_red = redAnchors ? redShips * 2 : redShips;
        let num_blue = blueAnchors ? blueShips * 2 : blueShips;
        if (num_blue > num_red) {
            return {red: 0, blue: value};
        } else if (num_red > num_blue) {
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
                tile_head: 0,
                tile_tail: 2,
                coconuts: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 3,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:2,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: null,
                blueShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                coconuts: 1,
                redShips: 1,
            }),
            new TileRoute({
                tile_head: 3,
                tile_tail: null,
                blueAnchors: 1
            }),
        ]
    }),
    new Tile({
        id:3,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 1,
                chests: 1,
            }),
            new TileRoute({
                tile_head: 2,
                tile_tail: 3,
                blueShips: 2,
            }),
        ]
    }),
    new Tile({
        id:4,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: null,
                coconuts: 1
            }),
            new TileRoute({
                tile_head: 2,
                tile_tail: null,
                blueAnchors: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 3,
                redShips: 1,
            }),
        ]
    }),
    new Tile({
        id:5,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: null,
                coconuts: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                redShips: 1,
            }),
            new TileRoute({
                tile_head: 3,
                tile_tail: null,
                coconuts: 2,
            }),
        ]
    }),
    new Tile({
        id:6,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 1,
                coconuts: 2,
            }),
            new TileRoute({
                tile_head: null,
                tile_tail: 2,
                redShips: 1,
            }),
            new TileRoute({
                tile_head: 3,
                tile_tail: null,
                blueShips: 1,
            }),
        ]
    }),
    new Tile({
        id:7,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 2,
                redShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: null,
                coconuts: 1,
            }),
            new TileRoute({
                tile_head: 3,
                tile_tail: null,
                redShips: 1
            }),
        ]
    }),
    new Tile({
        id:8,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 3,
                blueShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                redShips: 1,
            }),
        ]
    }),
    new Tile({
        id:9,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 3,
                blueShips: 1,
                coconuts: 1,
            }),
            new TileRoute({
                tile_head: null,
                tile_tail: 2,
                redAnchors: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: null,
                redShips: 1,
            }),
        ]
    }),
    new Tile({
        id:10,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: null,
                redShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: null,
                redAnchors: 1,
            }),
            new TileRoute({
                tile_head: 2,
                tile_tail: 3,
                coconuts: 1,
                chests: 1,
            }),
        ]
    }),
    new Tile({
        id:11,
        routes:[
            new TileRoute({
                tile_head: 0,
                blueAnchors: 1,
            }),
            new TileRoute({
                tile_head: 1,
                blueShips: 1,
            }),
            new TileRoute({
                tile_head: 2,
                tile_tail: 3,
                redShips: 1,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:12,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 3,
                redShips: 2,
            }),
            new TileRoute({
                tile_head: 1,
                blueAnchors: 1,
            }),
            new TileRoute({
                tile_head: 2,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:13,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 3,
                redShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                coconuts: 2,
            }),
        ]
    }),
    new Tile({
        id:14,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 2,
                blueShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                coconuts: 1,
            }),
            new TileRoute({
                tile_head: 3,
                redAnchors: 1,
            }),
        ]
    }),
    new Tile({
        id:15,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 1,
                coconuts: 2,
            }),
            new TileRoute({
                tile_head: 2,
                tile_tail: 3,
                chests: 1,
            }),
        ]
    }),
    new Tile({
        id:16,
        routes:[
            new TileRoute({
                tile_head: 0,
                coconuts: 2,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                blueShips: 1,
            }),
            new TileRoute({
                tile_head: 3,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:17,
        routes:[
            new TileRoute({
                tile_head: 0,
                coconuts: 1,
            }),
            new TileRoute({
                tile_head: 2,
                blueShips: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 3,
                blueShips: 1,
            }),
        ]
    }),
    new Tile({
        id:18,
        routes:[
            new TileRoute({
                tile_head: 0,
                tile_tail: 3,
                coconuts: 2,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                blueShips: 1,
            }),
        ]
    }),
    new Tile({
        id:19,
        routes:[
            new TileRoute({
                tile_head: 0,
                redAnchors: 1,
            }),
            new TileRoute({
                tile_head: 1,
                tile_tail: 2,
                blueShips: 2,
            }),
            new TileRoute({
                tile_head: 3,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id: 20,
        routes: [
            new TileRoute({
                tile_head: 0,
                tile_tail: 1,
                chests: 1,
            }),
            new TileRoute({
                tile_head: 2,
                tile_tail: 3,
                redShips: 2,
            }),
        ]
    }),
];