import Offer from "./Offer";
import Board from "./Board";
import Score from "./Score";
import GameOver from "./GameOver";
import type {GameState} from "../logic/gameInit";
import type {DisplayState} from "./App";
import type {GameReducerPayload} from "../logic/reducer";
import DraggedTile from "./DraggedTile";
import ControlBar from "./ControlBar";
import React from "react";

export function Game({
  dispatchGameState,
  gameState,
  dispatchDisplayInfo,
  botIsThinking,
  botPlayedBoardIndex,
}: {
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  gameState: GameState;
  dispatchDisplayInfo: React.Dispatch<DisplayState>;
  botIsThinking: boolean;
  botPlayedBoardIndex: number | null;
}): React.JSX.Element {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  if (
    !gameState.gameOverCleared &&
    gameState.remainingTileIDs.every((item) => item === null)
  ) {
    return (
      <GameOver
        dispatchDisplayInfo={dispatchDisplayInfo}
        routes={gameState.routes}
        dispatchGameState={dispatchGameState}
      ></GameOver>
    );
  }

  return (
    <div
      className="App"
      id="game"
      onPointerMove={(event) => {
        event.preventDefault();
        dispatchGameState({
          action: "dragMove",
          pointerPosition: {x: event.clientX, y: event.clientY},
        });
      }}
      onPointerUp={() => {
        dispatchGameState({
          action: "cancelDrag",
        });
      }}
    >
      {gameState.dragData ? (
        <DraggedTile dragData={gameState.dragData}></DraggedTile>
      ) : (
        <></>
      )}
      <ControlBar dispatchDisplayInfo={dispatchDisplayInfo}></ControlBar>
      <Offer
        remainingTileIDs={gameState.remainingTileIDs}
        dragData={gameState.dragData}
        dispatchGameState={dispatchGameState}
        botIsThinking={botIsThinking}
      />
      <Board
        played={gameState.played}
        dragData={gameState.dragData}
        dispatchGameState={dispatchGameState}
        botPlayedBoardIndex={botPlayedBoardIndex}
        setHoverIndex={setHoverIndex}
        hoverIndex={hoverIndex}
      />
      <div id="off-board">
        <Score
          routes={gameState.routes}
          currentColor={gameState.isBlueTurn ? "blue" : "red"}
          hoverIndex={hoverIndex}
          draggedTileID={gameState.dragData?.draggedTileID}
        />
      </div>
    </div>
  );
}
