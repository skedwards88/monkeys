import type {GameState} from "./gameInit";
import {tallyScore} from "./tallyScore";

export function inferEventsToLog(
  oldState: GameState,
  newState: GameState,
): {
  eventName: string;
  eventInfo?: object;
}[] {
  const analyticsToLog = [];

  // If a new game was generated
  if (oldState.id !== newState.id) {
    analyticsToLog.push({
      eventName: "new_game",
      eventInfo: {
        isVsBot: newState.isVsBot,
      },
    });
  }

  // If a game completed
  if (
    !newState.remainingTileIDs.every((item) => item === null) &&
    oldState.remainingTileIDs.every((item) => item === null)
  ) {
    const score = tallyScore(oldState.routes);

    const blueScore = score.blue;
    const redScore = score.red;
    let winner;
    if (redScore === blueScore) {
      winner = "tie";
    } else {
      winner = redScore > blueScore ? "red" : "blue";
    }

    analyticsToLog.push({
      eventName: "gameOver",
      eventInfo: {
        isVsBot: newState.isVsBot,
        colorWon: winner,
      },
    });
  }

  return analyticsToLog;
}
