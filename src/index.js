import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { tiles, BoardRoute } from './tiles.js'
import './rules.css';

import Offer from './Offer'
import Board from './Board'
import Score from './Score'
import Tutorial from './Tutorial';

// todo items
// SVG tiles???
// maybe add node to end of routes
// maybe add undo
// if screen is above certain height, move tiles and buttons/score below?
// images are slow. Make smaller? Cache?
// Enable keyboard navigation for rules?
// Enable keyboard navigation for tiles?
// force landscape mode?
// Tooltip for buttons. What is tooltip alternative for mobile?
// Space the offer to match board height
// art-make the routes more level at the edges so connections are smoother
// art- make sure things aren't too close to L/R
// lock in place? Or center to mouse?
// resolve errors/warnings in console
// TESTS!
// check color accessibility
// how to not duplicate modal.js between monkeys and stars?
// would be so cool to change color of route to indicate owner
// make rules swipable on mobile

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

    // Convert the row/col where the tile was placed to numbers describing 
    // the corner positions ("nodes") of the tile on the board
    let boardNodes = getBoardNodesFromRowCol(row, column, numColumns);

    // For each route on the placed tile:
    for (let tileRoute of tile.routes) {

        // Convert the tile head/tail (0, 1, 2, 3, or null) to the corresponding board node
        let convertedTileHead = typeof (tileRoute.tileHead) === "number" ? boardNodes[tileRoute.tileHead] : null;
        let convertedTileTail = typeof (tileRoute.tileTail) === "number" ? boardNodes[tileRoute.tileTail] : null;

        // Find if there is an existing board route that matches the tile route head/tail
        // There will be max 1 route match for head and tail each
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
            let newRoute = new BoardRoute({
                boardHead: convertedTileHead,
                boardTail: convertedTileTail,
                tileRoutes: [tileRoute]
            });
            boardRoutes.push(newRoute);
        }

        // If only a head or tail (but not both) match was found,
        // update the matching board route head/tail with the head/tail non-match
        // and update the board route members
        else if ((headMatch && !tailMatch) || (tailMatch && !headMatch)) {

            // Get the matching board route
            let matchingRoute = headMatch ? headMatch : tailMatch;

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
        }

        // If head and tail match the same board route, the route is now a loop.
        // Set the route head/tail to null
        // and update the board route members
        else if (headMatch === tailMatch) {
            headMatch.boardHead = null;
            headMatch.boardTail = null;
            headMatch.tileRoutes.push(tileRoute);
        }

        // Otherwise, head and tail match different routes; the routes are now joined.
        // Update head/tail on one route,
        // add the new tile and the tiles from the other route to the updated route,
        // delete the other route
        else {
            // For both matching board routes, set the terminus that doesn't connect to the new tile to be the new head/tail
            let newHead = ((headMatch.boardHead === convertedTileHead) || (headMatch.boardHead === convertedTileTail)) ?
                headMatch.boardTail :
                headMatch.boardHead;
            let newTail = ((tailMatch.boardHead === convertedTileHead) || (tailMatch.boardHead === convertedTileTail)) ?
                tailMatch.boardTail :
                tailMatch.boardHead;

            // Arbitrarily keep the "head route" as the base route
            // Update the head and tail
            headMatch.boardHead = newHead;
            headMatch.boardTail = newTail;

            // Update the tiles in the route
            headMatch.tileRoutes = headMatch.tileRoutes.concat(tailMatch.tileRoutes);
            headMatch.tileRoutes.push(tileRoute);

            // Delete the other board route
            let indexToDelete = boardRoutes.indexOf(tailMatch);
            boardRoutes.splice(indexToDelete, 1);
        }
    }
    return boardRoutes
}

function getInitialSetup(numRows, numColumns) {

    // Shuffle the tiles
    const pool = tiles.slice();
    shuffleArray(pool);

    // Draw 3 tiles for the starting offer
    let startingOffer = pool.splice(0, 3);

    // Draw 4 tiles for the starting board
    let initialTiles = pool.splice(0, 4);

    // Make the starting board
    let starting_column = Math.round(numColumns / 2) - 1;
    let startingPositions = [
        { row: 1, column: starting_column },
        { row: 3, column: starting_column },
        { row: 5, column: starting_column },
        { row: 7, column: starting_column }];
    let startingBoard = Array.from({ length: numRows }, e => Array(numColumns).fill(null));
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
            let boardRoute = new BoardRoute({ boardHead: head, boardTail: tail, tileRoutes: [route] });
            startingRoutes.push(boardRoute);
        }
    });

    return ([pool, startingOffer, startingBoard, startingRoutes])
};

function Game() {

    const numRows = 9;
    const numColumns = 7;
    let [initialPool, startingOffer, startingBoard, startingRoutes] = [[], [], [], []];

    // The box shadow around the draw stack
    let startingDrawEffect = [
        "-1px 1px rgba(27, 211, 235, 0.35)",
        "-1px 1px rgba(0,0,0, 0.15)",
        "-2px 2px rgba(27, 211, 235, 0.35)",
        "-2px 2px rgba(0,0,0, 0.05)",
        "-3px 3px rgba(27, 211, 235, 0.35)",
        "-3px 3px rgba(0,0,0, 0.35)",
        "-4px 4px rgba(27, 211, 235, 0.35)",
        "-4px 4px rgba(0,0,0, 0.25)",
        "-5px 5px rgba(27, 211, 235, 0.35)",
        "-5px 5px rgba(0,0,0, 0.45)",
        "-6px 6px rgba(27, 211, 235, 0.35)",
        "-6px 6px rgba(0,0,0, 0.35)",
        "-7px 7px rgba(27, 211, 235, 0.35)",
        "-7px 7px rgba(0,0,0, 0.15)",
        "-8px 8px rgba(27, 211, 235, 0.35)",
        "-8px 8px rgba(0,0,0, 0.25)",
        "-9px 9px rgba(27, 211, 235, 0.35)",
        "-9px 9px rgba(0,0,0, 0.35)",
        "-10px 10px rgba(27, 211, 235, 0.35)",
        "-10px 10px rgba(0,0,0, 0.45)",
        "-11px 11px rgba(27, 211, 235, 0.35)",
        "-11px 11px rgba(0,0,0, 0.35)",
        "-12px 12px rgba(27, 211, 235, 0.35)",
        "-12px 12px rgba(0,0,0, 0.15)",
        "-13px 13px rgba(27, 211, 235, 0.35)",
        "-13px 13px rgba(0,0,0, 0.35)",
    ];

    const [newGameRequested, setNewGameRequested] = useState(true);  // todo can I find a better way to do this?
    const [offer, setOffer] = useState(startingOffer);
    const [pool, setPool] = useState(initialPool);
    const [played, setPlayed] = useState(startingBoard);
    const [routes, setRoutes] = useState(startingRoutes);
    const [showRules, setShowRules] = useState(false);
    const [drawEffect, setDrawEffect] = useState(startingDrawEffect);
    useEffect(() => {
        let body = document.getElementsByTagName("body")[0];
        body.style.setProperty("--deck-size", drawEffect.join(","));
    });

    if (newGameRequested) {
        setNewGameRequested(false);
        [initialPool, startingOffer, startingBoard, startingRoutes] = getInitialSetup(numRows, numColumns);
        setPool(initialPool);
        setOffer(startingOffer);
        setPlayed(startingBoard);
        setRoutes(startingRoutes);
        setDrawEffect(startingDrawEffect);
    }

    function validDropQ(squares, row, column) {
        // If the square or the overlapping one above/below is already occupied,
        // don't allow a tile to be dropped there
        if (
            squares[row][column]
            || (squares[row + 1] && squares[row + 1][column])
            || (squares[row - 1] && squares[row - 1][column])
        ) {
            return false;
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
            return false;
        }
        return true;
    }
    const handleDrop = (event) => {
        const row = event.dropData.row;
        const column = event.dropData.column;
        const tile = event.dragData.tile;
        const squares = played.slice();//todo squares could just be flat list of id or null

        if (!validDropQ(squares, row, column)) {
            return
        }

        // Put a token in the square where the token was dropped
        squares[row][column] = tile;

        // Update squares
        setPlayed(squares);

        // update routes
        let updatedRoutes = updateRoutes(routes.slice(), tile, row, column, numColumns);
        setRoutes(updatedRoutes);

        // Replenish offer
        //todo dont have offer state; can just be last 3 from pool. and draw effect can be similar.
        // Take a tile from the pool. Update the pool and return the tile.
        let newPool = pool.slice();
        let newTile = newPool.pop();
        setPool(newPool);

        // Update draw stack visual
        drawEffect.splice(-2, 2);
        setDrawEffect(drawEffect);
        
        let offerIndex = event.dragData.offerIndex;
        let newOffer = offer.slice();
        newOffer[offerIndex] = newTile;
        setOffer(newOffer);
    };

    const handleNewGame = () => {
        setNewGameRequested(true);
    };

    return (
        <div className="game">
            <Offer
                offer={offer}
                pool={pool}
                handleDrop={handleDrop}
            />
            <Board 
                played={played}
                numRows={numRows}
                numColumns={numColumns}
            />
            <div className="off-board">
                <Score routes={routes}/>
                <button className="new-game-button" onClick={handleNewGame}></button>
                <Tutorial showRules={showRules} setShowRules={setShowRules}/>
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
