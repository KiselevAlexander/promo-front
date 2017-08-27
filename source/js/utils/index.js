import _ from 'lodash';
import Url from 'url';
import CryptoJS from 'crypto-js';
import fetch from 'utils/fetch';
import 'url-search-params-polyfill';

import {CLIENT_SECRET} from 'consts';

/**
 * create signature for http-request
 * @param {string} url
 * @param {Object} params - get-parameters
 * @param {Object} data - body
 * @return {string} signature
 */
export const signData = (url, params, data) => {
    const dataString = data && JSON.stringify(data);
    const paramsString = _.chain(params)
        .toPairs()
        .sortBy(0) // sort by keys alphabetically
        .map((pair) => _.join(pair, ':')) // join key and value
        .join('|')
        .value();
    const message = _.chain([url, paramsString, dataString]).compact().join('+').value();

    const hash = CryptoJS.HmacSHA256(message, CLIENT_SECRET);
    return CryptoJS.enc.Base64.stringify(hash);
};

export const request = (token, url, params, method = 'GET') => {
    const headers = new Headers();
    const isGet = method === 'GET';

    headers.append('Authorization', 'Bearer ' + token);

    if (isGet && params) {
        params = {
            json: encodeURIComponent(JSON.stringify(params))
        };
    } else {
        headers.append('Content-type', 'application/json');
    }

    headers.append('X-Utair-Signature', signData(url, isGet ? params : null, isGet ? null : params));

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