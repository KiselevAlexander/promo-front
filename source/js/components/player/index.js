import React from 'react';
import {STATIC_URL} from 'consts';
import {DefaultPlayer as Video} from 'react-html5video';
import {Icon} from 'common/icon';
import {vk} from 'utils/social-auth/vk';

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

const SHARE = {
    url: location.href,
    title: 'Создай свою мечту',
    description: '#ингосстрах#psychologies#mydream',
    image: `${STATIC_URL}/static/img/pic011.jpg`
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
            GooglePlusShareButton,
            VKShareButton,
            OKShareButton,
            TwitterShareButton
        } = ShareButtons;

        const {
            FacebookShareCount,
            GooglePlusShareCount,
            VKShareCount,
            OKShareCount
        } = ShareCounts;

        const shareUrl = location.href;

        return (
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
                <ul className="shareBlock">
                    <li>
                        <FacebookShareButton {...SHARE}>
                            <Icon xlink="fb" style={Style.icon} />
                        </FacebookShareButton>
                        <FacebookShareCount url={shareUrl}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </FacebookShareCount>
                    </li>
                    <li>
                        <VKShareButton {...SHARE}>
                            <Icon xlink="vk" style={Style.icon} />
                        </VKShareButton>
                        <VKShareCount url={shareUrl}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </VKShareCount>
                    </li>
                    <li>
                        <OKShareButton {...SHARE}>
                            <Icon xlink="ok" style={Style.icon} />
                        </OKShareButton>
                        <OKShareCount url={shareUrl}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </OKShareCount>
                    </li>
                    <li>
                        <TwitterShareButton {...SHARE}>
                            <Icon xlink="twitter" style={Style.icon} />
                        </TwitterShareButton>
                    </li>
                    <li>
                        <GooglePlusShareButton {...SHARE}>
                            <Icon xlink="google-plus" style={Style.icon} />
                        </GooglePlusShareButton>
                        <GooglePlusShareCount url={shareUrl}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </GooglePlusShareCount>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Player;