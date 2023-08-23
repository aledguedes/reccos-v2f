import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../../../services/team/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/TeamModel';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  baseUrl = environment.storage_url;

  id_team: String = '';
  team!: Team;

  constructor(
    private teamService: TeamService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_team = this.actRoute.snapshot.params['id_team'];
    this.teamById(+this.id_team);
  }

  teamById(id_team: number) {
    this.teamService.teamById(id_team).subscribe({
      next: (data) => {
        this.team = data;
        console.log('TEAM BY ID DETAIL:', data);
      },
      error: (err) => {
        console.log('TEAM BY ID DETAIL ERR:', err);
      }
    });
  }

}
