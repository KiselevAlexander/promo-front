import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {STATIC_URL} from 'consts';
import {DefaultPlayer as Video} from 'react-html5video';
import Share from 'common/share';

import {getSuccessState} from 'selectors/global';

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
            <Link to={`/player/${videoID}`}>{`${location.origin}/player/${videoID}`}</Link>
        </div>
        <div className="col">
            <div className="videoHolder">
                <div id="player">
                    <Video
                        autoPlay={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        poster={`${STATIC_URL}/images/${videoID}.jpg`}
                        onCanPlayThrough={() => {
                            // Do stuff
                        }}
                    >
                        <source src={`${STATIC_URL}/video/${videoID}.mp4`} type="video/mp4" />
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
                poster={`${STATIC_URL}/images/${videoID}.jpg`}
                onCanPlayThrough={() => {
                    // Do stuff
                }}
            >
                <source src={`${STATIC_URL}/video/${videoID}.mp4`} type="video/mp4" />
            </Video>
        </div>
        <Share count={false} session={videoID} />
    </div>
);


class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        const {videoID} = this.props.params;
        const {success} = this.props;


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