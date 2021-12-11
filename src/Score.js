import React from "react";
import { tallyScore } from "./tallyScore";

export default function Score({ routes }) {
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
