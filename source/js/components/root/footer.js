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

const SHARE = {
    url: location.origin + '/video/',
    title: 'Создайте ваше персональное видео и осуществляйте ваши мечты!\n',
    description: 'Вдохновляйтесь историями людей, изменивших свою жизнь, делитесь своей мечтой и получите возможность ее осуществить. ',
    image: `${STATIC_URL}/share.jpg`
};


class Footer extends React.Component {
    render() {

        const {
            FacebookShareButton,
            VKShareButton,
            OKShareButton,
            TwitterShareButton
        } = ShareButtons;

        return (
            <footer>
                <div className="wrapper">
                    <div className="grid-2 phone-1 flex">
                        <div className="col flex flex-middle">
                            <a href="http://70.ingos.ru/" target="_blank" className="logo">
                                <img src="/static/img/ingos_logo.png" alt="" />
                            </a>
                        </div>
                        <div className="col flex flex-middle">

                            <div className="share">
                                <ul>
                                    <li>
                                        <FacebookShareButton {...SHARE}>
                                            <Icon xlink="fb" style={Style.icon} />
                                        </FacebookShareButton>
                                    </li>
                                    <li>
                                        <VKShareButton {...SHARE}>
                                            <Icon xlink="vk" style={Style.icon} />
                                        </VKShareButton>
                                    </li>
                                    <li>
                                        <OKShareButton {...SHARE}>
                                            <Icon xlink="ok" style={Style.icon} />
                                        </OKShareButton>
                                    </li>
                                    <li>
                                        <TwitterShareButton
                                            {...SHARE}
                                            via="ингосстрах"
                                            hashtags={['Ингосстрах70', 'ingos70']}
                                        >
                                            <Icon xlink="twitter" style={Style.icon} />
                                        </TwitterShareButton>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;