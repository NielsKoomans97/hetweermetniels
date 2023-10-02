export class CookieManager {
    cookie = document.cookie;

    ListCookies() {
        cookie = document.cookie;
        let cookies = [];
        let parts = cookie.split(';');

        for (part of parts) {
            let keyvalue = part.split('=');
            let key = keyvalue[0].replace(' ', '');
            let value = keyvalue[1];
            cookies.push(new Cookie(key, value));
        }

        return cookies;
    }

    RemoveAllCookies() {
        document.cookie = "";
    }

    GetCookie(query) {
        cookie = document.cookie;
        let parts = cookie.split(';');

        for (part of parts) {
            let keyvalue = part.split('=');
            let key = keyvalue[0].replace(' ', '');
            let value = keyvalue[1];

            if (key == query) {
                return new Cookie(key, value);
            }
        }
    }

    HasCookie(query) {
        cookie = document.cookie;
        let parts = cookie.split(';');

        for (part of parts) {
            let keyvalue = part.split('=');
            let key = keyvalue[0].replace(' ', '');

            if (key == query) {
                return true;
            }
        }
    }

    SaveCookie(cookie) {
        document.cookie = `${cookie.Key}=${cookie.Value}`
    }
}

export class Cookie {
    constructor(key, value) {
        this.Key = key;
        this.Value = value;
    }
}
