import React from 'react';
import {Route, IndexRedirect, IndexRoute, Redirect, browserHistory} from 'react-router';


import Root from 'components/root';
import Main from 'components/main';
import Player from 'components/player';
import Editor from 'components/editor';

import store from 'store';

const onEnterRoot = (store) => {

};

const Empty = () => (<div className="react-no-app" />);

// TODO: remove Redirect from index route
const routes = () => (
    <Route path="" onEnter={onEnterRoot(store)} component={Root}>
        <Route path="/">
            <IndexRoute component={Main} />
            <Route path="/player" component={Player} />
            <Route path="/player/:videoID" component={Player} />
            <Route path="/editor" component={Editor} />
        </Route>
    </Route>
);

export default routes;
