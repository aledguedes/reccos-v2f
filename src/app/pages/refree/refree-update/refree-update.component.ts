import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refree-update',
  templateUrl: './refree-update.component.html',
  styleUrls: ['./refree-update.component.scss']
})
export class RefreeUpdateComponent implements OnInit {

  id_refree: string = '';
  enableUpdatePlayer: boolean = true;

  constructor(
    private actvRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_refree = this.actvRouter.snapshot.params['id_refree'];
  }
}
