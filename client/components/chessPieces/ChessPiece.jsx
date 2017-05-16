import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import Constants from '../../util/constants';

import styles from './ChessPiece.scss';

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  currentPiece: PropTypes.number,
};

const defaultProps = {
  currentPiece: undefined,
};

const chessPieceSource = {
  beginDrag(props) {
    return {};
  },
};

@DragSource(Constants.DraggableItemTypes.ChessPiece, chessPieceSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
class ChessPiece extends React.Component {
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

ChessPiece.propTypes = propTypes;
ChessPiece.defaultProps = defaultProps;

export default ChessPiece;
