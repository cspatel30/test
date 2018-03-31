
export const CONTACT_US_EMAIL = 'CONTACT_US_EMAIL';
export const CONTACT_US_EMAIL_SUCCESS = 'CONTACT_US_EMAIL_SUCCESS';
export const CONTACT_US_EMAIL_FAILURE = 'CONTACT_US_EMAIL_FAILURE';

export function sendContactUsEmail(form) {
  return {
    type: CONTACT_US_EMAIL,
    payload: form
  };
}

export function sendContactUsEmailSuccess() {
  return {
    type: CONTACT_US_EMAIL_SUCCESS
  };
}

export function sendContactUsEmailFailure(error) {
  return {
    type: CONTACT_US_EMAIL_FAILURE,
    payload: error
  };
}