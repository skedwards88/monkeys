import React from "react";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function OfferTile({ offerIndex, remainingTileIDs }) {
  const tile = remainingTileIDs[offerIndex];
  const className = tile
    ? "square filled tile" + tile + " offer-tile"
    : "square offer-tile";

  function drag(ev, offerIndex, tile) {
    ev.dataTransfer.setData("offerIndex", offerIndex);
    ev.dataTransfer.setData("tile", tile);
    ev.target.style["opacity"] = "0.5";
  }

  function drop(ev) {
    ev.target.style["opacity"] = "1";
  }

  return (
    <div
      className={className}
      draggable="true"
      onDragStart={(e) => drag(e, offerIndex, tile)}
      onDragEnd={(e) => drop(e)}
    />
  );
}

export default function Offer({ remainingTileIDs }) {
  return (
    <div className="offer-area">
      <div className="offer">
        <OfferTile offerIndex="0" remainingTileIDs={remainingTileIDs} />
        <OfferTile offerIndex="1" remainingTileIDs={remainingTileIDs} />
        <OfferTile offerIndex="2" remainingTileIDs={remainingTileIDs} />
      </div>
      <div className="square filled draw-pile">
        {Math.max(0, remainingTileIDs.length - 3)}
      </div>
    </div>
  );
}
