import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/models/TeamModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})
export class DefaultModalComponent implements OnInit {

  selectedTeams: any[] = [];

  teams: Team[] = [];
  file_upload_name: String = '';

  constructor(
    public dialog: MatDialog,
    private rxjs: DataRxjsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DefaultModalComponent>,
  ) { }

  ngOnInit(): void {
    console.log('THIS DATA TEAMS', this.data);

    if (this.data.component == 1) {
      this.teams = this.data.teams;
    }
    
    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'league/' + fileName;
      }
    });
  }

  receivedTeams(event: any) {
    this.selectedTeams = event;
  }

  finishSelected() {
    let obj = {};

    if (this.data.component == 1) {
      obj = { result: this.selectedTeams, component: 1 };
    } else if (this.data.component == 2) {
      obj = { result: this.file_upload_name, component: 2 };
    }

    this.dialogRef.close(obj);

  }

  closeModal(): void {
    this.dialogRef.close();
  }
}