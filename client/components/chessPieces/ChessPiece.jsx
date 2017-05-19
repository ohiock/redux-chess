import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import Constants from '../../util/constants';
import { markValidMoves } from '../../actions/chessBoardActions';

import styles from './ChessPiece.scss';

const mapDispatchToProps = dispatch => ({
  markValidMoves: (currentPiece, position) => dispatch(markValidMoves(currentPiece, position)),
});

const chessPieceSource = {
  beginDrag(props) {
    props.markValidMoves(props.currentPiece, props.position);

    return { position: props.position };
  },
};

@connect(null, mapDispatchToProps)
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
