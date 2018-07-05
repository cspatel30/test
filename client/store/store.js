import 'babel-polyfill';
import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Cookies from 'universal-cookie';
import reducer from '../reducers/';
import sagas from '../sagas/';

const cookies = new Cookies();

const INITIAL_STATE = {
  loading: false, 
  error: null,
  ports: [],
  countries: [], 
  inspectionTypes: [],
  vesselTypes: [], 
  inspectorPositions : [], 
  inspectorQualifications: [],
  inspectorTitles: [],
  inspectorSkills: [],
  region: [],
  regionCodes: [],
  inspectorLevel: [],
  userToken: cookies.get("si.at"),
  userProfile: null,
  inspectorProfile: null,
  logout: true,
  createEnquirySuccess: false,
  createdEnquiry: null,
  enquiries: [],
  inspectorPageNo: 1,
  inspectors: [],
  inspectorPublicProfile: null,
  enquiryQuoteUpdated: false,
  enquiryInspectorMatches: [],
  currentEnquiry: null,
  inspectorAssignedSuccess: false,
  quoteAcceptRejectSuccess: false,
  downloadUrl: null,
  profileUpdateSuccess: false,
  signUpSuccess: false,
  contactUsEmailSuccess: false,
  setupAccountSuccess: false,
  verifyEmailSuccess: false,
  createOrderSuccess: false,
  createdOrder: null,
  orders: null
};

export default function configureStore(initialState=INITIAL_STATE) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);
  return store;
};
