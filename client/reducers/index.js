import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chessBoardReducer from './chessBoardReducers';

const rootReducer = combineReducers({
  chessBoard: chessBoardReducer,
  routing: routerReducer,
});

export default rootReducer;
