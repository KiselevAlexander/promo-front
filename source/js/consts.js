export const DATE_MASK = 'DD.MM.YYYY';

export const CLIENT_ID = 'website_client';

export const CLIENT_SECRET = 'nA2REtuw$a-uZ?R3sw&s5A!UW2veDU3U';

// export const API_BASE_URL = 'http://api.mfork.ru/api/v1';
export const API_BASE_URL = 'http://localhost:9000/api/v1';

export const API_URLS = {
    CALLS: {
        IMPORT: API_BASE_URL + '/calls/import',
        EXPORT: API_BASE_URL + '/calls/export',
        EXCEPTIONS: API_BASE_URL + '/calls/exceptions'
    },
    USERS: {
        GETLIST: '/users'
    },
    GARBAGE: {
        EXPORT: '/garbage/export'
    }
};

export const PRIVATE_CACHE_FLAG = 'private';
