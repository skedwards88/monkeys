function partition(input, numColumns) {
  var output = [];

  for (var i = 0; i < input.length; i += numColumns) {
    output[output.length] = input.slice(i, i + numColumns);
  }

  return output;
}

export function validDropQ(played, index, numColumns) {
  // Partition the flat list of played tiles into a nested list to make the logic clearer
  const partitionedPlayed = partition(played, numColumns);

  // And convert the flat index into a row/col
  const row = Math.floor(index / numColumns);
  const column = index - row * numColumns;

  // If the square or the overlapping one above/below is already occupied,
  // don't allow a tile to be dropped there
  if (
    partitionedPlayed[row][column] ||
    (partitionedPlayed[row + 1] && partitionedPlayed[row + 1][column]) ||
    (partitionedPlayed[row - 1] && partitionedPlayed[row - 1][column])
  ) {
    return false;
  }

  // If the square does not touch a tile to the left or right, don't allow the drop
  if (
    !(
      partitionedPlayed[row][column + 1] ||
      partitionedPlayed[row][column - 1] ||
      (partitionedPlayed[row + 1] && partitionedPlayed[row + 1][column + 1]) ||
      (partitionedPlayed[row + 1] && partitionedPlayed[row + 1][column - 1]) ||
      (partitionedPlayed[row - 1] && partitionedPlayed[row - 1][column + 1]) ||
      (partitionedPlayed[row - 1] && partitionedPlayed[row - 1][column - 1])
    )
  ) {
    return false;
  }
  return true;
}