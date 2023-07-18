import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  file_name: String = "Preciso mudar o nome";

  uploadEvent(evt: any, arquivo: string) {
    let file = evt.target.files[0];
    this.uploadFile(file, arquivo);
  }

  uploadFile(file: any, arquivo: string) {
    let obj = {
      file: file
    }
  }

}
