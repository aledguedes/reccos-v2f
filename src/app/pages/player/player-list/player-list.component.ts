import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/PlayerModel';
import { PlayerService } from 'src/app/services/player/player.service';
import { SnackbarService } from 'src/app/shared/service/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  players: Player[] = [];
  baseUrl = environment.storage_url;

  constructor(
    private snack: SnackbarService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.playerService.listAllPlayer().subscribe({
      next: (data) => {
        data.forEach((l: Player) => {
          l["cod_status"] = this.plotStatus(l.status.toLowerCase());
        });
        this.players = data;
        console.log('PLAYERS ALL', data);
      },
      error: (err) => {
        console.log('PLAYERS ALL ERR', err);
      }
    });
  }

  removePlayer(id_player: number) {
    this.playerService.removePlayer(id_player).subscribe({
      next: (data) => {
        this.snack.snack(`Jogador removido com sucesso!`, 'snack-success');
        this.getAllPlayers();
      },
      error: (err) => {
        console.log('PLAYERS REMOVE ERR', err);
        this.snack.snack(`Erro ao tentar remover o jogador!`, 'snack-error');
      }
    });
  }

  plotStatus(value: string) {
    switch (value) {
      case 'ativo':
        return '1';
      case 'inativo':
        return '2';
      case 'suspenso':
        return '3';
      default:
        return '4';
    }
  }

}
