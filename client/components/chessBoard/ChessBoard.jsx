import React from 'react';
import PropTypes from 'prop-types';

import ChessSquare from './ChessSquare';

import styles from './ChessBoard.scss';

const propTypes = {
  squareColorOne: PropTypes.string.isRequired,
  squareColorTwo: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
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
    let rowCount = 0;

    for (let i = 0; i < this.props.squareCount; i += 1) {
      let color;

      if (i % 8 === 0) {
        rowCount += 1;
      }

      if (rowCount % 2 === 0) {
        color = i % 2 === 0
          ? this.props.squareColorTwo
          : this.props.squareColorOne;
      } else {
        color = i % 2 === 0
          ? this.props.squareColorOne
          : this.props.squareColorTwo;
      }

      squares.push(<ChessSquare key={i} color={color} />);
    }

    this.setState({ squares });
  }

  render() {
    return (
      <div id={styles.Container} style={{ backgroundColor: this.props.borderColor }}>
        {this.state.squares.map(square => square)}
      </div>
    );
  }
}

ChessBoard.propTypes = propTypes;

export default ChessBoard;
