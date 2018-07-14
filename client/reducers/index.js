import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authReducer from './auth.reducer';
import appReducer from './app.reducer';
import inspectorReducer from './inspector.reducer';

const rootReducer = combineReducers({
  routing,
  authReducer,
  appReducer,
  inspectorReducer,
});

export default rootReducer;