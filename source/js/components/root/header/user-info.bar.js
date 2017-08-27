import React from 'react';
import i18next from 'i18next';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {getUserData} from 'selectors/user';
import {logout} from 'actions/auth';
import {usernameToString} from 'utils/formatter';
import {AVATARS} from 'constants/avatars';

class UserInfoBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.expandDropdown = this.expandDropdown.bind(this);
    }

    expandDropdown() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    logoutClickHandle = (event) => {
        event.preventDefault();
        this.setState({expanded: false});
        this.props.logout();
        browserHistory.push('/login');
    };

    profileClickHandler = (event) => {
        event.preventDefault();

        this.setState({
            expanded: false
        });

        browserHistory.push('/user');
    };

    render() {
        const {expanded} = this.state;
        const {miles, user} = this.props;
        const {initials, avatar} = user;

        let userName = usernameToString(initials, false, true);

        if (userName.trim() === '') {
            userName = 'Добро пожаловать';
        }
        if (userName.length > 23) {
            userName = userName.substr(0, 21) + '...';
        }

        return (
            <div className="userBar">
                <div 
                    className="userBar-avatar"
                    style={{backgroundImage: `url('data:image/jpeg;base64,${avatar || AVATARS[0]}')`}}
                    onClick={this.profileClickHandler}
                />
                <div 
                    className={'userBar-name' + ((expanded) ? ' is-dshowed' : '')} 
                    onClick={this.expandDropdown}
                >
                    {userName}
                    <div className="userBar-caret" />
                </div>
                {miles > 0 &&
                    <div className="userBar-miles" onClick={this.expandDropdown}>{miles} миль</div>
                }
                <div className={'userBar-dropdown' + ((expanded) ? ' is-expanded' : '')}>
                    <ul>
                        <li>
                            <Link to="/user" onClick={this.profileClickHandler}>
                                {i18next.t('common.profile')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/logout" onClick={this.logoutClickHandle}>
                                {i18next.t('common.logout')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: getUserData(state),
        miles: state.bonuses.milesCount
    }),
    (dispatch) => ({
        logout: () => dispatch(logout())
    })
)(UserInfoBar);