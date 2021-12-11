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