import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-federation-create',
  templateUrl: './federation-create.component.html',
  styleUrls: ['./federation-create.component.scss']
})
export class FederationCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
