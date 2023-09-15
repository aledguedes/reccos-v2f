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
  file_upload_name: string = 'team/default.png';

  stadium_by_federaion: Stadium[] = [];

  orientationStepper: string = 'vertical';
  isVertical: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
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
        this.nextStep();
      }
    });

    if (this.validationForm) {
      this.teamById(+this.id_team);
      this.changePhoto = false;
    }

    // this.formStadium.statusChanges.subscribe(newStaus => {
    //   console.log(newStaus);
    // });

    // this.formStadium.controls['id_stadium'].valueChanges.subscribe((data: string) => {
    //   console.log('formStadium: ', data);
    // });
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
      id_stadium: ['', Validators.required]
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
    console.log('BY FEDERATION:', team);
    this.formTeam.patchValue({
      name: team.name,
      surname: team.surname,
      acronym: team.acronym,
      status: team.status.toUpperCase(),
      birth_date: team.birth_date
    });
    if (team.stadium == null) {
      this.linkStadium = true;
      this.updateValidatorsForms(true);
    }
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

  compareDates(datestring1: string, datestring2: string) {
    const date1 = new Date(datestring1);
    const date2 = new Date(datestring2);

    if (date1.getTime() === date2.getTime()) {
      return false;
    }
    return true;
  }

  createObjToAPI() {
    let obj = {
      ...this.formTeam.value,
      stadium_id: +this.formStadium.value.id_stadium,
      picture_profile: this.file_upload_name,
      registered_federation: +this.id_federation
    }
    if (this.validationForm) {
      let changeDate = this.compareDates(this.dateSaveBD, obj.birth_date);
      if (changeDate) {
        obj.birth_date = this.formatDate(obj.birth_date);
      }
    }
    console.log('OBJ CREATE TEAM:', obj);
    this.validationForm ? this.updateTeam(obj) : this.createTeam(obj);
  }

  createTeam(obj: Team) {
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

  updateTeam(obj: Team) {
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

  noLinkStadium(evt: any) {
    this.linkStadium = evt.checked;
    this.updateValidatorsForms(evt.checked);
  }

  updateValidatorsForms(value: boolean) {
    if (value) {
      this.formStadium.patchValue({ id_stadium: '0' });
      this.formStadium.controls['id_stadium'].setValidators([Validators.nullValidator]);
    } else {
      this.formStadium.reset();
      this.formStadium.controls['id_stadium'].setValidators([Validators.required]);
    }
    this.formStadium.controls['id_stadium'].updateValueAndValidity();
  }

  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
  }
}
