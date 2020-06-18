import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';


function Square(props) {
    let tile = props.tile;
    // todo if tile is null, leave empty. If can't be played, empty. If tile, display. Maybe change class name to indicate which should display?
    return (
        <div className="square"
             onDragOver={props.onDragOver}
             onDrop={props.onDrop}
        >
TILE
        </div>
    );
}

class Board extends React.Component {

    renderTile(row, column) {
        const tiles = this.props.squares;
        const tile = tiles[row][column];
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

    createBoard() {
        let num_rows = 5; // todo store in state instead
        let num_columns = 9;
        let rows = [];
        for (let row_index = 0; row_index < num_rows; row_index++) {
            let row = [];
            for (let column_index = 0; column_index < num_columns; column_index++) {
                row.push(this.renderTile(row_index, column_index));
            }
            rows.push(<div className="board-row" key={row_index}>{row}</div>);
        }
        return rows;
    }

    render() {
        return (
            <div>
                {this.createBoard()}
            </div>
        );
    }
}

class Offer extends React.Component {

    renderOfferTile(offer_index) {
        const offer = this.props.offer;
        const tile = offer[offer_index];
        return (
            <DragDropContainer
                targetKey="token"
                dragData={{tile: tile}}
                onDrop={(e) => this.handleDrop(e)}
            >
                <div className="tile"
                >OFFER
                </div>
            </DragDropContainer>
        );
    }

    createOffer() {
        let num_offers = 3;
        let offer = [];
        for (let offer_index = 0; offer_index < num_offers; offer_index++) {
            offer.push(this.renderOfferTile(offer_index));
        }
        return offer;
    }

    render() {
        return (
            <div>
                {this.createOffer()}
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        let num_rows = 5;
        let num_columns = 9;
        let offer = [1,2,3] //todo populate offer
        this.state = {
            num_rows: num_rows,
            num_columns: num_columns,
            history: {
                squares: [Array.from({length: num_rows}, e => Array(num_columns).fill(null))],
                offer: [offer],
            },
            showRules: false,
            currentRule: 1,
            red_score: 0,
            blue_score: 0,
        };
        this.handleNewGame = this.handleNewGame.bind(this);
    }

    handleDrop(e) {
        const row = e.dropData.row;
        const column = e.dropData.column;
        let tile = e.dragData.tile;
        let history = this.state.history;
        const squaresHistory = history.squares.slice();
        let squares = squaresHistory[squaresHistory.length - 1].map(a => {return a.slice()})
        const offerHistory = history.offer.slice();
        let offer = offerHistory[offerHistory.length - 1].map(a => {return a.slice()})

        // If the selected symbol cannot be legally placed in the square, don't allow it

        // Put a token in the square where the token was dropped

        // Update history (in state as well)
    }

    handleUndo = (event) => {
        let history = this.state.history;
        const squaresHistory = history.squares.length > 1 ? history.squares.slice(0,-1) : history.squares.slice();
        history.squares = squaresHistory;
        this.setState({
                history: history,
            }
        )
    }

    handleNewGame = (event) => {
        let history = this.state.history;
        const squaresHistory = history.squares.slice(0,1);
        history.squares = squaresHistory;
        this.setState({
                history: history,
            }
        )
    }

    render() {
        const history = this.state.history;
        const squaresHistory = history.squares.slice();
        let squares = squaresHistory[squaresHistory.length - 1].slice();
        const offerHistory = history.offer.slice();
        let offer = offerHistory[offerHistory.length - 1].slice();


        // Calculate score, game over, etc.

        return (
            <div className="game">
                <h1>Monkeys of the Caribbean</h1>
                <div className="board">
                    <Board
                        squares={squares}
                    />
                </div>
                <div className="off-board">
                    <div className="score">
                        Score:
                        <div className="red-score">
                            {this.state.red_score}
                        </div>
                        <div className="blue-score">
                            {this.state.blue_score}
                        </div>
                    </div>
                    <Offer
                        offer={offer}
                        />
                    <div className="controls">
                        <button onClick={this.handleUndo}>Undo</button>
                        <button onClick={this.handleNewGame}>New</button>
                        <button onClick={this.handleShow}>Rules</button>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById("root")); todo
ReactDOM.render(
    (<Game />),
    document.getElementById('root') || document.createElement('div') // for testing purposes
);
