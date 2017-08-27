import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {openFeedback} from 'actions/feedback';
import Modal from 'components/common/modal';
import Registration from 'components/registration';
import UserInfoBar from './user-info.bar';
import NavigationMenu from './navigation-menu';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenRegistrationModal: false,
            isOpenLoginModal: false
        };

        this.links = [
            {
                url: '/orders',
                titleKey: 'orders',
                index: false,
                auth: true
            },
            {
                url: '/bonuses',
                titleKey: 'bonuses',
                index: false,
                auth: true
            },
            {
                url: 'https://status.utair.ru/about',
                titleKey: 'about_program',
                noOrigin: true,
                index: false
            },
            {
                url: '/feedback',
                titleKey: 'feedback',
                noOrigin: false,
                index: false,
                onClick: this.handleFeedbackClick
            },
            {
                url: '/login',
                titleKey: 'login',
                noOrigin: false,
                index: false,
                auth: false
            },
            {
                url: '/registration',
                titleKey: 'registration',
                noOrigin: false,
                index: false,
                auth: false
            }
        ];
    }

    render() {
        const {isOpenRegistrationModal, isOpenLoginModal} = this.state;
        const {userAuth} = this.props;

        return (
            <header className="page__header header">
                <div className="wrapper">
                    <div className="siteLogo">
                        <Link to="/">
                            <img src="/static/img/icons/logoUtair.svg" alt="UTair" />
                        </Link>
                    </div>
                    {userAuth && <UserInfoBar />}
                    <NavigationMenu links={this.links} userAuth={userAuth} />
                </div>
                <Modal open={isOpenRegistrationModal} onClose={this.closeRegistrationModal}>
                    <Registration onComplete={this.closeRegistrationModal} />
                </Modal>
                <Modal open={isOpenLoginModal} onClose={this.closeLoginModal}>
                    <Registration isLogin={true} onComplete={this.closeLoginModal} />
                </Modal>
            </header>
        );
    }

    openLoginModal = () => {
        this.setState({
            isOpenLoginModal: true
        });
    };

    closeRegistrationModal = () => {
        this.setState({
            isOpenRegistrationModal: false
        });
    };

    closeLoginModal = () => {
        this.setState({
            isOpenLoginModal: false
        });
    };

    handleFeedbackClick = (e) => {
        e.preventDefault();

        this.props.openFeedback(true);
    };
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    openFeedback: (isOpen) => dispatch(openFeedback(isOpen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);