import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Federation } from 'src/app/models/FederationModel';
import { League } from 'src/app/models/LeagueModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FederationService {

  private url = environment.api_url
  private flag = 'federation'

  constructor(
    private http: HttpClient
  ) { }

  listAllFederation() {
    return this.http.get<Federation[]>(`${this.url}/${this.flag}`);
  }

  federationById(federation_id: number) {
    return this.http.get<Federation>(`${this.url}/${this.flag}/${federation_id}`);
  }

  createFederation(user_id: number, federation: Federation) {
    return this.http.post<Federation>(`${this.url}/${this.flag}/${user_id}`, federation);
  }

  updateFederation(id_user: number, user: Federation) {
    return this.http.put<Federation>(`${this.url}/${this.flag}/${id_user}`, user);
  }

  removeFederation(id_user: number) {
    return this.http.delete<Federation>(`${this.url}/${this.flag}/${id_user}`);
  }
}
