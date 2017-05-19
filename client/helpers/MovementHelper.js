import Constants from '../util/constants';

export const getCoordinates = (position) => {
  const rawCoordinates = position.split('');

  return {
    x: Constants.Board.Files.indexOf(rawCoordinates[0]),
    y: Constants.Board.Ranks.indexOf(parseInt(rawCoordinates[1], 10)),
  };
};

export const getValidP1PawnMoves = (position) => {
  const coordinates = getCoordinates(position);

  if (coordinates.y === 1) {
    return [
      `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y + 1].toString()}`,
      `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y + 2].toString()}`,
    ];
  }

  return [
    `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y + 1].toString()}`,
  ];
};

export const getValidMoves = (piece, position) => {
  switch (piece) {
    case Constants.Pieces.PlayerOne.Pawn:
      return getValidP1PawnMoves(position);
    case Constants.Pieces.PlayerTwo.Pawn:
    default:
      return [];
  }
};
