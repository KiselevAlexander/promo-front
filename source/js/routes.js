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
        <Route path="/">
            <IndexRoute component={FirstScreen} />
            <Route path="/player" component={Player} />
            <Route path="/player/:videoID" component={Player} />
            <Route path="/main" component={Main} />
            <Route path="/success" onEnter={onEnterSuccess} />
            <Route path="/moderator"component={Admin} />
        </Route>
    </Route>
);

export default routes;
