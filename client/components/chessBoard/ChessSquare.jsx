import React from 'react';
import PropTypes from 'prop-types';

import styles from './ChessSquare.scss';

const propTypes = {
  color: PropTypes.string.isRequired,
};

class ChessSquare extends React.Component {
  render() {
    return (
      <div className={styles.Container} style={{ background: this.props.color }} />
    );
  }
}

ChessSquare.propTypes = propTypes;

export default ChessSquare;
