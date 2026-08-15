import React from "react";
import Tutorial from "./Tutorial";
import {Game} from "./Game";
import {reducer} from "../logic/reducer";
import {gameInit} from "../logic/gameInit";
import {playBot} from "../logic/bot";

export type DisplayState = "game" | "rules";

function App(): React.JSX.Element {
  const [display, setDisplay] = React.useState<DisplayState>("game");

  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    {},
    gameInit,
  );

  React.useEffect(() => {
    window.localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  // todo just temporary
  if (gameState.played.filter((i) => i != null).length % 2) {
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
    case "rules":
      return <Tutorial setDisplay={setDisplay}></Tutorial>;

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
