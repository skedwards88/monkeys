import {type GameState} from "./gameInit";
import {tallyScore, type PlayerColor} from "./tallyScore";
import {tiles} from "./tiles";
import {updateRoutes} from "./updateRoutes";
import {validDropQ} from "./validDropQ";

export function playBot({
  currentGameState,
  botColor,
}: {
  currentGameState: GameState;
  botColor: PlayerColor;
}): {playedOfferIndex: number; playedBoardIndex: number} {
  const opponentColor: PlayerColor = botColor === "red" ? "blue" : "red";

  const weightX = 1;
  const weightY = 1;

  const offeredTileIDs = currentGameState.remainingTileIDs
    .slice(0, 3)
    .filter((id) => id != null);

  if (!offeredTileIDs.length) {
    throw new Error("No tiles remaining to play");
  }

  let currentBestWeightedScore = -Infinity;
  let currentBestOfferIndex;
  let currentBestBoardIndex;

  firstBoardLoop: for (
    let firstBoardIndex = 0;
    firstBoardIndex < currentGameState.played.length;
    firstBoardIndex++
  ) {
    const isValidPlacement = validDropQ(
      currentGameState.played,
      firstBoardIndex,
      currentGameState.numColumns,
    );

    if (!isValidPlacement) {
      continue firstBoardLoop;
    }

    for (
      let firstTileIndex = 0;
      firstTileIndex < offeredTileIDs.length;
      firstTileIndex++
    ) {
      const updatedPlayed = currentGameState.played.slice();
      updatedPlayed[firstBoardIndex] = offeredTileIDs[firstTileIndex];

      const updatedRoutes = updateRoutes(
        currentGameState.routes.slice(),
        tiles[offeredTileIDs[firstTileIndex]],
        firstBoardIndex,
        currentGameState.numColumns,
      );

      const primaryScore = tallyScore(updatedRoutes);
      const primaryScoreDiff =
        primaryScore[botColor] - primaryScore[opponentColor];

      let currentWorstSecondaryScoreDiff = Infinity;

      secondBoardLoop: for (
        let secondBoardIndex = 0;
        secondBoardIndex < currentGameState.played.length;
        secondBoardIndex++
      ) {
        const isValidPlacement = validDropQ(
          updatedPlayed,
          secondBoardIndex,
          currentGameState.numColumns,
        );

        if (!isValidPlacement) {
          continue secondBoardLoop;
        }

        secondTileLoop: for (
          let secondTileIndex = 0;
          secondTileIndex < offeredTileIDs.length;
          secondTileIndex++
        ) {
          if (secondTileIndex === firstTileIndex) {
            continue secondTileLoop;
          }

          const updatedRoutes2 = updateRoutes(
            updatedRoutes,
            tiles[offeredTileIDs[secondTileIndex]],
            secondBoardIndex,
            currentGameState.numColumns,
          );

          const secondaryScore = tallyScore(updatedRoutes2);
          const secondaryScoreDiff =
            secondaryScore[botColor] - secondaryScore[opponentColor];

          if (secondaryScoreDiff < currentWorstSecondaryScoreDiff) {
            currentWorstSecondaryScoreDiff = secondaryScoreDiff;
          }
        }
      }

      // If there is only 1 tile to play, currentWorstSecondaryScoreDiff will never change from -Infinity, so disregard it
      const weightedScore =
        currentWorstSecondaryScoreDiff > -Infinity
          ? weightX * primaryScoreDiff +
            weightY * currentWorstSecondaryScoreDiff
          : primaryScoreDiff;

      if (weightedScore > currentBestWeightedScore) {
        currentBestWeightedScore = weightedScore;
        currentBestOfferIndex = firstTileIndex;
        currentBestBoardIndex = firstBoardIndex;
      }
    }
  }

  // This should only happen if there were no valid moves
  if (
    currentBestBoardIndex === undefined ||
    currentBestOfferIndex === undefined
  ) {
    throw new Error("No valid bot moves found");
  }

  return {
    playedOfferIndex: currentBestOfferIndex,
    playedBoardIndex: currentBestBoardIndex,
  };
}
