import { Component, OnInit } from '@angular/core';
import { Federation } from 'src/app/models/FederationModel';
import { User } from 'src/app/models/UserModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
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
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    this.rxjs.federations$.subscribe(data => {
      if (data) {
        console.log('federation:', data);
        this.federationData = {...data, status: true, img_logo: 'user/logo_a.jpg'}
      }
    });

    this.rxjs.users$.subscribe(data =>{
      if (data) {
        this.userData = {...data, status: true, img_perfil: 'user/logo_a.jpg'};
      }
    });
  }

  createFederations(form: Federation) {
    this.fedService.createFederation(form).subscribe({
      next: (data) => {
        console.log('Criado com sucesso');
      },
      error: (err) => {
        console.log('Erro ao criar a federação')
      }
    });
  }
}
