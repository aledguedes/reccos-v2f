import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user/user.service';
import { rolesEnuns } from 'src/app/utils/roles';
import { generalStatus } from 'src/app/utils/system-league';

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

  reccosFormUser!: FormGroup;

  user: User;

  @Input() public id_user: string = '0';
  @Input() public validationForm: Boolean = false;

  pass: boolean = true;
  repeat_pass: boolean = true;
  controlButtonSave: boolean = true;
  enableUpdateUser: boolean = false;
  activetedUpdateImage: boolean = false;

  roles: Roles[] = rolesEnuns;
  statusUser = generalStatus;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
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
      password: this.validationForm ? ['', [Validators.required, Validators.minLength(3)], Validators.maxLength(8)] : [''],
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
    console.log('UPDATE FORM USER:', this.reccosFormUser.value);
  }

  createUser() {
    // let form = { ...this.reccosFormUser.value, status: true, img_perfil: 'users/perfil_A.jpg'}
    let form: any = {
      name: this.reccosFormUser.value.name,
      surname: this.reccosFormUser.value.surname,
      phone: this.reccosFormUser.value.phone,
      email: this.reccosFormUser.value.email,
      img_perfil: "users/perfil_b.png",
      status: true,
      federation: 0,
      birth_date: "2023-07-29T08:22:43",
      password: this.reccosFormUser.value.password,
      role: this.reccosFormUser.value.role.toLowerCase()
    }

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

  updateUser() {
    this.userService.updateUser(+this.id_user, this.reccosFormUser.value).subscribe({
      next: (data) => {
        console.log('SUCESSO UPDATE USER', data);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log('ERRO AO ATUALIZAR USUÁRIO', err);
      }
    });
  }

}
