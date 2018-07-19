import _ from 'lodash';
import Cookie from 'js-cookie';

const initialState = {
  userToken: '',
  dropDownConstants: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN_VARIFIED':
      return _.assign({}, state, { userToken: action.payload });
    case 'DROP_DOWN_VALUES':
      localStorage.setItem('countries', JSON.stringify(action.payload.countries))
      localStorage.setItem('Qualification', JSON.stringify(action.payload.highestQualification))
      localStorage.setItem('titles', JSON.stringify(action.payload.title))
      localStorage.setItem('inspectionTypes', JSON.stringify(action.payload.inspectionType))      
      return _.assign({}, state, { dropDownConstants: action.payload });
    default:
      return state;
  }
};
