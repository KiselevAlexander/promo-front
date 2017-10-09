import React from 'react';
import {Link} from 'react-router';
import Modal from 'common/modal';

class FirstScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rulesOpen: false
        };
    }

    rulesClickHandler = () => this.setState({rulesOpen: true});

    rulesModelCloseHandler = () => this.setState({rulesOpen: false});

    render() {

        const {rulesOpen} = this.state;

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
                            Создайте ваше персональное,
                            видео с помощью конструктора,
                            делитесь им в социальных сетях,
                            собирайте лайки и выигрывайте приз.
                        </p>
                        <Link to="/main" className="btn">создать видео</Link>
                        <a className="rules" href="#!" onClick={this.rulesClickHandler}>Правила конкурса</a>
                    </div>
                    <div className="col">
                        <div className="videoHolder">
                            <img src="/static/img/pic011.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <Modal
                    open={rulesOpen}
                    title="Правила конкурса"
                    onClose={this.rulesModelCloseHandler}
                >
                    <ul>
                        <li>1. </li>
                        <li>2. </li>
                        <li>3. </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}
export default FirstScreen;
