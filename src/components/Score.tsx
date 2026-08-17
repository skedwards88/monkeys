import {type PlayerColor, tallyScore} from "../logic/tallyScore";
import type {BoardRoute} from "../logic/tiles";

export default function Score({
  routes,
  currentColor,
}: {
  routes: BoardRoute[];
  currentColor?: PlayerColor;
}): React.JSX.Element {
  const score = tallyScore(routes);

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
        <div className="score-icon blue" />
        {score.blue}
      </div>
    </div>
  );
}
