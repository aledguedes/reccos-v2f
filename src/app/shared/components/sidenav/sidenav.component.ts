import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { menus } from 'src/app/utils/dashboad-menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  showFiller: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
    const sidebar = document.getElementById('sidebar');

    allDropdown.forEach(item => {
      const a = item.parentElement?.querySelector('a:first-child');
      if (!a) return; // Se a for null, encerra a iteração

      a.addEventListener('click', (e) => {
        e.preventDefault();

        if (!a.classList.contains('active')) {
          allDropdown.forEach(i => {
            const aLink = i.parentElement?.querySelector('a:first-child');
            if (!aLink) return; // Se aLink for null, encerra a iteração

            aLink.classList.remove('active');
            i.classList.remove('show');
          });
        }

        a.classList.toggle('active');
        item.classList.toggle('show');
      });
    });
  }

}