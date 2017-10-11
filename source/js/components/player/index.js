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
                <li>Поделитесь вашим видео в социальных сетях.</li>
                <li>Собирайте лайки.</li>
                <li>Выигрывайте пакет страховых услуг для осуществления вашей мечты!</li>
            </ol>
            <Share count={false} session={videoID} />
            Ссылка на видео: <br />
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

const PlayerScreen = ({SHARE, videoID}) => (
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
        <Link to="/main" className="btn right mt-20">Создать видео</Link>
        <Share count={false} session={videoID} />
    </div>
);


class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

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

        if (success) {
            return (
                <SuccessScreen
                    videoID={videoID}
                />
            );
        }

        if (blocked) {
            return (
                <BlockMessage />
            );
        }

        return (
            <PlayerScreen
                SHARE={SHARE}
                videoID={videoID}
            />
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