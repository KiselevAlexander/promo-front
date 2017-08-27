import React from 'react';

import i18next from 'i18next';

import MenuLink from 'components/root/menu-link';


class NavigationMenu extends React.Component {

    render() {
        const {links} = this.props;

        return (
            <nav className="topMenu">
                <ul className="topMenu-list">
                    {links.map((link) => (link.auth === undefined || link.auth === this.props.userAuth) &&
                        <li key={link.url}>
                            <MenuLink url={link.url} noOrigin={link.noOrigin} index={link.index} onClick={link.onClick}>
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
            </nav>
        );
    }
}

export default NavigationMenu;
