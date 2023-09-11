import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Refree } from 'src/app/models/RefreeModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreeService {

  private url = environment.api_url
  private flag = 'refree'

  constructor(
    private http: HttpClient
  ) { }

  listAllRefree() {
    return this.http.get<Refree[]>(`${this.url}/${this.flag}`);
  }

  refreeById(refree_id: number) {
    return this.http.get<Refree>(`${this.url}/${this.flag}/${refree_id}`);
  }

  createRefree(refree: Refree) {
    return this.http.post<Refree>(`${this.url}/${this.flag}`, refree);
  }

  updateRefree(id_refree: number, refree: Refree) {
    return this.http.put<Refree>(`${this.url}/${this.flag}/${id_refree}`, refree);
  }

  removeRefree(id_refree: number) {
    return this.http.delete<Refree>(`${this.url}/${this.flag}/${id_refree}`);
  }
}
