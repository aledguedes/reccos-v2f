import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { League } from 'src/app/models/LeagueModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { leagueMode, leagueSystem, leaguesStatus } from 'src/app/utils/system-league';

@Component({
  selector: 'app-form-league',
  templateUrl: './form-league.component.html',
  styleUrls: ['./form-league.component.scss']
})
export class FormLeagueComponent implements OnInit {

  @Input() id_league: string = '';
  @Input() validationForm: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  leagueForm!: FormGroup;
  id_federation: string = '1';

  league_mode = leagueMode;
  league_system = leagueSystem;
  league_status = leaguesStatus;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
    this.initForms();

    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.leagueForm.patchValue({
          img_logo: 'league/'+fileName
        });
      }
    });

    if (this.validationForm) {
      this.leagueById(+this.id_league);
    }
  }

  initForms() {
    this.leagueForm = this.fb.group({
      name: ['', Validators.required],
      dt_start: ['', Validators.required],
      dt_end: ['', Validators.required],
      league_system: ['', Validators.required],
      league_mode: ['', Validators.required],
      qt_group: ['1', Validators.required],
      img_logo: [''],
      status: !this.validationForm ? ['Ativo'] : ['']
    });

    // this.leagueForm.controls['qt_group'].disable();
  }

  updateInfosLeagueId(league: League) {
    this.leagueForm.patchValue({
      name: league.name,
      status: league.status,
      dt_end: league.dt_end,
      dt_start: league.dt_start,
      league_mode: league.league_mode,
      league_system: league.league_system
    });
  }

  leagueById(id_league: number) {
    this.leagueService.leagueById(id_league).subscribe({
      next: (data) => {
        console.log('LEAGUE BY ID SUCESS', data);
        this.updateInfosLeagueId(data);
      },
      error: (err) => {
        console.log('LEAGUE BY ID ERROR', err);
      }
    });
  }

  createLeague() {
    this.updateInfos();
    let form = {
      ...this.leagueForm.value,
      status: 'Ativo',
      idd_fed: +this.id_federation,
      img_logo: 'leagues/img_01.jpg'
    }
    console.log('create league form', form);
    // return;
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

  nextStep() {
    console.log('next step')
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    console.log(formattedTimestamp);
  }

  updateInfos() {
    this.leagueForm.patchValue({
      dt_start: '2024-01-21T03:00',
      dt_end: '2024-08-21T03:00'
    });
  }
}
