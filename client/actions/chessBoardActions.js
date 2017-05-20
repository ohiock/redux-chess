import { createAction } from 'redux-act';

import { getValidMoves } from '../helpers/MovementHelper';

// Using redux-act for action creation https://github.com/pauldijou/redux-act
export const setupNewMatch = createAction('setupNewMatch');
export const moveChessPiece = createAction('moveChessPiece', (currentPosition, nextPosition) => ({
  currentPosition,
  nextPosition,
}));
export const markValidMoves = createAction('markValidMoves', (currentPiece, position, positions) => ({
  validMoves: getValidMoves(currentPiece, position, positions),
}));
export const clearValidMoves = createAction('clearValidMoves');
