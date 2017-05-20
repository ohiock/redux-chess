import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import Constants from '../../util/constants';
import { markValidMoves, clearValidMoves } from '../../actions/chessBoardActions';

import styles from './ChessPiece.scss';

const mapStateToProps = state => ({
  positions: state.chessBoard.positions,
});

const mapDispatchToProps = dispatch => ({
  markValidMoves: (currentPiece, position, positions) => dispatch(markValidMoves(currentPiece, position, positions)),
  clearValidMoves: () => dispatch(clearValidMoves()),
});

const chessPieceSource = {
  beginDrag(props) {
    console.log(props.positions);
    props.markValidMoves(props.currentPiece, props.position, props.positions);

    return { position: props.position };
  },
  endDrag(props) {
    props.clearValidMoves();
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
