import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { UserService } from 'src/app/services/user/user.service';
import { rolesEnuns } from 'src/app/utils/roles';

interface Roles {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {

  reccosFormUser!: FormGroup;

  pass: boolean = true;
  repeat_pass: boolean = true;

  roles: Roles[] = rolesEnuns;

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.reccosFormUser = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      birth_date: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)], Validators.maxLength(8)],
      password_confirmation: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.reccosFormUser.get("password_confirmation")?.valueChanges.subscribe((repeat_pass: string) => {
      console.log('password', this.reccosFormUser.value.password, repeat_pass);
      if(repeat_pass != this.reccosFormUser.value.password){
        this.r['password_confirmation'].setErrors({'incorrect': true});
      }
    })
  }

  get r() {
    return this.reccosFormUser.controls;
  }

  createUser() {
    // let form = { ...this.reccosFormUser.value, status: true, img_perfil: 'users/perfil_A.jpg'}
    let form = {
      name: this.reccosFormUser.value.name,
      email: this.reccosFormUser.value.email,
      img_perfil: "users/perfil_b.png",
      status: false,
      password: this.reccosFormUser.value.password,
      role: "Admin"
    }
    console.log('CREATE_USER USUÁRIO:', form);
    // return;
    this.userService.createUser(form).subscribe({
      next: (data) => {
        console.log('SUCESSO', data);
        alert();
      },
      error: (err) => {
        console.log('ERRO AO CADASTRAR USUÁRIO', err);
      }
    });
  }

}
