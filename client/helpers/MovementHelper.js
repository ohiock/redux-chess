import Constants from '../util/constants';

export const getCoordinates = (position) => {
  const rawCoordinates = position.split('');

  return {
    x: Constants.Board.Files.indexOf(rawCoordinates[0]),
    y: Constants.Board.Ranks.indexOf(parseInt(rawCoordinates[1], 10)),
  };
};

export const containsRivalPiece = (isPlayerOne, position, positions) => {
  const piece = isPlayerOne
    ? Object.values(Constants.Pieces.PlayerTwo).includes(positions[position])
    : Object.values(Constants.Pieces.PlayerOne).includes(positions[position]);

  return piece;
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
  const isPlayerOne = Object.values(Constants.Pieces.PlayerOne).includes(positions[position]);

  // empty squares below current position
  const downPosition = [position[0], position[1] + 1];

  while (downPosition[1] <= 7 && (!positions[downPosition] || containsRivalPiece(isPlayerOne, downPosition, positions))) {
    validMoves.push([downPosition[0], downPosition[1]]);

    if (containsRivalPiece(isPlayerOne, downPosition, positions)) {
      break;
    }

    downPosition[1] += 1;
  }

  // empty squares above current position
  const upPosition = [position[0], position[1] - 1];
  while (upPosition[1] >= 0 && (!positions[upPosition] || containsRivalPiece(isPlayerOne, upPosition, positions))) {
    validMoves.push([upPosition[0], upPosition[1]]);

    if (containsRivalPiece(isPlayerOne, upPosition, positions)) {
      break;
    }

    upPosition[1] -= 1;
  }

  // empty squares to the right of current position
  const rightPosition = [position[0] + 1, position[1]];
  while (rightPosition[0] <= 7 && (!positions[rightPosition] || containsRivalPiece(isPlayerOne, rightPosition, positions))) {
    validMoves.push([rightPosition[0], rightPosition[1]]);

    if (containsRivalPiece(isPlayerOne, rightPosition, positions)) {
      break;
    }

    rightPosition[0] += 1;
  }

  // empty squares to the left of current position
  const leftPosition = [position[0] - 1, position[1]];
  while (leftPosition[0] >= 0 && (!positions[leftPosition] || containsRivalPiece(isPlayerOne, leftPosition, positions))) {
    validMoves.push([leftPosition[0], leftPosition[1]]);

    if (containsRivalPiece(isPlayerOne, leftPosition, positions)) {
      break;
    }

    leftPosition[0] -= 1;
  }

  return validMoves;
};

export const getValidKnightMoves = (position, positions) => {
  const validMoves = [];

  const upTwoLeftOne = [position[0] - 1, position[1] + 2];
  if (!positions[upTwoLeftOne]) {
    validMoves.push(upTwoLeftOne);
  }

  const upTwoRightOne = [position[0] + 1, position[1] + 2];
  if (!positions[upTwoRightOne]) {
    validMoves.push(upTwoRightOne);
  }

  const rightTwoUpOne = [position[0] + 2, position[1] + 1];
  if (!positions[rightTwoUpOne]) {
    validMoves.push(rightTwoUpOne);
  }

  const rightTwoDownOne = [position[0] + 2, position[1] - 1];
  if (!positions[rightTwoDownOne]) {
    validMoves.push(rightTwoDownOne);
  }

  const downTwoRightOne = [position[0] + 1, position[1] - 2];
  if (!positions[downTwoRightOne]) {
    validMoves.push(downTwoRightOne);
  }

  const downTwoLeftOne = [position[0] - 1, position[1] - 2];
  if (!positions[downTwoLeftOne]) {
    validMoves.push(downTwoLeftOne);
  }

  const leftTwoUpOne = [position[0] - 2, position[1] + 1];
  if (!positions[leftTwoUpOne]) {
    validMoves.push(leftTwoUpOne);
  }

  const leftTwoDownOne = [position[0] - 2, position[1] - 1];
  if (!positions[leftTwoDownOne]) {
    validMoves.push(leftTwoDownOne);
  }

  const upOneLeftTwo = [position[0] - 2, position[1] + 1];
  if (!positions[upOneLeftTwo]) {
    validMoves.push(upOneLeftTwo);
  }

  const upOneRightTwo = [position[0] + 2, position[1] + 1];
  if (!positions[upOneRightTwo]) {
    validMoves.push(upOneRightTwo);
  }

  const rightOneUpTwo = [position[0] + 1, position[1] + 2];
  if (!positions[rightOneUpTwo]) {
    validMoves.push(rightOneUpTwo);
  }

  const rightOneDownTwo = [position[0] + 1, position[1] - 2];
  if (!positions[rightOneDownTwo]) {
    validMoves.push(rightOneDownTwo);
  }

  const downOneRightTwo = [position[0] + 2, position[1] - 1];
  if (!positions[downOneRightTwo]) {
    validMoves.push(downOneRightTwo);
  }

  const downOneLeftTwo = [position[0] - 2, position[1] - 1];
  if (!positions[downOneLeftTwo]) {
    validMoves.push(downOneLeftTwo);
  }

  const leftOneUpTwo = [position[0] - 1, position[1] + 2];
  if (!positions[leftOneUpTwo]) {
    validMoves.push(leftOneUpTwo);
  }

  const leftOneDownTwo = [position[0] - 1, position[1] - 2];
  if (!positions[leftOneDownTwo]) {
    validMoves.push(leftOneDownTwo);
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
    case Constants.Pieces.PlayerOne.Knight:
    case Constants.Pieces.PlayerTwo.Knight:
      return getValidKnightMoves(position, positions);
    default:
      return [];
  }
};
