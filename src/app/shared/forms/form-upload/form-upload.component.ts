import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode, MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent {

  file_name: string = 'file_name'
  hideAndShowProgressBar: boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 40;
  bufferValue = 0;

  picturesUpload(event: any) {
    let objFile = { file: event.target.files[0] }
    console.log('name file', objFile);
    this.file_name = event.target.files[0].name;
  }
}
