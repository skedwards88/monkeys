import type {GameReducerPayload} from "../logic/reducer";
import type {BoardRoute} from "../logic/tiles";
import type {DisplayState} from "./App";
import Score from "./Score";

export default function GameOver({
  setDisplay,
  routes,
  dispatchGameState,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  routes: BoardRoute[];
  dispatchGameState: React.Dispatch<GameReducerPayload>;
}): React.JSX.Element {
  return (
    <div
      id="game-over"
      onClick={() => {
        setDisplay("game");
        dispatchGameState({action: "clearGameOver"});
      }}
    >
      <div>GAME OVER!</div>
      <Score routes={routes} />
      <div>Click anywhere to return.</div>
    </div>
  );
}
