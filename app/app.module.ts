import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {AccordionPanelComponent} from "./accordion/accordion-panel.component";
import {AccordionComponent} from "./accordion/accordion.component";
//import {SucheFormComponent} from "./suche/suche-form.component";
import {SucheFormModule} from "./suche/suche-form.module";
import {LoginComponent} from "./login/login.component";
import {SucheErgebnisComponent} from "./sucheergebnis/suche-ergebnis.component";
import {BegehungComponent} from "./begehung/begehung.component";

@NgModule({
  imports: [BrowserModule, SucheFormModule],
  declarations: [AppComponent, AccordionPanelComponent,
    AccordionComponent, LoginComponent, SucheErgebnisComponent, BegehungComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
