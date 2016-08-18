import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<div class="container">
  <h1>My First Angular 2 App</h1>
  <my-accordion>
    <my-accordion-panel [title]="'test'" (titleClicked)="onClick()">
      test
    </my-accordion-panel>
    <my-accordion-panel [title]="'xxxxxxx'">
      <div>dfsfsfafs</div>
    </my-accordion-panel>
</my-accordion>
</div>
`
})
export class AppComponent {
  onClick(){
    console.log("---------------------clicked --------------");
  }
}
