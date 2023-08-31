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

  updateLeague(id_league: number, league: League) {
    return this.http.put<League>(`${this.url}/${this.flag}/${id_league}`, league);
  }

  removeLeague(id_league: number) {
    return this.http.delete<League>(`${this.url}/${this.flag}/${id_league}`);
  }

  allStates() {
    return this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`);
  }

  allCityss(uf: number) {
    return this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`);
  }
}
