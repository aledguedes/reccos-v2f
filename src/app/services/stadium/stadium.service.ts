import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stadium } from 'src/app/models/StadiumModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  private url = environment.api_url
  private flag = 'stadium'

  constructor(
    private http: HttpClient
  ) { }

  listAllStadium() {
    return this.http.get<Stadium[]>(`${this.url}/${this.flag}`);
  }

  stadiumById(stadium_id: number) {
    return this.http.get<Stadium>(`${this.url}/${this.flag}/${stadium_id}`);
  }

  createStadium(stadium: Stadium) {
    return this.http.post<Stadium>(`${this.url}/${this.flag}`, stadium);
  }

  updateStadium(id_stadium: number, stadium: Stadium) {
    return this.http.put<Stadium>(`${this.url}/${this.flag}/${id_stadium}`, stadium);
  }

  removeStadium(id_stadium: number) {
    return this.http.delete<Stadium>(`${this.url}/${this.flag}/${id_stadium}`);
  }

  stadiumByFederation(federation_id: number) {
    return this.http.get<Stadium[]>(`${this.url}/${this.flag}/find/by-federation/${federation_id}`);
  }
}
