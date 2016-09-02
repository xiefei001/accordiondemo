/**
 * Created by xie.fei on 02.09.2016.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class DBService {
  db: IDBDatabase;

  constructor(private databaseName: string, private databaseVersion: number) {

    var db: IDBDatabase;
    var request: IDBOpenDBRequest = indexedDB.open("MyTestDatabase");
    request.onerror = function (event) {
      // Generic error handler for all errors targeted at this database's requests!
      alert("Database error: " + (<IDBOpenDBRequest>event.target).error.name); // Maybe not work.

    };
    request.onsuccess = function (event) {
      db = (<IDBOpenDBRequest>event.target).result;
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.db = (<IDBOpenDBRequest>event.target).result;
      let params: IDBObjectStoreParameters = {keyPath: "mykey", autoIncrement: false};
      var objectStore: IDBObjectStore = this.db.createObjectStore("storename", params);
    };

    const customerData = [
      {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com"},
      {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"}
    ];
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      var objectStore: IDBObjectStore = this.db.createObjectStore("customers", {keyPath: 'ssn'});
      var params: IDBIndexParameters = {unique: false};
      objectStore.createIndex("name", "name", params);
      objectStore.createIndex("email", "email", {unique: true});
      objectStore.transaction.oncomplete = (event) => {
        this.db.transaction("customers", "readwrite");
      }
    };
  }
}
