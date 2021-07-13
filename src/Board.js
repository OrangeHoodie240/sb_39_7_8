import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i = 0; i < nrows; i++){
      let row = [];
      for(let j = 0; j < ncols; j++){
        row.push(startsOn());
      }
      initialBoard.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function startsOn(){
    let n = Math.random(); 
    if(n <= chanceLightStartsOn){
      return true;
    }
    else return false;
  }

  function hasWon() {
    for(let row of board){
      for(let col of row){
        if(col){
          return false;
        }
      }
    }
    return true; 
  }


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = [];
      for(let i = 0; i < nrows; i++){
        let row = []; 
        for(let j = 0; j < ncols; j++){
          row.push(board[i][j]);
        }
        newBoard.push(row);
      }

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,newBoard);
      flipCell(y + 1, x, newBoard); 
      flipCell(y-1, x, newBoard); 
      flipCell(y, x + 1, newBoard); 
      flipCell(y, x-1, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if(hasWon()){
    return <h2>You win</h2>;
  }

  // make table board

    

  // TODO
  let tableBody = board.map((row, i) => {
    return <tr>{ row.map((col, j) => <Cell isLit={col} flipCellsAroundMe={()=>flipCellsAround(`${i}-${j}`)} />) }</tr>
  });

  return <table>{ tableBody }</table>;
}

export default Board;
