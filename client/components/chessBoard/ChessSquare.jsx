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

const mapStateToProps = state => ({
  chessBoard: state.chessBoard,
});

@connect(mapStateToProps, null)
export default class ChessSquare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {},
      pieceSelected: false,
    };

    this.selectPiece = this.selectPiece.bind(this);
  }

  componentWillMount() {
    this.setState({ className: styles.container });
  }

  selectPiece() {
    this.setState({
      className: `${styles.container} ${!this.state.pieceSelected ? styles['selected-piece'] : ''}`,
      pieceSelected: !this.state.pieceSelected,
    });
  }

  render() {
    return (
      <div className={this.state.className} style={{ backgroundColor: this.props.color }} onClick={this.selectPiece}>
        <ChessPiece currentPiece={this.props.chessBoard.positions[this.props.position]} />
      </div>
    );
  }
}

ChessSquare.propTypes = propTypes;
