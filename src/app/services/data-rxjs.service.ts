import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Federation } from '../models/FederationModel';
import { User } from '../models/UserModel';

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

  private federations = new Subject<Federation>();
  federations$ = this.federations.asObservable();

  private users = new Subject<User>();
  users$ = this.users.asObservable();

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

  updateUser(data: User) {
    this.users.next(data);
  }

  updateFederation(data: Federation) {
    this.federations.next(data);
  }
}
