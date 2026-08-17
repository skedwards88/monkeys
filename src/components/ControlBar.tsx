import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import Share from "@skedwards88/shared-components/src/components/Share";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import type {DisplayState} from "./App";
import type {GameReducerPayload} from "../logic/reducer";

export default function ControlBar({
  setDisplay,
  dispatchGameState,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  dispatchGameState: React.Dispatch<GameReducerPayload>;
}): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  return (
    <div id="controls">
      <button
        id="newGameButton"
        onClick={() =>
          dispatchGameState({
            action: "newGame",
          })
        }
      />

      <button id="heartButton" onClick={() => setDisplay("heart")}></button>

      <button
        id="rulesButton"
        onClick={() => {
          sendAnalyticsCF({
            userId,
            sessionId,
            analyticsToLog: [{eventName: "appRules"}],
          });
          setDisplay("rules");
        }}
      ></button>

      <Share
        id="shareButton"
        appName="Monkeys of the Caribbean"
        text="Check out this quick spatial strategy game!"
        url="https://skedwards88.github.io/monkeys"
        origin="control bar"
        userId={userId}
        sessionId={sessionId}
      ></Share>
      {!isRunningStandalone() ? (
        <button
          id="installButton"
          onClick={() => setDisplay("installOverview")}
        ></button>
      ) : (
        <></>
      )}
    </div>
  );
}
