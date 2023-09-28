import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/models/TeamModel';
import { TeamService } from 'src/app/services/team/team.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})
export class DefaultModalComponent implements OnInit {

  teams: Team[] = [];
  selectedTeams: any[] = [];

  allTeams: boolean = false;

  baseUrl = environment.storage_url;

  constructor(
    public dialog: MatDialog,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<DefaultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('THIS DATA TEAMS', this.data);

    if (this.data.component == 'add_teams_league') {
      this.data.teams.forEach((item: any) => {
        if (item.check == '1') {
          this.selectedTeams.push(item);
        }
      });
      this.teams = this.data.teams;
    }
  }

  selectAll(evt: any) {
    this.teams.forEach((item: any) => {
      if (item.check == '0') {
        item.check = '1';
        this.selectedTeams.push(item);
      }
    });
    this.allTeams = true;
  }

  teamSelected(idx: number, check: string, id: number) {
    if (check == '1') {
      this.teams[idx].check = '0';
      this.selectedTeams.splice(this.selectedTeams.findIndex((item: any) => item.id == id), 1);
      this.allTeams = false;
    } else {
      this.teams[idx].check = '1';
      this.selectedTeams.push((this.teams[idx]));
      this.verifySlecetedAllTeams();
    }
  }

  verifySlecetedAllTeams() {
    let totalTeams = this.teams.length;
    let totalSelectedTeams = this.selectedTeams.length;

    if (totalSelectedTeams === totalTeams) {
      this.allTeams = true;
    }
  }

  finishSelected() {
    this.dialogRef.close(this.selectedTeams);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}