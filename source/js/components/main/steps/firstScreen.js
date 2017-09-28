import React from 'react';

const FirstScreen = ({onNextClick}) => (
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
            </div>
            <div className="col">
                <div className="videoHolder">
                    <img src="/static/img/pic011.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>
);

export default FirstScreen;