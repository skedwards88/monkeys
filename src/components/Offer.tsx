import React from "react";
import type {GameReducerPayload} from "../logic/reducer";
import type {DragData} from "../logic/gameInit";

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

function handlePointerDown(
  event: React.PointerEvent<HTMLDivElement>,
  offerIndex: number,
  tileID: number,
  dispatchGameState: React.Dispatch<GameReducerPayload>,
): void {
  // Release pointer capture so that pointer events can fire on other elements
  event.currentTarget.releasePointerCapture(event.pointerId);

  event.preventDefault();

  dispatchGameState({
    action: "dragStart",
    draggedTileID: tileID,
    draggedOfferIndex: offerIndex,
    pointerStartPosition: {x: event.clientX, y: event.clientY},
    tileDimension: {
      x: event.currentTarget.getBoundingClientRect().width,
      y: event.currentTarget.getBoundingClientRect().height,
    },
  });
}

function OfferTile({
  offerIndex,
  remainingTileIDs,
  dispatchGameState,
  isDragging,
}: {
  offerIndex: number;
  remainingTileIDs: (number | null)[];
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  isDragging: boolean;
}): React.JSX.Element {
  const tileID = remainingTileIDs[offerIndex];
  let className = "square offer-tile";

  if (tileID != null) {
    className += ` filled tile${tileID}`;
  }

  if (isDragging) {
    className += " dragged";
  }

  return (
    <div
      className={className}
      {...(tileID != null
        ? {
            onPointerDown: (event) =>
              handlePointerDown(event, offerIndex, tileID, dispatchGameState),
          }
        : {})}
    />
  );
}

export default function Offer({
  remainingTileIDs,
  dragData,
  dispatchGameState,
}: {
  remainingTileIDs: (number | null)[];
  dragData: null | DragData;
  dispatchGameState: React.Dispatch<GameReducerPayload>;
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
        <OfferTile
          offerIndex={0}
          remainingTileIDs={remainingTileIDs}
          dispatchGameState={dispatchGameState}
          isDragging={dragData?.draggedOfferIndex === 0}
        />
        <OfferTile
          offerIndex={1}
          remainingTileIDs={remainingTileIDs}
          dispatchGameState={dispatchGameState}
          isDragging={dragData?.draggedOfferIndex === 1}
        />
        <OfferTile
          offerIndex={2}
          remainingTileIDs={remainingTileIDs}
          dispatchGameState={dispatchGameState}
          isDragging={dragData?.draggedOfferIndex === 2}
        />
      </div>
      <div className="square filled draw-pile">
        {Math.max(0, remainingTileIDs.length - 3)}
      </div>
    </div>
  );
}
