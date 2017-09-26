import React from 'react';
import {Link} from 'react-router';
import CircularProgressbar from 'react-circular-progressbar';
import {STATIC_URL} from 'consts';
import Share from 'common/share';
import {DefaultPlayer as Video} from 'react-html5video';

class Progress extends React.Component {
    render() {

        const {percent, session} = this.props;

        return (
            <div className="progress">
                {!session &&
                    <div className="flex progress-status">
                        <CircularProgressbar
                            percentage={percent || 0}
                        />
                    </div>
                }
                {session &&
                    <div className="grid-2 phablet-1 phone-1 flex">
                        <div className="col success">

                            <h3>ВАШЕ ВИДЕО ГОТОВО!</h3>
                            <ol>
                                <li>Поделитесь вашим видео в социальных сетях.</li>
                                <li>Собирайте лайки.</li>
                                <li>Выигрывайте пакет страховых услуг для осуществления вашей мечты!</li>
                            </ol>
                            <Share count={false} />
                            Ссылка на видео: <br />
                            <Link to={`/player/${session}`}>{`${location.origin}/player/${session}`}</Link>
                        </div>
                        <div className="col">
                            <div className="videoHolder">
                                <div id="player">
                                    <Video
                                        autoPlay={true}
                                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                        poster={`${STATIC_URL}/images/${session}.jpg`}
                                        onCanPlayThrough={() => {
                                            // Do stuff
                                        }}
                                    >
                                        <source src={`${STATIC_URL}/video/${session}.mp4`} type="video/mp4" />
                                    </Video>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Progress;