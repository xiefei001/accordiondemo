import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {AccordionPanelComponent} from "./accordion/accordion-panel.component";
import {AccordionComponent} from "./accordion/accordion.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, AccordionPanelComponent, AccordionComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
