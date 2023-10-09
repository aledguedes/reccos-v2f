import { Component, OnInit } from '@angular/core';
import { Stadium } from 'src/app/models/StadiumModel';
import { Team } from 'src/app/models/TeamModel';
import { StadiumService } from 'src/app/services/stadium/stadium.service';
import { generalStatus } from 'src/app/utils/system-league';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stadium-list',
  templateUrl: './stadium-list.component.html',
  styleUrls: ['./stadium-list.component.scss']
})
export class StadiumListComponent implements OnInit {

  stadium: Stadium[] = [];

  baseUrl = environment.storage_url;

  statusCode: any = generalStatus;

  teams: Team[] = [];

  constructor(
    private stadiumService: StadiumService
  ) { }

  ngOnInit(): void {
    this.listAllStadium();
  }

  listAllStadium() {
    this.stadiumService.listAllStadium().subscribe({
      next: (data) => {
        data.forEach((l: any) => {
          l["cod_status"] = this.plotStatus(l.status.toLowerCase());
        });
        this.stadium = data;
        console.log('LIST ALL STADIUM DATA:', data);
      },
      error: (err) => {
        console.log('LIST ALL STADIUM ERR:', err);
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
