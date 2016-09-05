import {Injectable} from "@angular/core";
@Injectable()
export class ImageService {
  imageSize: number = 1280;

  public onImageCaptured(file: File) {
    console.log(file.name);
    if (file.size > 15 * 1024 * 1024) {
      console.log("file too large, aborting...");
      return;
    }

    let fileReader: FileReader = new FileReader();
    fileReader.onerror = (event: Event) => {
      if (fileReader.error && fileReader.error.name) {
        console.log(fileReader.error.name);
      } else {
        console.log("loaded file");
      }
    }
  }
}
