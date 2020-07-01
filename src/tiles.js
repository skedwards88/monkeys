
export class TileRoute {
    constructor({
                    head=null,
                    tail=null,
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
        this.head = head;
        this.tail = tail;

        // The number of each type of feature on the route
        this.coconuts = coconuts;
        this.chests = chests;
        this.redShips = redShips;
        this.blueShips = blueShips;
        this.redAnchors = redAnchors;
        this.blueAnchors = blueAnchors;
    }
}

//todo make tile and board route inherit from shared class?

export class Tile {
    constructor({id, routes}) {
        this.id = id;
        this.routes = routes;
    }
}

export class BoardRoute {
    constructor({
                    head=null,
                    tail=null,
                    coconuts=0,
                    chests=0,
                    redShips=0,
                    blueShips=0,
                    redAnchors=0,
                    blueAnchors=0
                }) {
        // head and tail are ints corresponding to location on the board.
        // Head and/or tail may be null if the route terminates.
        this.head = head;
        this.tail = tail;

        // The number of each type of feature on the route
        this.coconuts = coconuts;
        this.chests = chests;
        this.redShips = redShips;
        this.blueShips = blueShips;
        this.redAnchors = redAnchors;
        this.blueAnchors = blueAnchors;

    }

    // Getter
    get score() {
        return this.calcScore();
    }
    // Method
    calcScore() {
        let value = this.chests ? this.coconuts * 2 : this.coconuts;
        let num_red = this.redAnchors ? this.redShips * 2 : this.redShips;
        let num_blue = this.blueAnchors ? this.blueShips * 2 : this.blueShips;
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
                head: 0,
                tail: 2,
                coconuts: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 3,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:2,
        routes:[
            new TileRoute({
                head: 0,
                tail: null,
                blueShips: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                coconuts: 1,
                redShips: 1,
            }),
            new TileRoute({
                head: 3,
                tail: null,
                blueAnchors: 1
            }),
        ]
    }),
    new Tile({
        id:3,
        routes:[
            new TileRoute({
                head: 0,
                tail: 1,
                chests: 1,
            }),
            new TileRoute({
                head: 2,
                tail: 3,
                blueShips: 2,
            }),
        ]
    }),
    new Tile({
        id:4,
        routes:[
            new TileRoute({
                head: 0,
                tail: null,
                coconuts: 1
            }),
            new TileRoute({
                head: 2,
                tail: null,
                blueAnchors: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 3,
                redShips: 1,
            }),
        ]
    }),
    new Tile({
        id:5,
        routes:[
            new TileRoute({
                head: 0,
                tail: null,
                coconuts: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                redShips: 1,
            }),
            new TileRoute({
                head: 3,
                tail: null,
                coconuts: 2,
            }),
        ]
    }),
    new Tile({
        id:6,
        routes:[
            new TileRoute({
                head: 0,
                tail: 1,
                coconuts: 2,
            }),
            new TileRoute({
                head: null,
                tail: 2,
                redShips: 1,
            }),
            new TileRoute({
                head: 3,
                tail: null,
                blueShips: 1,
            }),
        ]
    }),
    new Tile({
        id:7,
        routes:[
            new TileRoute({
                head: 0,
                tail: 2,
                redShips: 1,
            }),
            new TileRoute({
                head: 1,
                tail: null,
                coconuts: 1,
            }),
            new TileRoute({
                head: 3,
                tail: null,
                redShips: 1
            }),
        ]
    }),
    new Tile({
        id:8,
        routes:[
            new TileRoute({
                head: 0,
                tail: 3,
                blueShips: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                redShips: 1,
            }),
        ]
    }),
    new Tile({
        id:9,
        routes:[
            new TileRoute({
                head: 0,
                tail: 3,
                blueShips: 1,
                coconuts: 1,
            }),
            new TileRoute({
                head: null,
                tail: 2,
                redAnchors: 1,
            }),
            new TileRoute({
                head: 1,
                tail: null,
                redShips: 1,
            }),
        ]
    }),
    new Tile({
        id:10,
        routes:[
            new TileRoute({
                head: 0,
                tail: null,
                redShips: 1,
            }),
            new TileRoute({
                head: 1,
                tail: null,
                redAnchors: 1,
            }),
            new TileRoute({
                head: 2,
                tail: 3,
                coconuts: 1,
                chests: 1,
            }),
        ]
    }),
    new Tile({
        id:11,
        routes:[
            new TileRoute({
                head: 0,
                blueAnchors: 1,
            }),
            new TileRoute({
                head: 1,
                blueShips: 1,
            }),
            new TileRoute({
                head: 2,
                tail: 3,
                redShips: 1,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:12,
        routes:[
            new TileRoute({
                head: 0,
                tail: 3,
                redShips: 2,
            }),
            new TileRoute({
                head: 1,
                blueAnchors: 1,
            }),
            new TileRoute({
                head: 2,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:13,
        routes:[
            new TileRoute({
                head: 0,
                tail: 3,
                redShips: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                coconuts: 2,
            }),
        ]
    }),
    new Tile({
        id:14,
        routes:[
            new TileRoute({
                head: 0,
                tail: 2,
                blueShips: 1,
            }),
            new TileRoute({
                head: 1,
                coconuts: 1,
            }),
            new TileRoute({
                head: 3,
                redAnchors: 1,
            }),
        ]
    }),
    new Tile({
        id:15,
        routes:[
            new TileRoute({
                head: 0,
                tail: 1,
                coconuts: 2,
            }),
            new TileRoute({
                head: 2,
                tail: 3,
                chests: 1,
            }),
        ]
    }),
    new Tile({
        id:16,
        routes:[
            new TileRoute({
                head: 0,
                coconuts: 2,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                blueShips: 1,
            }),
            new TileRoute({
                head: 3,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id:17,
        routes:[
            new TileRoute({
                head: 0,
                coconuts: 1,
            }),
            new TileRoute({
                head: 2,
                blueShips: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 3,
                blueShips: 1,
            }),
        ]
    }),
    new Tile({
        id:18,
        routes:[
            new TileRoute({
                head: 0,
                tail: 3,
                coconuts: 2,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                blueShips: 1,
            }),
        ]
    }),
    new Tile({
        id:19,
        routes:[
            new TileRoute({
                head: 0,
                redAnchors: 1,
            }),
            new TileRoute({
                head: 1,
                tail: 2,
                blueShips: 2,
            }),
            new TileRoute({
                head: 3,
                coconuts: 1,
            }),
        ]
    }),
    new Tile({
        id: 20,
        routes: [
            new TileRoute({
                head: 0,
                tail: 1,
                chests: 1,
            }),
            new TileRoute({
                head: 2,
                tail: 3,
                redShips: 2,
            }),
        ]
    }),
];