import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.scss']
})
export class TeamUpdateComponent implements OnInit {

  enableUpdateLeague: boolean = true;
  id_team: string = '';

  constructor(
    private actvRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_team = this.actvRouter.snapshot.params['id_team'];
  }

}
