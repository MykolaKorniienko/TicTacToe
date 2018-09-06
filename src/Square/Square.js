import React, { Component } from 'react';

class Square extends Component {
  state = {
    value: null,
  };

  render() {
    return (
      <button className={`square ${this.props.winType? this.props.winType : ''} ${this.props.endgame? 'square-endgame' : ''}`} onClick={() => this.props.onClick()} >
          {this.props.value}
      </button>
    );
  }
}

export default Square;
