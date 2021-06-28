var mineSweeper = require('../src/mineSweeper'); 

describe("mineSweeper function", () => {
test("Case 1", () => {
    expect(mineSweeper.mineSweeper(1)).toBeTruthy();
  });

test("Case 2", () => {
    expect(mineSweeper.mineSweeper(1)).toBeFalsy();
  });

test("Case 3", () => {
    const expected = 'expected!';
    expect(mineSweeper.mineSweeper(1)).toBe(expected);
  });

});
