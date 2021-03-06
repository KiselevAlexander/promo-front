import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {STATIC_URL, API_BASE_URL} from 'consts';
import {DefaultPlayer as Video} from 'react-html5video';
import Share from 'common/share';
import {request} from 'managers/request';

import {getSuccessState} from 'selectors/global';

const BlockMessage = () => (
    <div className="blocked text-center color-white">
        <h1>К сожалению данное видео недоступно!</h1>
        Вы можете создать другое видео <br />
        <p className="mt-30">
            <Link to="/video/main" className="btn">Создать видео</Link>
        </p>
    </div>
);

const SuccessScreen = ({videoID}) => (
    <div className="grid-2 phablet-1 phone-1 flex">
        <div className="col success">

            <h3>ВАШЕ ВИДЕО ГОТОВО!</h3>
            <ol>
                <li>Поделитесь вашим видео в социальных сетях с хэштегом #Ингосстрах70 и #ingos70.</li>
                <li>Призывайте ваших друзей вас поддержать и собирайте лайки.</li>
                <li>
                    Авторы семи самых интересных роликов получат подарочную карту на осуществление своей мечты <br />
                    <small>
                        <a href="http://vpodarok.ru/vpodarokKart" style={{borderColor: '#fff'}} target="_blank">
                            Подробнее о карте
                        </a>
                    </small>
                </li>
            </ol>
            <Share count={false} session={videoID} />
            Ссылка на ваше видео: <br />
            <Link to={`/video/player/${videoID}`}>{`${location.origin}/video/player/${videoID}`}</Link>
        </div>
        <div className="col">
            <div className="videoHolder">
                <div id="player">
                    <Video
                        autoPlay={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        poster={`${STATIC_URL}static/images/${videoID}.jpg`}
                        onCanPlayThrough={() => {
                            // Do stuff
                        }}
                    >
                        <source src={`${STATIC_URL}static/video/${videoID}.mp4`} type="video/mp4" />
                    </Video>
                </div>
            </div>
        </div>
    </div>
);

const PlayerScreen = ({SHARE, videoID, success}) => (
    <div id="player">
        <div className="videoHolder">
            <Video
                autoPlay={false}
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                poster={`${STATIC_URL}static/images/${videoID}.jpg`}
                onCanPlayThrough={() => {
                    // Do stuff
                }}
            >
                <source src={`${STATIC_URL}static/video/${videoID}.mp4`} type="video/mp4" />
            </Video>
        </div>

        <div className="playerlink">
            Ссылка на ваше видео: <a href={`/video/player/${videoID}`}>
            {`${location.origin}/video/player/${videoID}`}
            </a>
        </div>

        {success &&
            <Link to="/video/main" className="btn right createAnotherVideo">Создать ещё видео</Link>
        }
        {!success &&
            <Link to="/video/main" className="btn right createAnotherVideo">Создать своё видео</Link>
        }
        <Share count={false} session={videoID} />
    </div>
);


class Player extends React.Component {

    state = {
        blocked: false
    };

    componentDidMount() {

        const {videoID} = this.props.params;

        request.get(`${API_BASE_URL}/getvideo/${videoID}`, null)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.blocked) {
                        this.setState({
                            blocked: true
                        });
                    }
                }
            });

    }

    render() {

        const {videoID} = this.props.params;
        const {success} = this.props;
        const {blocked} = this.state;


        const SHARE = {
            url: `${STATIC_URL}/player/${videoID}`,
            title: 'Создай свою мечту',
            description: '#ингосстрах#psychologies#mydream',
            image: `${STATIC_URL}/images/${videoID}.jpg`,
            picture: `${STATIC_URL}/images/${videoID}.jpg`
        };


        return (
            <div className="playerScreen" onWheel={this.wheelHandler}>
                <div className="firstSlide">
                    {success &&
                        <SuccessScreen
                            videoID={videoID}
                        />
                    }

                    {blocked &&
                        <BlockMessage />
                    }

                    {!blocked && !success &&
                        <PlayerScreen
                            SHARE={SHARE}
                            videoID={videoID}
                            success={success}
                        />
                    }
                </div>

                <div className="historiesLink">
                    <a href="/">Читать истории, изменившие жизнь</a>
                </div>

            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    success: getSuccessState(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);