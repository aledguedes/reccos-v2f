import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/TeamModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-teams',
  templateUrl: './change-teams.component.html',
  styleUrls: ['./change-teams.component.scss']
})
export class ChangeTeamsComponent implements OnInit {

  @Input() teams: Team[];
  @Output() selectedTeamsOutput = new EventEmitter();

  // teams: Team[] = [];
  selectedTeams: any[] = [];

  allTeams: boolean = false;

  baseUrl = environment.storage_url;

  ngOnInit(): void {
  }

  selectAll(evt: any) {
    this.teams.forEach((item: any) => {
      if (item.check == '0') {
        item.check = '1';
        this.selectedTeams.push(item);
      }
    });
    this.verifySlecetedAllTeams();
  }

  teamSelected(idx: number, check: string, id: number) {
    if (check == '1') {
      this.teams[idx].check = '0';
      this.selectedTeams.splice(this.selectedTeams.findIndex((item: any) => item.id == id), 1);
      this.allTeams = false;
    } else {
      this.teams[idx].check = '1';
      this.selectedTeams.push((this.teams[idx]));
    }
    this.verifySlecetedAllTeams();
  }

  verifySlecetedAllTeams() {
    let totalTeams = this.teams.length;
    let totalSelectedTeams = this.selectedTeams.length;

    if (totalSelectedTeams === totalTeams) {
      this.allTeams = true;
    }
    this.selectedTeamsOutput.emit(this.selectedTeams);
  }


}
