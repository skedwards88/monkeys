import React from "react";
import Tutorial from "./Tutorial";
import {Game} from "./Game";
import {reducer} from "../logic/reducer";
import {gameInit} from "../logic/gameInit";
import {playBot} from "../logic/bot";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {useInstallPrompt} from "@skedwards88/shared-components/src/logic/handleInstall";
import {saveToStorage} from "@skedwards88/shared-components/src/logic/safeStorage";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import InstallOverview from "@skedwards88/shared-components/src/components/InstallOverview";
import PWAInstall from "@skedwards88/shared-components/src/components/PWAInstall";
import packageJson from "../../package.json";
import MoreGames from "@skedwards88/shared-components/src/components/MoreGames";
import {inferEventsToLog} from "../logic/inferEventsToLog";
import Home from "./Home";

export type DisplayState =
  | "game"
  | "home"
  | "rules"
  | "heart"
  | "installOverview"
  | "pwaInstall";

function App(): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  // This must live at the top level component, not in InstallOverview where it is used, since the InstallOverview is not rendered initially and therefore misses its chance to attach the listeners
  const {installPromptEvent, showInstallButton, handleInstall} =
    useInstallPrompt({userId, sessionId});

  const [display, setDisplay] = React.useState<DisplayState>("home");

  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    {},
    gameInit,
  );

  // Store the previous state so that we can infer which analytics events to send
  const previousStateRef = React.useRef(gameState);

  // Send analytics following reducer updates, if needed
  React.useEffect(() => {
    const previousState = previousStateRef.current;

    const analyticsToLog = inferEventsToLog(previousState, gameState);

    if (analyticsToLog.length) {
      sendAnalyticsCF({userId, sessionId, analyticsToLog});
    }

    previousStateRef.current = gameState;
  }, [gameState, sessionId, userId]);

  React.useEffect(() => {
    saveToStorage("gameState", gameState);
  }, [gameState]);

  // todo just temporary
  if (
    gameState.isVsBot &&
    gameState.played.filter((i) => i != null).length % 2
  ) {
    const {playedOfferIndex, playedBoardIndex} = playBot({
      gameState,
      botColor: "red",
    });

    dispatchGameState({
      action: "playBot",
      offerIndex: playedOfferIndex,
      boardIndex: playedBoardIndex,
    });
  }

  switch (display) {
    case "home":
      return (
        <Home
          dispatchGameState={dispatchGameState}
          setDisplay={setDisplay}
        ></Home>
      );

    case "rules":
      return <Tutorial setDisplay={setDisplay}></Tutorial>;

    case "heart":
      return (
        <MoreGames
          setDisplay={setDisplay}
          games={["sector", "deepSpaceSlime", "crossjig"]}
          repoName="https://github.com/skedwards88/sector"
          includeExtraInfo={true}
          version={packageJson.version}
        ></MoreGames>
      );

    case "installOverview":
      return (
        <InstallOverview
          setDisplay={setDisplay}
          userId={userId}
          sessionId={sessionId}
          installPromptEvent={installPromptEvent}
          showInstallButton={showInstallButton}
          handleInstall={handleInstall}
        ></InstallOverview>
      );

    case "pwaInstall":
      return (
        <PWAInstall
          setDisplay={setDisplay}
          pwaLink={"https://sector.twistedtrailgames.com"}
          userId={userId}
          sessionId={sessionId}
        ></PWAInstall>
      );

    default:
      return (
        <Game
          dispatchGameState={dispatchGameState}
          gameState={gameState}
          setDisplay={setDisplay}
        ></Game>
      );
  }
}

export default App;
