import {createSelector} from 'reselect';

export const getUserData = createSelector(
    [(state) => state.user.userData],
    (userData) => userData
);

export const getBonusSteps = createSelector(
    [(state) => state.user.userData.bonusSteps],
    (bonusSteps) => bonusSteps
);

export const getUserName = createSelector(
    [(state) => state.user.userData.initials.original && state.user.userData.initials.original.name],
    (name) => name
);

export const getUserLastName = createSelector(
    [(state) => state.user.userData.initials.original && state.user.userData.initials.original.surname],
    (name) => name
);

export const getUserAddress = createSelector(
    [(state) => state.user.userData.address],
    (address) => address
);

export const getUserBirthday= createSelector(
    [(state) => state.user.userData.birthday],
    (birthday) => birthday
);

export const getUserAvatar = createSelector(
    [(state) => state.user.userData.avatar],
    (avatar) => avatar
);

export const getUserStatusCard = createSelector(
    [(state) => state.user.userData.status],
    (status) => status
);

export const getUserId = createSelector(
    [(state) => state.user.userData.status.id],
    (userId) => userId
);

export const getInitState = createSelector(
    [(state) => state.user.isInit],
    (isInit) => isInit
);