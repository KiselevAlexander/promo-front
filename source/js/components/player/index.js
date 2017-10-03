import React from 'react';
import {STATIC_URL} from 'consts';
import {DefaultPlayer as Video} from 'react-html5video';
import {Icon} from 'common/icon';
import {
    ShareButtons,
    ShareCounts
} from 'react-share';

const Style = {
    icon: {
        width: '1.5em',
        height: '1.5em'
    }
};

class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        const {videoID} = this.props.params;

        const {
            FacebookShareButton,
            VKShareButton,
            OKShareButton,
            TwitterShareButton
        } = ShareButtons;

        const {
            FacebookShareCount,
            VKShareCount,
            OKShareCount
        } = ShareCounts;


        const SHARE = {
            url: `${STATIC_URL}/player/${videoID}`,
            title: 'Создай свою мечту',
            description: '#ингосстрах#psychologies#mydream',
            image: `${STATIC_URL}/images/${videoID}.jpg`
        };

        return (
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
                <ul className="shareBlock">
                    <li>
                        <FacebookShareButton {...SHARE}>
                            <Icon xlink="fb" style={Style.icon} />
                        </FacebookShareButton>
                        <FacebookShareCount url={SHARE.url}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </FacebookShareCount>
                    </li>
                    <li>
                        <VKShareButton {...SHARE}>
                            <Icon xlink="vk" style={Style.icon} />
                        </VKShareButton>
                        <VKShareCount url={SHARE.url}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </VKShareCount>
                    </li>
                    <li>
                        <OKShareButton {...SHARE}>
                            <Icon xlink="ok" style={Style.icon} />
                        </OKShareButton>
                        <OKShareCount url={SHARE.url}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </OKShareCount>
                    </li>
                    <li>
                        <TwitterShareButton
                            {...SHARE}
                            via="ингосстрах"
                            hashtags={['ингосстрах', 'psychologies', 'mydream']}
                        >
                            <Icon xlink="twitter" style={Style.icon} />
                        </TwitterShareButton>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Player;