import {
  Component, HostBinding, Input, trigger, state, style, transition, animate, group, OnInit,
  ElementRef, ChangeDetectionStrategy, Renderer
} from "@angular/core";
import {CarouselComponent} from "./carousel.component";
@Component({
  selector: 'slide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
`,

  /*animations: [
   trigger('flyInOut', [
   state('in', style({opacity: 1, transform: 'translateX(0)'})),
   state('out', style({opacity: 1, transform: 'translateX(100%)'})),
   transition('out => in', [
   animate('2s 2000 ease-out', style({
   opacity: 1,
   transform: 'translateX(0)'
   }))
   ]),
   transition('in => out', [
   animate(1000, style({transform: 'scale(5)'})),
   animate(1000, style({transform: 'translateX(100%)'})),

   ]),
   ])
   ]*/

})
export class SlideComponent {

  nativeElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer){
    this.nativeElement = elementRef.nativeElement;
  }


  @HostBinding('class.active')
  public active: boolean;

  @HostBinding('class.left')
  public hasLeft: boolean;

  @HostBinding('class.right')
  public hasRight: boolean;

  @HostBinding('class.next')
  public hasNext: boolean;

  @HostBinding('class.prev')
  public hasPrev: boolean;

  @HostBinding('class.item')
  public addClass: boolean = true;

  setClass(name:string, isAdd:boolean){
    this.renderer.setElementClass(this.nativeElement, name, isAdd);
 }

}
