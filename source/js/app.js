import React from 'react';
import {Provider} from 'react-redux';
import store from 'store';
import Root from 'Root';
import routes from 'routes';

const onRootEnter = (store) => {
};

export const App = () =>
    <Provider store={store}>
        <Root routes={routes} onEnter={onRootEnter(store)} />
    </Provider>;
