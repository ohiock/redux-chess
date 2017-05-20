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
    A8: Constants.Pieces.PlayerOne.Rook,
    B8: Constants.Pieces.PlayerOne.Knight,
    C8: Constants.Pieces.PlayerOne.Bishop,
    D8: Constants.Pieces.PlayerOne.Queen,
    E8: Constants.Pieces.PlayerOne.King,
    F8: Constants.Pieces.PlayerOne.Bishop,
    G8: Constants.Pieces.PlayerOne.Knight,
    H8: Constants.Pieces.PlayerOne.Rook,
    A7: Constants.Pieces.PlayerOne.Pawn,
    B7: Constants.Pieces.PlayerOne.Pawn,
    C7: Constants.Pieces.PlayerOne.Pawn,
    D7: Constants.Pieces.PlayerOne.Pawn,
    E7: Constants.Pieces.PlayerOne.Pawn,
    F7: Constants.Pieces.PlayerOne.Pawn,
    G7: Constants.Pieces.PlayerOne.Pawn,
    H7: Constants.Pieces.PlayerOne.Pawn,
    A2: Constants.Pieces.PlayerTwo.Pawn,
    B2: Constants.Pieces.PlayerTwo.Pawn,
    C2: Constants.Pieces.PlayerTwo.Pawn,
    D2: Constants.Pieces.PlayerTwo.Pawn,
    E2: Constants.Pieces.PlayerTwo.Pawn,
    F2: Constants.Pieces.PlayerTwo.Pawn,
    G2: Constants.Pieces.PlayerTwo.Pawn,
    H2: Constants.Pieces.PlayerTwo.Pawn,
    A1: Constants.Pieces.PlayerTwo.Rook,
    B1: Constants.Pieces.PlayerTwo.Knight,
    C1: Constants.Pieces.PlayerTwo.Bishop,
    D1: Constants.Pieces.PlayerTwo.Queen,
    E1: Constants.Pieces.PlayerTwo.King,
    F1: Constants.Pieces.PlayerTwo.Bishop,
    G1: Constants.Pieces.PlayerTwo.Knight,
    H1: Constants.Pieces.PlayerTwo.Rook,
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
