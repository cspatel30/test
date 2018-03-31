export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const SETUP_ACCOUNT = 'SETUP_ACCOUNT';
export const SETUP_ACCOUNT_SUCCESS = 'SETUP_ACCOUNT_SUCCESS';
export const SETUP_ACCOUNT_FAILURE = 'SETUP_ACCOUNT_FAILURE';

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';

export function login(payload) {
  return {
    type: LOGIN,
    payload : payload
  };
}

export function loginSuccess(token, user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {userToken: token, userProfile: user}
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}

export function register(form) {
  return {
    type: REGISTER,
    payload : form
  };
}

export function registerSuccess(token, user) {
  return {
    type: REGISTER_SUCCESS,
    payload: {userToken: token, userProfile: user}
  };
}

export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    payload: error
  };
}


export function verifyToken() {
  return {
    type: VERIFY_TOKEN
  };
}

export function verifyTokenSuccess(token, user) {
  return {
    type: VERIFY_TOKEN_SUCCESS,
    payload: {userToken: token, userProfile: user}
  };
}

export function verifyTokenFailure(error) {
  return {
    type: VERIFY_TOKEN_FAILURE,
    payload: error
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function setupAccount(requestToken, form) {
  return {
    type: SETUP_ACCOUNT,
    payload: {token : requestToken, form: form}
  };
}

export function setupAccountSuccess() {
  return {
    type: SETUP_ACCOUNT_SUCCESS
  };
}

export function setupAccountFailure(error) {
  return {
    type: SETUP_ACCOUNT_FAILURE,
    payload: error
  };
}

export function verifyEmail(requestToken) {
  return {
    type: VERIFY_EMAIL,
    payload: requestToken
  };
}

export function verifyEmailSuccess() {
  return {
    type: VERIFY_EMAIL_SUCCESS
  };
}

export function verifyEmailFailure(error) {
  return {
    type: VERIFY_EMAIL_FAILURE,
    payload: error
  };
}