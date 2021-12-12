import { getBoardNodesFromFlatIndex } from "./getBoardNodesFromFlatIndex";

test("getBoardNodesFromFlatIndex", () => {
  expect(getBoardNodesFromFlatIndex(0, 9)).toEqual([0, 1, 10, 11]);
  expect(getBoardNodesFromFlatIndex(15, 4)).toEqual([18, 19, 23, 24]);
  expect(getBoardNodesFromFlatIndex(2, 4)).toEqual([2, 3, 7, 8]);
  expect(getBoardNodesFromFlatIndex(12, 4)).toEqual([15, 16, 20, 21]);
});
