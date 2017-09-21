import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <div className="grid-2 phone-1 flex">
                        <div className="col flex flex-middle">
                            <a href="http://70.ingos.ru/" target="_blank" className="logo">
                                <img src="/static/img/ingos_logo.png" alt="" />
                            </a>
                        </div>
                        <div className="col flex flex-middle">

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
                                        <span className="tw" />
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;