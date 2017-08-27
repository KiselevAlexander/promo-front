import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/ru';
import 'core-js/shim';
import {App} from './app';

const render = (Component) =>
    ReactDOM.render(<Component />, document.getElementById('root'));

render(App);

if (module.hot) {
    module.hot.accept('./app', () => {
        const nextApp = require('./app').App;
        render(nextApp);
    });
}
