export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';

export function updateUserProfile(userProfile) {
    return {
        type: UPDATE_USER_PROFILE,
        payload: userProfile
    };
}

export function changeUserPassword(passwords) {
    return {
        type: CHANGE_USER_PASSWORD,
        payload: passwords
    };
}
