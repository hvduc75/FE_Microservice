import { UPDATE_STATE_ACTIVE } from '../action/types';

const INITIAL_STATE = {
    itemActive: '',
};

const eventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_STATE_ACTIVE:
            console.log('action.payload', action.payload);
            return {
                ...state,
                itemActive: action?.payload,
            };
        default:
            return state;
    }
};

export default eventReducer;
