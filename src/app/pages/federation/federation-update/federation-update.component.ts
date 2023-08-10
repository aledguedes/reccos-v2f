import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { FederationService } from 'src/app/services/federation/federation.service';

@Component({
  selector: 'app-federation-update',
  templateUrl: './federation-update.component.html',
  styleUrls: ['./federation-update.component.scss']
})
export class FederationUpdateComponent implements OnInit {

  enableUpdateUser: boolean = true;

  id_federation: string = '';

  constructor(
    private rxjs: DataRxjsService,
    private actvRouter: ActivatedRoute,
    private federationService: FederationService,
  ) { }


  ngOnInit(): void {
    this.id_federation = this.actvRouter.snapshot.params['id_federation'];
    this.federationId(+this.id_federation);
  }

  federationId(id_federation: number) {
    this.federationService.federationById(+id_federation).subscribe({
      next: (data) => {
        this.rxjs.updateFederation(data);
        console.log('FEDERATION BY ID:', data);
      },
      error: (err) => {
        console.log('FEDERATION BY ID ERRO:', err);
      }
    });
  }

}
