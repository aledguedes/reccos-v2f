import { Component, OnInit } from '@angular/core';
import { Federation } from 'src/app/models/FederationModel';
import { User } from 'src/app/models/UserModel';
import { FederationService } from 'src/app/services/federation/federation.service';

@Component({
  selector: 'app-federation-create',
  templateUrl: './federation-create.component.html',
  styleUrls: ['./federation-create.component.scss']
})
export class FederationCreateComponent implements OnInit {

  userData!: User;
  federationData!: Federation;

  constructor(
    private fedService: FederationService,
  ) { }

  ngOnInit(): void {
  }

  // createFederations(form: Federation) {
  //   this.fedService.createFederation(form).subscribe({
  //     next: (data) => {
  //       console.log('Criado com sucesso');
  //     },
  //     error: (err) => {
  //       console.log('Erro ao criar a federação')
  //     }
  //   });
  // }
}
