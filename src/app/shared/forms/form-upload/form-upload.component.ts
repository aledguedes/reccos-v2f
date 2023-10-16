import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode, MatProgressBarModule } from '@angular/material/progress-bar';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  @Input() validationRXJS: boolean = false;

  file_upload_name: string = 'file_upload_name';

  hideAndShowProgressBar: boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 40;
  bufferValue = 0;

  baseUrl = environment.storage_url;

  constructor(
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    console.log('name file', this.validationRXJS);
  }

  picturesUpload(event: any) {
    let objFile = { file: event.target.files[0] }
    this.file_upload_name = event.target.files[0].name;
    this.rxjs.fileNameUpload(this.file_upload_name);
  }
}
