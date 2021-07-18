import React from "react";
import Score from "./Score";

function closeGameOver(e) {
  e.target.style.display = "none";
}

export default function GameOver({ remainingTileIDs, routes }) {
  if (remainingTileIDs.every((item) => item === null)) {
    return (
      <div id="game-over" className="modal" onClick={(e) => closeGameOver(e)}>
        <div>GAME OVER!</div>
        <Score routes={routes} />
        <div>Click anywhere to return.</div>
      </div>
    );
  } else {
    return <></>;
  }
}
