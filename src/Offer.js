import React from 'react'
import { DragDropContainer } from 'react-drag-drop-container';

function OfferTile({offerIndex, currentOffer, handleDrop}) {

  const tile = currentOffer[offerIndex];
  const className = tile ? "square filled tile" + tile.id + " offer-tile" : "square offer-tile";

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

export default function Offer({ offer, pool, handleDrop }) {

  const currentOffer = JSON.parse(JSON.stringify(offer));

  return (
    <div className="offer-area">
      <div className="offer">
        <OfferTile offerIndex={0} currentOffer={currentOffer} handleDrop={handleDrop}/>
        <OfferTile offerIndex={1} currentOffer={currentOffer} handleDrop={handleDrop}/>
        <OfferTile offerIndex={2} currentOffer={currentOffer} handleDrop={handleDrop}/>
      </div>
      <div className="square filled draw-pile">
        {Math.max(0, pool.length)}
      </div>
    </div>
  );
}

