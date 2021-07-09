import React from 'react'
import { DropTarget } from 'react-drag-drop-container';

function partition(input, numColumns) {
    var output = [];

    for (var i = 0; i < input.length; i += numColumns) {
        output[output.length] = input.slice(i, i + numColumns);
    }

    return output;
}

function renderTile(played, row, column, numColumns) {

    const partitionedPlayed = partition([...played], numColumns)
    const flatIndex = (row * numColumns) + column

    const tile = partitionedPlayed[row][column];
    const className = tile ? "square filled tile" + tile : "square";

    return (
        <DropTarget
            targetKey="offer-tile"
            dropData={{ 'row': row, 'column': column, 'flatIndex': flatIndex }}
            key={row + ',' + column}
        >
            <div className={className}
                tile={tile}
                key={row + ',' + column}
                row={row}
                column={column}
                index={flatIndex}
            />
        </DropTarget>
    );
}

function createBoard(played, numRows, numColumns) {

    let rows = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
            row.push(renderTile(played, rowIndex, columnIndex, numColumns));
        }
        rows.push(<div className="board-row" key={rowIndex}>{row}</div>);
    }
    return rows;
}

export default function Board({ played, numRows, numColumns }) {

    return (
        <div className="board">
            {createBoard(played, numRows, numColumns)}
        </div>
    );
}