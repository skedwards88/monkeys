import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';


class Tile {
    constructor(id) {
        this.id = id;
        // todo actually define tile class
    }
}

// todo define tiles elsewhere and import them
let tiles = [
    new Tile(1),
    new Tile(2),
    new Tile(3),
    new Tile(4),
    new Tile(5),
    new Tile(6),
    new Tile(7),
    new Tile(8),
]

function Game() {

    let num_rows = 5;
    let num_columns = 9;
    let offer = [tiles[0], tiles[1], tiles[2]]; //todo populate offer

    const [history, setHistory] = useState({
        squares: [Array.from({length: num_rows}, e => Array(num_columns).fill(null))],
        offer: [offer],
    });
    const [showRules, setShowRules] = useState(false);
    const [currentRule, setCurrentRule] = useState(1);
    const [redScore, setRedScore] = useState(0);
    const [blueScore, setBlueScore] = useState(0);

    const handleDrop = (e) => {
        let nh = {...history}
        const row = e.dropData.row;
        const column = e.dropData.column;
        let tile = e.dragData.tile;
        // let history = history;
        const squaresHistory = nh.squares.slice();
        let squares = squaresHistory[squaresHistory.length - 1].map(a => {return a.slice()})
        const offerHistory = nh.offer.slice();
        let offer = offerHistory[offerHistory.length - 1]

        // If the square is already occupied, don't allow a tile to be dropped there
        if (squares[row][column]) {
            return;
        }

        // Put a token in the square where the token was dropped
        squares[row][column] = tile;

        // Update history (in state as well)
        nh.squares = squaresHistory.concat([squares])
        setHistory(nh)

        // TODO board is not re-rendering on drop. Do i need to tell to rerender suqare?

    }

    const handleUndo = (event) => {
        const squaresHistory = history.squares.length > 1 ? history.squares.slice(0,-1) : history.squares.slice();
        history.squares = squaresHistory;
        setHistory(history);
    }

    const handleNewGame = (event) => {
        const squaresHistory = history.squares.slice(0,1);
        history.squares = squaresHistory;
        setHistory(history);
    }

        // const history = this.state.history;
        // const squaresHistory = history.squares.slice();
        // let squares = squaresHistory[squaresHistory.length - 1].slice();
        // const offerHistory = history.offer.slice();
        // let offer = offerHistory[offerHistory.length - 1].slice();


        // Calculate score, game over, etc.

    function Square(props) {
        let tile = props.tile;
        const val = tile ? tile.id : null;

        // todo figure out how to dictate tile image that should be displayed.
        //  could just append id to class name and have css rule for each id
        //  setting background image.
        //  if tile is null, leave empty.
        //  If can't be played, empty.
        //  If tile, display.
        return (
            <div className="square"
                 onDragOver={props.onDragOver}
                 onDrop={props.onDrop}
            >
                {tile ? tile.id : null}
            </div>
        );
    }

    function Board() {

        function renderTile(row, column) {

            const squaresHistory = history.squares.slice();
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

            let num_rows = 5; // todo store in state instead
            let num_columns = 9;
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

            const tile = offer[offer_index];
            return (
                <DragDropContainer
                    targetKey="offer"
                    dragData={{tile: tile}}
                    onDrop={(e) => handleDrop(e)}
                    key={offer_index}
                >
                    <div className="tile"
                    >OFFER
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
                <Board

                />
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
                <Offer
                    />
                <div className="controls">
                    <button onClick={handleUndo}>Undo</button>
                    <button onClick={handleNewGame}>New</button>
                    {/*<button onClick={handleShow}>Rules</button>*/}
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
