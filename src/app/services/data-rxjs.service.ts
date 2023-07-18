import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRxjsService {

  private toggleSidenav = new Subject<boolean>();
  toggleSidenav$ = this.toggleSidenav.asObservable();

  private stepFormFederation = new Subject<boolean>();
  stepFormFederation$ = this.stepFormFederation.asObservable();

  private stepFormUser = new Subject<boolean>();
  stepFormUser$ = this.stepFormUser.asObservable();

  openAndCloseMenu(evt: boolean) {
    this.toggleSidenav.next(evt);
  }

  nextStepperFederation(evt: boolean) {
    this.stepFormFederation.next(evt);
    this.stepFormFederation.complete();
  }

  nextStepperUser(evt: boolean) {
    this.stepFormUser.next(evt);
    this.stepFormUser.complete();
  }
}
