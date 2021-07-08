import React from 'react'
import { DragDropContainer } from 'react-drag-drop-container';

function OfferTile({offerIndex, remainingTileIDs, handleDrop}) {
  const tile = remainingTileIDs[offerIndex]
  const className = tile ? "square filled tile" + tile + " offer-tile" : "square offer-tile";

  return (
    <DragDropContainer
      targetKey="offer-tile"
      dragData={{ tile: tile, offerIndex: offerIndex }}
      onDrop={(e) => handleDrop(e)}
      key={offerIndex}
    >
      <div className={className}/>
    </DragDropContainer>
  )
}

export default function Offer({ remainingTileIDs, handleDrop }) {
  // console.log('offer render')
  // console.log(remainingTileIDs)
  // console.log('^ from offer')
  return (
    <div className="offer-area">
      <div className="offer">
        <OfferTile offerIndex={0} remainingTileIDs={remainingTileIDs} handleDrop={handleDrop}/>
        <OfferTile offerIndex={1} remainingTileIDs={remainingTileIDs} handleDrop={handleDrop}/>
        <OfferTile offerIndex={2} remainingTileIDs={remainingTileIDs} handleDrop={handleDrop}/>
      </div>
      <div className="square filled draw-pile">
        {Math.max(0, remainingTileIDs.length - 3)}
      </div>
    </div>
  );
}

