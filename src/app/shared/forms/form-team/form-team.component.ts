import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  styleUrls: ['./form-team.component.scss']
})
export class FormTeamComponent implements OnInit, AfterViewInit {

  @Input() validationForm: boolean = false;
  @ViewChild('stepper') stepper!: MatStepper;

  formTeam!: FormGroup;
  formCommission!: FormGroup;

  changePhoto: boolean = true;

  label_button: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formTeam = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      initials: ['', Validators.required],
      birth_date: ['', Validators.required],
    });

    this.formCommission = this.fb.group({
      coach: ['', Validators.required],
      assistants: ['', Validators.required],
      doctor: ['', Validators.required],
      goalkeeper: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.label_button = this.validationForm ? 'Cancelar' : 'Voltar';
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

  createTeam() {

  }

  updateTeam() {

  }
}
