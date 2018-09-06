import React, { Component } from 'react';
import Board from '../Board/Board';

class Game extends Component {
  lines = [];

  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(null),
      count: 3,
      rowToWin: 3
    };
  }

  render() {
    let status;
    if (this.checkWin) {
      status = `Winner is: ${this.checkWin.winner}`;
            
    } else {      
      status = `Next player: ${(this.state.xIsNext) ? "X" : "O"}`;
    }

    let rows = [
      {title: 'classic', number: 3},
      {title: 'medium', number: 9},
      {title: 'hard', number: 15},
    ];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
            count={this.state.count}
            winningLine={(this.checkWin) ? this.checkWin.line: false}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br />
          <div>
            <button onClick={this.startAgain}>Start again</button>
          </div>
          <br />
          <div>Choose number of rows</div>
          <div>
            {rows.map(
              i => <div style={{display: 'inline-block', marginRight: '10px'}} key={i.number} >
                <input type="radio" value={i.number} checked={this.state.count === i.number} onChange={this.changeRows} />{i.title}
              </div>
            )}
          </div>
          <br />
          <div>Get {this.state.rowToWin} in row to win !</div>
        </div>
      </div>
    );
  }

  handleClick(i) {
    if (this.state.squares[i] || this.checkWin) {
      return;
    }
    let squares = this.state.squares.slice();
    squares[i] = (this.state.xIsNext) ? 'x' : 'o';
    this.checkWin = this.checkWinner(i, squares, this.state.rowToWin, this.state.count);
    this.setState({
      xIsNext: !this.state.xIsNext,
      squares: squares
    });
  }

  startAgain = () => {
    this.checkWin = false;
    this.setState({
      xIsNext: true,
      squares: Array(Math.pow(this.state.count, 2)).fill(null),
    });
  }

  changeRows = (event) => {
    this.checkWin = false;
    let rowToWin;
    switch(+event.currentTarget.value) {
      case 3:
      rowToWin = 3; break;
      case 9:
      rowToWin = 4; break;
      case 15:
      rowToWin = 5; break;
      default:
      rowToWin = 3;
    }
    this.setState({
      xIsNext: true,
      squares: Array(Math.pow(+event.currentTarget.value, 2)).fill(null),
      count: +event.currentTarget.value,
      rowToWin: rowToWin
    });
  }

  checkLine(start, end, step, currentNumber, squares, rowToWin) {
    let countToWin = 0;
    let winNumbers = [];
    for (let i = start; i <= end; i=i+step) {
      if (squares[i] && squares[i] === squares[currentNumber]) {
        countToWin++;
        winNumbers.push(i);
      } else {
        countToWin = 0;
        winNumbers = [];
      }
      if (countToWin === rowToWin) {
        return {line: {numbers: winNumbers}, winner: squares[currentNumber]};
      }
    }
    return false;
  }

  checkWinner(currentNumber, squares, rowToWin, row) {
    //count row number
    let rowNumber = Math.floor(currentNumber/row);
    //count column number
    let columnNumber = currentNumber-rowNumber*row;
    let startDiagonalTopLeft;
    let startDiagonalTopRight;

    //check horizontal
    let horizontalCheck = this.checkLine(rowNumber*row, row*rowNumber+row-1, 1, currentNumber, squares, rowToWin);
    if (horizontalCheck) {
      horizontalCheck.line.type = 'horizontal';
      return horizontalCheck;
    }

    //check vertical
    let verticalCheck = this.checkLine(columnNumber, row*row+columnNumber, row, currentNumber, squares, rowToWin);
    if (verticalCheck) {
      verticalCheck.line.type = 'vertical';
      return verticalCheck;
    }

    //check diagonal-top-left
    if (columnNumber>rowNumber) {
      startDiagonalTopLeft = columnNumber - rowNumber;
    } else {
      startDiagonalTopLeft = (rowNumber - columnNumber) * row;
    }

    let diagonalTopLeftCheck = this.checkLine(startDiagonalTopLeft, row*row-1, row+1, currentNumber, squares, rowToWin);
    if (diagonalTopLeftCheck) {
      diagonalTopLeftCheck.line.type = 'diagonal-top-left';
      return diagonalTopLeftCheck;
    }

    //check diagonal-top-right
    if ((columnNumber + rowNumber) < row) {
      startDiagonalTopRight = columnNumber + rowNumber;
    } else {
      startDiagonalTopRight = (columnNumber + rowNumber - (row - 1)) * row + row - 1;
    }
    let diagonalTopRightCheck = this.checkLine(startDiagonalTopRight, row*row-1, row-1, currentNumber, squares, rowToWin);
    if (diagonalTopRightCheck) {
      diagonalTopRightCheck.line.type = 'diagonal-top-right';
      return diagonalTopRightCheck;
    }

    return false;
  }
}

export default Game;
