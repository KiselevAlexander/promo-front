import {SET_BUSY} from 'actions/main';


const INITIAL_STATE = {
    isBusy: false

};

const calls = (state = INITIAL_STATE, {type, isBusy}) => {
    switch (type) {
        case SET_BUSY:
            return {
                ...state,
                isBusy
            }

        default:
            return INITIAL_STATE;
    }
};

export default calls;