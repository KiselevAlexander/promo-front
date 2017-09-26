import React from 'react';
import {Route, IndexRoute} from 'react-router';
// import {vk} from 'utils/social-auth/vk';

import Root from 'components/root';
import Main from 'components/main';
import Player from 'components/player';
import Editor from 'components/editor';
import Admin from 'components/admin';

const onEnterSuccess = () => {
    // vk.watcher();
};

// TODO: remove Redirect from index route
const routes = () => (
    <Route path="" component={Root}>
        <Route path="/">
            <IndexRoute component={Main} />
            <Route path="/player" component={Player} />
            <Route path="/player/:videoID" component={Player} />
            <Route path="/editor" component={Editor} />
            <Route path="/success" onEnter={onEnterSuccess} />
            <Route path="/admin"component={Admin} />
        </Route>
    </Route>
);

export default routes;
