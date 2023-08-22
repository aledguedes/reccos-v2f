import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league-update',
  templateUrl: './league-update.component.html',
  styleUrls: ['./league-update.component.scss']
})
export class LeagueUpdateComponent implements OnInit {

  enableUpdateLeague: boolean = true;

  id_league: string = '';

  constructor(
    private actvRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_league = this.actvRouter.snapshot.params['id_league'];
    console.log('update league_id:', this.id_league);
  }

}
