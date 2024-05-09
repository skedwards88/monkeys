import React from "react";
import Score from "./Score";

export default function GameOver({setDisplay, routes, dispatchGameState}) {
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
