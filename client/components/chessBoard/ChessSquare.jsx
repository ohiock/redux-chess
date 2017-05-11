import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChessPiece from '../chessPieces/ChessPiece';
import styles from './ChessSquare.scss';

const propTypes = {
  color: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  chessBoard: PropTypes.object.isRequired,
};

class ChessSquare extends React.Component {
  render() {
    return (
      <div className={styles.Container} style={{ background: this.props.color }}>
        <ChessPiece currentPiece={this.props.chessBoard.positions[this.props.position]} />
      </div>
    );
  }
}

ChessSquare.propTypes = propTypes;

const mapStateToProps = state => ({
  chessBoard: state.chessBoard,
});

export default connect(mapStateToProps, null)(ChessSquare);
