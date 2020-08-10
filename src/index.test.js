import {
    shuffleArray,
    getBoardNodesFromRowCol
} from './index';

test.skip('Shuffle an array', () => {
    let original = [1,2,3,4,5];
    let input = original.slice();
    shuffleArray(input);
    let originalSet = new Set(original);
    let shuffledSet = new Set(input);
    expect(input).not.toEqual(original);
    expect(input.length).toEqual(original.length);
    expect(originalSet).toEqual(shuffledSet);
});


test.skip("getBoardNodesFromRowCol", () => {
    expect(getBoardNodesFromRowCol(0, 0, 9)).toEqual([0, 1, 10, 11]);
    expect(getBoardNodesFromRowCol(3, 3, 4)).toEqual([18, 19, 23, 24]);
    expect(getBoardNodesFromRowCol(0, 2, 4)).toEqual([2, 3, 7, 8]);
    expect(getBoardNodesFromRowCol(3, 0, 4)).toEqual([15, 16, 20, 21]);
});