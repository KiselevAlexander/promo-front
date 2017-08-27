import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';


class Root extends React.Component {

    render() {

        return (
            <main>
                <h1>Promo App</h1>
                <Link to="/">В начало</Link>
                <Link to="/player">Player</Link>
                <div className="main-block">
                    {this.props.children}
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);