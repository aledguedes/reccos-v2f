import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/TeamModel';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: Team[] = [];

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.listAllTeams();
  }

  listAllTeams() {
    this.teamService.listAllTeam().subscribe({
      next: (data) => {
        this.teams = data;
        console.log('LIST ALL TEAMS DATA:', data);
      },
      error: (err) => {
        console.log('LIST ALL TEAMS ERR:', err);
      }
    });
  }

}
