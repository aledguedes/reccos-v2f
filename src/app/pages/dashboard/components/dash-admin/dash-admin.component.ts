import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export class DashAdminComponent {

  displayedColumns: string[] = ['id', 'name', 'address', 'price'];
  dataSource = ELEMENT_DATA;
}

const ELEMENT_DATA = [
  {
    id: 1,
    name: 'John Doe',
    address: 'St. James College',
    price: '$120'
  },
  {
    id: 2,
    name: 'John Doe',
    address: 'St. James College',
    price: '$120'
  },
  {
    id: 3,
    name: 'John Doe',
    address: 'St. James College',
    price: '$120'
  },
  {
    id: 4,
    name: 'John Doe',
    address: 'St. James College',
    price: '$120'
  },
  {
    id: 5,
    name: 'John Doe',
    address: 'St. James College',
    price: '$120'
  },
  {
    id: 6,
    name: 'John Doe',
    address: 'St. James College',
    price: '$120'
  }
]
