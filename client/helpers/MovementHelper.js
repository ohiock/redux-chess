import Constants from '../util/constants';

export const getCoordinates = (position) => {
  const rawCoordinates = position.split('');

  return {
    x: Constants.Board.Files.indexOf(rawCoordinates[0]),
    y: Constants.Board.Ranks.indexOf(parseInt(rawCoordinates[1], 10)),
  };
};

export const getValidP1PawnMoves = (position, positions) => {
  const validMoves = [];
  const coordinates = getCoordinates(position);

  const leftCapture = `${Constants.Board.Files[coordinates.x - 1].toString()}${Constants.Board.Ranks[coordinates.y + 1].toString()}`;
  const rightCapture = `${Constants.Board.Files[coordinates.x + 1].toString()}${Constants.Board.Ranks[coordinates.y + 1].toString()}`;

  if (Object.values(Constants.Pieces.PlayerTwo).includes(positions[leftCapture])) {
    validMoves.push(leftCapture);
  }

  if (Object.values(Constants.Pieces.PlayerTwo).includes(positions[rightCapture])) {
    validMoves.push(rightCapture);
  }

  const forwardOneCoordinates = `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y + 1].toString()}`;
  const forwardTwoCoordinates = `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y + 2].toString()}`;

  const forwardOnePiece = positions[forwardOneCoordinates];
  const forwardTwoPiece = positions[forwardTwoCoordinates];

  if (!forwardOnePiece) {
    validMoves.push(forwardOneCoordinates);
  }

  if (coordinates.y === 1) {
    if (!forwardOnePiece && !forwardTwoPiece) {
      validMoves.push(forwardTwoCoordinates);
    }
  }

  return validMoves;
};

export const getValidP2PawnMoves = (position, positions) => {
  const validMoves = [];
  const coordinates = getCoordinates(position);

  const leftCapture = `${Constants.Board.Files[coordinates.x - 1].toString()}${Constants.Board.Ranks[coordinates.y - 1].toString()}`;
  const rightCapture = `${Constants.Board.Files[coordinates.x + 1].toString()}${Constants.Board.Ranks[coordinates.y - 1].toString()}`;

  if (Object.values(Constants.Pieces.PlayerOne).includes(positions[leftCapture])) {
    validMoves.push(leftCapture);
  }

  if (Object.values(Constants.Pieces.PlayerOne).includes(positions[rightCapture])) {
    validMoves.push(rightCapture);
  }

  const forwardOneCoordinates = `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y - 1].toString()}`;
  const forwardTwoCoordinates = `${Constants.Board.Files[coordinates.x].toString()}${Constants.Board.Ranks[coordinates.y - 2].toString()}`;

  const forwardOnePiece = positions[forwardOneCoordinates];
  const forwardTwoPiece = positions[forwardTwoCoordinates];

  if (!forwardOnePiece) {
    validMoves.push(forwardOneCoordinates);
  }

  if (coordinates.y === 6) {
    if (!forwardOnePiece && !forwardTwoPiece) {
      validMoves.push(forwardTwoCoordinates);
    }
  }

  return validMoves;
};

export const getValidMoves = (piece, position, positions) => {
  switch (piece) {
    case Constants.Pieces.PlayerOne.Pawn:
      return getValidP1PawnMoves(position, positions);
    case Constants.Pieces.PlayerTwo.Pawn:
      return getValidP2PawnMoves(position, positions);
    default:
      return [];
  }
};
