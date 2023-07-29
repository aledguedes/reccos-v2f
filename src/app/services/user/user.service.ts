import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api_url
  private flag = 'user'

  constructor(
    private http: HttpClient
  ) { }

  listAll() {
    return this.http.get<User[]>(`${this.url}/${this.flag}`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.url}/${this.flag}`, user);
  }
}
