import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Footer from './footer';


class Root extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showed: false
        };
    }

    render() {
        return (
            <div className="main-container">
                <header className="site-header">
                    <div className="wrapper">
                        <div className="logo">
                            <Link to="/">
                                <img src="/static/img/logo.png" alt="" />
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="main-block flex-middle-content">
                    <div className="wrapper">
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);