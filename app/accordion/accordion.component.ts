import {Component, ContentChildren, QueryList, AfterContentInit} from "@angular/core";
import {AccordionPanelComponent} from "./accordion-panel.component";
@Component({
  selector: 'my-accordion',
  template: `
<div class="panel-group">
<!--<ng-content select="my-accordion-panel"></ng-content>-->
  <ng-content></ng-content>
</div>
`
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(AccordionPanelComponent) panelComponents:QueryList<AccordionPanelComponent>;

  ngAfterContentInit():void {
    this.panelComponents.forEach((panel, index, arrs) => {
      panel.setValue(this, index);
      if (index == 0) {
        panel.isIn = true;
      } else {
        panel.isIn = false;
      }
    });
  }

  onClick(id:number) {
    console.log(`id is clicked ${id}`);
    this.activate(id);
  }

  activate(id:number) {
    this.panelComponents.forEach((panel, index, arrs) => {
      if (id === index) {
        panel.isIn = true;
      } else {
        panel.isIn = false;
      }
    });
  }
}
