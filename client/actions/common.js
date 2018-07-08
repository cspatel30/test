export const ACTION_IN_PROGRESS = 'ACTION_IN_PROGRESS';
export const SESSION_EXPIRED = 'SESSION_EXPIRED';

export function actionInProgress() {
  return {
    type: ACTION_IN_PROGRESS
  };
}

export function sessionExpired() {
  return {
    type: SESSION_EXPIRED
  };
}