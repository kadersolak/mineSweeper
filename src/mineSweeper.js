 
module.exports = {};
const Cell = require('./cell.js')
var hitBomb;
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
   var midRow = `+${'-+'.repeat(sizeOfBoard)}\n`;
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

 module.exports.getRevealedCount =function getRevealedCount(sizeOfBoard,board) {
   var revealedCount=0;
   for (var i = 0; i < sizeOfBoard; i++) {
     for (var j = 0; j < sizeOfBoard; j++) {
       if(board[i][j].revealed){ 
         revealedCount++;}
     }
   }
   return revealedCount;
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
 function checkHitTheBomb(currentCell) {
   if (currentCell.bomb && currentCell.revealed ) return false;
   return true;
 }
 module.exports.checkWinner =function checkWinner(sizeOfBoard,board) {
   var bombsAndRevealed=this.getRevealedCount(sizeOfBoard,board)+this.getBombsCount(sizeOfBoard,board);
   var boardElementCount=Math.imul(sizeOfBoard,sizeOfBoard);
   if(bombsAndRevealed===boardElementCount) {
     console.log("----- I cant belive you really did it -----");
     return true;
   }
   else return false;
 };

 module.exports.makeAMove =function makeAMove(currentCell, sizeOfBoard,board) {
   this.reveal(currentCell);
   var retVal=true;
   if(!checkHitTheBomb(currentCell)) {
     hitBomb=true;
     console.log("BOOOM.... You hit the bomb DUDE ");
     retVal=false;
   }else{
     if(currentCell.bombAround===0) 
       this.showCellsAround(currentCell.row,currentCell.col,sizeOfBoard,board);
   }
   this.printBoard(sizeOfBoard,board);
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

 module.exports.flag =function flag(currentCell) {
   if (!currentCell.revealed) {
       currentCell.flagged = !currentCell.flagged;
       return currentCell.flagged;
   }
 }
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

module.exports.playAuto =function playAuto(sizeOfBoard) {
   var board=this.init(sizeOfBoard);
   this.addAllBombs(sizeOfBoard,board);
   this.printBoard();
   console.log("Bot play mode activated");
   while ( !hitBomb && !this.checkWinner(sizeOfBoard,board)) {
     var currentCell=getRandomCell(sizeOfBoard,board);
     var row=currentCell.row+1;
     var col=currentCell.col+1;
     console.log("Bot move row: "+row+" column:"+col);
     this.makeAMove(currentCell,sizeOfBoard,board);
   }
   return "GAME OVER"
 };
 
 
 function getRandomCell(sizeOfBoard,board){
   var row = getRandomInt(sizeOfBoard);
   var col = getRandomInt(sizeOfBoard);
   var checkRevealed=true;
   while(checkRevealed){
      row = getRandomInt(sizeOfBoard);
      col = getRandomInt(sizeOfBoard);
      currentCell=board[row][col];
      checkRevealed=currentCell.revealed;
   }
  return currentCell;
 };