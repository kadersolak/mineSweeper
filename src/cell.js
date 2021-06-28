class  Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.bomb = false;
        this.revealed = false;
        this.flagged = false;
        this.bombAround=0;
    }  
}
module.exports = Cell