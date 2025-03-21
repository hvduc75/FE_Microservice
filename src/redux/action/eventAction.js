import { UPDATE_STATE_ACTIVE, UPDATE_PROFILE_STATE_ACTIVE } from './types';

export const updateItemActive = (data) => {
    return {
        type: UPDATE_STATE_ACTIVE,
        payload: data,
    };
};

export const updateProfileItemActive = (data) => {
    return {
        type: UPDATE_PROFILE_STATE_ACTIVE,
        payload: data,
    };
};