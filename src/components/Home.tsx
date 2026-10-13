import {useState} from "react";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import logo from "../images/button_icons/monkey_3.svg";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import type {GameReducerPayload} from "../logic/reducer";
import type {DisplayState} from "./App";
import {rules} from "../logic/rules";

export default function Home({
  dispatchGameState,
  dispatchDisplayInfo,
  previousIsWhirlpools,
  setCurrentRule,
}: {
  dispatchGameState: React.Dispatch<GameReducerPayload>;
  dispatchDisplayInfo: React.Dispatch<DisplayState>;
  previousIsWhirlpools: boolean;
  setCurrentRule: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  const [isWhirlpools, setIsWhirlpools] = useState(previousIsWhirlpools);

  const firstWhirlpoolRuleIndex = rules.findIndex(
    (rule) => rule.isFirstWhirlpoolRule,
  );

  return (
    <div className="App" id="home">
      <img src={logo} alt="Game logo" id="logo" />

      <button
        onClick={() => {
          dispatchGameState({action: "newGame", isVsBot: false, isWhirlpools});
          dispatchDisplayInfo("game");
        }}
      >
        monkey vs monkey
      </button>

      <button
        onClick={() => {
          dispatchGameState({action: "newGame", isVsBot: true, isWhirlpools});
          dispatchDisplayInfo("game");
        }}
      >
        monkey vs bot
      </button>

      <div className="setting">
        <input
          id="enableWhirlpools"
          type="checkbox"
          checked={isWhirlpools}
          onChange={() => setIsWhirlpools(!isWhirlpools)}
        />
        <div className="setting-description">
          <label htmlFor="enableWhirlpools">enable whirlpools</label>
          <p
            className="setting-info"
            onClick={() => {
              sendAnalyticsCF({
                userId,
                sessionId,
                analyticsToLog: [{eventName: "appRules"}],
              });
              setCurrentRule(firstWhirlpoolRuleIndex);
              dispatchDisplayInfo("rules");
            }}
          >
            Learn about whirlpools
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          sendAnalyticsCF({
            userId,
            sessionId,
            analyticsToLog: [{eventName: "appRules"}],
          });
          dispatchDisplayInfo("rules");
        }}
      >
        rules
      </button>
    </div>
  );
}
