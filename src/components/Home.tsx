import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import logo from "../images/button_icons/monkey_3.svg";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import type {GameReducerPayload} from "../logic/reducer";
import type {DisplayState} from "./App";

export default function Home({
  dispatchGameState,
  setDisplay,
}: {
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  return (
    <div className="App" id="home">
      <img src={logo} alt="Game logo" id="logo" />

      <button
        onClick={() => {
          dispatchGameState({action: "newGame", isVsBot: false});
          setDisplay("game");
        }}
      >
        monkey vs monkey
      </button>
      <button
        onClick={() => {
          dispatchGameState({action: "newGame", isVsBot: true});
          setDisplay("game");
        }}
      >
        monkey vs bot
      </button>
      <button
        onClick={() => {
          sendAnalyticsCF({
            userId,
            sessionId,
            analyticsToLog: [{eventName: "appRules"}],
          });
          setDisplay("rules");
        }}
      >
        rules
      </button>
    </div>
  );
}
