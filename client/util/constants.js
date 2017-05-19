const Constants = {
  Board: {
    Files: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ],
    Ranks: [
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
    ],
    Colors: {
      SquareColorOne: '#AA5439',
      SquareColorTwo: '#28536C',
      BorderColor: '#28536C',
    },
    SquareCount: 64,
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
