import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {

  reccosFormUser!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    this.reccosFormUser = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone:['', Validators.required],
      birth_date: ['', Validators.required],
    });
  }

  get r() {
    return this.reccosFormUser.controls;
  }

  statusForm() {
    console.log('form', this.reccosFormUser.status);
    if (this.reccosFormUser.status == 'VALID') {
      this.rxjs.nextStepperUser(true);
    }
  }

}
