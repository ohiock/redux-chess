import React from 'react';
import PropTypes from 'prop-types';

import ChessSquare from './ChessSquare';

const propTypes = {
  colorOne: PropTypes.string.isRequired,
  colorTwo: PropTypes.string.isRequired,
  squareCount: PropTypes.number.isRequired,
};

class ChessBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: [],
    };
  }

  componentWillMount() {
    this.getSquares();
  }

  getSquares() {
    const squares = [];

    for (let i = 0; i < this.props.squareCount; i += 1) {
      const color = i % 2 === 0 ? this.props.colorOne : this.props.colorTwo;

      squares.push(<ChessSquare key={i} color={color} />);
    }

    this.setState({ squares });
  }

  render() {
    return (
      <div id="ChessBoard">
        {this.state.squares.map(square => square)}
      </div>
    );
  }
}

ChessBoard.propTypes = propTypes;

export default ChessBoard;
