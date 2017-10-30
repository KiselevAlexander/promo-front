import React from 'react';
import {Link} from 'react-router';

class FirstScreen extends React.Component {

    rulesClickHandler = () => this.setState({rulesOpen: true});

    rulesModelCloseHandler = () => this.setState({rulesOpen: false});

    render() {

        return (
            <div className="firstScreen">
                <div className="grid-2 phablet-1 phone-1">
                    <div className="col">
                        <h3>
                            Поделитесь своей<br />
                            мечтой и мы поможем<br />
                            вам ее осуществить
                        </h3>
                        <p>
                            Создайте ваше персональное
                            видео с помощью конструктора,
                            делитесь им в социальных сетях,
                            собирайте лайки и выигрывайте приз.
                        </p>
                        <Link to="/video/main" className="btn">создать видео</Link>
                        <a className="rules" href="/rules.pdf" target="_blank">Правила конкурса</a>
                    </div>

                    <div className="col">
                        <img src="/static/img/pic009.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
export default FirstScreen;
