import {createFSA} from 'utils';

export const SET_SUCCESS = 'SET_SUCCESS';

const successFSA = createFSA(SET_SUCCESS);

export const setSuccess = () => (dispatch) =>
    dispatch(successFSA(true));