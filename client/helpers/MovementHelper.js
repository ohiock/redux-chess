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
  const player = getPlayer(positions[position]);

  const potentialPositions = [
    // up 2, left 1
    [position[0] - 1, position[1] + 2],

    // up 2, right 1
    [position[0] + 1, position[1] + 2],

    // right 2, up one
    [position[0] + 2, position[1] + 1],

    // right 2, down 1
    [position[0] + 2, position[1] - 1],

    // right 2, down 1
    [position[0] + 2, position[1] - 1],

    // down 2, right 1
    [position[0] + 1, position[1] - 2],

    // down 2, left 1
    [position[0] - 1, position[1] - 2],

    // left 2, up one
    [position[0] - 2, position[1] + 1],

    // keft 2m down 1
    [position[0] - 2, position[1] - 1],

    // up 1, left 2
    [position[0] - 2, position[1] + 1],

    // up 1, right 2
    [position[0] + 2, position[1] + 1],

    // right 1, up 2
    [position[0] + 1, position[1] + 2],

    // right 1, down 2
    [position[0] + 1, position[1] - 2],

    // down 1, right 2
    [position[0] + 2, position[1] - 1],

    // down 1, left 2
    [position[0] - 2, position[1] - 1],

    // left 1, up 2
    [position[0] - 1, position[1] + 2],

    // left 1, down 2
    [position[0] - 1, position[1] - 2],
  ];

  return potentialPositions.filter(potentialPosition => (isValidPosition(position) && (!positions[potentialPosition] || containsRivalPiece(player, potentialPosition, positions))));
};

export const getValidBishopMoves = (position, positions) => {
  const validMoves = [];
  const player = getPlayer(positions[position]);

  const potentialPositions = [
    { position: [position[0] - 1, position[1] + 1], incrementers: [-1, 1] }, // up, left
    { position: [position[0] + 1, position[1] + 1], incrementers: [1, 1] }, // up, right
    { position: [position[0] - 1, position[1] - 1], incrementers: [-1, -1] }, // down, left
    { position: [position[0] + 1, position[1] - 1], incrementers: [1, -1] }, // down, right
  ];

  for (let i = 0; i < potentialPositions.length; i += 1) {
    const { incrementers } = potentialPositions[i];
    let potentialPosition = potentialPositions[i].position;

    while (isValidPosition(potentialPosition) && (!positions[potentialPosition] || containsRivalPiece(player, potentialPosition, positions))) {
      validMoves.push([potentialPosition[0], potentialPosition[1]]);

      if (containsRivalPiece(player, potentialPosition, positions)) {
        break;
      }

      potentialPosition = [potentialPosition[0] + incrementers[0], potentialPosition[1] + incrementers[1]];
    }
  }

  return validMoves;
};

export const getValidQueenMoves = (position, positions) => {
  const rookMoves = getValidRookMoves(position, positions);
  const bishopMoves = getValidBishopMoves(position, positions);

  return rookMoves.concat(bishopMoves);
};

export const getValidKingMoves = (position, positions) => {
  const player = getPlayer(positions[position]);

  const potentialPositions = [
    [position[0], position[1] + 1], // up
    [position[0] + 1, position[1] + 1], // up right
    [position[0] + 1, position[1]], // right
    [position[0] + 1, position[1] - 1], // down right
    [position[0], position[1] - 1], // down
    [position[0] - 1, position[1] - 1], // down left
    [position[0] - 1, position[1]], // left
    [position[0] - 1, position[1] + 1], // up left
  ];

  return potentialPositions.filter(potentialPosition => isValidPosition(potentialPosition) && (!positions[potentialPosition] || containsRivalPiece(player, potentialPosition, positions)));
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
    case Constants.Pieces.PlayerOne.King:
    case Constants.Pieces.PlayerTwo.King:
      return getValidKingMoves(position, positions);
    default:
      return [];
  }
};
