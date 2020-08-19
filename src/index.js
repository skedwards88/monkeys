import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { tiles, BoardRoute } from './tiles.js'
import Tutorial from './rules.js';
import './rules.css';



// todo items
// would like draw pile to visually reflect number left
// make offer on side for screen size less that x
// TESTS!
// lock in place? Or center to mouse?
// add rule images/animations
// able to build images through css? worth it? able to have layer images for chest and anchors on/off instead?
// resolve errors/warnings in console
// make favicon
// check color accessibility
// When resize screen too small, board gets jumbled. either restrict min size or after a certain point, start shrinking the squares
// how to not duplicate modal.js between monkeys and stars?
// Add monkeys background or art to rules

export function shuffleArray(array) {
    // Swap each value in an array, starting at the end of the array, with a position equal or earlier in the array.
    for (let index = array.length - 1; index > 0; index--) {

        // Get a random index from 0 to the current index of the array
        // So for an array of length 3, the first round will be 0, 1, or 2, second round 0 or 1, and last round 0
        // The values at this index and the current index will be swapped
        let swapIndex = Math.floor(Math.random() * (index + 1));

        // If the current index and index to swap are the same, move on to the next loop iteration
        if (index === swapIndex) {
            continue;
        }

        // Get the original value at index,
        // set the value at the index to be the value at the swap index,
        // then set the value at the swap index to be the original value at the index
        let swapValue = array[index];
        array[index] = array[swapIndex];
        array[swapIndex] = swapValue;
    }
}

export function getBoardNodesFromRowCol(row, column, numColumns) {
    // Convert a 0-indexed row/column to 0-indexed corner numbers of that row/column square in a grid
    let topLeft = (row * (numColumns + 1) + column);
    let topRight = topLeft + 1;
    let bottomLeft = topLeft + numColumns + 1;
    let bottomRight = bottomLeft + 1;
    return [topLeft, topRight, bottomLeft, bottomRight]
}

function updateRoutes(boardRoutes, tile, row, column, numColumns) {

    // Convert the row/col where the tile was placed to numbers describing the corner positions ("nodes") of the tile
    let boardNodes = getBoardNodesFromRowCol(row, column, numColumns);

    // For each route on the placed tile:
    for (let tileRoute of tile.routes) {
        console.log('Tile route: ', tileRoute.tileHead, tileRoute.tileTail);

        // Convert the tile head/tail (0, 1, 2, 3, or null) to the corresponding board node
        let convertedTileHead = typeof(tileRoute.tileHead)==="number" ? boardNodes[tileRoute.tileHead] : null;
        let convertedTileTail = typeof(tileRoute.tileTail)==="number" ? boardNodes[tileRoute.tileTail] : null;
        console.log('converted nodes: ', convertedTileHead, convertedTileTail);

        //
        // Find if there is an existing board route that matches the tile route head/tail
        // There will be max 1 route match for head and tail each
        //
        let headMatch = null;
        let tailMatch = null;

        for (let boardRoute of boardRoutes) {
            // If there is a head on the tile route
            // and we haven't found a head match
            // and the board route head or tail position matches the position of the tile route head
            // record the board route as the head match
            if (convertedTileHead
                && !headMatch
                && (boardRoute.boardHead === convertedTileHead || boardRoute.boardTail === convertedTileHead)) {
                headMatch = boardRoute
            }

            // If there is a tail on the tile route
            // and we haven't found a tail match
            // and the board route head or tail position matches the position of the tile route tail
            // record the board route as the tail match
            if (convertedTileTail
                && !tailMatch
                && (boardRoute.boardHead === convertedTileTail || boardRoute.boardTail === convertedTileTail)) {
                tailMatch = boardRoute
            }

            // If all possible matches have been found, exit.
            // (There will be a max 1 route matching the head and 1 matching the tail.)
            if (
                (headMatch || !convertedTileHead)
                && (tailMatch || !convertedTileTail)
            ) {
                break;
            }
        }

        // If no match was found for the tile route head or tail,
        // add the tile route as a new board route
        if (!headMatch && !tailMatch) {
            console.log('New route: ');
            let newRoute = new BoardRoute({
                boardHead:convertedTileHead,
                boardTail:convertedTileTail,
                tileRoutes:[tileRoute]});
            boardRoutes.push(newRoute);
        }

        // If only a head or tail (but not both) match was found,
        // update the matching board route head/tail with the head/tail non-match
        // and update the board route members
        else if ((headMatch && !tailMatch) || (tailMatch && !headMatch)) {
            console.log('Append route: ');

            // Get the matching board route
            let matchingRoute = headMatch ? headMatch : tailMatch;
            console.log("appending to: ", matchingRoute, matchingRoute.boardHead, matchingRoute.boardTail, matchingRoute.tileRoutes.slice());

            // If the board route matched at the head of the tile route,
            // the tile tail will replace the board route head or tail
            // Otherwise, the tile head will replace the board route head or tail
            let newValue = headMatch ? convertedTileTail : convertedTileHead;

            // Find the node where the board route joins the tile route
            let matchingValue = headMatch ? convertedTileHead : convertedTileTail;

            // Update the board route head or tail (whichever joins to the new tile) to be the new value
            matchingRoute.boardHead === matchingValue ?
                matchingRoute.boardHead = newValue :
                matchingRoute.boardTail = newValue;

            // Add the new tile to the route
            matchingRoute.tileRoutes.push(tileRoute);
            console.log("post append: ", matchingRoute, matchingRoute.boardHead, matchingRoute.boardTail, matchingRoute.tileRoutes.slice());

        }

        // If head and tail match the same board route, the route is now a loop.
        // Set the route head/tail to null
        // and update the board route members
        else if (headMatch === tailMatch) {
            console.log('Loop: ');
            console.log("looping to: ", headMatch, headMatch.boardHead, headMatch.boardTail, headMatch.tileRoutes.slice());

            headMatch.boardHead = null;
            headMatch.boardTail = null;
            headMatch.tileRoutes.push(tileRoute);
            console.log("post loop: ", headMatch, headMatch.boardHead, headMatch.boardTail, headMatch.tileRoutes.slice());

        }

        // Otherwise, head and tail match different routes; the routes are now joined.
        // Update head/tail on one route,
        // add the new tile and the tiles from the other route to the updated route,
        // delete the other route
        else {
            console.log('Join: ');

            // For both matching board routes, set the terminus that doesn't connect to the new tile to be the new head/tail
            let newHead = ((headMatch.boardHead === convertedTileHead) || (headMatch.boardHead === convertedTileTail)) ?
                headMatch.boardTail :
                headMatch.boardHead;
            let newTail = ((tailMatch.boardHead === convertedTileHead) || (tailMatch.boardHead === convertedTileTail)) ?
                tailMatch.boardTail :
                tailMatch.boardHead;

            // Arbitrarily keep the "head route" as the base route

            console.log("join 1: ", headMatch, headMatch.boardHead, headMatch.boardTail, headMatch.tileRoutes.slice());
            console.log("join 2: ", tailMatch, tailMatch.boardHead, tailMatch.boardTail, tailMatch.tileRoutes.slice());


            // Update the head and tail
            headMatch.boardHead = newHead;
            headMatch.boardTail = newTail;

            // Update the tiles in the route
            headMatch.tileRoutes = headMatch.tileRoutes.concat(tailMatch.tileRoutes);
            headMatch.tileRoutes.push(tileRoute);

            // Delete the other board route
            let indexToDelete = boardRoutes.indexOf(tailMatch);
            boardRoutes.splice(indexToDelete, 1);

            console.log("post join: ", headMatch, headMatch.boardHead, headMatch.boardTail, headMatch.tileRoutes.slice());

        }
    }
    return boardRoutes
}

export function tallyScore(routes){
    let newRedScore = 0;
    let newBlueScore = 0;
    for (let route of routes) {
        let score = route.score;
        newRedScore += score.red;
        newBlueScore += score.blue;
    }
    return {red:newRedScore, blue:newBlueScore}
}

const getInitialSetup = (numRows, numColumns) => {

    // Shuffle the tiles
    const pool = tiles.slice();
    shuffleArray(pool);

    // Draw 3 tiles for the starting offer
    let startingOffer = pool.splice(0, 3);

    // Draw 4 tiles for the starting board
    let initialTiles = pool.splice(0, 4);

    // Make the starting board
    let startingPositions = [{row:1,column:4},{row:3,column:4},{row:5,column:4},{row:7,column:4}];
    let startingBoard = Array.from({length: numRows}, e => Array(numColumns).fill(null));
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
        let boardNodes = getBoardNodesFromRowCol(startingPosition.row, startingPosition.column, numColumns);

        // For each route on the tile, convert the tile-relative head/tail to board-relative head/tail
        // and add the route to the starting routes
        for (let route of tile.routes) {
            let head = boardNodes[route.tileHead];
            let tail = boardNodes[route.tileTail];
            let boardRoute = new BoardRoute({boardHead: head, boardTail: tail, tileRoutes: [route]});
            startingRoutes.push(boardRoute);
        }
    });

    let startingScore = tallyScore(startingRoutes);

    return([pool, startingOffer, startingBoard, startingRoutes, startingScore])
};


function Game() {

    let numRows = 9;
    let numColumns = 9;
    let [initialPool, startingOffer, startingBoard, startingRoutes, startingScore] = [[],[],[], [], []];

    const [newGameRequested, setNewGameRequested] = useState(true);  // todo can I find a better way to do this?
    const [offer, setOffer] = useState(startingOffer);
    const [pool, setPool] = useState(initialPool);
    const [played, setPlayed] = useState(startingBoard);
    const [routes, setRoutes] = useState(startingRoutes);
    const [showRules, setShowRules] = useState(false);
    const [score,setScore] = useState(startingScore);

    if (newGameRequested) {
        setNewGameRequested(false);
        [initialPool, startingOffer, startingBoard, startingRoutes, startingScore] = getInitialSetup(numRows, numColumns);
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
        let newRoutes = updateRoutes(oldRoutes, tile, row, column, numColumns);
        setRoutes(newRoutes);

        // Update score
        let newScore = tallyScore(newRoutes);
        setScore(newScore);

        // Replenish offer
        let newTile = drawTile();
        let offerIndex = e.dragData.offerIndex;
        let newOffer = offer.slice();
        newOffer[offerIndex] = newTile;
        if (newOffer.every(t => t === undefined)) {
            alert("Game over!")
        }
        setOffer(newOffer);
    };

    const handleNewGame = () => {
        setNewGameRequested(true);
    };

    const handleShow = () => {
        setShowRules(true);
    };

    const handleHide = () => {
        setShowRules(false);
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
            for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                let row = [];
                for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
                    row.push(renderTile(rowIndex, columnIndex));
                }
                rows.push(<div className="board-row" key={rowIndex}>{row}</div>);
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

        function renderOfferTile(offerIndex) {

            const currentOffer = offer.slice();
            const tile = currentOffer[offerIndex];
            let className = tile ? "square filled tile"+tile.id+" offer" : "square offer";
            return (
                <DragDropContainer
                    targetKey="offer"
                    dragData={{tile: tile, offerIndex: offerIndex}}
                    onDrop={(e) => handleDrop(e)}
                    key={offerIndex}
                >
                    <div className={className}
                    >
                    </div>
                </DragDropContainer>
            );
        }

        function createOffer() {

            let numOffers = 3;
            let offer = [];
            for (let offerIndex = 0; offerIndex < numOffers; offerIndex++) {
                offer.push(renderOfferTile(offerIndex));
            }
            return offer;
        }

        return (
            <div>
                {createOffer()}
            </div>
        );
    }

    let tutorial = showRules ?
        <Tutorial handleHide={handleHide}/> :
        null;

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
            <div className="tutorial">
                {tutorial}
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
