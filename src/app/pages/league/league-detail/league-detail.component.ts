import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { League } from 'src/app/models/LeagueModel';
import { Team } from 'src/app/models/TeamModel';
import { LeagueService } from 'src/app/services/league/league.service';
import { TeamService } from 'src/app/services/team/team.service';
import { DefaultModalComponent } from 'src/app/shared/components/default-modal/default-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

  league: League;
  teamsLeague: any[] = [];
  teams: Team[] = [];

  formEditGroup!: FormGroup;

  urlLogo: string = '';
  id_league: string = '';
  id_federation: string = '1';

  add_teams: boolean = false;
  editGrouEnable: boolean = false;

  baseUrl = environment.storage_url;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private teamService: TeamService,
    private actvRouter: ActivatedRoute,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
    this.id_league = this.actvRouter.snapshot.params['id_league'];
    this.initForms();
    this.leagueById(+this.id_league);
    this.numberTeamsLeague();
  }

  initForms() {
    this.formEditGroup = this.fb.group({
      group_name: ['']
    });
  }

  numberTeamsLeague() {
    for (let i = 0; i < 15; i++) {
      this.teamsLeague[i] = {
        name: `Time ${i + 1}`,
        icon: 'add',
        template: 'sports_soccer',
        show_enable: false
      }
    }
    console.log('>>>', this.teamsLeague);
  }

  teamByFederation() {
    this.teamService.teamByFederation(+this.id_federation).subscribe({
      next: (data) => {
        this.teams = data;
        console.log('TEAM BY FEDERATION SUCESS', data);
      },
      error: (err) => {
        console.log('TEAM BY FEDERATION ERROR', err);
      }
    });
  }

  leagueById(id_league: number) {
    this.leagueService.leagueById(id_league).subscribe({
      next: (data) => {
        this.league = data;
        data["cod_status"] = this.plotStatus(data?.status.toLowerCase());
        this.urlLogo = this.baseUrl + data?.img_logo;
        console.log('LEAGUE BY ID', data);
        this.teamByFederation();
      },
      error: (err) => {
        console.log('LEAGUE BY ID ERR', err);
      }
    });
  }

  plotStatus(value: string) {
    switch (value) {
      case 'ativo':
        return '1';
      case 'inativo':
        return '2';
      case 'suspenso':
        return '3';
      default:
        return '4';
    }
  }

  addTeamsLeague(idx: number) {
    // this.teamsLeague[idx].show_enable = true;
    // this.teamsLeague[idx].template = 'sports_football';
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      disableClose: true,
      width: '700px',
      data: {
        component: 'add_teams_league',
        obj: this.teams
      }
    }).afterClosed().subscribe()
  }

  editGroup(idx: number) {
    console.log('EDIT GROUP: ', idx);
    this.editGrouEnable = true;
  }

  get r() {
    return this.formEditGroup.controls;
  }

}
