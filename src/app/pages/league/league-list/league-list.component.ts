import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/LeagueModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { generalStatus } from 'src/app/utils/system-league';
import { environment } from 'src/environments/environment';
import { LeagueUpdateComponent } from '../league-update/league-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss']
})
export class LeagueListComponent implements OnInit {

  leagues: League[] = [];

  id_federation: number = 1;

  statusCode: any = generalStatus;

  baseUrl = environment.storage_url;

  constructor(
    private dialog: MatDialog,
    private leagueService: LeagueService,
    private federationService: FederationService
  ) { }

  ngOnInit(): void {
    this.listFederationById();
  }

  listFederationById() {
    this.federationService.federationById(this.id_federation).subscribe({
      next: (data) => {
        data.leagues.forEach((l: League) => {
          l["cod_status"] = this.plotStatus(l.status.toLowerCase());
        });
        this.leagues = data.leagues;
        // console.log('FEDERAÇÃO POR ID:', this.leagues);
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

  openUpdateLeague() {
    const dialogRef = this.dialog.open(LeagueUpdateComponent, {
      disableClose: false,
      width: '800px',
      data: {}
    }).afterClosed().subscribe({

    });
  }

}
