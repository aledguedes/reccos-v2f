import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/LeagueModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss']
})
export class LeagueListComponent implements OnInit {

  leagues: League[] = [];

  baseUrl = environment.storage_url + '/';

  constructor(
    private leagueService: LeagueService,
    private federationService: FederationService
  ) { }

  ngOnInit(): void {
    this.listFederationById();
  }

  listFederationById() {
    this.federationService.federationById(1).subscribe({
      next: (data) => {
        data.leagues.forEach((l: League) => {
          l["cod_status"] = this.plotStatus(l.status.toLowerCase());
        })
        this.leagues = data.leagues;

        console.log('FEDERAÇÃO POR ID:', this.leagues);
      },
      error: (err) => {
        console.log('FEDERAÇÃO POR ID ERROR:', err);
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
