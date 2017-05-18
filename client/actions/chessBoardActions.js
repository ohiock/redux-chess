import { createAction } from 'redux-act';

// Using redux-act for action creation https://github.com/pauldijou/redux-act
export const setupNewMatch = createAction('setupNewMatch');
export const moveChessPiece = createAction('moveChessPiece', (currentPosition, nextPosition) => ({
  currentPosition,
  nextPosition,
}));
