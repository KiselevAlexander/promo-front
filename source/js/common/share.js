import React from 'react';
import {STATIC_URL} from 'consts';
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



class Share extends React.Component {

    static defaultProps = {
        count: false
    };

    static propTypes = {
        count: React.PropTypes.bool
    };

    render() {

        const {count, session} = this.props;


        const SHARE = {
            url: `${STATIC_URL}/player/${session}`,
            title: 'Создай свою мечту',
            description: '#ингосстрах#psychologies#mydream',
            image: `${STATIC_URL}/images/${session}.jpg`,
            picture: `${STATIC_URL}/images/${session}.jpg`
        };

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

        return (
            <ul className="shareBlock">
                <li>
                    <FacebookShareButton {...SHARE}>
                        <Icon xlink="fb" style={Style.icon} />
                    </FacebookShareButton>
                    {count &&
                        <FacebookShareCount url={SHARE.url}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </FacebookShareCount>
                    }
                </li>
                <li>
                    <VKShareButton {...SHARE}>
                        <Icon xlink="vk" style={Style.icon} />
                    </VKShareButton>
                    {count &&
                        <VKShareCount url={SHARE.url}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </VKShareCount>
                    }
                </li>
                <li>
                    <OKShareButton {...SHARE}>
                        <Icon xlink="ok" style={Style.icon} />
                    </OKShareButton>
                    {count &&
                        <OKShareCount url={SHARE.url}>
                            {(shareCount) => (
                                <span className="count">{shareCount}</span>
                            )}
                        </OKShareCount>
                    }
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
        );
    }
}

export default Share;