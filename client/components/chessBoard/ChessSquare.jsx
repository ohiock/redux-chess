import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import Constants from '../../util/constants';
import styles from './ChessSquare.scss';
import { moveChessPiece } from '../../actions/chessBoardActions';

const mapStateToProps = state => ({
  validMoves: state.chessBoard.validMoves,
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
    return props.validMoves.filter(move => props.position[0] === move[0] && props.position[1] === move[1]).length > 0;
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
    position: PropTypes.array.isRequired, // eslint-disable-line
    connectDropTarget: PropTypes.func.isRequired,
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
    const isValidMove = this.props.validMoves.filter(move => this.props.position[0] === move[0] && this.props.position[1] === move[1]).length > 0;

    return this.props.connectDropTarget(
      <div
        className={`${styles.container} ${isValidMove ? styles['selected-piece'] : ''}`}
        style={{ backgroundColor: this.props.color }}
        onClick={this.selectPiece}
      >
        {this.props.children}
      </div>,
    );
  }
}
