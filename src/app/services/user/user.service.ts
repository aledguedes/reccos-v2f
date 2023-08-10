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

  listAllUser() {
    return this.http.get<User[]>(`${this.url}/${this.flag}`);
  }

  userById(id_user: number) {
    return this.http.get<User>(`${this.url}/${this.flag}/${id_user}`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.url}/${this.flag}`, user);
  }

  updateUser(id_user: number, user: User) {
    return this.http.put<User>(`${this.url}/${this.flag}/${id_user}`, user);
  }

  removeUser(id_user: number) {
    return this.http.delete<User>(`${this.url}/${this.flag}/${id_user}`);
  }
}
