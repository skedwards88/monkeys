import React from 'react'
import { polyfill } from "mobile-drag-drop";
//todo uninstall react-drag-drop-container / remove from package json
polyfill({
    dragImageCenterOnTouch: true
});

function partition(input, numColumns) {
    var output = [];

    for (var i = 0; i < input.length; i += numColumns) {
        output[output.length] = input.slice(i, i + numColumns);
    }

    return output;
}

function renderTile(played, row, column, numColumns, handleDrop) {

    const partitionedPlayed = partition([...played], numColumns)
    const flatIndex = (row * numColumns) + column

    const tile = partitionedPlayed[row][column];
    const className = tile ? "square filled tile" + tile : "square";

    function allowDrop(ev) {
        ev.preventDefault();
    }

    return (
        <div
            onDrop={(e) => handleDrop(e, flatIndex)}
            onDragOver={(e) => allowDrop(e)} key={row + ',' + column}
            className={className + " droptarget"}
            onDragEnter={(event) => {
                event.preventDefault();
            }}
        />

    );
}

function createBoard(played, numRows, numColumns, handleDrop) {

    let rows = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
            row.push(renderTile(played, rowIndex, columnIndex, numColumns, handleDrop));
        }
        rows.push(<div className="board-row" key={rowIndex}>{row}</div>);
    }
    return rows;
}

export default function Board({ played, numRows, numColumns, handleDrop }) {

    return (
        <div className="board">
            {createBoard(played, numRows, numColumns, handleDrop)}
        </div>
    );
}