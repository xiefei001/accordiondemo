import {Component, EventEmitter, Output} from "@angular/core";
import {CarouselComponent} from "../carousel/carousel.component";
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
`]
})
export class LoginComponent {

  @Output()
  nextStepRequest = new EventEmitter();

  login() {
    this.nextStepRequest.emit(0);
  }
}
