import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { tiles, BoardRoute } from './tiles.js'
// import {BoardRoute} from "./tiles";

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

    return([pool, startingOffer, startingBoard, startingRoutes])
};


function Game() {

    let num_rows = 9;
    let num_columns = 9;
    let [pool, startingOffer, startingBoard, startingRoutes] = [[],[],[], []];

    const [newGameRequested, setNewGameRequested] = useState(true);  // todo can I find a better way to do this?
    const [offerHistory, setOffer] = useState([startingOffer]);
    const [poolHistory, setPool] = useState([pool]);
    const [playedHistory, setPlayed] = useState([startingBoard]);
    const [routesHistory, setRoutes] = useState([startingRoutes]);
    const [showRules, setShowRules] = useState(false);
    const [currentRule, setCurrentRule] = useState(1);
    const [redScore, setRedScore] = useState(0);
    const [blueScore, setBlueScore] = useState(0);

    if (newGameRequested) {
        setNewGameRequested(false);
        [pool, startingOffer, startingBoard, startingRoutes] = getInitialSetup(num_rows, num_columns);
        setPool([pool]);
        setOffer([startingOffer]);
        setPlayed([startingBoard]);
        setRoutes([startingRoutes]);
    }

    const drawTile = () => {
        // Take a tile from the pool. Update the pool and return the tile.
        let currentPool = poolHistory[poolHistory.length - 1].slice();
        let tile = currentPool.pop();
        const newPoolHistory = poolHistory.concat([currentPool]);
        setPool(newPoolHistory);
        return tile
    };

    const handleDrop = (e) => {
        const row = e.dropData.row;
        const column = e.dropData.column;
        let tile = e.dragData.tile;
        let squares = playedHistory[playedHistory.length - 1].map(a => {return a.slice()})

        // If the square or the overlapping one above/below is already occupied,
        // don't allow a tile to be dropped there
        if (
            squares[row][column]
            || (squares[row + 1] && squares[row + 1][column])
            || (squares[row - 1] && squares[row - 1][column])
        ){
            return;
        }

        //If the square does not touch a tile to the left or right, don't allow the drop
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
        let newHistory = playedHistory.concat([squares]);
        setPlayed(newHistory);

        // Convert the row/col where the tile was placed to board node numbers
        let board_nodes = getBoardNodesFromRowCol(row, column, num_columns);

        // todo update routes
        debugger;
        let oldRoutes = routesHistory[routesHistory.length - 1].slice();
        let routes = oldRoutes;  //TODO
        // the tile is numbered 0,1,2,3. convert tile to the above
        // merge with any existing board routes

        let newRoutes = routesHistory.concat([routes]);
        setRoutes(newRoutes);

        // Update score  // in undo and new, need to reset score as well
        let newRedScore = 0;
        let newBlueScore = 0;
        for (let route of routes) {
            let score = route.score;
            newRedScore += score.red;
            newBlueScore += score.blue;
        }
        setRedScore(newRedScore);
        setBlueScore(newBlueScore); // todo may want to make this a list as well for history. In undo, need to make sure undo.

        // Replenish offer
        let newTile = drawTile()
        let offer_index = e.dragData.offer_index;
        let offer = offerHistory[offerHistory.length - 1].slice();
        offer[offer_index] = newTile;
        let newOffer = offerHistory.concat([offer]);
        setOffer(newOffer);
    };

    const handleUndo = (event) => {
        const newPlayedHistory = playedHistory.length > 1 ? playedHistory.slice(0,-1) : playedHistory.slice();
        setPlayed(newPlayedHistory);

        const newOfferHistory = offerHistory.length > 1 ? offerHistory.slice(0,-1) : offerHistory.slice();
        setOffer(newOfferHistory);

        const newPoolHistory = poolHistory.length > 1 ? poolHistory.slice(0,-1) : poolHistory.slice();
        setPool(newPoolHistory);
    };


    const handleNewGame = () => {
        setNewGameRequested(true);
    };

    const handleShow = (event) => {
        // todo
    };

    // todo Calculate score, game over, etc.

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

            const squaresHistory = playedHistory.slice();
            let squares = squaresHistory[squaresHistory.length - 1].map(a => {return a.slice()});
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

            const currentOffer = offerHistory[offerHistory.length - 1];
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
                        {redScore}
                    </div>
                    <div className="blue-score">
                        {blueScore}
                    </div>
                </div>
                <div className="offer-area">
                    <Offer/>
                    {Math.max(0, poolHistory[poolHistory.length-1].length)} remaining
                </div>
                <div className="controls">
                    <button onClick={handleUndo}>Undo</button>
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
