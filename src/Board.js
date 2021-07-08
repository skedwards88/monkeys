import React from 'react'
import { DropTarget } from 'react-drag-drop-container';

export default function Board({ tiles, played, numRows, numColumns }) {
    // debugger;
  function renderTile(row, column) {
      let squares = JSON.parse(JSON.stringify(played));
      const tile = squares[row][column];
      const className = tile ? "square filled tile" + tile : "square";

      return (
          <DropTarget
              targetKey="offer-tile"
              dropData={{ 'row': row, 'column': column }}
              key={row + ',' + column}
          >
              <div className={className}
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
      <div className="board">
          {createBoard()}
      </div>
  );
}