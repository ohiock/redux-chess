import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import Constants from '../../util/constants';
import { markValidMoves, clearValidMoves, nextTurn } from '../../actions/chessBoardActions';

import styles from './ChessPiece.scss';

const mapStateToProps = state => ({
  currentTurn: state.chessBoard.currentTurn,
  positions: state.chessBoard.positions,
});

const mapDispatchToProps = dispatch => ({
  markValidMoves: (currentPiece, position, positions) => dispatch(markValidMoves(currentPiece, position, positions)),
  clearValidMoves: () => dispatch(clearValidMoves()),
  nextTurn: currentTurn => dispatch(nextTurn(currentTurn)),
});

const chessPieceSource = {
  canDrag(props) {
    const playerOneTurn = props.currentTurn === 1;
    const playerOnePiece = Object.values(Constants.Pieces.PlayerOne).includes(props.currentPiece);

    if (playerOneTurn && playerOnePiece) {
      return true;
    } else if (!playerOneTurn && !playerOnePiece) {
      return true;
    }

    return false;
  },
  beginDrag(props) {
    props.markValidMoves(props.currentPiece, props.position, props.positions);

    return { position: props.position };
  },
  endDrag(props) {
    props.clearValidMoves();
    props.nextTurn(props.currentTurn);
  },
};

@connect(mapStateToProps, mapDispatchToProps)
@DragSource(Constants.DraggableItemTypes.ChessPiece, chessPieceSource, (dndConnect, monitor) => ({
  connectDragSource: dndConnect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class ChessPiece extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    currentPiece: PropTypes.string,
  };

  static defaultProps = {
    currentPiece: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      piece: undefined,
    };
  }

  render() {
    return this.props.connectDragSource(
      <div className={styles.container}>
        {this.props.currentPiece}
      </div>,
    );
  }
}
