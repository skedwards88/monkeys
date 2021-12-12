import { shuffleArray } from "./shuffleArray";

test("the shuffled array contains the same items", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);

  expect(original.sort()).toEqual(shuffled.sort());
});

test("the shuffled array is not the same order", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);

  expect(original).not.toEqual(shuffled);
});
