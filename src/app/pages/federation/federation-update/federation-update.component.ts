import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-federation-update',
  templateUrl: './federation-update.component.html',
  styleUrls: ['./federation-update.component.scss']
})
export class FederationUpdateComponent implements OnInit {

  reccosFormFederation!: FormGroup;
  reccosFormUser!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.reccosFormFederation = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
    this.reccosFormUser = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

}
