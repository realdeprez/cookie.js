/**
 * Cookies. Mmm.
 * @name        Cookie
 * @class
 * @version     1.0
 * @author      <a href="mailto:real.deprez@gmail.com">Real Deprez</a>
 */
Cookie = window.Cookie || {
    /**
     * Version number.
     * @name        VERSION
     * @memberOf    Cookie
     */
    VERSION: '1.0',
    /**
     * Custom date string to time.
     * @name        _strToTime
     * @methodOf    Cookie
     * @returns     {Number} Time in milliseconds.
     */
    _strToTime: function (string) {
        (/^([\d\.\-]+)([a-z])$/).test(string);
        var array = [Number(RegExp.$1, 10), RegExp.$2],
            mult;
        switch (array[1]) {
            case 'm':
                mult = 60000;
                break;
            case 'h':
                mult = 3600000;
                break;
            case 'd':
                mult = 86400000;
                break;
            default:
                mult = false;
        }
        return (mult) ? array[0] * mult : false;
    },
    /**
     * Set a cookie.
     * @name        set
     * @methodOf    Cookie
     * @param       {Object} name Cookie name.
     * @param       {String} value Cookie value.
     * @param       {Object} options Options object.
     * @param       {String} options.path Cookie path, defaults to /.
     * @param       {String} options.domain Cookie domain, defaults to window.location.hostname.
     * @param       {String} options.expires Expires in number + m|h|d. ex '30d' for 30 days. None sets session cookie.
     * @param       {Boolean} options.secure Secure flag.
     * @returns     {Boolean} True on success.
     */
    set: function (name, value, options) {
        options = options || {};
        if (name && (typeof value !== 'undefined')) {
            var nameValue = name + '=' + encodeURIComponent(value),
                expires = ''; // session
            if (options.expires) {
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + this._strToTime(options.expires));
                expires = '; expires=' + expirationDate.toUTCString();
            }
            var path = '; path=' + (options.path || '/'),
                domain = '; domain=' + (options.domain || window.location.hostname),
                secure = options.secure ? '; secure' : '';
            //if (window.console) {console.log('cookie= \'' + nameValue + expires + path + domain + secure + '\'');}
            document.cookie = nameValue + expires + path + domain + secure;
            return true;
        }
        return false;
    },
    /**
     * Get a cookie.
     * @name        get
     * @methodOf    Cookie
     * @param       {String} name Cookie name.
     * @returns     {String|Boolean} Cookie value or false if cookie doesn't exist.
     */
    get: function (name) {
        var sects = document.cookie.split(/;\s/g),
            length = name.length + 1;
        for (var i = 0, len = sects.length; i < len; i++) {
            // does this string begin with the name?
            if (sects[i].substring(0, length) == (name + '=')) {
                return decodeURIComponent(sects[i].substring(length));
            }
        }
        return false;
    },
    /**
     * Delete a cookie.
     * @name        remove
     * @methodOf    Cookie
     * @param       {String} name Cookie name.
     * @param       {Object} options Options (see set).
     * @returns     {Boolean} True on success.
     */
    remove: function (name, options) {
        if (name) {
            options = options || {};
            options.expires = '-1m';
            return this.set(name, '', options);
        }
        return false;
    }
};