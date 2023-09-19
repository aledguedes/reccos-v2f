import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { League } from 'src/app/models/LeagueModel';
import { LeagueService } from 'src/app/services/league/league.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

  league: League;
  id_league: string = '';
  
  baseUrl = environment.storage_url;
  urlLogo: string = '';

  constructor(
    private actvRouter: ActivatedRoute,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
    this.id_league = this.actvRouter.snapshot.params['id_league'];
    this.leagueById(+this.id_league);
  }

  leagueById(id_league: number) {
    this.leagueService.leagueById(id_league).subscribe({
      next: (data) => {
        this.league = data;
        data["cod_status"] = this.plotStatus(data?.status.toLowerCase());
        this.urlLogo = this.baseUrl + data?.img_logo;
        console.log('LEAGUE BY ID', data);
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

}
