import {Component} from '@angular/core';
import {Column} from "./sucheergebnis/suche-ergebnis.component";

@Component({
  selector: 'my-app',
  template: `
<!--
<div class="container">
  <h1>My First Angular 2 App</h1>
  <my-accordion>
    <my-accordion-panel [title]="'test'">
      test
    </my-accordion-panel>
    <my-accordion-panel [title]="'xxxxxxx'">
      <div>dfsfsfafs</div>
    </my-accordion-panel>
     <my-accordion-panel [title]="'ccccccccccccccc'">
      <div>dfsfsfafs</div>
      <div>dfsfsfafs</div>
      <div>dfsfsfafs</div>
    </my-accordion-panel>
</my-accordion> 
</div>
-->
<my-login></my-login>
<suche-ergebnis [columns]="columns" [rows]="rows"></suche-ergebnis>
`
})
export class AppComponent {
  columns:Column[] = [
    new Column("apl", "APL-Nr"),
    new Column("strasse", "Straße"),
    new Column("roehrchen", "Röhrchen-Nr")
  ];
  rows:any[] = [
    {apl: 'F_160_01_APL_0001', strasse: 'Clemsstraße 86', roehrchen: 'F_160_01_24_0001'},
    {apl: 'F_160_01_APL_0002', strasse: 'Clemsstraße 86 RGB', roehrchen: 'F_160_01_24_0002'},
    {apl: 'F_160_01_APL_0003', strasse: 'Clemsstraße 88', roehrchen: 'F_160_01_24_0003'},
    {apl: 'F_160_01_APL_0004', strasse: 'Clemsstraße 90', roehrchen: 'F_160_01_24_0004'},
    {apl: 'F_160_01_APL_0005', strasse: 'Clemsstraße 92', roehrchen: 'F_160_01_24_0005'},
    {apl: 'F_160_01_APL_0006', strasse: 'Clemsstraße 94', roehrchen: 'F_160_01_24_0006'}
  ]
}
