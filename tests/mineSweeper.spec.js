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

describe("US2 - Testing the  Bombs on board ", () => {
  const board=mine.buildBoardCells(4);
  const size=4;
  test("Expect to set mine in cell", () => {   
    expect(mine.addBomb(1,1,board)).toBeTruthy();
    expect(board[1][1]).toEqual({"bomb": true, "bombAround": 0, "col": 1, "flagged": false, "revealed": false, "row": 1});
  });
  test("Expect to not set mine in cell that already has bomb", () => {   
    expect(mine.addBomb(1,1,board)).toBeFalsy();
  });
test("Expect to increase all mine counts around mine", () => {   
    mine.assignNumbersAroundBombs(1,1,size,board);
    expect(board[0][0]).toEqual({"bomb": false, "bombAround": 1, "col": 0, "flagged": false, "revealed": false, "row": 0});
    expect(board[0][1]).toEqual({"bomb": false, "bombAround": 1, "col": 1, "flagged": false, "revealed": false, "row": 0});
    expect(board[0][2]).toEqual({"bomb": false, "bombAround": 1, "col": 2, "flagged": false, "revealed": false, "row": 0});
    expect(board[1][0]).toEqual({"bomb": false, "bombAround": 1, "col": 0, "flagged": false, "revealed": false, "row": 1});
    expect(board[1][2]).toEqual({"bomb": false, "bombAround": 1, "col": 2, "flagged": false, "revealed": false, "row": 1});
    expect(board[2][0]).toEqual({"bomb": false, "bombAround": 1, "col": 0, "flagged": false, "revealed": false, "row": 2});
    expect(board[2][1]).toEqual({"bomb": false, "bombAround": 1, "col": 1, "flagged": false, "revealed": false, "row": 2});
    expect(board[2][2]).toEqual({"bomb": false, "bombAround": 1, "col": 2, "flagged": false, "revealed": false, "row": 2});
  });

  test("Expect to see all cells around cell with count ZERO", () => {   
    mine.showCellsAround(3,2,size,board);
    expect(board[3][1]).toEqual({"bomb": false, "bombAround": 0, "col": 1, "flagged": false, "revealed": true, "row": 3});
    expect(board[3][3]).toEqual({"bomb": false, "bombAround": 0, "col": 3, "flagged": false, "revealed": true, "row": 3});
    expect(board[2][1]).toEqual({"bomb": false, "bombAround": 1, "col": 1, "flagged": false, "revealed": true, "row": 2});
    expect(board[2][2]).toEqual({"bomb": false, "bombAround": 1, "col": 2, "flagged": false, "revealed": true, "row": 2});
    expect(board[2][2]).toEqual({"bomb": false, "bombAround": 1, "col": 2, "flagged": false, "revealed": true, "row": 2});
  });
  var size5=5;
  var board2=mine.buildBoardCells(size5);
  
  test("Expect return TRUE after set all bombs in board", () => {   
    expect(mine.addAllBombs(size5,board2)).toBeTruthy();
   });
   test("Expect to return same count for mines with size of board", () => {   
    expect(mine.getBombsCount(size5,board2)).toBe(size5);
   });
});