import _ from 'lodash';

const initialState = {
  userToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN_VARIFIED':
      return _.assign({}, state, { userToken: action.payload });
    default:
      return state;
  }
};
