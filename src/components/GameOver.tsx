import type {GameReducerPayload} from "../logic/reducer";
import type {BoardRoute} from "../logic/tiles";
import type {DisplayState} from "./App";
import Score from "./Score";

export default function GameOver({
  dispatchDisplayInfo,
  routes,
  dispatchGameState,
}: {
  dispatchDisplayInfo: React.Dispatch<DisplayState>;
  routes: BoardRoute[];
  dispatchGameState: React.Dispatch<GameReducerPayload>;
}): React.JSX.Element {
  return (
    <div
      id="game-over"
      onClick={() => {
        dispatchDisplayInfo("game");
        dispatchGameState({action: "clearGameOver"});
      }}
    >
      <div>GAME OVER!</div>
      <Score routes={routes} />
      <div>tap anywhere to return</div>
    </div>
  );
}
