import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeagueService } from 'src/app/services/league/league.service';

@Component({
  selector: 'app-form-league',
  templateUrl: './form-league.component.html',
  styleUrls: ['./form-league.component.scss']
})
export class FormLeagueComponent implements OnInit {

  leagueForm!: FormGroup;
  id_federation: string = '1';

  constructor(
    private fb: FormBuilder,
    private leagueService: LeagueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.leagueForm = this.fb.group({
      name: ['', Validators.required],
      dt_start: ['', Validators.required],
      dt_end: ['', Validators.required],
      league_system: ['', Validators.required],
      league_mode: ['', Validators.required],
      qt_group: ['1', Validators.required]
    });

    // this.leagueForm.controls['qt_group'].disable();
  }

  createLeague() {
    this.updateInfos();
    let form = {
      ...this.leagueForm.value,
      status: 'Ativo',
      idd_fed: +this.id_federation,
      img_logo: 'leagues/img_01.jpg'
    }    // return;
    this.leagueService.createLeague(form).subscribe({
      next: (data) => {
        console.log('CREATE LEAGUE SUCESS', data);
        this.router.navigate(['/league']);
      },
      error: (err) => {
        console.log('CREATE LEAGUE ERROR', err);
      }
    });
  }

  formatDate(date: Date) {
    console.log('date', date)
    var formattedTimestamp = date.toISOString().slice(0, 16);
    console.log(formattedTimestamp); // Output: 2023-08-21T03:00
  }

  updateInfos() {
    this.leagueForm.patchValue({
      dt_start: '2024-01-21T03:00',
      dt_end: '2024-08-21T03:00'
    });
  }
}
