var mine = require('../src/mineSweeper'); 
describe("US1 - Check if board prepared correctly ", () => {
  const size=5;
  const board=mine.buildBoardCells(size);
  test("Expect the board get initialiazed with custom sizes", () => {
    expect(mine.init(size)).toEqual(board);
  });

  test("Expect TRUE after print the empty board", () => {
    expect(mine.printBoard(size,board)).toBeTruthy();
  });
});

