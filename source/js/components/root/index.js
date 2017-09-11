import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import {connect} from 'react-redux';



class Root extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showed: false
        };
    }

    showPatterns = () => {
        this.setState((state) => ({
            showed: !state.showed 
        }));
    }

    render() {

        return (
            <div className="wrapper">
                <header className="site-header">
                    <div className="logo">
                        <a href="#">
                            <img src="/static/img/logo.png" alt="" />
                        </a>
                    </div>
                </header>
                <div className="main-block">
                    {this.props.children}
                </div>
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