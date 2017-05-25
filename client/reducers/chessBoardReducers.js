import { createReducer } from 'redux-act';

import Constants from '../util/constants';
import {
  setupNewMatch,
  moveChessPiece,
  markValidMoves,
  clearValidMoves,
  nextTurn,
} from '../actions/chessBoardActions';

const initialState = {
  currentTurn: 1,
  positions: { },
  validMoves: [],
  movementLog: [],
};

const setupNewMatchReducer = state => Object.assign({}, state, {
  positions: {
    '0 0': Constants.Pieces.PlayerOne.Rook,
    '1 0': Constants.Pieces.PlayerOne.Knight,
    '2 0': Constants.Pieces.PlayerOne.Bishop,
    '3 0': Constants.Pieces.PlayerOne.Queen,
    '4 0': Constants.Pieces.PlayerOne.King,
    '5 0': Constants.Pieces.PlayerOne.Bishop,
    '6 0': Constants.Pieces.PlayerOne.Knight,
    '7 0': Constants.Pieces.PlayerOne.Rook,
    '0 1': Constants.Pieces.PlayerOne.Pawn,
    '1 1': Constants.Pieces.PlayerOne.Pawn,
    '2 1': Constants.Pieces.PlayerOne.Pawn,
    '3 1': Constants.Pieces.PlayerOne.Pawn,
    '4 1': Constants.Pieces.PlayerOne.Pawn,
    '5 1': Constants.Pieces.PlayerOne.Pawn,
    '6 1': Constants.Pieces.PlayerOne.Pawn,
    '7 1': Constants.Pieces.PlayerOne.Pawn,
    '0 7': Constants.Pieces.PlayerTwo.Rook,
    '1 7': Constants.Pieces.PlayerTwo.Knight,
    '2 7': Constants.Pieces.PlayerTwo.Bishop,
    '3 7': Constants.Pieces.PlayerTwo.Queen,
    '4 7': Constants.Pieces.PlayerTwo.King,
    '5 7': Constants.Pieces.PlayerTwo.Bishop,
    '6 7': Constants.Pieces.PlayerTwo.Knight,
    '7 7': Constants.Pieces.PlayerTwo.Rook,
    '0 6': Constants.Pieces.PlayerTwo.Pawn,
    '1 6': Constants.Pieces.PlayerTwo.Pawn,
    '2 6': Constants.Pieces.PlayerTwo.Pawn,
    '3 6': Constants.Pieces.PlayerTwo.Pawn,
    '4 6': Constants.Pieces.PlayerTwo.Pawn,
    '5 6': Constants.Pieces.PlayerTwo.Pawn,
    '6 6': Constants.Pieces.PlayerTwo.Pawn,
    '7 6': Constants.Pieces.PlayerTwo.Pawn,
  },
});

const moveChessPieceReducer = (state, action) => Object.assign({}, state, {
  movementLog: [
    ...state.movementLog,
    { from: action.currentPosition, to: action.nextPosition },
  ],
  positions: {
    ...state.positions,
    [action.nextPosition]: state.positions[action.currentPosition],
    [action.currentPosition]: null,
  },
});

const markValidMovesReducer = (state, action) => Object.assign({}, state, {
  validMoves: action.validMoves,
});

const clearValidMovesReducer = state => Object.assign({}, state, {
  validMoves: [],
});

const nextTurnReducer = (state, action) => Object.assign({}, state, {
  currentTurn: action.nextTurn,
});

const reducerMap = createReducer({
  [setupNewMatch]: state => setupNewMatchReducer(state),
  [moveChessPiece]: (state, action) => moveChessPieceReducer(state, action),
  [markValidMoves]: (state, action) => markValidMovesReducer(state, action),
  [clearValidMoves]: state => clearValidMovesReducer(state),
  [nextTurn]: (state, action) => nextTurnReducer(state, action),
}, initialState);

export default reducerMap;
