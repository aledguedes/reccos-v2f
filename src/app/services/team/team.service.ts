import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/TeamModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = environment.api_url
  private flag = 'team'

  constructor(
    private http: HttpClient
  ) { }

  listAllTeam() {
    return this.http.get<Team[]>(`${this.url}/${this.flag}`);
  }

  leagueById(league_id: number) {
    return this.http.get<Team>(`${this.url}/${this.flag}/${league_id}`);
  }

  createTeam(league: Team) {
    return this.http.post<Team>(`${this.url}/${this.flag}`, league);
  }

  updateTeam(id_user: number, user: Team) {
    return this.http.put<Team>(`${this.url}/${this.flag}/${id_user}`, user);
  }

  removeTeam(id_user: number) {
    return this.http.delete<Team>(`${this.url}/${this.flag}/${id_user}`);
  }
}
