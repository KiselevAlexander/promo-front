import {combineReducers} from 'redux';

import calls from './main';
import global from './global';

export default combineReducers({
    calls,
    global
});
