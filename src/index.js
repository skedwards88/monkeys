import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { tiles, BoardRoute } from './tiles.js'
import './rules.css';

import Offer from './Offer'
import Board from './Board'
import Score from './Score'
import Tutorial from './Tutorial';



function validDropQ(squares, row, column) {
    // If the square or the overlapping one above/below is already occupied,
    // don't allow a tile to be dropped there
    if (
        squares[row][column] //todo this is the problem!
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

function getInitialRoutes(initialTiles, numColumns){
        // Make the starting board
        let starting_column = Math.round(numColumns / 2) - 1;
        let startingPositions = [
            { row: 1, column: starting_column },
            { row: 3, column: starting_column },
            { row: 5, column: starting_column },
            { row: 7, column: starting_column }];
    
    // Calculate the routes present on the starting tiles
    // (Right now, each route on the tile will be a unique route; don't need to worry about the tiles connecting)
    let startingRoutes = [];
    initialTiles.forEach((tile, index) => {
        // Convert the row/col where the tile was placed to board node numbers
        let startingPosition = startingPositions[index];
        let boardNodes = getBoardNodesFromRowCol(startingPosition.row, startingPosition.column, numColumns);

        // For each route on the tile, convert the tile-relative head/tail to board-relative head/tail
        // and add the route to the starting routes
        for (let route of tiles[tile].routes) {
            let head = boardNodes[route.tileHead];
            let tail = boardNodes[route.tileTail];
            let boardRoute = new BoardRoute({ boardHead: head, boardTail: tail, tileRoutes: [route] });
            startingRoutes.push(boardRoute);
        }
    });

    return startingRoutes

}

function getInitialSetup(numRows, numColumns) {

    // Shuffle the tiles
    const remainingTileIDs = Object.keys(tiles)
    // shuffleArray(remainingTileIDs);

    // Draw 4 tiles for the starting board
    const startingTiles = remainingTileIDs.splice(0, 4);

    // Make the starting board
    let starting_column = Math.round(numColumns / 2) - 1;
    //todo could also cal starting row
    let startingPositions = [
        { row: 1, column: starting_column },
        { row: 3, column: starting_column },
        { row: 5, column: starting_column },
        { row: 7, column: starting_column }];
    let startingBoard = Array.from({ length: numRows }, e => Array(numColumns).fill(null));
    startingTiles.forEach((tile, index) => {
        let startingPosition = startingPositions[index];
        startingBoard[startingPosition.row][startingPosition.column] = tile
    });


    // return ([remainingTileIDs, startingBoard, startingRoutes])
};


function Game() {

    const numRows = 9;
    const numColumns = 7;
    const initialRoutes = getInitialRoutes(["0", "1", "2", "4"], numColumns)
    console.log(initialRoutes)
    // The box shadow around the draw stack
    let drawEffect = [
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
    const [remainingTileIDs, setRemainingTileIDs] = useState(["4", "5", "6", "7", "8", "9"]);
    const [played, setPlayed] = useState([
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            "0",
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            "1",
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            "2",
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            "3",
            null,
            null,
            null
        ],
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    ]);
    const [routes, setRoutes] = useState(initialRoutes);
    const [showRules, setShowRules] = useState(false);
    useEffect(() => {
        const effectiveDrawEffect = drawEffect.slice(0,2*(remainingTileIDs.length - 3))
        let body = document.getElementsByTagName("body")[0];
        body.style.setProperty("--deck-size", effectiveDrawEffect.join(","));
    });



    
    const handleDrop = (event) => {
        const row = event.dropData.row;//todo if flat list col and row would just be square
        const column = event.dropData.column;
        const tile = event.dragData.tile;
        const newPlayed = played.slice();//todo played could just be flat list of id or null

        // if (!validDropQ(squares, row, column)) {
        //     return
        // } todo this is causing problems

        // Put a token in the square where the token was dropped
        newPlayed[row][column] = tile;

        // Update played
        setPlayed(newPlayed);

        // update routes
        let updatedRoutes = updateRoutes(routes.slice(), tiles[tile], row, column, numColumns);
        setRoutes(updatedRoutes);
        

        const offerIndex = event.dragData.offerIndex;
        let newRemainingTileIDs = [...remainingTileIDs]
        if (newRemainingTileIDs.length > 3) {
            // replace the played tile with the tile at the bottom of the pool
            newRemainingTileIDs[offerIndex] = newRemainingTileIDs[newRemainingTileIDs.length - 1]
            // remove the tile at the bottom of the pool
            newRemainingTileIDs.splice(-1,1)

        } else {
            // If there aren't unrevealed tiles left, replace the played tile with null
            newRemainingTileIDs[offerIndex] = null
        }

        setRemainingTileIDs(newRemainingTileIDs)
    };



    return (
        <div className="game">
            <Offer
                remainingTileIDs={remainingTileIDs}
                handleDrop={handleDrop}
            />
            <Board
                tiles={tiles}
                played={played}
                numRows={numRows}
                numColumns={numColumns}
            />
            <div className="off-board">
                <Score routes={routes}/>
                {/* <button className="new-game-button" onClick={handleNewGame}></button> */}
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
