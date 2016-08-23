import {Component} from "@angular/core";
import {FileUploadService} from "./file-upload.service";
@Component({
  selector: 'file-upload',
  templateUrl: 'app/fileupload/file-upload.component.html',
  styles:[`
.btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
}`],
  providers: [FileUploadService]
})
export class FileUploadComponent{
  constructor(private fieUploadService: FileUploadService){}
}
