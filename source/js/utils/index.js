import Url from 'url';
import fetch from 'utils/fetch';
import 'url-search-params-polyfill';

/**
 * create signature for http-request
 * @param {string} url
 * @param {Object} params - get-parameters
 * @param {Object} data - body
 * @return {string} signature
 */

export const request = (token, url, params, method = 'GET') => {
    const headers = new Headers();
    const isGet = method === 'GET';

    if (isGet && params) {
        params = {
            json: encodeURIComponent(JSON.stringify(params))
        };
    } else {
        headers.append('Content-type', 'application/json');
    }

    return fetch(isGet ? url + Url.format({query: params}) : url, {
        headers,
        method,
        body: isGet ? null : JSON.stringify(params)
    });
};

export const parseQueryString = (query) => {
    const vars = query.split('&');
    const queryString = {};
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (typeof queryString[pair[0]] === 'undefined') {
            queryString[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof queryString[pair[0]] === 'string') {
            queryString[pair[0]] = [queryString[pair[0]], decodeURIComponent(pair[1])];
        } else {
            queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return queryString;
}