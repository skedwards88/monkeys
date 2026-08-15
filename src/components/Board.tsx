import {NUM_COLUMNS, type DragData} from "../logic/gameInit";
import type {GameReducerPayload} from "../logic/reducer";
import {validDropQ} from "../logic/validDropQ";

const handlePointerUp = (
  event: React.PointerEvent<HTMLDivElement>,
  boardIndex: number,
  dispatchGameState: React.Dispatch<GameReducerPayload>,
): void => {
  // stop propagation so that the game-level event doesn't trigger
  event.stopPropagation();

  event.currentTarget.style["background-color"] = "transparent";

  dispatchGameState({
    action: "dragEnd",
    boardIndex: boardIndex,
  });
};

export default function Board({
  played,
  dragData,
  dispatchGameState,
}: {
  played: (number | null)[];
  dragData: null | DragData;
  dispatchGameState: React.Dispatch<GameReducerPayload>;
}): React.JSX.Element {
  const board = played.map((tileID, boardIndex) => {
    const className = tileID != null ? "square filled tile" + tileID : "square";

    return (
      <div
        onPointerUp={(event) =>
          handlePointerUp(event, boardIndex, dispatchGameState)
        }
        key={boardIndex}
        className={className}
        onPointerEnter={(event) => {
          event.preventDefault();
          if (dragData && validDropQ(played, boardIndex, NUM_COLUMNS)) {
            event.currentTarget.style["background-color"] = "darkblue";
          }
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style["background-color"] = "transparent";
        }}
      />
    );
  });

  return <div id="board">{board}</div>;
}
