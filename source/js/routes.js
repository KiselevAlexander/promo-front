import React from 'react';
import {Route, IndexRoute} from 'react-router';
// import {vk} from 'utils/social-auth/vk';

import Root from 'components/root';
import Main from 'components/main';
import Player from 'components/player';
import FirstScreen from 'components/main/steps/firstScreen';
import Admin from 'components/admin';

const onEnterSuccess = () => {
    // vk.watcher();
};

// TODO: remove Redirect from index route
const routes = () => (
    <Route path="" component={Root}>
        <Route path="/video">
            <IndexRoute component={FirstScreen} />
            <Route path="/video/player" component={Player} />
            <Route path="/video/player/:videoID" component={Player} />
            <Route path="/video/main" component={Main} />
            <Route path="/video/success" onEnter={onEnterSuccess} />
            <Route path="/video/moderator"component={Admin} />
        </Route>
    </Route>
);

export default routes;
