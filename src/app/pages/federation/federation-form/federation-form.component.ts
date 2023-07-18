import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-federation-form',
  templateUrl: './federation-form.component.html',
  styleUrls: ['./federation-form.component.scss']
})
export class FederationFormComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;
  formFederation: boolean = false;
  formUser: boolean = false;

  constructor(
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    this.rxjs.stepFormFederation$.subscribe(data => {
      if (data) {
        this.formFederation = data;
        this.nextStep();
      }
    });
    
    this.rxjs.stepFormUser$.subscribe(data => {
      if (data) {
        this.formUser = data;
        this.nextStep();
      }
    });
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

}