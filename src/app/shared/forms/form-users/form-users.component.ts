import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user/user.service';
import { rolesEnuns } from 'src/app/utils/roles';
import { generalStatus } from 'src/app/utils/system-league';
import { environment } from 'src/environments/environment';
import { FormUploadComponent } from '../form-upload/form-upload.component';
import { DefaultModalComponent } from '../../components/default-modal/default-modal.component';
import { Federation } from 'src/app/models/FederationModel';

interface Roles {
  id: number;
  name: string;
}

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {

  federation: Federation = JSON.parse(`${localStorage.getItem('reccos-federation') || []}`);

  user: User;

  reccosFormUser!: FormGroup;
  baseUrl = environment.storage_url;

  file_name: string = 'users/default.jpg';

  @Input() public id_user: string = '0';
  @Input() public validationForm: Boolean = false;

  pass: boolean = true;
  repeat_pass: boolean = true;
  controlButtonSave: boolean = true;
  enableUpdateUser: boolean = false;

  roles: Roles[] = rolesEnuns;
  statusUser = generalStatus;

  imgPerfilDefault: string = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initFormGroupUser();

    if (this.validationForm) {
      this.userById(+this.id_user);
    }

    this.reccosFormUser.get("password_confirmation")?.valueChanges.subscribe((repeat_pass: string) => {
      if (repeat_pass != this.reccosFormUser.value.password) {
        this.r['password_confirmation'].setErrors({ 'incorrect': true });
      }
    });
  }

  get r() {
    return this.reccosFormUser.controls;
  }

  initFormGroupUser() {
    this.reccosFormUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      birth_date: ['', Validators.required],
      password: this.validationForm ? ['', [Validators.required, Validators.minLength(6)]] : [''],
      password_confirmation: this.validationForm ? ['', Validators.required] : [''],
      role: ['', Validators.required],
      img_perfil: [''],
      status: this.validationForm ? ['ATIVO'] : ['']
    });
  }

  userById(id_user: number) {
    this.userService.userById(id_user).subscribe({
      next: (data) => {
        console.log('USER UPDATE ID', data);
        this.user = data;
        if (data.img_perfil != null) {
          this.imgPerfilDefault = this.baseUrl + data.img_perfil;
        }
        console.log(this.imgPerfilDefault);
        this.updateFormGroupUser(data);
      },
      error: (err) => {
        console.log('ERRO USER UPDATE ID', err);
      }
    });
  }

  updateFormGroupUser(values: User) {

    this.reccosFormUser.patchValue({
      email: values.email,
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      birth_date: values.birth_date,
      role: values.role,
      img_perfil: values.img_perfil,
      status: values.status,
      federation: values.federation,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt
    });

    this.reccosFormUser.controls['email'].disable();
    this.reccosFormUser.controls['birth_date'].disable();
  }

  createObjToAPI() {

    let obj = {
      status: this.reccosFormUser.value.status,
      img_perfil: this.file_name,
      federation: +this.federation.id,
      name: this.reccosFormUser.value.name,
      phone: this.reccosFormUser.value.phone,
      email: this.reccosFormUser.value.email,
      surname: this.reccosFormUser.value.surname,
      password: this.reccosFormUser.value.password,
      role: this.reccosFormUser.value.role.toLowerCase(),
      birth_date: this.formatDate(this.reccosFormUser.value.birth_date),
    }

    console.log('CREATE OBJECT:', obj);
    // this.validationForm ? this.updateLeague(obj) : this.createLeague(obj);
    this.validationForm ? this.createUser(obj) : this.updateUser(obj);
  }

  createUser(form: any) {

    this.userService.createUser(form).subscribe({
      next: (data) => {
        console.log('SUCESSO CREATE USER', data);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log('ERRO AO CADASTRAR USUÁRIO', err);
      }
    });
  }

  updateUser(form: any) {
    this.userService.updateUser(+this.id_user, form).subscribe({
      next: (data) => {
        console.log('SUCESSO UPDATE USER', data);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log('ERRO AO ATUALIZAR USUÁRIO', err);
      }
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
      this.file_name = data.result;
    });
  }

  compareDates(datestring1: string, datestring2: string) {
    const date1 = new Date(datestring1);
    const date2 = new Date(datestring2);

    if (date1.getTime() === date2.getTime()) {
      return false;
    }
    return true;
  }

  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
  }

}
