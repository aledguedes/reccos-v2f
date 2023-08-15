import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  constructor(
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    this.rxjs.user$.subscribe(data =>{
      if (data) {
      console.log('USER RXJS', data);
      }
    });
  }

}
