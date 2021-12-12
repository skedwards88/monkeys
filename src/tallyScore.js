function calculateRouteScore(boardRoute) {
  // Count the features across all tile routes in this board route
  let coconuts = 0;
  let chests = 0;
  let redShips = 0;
  let blueShips = 0;
  let redAnchors = 0;
  let blueAnchors = 0;

  for (let tileRoute of boardRoute.tileRoutes) {
    coconuts += tileRoute.coconuts;
    chests += tileRoute.chests;
    redShips += tileRoute.redShips;
    blueShips += tileRoute.blueShips;
    redAnchors += tileRoute.redAnchors;
    blueAnchors += tileRoute.blueAnchors;
  }

  let value = chests ? coconuts * 2 : coconuts;
  let numRed = redAnchors ? redShips * 2 : redShips;
  let numBlue = blueAnchors ? blueShips * 2 : blueShips;
  if (numBlue > numRed) {
    return { red: 0, blue: value };
  } else if (numRed > numBlue) {
    return { red: value, blue: 0 };
  } else {
    return { red: 0, blue: 0 };
  }
}

export function tallyScore(routes) {
  // Get the red/blue score for each route and sum them up
  const scores = routes.map((route) => calculateRouteScore(route));
  const redScore = scores
    .map((score) => score.red)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  const blueScore = scores
    .map((score) => score.blue)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  return { red: redScore, blue: blueScore };
}