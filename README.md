# mineSweeper - Kader SOLAK

# Mine Sweeper-Game	
Rules:	You are presented with a board of squares. Some squares contain mines (bombs), others don't. If you stepon a square containing a bomb, you lose. If you manage to clearall the squares (without clicking on any bombs) you win.Clearinga square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. If you guess a square contains a bomb mark it with a flag.A squares "neighbours" are the squares adjacent above, below, left, right, and all 4 diagonals. Squares on the sides of the board or in a corner have fewer neighbors. The board does not wrap around the edges.If you cleara square with 0 neighboring bombs, all its neighbors will automatically open; recursively.The first square you open could be abomb.You don't have to mark all the bombs to win; you just need to open all non-bomb squares.

## TODO
TODO : mineSweeper

## Legend
- TODO
- IN PROGRESS
- DONE
## US1
As a player 
I want to see that the board for mine swapper game is imitialized with length that I want.
so that I can determine how hard will be the game. 

## UAT1
Given a non-negative integer
When this will describe the size of board
Then result should be the empty board

## US2
As a player 
I want to see that the bombs are initilized in a board. 
so that I can start to play. 

## UAT2
Given a non-negative integer
When putting bombs on board 
Then result should be bomb counts equal the size of board