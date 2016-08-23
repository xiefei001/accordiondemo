import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SucheFormComponent} from "./suche-form.component";
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SucheFormComponent],
  exports: [SucheFormComponent]
})
export class SucheFormModule {
}
