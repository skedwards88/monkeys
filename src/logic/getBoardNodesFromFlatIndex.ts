export function getBoardNodesFromFlatIndex(
  flatIndex: number,
  numColumns: number,
): [number, number, number, number] {
  // Convert a 0-indexed grid position to 0-indexed corner numbers of that square in a grid
  const row = Math.floor(flatIndex / numColumns);
  const column = flatIndex - row * numColumns;

  const topLeft = row * (numColumns + 1) + column;
  const topRight = topLeft + 1;
  const bottomLeft = topLeft + numColumns + 1;
  const bottomRight = bottomLeft + 1;
  return [topLeft, topRight, bottomLeft, bottomRight];
}
