import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.scss']
})
export class PlayerUpdateComponent implements OnInit {

  id_player: string = '';
  enableUpdatePlayer: boolean = true;

  constructor(
    private actvRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_player = this.actvRouter.snapshot.params['id_player'];
  }

}
