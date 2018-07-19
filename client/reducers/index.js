import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authReducer from './auth.reducer';
import adminReducer from './admin.reducer';
import appReducer from './app.reducer';
import inspectorReducer from './inspector.reducer';
import orderReducer from './order.reducer';
import enquiresReducer from './enquires.reducer';

const rootReducer = combineReducers({
  routing,
  authReducer,
  adminReducer,
  appReducer,
  inspectorReducer,
  orderReducer,
  enquiresReducer
});

export default rootReducer;