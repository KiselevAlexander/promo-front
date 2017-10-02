import React from 'react';
import Modal from 'common/modal';

const FirstScreen = ({onClickNext}) => (
    <div className="welcomeScreen">
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
                <button className="btn" onClick={onClickNext}>создать видео</button>
                <a href="#!">Правила конкурса</a>
            </div>
            <div className="col">
                <div className="videoHolder">
                    <img src="/static/img/pic011.jpg" alt="" />
                </div>
            </div>
        </div>
        <Modal
            open={true}
            title="Правила конкурса"
        >
            <ul>
                <li>1. </li>
                <li>2. </li>
                <li>3. </li>
            </ul>
        </Modal>
    </div>
);

export default FirstScreen;
