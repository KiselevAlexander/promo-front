import {createSelector} from 'reselect';

export const getSuccessState = createSelector(
    (state) => state.global.success,
    (success) => success
);