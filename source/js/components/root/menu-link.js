import React from 'react';
import {Link, IndexLink} from 'react-router';


class MenuLink extends React.Component {

    render() {
        const {url, noOrigin, children, index, onClick} = this.props;

        if (noOrigin) {
            return (<a href={url} target="_blank">{children}</a>);
        }

        if (index) {
            return (<IndexLink to={url} activeClassName="is-active" onClick={onClick}>{children}</IndexLink>);
        }

        return (<Link to={url} activeClassName="is-active" onClick={onClick}>{children}</Link>);
    }
}

export default MenuLink;
