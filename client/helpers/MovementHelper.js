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
    return validMoves;
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
    return validMoves;
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

export const getValidRookMoves = (position, positions) => {
  const validMoves = [];

  // empty squares below current position
  const downPosition = [position[0], position[1] + 1];

  while (downPosition[1] <= 7 && !positions[downPosition]) {
    validMoves.push([downPosition[0], downPosition[1]]);

    downPosition[1] += 1;
  }

  // empty squares above current position
  const upPosition = [position[0], position[1] - 1];

  while (upPosition[1] >= 0 && !positions[upPosition]) {
    validMoves.push([upPosition[0], upPosition[1]]);

    upPosition[1] -= 1;
  }

  // empty squares to the right of current position
  const rightPosition = [position[0] + 1, position[1]];

  while (rightPosition[0] <= 7 && !positions[rightPosition]) {
    validMoves.push([rightPosition[0], rightPosition[1]]);

    rightPosition[0] += 1;
  }

  // empty squares to the left of current position
  const leftPosition = [position[0] - 1, position[1]];

  while (leftPosition[0] >= 0 && !positions[leftPosition]) {
    validMoves.push([leftPosition[0], leftPosition[1]]);

    leftPosition[0] -= 1;
  }

  return validMoves;
};

export const getValidMoves = (piece, position, positions) => {
  switch (piece) {
    case Constants.Pieces.PlayerOne.Pawn:
      return getValidP1PawnMoves(position, positions);
    case Constants.Pieces.PlayerTwo.Pawn:
      return getValidP2PawnMoves(position, positions);
    case Constants.Pieces.PlayerOne.Rook:
    case Constants.Pieces.PlayerTwo.Rook:
      return getValidRookMoves(position, positions);
    default:
      return [];
  }
};
