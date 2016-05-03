import axios from 'axios';
import {
    LOGIN_REQUEST,
    SIGNUP_REQUEST,
    CHANGE_TAB,
    SIGNOUT,
    REGISTERED_USERS_REQUEST
} from './types';

const API_ROOT = 'http://localhost:3000/';

export function authenticate(userName, password){
    var request = axios.post(`${API_ROOT}signin`, {
        userName: userName,
        password: password
    });

    return {
        type: LOGIN_REQUEST,
        payload: request
    }

}

export function changeTab(newTab){
    return {
        type: CHANGE_TAB,
        payload: newTab
    }
}

export function signout(){
    return{
        type: SIGNOUT,
        payload: null
    }
}

export function signup(userName, password){
    var request = axios.post(`${API_ROOT}signup`, {
        userName: userName,
        password: password
    });

    return {
        type: SIGNUP_REQUEST,
        payload: request
    }
}

export function registeredUsersCount(){
    var request = axios.get(`${API_ROOT}user-count`);
    return {
        type: REGISTERED_USERS_REQUEST,
        payload: request

    }
}
