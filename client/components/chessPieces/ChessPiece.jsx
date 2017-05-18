import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import Constants from '../../util/constants';

import styles from './ChessPiece.scss';

const chessPieceSource = {
  beginDrag(props) {
    return { position: props.position };
  },
};

@DragSource(Constants.DraggableItemTypes.ChessPiece, chessPieceSource, (dndConnect, monitor) => ({
  connectDragSource: dndConnect.dragSource(),
  connectDragPreview: dndConnect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
export default class ChessPiece extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
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
      </div>
    );
  }
}
