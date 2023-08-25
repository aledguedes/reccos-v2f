import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { League } from 'src/app/models/LeagueModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { cidadesEstadosBrasil } from 'src/app/utils/cidadesEstados';
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

  filteredStates!: Observable<any[]>;

  leagueForm!: FormGroup;
  id_federation: string = '1';
  file_upload_name: string = 'league/default.png';

  league_mode = leagueMode;
  league_system = leagueSystem;
  league_status = leaguesStatus;
  listStates: States[] = [];
  listCitys: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
    console.log('ESTADOS:', this.listStates);
    this.initForms();
    this.allStates();
    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'league/' + fileName;
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
      city: ['', Validators.required],
      state: ['', Validators.required],
      league_system: ['', Validators.required],
      league_mode: ['', Validators.required],
      qt_group: ['1', Validators.required],
      status: !this.validationForm ? ['Ativo'] : ['']
    });
    this.leagueForm.controls['city'].disable();
    this.leagueForm.controls['qt_group'].disable();


    this.filteredStates = this.leagueForm.controls['city'].valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.listCitys.slice())),
    );
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
    let form: any = {
      name: this.leagueForm.value.name,
      location: this.leagueForm.value.location,
      dt_start: this.formatDate(this.leagueForm.value.dt_start),
      dt_end: this.formatDate(this.leagueForm.value.dt_end),
      league_system: this.leagueForm.value.league_system,
      league_mode: this.leagueForm.value.league_mode,
      qt_group: this.leagueForm.value.qt_group,
      status: this.leagueForm.value.status,
      idd_fed: +this.id_federation,
      img_logo: this.file_upload_name
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
    // this.leagueForm.patchValue({
    //   dt_start: '2024-01-21T03:00',
    //   dt_end: '2024-08-21T03:00'
    // });
  }

  stateSelected(uf: string) {
    // this.listCitys = this.listStates.filter((index: any) => index.sigla == uf)[0].cidades;
    this.leagueForm.controls['city'].enable();
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listCitys.filter((state: any) => state.nome.toLowerCase().includes(filterValue));
  }

  allStates() {
    this.leagueService.allStates().subscribe({
      next: (data) => {
        this.listStates = data;
        // console.log('TODOS ESTADOS SUCESS', data);
      },
      error: (err) => {
        console.log('TODOS ESTADOS ERROR', err);
      }
    });
  }

  allCitysByState(uf: number) {
    this.leagueService.allCityss(uf).subscribe({
      next: (data) => {
        // console.log('TODAS CIDADES SUCESS', data);
        this.listCitys = data;
        this.leagueForm.controls['city'].enable();
      },
      error: (err) => {
        console.log('TODAS CIDADES ERROR', err);
      }
    });
  }
}

export interface States {
  id: number,
  nome: String,
  sigla: String,
  regiao: Regiao
}

export interface Regiao {
  id: Number,
  nome: String,
  sigle: string
}
/* https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet*/ 