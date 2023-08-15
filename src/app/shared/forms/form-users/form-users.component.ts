import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {

  reccosFormUser!: FormGroup;

  enableForm: boolean = false;

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
    });
    console.log(this.reccosFormUser.controls)

    this.reccosFormUser.controls['name'].disable();
    this.reccosFormUser.controls['surname'].disable();
    this.reccosFormUser.controls['phone'].disable();
    this.reccosFormUser.controls['birth_date'].disable();
  }

  get r() {
    return this.reccosFormUser.controls;
  }

  statusForm() {
    console.log('form', this.reccosFormUser.status);
    if (this.reccosFormUser.status == 'VALID') {
      this.rxjs.nextStepperUser(true);
      this.rxjs.createUser(this.reccosFormUser.value);
    }
  }

  checkEmail() {
    this.userService.checkEmail(this.reccosFormUser.value.email).subscribe({
      next: (data) => {
        console.log('existe e-mail?', data);
      },
      error: (err) => {
        console.log('erro check email', err);
      }
    });
    this.enableForm = true;
  }

}
