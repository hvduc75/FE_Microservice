import { UPDATE_STATE_ACTIVE, UPDATE_PROFILE_STATE_ACTIVE } from '../action/types';

const INITIAL_STATE = {
    itemActive: '',
    profileItemActive: '',
};

const eventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_STATE_ACTIVE:
            return {
                ...state,
                itemActive: action?.payload,
            };
        case UPDATE_PROFILE_STATE_ACTIVE:
            return {
                ...state,
                profileItemActive: action?.payload,
            };
        default:
            return state;
    }
};

export default eventReducer;
