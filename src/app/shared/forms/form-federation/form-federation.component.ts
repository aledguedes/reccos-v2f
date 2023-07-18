import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-form-federation',
  templateUrl: './form-federation.component.html',
  styleUrls: ['./form-federation.component.scss']
})
export class FormFederationComponent implements OnInit {

  reccosFormFederation!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    this.reccosFormFederation = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  get r() {
    return this.reccosFormFederation.controls;
  }

  statusForm() {
    if (this.reccosFormFederation.status == 'VALID') {
      this.rxjs.nextStepperFederation(true);
    }
  }

}
