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