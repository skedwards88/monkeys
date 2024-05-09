import React from "react";
import Tutorial from "./Tutorial.js";
import {Game} from "./Game.js";
import {reducer} from "../logic/reducer.js";
import {getInitialSetup} from "../logic/getInitialSetup.js";

function App() {
  const [display, setDisplay] = React.useState("game");

  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    {},
    getInitialSetup,
  );

  React.useEffect(() => {
    window.localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

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
