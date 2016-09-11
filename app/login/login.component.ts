import {Component, EventEmitter, Output} from "@angular/core";

// Add the RxJS Observable operators.
import './rxjs-operators';
import {LoginService, User} from "./login.service";
import {CookieService} from "./cookie.service";


@Component({
  selector: 'my-login',
  templateUrl: 'app/login/login.html',
  styles: [`
.btn-circle {
  width: 120px;
  height: 120px;
  text-align: center;
  padding: 15px 0;
  font-size: 90px;
  border-radius: 60px;
  margin-top: 40px;
  margin-bottom: 40px;
}
`],
  providers: [LoginService, CookieService]
})
export class LoginComponent {

  constructor(private loginService: LoginService, private cookieService: CookieService) {
  }

  @Output()
  nextStepRequest = new EventEmitter<User>();

  login(username: string, password: string) {
    this.loginService.submitlogin(username, password)
      .subscribe(
        user => this.nextStepRequest.emit(user),
        error => console.log(error),
        () => console.log("authentication complete")
      );
  }
  afterSuccessLogin(user: User) {
    this.nextStepRequest.emit(user);
    let sid:string = user.sid;
    let ssid:string = user.ssid;
    this.cookieService.setCookies(sid, ssid);
  }
}
