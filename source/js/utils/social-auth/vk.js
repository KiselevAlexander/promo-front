import Url from 'url';

export const vk = {
    NETWORK: 'vk',
    REDIRECTURI: 'http://localhost:3001/success',
    AUTH_LINK: 'https://oauth.vk.com/authorize',
    APP_ID: 6090214,
    VERSION: '5.65',

    auth() {
        const queryParams = Url.format({
            query: {
                client_id: this.APP_ID,
                display: 'popup',
                redirect_uri: this.REDIRECTURI,
                scope: 'email, account, profile',
                response_type: 'token',
                v: this.VERSION,
                revoke: 0
            }
        });
        window.open(this.AUTH_LINK + queryParams, 'VK auth', 'width=665, height=370');
    }
};