import {partitionArray} from "@skedwards88/word_logic";

export function validDropQ(
  played: (null | number)[],
  index: number,
  numColumns: number,
): boolean {
  // Partition the flat list of played tiles into a nested list to make the logic clearer
  const partitionedPlayed = partitionArray(played, numColumns);

  // And convert the flat index into a row/col
  const row = Math.floor(index / numColumns);
  const column = index - row * numColumns;

  // If the square or the overlapping one above/below is already occupied,
  // don't allow a tile to be dropped there
  if (
    partitionedPlayed[row][column] != null ||
    partitionedPlayed[row + 1]?.[column] != null ||
    partitionedPlayed[row - 1]?.[column] != null
  ) {
    return false;
  }

  // If the square does not touch a tile to the left or right, don't allow the drop
  if (
    !(
      partitionedPlayed[row][column + 1] != null ||
      partitionedPlayed[row][column - 1] != null ||
      partitionedPlayed[row + 1]?.[column + 1] != null ||
      partitionedPlayed[row + 1]?.[column - 1] != null ||
      partitionedPlayed[row - 1]?.[column + 1] != null ||
      partitionedPlayed[row - 1]?.[column - 1] != null
    )
  ) {
    return false;
  }
  return true;
}
