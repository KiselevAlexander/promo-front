import {CURRENCIES} from 'consts';

/**
 * create human-readable number string
 * @param {(string|number)} value
 * @return {?string}
 * @example:
 * formatNumber(4700);  // '4 700'
 */
export const formatNumber = (value) => {
    if (value === null || value === undefined) {
        return null;
    }

    return value.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($2) $3-$4-$5');
};

/**
 * create human-readable card number string
 * @param {(string|number)} value
 * @return {?string}
 * @example:
 * formatNumber(1000288793);  // '10 0028 8793'
 */
export const formatCardNumber = (value) => {
    if (!value) {
        return null;
    }

    return value.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1 ');
};

/**
 * create human-readable price string
 * @param {(string|number)} value
 * @param {string} currency - currency code
 * @return {?string}
 * @example:
 * formatPrice(4700, 'USD');  // '4 700 $'
 */
export const formatPrice = (value, currency) => {
    if (!value) {
        return null;
    }

    const valueString = formatNumber(value);

    return `${valueString} ${CURRENCIES[currency].label}`;
};

/**
 * parse JSON-string to object
 * if an error return null
 * @param {?string} [value] - JSON-string
 * @return {?Object}
 * @example:
 * parseJson('{"key": "value"}');  // {key: 'value'}
 * parseJson('key value');         // null
 */
export const parseJson = (value) => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
};
/**
 * format first character to uppercase
 * @param {string} value
 * @return {string}
 * @example
 * ucfirst('hello');  // 'Hello'
 */
export const ucfirst = (value) => value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();

/**
 * return normalized name of user
 * @param {string} value
 * @example:
 * upperCaseName('john DOE');  // 'John Doe'
 */
export const upperCaseName = (value) => value.replace(/[\wа-яА-Я]\S*/g, ucfirst);

/**
 * return user address as string
 * @param {object} addressObject - address object
 * @return {string} - address as string
 */
export const addressToString = addressObject => {
    if (!addressObject) return null;
    if (typeof addressObject === 'string') return addressObject;
    const address = [];
    if (addressObject.city) {
        address.push(addressObject.city);
    }
    if (addressObject.address) {
        address.push(addressObject.address);
    }
    return address.join(', ');
};

/**
 * return user name as string
 * @param {object} initials - user name object
 * @param {bool} international - return international user name
 * @return {string} - user name as string
 */
export const usernameToString = (initials, international = false, short = false) => {
    if (!initials) return null;
    const data = (!international) ? initials.original : initials.international;
    if (typeof data === 'undefined') return '';

    const res = [];
    if (data.name) res.push(data.name);
    if (!short && data.secondName) res.push(data.secondName);
    if (data.surname) res.push(data.surname);

    return res.length ? res.join(' ').trim() : '';

};