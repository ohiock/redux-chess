import React from 'react';

import ChessBoard from './chessBoard/ChessBoard';
import Constants from '../util/constants';

const App = () => (
  <div>
    <ChessBoard
      squareColorOne={Constants.Board.Colors.SquareColorOne}
      squareColorTwo={Constants.Board.Colors.SquareColorTwo}
      borderColor={Constants.Board.Colors.BorderColor}
      squareCount={Constants.Board.SquareCount}
    />
  </div>
);

export default App;
