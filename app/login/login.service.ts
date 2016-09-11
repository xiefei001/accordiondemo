import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

export interface User {
  account: string,
  sid: string,
  ssid: string
}

@Injectable()
export class LoginService {
  private loginURL = 'login'; // URL to the login web api
  constructor(private http: Http) {
  }

  public submitlogin(username: string, password: string): Observable<User> {
    let body = "username=" + username + "&password=" + password;
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});

    return this.http.post(this.loginURL, body,{headers: headers})
      .map(this.extractAccount)
      .catch(this.handleError);
  }


  private extractAccount(res: Response): User {
    return res.json() || {};
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'error');
  }
}
