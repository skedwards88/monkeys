import {tallyScore} from "../logic/tallyScore";
import type {BoardRoute} from "../logic/tiles";

export default function Score({
  routes,
}: {
  routes: BoardRoute[];
}): React.JSX.Element {
  const score = tallyScore(routes);

  return (
    <div className="score">
      <div className="red-score">
        <div className="score-icon red" />
        {score.red}
      </div>
      <div className="blue-score">
        <div className="score-icon blue" />
        {score.blue}
      </div>
    </div>
  );
}
