import {Component} from "@angular/core";
import {FileUploadService, FileUploadViewModel, FileUploadZustand} from "./file-upload.service";

@Component({
  selector: 'file-upload',
  templateUrl: 'app/fileupload/file-upload.component.html',
  providers: [FileUploadService]
})
export class FileUploadComponent {

  public autoUpload: boolean = false;
  public fileUploadViewModels: Array<FileUploadViewModel> = [];

  uploader = {
    isUploading: false,
    queue: [1, 2]
  };

  constructor(private fileUploadService: FileUploadService) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
    let fileUploadViewModel:FileUploadViewModel = this.fileUploadViewModels[i];
    this.fileUploadService.uploadFile('POST', 'http://localhost:8080/upload', fileUploadViewModel.file)
      .subscribe(n =>{
        fileUploadViewModel.progress = n;
        console.log("n = ", n);
      }, err =>{}, () =>{
        fileUploadViewModel.zustand = FileUploadZustand.UPLOADED;
      });
  }

  uploadAll() {

  }

  cancelAll() {
  }

  clearAll() {
  }


}
