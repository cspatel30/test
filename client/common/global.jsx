import React from 'react';
import { AsyncStorage } from 'AsyncStorage';

/* Admin Local Storage */
export const storeAdminToken = user => {
    AsyncStorage.setItem('adminToken',JSON.stringify(user));
}
export const getAdminToken = async () => {
    const admin = await AsyncStorage.getItem('adminToken');
    return (admin  && IsJsonString(admin)) ? JSON.parse(admin) : null;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const isEmptyObject = (obj) => {
    if(obj == "" || obj == null || obj == "null" || obj == undefined || obj== 'undefined'){
        return true;
    }
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

export const getApiHeader = (headerContent) => {
    let head = {
        'Content-Type': 'application/json'
    };

    if(headerContent && !isEmptyObject(headerContent)) {
        if (headerContent.adminAuthToken) {
            head['Authorization'] = Cookie.get('adminToken');
        }
        if (headerContent.Accept) {
            head['Accept'] = headerContent.Accept;
        }

        if(headerContent.ContentType == "no"){
            delete head['Content-Type'];
        }
        else if (headerContent.ContentType) {
            head['Content-Type'] = headerContent.ContentType;
        }

        if (headerContent['Access-Control-Allow-Origin']) {
            head['Access-Control-Allow-Origin'] = '*';
        }
    }
    
    return head;
}
