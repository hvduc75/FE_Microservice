import { UPDATE_STATE_ACTIVE } from './types';

export const updateItemActive = (data) => {
    return {
        type: UPDATE_STATE_ACTIVE,
        payload: data,
    };
};