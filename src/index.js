import React, { useState } from 'react';
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
    new Tile(21),
    new Tile(22),
    new Tile(23),
    new Tile(24),
    new Tile(25),
]

let initialOffer = [
    tiles.pop(), tiles.pop(), tiles.pop()
];

function Game() {

    let num_rows = 5;
    let num_columns = 9;
    // todo should randomize tiles at start of game
    const [offerHistory, setOffer] = useState([initialOffer]);

    const [poolHistory, setPool] = useState([tiles]);

    const drawTile = () => {
        let currentPool = poolHistory[poolHistory.length - 1].slice();
        let tile = currentPool.pop();
        const newPoolHistory = poolHistory.concat([currentPool]);
        setPool(newPoolHistory);
        return tile
    };

    const [playedHistory, setPlayed] = useState([Array.from({length: num_rows}, e => Array(num_columns).fill(null))])
    const [showRules, setShowRules] = useState(false);
    const [currentRule, setCurrentRule] = useState(1);
    const [redScore, setRedScore] = useState(0);
    const [blueScore, setBlueScore] = useState(0);

    const handleDrop = (e) => {
        const row = e.dropData.row;
        const column = e.dropData.column;
        let tile = e.dragData.tile;
        let squares = playedHistory[playedHistory.length - 1].map(a => {return a.slice()})

        // If the square is already occupied, don't allow a tile to be dropped there
        if (squares[row][column]) {
            return;
        }

        // Put a token in the square where the token was dropped
        squares[row][column] = tile;

        // Update squares
        let nh = playedHistory.concat([squares])
        setPlayed(nh)

        // todo update routes

        // todo update score

        // Replenish offer
        let newTile = drawTile()
        let offer_index = e.dragData.offer_index;
        let offer = offerHistory[offerHistory.length - 1].slice();
        offer[offer_index] = newTile;
        let newOffer = offerHistory.concat([offer]);
        setOffer(newOffer);
    }

    const handleUndo = (event) => {
        const squaresHistory = playedHistory.length > 1 ? playedHistory.slice(0,-1) : playedHistory.slice();
        setPlayed(squaresHistory);
    }

    const handleNewGame = (event) => {
        const squaresHistory = playedHistory.slice(0,1);
        setPlayed(squaresHistory);
    }

    const handleShow = (event) => {

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

            const currentOffer = offerHistory[offerHistory.length - 1];
            const tile = currentOffer[offer_index];
            return (
                <DragDropContainer
                    targetKey="offer"
                    dragData={{tile: tile, offer_index: offer_index}}
                    onDrop={(e) => handleDrop(e)}
                    key={offer_index}
                >
                    <div className="tile"
                    >{tile.id}
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
                    {poolHistory[poolHistory.length-1].length}
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
