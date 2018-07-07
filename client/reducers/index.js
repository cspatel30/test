import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authReducer from './auth.reducer';
import adminReducer from './admin.reducer';

const rootReducer = combineReducers({
  routing,
  authReducer,
  adminReducer
});

export default rootReducer;
