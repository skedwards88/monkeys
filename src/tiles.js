
export class TileRoute {
    constructor(head, tail, coconuts, chests, redShips, blueShips, redAnchors, blueAnchors) {
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

export class Tile {
    constructor(id, routes) {
        this.id = id;
        this.routes = routes;
    }
}

export class BoardRoute {
    constructor(head, tail, coconuts, chests, redShips, blueShips, redAnchors, blueAnchors) {
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

        // Score will be calculated from the features
        this.score = 0;  // todo should be from features instead of 0 to start
    }
}

// todo define tiles elsewhere and import them
export const tiles = [
    new Tile(1),
    new Tile(2),
    new Tile(3),
    new Tile(4),
    new Tile(5),
    new Tile(6),
    new Tile(7),
    new Tile(8),
    new Tile(9),
    new Tile(10),
    new Tile(11),
    new Tile(12),
    new Tile(13),
    new Tile(14),
    new Tile(15),
    new Tile(16),
    new Tile(17),
    new Tile(18),
    new Tile(19),
    new Tile(20),
];