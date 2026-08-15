import {NUM_COLUMNS, OFFER_SIZE, type GameState} from "./gameInit";
import {tallyScore, type PlayerColor} from "./tallyScore";
import {type BoardRoute, tiles} from "./tiles";
import {updateRoutes} from "./updateRoutes";
import {validDropQ} from "./validDropQ";

type BotMove = {
  playedOfferIndex: number;
  playedBoardIndex: number;
};

type BotWeights = {
  botMove: number;
  opponentMove: number;
};

const DEFAULT_WEIGHTS: BotWeights = {
  botMove: 1,
  opponentMove: 1,
};

type LegalMove = {
  boardIndex: number;
  offerIndex: number;
  updatedRoutes: BoardRoute[];
  scoreDiff: number;
};

function getMoves({
  played,
  routes,
  offeredTileIDs,
  skipOfferIndex,
  botColor,
  opponentColor,
}: {
  played: GameState["played"];
  routes: GameState["routes"];
  offeredTileIDs: GameState["remainingTileIDs"];
  skipOfferIndex?: number;
  botColor: PlayerColor;
  opponentColor: PlayerColor;
}): LegalMove[] {
  const moves: LegalMove[] = [];

  for (let boardIndex = 0; boardIndex < played.length; boardIndex++) {
    if (!validDropQ(played, boardIndex, NUM_COLUMNS)) {
      continue;
    }

    for (let offerIndex = 0; offerIndex < offeredTileIDs.length; offerIndex++) {
      const playedTileID = offeredTileIDs[offerIndex];
      if (playedTileID === null) {
        continue;
      }

      if (offerIndex === skipOfferIndex) {
        continue;
      }

      const updatedRoutes = updateRoutes(
        routes.slice(),
        tiles[playedTileID],
        boardIndex,
        NUM_COLUMNS,
      );

      const updatedScore = tallyScore(updatedRoutes);

      moves.push({
        boardIndex,
        offerIndex,
        updatedRoutes,
        scoreDiff: updatedScore[botColor] - updatedScore[opponentColor],
      });
    }
  }

  return moves;
}

function updatePlayed(
  played: GameState["played"],
  boardIndex: number,
  tileID: GameState["played"][number],
): GameState["played"] {
  const updated = played.slice();
  updated[boardIndex] = tileID;
  return updated;
}

export function playBot({
  gameState,
  botColor,
  weights = DEFAULT_WEIGHTS,
}: {
  gameState: GameState;
  botColor: PlayerColor;
  weights?: BotWeights;
}): BotMove {
  const opponentColor: PlayerColor = botColor === "red" ? "blue" : "red";
  const {played, routes} = gameState;

  const offeredTileIDs = gameState.remainingTileIDs.slice(0, OFFER_SIZE);

  const numOfferedTiles = offeredTileIDs.filter((id) => id != null).length;

  if (!numOfferedTiles) {
    throw new Error("No tiles remaining to play");
  }

  let best: {score: number; boardIndex: number; offerIndex: number} | undefined;

  for (const botMove of getMoves({
    played,
    routes,
    offeredTileIDs,
    botColor,
    opponentColor,
  })) {
    // undefined means the opponent has no legal reply (board full, or this
    // was the last tile) - fall back to the own-move score only.
    let worstOpponentPlacementDiff: number | undefined;

    if (numOfferedTiles > 1) {
      for (const opponentMove of getMoves({
        played: updatePlayed(
          played,
          botMove.boardIndex,
          offeredTileIDs[botMove.offerIndex],
        ),
        routes: botMove.updatedRoutes,
        offeredTileIDs,
        skipOfferIndex: botMove.offerIndex,
        botColor,
        opponentColor,
      })) {
        if (
          worstOpponentPlacementDiff === undefined ||
          opponentMove.scoreDiff < worstOpponentPlacementDiff
        ) {
          worstOpponentPlacementDiff = opponentMove.scoreDiff;
        }
      }
    }

    // If there was only 1 tile left to play, worstOpponentPlacementDiff is undefined so just use the botMove.scoreDiff
    const score =
      worstOpponentPlacementDiff === undefined
        ? botMove.scoreDiff
        : weights.botMove * botMove.scoreDiff +
          weights.opponentMove * worstOpponentPlacementDiff;

    if (best === undefined || score > best.score) {
      best = {
        score,
        boardIndex: botMove.boardIndex,
        offerIndex: botMove.offerIndex,
      };
    }
  }

  // This should only happen if there were no valid moves.
  if (best === undefined) {
    throw new Error("No valid bot moves found");
  }

  return {playedOfferIndex: best.offerIndex, playedBoardIndex: best.boardIndex};
}
