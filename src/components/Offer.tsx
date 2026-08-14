import React from "react";
import {polyfill} from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function getDeckStyling(deckSize: number): string[] {
  // The box shadow around the draw stack
  const fullDeckStyling = [
    "-1px 1px rgba(27, 211, 235, 0.35)",
    "-1px 1px rgba(0,0,0, 0.15)",
    "-2px 2px rgba(27, 211, 235, 0.35)",
    "-2px 2px rgba(0,0,0, 0.05)",
    "-3px 3px rgba(27, 211, 235, 0.35)",
    "-3px 3px rgba(0,0,0, 0.35)",
    "-4px 4px rgba(27, 211, 235, 0.35)",
    "-4px 4px rgba(0,0,0, 0.25)",
    "-5px 5px rgba(27, 211, 235, 0.35)",
    "-5px 5px rgba(0,0,0, 0.45)",
    "-6px 6px rgba(27, 211, 235, 0.35)",
    "-6px 6px rgba(0,0,0, 0.35)",
    "-7px 7px rgba(27, 211, 235, 0.35)",
    "-7px 7px rgba(0,0,0, 0.15)",
    "-8px 8px rgba(27, 211, 235, 0.35)",
    "-8px 8px rgba(0,0,0, 0.25)",
    "-9px 9px rgba(27, 211, 235, 0.35)",
    "-9px 9px rgba(0,0,0, 0.35)",
    "-10px 10px rgba(27, 211, 235, 0.35)",
    "-10px 10px rgba(0,0,0, 0.45)",
    "-11px 11px rgba(27, 211, 235, 0.35)",
    "-11px 11px rgba(0,0,0, 0.35)",
    "-12px 12px rgba(27, 211, 235, 0.35)",
    "-12px 12px rgba(0,0,0, 0.15)",
    "-13px 13px rgba(27, 211, 235, 0.35)",
    "-13px 13px rgba(0,0,0, 0.35)",
  ];

  return fullDeckStyling.slice(0, 2 * (deckSize - 3));
}

function OfferTile({
  offerIndex,
  remainingTileIDs,
}: {
  offerIndex: number;
  remainingTileIDs: number[];
}): React.JSX.Element {
  const tileID = remainingTileIDs[offerIndex];
  const className =
    tileID != null
      ? "square filled tile" + tileID + " offer-tile"
      : "square offer-tile";

  function drag(event, offerIndex: number, tile: number): void {
    event.dataTransfer.setData("offerIndex", offerIndex);
    event.dataTransfer.setData("tile", tile);
    event.target.style["opacity"] = "0.5";

    // If not on a device on which the mobile-drag-drop pollyfill applies
    // Center the drag image on the cursor
    if (!/iPad|iPhone|iPod|Android/.test(navigator.userAgent)) {
      event.dataTransfer.setDragImage(event.target, 50, 50);
    }
  }

  function drop(event): void {
    event.target.style["opacity"] = "1";
  }

  return (
    <div
      className={className}
      draggable="true"
      onDragStart={(e) => drag(e, offerIndex, tileID)}
      onDragEnd={(e) => drop(e)}
    />
  );
}

export default function Offer({
  remainingTileIDs,
}: {
  remainingTileIDs: (number | null)[];
}): React.JSX.Element {
  const offerRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const deckStyling = getDeckStyling(remainingTileIDs.length);
    const offerDiv = offerRef.current;

    if (!offerDiv) {
      return;
    }

    offerDiv.style.setProperty("--deck-size", deckStyling.join(","));
  }, [remainingTileIDs]);

  return (
    <div id="offer-area" ref={offerRef}>
      <div id="offer">
        <OfferTile offerIndex={0} remainingTileIDs={remainingTileIDs} />
        <OfferTile offerIndex={1} remainingTileIDs={remainingTileIDs} />
        <OfferTile offerIndex={2} remainingTileIDs={remainingTileIDs} />
      </div>
      <div className="square filled draw-pile">
        {Math.max(0, remainingTileIDs.length - 3)}
      </div>
    </div>
  );
}
