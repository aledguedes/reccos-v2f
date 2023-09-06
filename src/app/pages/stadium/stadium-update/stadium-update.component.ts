import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stadium-update',
  templateUrl: './stadium-update.component.html',
  styleUrls: ['./stadium-update.component.scss']
})
export class StadiumUpdateComponent implements OnInit {

  enableUpdateLeague: boolean = true;
  id_stadium: string = ''

  constructor(
    private actvRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_stadium = this.actvRouter.snapshot.params['id_stadium'];
  }
}
