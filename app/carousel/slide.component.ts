import {Component, HostBinding, Input} from "@angular/core";
import {CarouselComponent} from "./carousel.component";
@Component({
  selector: 'slide',
  template: `
  <div [class.active]="active" class="item text-center">
    <ng-content></ng-content>
  </div>
`
})
export class SlideComponent {

  @Input()
  public index: number;

  @HostBinding('class.active')
  public active: boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass: boolean = true;


}
