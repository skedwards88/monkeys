import React from "react";

export function tallyScore(routes) {
  // Get the red/blue score for each route and sum them up
  let scores = routes.map((route) => route.score);
  let redScore = scores
    .map((score) => score.red)
    .reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue;
    }, 0);
  let blueScore = scores
    .map((score) => score.blue)
    .reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue;
    }, 0);
  return { red: redScore, blue: blueScore };
}

export default function Score({ routes }) {
  const score = 5
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
