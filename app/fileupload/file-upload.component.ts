import {Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, NgZone} from "@angular/core";
import {FileUploadService, FileUploadViewModel} from "./file-upload.service";
import {DBService} from "../indexeddb/DB.service";

@Component({
  selector: 'file-upload',
  templateUrl: 'app/fileupload/file-upload.component.html',
  providers: [FileUploadService, DBService]
})
export class FileUploadComponent {

  public autoUpload: boolean = false;
  public fileUploadViewModels: Array<FileUploadViewModel> = [];

  uploader = {
    isUploading: false,
    queue: [1, 2]
  };

  constructor(private fileUploadService: FileUploadService,
              private dbService: DBService,
              private zone: NgZone) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    dbService.initData();
  }

  onFileLoaderChange(event: any) {
    let file: File = event.target.files[0];
    if (file != null) {
      this.fileUploadViewModels.push(new FileUploadViewModel(file));
    }
    //let accept = event.target.attributes.accept.value;
    //console.log(file.name + " " + accept);
    console.log(typeof file);
    console.log(file instanceof File);
    //this.fileUploadService.uploadFile(file)
  }

  upload(i: number) {
    let fileUploadViewModel: FileUploadViewModel = this.fileUploadViewModels[i];
    this.fileUploadService.uploadFile('POST', 'http://localhost:8080/upload', fileUploadViewModel.file)
      .subscribe(n => {
        console.log("progress: " + fileUploadViewModel.progress);
        this.zone.run(()=> {
          fileUploadViewModel.progress = n
        });
      }, err => {
        console.log("error: " + err);
      }, ()=> {
        fileUploadViewModel.zustand = 'UPLOADED';
      });
  }

  uploadAll() {

  }

  cancelAll() {
  }

  clearAll() {
  }


}

