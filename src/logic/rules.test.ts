import {rules} from "./rules";

describe("rules", () => {
  test("there is exactly one first whirlpool rule", () => {
    const firstWhirlpoolRules = rules.filter(
      (rule) => rule.isFirstWhirlpoolRule,
    );

    expect(firstWhirlpoolRules.length).toBe(1);
  });
});
