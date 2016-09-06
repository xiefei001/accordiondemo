import {Component, ContentChildren, QueryList, AfterContentInit, OnInit, Input} from "@angular/core";
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

  @Input()
  currentActivePanelId: number = 0;

  @ContentChildren(AccordionPanelComponent) panelComponents: QueryList<AccordionPanelComponent>;


  ngAfterContentInit(): void {
    this.panelComponents.forEach((panel, index, arrs) => {
      panel.setValue(this, index);
      if (index === this.currentActivePanelId) {
        panel.isIn = "true";
      }
    });
  }

  onClick(id: number) {
    let activePanel = this.panelComponents.filter((panel, index) => index === this.currentActivePanelId)[0];
    if (this.currentActivePanelId === id) {
      if (activePanel.isIn === "true") {
        activePanel.isIn = 'false';
      } else {
        activePanel.isIn = 'true';
      }
    } else {
      activePanel.isIn = "false";
      this.panelComponents.filter((panel, index) => index === id)[0].isIn = 'true';
      this.currentActivePanelId = id;
    }


  }

}
