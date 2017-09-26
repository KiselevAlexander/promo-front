import Url from 'url';
import {cacheManager as storage} from 'utils/cache-manager';
import {parseQueryString} from 'utils';


export const vk = {
    NETWORK: 'vk',
    REDIRECTURI: 'http://localhost:3001/success',
    AUTH_LINK: 'https://oauth.vk.com/authorize',
    APP_ID: 6197614,
    VERSION: '5.65',

    callback: {
        'success': () => {},
        'error': () => {}
    },

    auth() {
        const queryParams = Url.format({
            query: {
                client_id: this.APP_ID,
                display: 'popup',
                redirect_uri: this.REDIRECTURI,
                scope: 'email, account, profile, video',
                response_type: 'token',
                v: this.VERSION,
                revoke: 0
            }
        });

        window.open(this.AUTH_LINK + queryParams, 'VK auth', 'width=665, height=370');

        this.subscribe();
    },

    subscribe() {
        window.addEventListener('storage', this.eventListener);
    },

    eventListener(event) {
        if (event.key === 'social_auth') {

            window.removeEventListener('storage', this.eventListener);

            const data = JSON.parse(event.newValue);

            if (data.error) {

            }

        }
        console.log(event);
    },

    watcher() {
        const hash = location.hash.substr(1);
        const result = parseQueryString(hash);

        localStorage.setItem('social_auth', JSON.stringify(result));

    }
};