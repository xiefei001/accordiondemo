import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs";

type FileUploadZustand ='UPLOADED'|'CANCELED'|'UPLOADING'| 'PREPARED';


export class FileUploadViewModel {
  zustand:FileUploadZustand = 'PREPARED';
  progress:number = 0.0;


  constructor(public file: File){}

  isReady() {
    return this.zustand != 'PREPARED';
  }

}

@Injectable()
export class FileUploadService {

  uploadFile(method: string, url: string, file: File): Observable<number> {
    return Observable.create((observer: Observer<number>) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = (event: ProgressEvent) => {
        if(xhr.readyState == 4) {
          if(xhr.status == 200) {
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event:ProgressEvent) => {
        observer.next(event.loaded / event.total);
      };

      let formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      // async
      xhr.open(method, url, true);
      xhr.send(formData);
    });
  }


}
