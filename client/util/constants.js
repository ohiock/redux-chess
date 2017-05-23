const Constants = {
  Board: {
    Colors: {
      SquareColorOne: '#AA5439',
      SquareColorTwo: '#28536C',
      BorderColor: '#28536C',
    },
    SquareCount: 64,
  },
  Players: {
    PlayerOne: 1,
    PlayerTwo: 2,
  },
  Pieces: {
    PlayerOne: {
      Pawn: '♟',
      Knight: '♞',
      Bishop: '♝',
      Rook: '♜',
      Queen: '♛',
      King: '♚',
    },
    PlayerTwo: {
      Pawn: '♙',
      Knight: '♘',
      Bishop: '♗',
      Rook: '♖',
      Queen: '♕',
      King: '♔',
    },
  },
  DraggableItemTypes: {
    ChessPiece: 'ChessPiece',
  },
};

export default Constants;
