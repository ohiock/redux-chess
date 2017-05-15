import React from 'react';
import PropTypes from 'prop-types';

import Constants from '../../util/constants';

import styles from './ChessPiece.scss';

const propTypes = {
  currentPiece: PropTypes.number,
};

const defaultProps = {
  currentPiece: undefined,
};

class ChessPiece extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      piece: undefined,
    };
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.currentPiece}
      </div>
    );
  }
}

ChessPiece.propTypes = propTypes;
ChessPiece.defaultProps = defaultProps;

export default ChessPiece;
