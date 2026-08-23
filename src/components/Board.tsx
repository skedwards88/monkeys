import React from "react";
import {NUM_COLUMNS, type Position, type DragData} from "../logic/gameInit";
import type {GameReducerPayload} from "../logic/reducer";
import {validDropQ} from "../logic/validDropQ";
import {getGhostCoordinates} from "./DraggedTile";

function getBoardIndexAtPoint(
  point: Position,
  squareRects: readonly (DOMRect | null)[],
): number | null {
  for (let boardIndex = 0; boardIndex < squareRects.length; boardIndex++) {
    const rect = squareRects[boardIndex];

    if (!rect) {
      continue;
    }

    // The rows overlap, so just consider if the pointer is in the middle 50% of the square vertically
    const inVerticalBand =
      point.y > rect.top + rect.height / 4 &&
      point.y < rect.top + (rect.height * 3) / 4;

    // The columns don't overlap, so anywhere in the square counts horizontally
    const inHorizontalBand =
      point.x > rect.left && point.x < rect.left + rect.width;

    if (inVerticalBand && inHorizontalBand) {
      return boardIndex;
    }
  }

  return null;
}

function getCenteredPointer(
  pointerPosition: Position,
  tileDimension: Position,
): Position {
  // The ghost tile is rendered relative to the pointer
  // Adjust to ghost top left, then to ghost center
  const ghostCoordinates = getGhostCoordinates(pointerPosition, tileDimension);

  return {
    x: ghostCoordinates.x + tileDimension.x / 2,
    y: ghostCoordinates.y + tileDimension.y / 2,
  };
}

function Square({
  ref,
  botPlayedBoardIndex,
  tileID,
  boardIndex,
}: {
  ref: React.Ref<HTMLDivElement>;
  botPlayedBoardIndex: number | null;
  tileID: number | null;
  boardIndex: number;
}): React.JSX.Element {
  let className = tileID != null ? `square filled tile${tileID}` : "square";

  if (botPlayedBoardIndex === boardIndex) {
    className += " botPlayHighlight";
  }

  return <div ref={ref} className={className} />;
}

export default function Board({
  played,
  dragData,
  dispatchGameState,
  botPlayedBoardIndex,
}: {
  played: (number | null)[];
  dragData: null | DragData;
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  botPlayedBoardIndex: number | null;
}): React.JSX.Element {
  const squareRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useLayoutEffect(() => {
    const hoveredIndex = dragData
      ? getBoardIndexAtPoint(
          getCenteredPointer(dragData.pointerPosition, dragData.tileDimension),
          squareRefs.current.map(
            (squareDiv) => squareDiv?.getBoundingClientRect() ?? null,
          ),
        )
      : null;

    squareRefs.current.forEach((squareDiv, boardIndex) => {
      if (!squareDiv) {
        return;
      }

      if (
        boardIndex === hoveredIndex &&
        validDropQ(played, boardIndex, NUM_COLUMNS)
      ) {
        squareDiv.style.backgroundColor = "darkblue";
      } else {
        squareDiv.style.removeProperty("background-color");
      }
    });
  }, [dragData, played]);

  const board = played.map((tileID, boardIndex) => (
    <Square
      ref={(node) => {
        // use a ref callback since the ref is in a list
        squareRefs.current[boardIndex] = node;

        // cleanup:
        return (): void => {
          squareRefs.current[boardIndex] = null;
        };
      }}
      botPlayedBoardIndex={botPlayedBoardIndex}
      tileID={tileID}
      boardIndex={boardIndex}
      key={boardIndex}
    />
  ));

  return (
    <div
      id="board"
      onPointerUp={(event) => {
        // stop propagation so that the game-level event doesn't trigger
        event.stopPropagation();

        if (!dragData) {
          return;
        }

        const squareRects = squareRefs.current.map(
          (squareDiv) => squareDiv?.getBoundingClientRect() ?? null,
        );

        const centeredPointer = getCenteredPointer(
          {x: event.clientX, y: event.clientY},
          dragData.tileDimension,
        );

        const boardIndex = getBoardIndexAtPoint(centeredPointer, squareRects);

        if (
          boardIndex == null ||
          !validDropQ(played, boardIndex, NUM_COLUMNS)
        ) {
          dispatchGameState({action: "cancelDrag"});
        } else {
          dispatchGameState({action: "dragEnd", boardIndex});
        }
      }}
    >
      {board}
    </div>
  );
}
