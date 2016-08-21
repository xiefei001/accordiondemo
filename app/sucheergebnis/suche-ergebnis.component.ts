import {Component, Input} from "@angular/core";

export class Column {
  constructor(public key:string, public viewName:string) {
  }
}
export class Sortieren {
  //default asc sortiert.
  direction:number = 1;
  key:string;

  sortieren(key:string, data:any[]) {
    if (this.key === key) {
      this.direction = -this.direction;
    } else {
      this.direction = 1;
    }
    this.key = key;

    data.sort((a, b) => {
      if (a[key] === b[key]) {
        return 0;
      } else if (a[key] > b[key]) {
        return this.direction;
      } else {
        return -this.direction;
      }
    });
  }
}


@Component({
  selector: 'suche-ergebnis',
  styles: [`
th:hover {
  cursor: pointer;
  background-color: #c0c0c0;
}
`],
  templateUrl: 'app/sucheergebnis/suche-ergebnis.component.html'
})
export class SucheErgebnisComponent {
  @Input()
  columns:Array<Column>;

  @Input()
  rows:Array<any>;

  sortieren:Sortieren = new Sortieren();

  setDisplayIcon(key:string) {
    return {
      "fa-sort-asc": key === this.sortieren.key && this.sortieren.direction > 0,
      "fa-sort-desc": key === this.sortieren.key && this.sortieren.direction < 0
    };
  }

  sort(key:string) {
    this.sortieren.sortieren(key, this.rows);
  }

  setClasses() {

  }
}
