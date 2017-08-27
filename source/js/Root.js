import React from 'react';
import {Router, browserHistory, Route} from 'react-router';


const onRouteUpdate = () => {

};

class Root extends React.Component {
    render() {
        return (
            <Router history={browserHistory} onUpdate={onRouteUpdate}>
                {this.props.routes()}
            </Router>
        );
    }
}

Root.propTypes = {
    routes: React.PropTypes.func
};

Root.defaultProps = {
    routes: () => {}
};

export default Root;
