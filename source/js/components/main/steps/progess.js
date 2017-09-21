import React from 'react';
import {Link} from 'react-router';
import CircularProgressbar from 'react-circular-progressbar';

class Progress extends React.Component {
    render() {

        const {percent, session} = this.props;

        return (
            <div className="progess">
                Создание видео: {percent} %

                <CircularProgressbar percentage={percent} />

                {session &&
                    <div>
                        <div className="success">

                            <h1>ВАШЕ ВИДЕО ГОТОВО!</h1>
                            <ol>
                                <li>Поделитесь вашим видео в социальных сетях.</li>
                                <li>Собирайте лайки.</li>
                                <li>Выигрывайте пакет страховых услуг для осуществления вашей мечты!</li>
                            </ol>
                        </div>
                        Ссылка на видео: <br />
                        <Link to={`/player/${session}`}>{`${location.origin}/player/${session}`}</Link>
                    </div>
                }
            </div>
        );
    }
}

export default Progress;