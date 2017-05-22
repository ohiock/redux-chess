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

  if (position[1] === 7) {
    return [];
  }

  if (position[0] !== 0) {
    const leftCapture = [position[0] - 1, position[1] + 1];

    if (Object.values(Constants.Pieces.PlayerTwo).includes(positions[leftCapture])) {
      validMoves.push(leftCapture);
    }
  }

  if (position[0] !== 7) {
    const rightCapture = [position[0] + 1, position[1] + 1];

    if (Object.values(Constants.Pieces.PlayerTwo).includes(positions[rightCapture])) {
      validMoves.push(rightCapture);
    }
  }

  const forwardOneCoordinates = [position[0], position[1] + 1];
  const forwardOnePiece = positions[forwardOneCoordinates];

  if (!forwardOnePiece) {
    validMoves.push(forwardOneCoordinates);
  }

  if (position[1] === 1) {
    const forwardTwoCoordinates = [position[0], position[1] + 2];
    const forwardTwoPiece = positions[forwardTwoCoordinates];

    if (!forwardOnePiece && !forwardTwoPiece) {
      validMoves.push(forwardTwoCoordinates);
    }
  }

  return validMoves;
};

export const getValidP2PawnMoves = (position, positions) => {
  const validMoves = [];

  if (position[1] === 0) {
    return [];
  }

  if (position[0] !== 0) {
    const leftCapture = [position[0] - 1, position[1] - 1];

    if (Object.values(Constants.Pieces.PlayerOne).includes(positions[leftCapture])) {
      validMoves.push(leftCapture);
    }
  }

  if (position[0] !== 7) {
    const rightCapture = [position[0] + 1, position[1] - 1];

    if (Object.values(Constants.Pieces.PlayerOne).includes(positions[rightCapture])) {
      validMoves.push(rightCapture);
    }
  }

  const forwardOneCoordinates = [position[0], position[1] - 1];
  const forwardOnePiece = positions[forwardOneCoordinates];

  if (!forwardOnePiece) {
    validMoves.push(forwardOneCoordinates);
  }

  if (position[1] === 6) {
    const forwardTwoCoordinates = [position[0], position[1] - 2];
    const forwardTwoPiece = positions[forwardTwoCoordinates];

    if (!forwardOnePiece && !forwardTwoPiece) {
      validMoves.push(forwardTwoCoordinates);
    }
  }

  return validMoves;
};

export const getValidP1RookMoves = (position, positions) => {

};

export const getValidP2RookMoves = (position, positions) => {

};

export const getValidMoves = (piece, position, positions) => {
  switch (piece) {
    case Constants.Pieces.PlayerOne.Pawn:
      return getValidP1PawnMoves(position, positions);
    case Constants.Pieces.PlayerTwo.Pawn:
      return getValidP2PawnMoves(position, positions);
    case Constants.Pices.PlayerOne.Rook:
      return getValidP1RookMoves(position, positions);
    case Constants.Pices.PlayerTwo.Rook:
      return getValidP2RookMoves(position, positions);
    default:
      return [];
  }
};
