import {SET_SUCCESS} from 'actions/global';

const INITIAL_STATE = {
    success: true
};

const global = (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_SUCCESS:
            return ({
                ...state,
                success: payload
            });
        default:
            return state;
    }
};

export default global;