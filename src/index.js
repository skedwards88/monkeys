import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { tiles, BoardRoute } from './tiles.js'


// would like draw pile to visually reflect number left
// make offer on side for screen size less that x
// make variables pascal not snake case
// TESTS!
// lock in place? Or center to mouse?
// add rules
// add rule images/animations
// able to build images through css? worth it? able to have layer images for chest and anchors on/off instead?
// resolve errors/warnings in console
// todo items

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getBoardNodesFromRowCol(row, column, num_columns) {
    let top_left = (row * (num_columns + 1) + column);
    let top_right = top_left + 1;
    let bottom_left = top_left + num_columns + 1;
    let bottom_right = bottom_left + 1;
    return [top_left, top_right, bottom_left, bottom_right]
}

function updateRoutes(oldRoutes, tile, row, column, num_columns) {

    // Convert the row/col where the tile was placed to board node numbers
    let board_nodes = getBoardNodesFromRowCol(row, column, num_columns);

    // For each route on the tile:
    for (let tile_route of tile.routes) {

        // Convert the tile head/tail (0,1,2,3, or null) to be the corresponding board node
        let converted_tile_head = typeof(tile_route.tile_head)==="number" ? board_nodes[tile_route.tile_head] : null;
        let converted_tile_tail = typeof(tile_route.tile_tail)==="number" ? board_nodes[tile_route.tile_tail] : null;

        // Find if there is an existing board route that matches the tile route head/tail
        // There will be max 1 route match for head and tail each
        let head_match = null;
        let tail_match = null;

        for (let board_route of oldRoutes) {
            // If there is a head on the tile route and we haven't found a head match
            // and the board route head or tail matches the tile route head
            if (converted_tile_head
                && !head_match
                && (board_route.boardHead === converted_tile_head || board_route.boardTail === converted_tile_head)) {
                head_match = board_route
            }
            // If there is a tail on the tile route and we haven't found a tail match
            // and the board route head or tail matches the tile route head
            if (converted_tile_tail
                && !tail_match
                && (board_route.boardHead === converted_tile_tail || board_route.boardTail === converted_tile_tail)) {
                tail_match = board_route
            }
            // If we found all possible matches, exit.
            // (There will be a max 1 route matching the head and 1 matching the tail.)
            if (
                ((converted_tile_head && head_match) || !converted_tile_head)
                && ((converted_tile_tail && tail_match) || !converted_tile_tail)
            ) {
                break;
            }
        }

        // If no match found for the tile route head or tail, add the tile route as a new board route
        if (!head_match && !tail_match) {
            let newRoute = new BoardRoute({
                boardHead:converted_tile_head,
                boardTail:converted_tile_tail,
                tile_routes:[tile_route]});
            oldRoutes.push(newRoute);
        }
        // If only a head or tail (but not both) match was found,
        // update the matching board route head/tail with the head/tail non-match and update the board route members
        else if ((head_match && !tail_match) || (tail_match && !head_match)) {
            let match = head_match ? head_match : tail_match; // todo is there a better way?
            if (match.boardHead === converted_tile_head) {
                match.boardHead = converted_tile_tail
            } else {
                match.boardTail = converted_tile_head
            }
            match.tile_routes.push(tile_route)
        }
        // If head and tail match the same board route, the route is now a loop.
        // Set the route head/tail to null and update the board route members
        else if (head_match === tail_match) {
            head_match.boardHead = null;
            head_match.boardTail = null;
            head_match.tile_routes.push(tile_route);
        }
        // Otherwise, head and tail match different routes; the routes are now joined.
        // Update head/tail on one route, add the new tile and the tiles from the other route, delete the other route
        else {
            let newHead = ((head_match.boardHead === converted_tile_head) || (head_match.boardHead === converted_tile_tail)) ? head_match.boardTail : head_match.boardHead;
            let newTail = ((tail_match.boardHead === converted_tile_head) || (tail_match.boardHead === converted_tile_tail)) ? tail_match.boardTail : tail_match.boardHead;
            head_match.boardHead = newHead;
            head_match.boardTail = newTail;

            head_match.tile_routes = head_match.tile_routes.concat(tail_match.tile_routes);
            head_match.tile_routes.push(tile_route);

            let indexToDelete = oldRoutes.indexOf(tail_match);
            oldRoutes.splice(indexToDelete, 1);
        }
    }
    console.log(oldRoutes);
    return oldRoutes
}

function tallyScore(routes){
    let newRedScore = 0;
    let newBlueScore = 0;
    for (let route of routes) {
        let score = route.score;
        newRedScore += score.red;
        newBlueScore += score.blue;
    }
    return {red:newRedScore, blue:newBlueScore}
}

const getInitialSetup = (num_rows, num_columns) => {
    // Shuffle the tiles
    const pool = tiles.slice();
    shuffleArray(pool);

    // Draw 3 tiles for the starting offer
    let startingOffer = [
        pool.pop(), pool.pop(), pool.pop()
    ];

    // Draw 4 tiles for the starting board
    let initialTiles = [
        pool.pop(), pool.pop(), pool.pop(), pool.pop()
    ];

    // Make the starting board
    let startingPositions = [{row:1,column:4},{row:3,column:4},{row:5,column:4},{row:7,column:4}];
    let startingBoard = Array.from({length: num_rows}, e => Array(num_columns).fill(null));
    initialTiles.forEach((tile, index) => {
        let startingPosition = startingPositions[index];
        startingBoard[startingPosition.row][startingPosition.column] = tile
    });

    // Calculate the routes present on the starting tiles
    // (Right now, each route on the tile will be a unique route; don't need to worry about the tiles connecting)
    let startingRoutes = [];
    initialTiles.forEach((tile, index) => {
        // Convert the row/col where the tile was placed to board node numbers
        let startingPosition = startingPositions[index];
        let board_nodes = getBoardNodesFromRowCol(startingPosition.row, startingPosition.column, num_columns);

        // For each route on the tile, convert the tile-relative head/tail to board-relative head/tail
        // and add the route to the starting routes
        for (let route of tile.routes) {
            let head = board_nodes[route.tile_head];
            let tail = board_nodes[route.tile_tail];
            let board_route = new BoardRoute({boardHead: head, boardTail: tail, tile_routes: [route]});
            startingRoutes.push(board_route);
        }
    });

    let startingScore = tallyScore(startingRoutes);

    return([pool, startingOffer, startingBoard, startingRoutes, startingScore])
};


function Game() {

    let num_rows = 9;
    let num_columns = 9;
    let [initialPool, startingOffer, startingBoard, startingRoutes, startingScore] = [[],[],[], [], []];

    const [newGameRequested, setNewGameRequested] = useState(true);  // todo can I find a better way to do this?
    const [offer, setOffer] = useState(startingOffer);
    const [pool, setPool] = useState(initialPool);
    const [played, setPlayed] = useState(startingBoard);
    const [routes, setRoutes] = useState(startingRoutes);
    const [showRules, setShowRules] = useState(false);
    const [currentRule, setCurrentRule] = useState(1);
    const [score,setScore] = useState(startingScore);

    if (newGameRequested) {
        setNewGameRequested(false);
        [initialPool, startingOffer, startingBoard, startingRoutes, startingScore] = getInitialSetup(num_rows, num_columns);
        setPool(initialPool);
        setOffer(startingOffer);
        setPlayed(startingBoard);
        setRoutes(startingRoutes);
        setScore(startingScore);
    }

    const drawTile = () => {
        // Take a tile from the pool. Update the pool and return the tile.
        let newPool = pool.slice();
        let tile = newPool.pop();
        setPool(newPool);
        return tile
    };

    const handleDrop = (e) => {
        const row = e.dropData.row;
        const column = e.dropData.column;
        let tile = e.dragData.tile;
        let squares = played.slice();

        // If the square or the overlapping one above/below is already occupied,
        // don't allow a tile to be dropped there
        if (
            squares[row][column]
            || (squares[row + 1] && squares[row + 1][column])
            || (squares[row - 1] && squares[row - 1][column])
        ){
            return;
        }

        // If the square does not touch a tile to the left or right, don't allow the drop
        if (
            !(
                squares[row][column + 1]
                || squares[row][column - 1]
                || (squares[row + 1] && squares[row + 1][column + 1])
                || (squares[row + 1] && squares[row + 1][column - 1])
                || (squares[row - 1] && squares[row - 1][column + 1])
                || (squares[row - 1] && squares[row - 1][column - 1])
            )
        ) {
            return;
        }

        // Put a token in the square where the token was dropped
        squares[row][column] = tile;

        // Update squares
        setPlayed(squares);

        // update routes
        let oldRoutes = routes.slice();
        let newRoutes = updateRoutes(oldRoutes, tile, row, column, num_columns);
        setRoutes(newRoutes);

        // Update score
        let newScore = tallyScore(routes);
        setScore(newScore);

        // Replenish offer
        let newTile = drawTile();
        let offer_index = e.dragData.offer_index;
        let newOffer = offer.slice();
        newOffer[offer_index] = newTile;
        if (newOffer.every(t => t === undefined)) {
            alert("Game over!")
        }
        setOffer(newOffer);
    };

    const handleNewGame = () => {
        setNewGameRequested(true);
    };

    const handleShow = (event) => {
        // todo
    };

    function Square(props) {
        let tile = props.tile;
        let className = tile ? "square filled tile"+tile.id : "square";

        return (
            <div className={className}
                 onDragOver={props.onDragOver}
                 onDrop={props.onDrop}
            />
        );
    }

    function Board() {

        function renderTile(row, column) {
            let squares = played.slice();
            const tile = squares[row][column];
            return (
                <DropTarget
                    targetKey="offer"
                    dropData={{'row':row, 'column':column}}
                    key={row + ',' + column}
                >
                    <Square
                        tile={tile}
                        key={row + ',' + column}
                        row={row}
                        column={column}
                    />
                </DropTarget>
            );
        }

        function createBoard() {

            let rows = [];
            for (let row_index = 0; row_index < num_rows; row_index++) {
                let row = [];
                for (let column_index = 0; column_index < num_columns; column_index++) {
                    row.push(renderTile(row_index, column_index));
                }
                rows.push(<div className="board-row" key={row_index}>{row}</div>);
            }
            return rows;
        }

        return (
            <div>
                {createBoard()}
            </div>
        );
    }

    function Offer() {

        function renderOfferTile(offer_index) {

            const currentOffer = offer.slice();
            const tile = currentOffer[offer_index];
            let className = tile ? "square filled tile"+tile.id+" offer" : "square offer";
            return (
                <DragDropContainer
                    targetKey="offer"
                    dragData={{tile: tile, offer_index: offer_index}}
                    onDrop={(e) => handleDrop(e)}
                    key={offer_index}
                >
                    <div className={className}
                    >
                    </div>
                </DragDropContainer>
            );
        }

        function createOffer() {

            let num_offers = 3;
            let offer = [];
            for (let offer_index = 0; offer_index < num_offers; offer_index++) {
                offer.push(renderOfferTile(offer_index));
            }
            return offer;
        }

        return (
            <div>
                {createOffer()}
            </div>
        );
    }

    return (
        <div className="game">
            <h1>Monkeys of the Caribbean</h1>
            <div className="board">
                <Board/>
            </div>
            <div className="off-board">
                <div className="score">
                    Score:
                    <div className="red-score">
                        {score.red}
                    </div>
                    <div className="blue-score">
                        {score.blue}
                    </div>
                </div>
                <div className="offer-area">
                    <Offer/>
                    {Math.max(0, pool.length)} remaining
                </div>
                <div className="controls">
                    <button onClick={handleNewGame}>New</button>
                    <button onClick={handleShow}>Rules</button>
                </div>
            </div>
        </div>
    );
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById("root")); todo
ReactDOM.render(
    (<Game />),
    document.getElementById('root') || document.createElement('div') // for testing purposes
);
