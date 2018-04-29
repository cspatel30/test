
export const GET_INSPECTOR_PROFILE = 'GET_INSPECTOR_PROFILE';
export const GET_INSPECTOR_PROFILE_SUCCESS = 'GET_INSPECTOR_PROFILE_SUCCESS';
export const GET_INSPECTOR_PROFILE_FAILURE = 'GET_INSPECTOR_PROFILE_FAILURE';

export const UPLOAD_INSPECTOR_DOC = 'UPLOAD_INSPECTOR_DOC';
export const UPLOAD_INSPECTOR_DOC_SUCCESS = 'UPLOAD_INSPECTOR_DOC_SUCCESS';
export const UPLOAD_INSPECTOR_DOC_FAILURE = 'UPLOAD_INSPECTOR_DOC_FAILURE';

export const DOWNLOAD_INSPECTOR_DOC = 'DOWNLOAD_INSPECTOR_DOC';
export const DOWNLOAD_INSPECTOR_DOC_SUCCESS = 'DOWNLOAD_INSPECTOR_DOC_SUCCESS';
export const DOWNLOAD_INSPECTOR_DOC_FAILURE = 'DOWNLOAD_INSPECTOR_DOC_FAILURE';

export const GET_INSPECTORS = 'GET_INSPECTORS';
export const GET_INSPECTORS_SUCCESS = 'GET_INSPECTORS_SUCCESS';
export const GET_INSPECTORS_FAILURE = 'GET_INSPECTORS_FAILURE';

export const UPDATE_INSPECTOR_PROFILE = 'UPDATE_INSPECTOR_PROFILE';
export const UPDATE_INSPECTOR_PROFILE_SUCCESS = 'UPDATE_INSPECTOR_PROFILE_SUCCESS';
export const UPDATE_INSPECTOR_PROFILE_FAILURE = 'UPDATE_INSPECTOR_PROFILE_FAILURE';

export const GET_INSPECTOR_PUBLIC_PROFILE = 'GET_INSPECTOR_PUBLIC_PROFILE';
export const GET_INSPECTOR_PUBLIC_PROFILE_SUCCESS = 'GET_INSPECTOR_PUBLIC_PROFILE_SUCCESS';
export const GET_INSPECTOR_PUBLIC_PROFILE_FAILURE = 'GET_INSPECTOR_PUBLIC_PROFILE_FAILURE';

export function getProfile() {
  return {
    type: GET_INSPECTOR_PROFILE
  };
}

export function getProfileSuccess(profile) {
  return {
    type: GET_INSPECTOR_PROFILE_SUCCESS,
    payload: profile
  };
}

export function getProfileFailure(error) {
  return {
    type: GET_INSPECTOR_PROFILE_FAILURE,
    payload: error
  }
}

export function uploadDocument(bucket, folder, fileName, file) {
  return {
    type: UPLOAD_INSPECTOR_DOC,
    payload: {bucketName: bucket, folderName: folder, fileName: fileName, file: file}
  };
}

export function uploadDocumentSuccess(document) {
  return {
    type: UPLOAD_INSPECTOR_DOC_SUCCESS,
    payload: document
  };
}

export function uploadDocumentFailure(error) {
  return {
    type: UPLOAD_INSPECTOR_DOC_FAILURE,
    payload: error
  };
}

export function downloadDocument(docType, fileName) {
  return {
    type: DOWNLOAD_INSPECTOR_DOC,
    payload: {docType: docType, fileName: fileName}
  };
}

export function downloadDocumentSuccess(downloadUrl) {
  return {
    type: DOWNLOAD_INSPECTOR_DOC_SUCCESS,
    payload: downloadUrl
  };
}

export function downloadDocumentFailure(error) {
  return {
    type: DOWNLOAD_INSPECTOR_DOC_FAILURE,
    payload: error
  };
}

export function getInspectors(pageNo) {
  return {
    type: GET_INSPECTORS,
    payload: pageNo
  };
}

export function getInspectorsSuccess(pageNo, profiles) {
  return {
    type: GET_INSPECTORS_SUCCESS,
    payload: { pageNo: pageNo, profiles: profiles }
  };
}

export function getInspectorsFailure(error) {
  return {
    type: GET_INSPECTORS_FAILURE,
    payload: error
  };
}

export function deleteEducationItem(id) {
  return {
    type: 'DELETE_EDUCATION_ITEM',
    payload: id
  };
}

export function deleteEducationItemSuccess(item) {
  return {
    type: 'DELETE_EDUCATION_ITEM_SUCCESS',
    payload: item
  };
}

export function deleteEducationItemFailure(error) {
  return {
    type: 'DELETE_EDUCATION_ITEM_FAILURE',
    payload: error
  };
}

export function deleteEmploymentItem(id) {
  return {
    type: 'DELETE_EMPLOYMENT_ITEM',
    payload: id
  };
}

export function deleteEmploymentItemSuccess(item) {
  return {
    type: 'DELETE_EMPLOYMENT_ITEM_SUCCESS',
    payload: item
  };
}

export function deleteEmploymentItemFailure(error) {
  return {
    type: 'DELETE_EMPLOYMENT_ITEM_FAILURE',
    payload: error
  };
}

export function updateInspectorProfile(inspectorProfile) {
  return {
    type: UPDATE_INSPECTOR_PROFILE,
    payload: inspectorProfile
  };
}

export function updateInspectorProfileSuccess(userProfile, inspectorProfile) {
  return {
    type: UPDATE_INSPECTOR_PROFILE_SUCCESS,
    payload: {userProfile: userProfile, inspectorProfile: inspectorProfile}
  };
}

export function updateInspectorProfileFailure(error) {
  return {
    type: UPDATE_INSPECTOR_PROFILE_FAILURE,
    payload: error
  };
}


export function getPublicProfile(userId) {
  return {
    type: GET_INSPECTOR_PUBLIC_PROFILE,
    payload: userId
  };
}

export function getPublicProfileSuccess(profile) {
  return {
    type: GET_INSPECTOR_PUBLIC_PROFILE_SUCCESS,
    payload: profile
  };
}

export function getPublicProfileFailure(error) {
  return {
    type: GET_INSPECTOR_PUBLIC_PROFILE_FAILURE,
    payload: error
  };
}