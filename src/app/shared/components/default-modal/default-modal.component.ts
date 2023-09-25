import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/models/TeamModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})
export class DefaultModalComponent implements OnInit {

  teams: Team[] = [];
  selectedTeams: selectedTeams[] = [];

  baseUrl = environment.storage_url;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DefaultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('THIS DATA TEAMS', this.data);
  }

  selectAll(evt: any) {

    console.log('select all:', this.teams);
    let teams = this.teams;

    if (evt.checked) {
      teams.forEach((t: any) => {
        console.log('FOREACH:', t.id);
        t["is_league"] = true;
        this.arrTeam(t.id, t.name);
      });
    } else {
      teams.forEach((t: any) => {
        t["is_league"] = false;
        this.revTeam(t.id);
      });
    }
    console.log('select all 2:', this.teams);
  }

  addTeams(evt: any, id_team: number, name: string) {
    if (evt.checked) {
      this.arrTeam(id_team, name);
    }
    else {
      this.revTeam(id_team);
    }
  }

  arrTeam(id_team: number, name: string) {
    this.selectedTeams.push({ id: id_team, name: name });
    console.log('ADD TEAM:', this.selectedTeams);
  }

  revTeam(id_team: number) {
    console.log('REMOVE TEAM:', id_team, this.selectedTeams.findIndex((item: any) => { item.id == id_team }));
    this.selectedTeams.splice(this.selectedTeams.findIndex((item: any) => { item.id == id_team }), 1);
    console.log('REMOVE TEAM:', this.selectedTeams);
  }

  selectTeams(id: any) {
    let teams: any = [];
    teams.push(id);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
interface selectedTeams {
  id: number,
  name: string
}