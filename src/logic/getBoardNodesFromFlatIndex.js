export function getBoardNodesFromFlatIndex(flatIndex, numColumns) {
  // Convert a 0-indexed grid position to 0-indexed corner numbers of that square in a grid
  const row = Math.floor(flatIndex / numColumns);
  const column = flatIndex - row * numColumns;

  let topLeft = row * (numColumns + 1) + column;
  let topRight = topLeft + 1;
  let bottomLeft = topLeft + numColumns + 1;
  let bottomRight = bottomLeft + 1;
  return [topLeft, topRight, bottomLeft, bottomRight];
}
