import { Component, OnInit } from '@angular/core';
import { Federation } from 'src/app/models/FederationModel';
import { League } from 'src/app/models/LeagueModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { statusLeague } from 'src/app/utils/system-league';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss']
})
export class LeagueListComponent implements OnInit {

  leagues: League[] = [];

  federation: Federation = JSON.parse(`${localStorage.getItem('reccos-fedration') || []}`);

  statusCode: any = statusLeague;

  baseUrl = environment.storage_url;

  constructor(
    private leagueService: LeagueService,
    private federationService: FederationService
  ) { }

  ngOnInit(): void {
    this.listFederationById();
  }

  listFederationById() {
    this.federationService.federationById(this.federation.id).subscribe({
      next: (data) => {

        data.leagues.forEach((l: League) => {
          l["cod_status"] = this.plotStatus(l.status.toLowerCase());
          l["slug"] = this.slug(l.name);
        });
        this.leagues = data.leagues;
        console.log('FEDERAÇÃO POR ID:', this.leagues);
      },
      error: (err) => {
        console.log('FEDERAÇÃO POR ID ERROR:', err);
      }
    });
  }

  removeLeague(id_league: any) {
    this.leagueService.removeLeague(id_league).subscribe({
      next: (data) => {
        this.listFederationById();
      },
      error: (err) => {
        console.log('REMOVE LEAGUE ERROR:', err);
      }
    });
  }

  slug(input: string) {
    return input.toString().toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, "_");
  }

  plotStatus(value: string) {
    switch (value) {
      case 'em preparação':
        return '1';
      case 'em progresso':
        return '2';
      case 'cancelado':
        return '3';
      default:
        return '4';
    }
  }
}
