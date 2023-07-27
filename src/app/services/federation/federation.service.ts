import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Federation } from 'src/app/models/FederationModel';
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

  listAll() {
    return this.http.get<Federation[]>(`${this.url}/${this.flag}`);
  }

  createFederation(federation: Federation) {
    return this.http.post<Federation>(`${this.url}/${this.flag}`, federation);
  }
}
