import {Component} from "@angular/core";
import {ImageService} from "./image.service";
@Component({
  selector: 'begehung',
  templateUrl: 'app/begehung/begehung.component.html',
  providers:[ImageService]
})
export class BegehungComponent{
  constructor(private imageService: ImageService){}

  public onImageCaptured(event:any) {
    let file: File = event.target.files[0];
    this.imageService.onImageCaptured(file);
  }
}
