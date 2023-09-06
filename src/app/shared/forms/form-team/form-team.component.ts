import { Component, Input, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { MatStepper } from '@angular/material/stepper';
import { leaguesStatus } from 'src/app/utils/system-league';
import { TeamService } from 'src/app/services/team/team.service';
import { Team } from 'src/app/models/TeamModel';
import { Stadium } from 'src/app/models/StadiumModel';
import { StadiumService } from 'src/app/services/stadium/stadium.service';
import { MatDialog } from '@angular/material/dialog';
import { StadiumCreateComponent } from 'src/app/pages/stadium/stadium-create/stadium-create.component';
import { FormStadiumComponent } from '../form-stadium/form-stadium.component';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  styleUrls: ['./form-team.component.scss']
})
export class FormTeamComponent implements OnInit, AfterViewInit {

  // @HostListener('window:resize', ['$event'])
  // VerticalOrHorizontalStepper() {
  //   if (window.innerWidth <= 576) {
  //     this.isVertical = true;
  //   } else {
  //     this.isVertical = false;
  //   }
  // }

  // @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   this.getScreenWidth = window.innerWidth;
  //   this.getScreenHeight = window.innerHeight;
  // }

  @Input() id_team: string = '';
  @Input() validationForm: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  public getScreenWidth: any;
  public getScreenHeight: any;

  formTeam!: FormGroup;
  formStadium!: FormGroup;
  formCommission!: FormGroup;

  league_status = leaguesStatus;
  stadium: Stadium[] = [];

  changePhoto: boolean = true;
  linkStadium: boolean = false;

  dateSaveBD: string = '';
  id_federation: string = '1';
  label_button: string = 'Voltar';
  file_upload_name: String = 'team/default.png';

  stadium_by_federaion: Stadium[] = [];

  orientationStepper: string = 'vertical';
  isVertical: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rxjs: DataRxjsService,
    private snack: SnackbarService,
    private teamService: TeamService,
    private stadiumService: StadiumService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.stadiumByFederation();
    // this.VerticalOrHorizontalStepper();

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'team/' + fileName;
      }
    });

    if (this.validationForm) {
      this.teamById(+this.id_team);
      this.changePhoto = false;
    }
  }

  initForm() {
    this.formTeam = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      acronym: ['', Validators.required],
      status: !this.validationForm ? ['Ativo'] : [''],
      birth_date: ['', Validators.required],
    });

    this.formCommission = this.fb.group({
      coach: ['', Validators.required],
      assistant: ['', Validators.required],
      doctor: ['', Validators.required],
      goalkeeper: ['', Validators.required]
    });

    this.formStadium = this.fb.group({
      id_stadium: [0, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.label_button = this.validationForm ? 'Cancelar' : 'Voltar';
  }

  teamById(id_team: number) {
    this.teamService.teamById(id_team).subscribe({
      next: (data) => {
        console.log('TEAM BY ID TEAM:', data);
        this.dateSaveBD = String(data.birth_date);
        this.updateInfosLeagueId(data);
      },
      error: (err) => {
        console.log('TEAM BY ID ERR:', err);
      }
    });
  }

  stadiumByFederation() {
    this.stadiumService.stadiumByFederation(+this.id_federation).subscribe({
      next: (data) => {
        console.log('STADIUM BY FEDERATION:', data);
        this.stadium_by_federaion = data;
      },
      error: (err) => {
        console.log('STADIUM BY FEDERATION ERR:', err);
      }
    });
  }

  updateInfosLeagueId(team: Team) {
    this.formTeam.patchValue({
      name: team.name,
      surname: team.surname,
      acronym: team.acronym,
      status: team.status,
      birth_date: team.birth_date
    });
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

  compareDates(dateString1: string, dateString2: string) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    if (date1.getTime() === date2.getTime()) {
      return false;
    }
    return true;
  }

  createTeam() {
    let obj = {
      ...this.formTeam.value,
      ...this.formStadium.value,
      // commission: this.formCommission.value,
      picture_profile: this.file_upload_name,
      registered_federation: +this.id_federation
    }
    obj.birth_date = this.formatDate(obj.birth_date);

    console.log('OBJ CREATE TEAM:', obj);
    // return;

    this.teamService.createTeam(obj).subscribe({
      next: (data) => {
        this.snack.snack(`Time ${obj.surname} criado com sucesso!`, 'snack-success');
        this.router.navigate(['/team']);
      },
      error: (err) => {
        console.log('CREATE TEAM ERR:', err);
        this.snack.snack(`Erro ao tentar criar o time!`, 'snack-error');
      }
    });
  }

  updateTeam() {
    let obj = {
      ...this.formTeam.value,
      // commission: this.formCommission.value,
      picture_profile: this.file_upload_name,
      registered_federation: +this.id_federation
    }
    let changeDate = this.compareDates(this.dateSaveBD, obj.birth_date);
    if (changeDate) {
      obj.birth_date = this.formatDate(obj.birth_date);
    }

    this.teamService.updateTeam(+this.id_team, obj).subscribe({
      next: (data) => {
        this.snack.snack(`Time ${obj.surname} atualizada com sucesso!`, 'snack-success');
        this.router.navigate(['/team']);
      },
      error: (err) => {
        console.log('CREATE TEAM ERR:', err);
        this.snack.snack(`Erro ao tentar atualizar o time!`, 'snack-error');
      }
    });
  }

  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
  }
}
