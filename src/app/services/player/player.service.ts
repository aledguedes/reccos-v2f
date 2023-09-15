import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from 'src/app/models/PlayerModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url = environment.api_url
  private flag = 'player'

  constructor(
    private http: HttpClient
  ) { }

  listAllPlayer() {
    return this.http.get<Player[]>(`${this.url}/${this.flag}`);
  }

  playerById(player_id: number) {
    return this.http.get<Player>(`${this.url}/${this.flag}/${player_id}`);
  }

  createPlayer(player: Player) {
    return this.http.post<Player>(`${this.url}/${this.flag}`, player);
  }

  updatePlayer(id_player: number, player: Player) {
    return this.http.put<Player>(`${this.url}/${this.flag}/${id_player}`, player);
  }

  removePlayer(id_player: number) {
    return this.http.delete<Player>(`${this.url}/${this.flag}/${id_player}`);
  }
}
