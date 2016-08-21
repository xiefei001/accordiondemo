import {Component, Input, Output, EventEmitter, style, animate, state, transition, trigger} from "@angular/core";
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
  <div class="panel-collapse"  [@active]="isIn">
    <div class="panel-body">
      <ng-content></ng-content>
    </div>
  </div>
</div>
`,
  animations: [
    trigger('active', [
      state('true', style({
        display:'block'
      })),
      state('false',   style({
        overflow: 'hidden',
        display: 'none',
        height: 0
      })),
      transition('true => false', animate(300)),
      transition('false => true', animate(300))
    ])
  ]
})
export class AccordionPanelComponent {
  @Input()
  title = '';

  isIn: string = "false";

  parent: AccordionComponent;
  id: number;

  setValue(parent: AccordionComponent, id: number) {
    this.parent = parent;
    this.id = id;
  }

  onClick() {
    this.parent.onClick(this.id);
  }
}
