import React from 'react'
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true
});

function OfferTile({ offerIndex, remainingTileIDs, handleDrop }) {
  const tile = remainingTileIDs[offerIndex]
  const className = tile ? "square filled tile" + tile + " offer-tile" : "square offer-tile";

  function drag(ev, offerIndex, tile) {
    console.log('dragging!')
    ev.dataTransfer.setData("offerIndex", offerIndex);
    ev.dataTransfer.setData("tile", tile);
  }

  return (

    <div className={className} draggable="true" onDragStart={(e) => drag(e, offerIndex, tile)} />

  )
}



export default function Offer({ remainingTileIDs, handleDrop }) {
  console.log('render offer')
  return (
    <div className="offer-area">
      <div className="offer">
        <OfferTile offerIndex="0" remainingTileIDs={remainingTileIDs} handleDrop={handleDrop} />
        <OfferTile offerIndex="1" remainingTileIDs={remainingTileIDs} handleDrop={handleDrop} />
        <OfferTile offerIndex="2" remainingTileIDs={remainingTileIDs} handleDrop={handleDrop} />
      </div>
      <div className="square filled draw-pile">
        {Math.max(0, remainingTileIDs.length - 3)}
      </div>
    </div>
  );
}

