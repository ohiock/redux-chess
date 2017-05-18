import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import Constants from '../../util/constants';
import styles from './ChessSquare.scss';
import { moveChessPiece } from '../../actions/chessBoardActions';

const mapDispatchToProps = dispatch => ({
  moveChessPiece: (currentPosition, nextPosition) => dispatch(moveChessPiece(currentPosition, nextPosition)),
});

const chessSquareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    props.moveChessPiece(item.position, props.position);

    return undefined;
  },
};

const collect = (dndConnect, monitor) => ({
  connectDropTarget: dndConnect.dropTarget(),
  isOver: monitor.isOver(),
});

@connect(null, mapDispatchToProps)
@DropTarget(Constants.DraggableItemTypes.ChessPiece, chessSquareTarget, collect)
export default class ChessSquare extends React.Component {
  static propTypes = {
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
    return this.props.connectDropTarget(
      <div className={this.state.className} style={{ backgroundColor: this.props.isOver ? 'blue' : this.props.color }} onClick={this.selectPiece}>
        {this.props.children}
      </div>,
    );
  }
}
