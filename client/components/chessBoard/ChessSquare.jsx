import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import Constants from '../../util/constants';
import styles from './ChessSquare.scss';
import { moveChessPiece } from '../../actions/chessBoardActions';

const mapStateToProps = state => ({
  validMoves: state.chessBoard.validMoves
});

const mapDispatchToProps = dispatch => ({
  moveChessPiece: (currentPosition, nextPosition) => dispatch(moveChessPiece(currentPosition, nextPosition)),
});

const chessSquareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    props.moveChessPiece(item.position, props.position);

    return undefined;
  },
  canDrop(props) {
    return props.validMoves.includes(props.position);
  },
};

const collect = (dndConnect, monitor) => ({
  connectDropTarget: dndConnect.dropTarget(),
  isOver: monitor.isOver(),
});

@connect(mapStateToProps, mapDispatchToProps)
@DropTarget(Constants.DraggableItemTypes.ChessPiece, chessSquareTarget, collect)
export default class ChessSquare extends React.Component {
  static propTypes = {
    validMoves: PropTypes.array.isRequired, // eslint-disable-line
    position: PropTypes.string.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    children: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    children: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      styles: {},
    };
  }

  componentWillMount() {
    this.setState({ className: styles.container });
  }

  render() {
    return this.props.connectDropTarget(
      <div
        className={`${styles.container} ${this.props.validMoves.includes(this.props.position) ? styles['selected-piece'] : ''}`}
        style={{ backgroundColor: this.props.color }}
        onClick={this.selectPiece}
      >
        {this.props.children}
      </div>,
    );
  }
}
