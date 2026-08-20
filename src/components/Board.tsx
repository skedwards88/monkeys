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

  event.currentTarget.style.removeProperty("background-color");

  dispatchGameState({
    action: "dragEnd",
    boardIndex: boardIndex,
  });
};

function Square({
  played,
  dragData,
  dispatchGameState,
  botPlayedBoardIndex,
  tileID,
  boardIndex,
}: {
  played: (number | null)[];
  dragData: null | DragData;
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  botPlayedBoardIndex: number | null;
  tileID: number | null;
  boardIndex: number;
}): React.JSX.Element {
  let className = tileID != null ? "square filled tile" + tileID : "square";

  if (botPlayedBoardIndex === boardIndex) {
    className += " highlight";
  }

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
          event.currentTarget.style.backgroundColor = "darkblue";
        }
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("background-color");
      }}
    />
  );
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
  const board = played.map((tileID, boardIndex) => (
    <Square
      played={played}
      dragData={dragData}
      dispatchGameState={dispatchGameState}
      botPlayedBoardIndex={botPlayedBoardIndex}
      tileID={tileID}
      boardIndex={boardIndex}
      key={`${boardIndex}-${tileID}`}
    ></Square>
  ));

  return <div id="board">{board}</div>;
}
