import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import Share from "@skedwards88/shared-components/src/components/Share";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import type {DisplayState} from "./App";

export default function ControlBar({
  dispatchDisplayInfo,
}: {
  dispatchDisplayInfo: React.Dispatch<DisplayState>;
}): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  return (
    <div id="controls">
      <button id="newGameButton" onClick={() => dispatchDisplayInfo("home")} />

      <button
        id="heartButton"
        onClick={() => dispatchDisplayInfo("heart")}
      ></button>

      <button
        id="rulesButton"
        onClick={() => {
          sendAnalyticsCF({
            userId,
            sessionId,
            analyticsToLog: [{eventName: "appRules"}],
          });
          dispatchDisplayInfo("rules");
        }}
      ></button>

      <Share
        id="shareButton"
        appName="Monkeys of the Caribbean"
        text="Check out this quick spatial strategy game!"
        url="https://monkeys.twistedtrailgames.com"
        origin="control bar"
        userId={userId}
        sessionId={sessionId}
      ></Share>
      {!isRunningStandalone() ? (
        <button
          id="installButton"
          onClick={() => dispatchDisplayInfo("installOverview")}
        ></button>
      ) : (
        <></>
      )}
    </div>
  );
}
