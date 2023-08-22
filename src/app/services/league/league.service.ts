import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { League } from 'src/app/models/LeagueModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private url = environment.api_url
  private flag = 'league'

  constructor(
    private http: HttpClient
  ) { }

  listAllLeague() {
    return this.http.get<League[]>(`${this.url}/${this.flag}`);
  }

  leagueById(league_id: number) {
    return this.http.get<League>(`${this.url}/${this.flag}/${league_id}`);
  }

  createLeague(league: League) {
    return this.http.post<League>(`${this.url}/${this.flag}`, league);
  }

  updateLeague(id_user: number, user: League) {
    return this.http.put<League>(`${this.url}/${this.flag}/${id_user}`, user);
  }

  removeLeague(id_user: number) {
    return this.http.delete<League>(`${this.url}/${this.flag}/${id_user}`);
  }
}
