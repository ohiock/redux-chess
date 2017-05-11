import React from 'react';
import PropTypes from 'prop-types';

import Constants from '../../util/constants';

import styles from './ChessPiece.scss';

const propTypes = {
  currentPiece: PropTypes.number,
};

const defaultProps = {
  currentPiece: undefined,
};

class ChessPiece extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      piece: undefined,
    };
  }

  componentWillMount() {
    this.getPiece(this.props.currentPiece);
  }

  getPiece(currentPiece) {
    switch (currentPiece) {
      case Constants.Pieces.PlayerOne.Pawn:
        this.setState({ piece: '♟' });
        break;
      case Constants.Pieces.PlayerTwo.Pawn:
        this.setState({ piece: '♙' });
        break;
      case Constants.Pieces.PlayerOne.Knight:
        this.setState({ piece: '♞' });
        break;
      case Constants.Pieces.PlayerTwo.Knight:
        this.setState({ piece: '♘' });
        break;
      case Constants.Pieces.PlayerOne.Bishop:
        this.setState({ piece: '♝' });
        break;
      case Constants.Pieces.PlayerTwo.Bishop:
        this.setState({ piece: '♗' });
        break;
      case Constants.Pieces.PlayerOne.Rook:
        this.setState({ piece: '♜' });
        break;
      case Constants.Pieces.PlayerTwo.Rook:
        this.setState({ piece: '♖' });
        break;
      case Constants.Pieces.PlayerOne.Queen:
        this.setState({ piece: '♛' });
        break;
      case Constants.Pieces.PlayerTwo.Queen:
        this.setState({ piece: '♕' });
        break;
      case Constants.Pieces.PlayerOne.King:
        this.setState({ piece: '♚' });
        break;
      case Constants.Pieces.PlayerTwo.King:
        this.setState({ piece: '♔' });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.state.piece}
      </div>
    );
  }
}

ChessPiece.propTypes = propTypes;
ChessPiece.defaultProps = defaultProps;

export default ChessPiece;
