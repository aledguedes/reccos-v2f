import { Component, OnInit } from '@angular/core';
import { Refree } from 'src/app/models/RefreeModel';
import { RefreeService } from 'src/app/services/refree/refree.service';
import { SnackbarService } from 'src/app/shared/service/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refree-list',
  templateUrl: './refree-list.component.html',
  styleUrls: ['./refree-list.component.scss']
})
export class RefreeListComponent  implements OnInit {

  refrees: Refree[] = [];
  baseUrl = environment.storage_url;

  constructor(
    private snack: SnackbarService,
    private refreeService: RefreeService
  ) { }

  ngOnInit(): void {
    this.getAllRefrees();
  }

  getAllRefrees() {
    this.refreeService.listAllRefree().subscribe({
      next: (data) => {
        data.forEach((l: Refree) => {
          l["cod_status"] = this.plotStatus(l.status.toLowerCase());
        });
        this.refrees = data;
        console.log('PLAYERS ALL', data);
      },
      error: (err) => {
        console.log('PLAYERS ALL ERR', err);
      }
    });
  }

  removeRefree(id_refree: number) {
    this.refreeService.removeRefree(id_refree).subscribe({
      next: (data) => {
        this.snack.snack(`Jogador removido com sucesso!`, 'snack-success');
        this.getAllRefrees();
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
