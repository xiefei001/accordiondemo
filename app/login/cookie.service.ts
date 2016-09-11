import {Injectable} from "@angular/core";

Injectable()
export class CookieService {

  //private expires = new Date(2050, 0, 0);

  //private path = "/";
  //private secure = false;

  setCookies(sid: string, ssid: string) {

  }

  setCookie(name: string, value: string, expires?: string, path?: string, domain?: string, secure?: boolean) {
    let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
    if (expires) {
      let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
      cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
    }
    if (path) {
      cookieStr += 'path=' + path + ';';
    }
    if (domain) {
      cookieStr += 'domain=' + domain + ';';
    }
    if (secure) {
      cookieStr += 'secure;';
    }

    // console.log(cookieStr);
    document.cookie = cookieStr;

  }
}
