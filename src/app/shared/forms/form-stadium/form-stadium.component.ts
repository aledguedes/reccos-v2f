import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { leaguesStatus } from 'src/app/utils/system-league';

@Component({
  selector: 'app-form-stadium',
  templateUrl: './form-stadium.component.html',
  styleUrls: ['./form-stadium.component.scss']
})
export class FormStadiumComponent implements OnInit {

  @Input() public id_stadium: String = '';
  @Input() public validationForm: Boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  reccosFormStadium!: FormGroup;
  stadium_status = leaguesStatus;
  changePhoto: boolean = true;
  listTemas: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reccosFormStadium = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      status: !this.validationForm ? ['Ativo'] : [''],
    });
  }

  get r() {
    return this.reccosFormStadium.controls;
  }

  nextStep() {
    this.stepper.next();
  }

  listTeams() {
    this.listTemas = true;
  }

  updateStadium() { }
  createStadium() { }
}
