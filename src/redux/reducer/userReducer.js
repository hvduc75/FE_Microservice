import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT_SUCCESS,
    UPDATE_ACCESS_TOKEN_SUCCESS,
} from '../action/types';

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        phone: '',
        avatar: '',
        role: '',
        email: '',
        id: '',
        gender: '',
        birthDay: '',
        receiverName: '',
        receiverPhone: '',
        receiverEmail: '',
        address: '',
    },
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                    id: action?.payload?.DT?.id,
                    phone: action?.payload?.DT?.phone,
                    avatar: action?.payload?.DT?.avatar,
                    gender: action?.payload?.DT?.gender,
                    birthDay: action?.payload?.DT?.birthDay,
                    receiverName: action?.payload?.DT?.receiverName,
                    receiverPhone: action?.payload?.DT?.receiverPhone,
                    receiverEmail: action?.payload?.DT?.receiverEmail,
                    address: action?.payload?.DT?.address,
                },
                isAuthenticated: true,
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    avatar: '',
                    role: '',
                    email: '',
                    id: '',
                    phone: '',
                    gender: '',
                    birthDay: '',
                    receiverName: '',
                    receiverPhone: '',
                    receiverEmail: '',
                    address: '',
                },
                isAuthenticated: false,
            };
        case UPDATE_ACCESS_TOKEN_SUCCESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    access_token: action.payload,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
