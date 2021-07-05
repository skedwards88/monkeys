import React from 'react'

export default function Square({ tile, onDragOver, onDrop }) {
  let tile = tile;
  let className = tile ? "square filled tile" + tile.id : "square";

  return (
      <div className={className}
          onDragOver={onDragOver}
          onDrop={onDrop}
      />
  );
}
