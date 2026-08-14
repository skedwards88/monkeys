import Offer from "./Offer";
import Board from "./Board";
import Score from "./Score";
import GameOver from "./GameOver";
import type {GameState} from "../logic/gameInit";
import type {DisplayState} from "./App";
import type {GameReducerPayload} from "../logic/reducer";

export function Game({
  dispatchGameState,
  gameState,
  setDisplay,
}: {
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  gameState: GameState;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const handleDrop = (event, flatIndex: number): void => {
    event.target.style["background-color"] = "transparent";

    const offerIndex = event.dataTransfer.getData("offerIndex");
    const tile = event.dataTransfer.getData("tile");

    dispatchGameState({
      action: "drop",
      numColumns: gameState.numColumns,
      offerIndex: offerIndex,
      tile: tile,
      flatIndex: flatIndex,
    });
  };

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
    <div id="game">
      <Offer remainingTileIDs={gameState.remainingTileIDs} />
      <Board played={gameState.played} handleDrop={handleDrop} />
      <div id="off-board">
        <Score routes={gameState.routes} />
        <button
          id="new-game-button"
          onClick={() =>
            dispatchGameState({
              action: "reset",
            })
          }
        />
        <button id="rules-button" onClick={() => setDisplay("rules")}></button>
      </div>
    </div>
  );
}
