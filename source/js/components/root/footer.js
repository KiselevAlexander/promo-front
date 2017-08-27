import React from 'react';

import i18next from 'i18next';

import {Icon} from 'components/common/icon';
import MenuLink from 'components/root/menu-link';


const styles = {
    socialNetIcon: {
        width: '2.75em',
        height: '2.75em'
    },
    mobileAppIcon: {
        width: '9em',
        height: '2.88em'
    }
};
const links = [
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
        url: 'https://status.utair.ru/miles/information/earn',
        titleKey: 'collect_miles',
        index: false,
        noOrigin: true,
        notification: 1
    },
    {
        url: 'https://status.utair.ru/miles/information/spend',
        titleKey: 'spend_miles',
        index: false,
        noOrigin: true,
        notification: 1
    },
    {
        url: 'https://status.utair.ru/about',
        titleKey: 'about_program',
        noOrigin: true,
        index: false
    }
];

class Footer extends React.Component {

    render() {

        return (
            <footer className="footer gray">
                <div className="wrapper">

                    <div className="grid-16 phablet-2 phone-1 middle">
                        <div className="col-10 phablet-2 phone-1">
                            <div className="grid-10 phablet-2 phone-2">
                                <div className="col-4 phablet-1 phone-1">
                                    <p className="footer-phone">8-800-234-00-88</p>
                                    <span>{i18next.t('footer.phone_label_ru')}</span>
                                </div>
                                <div className="col-4 phablet-1 phone-1">
                                    <p className="footer-phone">8-809-505-33-77</p>
                                    <span>{i18next.t('footer.phone_label')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 phablet-1 phone-1">
                            <div className="footer-social">
                                <a href="https://www.facebook.com/UTair/" className="footer-socialFb">
                                    <Icon xlink="icon-facebook" style={styles.socialNetIcon} />
                                </a>
                                <a href="https://vk.com/utair" className="footer-socialVk">
                                    <Icon xlink="icon-vkontakte" style={styles.socialNetIcon} />
                                </a>
                                <a href="https://ok.ru/group/utair" className="footer-socialOd">
                                    <Icon xlink="icon-odnoklassniki" style={styles.socialNetIcon} />
                                </a>
                                <a href="http://www.youtube.com/user/utairavia" className="footer-socialYt">
                                    <Icon xlink="icon-youtube" style={styles.socialNetIcon} />
                                </a>
                                <a href="http://instagram.com/utair" className="footer-socialInst">
                                    <Icon xlink="icon-instagram" style={styles.socialNetIcon} />
                                </a>
                            </div>
                        </div>

						<div className="col-10 phablet-1 phone-1 phonablet-hide">

							<ul className="footer-menu">
								{links.map((link) => (!link.auth || link.auth === this.props.userAuth) &&
									<li key={link.url}>
										<MenuLink url={link.url} noOrigin={link.noOrigin} index={link.index}>
											{link.notifications &&
												<span className="notifications">
													{link.notifications}
												</span>
											}
											{i18next.t(`header.links.${link.titleKey}`)}
										</MenuLink>
									</li>
								)}
							</ul>
						</div>

						<div className="col-6 phablet-1 phone-1">
							<div className="footer-app">
								<a href="https://itunes.apple.com/ru/app/utejr/id747831899?mt=8&ign-mpt=uo%3D4">
									<Icon xlink="icon-appStore" style={styles.mobileAppIcon} />
								</a>
								<a href="https://play.google.com/store/apps/details?id=ru.utair.android">
									<Icon xlink="icon-googlePlay" style={styles.mobileAppIcon} />
								</a>
							</div>
						</div>

					</div>

					<p className="footer-copyright">
						<small>{i18next.t('footer.rights')}</small>
					</p>

                </div>

            </footer>
        );
    }
}

export default Footer;
