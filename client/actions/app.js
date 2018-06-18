
export const INIT_APP = 'INIT_APP';
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS';
export const INIT_APP_FAILURE = 'INIT_APP_FAILURE';

export function initApp() {
  return {
    type: INIT_APP
  };
}

export function initAppSuccess(config) {
  return {
    type: INIT_APP_SUCCESS,
    payload: config
  };
}

export function initAppFailure(error) {
  return {
    type: INIT_APP_FAILURE,
    payload: error
  };
}