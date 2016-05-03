import {
    LOGIN_REQUEST,
    CHANGE_TAB,
    SIGNOUT,
    SIGNUP_REQUEST,
    REGISTERED_USERS_REQUEST
} from '../actions/types';

const initialState = {
    token: null,
    userName: "",
    loginFailed: false,
    currentPage: "Home",
    loginCount: 0,
    loginMinutes: 0,
    registeredUsersCount: 0
}

export default function (state = initialState, action){
    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            console.log(action.payload);
            if (action.payload.status == 200) {
                return {
                    ...state,
                    currentPage: "Home",
                    userName: action.payload.data.userName,
                    token: action.payload.data.token,
                    loginFailed:false,
                    loginCount: action.payload.data.loginCount,
                    loginMinutes: action.payload.data.loginMinutes
                }
            }
            return { ...state, loginFailed:true};
        case CHANGE_TAB:
            return { ...state, currentPage: action.payload};
        case SIGNOUT:
            return { ...state, currentPage: "Home", userName: "", token: null, loginFailed:false }
        case REGISTERED_USERS_REQUEST:
            if (action.payload.status == 200) {
                return {...state, registeredUsersCount: action.payload.data.registeredUsersCount};
            }
            return {...state, registeredUsersCount: -1};
    }

    return state;
}
