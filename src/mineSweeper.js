 
module.exports = {};
const Cell = require('./cell.js')
module.exports.init =function init(sizeOfBoard) {
   var board=this.buildBoardCells(sizeOfBoard);
   hitBomb = false;
   return board;
 };

 module.exports.buildBoardCells =function buildBoardCells(sizeOfBoard){
   var board = new Array(sizeOfBoard);
   for (var i = 0; i < board.length; i++) {
    board[i] = [];
   }
   for (var i = 0; i < sizeOfBoard; i++) {
      for (var j = 0; j < sizeOfBoard; j++) {
        board[i][j] = new Cell(i, j);
      }
  }
  return board;
 };

 module.exports.printBoard =function printBoard(sizeOfBoard,board) {
   midRow = `+${'-+'.repeat(sizeOfBoard)}\n`;
   var boardToPrint=midRow;
   for (var i = 0; i < sizeOfBoard; i++) {
     boardToPrint=boardToPrint+"|";
     for (var j = 0; j < sizeOfBoard; j++) {
       boardToPrint=boardToPrint+ this.returnCellView(board[i][j])+"|";;
     }
     boardToPrint=boardToPrint+"\n"+midRow;
   }
   console.log(boardToPrint);
   return true;
 }

 module.exports.returnCellView =function returnCellView(currentCell) {
   return " ";
 }