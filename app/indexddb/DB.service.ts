import {Injectable} from "@angular/core";

@Injectable()
export class DBService {
  private db: IDBDatabase;

  constructor() {

    var request: IDBOpenDBRequest = indexedDB.open("MyTestDatabase", 2);
    request.onerror = function (event) {
      // Generic error handler for all errors targeted at this database's requests!
      alert("Database error: " + (<IDBOpenDBRequest>event.target).error.name); // Maybe not work.

    };
    request.onsuccess = function (event: any) {
      this.db = (<IDBOpenDBRequest>event.target).result;
      var objectStore = this.db.transaction("customers", "readwrite").objectStore("customers");
      const customerData = [
        {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill1@company.com"},
        {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"}
      ];


      for (let i in customerData) {
        var addRequest = objectStore.add(customerData[i]);
        addRequest.onsuccess = function (event: any) {
          var result = (<IDBOpenDBRequest>event.target).result; // result === customer.ssn;
          console.log("result: " + result);
        };
        addRequest.onerror = function (event: any) {
          var result = (<IDBOpenDBRequest>event.target).result;
          console.log("error: " + result);
        }
      }
      var os = this.db.transaction("customers").objectStore("customers");

      os.openCursor().onsuccess = function (event: any) {
        var cursor = event.target.result;
        if (cursor) {
          console.log("Name for SSN " + cursor.key + " is " + cursor.value.name);
          cursor.continue();
        }
        else {
          console.log("No more entries!");
        }
      };

    };


    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.db = (<IDBOpenDBRequest>event.target).result;
      this.db.createObjectStore("customers", {keyPath: 'ssn'});
      //let params: IDBObjectStoreParameters = {keyPath: "mykey", autoIncrement: false};
      //var objectStore: IDBObjectStore = this.db.createObjectStore("storename", params);
    };
  }


  /*
   request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
   var objectStore: IDBObjectStore =
   var params: IDBIndexParameters = {unique: false};
   objectStore.createIndex("name", "name", params);
   objectStore.createIndex("email", "email", {unique: true});
   objectStore.transaction.oncomplete = (event) => {
   this.db.transaction("customers", "readwrite");
   };

   var transaction = db.transaction(["customers"], "readwrite");
   var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);
   var objectStore = transaction.objectStore("customers");

   };
   */
  initData() {


  }
}
