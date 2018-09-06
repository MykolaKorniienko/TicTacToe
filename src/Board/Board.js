import React, { Component } from 'react';
import Square from '../Square/Square';

class Board extends Component {

    renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            key={i}
            count={i}
            endgame={!!this.props.winningLine}
            winType={(this.props.winningLine && this.props.winningLine.numbers.includes(i) ) ? this.props.winningLine.type : null}
          />
        );
      }

    render() {
        let lines = [];
        for (let i = 0; i < this.props.count; i++) {
            lines.push(i);
        }
        let key = -1;
        return (
        <div>
            {lines.map(i =>  {
                return (
                <div className="board-row" key={i}>
                    {lines.map(j => { key++; return this.renderSquare(key) })}
                </div>
                )
            })}
        </div>
        );
    }
}

export default Board;
