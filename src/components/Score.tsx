import {NUM_COLUMNS} from "../logic/gameInit";
import {type PlayerColor, type Scores, tallyScore} from "../logic/tallyScore";
import {tiles, type BoardRoute} from "../logic/tiles";
import {updateRoutes} from "../logic/updateRoutes";

export default function Score({
  routes,
  currentColor,
  hoverIndex,
  draggedTileID,
  isVsBot,
}: {
  routes: BoardRoute[];
  currentColor?: PlayerColor;
  hoverIndex?: number | null;
  draggedTileID?: number | undefined;
  isVsBot: boolean;
}): React.JSX.Element {
  let score: Scores;

  if (
    hoverIndex === null ||
    hoverIndex === undefined ||
    draggedTileID === null ||
    draggedTileID === undefined
  ) {
    score = tallyScore(routes);
  } else {
    const routesWithHover = updateRoutes(
      routes,
      tiles[draggedTileID],
      hoverIndex,
      NUM_COLUMNS,
    );

    score = tallyScore(routesWithHover);
  }

  return (
    <div className="score">
      <div
        className={`red-score${currentColor === "red" ? " currentColor" : ""}`}
      >
        <div className="score-icon red" />
        {score.red}
      </div>
      <div
        className={`blue-score${
          currentColor === "blue" ? " currentColor" : ""
        }`}
      >
        <div className={`score-icon blue ${isVsBot ? "bot" : ""}`} />
        {score.blue}
      </div>
    </div>
  );
}
