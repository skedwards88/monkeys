import Offer from "./Offer";
import Board from "./Board";
import Score from "./Score";
import GameOver from "./GameOver";
import type {GameState} from "../logic/gameInit";
import type {DisplayState} from "./App";
import type {GameReducerPayload} from "../logic/reducer";
import DraggedTile from "./DraggedTile";
import ControlBar from "./ControlBar";

export function Game({
  dispatchGameState,
  gameState,
  setDisplay,
}: {
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  gameState: GameState;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  if (
    !gameState.gameOverCleared &&
    gameState.remainingTileIDs.every((item) => item === null)
  ) {
    return (
      <GameOver
        setDisplay={setDisplay}
        routes={gameState.routes}
        dispatchGameState={dispatchGameState}
      ></GameOver>
    );
  }

  return (
    <div
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
          action: "dragEnd",
          boardIndex: null,
        });
      }}
    >
      {gameState.dragData ? (
        <DraggedTile dragData={gameState.dragData}></DraggedTile>
      ) : (
        <></>
      )}
      <ControlBar
        setDisplay={setDisplay}
        dispatchGameState={dispatchGameState}
      ></ControlBar>
      <Offer
        remainingTileIDs={gameState.remainingTileIDs}
        dragData={gameState.dragData}
        dispatchGameState={dispatchGameState}
      />
      <Board
        played={gameState.played}
        dragData={gameState.dragData}
        dispatchGameState={dispatchGameState}
      />
      <div id="off-board">
        <Score
          routes={gameState.routes}
          currentColor={gameState.isBlueTurn ? "blue" : "red"}
        />
      </div>
    </div>
  );
}
