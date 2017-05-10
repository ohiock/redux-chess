import React from 'react';

import ChessBoard from './chessBoard/ChessBoard';
import Constants from '../util/constants';

const App = () => (
  <div>
    <ChessBoard
      colorOne={Constants.Board.Colors.ColorOne}
      colorTwo={Constants.Board.Colors.ColorTwo}
      squareCount={Constants.Board.SquareCount}
    />
  </div>
);

export default App;
