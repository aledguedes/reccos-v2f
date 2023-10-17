import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { League } from 'src/app/models/LeagueModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { leagueMode, statusLeague } from 'src/app/utils/system-league';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';
import { leagueMenu } from 'src/app/utils/leagueMenu';
import { MatDialog } from '@angular/material/dialog';
import { GeneralInfosComponent } from '../../components/general-infos/general-infos.component';
import { DefaultModalComponent } from '../../components/default-modal/default-modal.component';
import { Federation } from 'src/app/models/FederationModel';

@Component({
  selector: 'app-form-league',
  templateUrl: './form-league.component.html',
  styleUrls: ['./form-league.component.scss']
})
export class FormLeagueComponent implements OnInit, AfterViewInit {

  federation: Federation = JSON.parse(`${localStorage.getItem('reccos-federation') || []}`);

  @Input() id_league: string = '';
  @Input() validationForm: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  filteredStates!: Observable<any[]>;

  baseUrl = environment.storage_url;

  leagueForm!: FormGroup;
  leagueConfig!: FormGroup;

  file_upload_name: string = 'league/default.png';
  dt_end_DB: string = '';
  dt_start_DB: string = '';
  id_federation: string = '1';
  stateAbbreviation: string = '';

  league_mode = leagueMode;
  league_system = leagueMenu;
  league_status = statusLeague;

  changePhoto: boolean = true;
  allSelected: boolean = false;
  hideShowBox: boolean = true;
  hideShowInput: boolean = true;

  listCitys: any = [];
  teams: any = [];
  listStates: States[] = [];
  selectdTeams: any[] = [];

  numberGroups: number = 1;
  numberTeamsLeague: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rxjs: DataRxjsService,
    private snack: SnackbarService,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.allStates();
    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'league/' + fileName;
        this.nextStep();
      }
    });

    if (this.validationForm) {
      this.leagueById(+this.id_league);
      this.changePhoto = false;
    }
  }

  ngAfterViewInit(): void {
  }

  systemSelected(flag: string, idx: number) {
    this.resetActived();
    this.league_system[idx].actv = 1;
    this.leagueConfig.patchValue({
      league_system: flag
    });
    this.enableDisableQtGroup(flag);
  }

  resetActived() {
    this.league_system.forEach((item: any) => {
      item.actv = 0;
    });
  }

  initForms() {
    this.leagueForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.leagueConfig = this.fb.group({
      dt_start: ['', Validators.required],
      dt_end: ['', Validators.required],
      league_system: ['', Validators.required],
      league_mode: ['', Validators.required],
      enrollment_end: [null],
      enrollment_start: [null],
      turn: !this.validationForm ? [false] : [''],
      status: !this.validationForm ? ['Em preparação'] : ['']
    });

    if (!this.validationForm) {
      this.leagueForm.controls['city'].disable();
    }

    this.filteredStates = this.leagueForm.controls['city'].valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.listCitys.slice())),
    );
  }

  filterState(value: string) {
    let location = value.split('/');
    let idx = this.listStates.findIndex((estados: States) => estados.sigla == location[1]);
    this.leagueForm.patchValue({
      state: this.listStates[idx].id,
      city: location[0]
    });
  }

  updateInfosLeagueId(league: League) {
    this.leagueForm.patchValue({
      name: league.name
    });
    this.filterState(league.location);

    this.leagueConfig.patchValue({
      status: league.status,
      dt_end: league.dt_end,
      dt_start: league.dt_start,
      league_mode: league.league_mode,
      league_system: league.league_system,
      turn: league.turn
    });
  }

  leagueById(id_league: number) {
    this.leagueService.leagueById(id_league).subscribe({
      next: (data) => {
        this.dt_end_DB = String(data.dt_end);
        this.file_upload_name = data.img_logo;
        this.dt_start_DB = String(data.dt_start);
        console.log('LEAGUE BY ID SUCESS', data);
        this.updateInfosLeagueId(data);
      },
      error: (err) => {
        console.log('LEAGUE BY ID ERROR', err);
      }
    });
  }

  createObjToAPI() {

    let idState = this.leagueForm.value.state;
    let nameCity = this.leagueForm.value.city;
    let stateAbbreviation = this.listStates.filter((estados: States) => estados.id == idState)[0].sigla;

    let obj = {
      idd_fed: +this.federation.id,
      img_logo: this.file_upload_name,
      name: this.leagueForm.value.name,
      location: nameCity + '/' + stateAbbreviation,
      qt_group: +this.numberGroups,
      num_teams: this.numberTeamsLeague,
      ...this.leagueConfig.value,
      scoreName: 'W3D1L0'
    }

    // obj.dt_end = this.formatDate(obj.dt_end);
    // obj.dt_start = this.formatDate(obj.dt_start);

    if (this.validationForm) {
      let changeDateEnd = this.compareDates(this.dt_end_DB, obj.dt_end);
      let changeDateStart = this.compareDates(this.dt_start_DB, obj.dt_start);

      if (changeDateStart) {
        obj.dt_start = this.formatDate(obj.dt_start);
      }

      if (changeDateEnd) {
        obj.dt_end = this.formatDate(obj.dt_end);
      }
    }

    console.log('CREATE OBJECT:', obj);
    this.validationForm ? this.updateLeague(obj) : this.createLeague(obj);
  }

  compareDates(datestring1: string, datestring2: string) {
    const date1 = new Date(datestring1);
    const date2 = new Date(datestring2);

    if (date1.getTime() === date2.getTime()) {
      return false;
    }
    return true;
  }

  updateLeague(form: any) {
    this.leagueService.updateLeague(+this.id_league, form).subscribe({
      next: (data) => {
        console.log('UPDATE LEAGUE SUCESS', data);
        this.router.navigate(['/league']);
        this.snack.snack(`Liga ${form.name} atualizada com sucesso!`, 'snack-success');
      },
      error: (err) => {
        console.log('UPDATE LEAGUE ERROR', err);
        this.snack.snack(`Erro ao tentar atualizar a liga!`, 'snack-error');
      }
    });
  }

  createLeague(form: League) {

    this.leagueService.createLeague(form).subscribe({
      next: (data) => {
        console.log('CREATE LEAGUE SUCESS', data);
        this.router.navigate(['/league']);
        this.snack.snack(`Liga ${form.name} criada com sucesso!`, 'snack-success');
      },
      error: (err) => {
        console.log('CREATE LEAGUE ERROR', err);
        this.snack.snack(`Erro ao tentar criar a liga!`, 'snack-error');
      }
    });
  }

  nextStep() {
    this.stepper.next();
  }

  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
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

        let idx = this.listStates.findIndex((item: States) => item.id == uf);
        this.stateAbbreviation = this.listStates[idx].sigla;
        this.leagueForm.controls['city'].enable();
        if (this.validationForm) {
          this.leagueForm.patchValue({
            city: ''
          });
        }
      },
      error: (err) => {
        console.log('TODAS CIDADES ERROR', err);
      }
    });
  }

  enableDisableQtGroup(evt: any) {
    if (evt == 'Pontos Corridos' || evt == 'Mata-Mata') {
      this.numberGroups = 1;
      return;
    }
    this.hideShowInput = false;
  }

  numberOfGroups(value: string) {
    this.numberGroups = +value;
  }

  numberOfTeamsLeague(value: string) {
    this.numberTeamsLeague = +value;
  }

  openInfo() {
    this.dialog.open(GeneralInfosComponent, {
      disableClose: false,
      width: '400px',
      data: 1
    });
  }

  selectAll(evt: any) {

    let teams = this.teams;

    if (evt.checked) {
      teams.forEach((t: any) => {
        t["is_league"] = true;
        this.allSelected = true;
        this.arrTeam(t.id);
      });
    } else {
      teams.forEach((t: any) => {
        t["is_league"] = false;
        this.allSelected = false;
        this.revTeam(t.id);
      });
    }
  }

  addTeams(evt: any, id_team: number) {
    if (evt.checked) {
      this.arrTeam(id_team);
    }
    else {
      this.revTeam(id_team);
      if (this.allSelected) {
        this.allSelected = false;
      }
    }
  }

  arrTeam(id_team: number) {
    this.selectdTeams.push({ id: id_team });
  }

  revTeam(id_team: number) {
    this.selectdTeams.splice(this.selectdTeams.indexOf('id_team'), 1);
  }

  openUpload() {
    this.dialog.open(DefaultModalComponent, {
      disableClose: true,
      width: '500px',
      data: {
        component: 2
      }
    }).afterClosed().subscribe((data: any) => {
      console.log('USER FORMS', data);
      this.file_upload_name = data.result;
    });
  }

}

export interface States {
  id: number,
  nome: string,
  sigla: string,
  regiao: Regiao
}

export interface Regiao {
  id: number,
  nome: string,
  sigle: string
}
/* https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet*/ 