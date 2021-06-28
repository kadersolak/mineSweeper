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

describe("US2 - Testing the Bombs on board ", () => {
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

describe("US3 - Check the game rules ", () => {

  const size=4;
  const board=mine.buildBoardCells(size);
  test("Expect to return TRUE when a revealed and there is no bomb", () => {   
    expect(mine.makeAMove(board[1][1],size,board)).toBeTruthy();
  });
  test("Expect the Cell to be revealed after picked up", () => {   
    expect(board[1][1]).toEqual({"bomb": false, "bombAround": 0, "col": 1, "flagged": false, "revealed": true, "row": 1});
  });
  test("Expect to checkWinner to return FALSE If there is no winner yet", () => {   
    mine.addBomb(1,1,board);
    expect(mine.checkWinner(size,board)).toBeFalsy();
  });
  test("Expect to return FALSE after Cell with bomb picked up", () => {   
    mine.addBomb(1,1,board);
    expect(mine.makeAMove(board[1][1],size,board)).toBeFalsy();
  });

  test("Expect to checkWinner to return false after Cell with bomb picked up", () => {   
    mine.addBomb(1,1,board);
    expect(mine.checkWinner(size,board)).toBeFalsy();
  });

  test("Expect to getRevealedCount to return correct number of revealed cells", () => {   
    mine.addBomb(1,1,board);
    expect(mine.getRevealedCount(size,board)).toBe(9);
  });
});

describe("US4 - Check if there is a winner ", () => {
  const board=mine.buildBoardCells(3);
  test("Expect to return TRUE when add bomb in the cell and reveal all the cells", () => {   
    expect(mine.addBomb(0,0,board)).toBeTruthy();
    mine.assignNumbersAroundBombs(0,0,3,board);
    expect(mine.makeAMove(board[0][1],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[0][2],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[1][0],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[1][1],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[1][2],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[2][0],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[2][1],3,board)).toBeTruthy();
    expect(mine.makeAMove(board[2][2],3,board)).toBeTruthy();
  });
  test("Expect to return TRUE when all revealed and there is no hit bomb", () => {   
    expect(mine.checkWinner(3,board)).toBeTruthy();
  });
  
});

describe("US5 - Check put flag works", () => {
  const size=4;
  const board=mine.buildBoardCells(size);
  
  test("Expect to return TRUE when add bomb in the cell", () => {   
    expect(mine.addBomb(0,0,board)).toBeTruthy();
    mine.assignNumbersAroundBombs(0,0,size,board);
  });
  test("Expect to return TRUE cell marked with Flag", () => {   
    expect(mine.flag(board[0][0])).toBeTruthy();
  });

  test("Expect to return Flagged after cell is marked with flag", () => {   
    expect(board[0][0]).toEqual({"bomb": true, "bombAround": 0, "col": 0, "flagged": true, "revealed": false, "row": 0});
  });

  test("Expect to return FALSE if try to mark with Flag already revealed cell", () => {   
    expect(mine.makeAMove(board[2][1],size,board)).toBeTruthy();
    expect(mine.flag(board[2][1])).toBeFalsy();
  });

  test("Expect to return F(Flagged) for flagged cell", () => {   
    expect(mine.returnCellView(board[0][0])).toBe("F");
  });
});

describe("BOT run  ", () => {
  test("BOT will play till game is over", () => {
    expect(mine.playAuto(5)).toBe("GAME OVER");
  });
});