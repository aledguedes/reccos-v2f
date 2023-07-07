import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRxjsService {

  private toggleSidenav = new Subject<boolean>();
  toggleSidenav$ = this.toggleSidenav.asObservable();

  openAndCloseMenu(evt: boolean) {
    this.toggleSidenav.next(evt);
  }
}
