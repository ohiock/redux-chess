import Constants from '../util/constants';

export const getPlayer = (piece) => {
  const player = Object.values(Constants.Pieces.PlayerOne).includes(piece)
    ? Constants.Players.PlayerOne
    : Constants.Players.PlayerTwo;

  return player;
};

export const containsRivalPiece = (player, position, positions) => {
  const piece = player === Constants.Players.PlayerOne
    ? Object.values(Constants.Pieces.PlayerTwo).includes(positions[position])
    : Object.values(Constants.Pieces.PlayerOne).includes(positions[position]);

  return piece;
};

export const isValidPosition = (position) => {
  const isValid = position[0] >= 0
    && position[0] <= 7
    && position[1] >= 0
    && position[1] <= 7;

  return isValid;
};

export const getValidP1PawnMoves = (position, positions) => {
  const validMoves = [];

  if (position[1] === 7) {
    return validMoves;
  }

  if (position[0] !== 0) {
    const leftCapture = [position[0] - 1, position[1] + 1];

    if (containsRivalPiece(Constants.Players.PlayerOne, leftCapture, positions)) {
      validMoves.push(leftCapture);
    }
  }

  if (position[0] !== 7) {
    const rightCapture = [position[0] + 1, position[1] + 1];

    if (containsRivalPiece(Constants.Players.PlayerOne, rightCapture, positions)) {
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

    if (containsRivalPiece(Constants.Players.PlayerTwo, leftCapture, positions)) {
      validMoves.push(leftCapture);
    }
  }

  if (position[0] !== 7) {
    const rightCapture = [position[0] + 1, position[1] - 1];

    if (containsRivalPiece(Constants.Players.PlayerTwo, rightCapture, positions)) {
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
  const player = getPlayer(positions[position]);

  // empty squares below current position
  const downPosition = [position[0], position[1] + 1];

  while (downPosition[1] <= 7 && (!positions[downPosition] || containsRivalPiece(player, downPosition, positions))) {
    validMoves.push([downPosition[0], downPosition[1]]);

    if (containsRivalPiece(player, downPosition, positions)) {
      break;
    }

    downPosition[1] += 1;
  }

  // empty squares above current position
  const upPosition = [position[0], position[1] - 1];
  while (upPosition[1] >= 0 && (!positions[upPosition] || containsRivalPiece(player, upPosition, positions))) {
    validMoves.push([upPosition[0], upPosition[1]]);

    if (containsRivalPiece(player, upPosition, positions)) {
      break;
    }

    upPosition[1] -= 1;
  }

  // empty squares to the right of current position
  const rightPosition = [position[0] + 1, position[1]];
  while (rightPosition[0] <= 7 && (!positions[rightPosition] || containsRivalPiece(player, rightPosition, positions))) {
    validMoves.push([rightPosition[0], rightPosition[1]]);

    if (containsRivalPiece(player, rightPosition, positions)) {
      break;
    }

    rightPosition[0] += 1;
  }

  // empty squares to the left of current position
  const leftPosition = [position[0] - 1, position[1]];
  while (leftPosition[0] >= 0 && (!positions[leftPosition] || containsRivalPiece(player, leftPosition, positions))) {
    validMoves.push([leftPosition[0], leftPosition[1]]);

    if (containsRivalPiece(player, leftPosition, positions)) {
      break;
    }

    leftPosition[0] -= 1;
  }

  return validMoves;
};

export const getValidKnightMoves = (position, positions) => {
  const validMoves = [];
  const player = getPlayer(positions[position]);

  const upTwoLeftOne = [position[0] - 1, position[1] + 2];
  if (!positions[upTwoLeftOne] || containsRivalPiece(player, upTwoLeftOne, positions)) {
    validMoves.push(upTwoLeftOne);
  }

  const upTwoRightOne = [position[0] + 1, position[1] + 2];
  if (!positions[upTwoRightOne] || containsRivalPiece(player, upTwoRightOne, positions)) {
    validMoves.push(upTwoRightOne);
  }

  const rightTwoUpOne = [position[0] + 2, position[1] + 1];
  if (!positions[rightTwoUpOne] || containsRivalPiece(player, rightTwoUpOne, positions)) {
    validMoves.push(rightTwoUpOne);
  }

  const rightTwoDownOne = [position[0] + 2, position[1] - 1];
  if (!positions[rightTwoDownOne] || containsRivalPiece(player, rightTwoDownOne, positions)) {
    validMoves.push(rightTwoDownOne);
  }

  const downTwoRightOne = [position[0] + 1, position[1] - 2];
  if (!positions[downTwoRightOne] || containsRivalPiece(player, downTwoRightOne, positions)) {
    validMoves.push(downTwoRightOne);
  }

  const downTwoLeftOne = [position[0] - 1, position[1] - 2];
  if (!positions[downTwoLeftOne] || containsRivalPiece(player, downTwoLeftOne, positions)) {
    validMoves.push(downTwoLeftOne);
  }

  const leftTwoUpOne = [position[0] - 2, position[1] + 1];
  if (!positions[leftTwoUpOne] || containsRivalPiece(player, leftTwoUpOne, positions)) {
    validMoves.push(leftTwoUpOne);
  }

  const leftTwoDownOne = [position[0] - 2, position[1] - 1];
  if (!positions[leftTwoDownOne] || containsRivalPiece(player, leftTwoDownOne, positions)) {
    validMoves.push(leftTwoDownOne);
  }

  const upOneLeftTwo = [position[0] - 2, position[1] + 1];
  if (!positions[upOneLeftTwo] || containsRivalPiece(player, upOneLeftTwo, positions)) {
    validMoves.push(upOneLeftTwo);
  }

  const upOneRightTwo = [position[0] + 2, position[1] + 1];
  if (!positions[upOneRightTwo] || containsRivalPiece(player, upOneRightTwo, positions)) {
    validMoves.push(upOneRightTwo);
  }

  const rightOneUpTwo = [position[0] + 1, position[1] + 2];
  if (!positions[rightOneUpTwo] || containsRivalPiece(player, rightOneUpTwo, positions)) {
    validMoves.push(rightOneUpTwo);
  }

  const rightOneDownTwo = [position[0] + 1, position[1] - 2];
  if (!positions[rightOneDownTwo] || containsRivalPiece(player, rightOneDownTwo, positions)) {
    validMoves.push(rightOneDownTwo);
  }

  const downOneRightTwo = [position[0] + 2, position[1] - 1];
  if (!positions[downOneRightTwo] || containsRivalPiece(player, downOneRightTwo, positions)) {
    validMoves.push(downOneRightTwo);
  }

  const downOneLeftTwo = [position[0] - 2, position[1] - 1];
  if (!positions[downOneLeftTwo] || containsRivalPiece(player, downOneLeftTwo, positions)) {
    validMoves.push(downOneLeftTwo);
  }

  const leftOneUpTwo = [position[0] - 1, position[1] + 2];
  if (!positions[leftOneUpTwo] || containsRivalPiece(player, leftOneUpTwo, positions)) {
    validMoves.push(leftOneUpTwo);
  }

  const leftOneDownTwo = [position[0] - 1, position[1] - 2];
  if (!positions[leftOneDownTwo] || containsRivalPiece(player, leftOneDownTwo, positions)) {
    validMoves.push(leftOneDownTwo);
  }

  return validMoves;
};

export const getValidBishopMoves = (position, positions) => {
  const validMoves = [];
  const player = getPlayer(positions[position]);

  const upLeftDiagonalPosition = [position[0] - 1, position[1] + 1];
  while (isValidPosition(upLeftDiagonalPosition) && (!positions[upLeftDiagonalPosition] || containsRivalPiece(player, upLeftDiagonalPosition, positions))) {
    validMoves.push([upLeftDiagonalPosition[0], upLeftDiagonalPosition[1]]);

    if (containsRivalPiece(player, upLeftDiagonalPosition, positions)) {
      break;
    }

    upLeftDiagonalPosition[0] -= 1;
    upLeftDiagonalPosition[1] += 1;
  }

  const upRightDiagonalPosition = [position[0] + 1, position[1] + 1];
  while (isValidPosition(upRightDiagonalPosition) && (!positions[upRightDiagonalPosition] || containsRivalPiece(player, upRightDiagonalPosition, positions))) {
    validMoves.push([upRightDiagonalPosition[0], upRightDiagonalPosition[1]]);

    if (containsRivalPiece(player, upRightDiagonalPosition, positions)) {
      break;
    }

    upRightDiagonalPosition[0] += 1;
    upRightDiagonalPosition[1] += 1;
  }

  const downLeftDiagonalPosition = [position[0] - 1, position[1] - 1];
  while (isValidPosition(downLeftDiagonalPosition) && (!positions[downLeftDiagonalPosition] || containsRivalPiece(player, downLeftDiagonalPosition, positions))) {
    validMoves.push([downLeftDiagonalPosition[0], downLeftDiagonalPosition[1]]);

    if (containsRivalPiece(player, downLeftDiagonalPosition, positions)) {
      break;
    }

    downLeftDiagonalPosition[0] -= 1;
    downLeftDiagonalPosition[1] -= 1;
  }

  const downRightDiagonalPosition = [position[0] + 1, position[1] - 1];
  while (isValidPosition(downRightDiagonalPosition) && (!positions[downRightDiagonalPosition] || containsRivalPiece(player, downRightDiagonalPosition, positions))) {
    validMoves.push([downRightDiagonalPosition[0], downRightDiagonalPosition[1]]);

    if (containsRivalPiece(player, downRightDiagonalPosition, positions)) {
      break;
    }

    downRightDiagonalPosition[0] += 1;
    downRightDiagonalPosition[1] -= 1;
  }

  return validMoves;
};

export const getValidQueenMoves = (position, positions) => {
  const rookMoves = getValidRookMoves(position, positions);
  const bishopMoves = getValidBishopMoves(position, positions);

  return rookMoves.concat(bishopMoves);
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
    case Constants.Pieces.PlayerOne.Bishop:
    case Constants.Pieces.PlayerTwo.Bishop:
      return getValidBishopMoves(position, positions);
    case Constants.Pieces.PlayerOne.Queen:
    case Constants.Pieces.PlayerTwo.Queen:
      return getValidQueenMoves(position, positions);
    default:
      return [];
  }
};
