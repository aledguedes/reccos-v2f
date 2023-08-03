import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/UserModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-form-federation',
  templateUrl: './form-federation.component.html',
  styleUrls: ['./form-federation.component.scss']
})
export class FormFederationComponent implements OnInit {

  // @Input() public validationForm: Boolean = true;
  updateFederation: Boolean = false;

  reccosFormFederation!: FormGroup;
  reccosFormFederationUser!: FormGroup;

  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private federationService: FederationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fomsInit();
    this.listUser();
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
    this.userService.listAll().subscribe({
      next: (data: User[]) => {
        this.users = data.filter((user: User) => user.role != "manager");
        console.log('USUÁRIOS LISTA', this.users);
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
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log('Erro ao criar a federação');
      }
    });
  }

}
