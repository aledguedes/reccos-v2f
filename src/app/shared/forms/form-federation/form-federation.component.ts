import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Federation } from 'src/app/models/FederationModel';
import { User } from 'src/app/models/UserModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { FederationService } from 'src/app/services/federation/federation.service';
import { UserService } from 'src/app/services/user/user.service';
import { generalStatus } from 'src/app/utils/system-league';
import { DefaultModalComponent } from '../../components/default-modal/default-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-federation',
  templateUrl: './form-federation.component.html',
  styleUrls: ['./form-federation.component.scss']
})
export class FormFederationComponent implements OnInit {

  @Input() public idFederation: string = '';
  @Input() public validationForm: Boolean = false;

  updateFederation: Boolean = false;

  reccosFormFederation!: FormGroup;
  reccosFormFederationUser!: FormGroup;

  baseUrl = environment.storage_url;

  file_upload_name: string = 'federation/default.png';

  users: User[] = [];
  list_status = generalStatus;

  id_federation: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rxjs: DataRxjsService,
    private userService: UserService,
    private federationService: FederationService,
  ) { }

  ngOnInit(): void {
    this.fomsInit();
    this.listUser();

    /* RXJS */
    this.rxjs.federations$.subscribe(data => {
      if (data && this.validationForm) {
        this.updateDataFederation(data);
      }
    });
  }

  get r() {
    return this.reccosFormFederation.controls;
  }

  fomsInit() {
    this.reccosFormFederation = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      status: this.updateFederation ? ['', [Validators.required]] : [true],
      img_logo: ['']
    });

    this.reccosFormFederationUser = this.fb.group({
      user: ['', [Validators.required]],
    });
  }

  listUser() {
    this.userService.listAllUser().subscribe({
      next: (data: User[]) => {
        this.users = data.filter((user: User) => user.role == "admin");
        // console.log('USUÁRIOS LISTA', this.users);
      },
      error: (err) => {
        console.log('USUÁRIOS ERROR', err);
      }
    });
  }

  createFederation() {
    let user_id = +this.reccosFormFederationUser.value.user;
    this.reccosFormFederation.patchValue({
      img_logo: 'federations/logo_01.png'
    });

    let obj = this.reccosFormFederation.value;
    console.log('FEDERATION CREATE', obj);
    // return;
    this.federationService.createFederation(user_id, obj).subscribe({
      next: (data) => {
        console.log(`Federação ${this.reccosFormFederation.value.surname}, criada com sucesso`);
        this.router.navigate(['/federation'])
      },
      error: (err) => {
        console.log('Erro ao criar a federação');
      }
    });
  }

  federationUpdate() {
    let obj = this.reccosFormFederation.value;

    console.log('UPDATE FEDERATION OBJ:', obj);
    // return;
    this.federationService.updateFederation(+this.idFederation, obj).subscribe({
      next: (data) => {
        console.log(`Federação ${this.reccosFormFederation.value.surname}, atualizada com sucesso`);
        this.router.navigate(['/federation'])
      },
      error: (err) => {
        console.log('Erro ao atualizar federação');
      }
    });
  }

  updateDataFederation(dataFederation: Federation) {
    this.reccosFormFederation.patchValue({
      name: dataFederation.name,
      surname: dataFederation.surname,
      status: dataFederation.status,
      img_logo: dataFederation.img_logo
    });

    this.reccosFormFederationUser.patchValue({
      user: dataFederation.owner.id,
    });
  }

  openUpload() {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      disableClose: true,
      width: '500px',
      data: {
        component: 2
      }
    }).afterClosed().subscribe((data: any) => {
      console.log('USER FORMS', data);
      this.file_upload_name = data.result;
    });
  }

}
