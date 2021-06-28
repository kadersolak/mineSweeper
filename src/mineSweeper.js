 
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

 module.exports.reveal =function reveal(currentCell) {
   currentCell.revealed = true;
 }
 function maxVal(first,second){
   if(first>=second) return first;
   else return second;
 }
 function minVal(first,second){
  if(first<=second) return first;
  else return second;
 }

 function getRandomInt(sizeOfBoard) {
   return Math.floor(Math.random() * sizeOfBoard);
 }
 module.exports.getBombsCount =function getBombsCount(sizeOfBoard,board) {
   var bombCount=0;
   for (var i = 0; i < sizeOfBoard; i++) {
     for (var j = 0; j < sizeOfBoard; j++) {
       if(board[i][j].bomb) bombCount++;
     }
   }
   return bombCount;
 }
 module.exports.returnCellView =function returnCellView(currentCell) {
   var retVal=" ";
  if(currentCell.flagged) 
    retVal="F";
  else if(currentCell.revealed){
    if(currentCell.bomb) {
      retVal="B";
    }
    else {
      retVal=currentCell.bombAround; 
    }
  }
  return retVal;
 }

 module.exports.assignNumbersAroundBombs =function assignNumbersAroundBombs(i, j, sizeOfBoard, board) {
   for(var row = maxVal(0, i-1); row <= minVal(i+1, sizeOfBoard-1); row++){
     for(var col = maxVal(0, j-1); col <= minVal(j+1, sizeOfBoard-1); col++){
       if(row != i || col != j){
         board[row][col].bombAround++;
       }
     }
   }
   return true;
 };
 module.exports.showCellsAround =function showCellsAround(i, j, sizeOfBoard, board) {
   for(var row = maxVal(0, i-1); row <= minVal(i+1, sizeOfBoard-1); row++){
     for(var col = maxVal(0, j-1); col <= minVal(j+1, sizeOfBoard-1); col++){
       if(row != i || col != j){
         this.reveal(board[row][col]);
       }
     }
   }
 };

 module.exports.addAllBombs =function addAllBombs(sizeOfBoard,board) {
   var totalBombs = sizeOfBoard;
   while (totalBombs !== 0) {
     var row = getRandomInt(sizeOfBoard);
     var col = getRandomInt(sizeOfBoard);
     if (this.addBomb(row,col,board)){
        this.assignNumbersAroundBombs(row,col,sizeOfBoard,board);
        totalBombs -= 1;
     }
   }
   return true;
 };

 module.exports.addBomb =function addBomb(row,col,board){
  var currentCell = board[row][col];
  if (!currentCell.bomb){
    currentCell.bomb = true;
    return true;
  }
  else return false;
};