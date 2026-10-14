import type {GameReducerPayload} from "../logic/reducer";
import type {BoardRoute} from "../logic/tiles";
import type {DisplayState} from "./App";
import Score from "./Score";

export default function GameOver({
  setDisplay,
  routes,
  dispatchGameState,
  isVsBot,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  routes: BoardRoute[];
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  isVsBot: boolean;
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
      <Score routes={routes} isVsBot={isVsBot} />
      <div>tap anywhere to return</div>
    </div>
  );
}
