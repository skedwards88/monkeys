import {
    shuffleArray
} from './index';

test('Shuffle an array', () => {
    let original = [1,2,3,4,5];
    let input = original.slice();
    shuffleArray(input);
    let originalSet = new Set(original);
    let shuffledSet = new Set(input);
    expect(input).not.toEqual(original);
    expect(input.length).toEqual(original.length);
    expect(originalSet).toEqual(shuffledSet);
});


