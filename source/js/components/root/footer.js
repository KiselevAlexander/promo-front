import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <a href="http://70.ingos.ru/" target="_blank" className="logo">
                        <img src="/static/img/logo.png" alt="" />
                    </a>
                    <div className="share">
                        <ul>
                            <li>
                                <span className="ok" />
                            </li>
                            <li>
                                <span className="vk" />
                            </li>
                            <li>
                                <span className="fb" />
                            </li>
                            <li>
                                <span className="twi" />
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;