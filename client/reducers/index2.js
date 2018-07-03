import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
  routing,
  authReducer,
});

export default rootReducer;
