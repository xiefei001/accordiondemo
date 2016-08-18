import {Component, Input, Output, EventEmitter} from "@angular/core";
import {AccordionComponent} from "./accordion.component";
import id = webdriver.By.id;
@Component({
  selector: 'my-accordion-panel',
  template: `
<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a (click)="onClick()">{{title}}</a>
    </h4>
  </div>
  <div class="panel-collapse collapse" [ngClass]="{in: isIn}">
    <div class="panel-body">
      <ng-content></ng-content>
    </div>
  </div>
</div>
`
})
export class AccordionPanelComponent {
  @Input()
  title = '';

  @Input()
  isIn:boolean = true;

  parent: AccordionComponent;
  id:number;
  setValue(parent: AccordionComponent, id:number){
    this.parent = parent;
    this.id = id;
  }

  onClick(){
    this.parent.onClick(this.id);
  }
}
