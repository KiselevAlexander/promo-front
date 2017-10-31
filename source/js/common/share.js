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
            url: `${STATIC_URL}video/player/${session}`,
            title: 'Создайте ваше персональное видео и осуществляйте ваши мечты!',
            description: 'Вдохновляйтесь историями людей, изменивших свою жизнь, делитесь своей мечтой и получите возможность ее осуществить. #Ингосстрах70 #ingos70',
            image: `${STATIC_URL}static/images/${session}-600x338.jpg`,
            picture: `${STATIC_URL}static/images/${session}-600x338.jpg`
        };

        const {
            VKShareButton,
            OKShareButton,
            TwitterShareButton
        } = ShareButtons;

        const {
            FacebookShareCount,
            VKShareCount,
            OKShareCount
        } = ShareCounts;
        const build_url = (url, params) => {
            let result = url;
            for (const name in params) {
                result += ~result.indexOf('?') ? '&' : '?';
                result += name + '=' + encodeURIComponent(params[name]);
            }
            return result;
        };

        return (
            <ul className="shareBlock">
                <li>
                    <div
                        role="button"
                        tabIndex="0"
                        className="SocialMediaShareButton SocialMediaShareButton--facebook"
                        onClick={() => {
                            const fbLink = build_url('https://www.facebook.com/sharer.php', {
                                u: SHARE.url,
                                title: 'Готовимся к лету: пошаговая инструкция по летнему макияжу от Глюк’оZы.',
                                description: '',
                                pic: `${STATIC_URL}/static/images/${session}-600x338.jpg`,
                            });
                            const width = 550;
                            const height = 400;
                            const left = window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2;
                            const top = window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2;

                            const config = {
                                height,
                                width,
                                left,
                                top,
                                location: 'no',
                                toolbar: 'no',
                                status: 'no',
                                directories: 'no',
                                menubar: 'no',
                                scrollbars: 'yes',
                                resizable: 'no',
                                centerscreen: 'yes',
                                chrome: 'yes'
                            };
                            window.open(fbLink, 'fbShareWindow', Object.keys(config).map((key) => {
                                return key + '=' + config[key];
                            }).join(', '));
                        }}
                    >
                        <Icon xlink="fb" style={Style.icon} />
                    </div>
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
                        via="Ингосстрах"
                        description="Вдохновитесь историями людей, делитесь мечтой и получите возможность ее осуществить"
                        hashtags={['Ингосстрах70', 'ingos70']}
                    >
                        <Icon xlink="twitter" style={Style.icon} />
                    </TwitterShareButton>
                </li>
            </ul>
        );
    }
}

export default Share;